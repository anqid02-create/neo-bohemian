const form = document.getElementById("calculator-form");
const locationList = document.getElementById("location-list");
const navGenerateLink = document.getElementById("nav-generate");

const cityOptions = [
  "Shanghai, China","Beijing, China","Shenzhen, China","Guangzhou, China","Chengdu, China","Hangzhou, China","Nanjing, China","Wuhan, China","Xi'an, China","Chongqing, China",
  "Hong Kong","Macau","Taipei, Taiwan","Taichung, Taiwan","Kaohsiung, Taiwan","Tokyo, Japan","Osaka, Japan","Kyoto, Japan","Nagoya, Japan","Sapporo, Japan",
  "Seoul, South Korea","Busan, South Korea","Incheon, South Korea","Singapore","Bangkok, Thailand","Chiang Mai, Thailand","Phuket, Thailand","Kuala Lumpur, Malaysia","Penang, Malaysia","Johor Bahru, Malaysia",
  "Jakarta, Indonesia","Bali, Indonesia","Surabaya, Indonesia","Manila, Philippines","Cebu, Philippines","Davao, Philippines","Ho Chi Minh City, Vietnam","Hanoi, Vietnam","Da Nang, Vietnam","Phnom Penh, Cambodia",
  "Vientiane, Laos","Yangon, Myanmar","Delhi, India","Mumbai, India","Bengaluru, India","Chennai, India","Hyderabad, India","Kolkata, India","Pune, India","Ahmedabad, India",
  "Kathmandu, Nepal","Colombo, Sri Lanka","Dhaka, Bangladesh","Dubai, United Arab Emirates","Abu Dhabi, United Arab Emirates","Sharjah, United Arab Emirates","Doha, Qatar","Riyadh, Saudi Arabia","Jeddah, Saudi Arabia","Kuwait City, Kuwait",
  "Muscat, Oman","Manama, Bahrain","Jerusalem, Israel","Tel Aviv, Israel","Istanbul, Turkey","Ankara, Turkey","Athens, Greece","Rome, Italy","Milan, Italy","Florence, Italy",
  "Venice, Italy","Paris, France","Lyon, France","Marseille, France","Nice, France","London, United Kingdom","Manchester, United Kingdom","Birmingham, United Kingdom","Edinburgh, United Kingdom","Glasgow, United Kingdom",
  "Dublin, Ireland","Amsterdam, Netherlands","Rotterdam, Netherlands","The Hague, Netherlands","Brussels, Belgium","Antwerp, Belgium","Berlin, Germany","Munich, Germany","Hamburg, Germany","Frankfurt, Germany",
  "Cologne, Germany","Vienna, Austria","Salzburg, Austria","Zurich, Switzerland","Geneva, Switzerland","Basel, Switzerland","Prague, Czech Republic","Budapest, Hungary","Warsaw, Poland","Krakow, Poland",
  "Copenhagen, Denmark","Stockholm, Sweden","Gothenburg, Sweden","Oslo, Norway","Bergen, Norway","Helsinki, Finland","Lisbon, Portugal","Porto, Portugal","Madrid, Spain","Barcelona, Spain",
  "Valencia, Spain","Seville, Spain","Moscow, Russia","Saint Petersburg, Russia","Reykjavik, Iceland","Cairo, Egypt","Alexandria, Egypt","Casablanca, Morocco","Marrakesh, Morocco","Nairobi, Kenya",
  "Cape Town, South Africa","Johannesburg, South Africa","Durban, South Africa","Lagos, Nigeria","Accra, Ghana","Addis Ababa, Ethiopia","Sydney, Australia","Melbourne, Australia","Brisbane, Australia","Perth, Australia",
  "Adelaide, Australia","Canberra, Australia","Auckland, New Zealand","Wellington, New Zealand","Christchurch, New Zealand","Honolulu, United States","Anchorage, United States","Vancouver, Canada","Toronto, Canada","Montreal, Canada",
  "Calgary, Canada","Ottawa, Canada","Quebec City, Canada","New York, United States","Los Angeles, United States","San Francisco, United States","Seattle, United States","Chicago, United States","Boston, United States","Austin, United States",
  "Miami, United States","Washington, United States","San Diego, United States","Las Vegas, United States","Denver, United States","Atlanta, United States","Houston, United States","Dallas, United States","New Orleans, United States","Phoenix, United States",
  "Mexico City, Mexico","Guadalajara, Mexico","Monterrey, Mexico","Bogota, Colombia","Medellin, Colombia","Lima, Peru","Cusco, Peru","Santiago, Chile","Buenos Aires, Argentina","Cordoba, Argentina",
  "Sao Paulo, Brazil","Rio de Janeiro, Brazil","Salvador, Brazil","Brasilia, Brazil","Belo Horizonte, Brazil","Montevideo, Uruguay"
];

