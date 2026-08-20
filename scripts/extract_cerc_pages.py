import json
import re
import time
from pathlib import Path
import requests
from bs4 import BeautifulSoup

index = json.loads(Path('/home/ubuntu/guowen-classics/cerc-index.json').read_text(encoding='utf-8'))
rows = []
for n, item in enumerate(index, 1):
    try:
        html = requests.get(item['source'], timeout=30).text
        soup = BeautifulSoup(html, 'html.parser')
        heading = soup.find(['h2','h3'], string=lambda s: s and item['title'] in s)
        author = ''
        dynasty = ''
        page_text = soup.get_text('\n', strip=True)
        m = re.search(r'作者：([^\n]+)', page_text)
        if m: author = m.group(1).strip()
        m = re.search(r'朝代：([^\n]+)', page_text)
        if m: dynasty = m.group(1).strip()
        original = []
        translations = []
        for div in soup.select('div[class^="paragraph"]'):
            label = div.find('p', class_='font-weight-bold')
            if not label: continue
            label_text = label.get_text('', strip=True)
            body = div.find_all('p')[-1].get_text('', strip=True)
            if '原文第' in label_text:
                original.append({'label': label_text.replace('．',''), 'text': body})
            elif '語譯' in label_text:
                translations.append({'label': label_text.replace('．',''), 'text': body})
        rows.append({**item, 'author': author, 'dynasty': dynasty, 'original': original, 'sourceTranslation': translations})
        print(f'{n}/{len(index)} {item["title"]} {len(original)}段')
        time.sleep(0.08)
    except Exception as e:
        rows.append({**item, 'error': str(e), 'original': [], 'sourceTranslation': []})
        print(f'ERROR {item["title"]}: {e}')
Path('/home/ubuntu/guowen-classics/cerc-pages.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'count': len(rows), 'with_original': sum(bool(x.get('original')) for x in rows)}, ensure_ascii=False))
