/* Style reminder: 歷史脈絡採課本邊欄式時間線與地點路線，不使用商業儀表板語言。 */
export type TimelineEvent = { date: string; title: string; detail: string };
export type PlacePoint = { name: string; detail: string };
export type QuizAttempt = { id: string; tangId: string; title: string; score: number; total: number; wrong: string[]; createdAt: string };
export type WrongQuestion = { key: string; tangId: string; title: string; type: "sound" | "meaning"; prompt: string; answer: string; explanation: string; lastWrongAt: string };

export const tangTimeline: Record<string, { events: TimelineEvent[]; places: PlacePoint[] }> = {
  shishuo: { events: [{ date: "768", title: "韓愈出生", detail: "字退之，後世稱韓昌黎、韓文公。" }, { date: "中唐", title: "古文運動", detail: "與柳宗元倡導古文，主張文章回到清楚有力的散文傳統。" }, { date: "824", title: "韓愈逝世", detail: "留下《昌黎先生集》，成為唐宋古文的重要典範。" }], places: [{ name: "昌黎・河陽", detail: "家族郡望與出生地脈絡" }, { name: "長安", detail: "唐代政治與文人活動中心" }] },
  xishan: { events: [{ date: "773", title: "柳宗元出生", detail: "字子厚，河東人，世稱柳河東、柳柳州。" }, { date: "805後", title: "貶居永州", detail: "政治失意後寄情山水，寫下〈永州八記〉等作品。" }, { date: "819", title: "柳宗元逝世", detail: "客死柳州，後列入唐宋八大家。" }], places: [{ name: "長安", detail: "出生與早年活動的京城" }, { name: "永州", detail: "寫作西山遊記的山水空間" }, { name: "柳州", detail: "晚年任所，也成為後世稱號來源" }] },
  qiuran: { events: [{ date: "850", title: "杜光庭出生", detail: "字賓至，號東瀛子，處州縉雲人。" }, { date: "晚唐", title: "入道與入蜀", detail: "應試不第後入天台山為道士，避亂入蜀。" }, { date: "933", title: "杜光庭逝世", detail: "留下道教著述與傳奇作品，〈虯髯客傳〉流傳後世。" }], places: [{ name: "縉雲", detail: "籍貫與早年脈絡" }, { name: "天台山", detail: "入道修行之地" }, { name: "蜀地・青城山", detail: "晚唐入蜀、晚年隱居的地點" }] },
  shisi: { events: [{ date: "580", title: "魏徵出生", detail: "字玄成，隋末唐初重要政治家與諫臣。" }, { date: "627—649", title: "貞觀時期", detail: "唐太宗治國漸安，魏徵以直諫提醒居安思危。" }, { date: "643", title: "魏徵逝世", detail: "其諫言精神成為後世君臣相處與納諫的典範。" }], places: [{ name: "長安", detail: "唐太宗朝政與奏疏往來的中心" }, { name: "朝廷", detail: "〈十思疏〉針對君主施政提出勸諫" }] },
  yuanwei: { events: [{ date: "772", title: "白居易出生", detail: "字樂天，號香山居士，唐代重要詩人。" }, { date: "中唐", title: "與元稹交遊", detail: "兩人以詩文與書信維繫深厚友誼。" }, { date: "晚年・洛陽", title: "桑榆仍滿天", detail: "退居洛陽仍持續寫作，保有對友情與生命的期待。" }, { date: "846", title: "白居易逝世", detail: "留下平易近人的詩文與豐富的書信作品。" }], places: [{ name: "長安・仕途", detail: "文人仕進與友朋往來的城市" }, { name: "洛陽", detail: "晚年居處與自我安頓的空間" }] },
};
