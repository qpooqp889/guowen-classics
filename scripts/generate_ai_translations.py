import json
import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import requests

INPUT = Path('/home/ubuntu/guowen-classics/cerc-pages.json')
OUTPUT = Path('/home/ubuntu/guowen-classics/ai-translations-65.json')
rows = json.loads(INPUT.read_text(encoding='utf-8'))
base = os.environ['BUILT_IN_FORGE_API_URL']
key = os.environ['BUILT_IN_FORGE_API_KEY']

SYSTEM = '你是臺灣國中國文教師，請用繁體中文完成忠實、清楚、適合國中生理解的古文白話語譯。只依原文，不補寫原文沒有的情節。'

def parse_json(text):
    text = text.strip().replace('```json', '').replace('```', '').strip()
    start = text.find('{')
    end = text.rfind('}')
    if start < 0 or end <= start:
        raise ValueError('no json object')
    return json.loads(text[start:end+1])

def generate(row):
    sections = [{'label': p['label'], 'original': p['text']} for p in row.get('original', [])]
    prompt = f'''請為《{row["title"]}》重新撰寫逐段白話語譯。這是獨立學習版本，不能複製或近似教材常見譯文，請改用自然、清楚、適合國中生的說法；但人名、事件順序、因果關係與語氣必須忠於原文。請只回傳一個 JSON 物件，格式為 {{"translations":[{{"label":"原文第1段","translation":"..."}}]}}，translations 必須與輸入段落數相同、順序相同，不要 Markdown、不要額外說明。\n原文段落：\n{json.dumps(sections, ensure_ascii=False)}'''
    resp = requests.post(f'{base}/v1/chat/completions', headers={'Authorization': f'Bearer {key}', 'Content-Type': 'application/json'}, json={'model':'gpt-5-mini','messages':[{'role':'system','content':SYSTEM},{'role':'user','content':prompt}], 'max_completion_tokens': max(3500, len(sections)*900)}, timeout=180)
    data = resp.json()
    content = data['choices'][0]['message']['content']
    result = parse_json(content)
    translations = result.get('translations', [])
    if len(translations) != len(sections):
        raise ValueError(f'count mismatch {len(translations)} != {len(sections)}')
    return {**row, 'aiTranslation': translations, 'translationStatus': 'AI重新撰寫完成'}

out = []
with ThreadPoolExecutor(max_workers=4) as ex:
    futures = {ex.submit(generate, row): row for row in rows}
    for i, future in enumerate(as_completed(futures), 1):
        row = futures[future]
        try:
            item = future.result()
            print(f'{i}/{len(rows)} OK {item["title"]}', flush=True)
        except Exception as e:
            item = {**row, 'aiTranslation': [], 'translationStatus': '待人工校對', 'translationError': str(e)}
            print(f'{i}/{len(rows)} ERROR {row["title"]}: {e}', flush=True)
        out.append(item)
out.sort(key=lambda x: x['title'])
OUTPUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'count': len(out), 'success': sum(x['translationStatus']=='AI重新撰寫完成' for x in out)}, ensure_ascii=False))
