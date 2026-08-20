import json
from pathlib import Path
p=Path('/home/ubuntu/guowen-classics/client/src/data/classics100.json')
d=json.loads(p.read_text(encoding='utf-8'))
assert len(d)==100
assert len({x['id'] for x in d})==100
required={'id','no','title','author','dynasty','genre','category','core','contentStatus','sections'}
assert all(required <= set(x) for x in d)
assert all(isinstance(x['sections'],list) for x in d)
assert all(all({'label','original','translation'} <= set(s) for s in x['sections']) for x in d)
print(json.dumps({'valid':True,'count':len(d),'sections':sum(len(x['sections']) for x in d),'translation_ready':sum(any(s['translation'].strip() for s in x['sections']) for x in d),'source_verified':sum(x['contentStatus']=='AI語譯完成／原文來源已核對' for x in d),'draft_or_pending':sum(x['contentStatus']!='AI語譯完成／原文來源已核對' for x in d)},ensure_ascii=False))
