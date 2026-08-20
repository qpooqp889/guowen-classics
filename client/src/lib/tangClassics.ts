/* Style reminder: 唐代專題延續紙上山水・數位課本；每篇用段落、批註與朗讀組成可反覆複習的學習頁。 */
export type TangNote = { word: string; zhuyin: string; meaning: string; hint?: string };
export type TangSection = { label: string; original: string; explanation: string; notes: TangNote[] };
export type TangClassic = { id: string; title: string; author: string; genre: string; theme: string; source: string; sections: TangSection[] };

export const tangClassics: TangClassic[] = [
  {
    id: "shishuo", title: "師說", author: "韓愈", genre: "論說散文", theme: "尊師重道，說明學習的根本", source: "https://cerclearning.tp.edu.tw/classical/datapage/148",
    sections: [
      { label: "教師的作用", original: "古之學者必有師。師者，所以傳道、受業、解惑也。人非生而知之者，孰能無惑？惑而不從師，其為惑也，終不解矣。", explanation: "古代求學的人一定有老師。老師是用來傳授道理、教導學業、解答疑惑的。人不是一出生就懂得一切，誰能沒有疑惑？有疑惑卻不跟隨老師學習，疑惑就永遠無法解決。", notes: [{ word: "受業", zhuyin: "ㄕㄡˋ ㄧㄝˋ", meaning: "通「授業」，傳授學業" }, { word: "孰", zhuyin: "ㄕㄨˊ", meaning: "誰" }, { word: "惑", zhuyin: "ㄏㄨㄛˋ", meaning: "疑惑、疑問" }] },
      { label: "擇師的標準", original: "生乎吾前，其聞道也固先乎吾，吾從而師之；生乎吾後，其聞道也亦先乎吾，吾從而師之。吾師道也，夫庸知其年之先後生於吾乎？", explanation: "出生在我以前的人，如果他聞知道理本來就比我早，我便跟從他並以他為老師；出生在我以後的人，只要他懂得道理也比我早，我也跟從他學習。我所學的是道理，哪裡需要知道他的年齡比我早或晚呢？", notes: [{ word: "師之", zhuyin: "ㄕ ㄓ", meaning: "以他為老師；師，意動用法" }, { word: "庸", zhuyin: "ㄩㄥ", meaning: "豈、哪裡" }, { word: "年之先後", zhuyin: "ㄋㄧㄢˊ ㄓ ㄒㄧㄢ ㄏㄡˋ", meaning: "年齡的先後" }] },
      { label: "士大夫之族", original: "士大夫之族，曰師曰弟子云者，則群聚而笑之。問之，則曰：彼與彼年相若也，道相似也。位卑則足羞，官盛則近諛。", explanation: "士大夫這一類人，只要聽到有人稱老師、稱弟子，就成群聚在一起嘲笑。問他們原因，他們說對方年齡相近、道術相似，向地位低的人學習很羞恥，向官位高的人學習又近於諂媚。", notes: [{ word: "族", zhuyin: "ㄗㄨˊ", meaning: "類、群" }, { word: "相若", zhuyin: "ㄒㄧㄤ ㄖㄨㄛˋ", meaning: "相近、差不多" }, { word: "諛", zhuyin: "ㄩˊ", meaning: "奉承、諂媚" }] },
      { label: "不恥相師", original: "巫醫樂師百工之人，不恥相師。士大夫之族，曰師曰弟子云者，則群聚而笑之。嗚呼！師道之不復可知矣。", explanation: "巫醫、樂師和各種工匠不以互相學習為可恥，士大夫卻反而嘲笑師生關係。唉！由此可知尊師學習的風氣已經不能恢復了。", notes: [{ word: "不恥", zhuyin: "ㄅㄨˋ ㄔˇ", meaning: "不以……為恥" }, { word: "相師", zhuyin: "ㄒㄧㄤ ㄕ", meaning: "互相學習" }, { word: "復", zhuyin: "ㄈㄨˋ", meaning: "恢復；此處不是ㄈㄨˊ" }] },
    ],
  },
  {
    id: "xishan", title: "始得西山宴遊記", author: "柳宗元", genre: "山水遊記", theme: "由山水之遊轉向精神的解脫", source: "https://cerclearning.tp.edu.tw/classical/datapage/149",
    sections: [
      { label: "日與其徒", original: "自余為僇人，居是州，恆惴慄。其隙也，則施施而行，漫漫而遊。日與其徒上高山，入深林，窮回溪，幽泉怪石，無遠不到。", explanation: "自從我成為被貶謫的罪人，住在這個州，常常感到恐懼不安。有空時便緩步出行、漫無目的遊覽，每天和同伴登高山、入深林、走遍曲折的溪流，幽深的泉水與奇怪的石頭，沒有一處不去。", notes: [{ word: "僇人", zhuyin: "ㄌㄨˋ ㄖㄣˊ", meaning: "罪人；僇同「戮」，辱、罪" }, { word: "惴慄", zhuyin: "ㄓㄨㄟˋ ㄌㄧˋ", meaning: "憂懼恐懼的樣子" }, { word: "施施", zhuyin: "ㄧˊ ㄧˊ", meaning: "舒緩緩慢的樣子；此處是古書讀法" }] },
      { label: "西山之異", original: "今年九月二十八日，因坐法華西亭，望西山，始指異之。遂命僕人過湘江，緣染溪，斫榛莽，焚茅茷，窮山之高而止。", explanation: "今年九月二十八日，我坐在法華寺西亭，望見西山，才開始覺得它奇異。於是命僕人渡過湘江，沿著染溪前進，砍除雜木、燒去茅草，一直走到山的最高處才停下。", notes: [{ word: "斫", zhuyin: "ㄓㄨㄛˊ", meaning: "砍伐" }, { word: "榛莽", zhuyin: "ㄓㄣ ㄇㄤˇ", meaning: "叢生的雜木、草木" }, { word: "茷", zhuyin: "ㄈㄚˊ", meaning: "草葉茂盛的樣子" }] },
      { label: "心凝形釋", original: "悠悠乎與顥氣俱，而莫得其涯；洋洋乎與造物者遊，而不知其所窮。引觴滿酌，頹然就醉，不知日之入。蒼然暮色，自遠而至，至無所見，而猶不欲歸。", explanation: "心情悠遠，彷彿和天地間浩大的元氣同在，沒有邊際；精神舒展，和造物者一起遨遊，也不知道盡頭在哪裡。斟滿酒杯喝下，不知不覺醉倒，直到暮色從遠方逼近，什麼也看不見了，仍然不想回去。", notes: [{ word: "顥氣", zhuyin: "ㄏㄠˋ ㄑㄧˋ", meaning: "天地間浩大的元氣" }, { word: "觴", zhuyin: "ㄕㄤ", meaning: "酒杯" }, { word: "頹然", zhuyin: "ㄊㄨㄟˊ ㄖㄢˊ", meaning: "身體倒下的樣子" }] },
      { label: "始知遊之樂", original: "然後知是山之特立，不與培塿為類。悠悠乎與顥氣俱，而莫得其涯。然後知吾嚮之未始遊，遊於是乎始。故為之文以志。", explanation: "這時才知道西山卓然挺立，不和小土丘同類；也才知道以前的遊覽不算真正的遊覽，真正的遊覽是從這一次開始。因此寫下這篇文章記錄它。", notes: [{ word: "培塿", zhuyin: "ㄆㄡˇ ㄌㄡˇ", meaning: "小土丘" }, { word: "嚮", zhuyin: "ㄒㄧㄤˋ", meaning: "從前、先前；通「向」" }, { word: "志", zhuyin: "ㄓˋ", meaning: "記錄；通「誌」" }] },
    ],
  },
  {
    id: "qiuran", title: "虯髯客傳", author: "杜光庭", genre: "古典小說", theme: "英雄識英雄與時勢的選擇", source: "https://cerclearning.tp.edu.tw/classical/datapage/150",
    sections: [
      { label: "紅拂夜奔", original: "文靜罷酒，出，並轡而行。文靜曰：僕有一好事，未知君能從我否？曰：試言之。曰：僕有寶劍一口，價值百金，欲以相贈。", explanation: "李靖離開酒席後，和虯髯客並馬同行。他說自己有一件重要的事，不知道對方願不願意一起做；接著說有一把價值百金的寶劍想送給他，兩人開始建立信任。", notes: [{ word: "並轡", zhuyin: "ㄅㄧㄥˋ ㄆㄟˋ", meaning: "兩匹馬並排而行；轡，馬韁" }, { word: "僕", zhuyin: "ㄆㄨˊ", meaning: "我，古代男子自稱" }, { word: "贈", zhuyin: "ㄗㄥˋ", meaning: "送給" }] },
      { label: "觀察李世民", original: "公曰：此郎君極富貴，但非君之所能有。文靜曰：何以言之？公曰：吾觀之，非人臣也。", explanation: "虯髯客觀察李世民後，說他極為富貴，但那不是李靖能夠擁有的富貴。因為在他看來，李世民不是一般臣子，而有成為帝王的氣象。", notes: [{ word: "郎君", zhuyin: "ㄌㄤˊ ㄐㄩㄣ", meaning: "對年輕男子的稱呼" }, { word: "富貴", zhuyin: "ㄈㄨˋ ㄍㄨㄟˋ", meaning: "富足尊貴；古文常指帝王之相" }, { word: "人臣", zhuyin: "ㄖㄣˊ ㄔㄣˊ", meaning: "臣子" }] },
      { label: "道士相術", original: "道士曰：人之相法，乃有常理。以我觀之，非人臣之相，蓋天子之相也。文靜驚曰：然則奈何？", explanation: "道士也說，相貌自有一定的道理，在他看來，李世民不是臣子的相貌，而是天子的相貌。李靖聽了驚訝，開始思考天下局勢與各人應走的道路。", notes: [{ word: "相法", zhuyin: "ㄒㄧㄤˋ ㄈㄚˇ", meaning: "觀察相貌的方法；相，此處讀ㄒㄧㄤˋ" }, { word: "蓋", zhuyin: "ㄍㄞˋ", meaning: "大概、原來是" }, { word: "奈何", zhuyin: "ㄋㄞˋ ㄏㄜˊ", meaning: "怎麼辦" }] },
      { label: "虯髯客退場", original: "公曰：此世界非公世界也。太原李氏，真英主也。吾欲以全家資助之，成其大業。遂散家財，率妻子入海，不知所終。", explanation: "虯髯客知道天下的主角不是自己，而是太原李氏的李世民，便把家產全部拿出來幫助他成就大業，自己帶著妻子遠走海外。這段結尾凸顯英雄能認清時勢、選擇退讓的胸襟。", notes: [{ word: "全家資", zhuyin: "ㄑㄩㄢˊ ㄐㄧㄚ ㄗ", meaning: "全家的財產" }, { word: "妻子", zhuyin: "ㄑㄧ ㄗˇ", meaning: "妻子與兒女；不是只指妻子" }, { word: "所終", zhuyin: "ㄙㄨㄛˇ ㄓㄨㄥ", meaning: "最後的去處" }] },
    ],
  },
  {
    id: "shisi", title: "諫太宗十思疏", author: "魏徵", genre: "奏疏論說", theme: "居安思危與君主修身", source: "https://cerclearning.tp.edu.tw/classical/datapage/147",
    sections: [
      { label: "積德義以固根本", original: "凡百元首，承天景命，莫不殷憂而道著，功成而德衰，有善始者實繁，能克終者蓋寡。豈其取之易守之難乎？蓋在殷憂必竭誠以待下。", explanation: "歷代君主承受上天重大使命，往往在憂患時能修明治道，功業完成後德行反而衰退。開頭做得好的人很多，能堅持到底的卻很少。關鍵在於憂慮時能竭盡誠意對待臣民。", notes: [{ word: "景命", zhuyin: "ㄐㄧㄥˇ ㄇㄧㄥˋ", meaning: "重大的天命；景，大" }, { word: "克終", zhuyin: "ㄎㄜˋ ㄓㄨㄥ", meaning: "能夠堅持到底" }, { word: "竭誠", zhuyin: "ㄐㄧㄝˊ ㄔㄥˊ", meaning: "竭盡誠意" }] },
      { label: "十思的核心", original: "凡百元首，承天景命，莫不殷憂而道著，功成而德衰。君人者，誠能見可欲則思知足以自戒，將有作則思知止以安人。", explanation: "魏徵提醒君主，面對想要的事物要想到知足，將要興建或有所作為要想到適可而止，使百姓安定。十思的核心，是把欲望與權力轉化為自我約束。", notes: [{ word: "君人", zhuyin: "ㄐㄩㄣ ㄖㄣˊ", meaning: "統治人民；君，作動詞" }, { word: "可欲", zhuyin: "ㄎㄜˇ ㄩˋ", meaning: "可以引起欲望的事物" }, { word: "作", zhuyin: "ㄗㄨㄛˋ", meaning: "興作、建造" }] },
      { label: "居安思危", original: "念高危則思謙沖而自牧，懼滿溢則思江海下百川，樂盤遊則思三驅以為度。憂懈怠則思慎始而敬終。", explanation: "想到高位危險，就要謙虛自守；害怕自滿，就要想到江海處在低下位置卻能容納百川；喜歡遊樂，要想到節制；擔心懈怠，就要慎重開始、恭敬結束。", notes: [{ word: "謙沖", zhuyin: "ㄑㄧㄢ ㄔㄨㄥ", meaning: "謙虛；沖，謙虛" }, { word: "自牧", zhuyin: "ㄗˋ ㄇㄨˋ", meaning: "自我修養、自我約束" }, { word: "三驅", zhuyin: "ㄙㄢ ㄑㄩ", meaning: "打獵時只從三面驅趕，留一面使獵物可逃，表示節制" }] },
      { label: "知人善任", original: "總此十思，弘茲九德，簡能而任之，擇善而從之，則智者盡其謀，勇者竭其力，仁者播其惠，信者效其忠。", explanation: "總結這十種自我反省，發揚九種德行，選拔有能力的人任用，選擇正確的意見採納，就能讓有智慧的人獻策、有勇氣的人盡力、有仁德的人施惠、有信用的人效忠。", notes: [{ word: "弘", zhuyin: "ㄏㄨㄥˊ", meaning: "發揚、擴大" }, { word: "簡能", zhuyin: "ㄐㄧㄢˇ ㄋㄥˊ", meaning: "選拔有才能的人；簡通「揀」" }, { word: "播惠", zhuyin: "ㄅㄛˋ ㄏㄨㄟˋ", meaning: "施行恩惠" }] },
    ],
  },
  {
    id: "yuanwei", title: "與元微之書", author: "白居易", genre: "書信散文", theme: "以山水與友情安頓身心", source: "https://cerclearning.tp.edu.tw/classical/datapage/182",
    sections: [
      { label: "得微之書", original: "四月十日夜，樂天白：微之微之！不見足下面已三年矣，不得足下書欲二年矣。人生幾何，離闊如此！", explanation: "四月十日夜，白居易寫信給元稹：我們已經三年沒見，快兩年沒收到你的信。人生能有多久，朋友竟然離散到這樣的程度，字裡行間充滿思念。", notes: [{ word: "足下", zhuyin: "ㄗㄨˊ ㄒㄧㄚˋ", meaning: "古代交際用語，稱呼朋友" }, { word: "離闊", zhuyin: "ㄌㄧˊ ㄎㄨㄛˋ", meaning: "久別" }, { word: "幾何", zhuyin: "ㄐㄧˇ ㄏㄜˊ", meaning: "多少、多久" }] },
      { label: "山水之樂", original: "僕少好道，晚有此事。武宗元年，予始居易，居易之間，有山水之勝，足以自娛。", explanation: "白居易說自己年輕時喜好道家思想，晚年更以山水生活自娛。在居處附近有足夠美好的山水，可以安頓情緒、排遣寂寞。", notes: [{ word: "僕", zhuyin: "ㄆㄨˊ", meaning: "我，書信中自稱" }, { word: "好道", zhuyin: "ㄏㄠˋ ㄉㄠˋ", meaning: "喜愛道家思想；好，此處讀ㄏㄠˋ" }, { word: "自娛", zhuyin: "ㄗˋ ㄩˊ", meaning: "自我娛樂、排遣" }] },
      { label: "廬山草堂", original: "每一獨往，動彌旬日。平生所好者，盡在其中。不惟忘歸，可以忘老。此三泰也。", explanation: "每次獨自前往山中，往往一去就是十多天。平生喜愛的事物都在山林裡，不只讓人忘記回家，甚至能忘記自己年老。這是人生三件值得慶幸的事之一。", notes: [{ word: "動", zhuyin: "ㄉㄨㄥˋ", meaning: "常常、往往" }, { word: "彌旬日", zhuyin: "ㄇㄧˊ ㄒㄩㄣˊ ㄖˋ", meaning: "滿十多天；彌，滿" }, { word: "泰", zhuyin: "ㄊㄞˋ", meaning: "安樂、吉祥" }] },
      { label: "與君共勉", original: "微之，微之！此時此夜，難為情。莫道桑榆晚，為霞尚滿天。", explanation: "白居易再次呼喚友人，說此時此夜實在難以排遣思念。但即使到了桑榆晚景，天空仍有晚霞滿布，勉勵朋友不要因年老或困頓而失去希望。", notes: [{ word: "桑榆晚", zhuyin: "ㄙㄤ ㄩˊ ㄨㄢˇ", meaning: "比喻晚年；桑榆，日落時光照樹梢" }, { word: "為霞", zhuyin: "ㄨㄟˊ ㄒㄧㄚˊ", meaning: "仍有晚霞；為，語氣副詞，仍然" }, { word: "難為情", zhuyin: "ㄋㄢˊ ㄨㄟˊ ㄑㄧㄥˊ", meaning: "難以排遣情懷，不是害羞" }] },
    ],
  },
];
