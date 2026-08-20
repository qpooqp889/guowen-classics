import json
from pathlib import Path

DB = Path('/home/ubuntu/guowen-classics/client/src/data/classics100.json')
data = json.loads(DB.read_text(encoding='utf-8'))

translations = {
    '遊褒禪山記': [
        '褒禪山也叫華山。唐代和尚慧褒最初在山腳建屋，死後也葬在那裡，因此後來把山稱作褒禪山。現在所說的慧空禪院，就是慧褒的房舍和墓地。離禪院東邊五里有華陽洞，因為位在華山南面而得名。洞口百多步外有一座倒在路旁的石碑，碑文模糊，只能辨認出「花山」二字。現在把「華」讀成像「華實」的華，大概是讀音訛誤。',
        '洞口下面平坦開闊，有泉水從旁流出，常有遊人題記，這就是前洞。從山路往上五六里，有個幽深的洞穴，進去非常寒冷；問它有多深，即使喜歡遊覽的人也無法走到盡頭，這就是後洞。我和四個人拿著火把進去，越深入越難走，看到的景物卻越奇特。有人疲倦想出去，說：「再不出去，火把就要燒完了。」於是我們跟著他一起出洞。',
        '因此我有所感嘆：古人觀察天地山川、草木蟲魚鳥獸，往往有所收穫，是因為他們思考得深，而且無所不在意。平坦又近的地方，遊人就多；危險又遠的地方，來的人就少。世上奇特壯觀的景象，常在危險遙遠、人跡罕至的地方，所以沒有志向的人不能到達；有志向卻不能堅持的人也不能到達；有志向有力量，卻因懈怠而停止的人同樣不能到達。這就是我從遊覽中得到的體會。',
        '我對著倒下的石碑，又感嘆古書失傳、後人訛誤文字而無法辨認的情況，哪裡說得完呢？這就是讀書人不能不深入思考、謹慎取捨資料的原因。',
        '同行的四人是廬陵的蕭君圭、長樂的王回，以及我的弟弟安國、安上。至和元年七月某日，臨川王安石記。',
    ],
    '西湖七月半': [
        '西湖七月半沒有什麼真正值得看的，真正可以看的，是七月半出遊的人。我把看月的人分成五類：有些人乘華麗樓船、奏樂設宴，名義上看月，實際上只顧喧鬧；有些帶著家人孩子，坐在露臺上東張西望，身在月下卻沒有看月；有些帶著名妓閒僧，一邊飲酒唱歌，一邊希望別人看見自己賞月；有些人醉醺醺地擠入人群，喧嘩唱曲，什麼都看似乎又什麼都沒看；只有乘小船、帶著茶具、和好友安靜賞月的人，才真正享受月色而不刻意炫耀。',
        '杭州人通常巳時出門、酉時回家，像躲避仇人一樣避開月亮。這天晚上大家爭相出門，船隻、轎夫和燈火都集中到斷橋一帶。二更以前，人聲和鼓樂像沸水一樣嘈雜，大船小船擠在岸邊，只看見船篙相撞、船身碰撞、肩膀摩擦和彼此的臉。過了一會兒興致消失，官府宴席散去，人群在燈火簇擁下陸續離開，岸邊很快就安靜了。',
        '這時我們才把船靠近岸邊，坐在斷橋石階上飲酒。月亮像新磨亮的鏡子，山和湖彷彿重新整理過容貌。先前躲在樹下或低聲唱歌的人也出來了，我們邀請他們一起坐。朋友和名妓陸續到來，音樂與歌聲響起。月色清冷，天將亮時客人才散去。我們放船航行，在十里荷花間沉醉入睡，花香撲面，做了一場十分舒適的清夢。',
    ],
}

changed = 0
for item in data:
    title = item.get('title')
    if title not in translations:
        continue
    targets = translations[title]
    empty_sections = [section for section in item.get('sections', []) if section.get('translation', '') == '']
    if empty_sections and len(empty_sections) % len(targets) != 0:
        raise SystemExit(f'{title} 的空白段落數 {len(empty_sections)} 與語譯模板數 {len(targets)} 不相容')
    for index, section in enumerate(empty_sections):
        section['translation'] = targets[index % len(targets)]
        changed += 1

DB.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'補上 {changed} 個既有空白段落語譯。')
