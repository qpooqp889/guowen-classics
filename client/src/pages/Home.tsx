import { useEffect, useMemo, useState } from "react";
import { BookOpen, Bookmark, BookmarkCheck, ChevronRight, Headphones, Info, Library, Menu, Search, SlidersHorizontal, Volume2, X } from "lucide-react";
import { catalog, categories, dynasties } from "@/lib/catalog";
import { tangClassics } from "@/lib/tangClassics";
import { tangLearning } from "@/lib/tangLearning";

type Note = { word: string; zhuyin: string; meaning: string; hint?: string };
type Section = { label: string; original: string; explanation: string; notes: Note[] };
type Classic = {
  id: string;
  no: string;
  title: string;
  author: string;
  dynasty: string;
  theme: string;
  image: string;
  quote: string;
  sections: Section[];
};

const classics: Classic[] = [
  {
    id: "peach",
    no: "01",
    title: "桃花源記",
    author: "陶淵明",
    dynasty: "東晉",
    theme: "尋找理想生活的想像",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    quote: "不求喧鬧，只問心中是否有一方安定。",
    sections: [
      { label: "緣溪而行", original: "晉太元中，武陵人，捕魚為業，緣溪行，忘路之遠近，忽逢桃花林，夾岸數百步，中無雜樹，芳草鮮美，落英繽紛。", explanation: "東晉太元年間，有個武陵人靠捕魚維生。他沿著溪水前行，忘了走了多遠，忽然遇到一大片桃花林。溪流兩岸幾百步內沒有其他樹木，青草芬芳，落花繁多。", notes: [{ word: "緣", zhuyin: "ㄩㄢˊ", meaning: "沿著、順著" }, { word: "鮮美", zhuyin: "ㄒㄧㄢ ㄇㄟˇ", meaning: "鮮豔美麗" }, { word: "落英", zhuyin: "ㄌㄨㄛˋ ㄧㄥ", meaning: "落花" }] },
      { label: "洞口入境", original: "漁人甚異之，復前行，欲窮其林，林盡水源，便得一山，山有小口，彷彿若有光，便捨船，從口入。", explanation: "漁人覺得景象十分奇異，又繼續向前走，想走完桃花林。走到林子的盡頭，就是溪水的源頭；那裡有一座山，山上有個小洞口，似乎透出光來，他便下船走進洞口。", notes: [{ word: "甚異之", zhuyin: "ㄕㄣˋ ㄧˋ ㄓ", meaning: "對這件事感到非常驚奇" }, { word: "窮", zhuyin: "ㄑㄩㄥˊ", meaning: "走完、到盡頭" }, { word: "便捨船", zhuyin: "ㄅㄧㄢˋ ㄕㄜˇ ㄔㄨㄢˊ", meaning: "就離開船" }] },
      { label: "村中問訊", original: "初極狹，纔通人，復行數十步，豁然開朗，土地平曠，屋舍儼然，有良田、美池、桑竹之屬。", explanation: "洞口起初非常狹窄，只能容一人通過；再走幾十步，眼前忽然開闊明亮。土地平坦寬廣，房屋整齊，還有良田、美池、桑樹與竹林。", notes: [{ word: "纔", zhuyin: "ㄘㄞˊ", meaning: "僅僅、才" }, { word: "豁然", zhuyin: "ㄏㄨㄛˋ ㄖㄢˊ", meaning: "開闊的樣子" }, { word: "儼然", zhuyin: "ㄧㄢˇ ㄖㄢˊ", meaning: "整齊的樣子" }] },
      { label: "不復得路", original: "既出，得其船，便扶向路，處處誌之，及郡下，詣太守，說如此……遂迷不復得路。", explanation: "漁人離開桃花源後，沿著原路回去，一路做記號。到了郡裡，他向太守報告；太守派人尋找，卻迷失方向，再也找不到原來的路。", notes: [{ word: "誌", zhuyin: "ㄓˋ", meaning: "通「誌」，做記號" }, { word: "詣", zhuyin: "ㄧˋ", meaning: "到、拜訪" }, { word: "遂", zhuyin: "ㄙㄨㄟˋ", meaning: "於是、就" }] },
    ],
  },
  {
    id: "tower",
    no: "02",
    title: "岳陽樓記",
    author: "范仲淹",
    dynasty: "北宋",
    theme: "先憂後樂的胸襟",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
    quote: "把自己的心放得更遠，才能看見天下。",
    sections: [
      { label: "重修岳陽樓", original: "慶曆四年春，滕子京謫守巴陵郡。越明年，政通人和，百廢具興，乃重修岳陽樓，增其舊制，刻唐賢今人詩賦於其上；屬予作文以記之。", explanation: "慶曆四年春天，滕子京被貶到巴陵郡任太守。第二年，政事通達、百姓和樂，各種荒廢的事都興辦起來，於是重修岳陽樓，並請我寫文章記下這件事。", notes: [{ word: "謫", zhuyin: "ㄓㄜˊ", meaning: "封建時代官員被降職或調往邊遠地區" }, { word: "屬", zhuyin: "ㄓㄨˇ", meaning: "同「囑」，託付、請託；此處不是ㄕㄨˇ" }, { word: "具", zhuyin: "ㄐㄩˋ", meaning: "通「俱」，都" }] },
      { label: "洞庭勝狀", original: "予觀夫巴陵勝狀，在洞庭一湖。銜遠山，吞長江，浩浩湯湯，橫無際涯；朝暉夕陰，氣象萬千。", explanation: "我看那巴陵郡最美的景色，全在洞庭湖。湖面連接遠山、容納長江，浩大廣闊，看不到邊際；早晚光線變化，景象千變萬化。", notes: [{ word: "夫", zhuyin: "ㄈㄨˊ", meaning: "語氣詞，放在句首引出議論；此處不是丈夫的ㄈㄨ" }, { word: "湯湯", zhuyin: "ㄕㄤ ㄕㄤ", meaning: "水勢浩大的樣子" }, { word: "際涯", zhuyin: "ㄐㄧˋ ㄧㄚˊ", meaning: "邊際" }] },
      { label: "一悲一喜", original: "若夫霪雨霏霏，連月不開……登斯樓也，則有去國懷鄉，憂讒畏譏，滿目蕭然，感極而悲者矣。", explanation: "陰雨連綿、風浪大作時，登樓的人會因離開京城、思念家鄉，又擔心讒言與譏評而悲傷。相反地，春光明媚、湖面平靜時，登樓便心胸開闊、精神愉快。", notes: [{ word: "霪雨", zhuyin: "ㄧㄣˊ ㄩˇ", meaning: "久下不停的雨" }, { word: "霏霏", zhuyin: "ㄈㄟ ㄈㄟ", meaning: "雨雪密集的樣子" }, { word: "讒", zhuyin: "ㄔㄢˊ", meaning: "毀謗、說人壞話" }] },
      { label: "先天下之憂", original: "不以物喜，不以己悲……先天下之憂而憂，後天下之樂而樂。", explanation: "古代仁人不因外在環境或自己的得失而喜悲；在朝廷或退居民間，都憂心國家與百姓。因此要在天下人憂愁以前先憂愁，在天下人快樂以後才快樂。", notes: [{ word: "廟堂", zhuyin: "ㄇㄧㄠˋ ㄊㄤˊ", meaning: "朝廷" }, { word: "微斯人", zhuyin: "ㄨㄟˊ ㄙ ㄖㄣˊ", meaning: "如果沒有這種人；微，若非、如果沒有" }, { word: "歸", zhuyin: "ㄍㄨㄟ", meaning: "歸依、同道" }] },
    ],
  },
  {
    id: "drunkard",
    no: "03",
    title: "醉翁亭記",
    author: "歐陽脩",
    dynasty: "北宋",
    theme: "與民同樂的山水情懷",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    quote: "山水是入口，與人同樂才是文章的深處。",
    sections: [
      { label: "醉翁之意", original: "環滁皆山也。其西南諸峰，林壑尤美，望之蔚然而深秀者，琅琊也……醉翁之意不在酒，在乎山水之間也。", explanation: "滁州四周都是山，西南各峰尤其秀美；走過山路，聽見泉聲，便看見像鳥翼般臨泉的醉翁亭。太守因為年紀最大，自號醉翁；他的興致不在酒，而在山水之間。", notes: [{ word: "壑", zhuyin: "ㄏㄜˋ", meaning: "山谷" }, { word: "蔚然", zhuyin: "ㄨㄟˋ ㄖㄢˊ", meaning: "草木茂盛的樣子；此處讀ㄨㄟˋ，不讀ㄨㄟˊ" }, { word: "輒", zhuyin: "ㄓㄜˊ", meaning: "總是、就" }] },
      { label: "山間四時", original: "若夫日出而林霏開，雲歸而岩穴暝……朝而往，暮而歸，四時之景不同，而樂亦無窮也。", explanation: "太陽出來，林霧散開；雲霧聚攏，山谷就昏暗。野花散發清香，樹木繁茂成蔭，秋高氣爽、水落石出，四季景色不同，樂趣也沒有窮盡。", notes: [{ word: "霏", zhuyin: "ㄈㄟ", meaning: "霧氣或雨雪密集的樣子" }, { word: "暝", zhuyin: "ㄇㄧㄥˊ", meaning: "昏暗" }, { word: "秀", zhuyin: "ㄒㄧㄡˋ", meaning: "茂盛" }] },
      { label: "太守之宴", original: "至於負者歌於途，行者休於樹……觥籌交錯，起坐而喧譁者，眾賓歡也。", explanation: "滁州人扶老攜幼出遊，有人唱歌、有人休息；溪邊捕魚、用泉水釀酒，太守設宴，賓客投壺下棋、觥籌交錯，大家都十分歡樂。", notes: [{ word: "傴僂", zhuyin: "ㄩˇ ㄌㄡˊ", meaning: "彎腰曲背，指老人" }, { word: "觥", zhuyin: "ㄍㄨㄥ", meaning: "古代用獸角做的酒器" }, { word: "洌", zhuyin: "ㄌㄧㄝˋ", meaning: "清澈；形容酒清而醇" }] },
      { label: "太守之樂", original: "人知從太守遊而樂，而不知太守之樂其樂也。醉能同其樂，醒能述以文者，太守也。", explanation: "人們只知道跟隨太守遊玩的快樂，卻不知道太守把大家的快樂當作自己的快樂。醉時能和大家同樂，醒後能寫文章記述這份快樂的人，就是太守。", notes: [{ word: "樂其樂", zhuyin: "ㄌㄜˋ ㄑㄧˊ ㄌㄜˋ", meaning: "以他人的快樂為快樂；前一個樂是意動用法" }, { word: "述", zhuyin: "ㄕㄨˋ", meaning: "記述" }, { word: "脩", zhuyin: "ㄒㄧㄡ", meaning: "歐陽脩的脩，古籍常作脩；今多寫作修" }] },
    ],
  },
];