const translations = {
  en: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navPremium: "Premium Report",
    navGenerate: "Generate Chart",
    homeEyebrow: "Chinese Astrology for Modern Self-Discovery",
    homeTitle: "Discover Your Personality Through Chinese BaZi & Western Astrology",
    homeSubtitle: "A unique personality reading combining Eastern Four Pillars and Western zodiac insight.",
    fieldDateLabel: "Date of Birth",
    fieldDateHelp: "Enter year, month, and day separately.",
    fieldTimeLabel: "Time of Birth",
    fieldTimeHelp: "If unsure, use 12:00 as a reference.",
    fieldLocationLabel: "Birth City",
    fieldGenderLabel: "Gender",
    genderFemale: "Female",
    genderMale: "Male",
    genderOther: "Other",
    calcButton: "Generate My Reading",
    calcNote: "Your birth data allows us to calculate both your Chinese BaZi and your Western zodiac profile.",
    disclaimer: "This test result is for entertainment only and does not constitute any professional interpretation.",
    feature1Topline: "The Eastern Wisdom",
    feature1Title: "What is BaZi?",
    feature1Copy: "BaZi, or the Four Pillars of Destiny, reads the energetic structure of your birth moment through the Year, Month, Day, and Hour.",
    pill1: "Five Elements",
    pill1Copy: "Wood, Fire, Earth, Metal, and Water.",
    pill2: "Four Pillars",
    pill2Copy: "The cosmic stems and branches of your timeline.",
    feature2Topline: "The Western Lens",
    feature2Title: "What is Western Zodiac?",
    feature2Copy: "Western astrology uses your birth date to read personality through zodiac archetypes, symbolic traits, and emotional style.",
    feature2Item1: "A familiar personality framework for self-discovery and storytelling.",
    feature2Item2: "A useful contrast to BaZi when comparing outer style and inner structure.",
    howEyebrow: "Synthesis of the Stars",
    howTitle: "The Alchemy of Two Worlds",
    howCopy: "BaziChart merges the structural language of Chinese metaphysics with the familiar symbolic lens of Western astrology.",
    step1Title: "Structural Foundation",
    step1Copy: "BaZi gives the elemental structure of your chart and the deeper rhythms beneath personality.",
    step2Title: "Holistic Accuracy",
    step2Copy: "Using both systems gives a broader reading, so users can understand both their symbolic structure and personality language.",
    step3Title: "Psychological Depth",
    step3Copy: "Western astrology adds a more narrative and familiar framework for self-understanding and sharing.",
    step4Title: "Start Your Combined Reading",
    guideTitle: "Your Path to Illumination",
    guideStep1Title: "Enter birth info",
    guideStep1Copy: "Add your birth date, birth time, and birth location for precision.",
    guideStep2Title: "Generate BaZi",
    guideStep2Copy: "We convert your data into a Four Pillars chart and Five Elements profile.",
    guideStep3Title: "View result",
    guideStep3Copy: "See your Western zodiac, hidden elements, and chart structure instantly.",
    guideStep4Title: "Unlock full analysis",
    guideStep4Copy: "Upgrade for deeper interpretation, 10-year cycles, and report downloads.",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. Etched in the stars.",
    locationPlaceholder: "London, United Kingdom",
  },
  zh: {
    navCalculator: "Home",
    navKnowledge: "知识",
    navPremium: "深度报告",
    navGenerate: "生成命盘",
    homeEyebrow: "面向现代自我探索的东方命理工具",
    homeTitle: "通过中国八字与西方星座探索你的性格蓝图",
    homeSubtitle: "一份结合东方四柱和西方星座视角的人格解读。",
    fieldDateLabel: "出生日期",
    fieldDateHelp: "请分别输入年份、月份和日期。",
    fieldTimeLabel: "出生时间",
    fieldTimeHelp: "如果不确定，可使用 12:00 作为参考。",
    fieldLocationLabel: "出生城市",
    fieldGenderLabel: "性别",
    genderFemale: "女性",
    genderMale: "男性",
    genderOther: "其他",
    calcButton: "生成我的解读",
    calcNote: "你的出生信息将用于计算中国八字与西方星座人格结果。",
    disclaimer: "This test result is for entertainment only and does not constitute any professional interpretation.",
    feature1Topline: "东方命理视角",
    feature1Title: "什么是八字？",
    feature1Copy: "八字，也就是四柱命盘，会根据你的出生年、月、日、时来读取人格结构与能量节律。",
    pill1: "五行",
    pill1Copy: "木、火、土、金、水。",
    pill2: "四柱",
    pill2Copy: "贯穿人生节律的天干地支结构。",
    feature2Topline: "西方星座视角",
    feature2Title: "什么是西方星座？",
    feature2Copy: "西方星座会根据你的出生日期来理解性格原型、表达方式与情绪风格。",
    feature2Item1: "它是一套更容易理解、也更容易分享的人格语言。",
    feature2Item2: "和八字放在一起看时，可以更好地比较外在风格与内在结构。",
    howEyebrow: "星象融合",
    howTitle: "两种系统的交汇",
    howCopy: "BaziChart 把中国命理的结构语言与西方星座的熟悉叙事方式结合在一起。",
    step1Title: "结构基础",
    step1Copy: "八字提供命盘的五行结构，以及性格背后的深层节律。",
    step2Title: "更完整的视角",
    step2Copy: "同时使用两套系统，可以更全面地理解一个人的象征结构与人格语言。",
    step3Title: "心理层次",
    step3Copy: "西方星座补充了更叙事化、更容易被理解的人格表达方式。",
    step4Title: "开始你的综合解读",
    guideTitle: "你的解读路径",
    guideStep1Title: "输入出生信息",
    guideStep1Copy: "填写出生日期、出生时间和出生地点，结果会更准确。",
    guideStep2Title: "生成八字",
    guideStep2Copy: "系统会将你的信息转化为四柱命盘和五行比例。",
    guideStep3Title: "查看结果",
    guideStep3Copy: "立即查看你的星座、藏干、五行和命盘结构。",
    guideStep4Title: "解锁完整分析",
    guideStep4Copy: "升级后可查看深度解读、10 年能量周期和下载报告。",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
    locationPlaceholder: "伦敦，英国",
  },
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function applyLanguage(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-generate", t.navGenerate);
  setText("home-eyebrow", t.homeEyebrow);
  setText("home-title", t.homeTitle);
  setText("home-subtitle", t.homeSubtitle);
  setText("field-date-label", t.fieldDateLabel);
  setText("field-date-help", t.fieldDateHelp);
  setText("field-time-label", t.fieldTimeLabel);
  setText("field-time-help", t.fieldTimeHelp);
  setText("field-location-label", t.fieldLocationLabel);
  setText("field-gender-label", t.fieldGenderLabel);
  setText("gender-female", t.genderFemale);
  setText("gender-male", t.genderMale);
  setText("gender-other", t.genderOther);
  setText("calc-button", t.calcButton);
  setText("calc-note", t.calcNote);
  setText("home-disclaimer", t.disclaimer);
  setText("feature-1-topline", t.feature1Topline);
  setText("feature-1-title", t.feature1Title);
  setText("feature-1-copy", t.feature1Copy);
  setText("pill-1", t.pill1);
  setText("pill-1-copy", t.pill1Copy);
  setText("pill-2", t.pill2);
  setText("pill-2-copy", t.pill2Copy);
  setText("feature-2-topline", t.feature2Topline);
  setText("feature-2-title", t.feature2Title);
  setText("feature-2-copy", t.feature2Copy);
  setText("feature-2-item-1", t.feature2Item1);
  setText("feature-2-item-2", t.feature2Item2);
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
  setText("guide-title", t.guideTitle);
  setText("guide-step-1-title", t.guideStep1Title);
  setText("guide-step-1-copy", t.guideStep1Copy);
  setText("guide-step-2-title", t.guideStep2Title);
  setText("guide-step-2-copy", t.guideStep2Copy);
  setText("guide-step-3-title", t.guideStep3Title);
  setText("guide-step-3-copy", t.guideStep3Copy);
  setText("guide-step-4-title", t.guideStep4Title);
  setText("guide-step-4-copy", t.guideStep4Copy);
  setText("footer-contact", t.footerContact);
  setText("footer-copy", t.footerCopy);

  const locationInput = document.getElementById("birth-location");
  if (locationInput) {
    locationInput.placeholder = t.locationPlaceholder;
  }
}

if (navGenerateLink) {
  navGenerateLink.href = "./index.html#calculator";
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
  const year = document.getElementById("birth-year").value.trim();
  const month = document.getElementById("birth-month").value.trim();
  const day = document.getElementById("birth-day").value.trim();
  const time = document.getElementById("birth-time").value || "12:00";
  const location = document.getElementById("birth-location").value.trim();
  const monthPadded = month.padStart(2, "0");
  const dayPadded = day.padStart(2, "0");
  const date = `${year}-${monthPadded}-${dayPadded}`;

  if (!/^\d{4}$/.test(year) || !/^\d{1,2}$/.test(month) || !/^\d{1,2}$/.test(day) || !location) {
    return;
  }

  const monthNum = Number(month);
  const dayNum = Number(day);
  if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
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
