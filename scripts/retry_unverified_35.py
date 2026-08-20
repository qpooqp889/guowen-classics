import json, os, time
from pathlib import Path
import requests
path=Path('/home/ubuntu/guowen-classics/unverified-35.json')
rows=json.loads(path.read_text(encoding='utf-8'))
base=os.environ['BUILT_IN_FORGE_API_URL']; key=os.environ['BUILT_IN_FORGE_API_KEY']
for row in rows:
    if row.get('original') and row.get('translation'): continue
    prompt=f'''請建立《{row["title"]}》的國中國文學習資料 JSON。作者：{row["author"]}；朝代：{row["dynasty"]}。只回傳 {{"original":"可確認的短篇原文或代表性節選","translation":"對應的全新繁體中文白話語譯","contentNote":"若只是節選請明確寫節選，若需核對請明確寫待來源校對"}}。不要 Markdown；不要捏造不確定的全文。'''
    for attempt in range(2):
        try:
            r=requests.post(f'{base}/v1/chat/completions',headers={'Authorization':f'Bearer {key}','Content-Type':'application/json'},json={'model':'gpt-5-mini','messages':[{'role':'system','content':'你是謹慎的國中國文教師，只輸出 JSON。'},{'role':'user','content':prompt}], 'max_completion_tokens': 1100},timeout=120)
            payload=r.json()
            if 'choices' not in payload: raise RuntimeError(str(payload)[:500])
            c=payload['choices'][0]['message']['content'].replace('```json','').replace('```','').strip(); s=c.find('{'); e=c.rfind('}')
            data=json.loads(c[s:e+1]); row.update(data); row['contentStatus']='AI草稿待來源校對'; row.pop('error',None); print('RETRIED',row['title']); break
        except Exception as e:
            row['contentNote']=str(e); print('RETRY_ERROR',row['title'],e); time.sleep(2)
path.write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'count':len(rows),'with_content':sum(bool(x.get('original')) and bool(x.get('translation')) for x in rows)},ensure_ascii=False))