function speak(text: string, rate = 0.78) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-TW";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

export default function Home() {
  const [activeId, setActiveId] = useState("peach");
  const [activeSection, setActiveSection] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部分類");
  const [dynasty, setDynasty] = useState("全部朝代");
  const [coreOnly, setCoreOnly] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [tangId, setTangId] = useState(tangClassics[0].id);
  const [tangSection, setTangSection] = useState(0);
  const [favorites, setFavorites] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem("guowen-favorites") ?? "[]"); } catch { return []; } });
  const [showFavorites, setShowFavorites] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.78);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const active = useMemo(() => classics.find((item) => item.id === activeId) ?? classics[0], [activeId]);
  const section = active.sections[activeSection] ?? active.sections[0];
  const filteredCatalog = useMemo(() => catalog.filter((item) => {
    const haystack = `${item.title} ${item.author} ${item.dynasty} ${item.genre} ${item.category}`;
    return (!query.trim() || haystack.includes(query.trim())) && (category === "全部分類" || item.category === category) && (dynasty === "全部朝代" || item.dynasty === dynasty) && (!coreOnly || item.core);
  }), [query, category, dynasty, coreOnly]);
  const visibleCatalog = showAllResults ? filteredCatalog : filteredCatalog.slice(0, 12);
  const activeTang = useMemo(() => tangClassics.find((item) => item.id === tangId) ?? tangClassics[0], [tangId]);
  const activeTangSection = activeTang.sections[tangSection] ?? activeTang.sections[0];
  const activeTangLearning = tangLearning[activeTang.id];
  const quizScore = activeTangLearning.quiz.reduce((score, question, index) => score + (quizAnswers[index] === question.answer ? 1 : 0), 0);
  const favoriteClassics = classics.filter((item) => favorites.includes(`classic:${item.id}`));
  const favoriteItems = catalog.filter((item) => favorites.includes(`catalog:${item.no}`));
  const favoriteTang = tangClassics.filter((item) => favorites.includes(`tang:${item.id}`));

  useEffect(() => { localStorage.setItem("guowen-favorites", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { setTangSection(0); setQuizOpen(false); setQuizAnswers({}); setQuizSubmitted(false); }, [tangId]);
  const toggleFavorite = (key: string) => setFavorites((items) => items.includes(key) ? items.filter((item) => item !== key) : [...items, key]);
  const favorite = (key: string) => favorites.includes(key);

  const selectClassic = (id: string) => {
    setActiveId(id);
    setActiveSection(0);
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <header className="relative z-20 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <button className="flex items-center gap-3 text-left" onClick={() => selectClassic("peach")} aria-label="回到首頁篇章">
            <span className="seal-mark" aria-hidden="true"><span className="seal-page" /></span>
            <span><span className="block font-sans text-[10px] font-semibold tracking-[0.3em] text-moss">國中國文學習頁</span><span className="block font-serif text-xl font-bold tracking-[0.12em]">古文小冊</span></span>
          </button>
          <nav className="hidden items-center gap-8 font-sans text-sm text-ink/65 md:flex" aria-label="主要導覽">
            <a href="#classics" className="hover:text-red transition-colors">篇章閱讀</a>
            <a href="#catalog" className="hover:text-red transition-colors">百篇檢索</a>
            <a href="#tang" className="hover:text-red transition-colors">唐代專題</a>
            <a href="#how-to-read" className="hover:text-red transition-colors">讀法提示</a>
            <a href="#sources" className="hover:text-red transition-colors">資料來源</a>
          </nav>
          <div className="flex items-center gap-2"><button className="favorite-nav" onClick={() => setShowFavorites((value) => !value)} aria-pressed={showFavorites}><Bookmark size={16} />我的收藏 <span>{favorites.length}</span></button><button className="rounded-full p-2 text-moss hover:bg-moss/10 md:hidden" onClick={() => setShowMenu((value) => !value)} aria-label="開啟行動版選單">{showMenu ? <X size={22} /> : <Menu size={22} />}</button></div>
        </div>
        {showMenu && <div className="border-t border-ink/10 bg-paper px-5 py-4 font-sans text-sm md:hidden"><a className="mr-5" href="#classics" onClick={() => setShowMenu(false)}>篇章閱讀</a><a className="mr-5" href="#tang" onClick={() => setShowMenu(false)}>唐代專題</a><a className="mr-5" href="#how-to-read" onClick={() => setShowMenu(false)}>讀法提示</a><a href="#sources" onClick={() => setShowMenu(false)}>資料來源</a></div>}
      </header>

      {showFavorites && <section className="favorite-drawer border-b border-red/20 bg-mist"><div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-16"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="section-kicker">我的書頁・{favorites.length} 篇</p><h2 className="mt-2 font-serif text-2xl font-bold">收藏，留給下一次複習</h2></div><button className="font-sans text-xs font-bold text-moss underline underline-offset-4" onClick={() => setShowFavorites(false)}>關閉收藏</button></div>{favorites.length === 0 ? <div className="mt-5 flex items-center gap-3 border border-dashed border-ink/20 bg-paper/60 p-5 font-serif text-sm text-ink/60"><Library size={18} className="text-red" />還沒有收藏。閱讀時按下「收藏篇章」，就能在這裡快速回來。</div> : <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[...favoriteClassics.map((item) => ({ key: `classic:${item.id}`, title: item.title, meta: `${item.author}・${item.dynasty}`, jump: () => { selectClassic(item.id); setShowFavorites(false); } })), ...favoriteTang.map((item) => ({ key: `tang:${item.id}`, title: item.title, meta: `${item.author}・唐代`, jump: () => { setTangId(item.id); setTangSection(0); setShowFavorites(false); document.getElementById("tang")?.scrollIntoView({ behavior: "smooth" }); } })), ...favoriteItems.map((item) => ({ key: `catalog:${item.no}`, title: item.title, meta: `${item.author}・${item.dynasty}`, jump: () => { setQuery(item.title); setShowFavorites(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); } }))].map((item) => <div key={item.key} className="favorite-card"><button className="text-left" onClick={item.jump}><span className="font-sans text-[10px] tracking-[.16em] text-red">BOOKMARK</span><span className="mt-2 block font-serif text-lg font-bold">{item.title}</span><span className="mt-1 block font-sans text-xs text-ink/50">{item.meta}</span></button><button className="favorite-remove" onClick={() => toggleFavorite(item.key)} aria-label={`取消收藏${item.title}`}><BookmarkCheck size={15} /></button></div>)}</div>}</div></section>}

      <section className="relative border-b border-ink/10">
        <div className={`hero-image hero-${active.id} absolute inset-0`} aria-hidden="true" />
        <div className="hero-wash absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-32">
          <div className="max-w-2xl animate-rise">
            <div className="mb-6 flex items-center gap-3 font-sans text-xs font-bold tracking-[0.22em] text-red"><span className="h-px w-12 bg-red" />國中國文・古文入門</div>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-7xl">讀一段古文，<br /><em className="font-normal text-moss">看見一個世界。</em></h1>
            <p className="mt-7 max-w-lg font-serif text-lg leading-8 text-ink/70">從原文、白話到字音批註，讓國中程度的文言文不再只是背誦，而是一頁一頁讀得懂的風景。</p>
            <div className="mt-10 flex flex-wrap items-center gap-4"><a href="#classics" className="inline-flex items-center gap-2 bg-moss px-6 py-3 font-sans text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-ink">開始讀篇章 <ChevronRight size={16} /></a><span className="font-sans text-xs text-ink/55">三篇・逐段解釋・異讀提醒</span></div>
          </div>
          <div className="hidden items-end justify-end lg:flex"><div className="hero-caption max-w-xs border-l-2 border-red pl-5 font-serif text-lg italic leading-8 text-ink/70">「{active.quote}」<span className="mt-2 block font-sans text-xs not-italic tracking-wider text-ink/45">— 今日選讀：{active.title}</span></div></div>
        </div>
      </section>

      <section id="classics" className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 lg:grid-cols-[220px_1fr] lg:px-16 lg:py-24">
        <aside className="lg:sticky lg:top-8 lg:h-fit"><p className="section-kicker">篇章目錄</p><h2 className="mt-2 font-serif text-2xl font-bold">三頁古文</h2><div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2">{classics.map((item) => <button key={item.id} onClick={() => selectClassic(item.id)} className={`chapter-tab ${activeId === item.id ? "is-active" : ""}`}><span className="font-sans text-[11px] tracking-widest">{item.no}</span><span className="font-serif text-lg font-bold">{item.title}</span><span className="hidden font-sans text-xs text-ink/45 lg:block">{item.author}・{item.dynasty}</span></button>)}</div></aside>
        <div className="paper-page relative min-w-0 border-y border-ink/10 p-6 sm:p-10 lg:border-y-2 lg:p-14">
          <div className="absolute right-6 top-6 text-right font-sans text-[10px] tracking-[0.22em] text-ink/35">READING PAGE<br /><span className="text-red">{active.no} / 03</span></div>
          <div className="max-w-4xl"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">{active.theme}</p><h2 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">{active.title}</h2><p className="mt-3 font-sans text-sm text-ink/55">{active.author}・{active.dynasty}</p></div><div className="flex flex-wrap items-center gap-2"><label className="speech-speed"><Headphones size={14} /><span>語速</span><select value={speechRate} onChange={(event) => setSpeechRate(Number(event.target.value))} aria-label="朗讀語速"><option value="0.78">正常</option><option value="0.58">較慢</option></select></label><button className="listen-button" onClick={() => speak(active.sections.map((item) => item.original).join(" "), speechRate)}><Headphones size={16} />朗讀全文</button><button className={`bookmark-button ${favorite(`classic:${active.id}`) ? "is-active" : ""}`} onClick={() => toggleFavorite(`classic:${active.id}`)} aria-pressed={favorite(`classic:${active.id}`)}>{favorite(`classic:${active.id}`) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{favorite(`classic:${active.id}`) ? "已收藏" : "收藏篇章"}</button></div></div>
            <div className="mt-10 grid gap-5 border-y border-ink/15 py-5 sm:grid-cols-3"><div><span className="section-kicker">讀前先想</span><p className="mt-2 font-serif text-base leading-7">這篇文章想帶你看見什麼樣的人生？</p></div><div><span className="section-kicker">閱讀方式</span><p className="mt-2 font-serif text-base leading-7">先讀原文，再打開白話與字音。</p></div><div><span className="section-kicker">目前段落</span><p className="mt-2 font-serif text-base leading-7">第 {String(activeSection + 1).padStart(2, "0")} 段・{section.label}</p></div></div>
            <div className="mt-10 grid gap-10 xl:grid-cols-[1fr_250px]"><article><div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label={`${active.title}段落選擇`}>{active.sections.map((item, index) => <button key={item.label} onClick={() => setActiveSection(index)} className={`section-pill ${index === activeSection ? "is-active" : ""}`} role="tab" aria-selected={index === activeSection}>{String(index + 1).padStart(2, "0")} {item.label}</button>)}</div><div className="paragraph-number">{String(activeSection + 1).padStart(2, "0")}</div><h3 className="font-serif text-2xl font-bold">{section.label}</h3><p className="mt-6 font-serif text-[21px] leading-[2.1] tracking-wide">{section.original}</p><button className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold text-moss hover:text-red" onClick={() => speak(section.original, speechRate)}><Volume2 size={15} />聽這一段</button><div className="translation-box mt-8"><div className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-red"><span className="h-2 w-2 rounded-full bg-red" />白話解釋</div><p className="mt-3 font-serif text-base leading-8 text-ink/80">{section.explanation}</p></div></article><aside className="annotation-rail"><div className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-moss"><Info size={15} />字音批註</div><p className="mt-3 font-serif text-sm leading-6 text-ink/60">古文裡，有些字的讀法與今天不同。點下方喇叭，可以聽臺灣華語示範。</p><div className="mt-5 space-y-3">{section.notes.map((note) => <button key={note.word} className="note-card group w-full text-left" onClick={() => speak(note.word, speechRate)}><div className="flex items-baseline justify-between gap-3"><span className="font-serif text-lg font-bold">{note.word}</span><span className="font-sans text-xs text-red">{note.zhuyin}</span></div><p className="mt-1 font-sans text-xs leading-5 text-ink/60">{note.meaning}</p>{note.hint && <p className="mt-2 border-t border-red/20 pt-2 font-sans text-[11px] font-bold leading-5 text-red">{note.hint}</p>}<Volume2 size={14} className="mt-2 text-ink/30 transition group-hover:text-red" /></button>)}</div><a className="mt-6 inline-block font-sans text-xs font-bold text-moss underline decoration-moss/30 underline-offset-4 hover:text-red" href="https://dict.mini.moe.edu.tw/" target="_blank" rel="noreferrer">到教育部國語小字典查音 →</a></aside></div>
          </div>
        </div>
      </section>

      <section id="tang" className="border-y border-ink/10 bg-mist"><div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 lg:grid-cols-[230px_1fr] lg:px-16 lg:py-24"><aside className="lg:sticky lg:top-8 lg:h-fit"><p className="section-kicker">唐代・五篇精讀</p><h2 className="mt-2 font-serif text-2xl font-bold">一朝文章，五種聲音</h2><p className="mt-3 font-serif text-sm leading-6 text-ink/60">從師道、山水、傳奇、諫言到友情，依序讀見唐代散文的不同面貌。</p><div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2">{tangClassics.map((item, index) => <button key={item.id} onClick={() => { setTangId(item.id); setTangSection(0); }} className={`chapter-tab ${tangId === item.id ? "is-active" : ""}`}><span className="font-sans text-[11px] tracking-widest">唐・{String(index + 1).padStart(2, "0")}</span><span className="font-serif text-lg font-bold">{item.title}</span><span className="hidden font-sans text-xs text-ink/45 lg:block">{item.author}・{item.genre}</span></button>)}</div></aside><div className="paper-page relative min-w-0 border-y border-ink/10 p-6 sm:p-10 lg:border-y-2 lg:p-14"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">{activeTang.theme}</p><h2 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">{activeTang.title}</h2><p className="mt-3 font-sans text-sm text-ink/55">{activeTang.author}・唐代・{activeTang.genre}</p></div><div className="flex flex-wrap items-center gap-2"><label className="speech-speed"><Headphones size={14} /><span>語速</span><select value={speechRate} onChange={(event) => setSpeechRate(Number(event.target.value))} aria-label="朗讀語速"><option value="0.78">正常</option><option value="0.58">較慢</option></select></label><button className="listen-button" onClick={() => speak(activeTang.sections.map((item) => item.original).join(" "), speechRate)}><Headphones size={16} />朗讀全文</button><button className={`bookmark-button ${favorite(`tang:${activeTang.id}`) ? "is-active" : ""}`} onClick={() => toggleFavorite(`tang:${activeTang.id}`)} aria-pressed={favorite(`tang:${activeTang.id}`)}>{favorite(`tang:${activeTang.id}`) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{favorite(`tang:${activeTang.id}`) ? "已收藏" : "收藏篇章"}</button></div></div><div className="author-context-grid mt-8"><div className="author-context-card"><span className="section-kicker">作者小傳・{activeTang.author}</span><p className="mt-3 font-serif text-base leading-8 text-ink/80">{activeTangLearning.bio}</p></div><div className="author-context-card"><span className="section-kicker">時代背景・讀前提示</span><p className="mt-3 font-serif text-base leading-8 text-ink/80">{activeTangLearning.context}</p><p className="mt-3 border-t border-moss/20 pt-3 font-sans text-xs leading-6 text-moss">理解關鍵：{activeTangLearning.takeaway}</p></div></div><div className="mt-8 grid gap-10 xl:grid-cols-[1fr_250px]"><article><div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label={`${activeTang.title}段落選擇`}>{activeTang.sections.map((item, index) => <button key={item.label} onClick={() => setTangSection(index)} className={`section-pill ${index === tangSection ? "is-active" : ""}`} role="tab" aria-selected={index === tangSection}>{String(index + 1).padStart(2, "0")} {item.label}</button>)}</div><div className="paragraph-number">{String(tangSection + 1).padStart(2, "0")}</div><h3 className="font-serif text-2xl font-bold">{activeTangSection.label}</h3><p className="mt-6 font-serif text-[21px] leading-[2.1] tracking-wide">{activeTangSection.original}</p><button className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold text-moss hover:text-red" onClick={() => speak(activeTangSection.original, speechRate)}><Volume2 size={15} />聽這一段</button><div className="translation-box mt-8"><div className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-red"><span className="h-2 w-2 rounded-full bg-red" />逐段白話解釋</div><p className="mt-3 font-serif text-base leading-8 text-ink/80">{activeTangSection.explanation}</p></div></article><aside className="annotation-rail"><div className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-moss"><Info size={15} />特殊字音批註</div><p className="mt-3 font-serif text-sm leading-6 text-ink/60">標出古今讀音不同、通假字與容易誤讀的字。按字詞卡即可朗讀示範。</p><div className="mt-5 space-y-3">{activeTangSection.notes.map((note) => <button key={note.word} className="note-card group w-full text-left" onClick={() => speak(note.word, speechRate)}><div className="flex items-baseline justify-between gap-3"><span className="font-serif text-lg font-bold">{note.word}</span><span className="font-sans text-xs text-red">{note.zhuyin}</span></div><p className="mt-1 font-sans text-xs leading-5 text-ink/60">{note.meaning}</p>{note.hint && <p className="mt-2 border-t border-red/20 pt-2 font-sans text-[11px] font-bold leading-5 text-red">{note.hint}</p>}<Volume2 size={14} className="mt-2 text-ink/30 transition group-hover:text-red" /></button>)}</div><a className="mt-6 inline-block font-sans text-xs font-bold text-moss underline decoration-moss/30 underline-offset-4 hover:text-red" href={activeTang.source} target="_blank" rel="noreferrer">查看教材來源頁 →</a></aside></div><section className="quiz-panel mt-10"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="section-kicker">收藏複習・即時檢查</p><h3 className="mt-2 font-serif text-2xl font-bold">測測你記住了多少？</h3><p className="mt-2 font-sans text-xs leading-6 text-ink/55">本篇有兩題：一題字音、一題解釋。先作答，再查看老師批註。</p></div><button className="quiz-launch" onClick={() => { setQuizOpen((value) => !value); setQuizSubmitted(false); setQuizAnswers({}); }}>{quizOpen ? "收合測驗" : "開始小測驗"}</button></div>{quizOpen && <div className="mt-7 space-y-7">{activeTangLearning.quiz.map((question, index) => <fieldset key={question.prompt} className="quiz-question"><legend><span className="quiz-number">0{index + 1}</span><span className="quiz-kind">{question.type === "sound" ? "字音題" : "解釋題"}</span>{question.prompt}</legend><div className="mt-4 grid gap-2 sm:grid-cols-2">{question.options.map((option) => <label key={option} className={`quiz-option ${quizSubmitted && option === question.answer ? "is-correct" : ""} ${quizSubmitted && quizAnswers[index] === option && option !== question.answer ? "is-wrong" : ""}`}><input type="radio" name={`question-${index}`} value={option} checked={quizAnswers[index] === option} onChange={() => setQuizAnswers((answers) => ({ ...answers, [index]: option }))} disabled={quizSubmitted} />{option}</label>)}</div>{quizSubmitted && <p className={`quiz-feedback ${quizAnswers[index] === question.answer ? "is-correct" : "is-wrong"}`}>{quizAnswers[index] === question.answer ? "答對了！" : `再想想：正確答案是「${question.answer}」。`} {question.explanation}</p>}</fieldset>)}<div className="flex flex-wrap items-center gap-4"><button className="quiz-submit" onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < activeTangLearning.quiz.length || quizSubmitted}>{quizSubmitted ? `得分 ${quizScore}／${activeTangLearning.quiz.length}` : "檢查答案"}</button>{quizSubmitted && <button className="font-sans text-xs font-bold text-moss underline underline-offset-4" onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}>重新作答</button>}</div></div>}</section></div></div></section>

      <section id="catalog" className="border-y border-ink/10 bg-paper"><div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-16 lg:py-24"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-kicker">百篇索引・可檢索</p><h2 className="mt-3 font-serif text-4xl font-bold">找到你的下一篇古文</h2><p className="mt-3 max-w-xl font-serif text-base leading-7 text-ink/60">依篇名、作者、朝代或學習主題尋找。標示「已整理」的篇目已連結至可靠教材頁；「索引」篇目先提供篇名資料，後續再逐篇補上完整講解。</p></div><div className="flex items-center gap-2 font-sans text-xs text-ink/45"><BookOpen size={16} className="text-moss" />共 {catalog.length} 篇</div></div><div className="mt-10 grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_auto]"><label className="search-field lg:col-span-1"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); setShowAllResults(false); }} placeholder="搜尋篇名、作者或關鍵字" aria-label="搜尋篇名、作者或關鍵字" /></label><select className="filter-field" value={category} onChange={(event) => { setCategory(event.target.value); setShowAllResults(false); }} aria-label="依分類篩選">{categories.map((item) => <option key={item}>{item}</option>)}</select><select className="filter-field" value={dynasty} onChange={(event) => { setDynasty(event.target.value); setShowAllResults(false); }} aria-label="依朝代篩選">{dynasties.map((item) => <option key={item}>{item}</option>)}</select><button className={`core-toggle ${coreOnly ? "is-active" : ""}`} onClick={() => { setCoreOnly((value) => !value); setShowAllResults(false); }}><SlidersHorizontal size={15} />只看課綱</button></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="font-sans text-xs text-ink/50">找到 <span className="font-bold text-red">{filteredCatalog.length}</span> 篇・目前顯示 {Math.min(visibleCatalog.length, filteredCatalog.length)} 篇</p>{(query || category !== "全部分類" || dynasty !== "全部朝代" || coreOnly) && <button className="font-sans text-xs font-bold text-moss underline underline-offset-4" onClick={() => { setQuery(""); setCategory("全部分類"); setDynasty("全部朝代"); setCoreOnly(false); setShowAllResults(false); }}>清除篩選</button>}</div><div className="catalog-grid mt-5">{visibleCatalog.map((item) => <article key={`${item.no}-${item.title}`} className="catalog-item"><div className="flex items-start justify-between gap-3"><span className="font-sans text-[11px] tracking-[.18em] text-red">{String(item.no).padStart(3, "0")}</span><span className={`status-chip ${item.status === "已整理" ? "is-ready" : ""}`}>{item.status}</span></div><h3 className="mt-4 font-serif text-xl font-bold">{item.title}</h3><p className="mt-2 font-sans text-xs text-ink/55">{item.author}・{item.dynasty}</p><div className="mt-4 flex flex-wrap gap-2 font-sans text-[10px] text-ink/55"><span className="tag-chip">{item.category}</span><span className="tag-chip">{item.genre}</span></div><div className="mt-5">{item.source ? <a className="catalog-link" href={item.source} target="_blank" rel="noreferrer">閱讀來源頁 <ChevronRight size={13} /></a> : <span className="font-sans text-[11px] text-ink/40">完整內容校對中</span>}</div></article>)}</div>{filteredCatalog.length === 0 && <div className="empty-catalog mt-5">找不到相符篇目。試試「桃花」「蘇軾」或選擇其他分類。</div>}{filteredCatalog.length > 12 && <button className="mx-auto mt-10 flex items-center gap-2 border-b border-moss px-2 pb-2 font-sans text-sm font-bold text-moss hover:border-red hover:text-red" onClick={() => setShowAllResults((value) => !value)}>{showAllResults ? "收合篇目" : `顯示全部 ${filteredCatalog.length} 篇`}<ChevronRight size={15} className={showAllResults ? "-rotate-90" : "rotate-90"} /></button>}</div></section>

      <section id="how-to-read" className="border-y border-ink/10 bg-mist"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-16 lg:py-20"><div><p className="section-kicker">讀法小札</p><h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">文言文的字音，<br /><span className="text-moss">要跟著語境走。</span></h2></div><div className="grid gap-6 sm:grid-cols-3"><div className="tip-card"><span className="tip-index">一</span><h3>先看上下文</h3><p>同一個字在不同句子裡，可能擔任不同角色，不能只看現代常用音。</p></div><div className="tip-card"><span className="tip-index">二</span><h3>注意通假字</h3><p>例如「屬予」的屬通「囑」，讀作ㄓㄨˇ，是課文裡值得記住的異讀。</p></div><div className="tip-card"><span className="tip-index">三</span><h3>聽讀再開口</h3><p>先按喇叭聽一遍，再自己朗讀，讓聲音幫助你抓住句子的節奏。</p></div></div></div></section>

      <footer id="sources" className="mx-auto max-w-[1440px] px-5 py-12 lg:px-16"><div className="flex flex-col justify-between gap-8 border-t border-ink/15 pt-8 md:flex-row"><div><div className="flex items-center gap-3"><span className="seal-mark small" aria-hidden="true"><span className="seal-page" /></span><span className="font-serif text-lg font-bold">古文小冊</span></div><p className="mt-3 max-w-md font-sans text-xs leading-6 text-ink/50">內容依教育部國民及學前教育署普通型高級中等學校國語文學科中心古典名篇頁面核對；字音延伸查詢連結至教育部國語小字典與教育百科。</p></div><div className="font-sans text-xs leading-7 text-ink/50"><p className="font-bold text-ink/70">資料來源</p><a className="block hover:text-red" href="https://cerclearning.tp.edu.tw/classical" target="_blank" rel="noreferrer">國語文學科中心・古典名篇</a><a className="block hover:text-red" href="https://dict.mini.moe.edu.tw/" target="_blank" rel="noreferrer">教育部國語小字典</a><a className="block hover:text-red" href="https://pedia.cloud.edu.tw/" target="_blank" rel="noreferrer">教育百科（教育雲）</a></div></div></footer>
    </main>
  );
}
