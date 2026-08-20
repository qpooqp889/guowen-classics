import json
from pathlib import Path
import requests

rows = json.loads(Path('/home/ubuntu/guowen-classics/cerc-pages.json').read_text(encoding='utf-8'))
row = next(x for x in rows if x['title'] == '燭之武退秦師')
sections = [{'label': item['label'], 'original': item['text']} for item in row['original']]
prompt = '''你是國中國文教師。請只輸出 JSON 陣列，不要 Markdown。針對以下古文段落，重新撰寫「不同於教材原譯」的繁體中文白話語譯。要忠於原文，不增加原文沒有的情節；語氣適合國中生，句子清楚自然。每項只保留 label、translation 三個欄位。\n\n''' + json.dumps(sections, ensure_ascii=False)
resp = requests.post(f"{__import__('os').environ['BUILT_IN_FORGE_API_URL']}/v1/chat/completions", headers={'Authorization': f"Bearer {__import__('os').environ['BUILT_IN_FORGE_API_KEY']}", 'Content-Type': 'application/json'}, json={'model':'gpt-5-mini','messages':[{'role':'system','content':'Output JSON only.'},{'role':'user','content':prompt}], 'max_completion_tokens': 5000}, timeout=120)
print(resp.status_code)
print(resp.text[:10000])
