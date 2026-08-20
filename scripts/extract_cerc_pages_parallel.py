import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import requests
from bs4 import BeautifulSoup

index = json.loads(Path('/home/ubuntu/guowen-classics/cerc-index.json').read_text(encoding='utf-8'))

def fetch(item):
    try:
        html = requests.get(item['source'], timeout=12).text
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.get_text('\n', strip=True)
        author_match = re.search(r'作者：([^\n]+)', text)
        dynasty_match = re.search(r'朝代：([^\n]+)', text)
        original, translations = [], []
        for div in soup.select('div[class^="paragraph"]'):
            label = div.find('p', class_='font-weight-bold')
            if not label: continue
            label_text = label.get_text('', strip=True)
            body = div.find_all('p')[-1].get_text('', strip=True)
            if '原文第' in label_text:
                original.append({'label': label_text.replace('．',''), 'text': body})
            elif '語譯' in label_text:
                translations.append({'label': label_text.replace('．',''), 'text': body})
        return {**item, 'author': (author_match.group(1).strip() if author_match else ''), 'dynasty': (dynasty_match.group(1).strip() if dynasty_match else ''), 'original': original, 'sourceTranslation': translations}
    except Exception as e:
        return {**item, 'author': '', 'dynasty': '', 'original': [], 'sourceTranslation': [], 'error': str(e)}

rows = []
with ThreadPoolExecutor(max_workers=8) as ex:
    futures = {ex.submit(fetch, item): item for item in index}
    for i, future in enumerate(as_completed(futures), 1):
        row = future.result(); rows.append(row)
        print(f'{i}/{len(index)} {row["title"]} {len(row.get("original", []))}段', flush=True)
rows.sort(key=lambda row: row['title'])
Path('/home/ubuntu/guowen-classics/cerc-pages.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'count': len(rows), 'with_original': sum(bool(x.get('original')) for x in rows)}, ensure_ascii=False))
