const form = document.getElementById("calculator-form");
const locationList = document.getElementById("location-list");

const cityOptions = [
  "Shanghai, China", "Beijing, China", "Shenzhen, China", "Guangzhou, China", "Hong Kong",
  "Taipei, Taiwan", "Tokyo, Japan", "Osaka, Japan", "Seoul, South Korea", "Busan, South Korea",
  "Singapore", "Bangkok, Thailand", "Chiang Mai, Thailand", "Kuala Lumpur, Malaysia", "Jakarta, Indonesia",
  "Bali, Indonesia", "Manila, Philippines", "Ho Chi Minh City, Vietnam", "Hanoi, Vietnam", "Delhi, India",
  "Mumbai, India", "Bengaluru, India", "Dubai, United Arab Emirates", "Abu Dhabi, United Arab Emirates", "Doha, Qatar",
  "Istanbul, Turkey", "Athens, Greece", "Rome, Italy", "Milan, Italy", "Paris, France",
  "Lyon, France", "London, United Kingdom", "Manchester, United Kingdom", "Edinburgh, United Kingdom", "Dublin, Ireland",
  "Amsterdam, Netherlands", "Rotterdam, Netherlands", "Brussels, Belgium", "Berlin, Germany", "Munich, Germany",
  "Hamburg, Germany", "Vienna, Austria", "Zurich, Switzerland", "Geneva, Switzerland", "Prague, Czech Republic",
  "Budapest, Hungary", "Warsaw, Poland", "Copenhagen, Denmark", "Stockholm, Sweden", "Oslo, Norway",
  "Helsinki, Finland", "Lisbon, Portugal", "Madrid, Spain", "Barcelona, Spain", "Valencia, Spain",
  "Moscow, Russia", "Saint Petersburg, Russia", "Cairo, Egypt", "Cape Town, South Africa", "Johannesburg, South Africa",
  "Nairobi, Kenya", "Lagos, Nigeria", "Casablanca, Morocco", "Sydney, Australia", "Melbourne, Australia",
  "Brisbane, Australia", "Perth, Australia", "Auckland, New Zealand", "Wellington, New Zealand", "Vancouver, Canada",
  "Toronto, Canada", "Montreal, Canada", "Calgary, Canada", "New York, United States", "Los Angeles, United States",
  "San Francisco, United States", "Seattle, United States", "Chicago, United States", "Boston, United States", "Austin, United States",
  "Miami, United States", "Washington, United States", "Mexico City, Mexico", "Guadalajara, Mexico", "Bogota, Colombia",
  "Lima, Peru", "Santiago, Chile", "Buenos Aires, Argentina", "Sao Paulo, Brazil", "Rio de Janeiro, Brazil",
  "Salvador, Brazil", "Montevideo, Uruguay", "Reykjavik, Iceland", "Honolulu, United States", "Anchorage, United States"
];

