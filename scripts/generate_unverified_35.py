import json, os, re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import requests

text=Path('/home/ubuntu/guowen-classics/client/src/lib/catalog.ts').read_text(encoding='utf-8')
pattern=re.compile(r'indexed\((\d+),"([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"(?:,true)?\)')
items=[]
for m in pattern.finditer(text):
    no,title,author,dynasty,genre,category=m.groups()
    core='true' in m.group(0)
    items.append({'no':int(no),'title':title,'author':author,'dynasty':dynasty,'genre':genre,'category':category,'core':core})
base=os.environ['BUILT_IN_FORGE_API_URL']; key=os.environ['BUILT_IN_FORGE_API_KEY']

def one(item):
    prompt=f'''請為國中國文學習資料庫建立《{item["title"]}》的 JSON 初稿。作者：{item["author"]}；朝代：{item["dynasty"]}；分類：{item["category"]}。請回傳單一 JSON 物件，欄位為 original（繁體中文原文，若無法確定全文，請只提供你有把握的課堂節選並誠實標記 excerpt=true）、translation（與教材不同的國中程度白話語譯，對應 original）、contentNote（說明是否為節選與需要核對的地方）。不要 Markdown，不要捏造作者或情節。'''
    r=requests.post(f'{base}/v1/chat/completions',headers={'Authorization':f'Bearer {key}','Content-Type':'application/json'},json={'model':'gpt-5-mini','messages':[{'role':'system','content':'你是謹慎的國中國文資料整理教師，只輸出 JSON，無法確認時必須標示待校對。'},{'role':'user','content':prompt}], 'max_completion_tokens': 2400},timeout=180)
    c=r.json()['choices'][0]['message']['content'].replace('```json','').replace('```','').strip(); s=c.find('{'); e=c.rfind('}')
    data=json.loads(c[s:e+1])
    return {**item, **data, 'contentStatus':'AI草稿待來源校對'}

out=[]
with ThreadPoolExecutor(max_workers=4) as ex:
    fs={ex.submit(one,item):item for item in items}
    for i,f in enumerate(as_completed(fs),1):
        item=fs[f]
        try: out.append(f.result()); print(f'{i}/{len(items)} OK {item["title"]}',flush=True)
        except Exception as e: out.append({**item,'original':'','translation':'','contentNote':str(e),'contentStatus':'待補齊'}); print(f'{i}/{len(items)} ERROR {item["title"]}: {e}',flush=True)
out.sort(key=lambda x:x['no'])
Path('/home/ubuntu/guowen-classics/unverified-35.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'count':len(out)},ensure_ascii=False))
