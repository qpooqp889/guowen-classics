import json, os, re
from pathlib import Path
import requests
path = Path('/home/ubuntu/guowen-classics/ai-translations-65.json')
rows = json.loads(path.read_text(encoding='utf-8'))
base=os.environ['BUILT_IN_FORGE_API_URL']; key=os.environ['BUILT_IN_FORGE_API_KEY']
for row in rows:
    if row.get('translationStatus') == 'AI重新撰寫完成': continue
    sections=row.get('original', [])
    labels=[x['label'] for x in sections]
    prompt=f'''請為《{row["title"]}》逐段重新撰寫國中程度繁體中文白話語譯。只回傳 JSON 物件 {{"translations":[...]}}，translations 必須恰好 {len(labels)} 項，且 label 依序只能是 {json.dumps(labels, ensure_ascii=False)}；禁止重複、禁止多出任何段落、禁止 Markdown。原文如下：{json.dumps(sections, ensure_ascii=False)}'''
    r=requests.post(f'{base}/v1/chat/completions',headers={'Authorization':f'Bearer {key}','Content-Type':'application/json'},json={'model':'gpt-5-mini','messages':[{'role':'system','content':'你是精確的國中國文教師，只輸出 JSON。'},{'role':'user','content':prompt}], 'max_completion_tokens': max(3500,len(labels)*900)},timeout=180)
    content=r.json()['choices'][0]['message']['content'].replace('```json','').replace('```','').strip()
    start=content.find('{'); end=content.rfind('}')
    data=json.loads(content[start:end+1]); translations=data['translations']
    if len(translations)!=len(labels): raise RuntimeError(f'{row["title"]} retry mismatch')
    row['aiTranslation']=translations; row['translationStatus']='AI重新撰寫完成'; row.pop('translationError',None)
    print('RETRIED',row['title'])
path.write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'count':len(rows),'success':sum(x.get('translationStatus')=='AI重新撰寫完成' for x in rows)},ensure_ascii=False))