const translations = {
  en: {
    navCalculator: "Calculator",
    navKnowledge: "Knowledge",
    navGenerate: "Generate Chart",
    homeEyebrow: "Chinese Astrology for Modern Self-Discovery",
    homeTitle: "Discover Your Chinese Bazi & Zodiac Personality",
    homeSubtitle:
      "Explore your personality through Chinese Bazi astrology and Western zodiac comparison. Generate your Four Pillars chart, review your Five Elements balance, and unlock a premium report when you want to go deeper.",
    pill1: "Four Pillars",
    pill2: "Five Elements",
    pill3: "Western Zodiac Comparison",
    calcTopline: "Calculator",
    calcTitle: "Generate Your Bazi Chart",
    calcCopy: "Enter your birth details to calculate your personal Four Pillars of Destiny.",
    fieldDateLabel: "Birth Date",
    fieldTimeLabel: "Birth Time",
    fieldTimeHelp: "If you are unsure about the exact birth time, use 12:00 as a reference.",
    fieldLocationLabel: "Birth Location",
    calcButton: "Generate My Bazi Chart",
    calcNote: "Bazi uses your birth time to create a Four Pillars chart and reveal your Five Elements balance.",
    feature1Title: "Bazi uses your birth time to create a Four Pillars chart",
    feature1Copy: "Your year, month, day, and hour become the core symbolic structure of your Chinese astrology reading.",
    feature2Title: "It reveals your Five Elements balance",
    feature2Copy: "See how Wood, Fire, Earth, Metal, and Water distribute through your chart and which energies stand out.",
    feature3Title: "It helps understand your personality patterns",
    feature3Copy: "Get a readable introduction to your energy style, strengths, and the contrast with your Western zodiac.",
    howEyebrow: "How It Works",
    howTitle: "Simple to use. Easy to understand. Built to share.",
    howCopy: "We designed BaziChart for international users who are curious about Chinese metaphysics but want a modern, approachable experience.",
    step1Title: "Enter birth info",
    step1Copy: "Add your birth date, birth time, and birth location.",
    step2Title: "Generate Bazi",
    step2Copy: "We convert your data into a Four Pillars chart and Five Elements profile.",
    step3Title: "View result",
    step3Copy: "See your Western zodiac, hidden elements, and a short personality reading.",
    step4Title: "Unlock full analysis",
    step4Copy: "Upgrade for deeper interpretation, 10-year cycles, and a downloadable report.",
    footerCalculator: "Calculator",
    footerKnowledge: "Knowledge",
    locationPlaceholder: "City, Country",
  },
  zh: {
    navCalculator: "测算",
    navKnowledge: "知识",
    navGenerate: "开始排盘",
    homeEyebrow: "面向现代自我探索的中国命理工具",
    homeTitle: "探索你的八字命盘与星座人格",
    homeSubtitle:
      "通过中国八字和西方星座的对照来理解你的性格。输入出生信息后即可生成四柱命盘、查看五行比例，并进一步解锁深度报告。",
    pill1: "四柱八字",
    pill2: "五行比例",
    pill3: "中西人格对照",
    calcTopline: "测算器",
    calcTitle: "生成你的八字命盘",
    calcCopy: "输入出生信息，快速生成属于你的四柱命盘。",
    fieldDateLabel: "出生日期",
    fieldTimeLabel: "出生时间",
    fieldTimeHelp: "如果不确定准确出生时刻，可使用 12:00 作为参考。",
    fieldLocationLabel: "出生地点",
    calcButton: "生成我的八字命盘",
    calcNote: "八字会根据你的出生时间生成四柱结构，并展示五行分布。",
    feature1Title: "八字会根据出生时刻生成四柱命盘",
    feature1Copy: "年、月、日、时会形成你命盘最核心的结构。",
    feature2Title: "它会揭示你的五行平衡",
    feature2Copy: "你可以看到木、火、土、金、水的分布比例，以及哪种能量更突出。",
    feature3Title: "它能帮助理解你的性格模式",
    feature3Copy: "用更容易理解的方式认识你的能量风格、优势和与西方星座之间的差异。",
    howEyebrow: "使用方式",
    howTitle: "简单好用，容易理解，也方便分享。",
    howCopy: "BaziChart 是为对中国玄学感兴趣、但希望用现代方式理解它的国际用户设计的。",
    step1Title: "输入出生信息",
    step1Copy: "填写出生日期、出生时间和出生地点。",
    step2Title: "生成八字",
    step2Copy: "系统会将信息转化为四柱命盘和五行比例。",
    step3Title: "查看结果",
    step3Copy: "查看你的星座、藏干、五行图和基础性格分析。",
    step4Title: "解锁完整分析",
    step4Copy: "升级后可获得深度解读、十年能量周期和可下载报告。",
    footerCalculator: "测算",
    footerKnowledge: "知识",
    locationPlaceholder: "城市，国家",
  },
};

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function applyLanguage(lang) {
  const t = translations[lang];
  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-generate", t.navGenerate);
  setText("home-eyebrow", t.homeEyebrow);
  setText("home-title", t.homeTitle);
  setText("home-subtitle", t.homeSubtitle);
  setText("pill-1", t.pill1);
  setText("pill-2", t.pill2);
  setText("pill-3", t.pill3);
  setText("calc-topline", t.calcTopline);
  setText("calc-title", t.calcTitle);
  setText("calc-copy", t.calcCopy);
  setText("field-date-label", t.fieldDateLabel);
  setText("field-time-label", t.fieldTimeLabel);
  setText("field-time-help", t.fieldTimeHelp);
  setText("field-location-label", t.fieldLocationLabel);
  setText("calc-button", t.calcButton);
  setText("calc-note", t.calcNote);
  setText("feature-1-title", t.feature1Title);
  setText("feature-1-copy", t.feature1Copy);
  setText("feature-2-title", t.feature2Title);
  setText("feature-2-copy", t.feature2Copy);
  setText("feature-3-title", t.feature3Title);
  setText("feature-3-copy", t.feature3Copy);
  setText("how-eyebrow", t.howEyebrow);
  setText("how-title", t.howTitle);
  setText("how-copy", t.howCopy);
  setText("step-1-title", t.step1Title);
  setText("step-1-copy", t.step1Copy);
  setText("step-2-title", t.step2Title);
  setText("step-2-copy", t.step2Copy);
  setText("step-3-title", t.step3Title);
  setText("step-3-copy", t.step3Copy);
  setText("step-4-title", t.step4Title);
  setText("step-4-copy", t.step4Copy);
  setText("footer-calculator", t.footerCalculator);
  setText("footer-knowledge", t.footerKnowledge);
  document.getElementById("birth-location").placeholder = t.locationPlaceholder;
}

cityOptions.forEach((option) => {
  const item = document.createElement("option");
  item.value = option;
  locationList.appendChild(item);
});

window.BaziChart.bindLanguageSwitcher(applyLanguage);
applyLanguage(window.BaziChart.getLanguage());

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = document.getElementById("birth-date").value;
  const time = document.getElementById("birth-time").value || "12:00";
  const location = document.getElementById("birth-location").value.trim();

  if (!date || !location) {
    return;
  }

  const params = new URLSearchParams({
    date,
    time,
    location,
    lang: window.BaziChart.getLanguage(),
  });

  window.location.href = `./result.html?${params.toString()}`;
});
