import json
from pathlib import Path

catalog_text = Path('/home/ubuntu/guowen-classics/client/src/lib/catalog.ts').read_text(encoding='utf-8')
import re
items=[]
pattern=re.compile(r'(?:verified|indexed)\((\d+),"([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"(?:,\d+)?(?:,true)?\)')
for m in pattern.finditer(catalog_text):
    no,title,author,dynasty,genre,category=m.groups()
    fragment=m.group(0)
    items.append({'no':int(no),'title':title,'author':author,'dynasty':dynasty,'genre':genre,'category':category,'core':',true' in fragment})
def norm_title(value):
    return value.replace('（','(').replace('）',')').replace(' ','')
source_rows={norm_title(x['title']):x for x in json.loads(Path('/home/ubuntu/guowen-classics/ai-translations-65.json').read_text(encoding='utf-8'))}
draft_rows={norm_title(x['title']):x for x in json.loads(Path('/home/ubuntu/guowen-classics/unverified-35.json').read_text(encoding='utf-8'))}
out=[]
def plain(value):
    if isinstance(value, str): return value
    if isinstance(value, dict): return value.get('text', '')
    if isinstance(value, list): return '\n'.join(plain(x) for x in value)
    return ''

note_library={
    '行':('ㄒㄧㄥˊ／ㄏㄤˊ','依語境判讀：行走、行列或品行。','古文常見多音字'),
    '樂':('ㄌㄜˋ／ㄩㄝˋ','快樂或音樂，依上下文判讀。','古今讀音與詞義可能不同'),
    '少':('ㄕㄠˇ／ㄕㄠˋ','少數或年少，依語境判讀。','古文常見多音字'),
    '為':('ㄨㄟˊ／ㄨㄟˋ','作為、成為或替、給，依語境判讀。','介詞與動詞用法不同'),
    '度':('ㄉㄨˋ／ㄉㄨㄛˊ','尺度、限度或推測，依語境判讀。','古文常見多音字'),
    '數':('ㄕㄨˋ／ㄕㄨˇ／ㄕㄨㄛˋ','數目、計算或屢次，依語境判讀。','古文常見多音字'),
    '重':('ㄓㄨㄥˋ／ㄔㄨㄥˊ','重要、重量或重新，依語境判讀。','古文常見多音字'),
    '鮮':('ㄒㄧㄢ／ㄒㄧㄢˇ','新鮮或少，依語境判讀。','古文常見多音字'),
    '長':('ㄔㄤˊ／ㄓㄤˇ','長短或生長、增長，依語境判讀。','古文常見多音字'),
    '數':('ㄕㄨˋ／ㄕㄨㄛˋ','數目或屢次，依語境判讀。','古文常見多音字')
}
def make_notes(text):
    notes=[]
    for word,(zhuyin,meaning,hint) in note_library.items():
        if word in text and not any(n['word']==word for n in notes): notes.append({'word':word,'zhuyin':zhuyin,'meaning':meaning,'hint':hint})
    return notes[:3]

for item in sorted(items,key=lambda x:x['no']):
    title=item['title']; src=source_rows.get(norm_title(title)); draft=draft_rows.get(norm_title(title))
    if src:
        trans=src.get('aiTranslation',[])
        trans_by_label={x.get('label'):x.get('translation','') for x in trans}
        sections=[{'label':p['label'],'original':p['text'],'translation':trans_by_label.get(p['label'],''),'notes':make_notes(p['text'])} for p in src.get('original',[])]
        status='AI語譯完成／原文來源已核對'
        source=src.get('source')
    elif draft:
        original=draft.get('original',''); translation=draft.get('translation','')
        original=plain(original)
        translation=plain(translation)
        sections=[{'label':'國中優先篇目','original':original,'translation':translation,'notes':make_notes(original)}]
        status=draft.get('contentStatus','AI草稿待來源校對') if original and translation else '待 AI 語譯與來源校對'
        source=None
    else:
        sections=[{'label':'待補段落','original':'','translation':'','notes':[]}] if not draft else []
        status='待補齊'; source=None
    out.append({**item,'id':f'classic-{item["no"]:03d}','source':source,'contentStatus':status,'sections':sections})
Path('/home/ubuntu/guowen-classics/client/src/data').mkdir(parents=True,exist_ok=True)
Path('/home/ubuntu/guowen-classics/client/src/data/classics100.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'count':len(out),'with_sections':sum(bool(x['sections']) for x in out),'with_translation':sum(any(s.get('translation') for s in x['sections']) for x in out),'pending':sum(x['contentStatus'].startswith('待') for x in out)},ensure_ascii=False))
