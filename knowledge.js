const compareTableBody = document.getElementById("compare-table-body");

const translations = {
  en: {
    navCalculator: "Calculator",
    navKnowledge: "Knowledge",
    navGenerate: "Generate Chart",
    knowledgeEyebrow: "Knowledge Library",
    knowledgeTitle: "Bazi, Five Elements, and the Language of Chinese Astrology",
    knowledgeSubtitle: "A modern guide for international users who want to understand Chinese metaphysics through clear language, symbolic images, and practical comparisons.",
    symbol1Title: "Cosmic Timing",
    symbol1Copy: "Bazi begins with time. Your birth moment becomes a symbolic map of cycles and timing.",
    symbol2Title: "Five Elements",
    symbol2Copy: "Wood, Fire, Earth, Metal, and Water describe the energetic texture of a chart.",
    symbol3Title: "Eastern Symbols",
    symbol3Copy: "Chinese astrology speaks through layered symbols, not only through psychological archetypes.",
    whatTopline: "What is Bazi?",
    whatTitle: "Four Pillars of Destiny",
    whatCopy: "Bazi (Four Pillars of Destiny) is a traditional Chinese system used to analyze personality and life patterns based on birth time.",
    whatItems: ["Year → background", "Month → career", "Day → personality", "Hour → future potential"],
    fiveTopline: "Five Elements",
    fiveTitle: "How Chinese Astrology Reads Energy",
    fiveCopy: "Chinese astrology uses five elements to describe energy balance: Wood, Fire, Earth, Metal, and Water.",
    fiveItems: [
      "Wood → growth, movement, expansion",
      "Fire → passion, visibility, expression",
      "Earth → grounding, stability, support",
      "Metal → structure, precision, boundaries",
      "Water → adaptability, depth, intuition",
    ],
    compareTopline: "Bazi vs Western Zodiac",
    compareTitle: "Two Personality Systems, Different Frameworks",
    compareHeaders: ["Topic", "Bazi", "Western Zodiac"],
    compareRows: [
      ["Input", "Birth date + birth time", "Birth date"],
      ["Framework", "Heavenly Stems, Earthly Branches, Five Elements", "Sun signs, planets, houses"],
      ["Main focus", "Energy balance and life patterns", "Psychology and archetypal traits"],
      ["Strength", "Timing, structure, deeper energetic patterns", "Immediate personality familiarity"],
    ],
    compareNote: "Both systems analyze personality, but they do so through different symbolic languages.",
    footerCalculator: "Calculator",
    footerKnowledge: "Knowledge",
  },
  zh: {
    navCalculator: "测算",
    navKnowledge: "知识",
    navGenerate: "开始排盘",
    knowledgeEyebrow: "知识库",
    knowledgeTitle: "八字、五行，以及中国命理的语言体系",
    knowledgeSubtitle: "这是一份面向国际用户的现代化入门指南，用更清晰的语言、象征图形和对照方式理解中国玄学。",
    symbol1Title: "时间与天象",
    symbol1Copy: "八字从时间开始。你的出生时刻会被转化为一张关于节律与阶段的象征地图。",
    symbol2Title: "五行结构",
    symbol2Copy: "木、火、土、金、水用来描述命盘中的能量质感和偏向。",
    symbol3Title: "东方符号系统",
    symbol3Copy: "中国命理更像一套层层递进的象征语言，而不只是人格标签。",
    whatTopline: "什么是八字？",
    whatTitle: "四柱命运结构",
    whatCopy: "八字（四柱）是传统中国命理系统，会依据出生时间分析性格特征与人生模式。",
    whatItems: ["年柱 → 背景", "月柱 → 事业", "日柱 → 性格核心", "时柱 → 未来潜能"],
    fiveTopline: "五行",
    fiveTitle: "中国命理如何理解能量",
    fiveCopy: "中国命理使用五行来描述能量平衡：木、火、土、金、水。",
    fiveItems: [
      "木 → 成长、延展、向上",
      "火 → 热情、可见度、表达",
      "土 → 稳定、支持、承载",
      "金 → 结构、边界、判断",
      "水 → 流动、直觉、深度",
    ],
    compareTopline: "八字 vs 西方星座",
    compareTitle: "两种人格系统，不同的理解框架",
    compareHeaders: ["主题", "八字", "西方星座"],
    compareRows: [
      ["输入信息", "出生日期 + 出生时刻", "出生日期"],
      ["系统框架", "天干地支、五行、四柱", "太阳星座、行星、宫位"],
      ["关注重点", "能量平衡与人生模式", "心理特征与人格原型"],
      ["强项", "节律、结构、深层能量模式", "直观、容易理解的个性特征"],
    ],
    compareNote: "两套系统都能分析人格，但它们使用的是完全不同的象征语言。",
    footerCalculator: "测算",
    footerKnowledge: "知识",
  },
};

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function renderKnowledge(lang) {
  const t = translations[lang];
  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-generate", t.navGenerate);
  setText("knowledge-eyebrow", t.knowledgeEyebrow);
  setText("knowledge-title", t.knowledgeTitle);
  setText("knowledge-subtitle", t.knowledgeSubtitle);
  setText("symbol-1-title", t.symbol1Title);
  setText("symbol-1-copy", t.symbol1Copy);
  setText("symbol-2-title", t.symbol2Title);
  setText("symbol-2-copy", t.symbol2Copy);
  setText("symbol-3-title", t.symbol3Title);
  setText("symbol-3-copy", t.symbol3Copy);
  setText("what-topline", t.whatTopline);
  setText("what-title", t.whatTitle);
  setText("what-copy", t.whatCopy);
  t.whatItems.forEach((item, index) => setText(`what-item-${index + 1}`, item));
  setText("five-topline", t.fiveTopline);
  setText("five-title", t.fiveTitle);
  setText("five-copy", t.fiveCopy);
  t.fiveItems.forEach((item, index) => setText(`five-item-${index + 1}`, item));
  setText("compare-topline", t.compareTopline);
  setText("compare-title", t.compareTitle);
  setText("compare-th-topic", t.compareHeaders[0]);
  setText("compare-th-bazi", t.compareHeaders[1]);
  setText("compare-th-western", t.compareHeaders[2]);
  setText("compare-note", t.compareNote);
  setText("footer-calculator", t.footerCalculator);
  setText("footer-knowledge", t.footerKnowledge);

  compareTableBody.innerHTML = "";
  t.compareRows.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    compareTableBody.appendChild(tr);
  });
}

window.BaziChart.bindLanguageSwitcher(renderKnowledge);
renderKnowledge(window.BaziChart.getLanguage());
