const birthInfo = window.BaziChart.parseBirthInfoFromUrl();

if (!birthInfo) {
  window.location.replace("./index.html");
}

const chart = birthInfo ? window.BaziChart.buildChartData(birthInfo) : null;
const pillarsTableBody = document.querySelector("#pillars-table tbody");
const hiddenGrid = document.getElementById("hidden-grid");
const elementsBars = document.getElementById("elements-bars");
const premiumCta = document.getElementById("premium-cta");

const translations = {
  en: {
    navCalculator: "Calculator",
    navKnowledge: "Knowledge",
    navAnother: "Try Another Chart",
    resultEyebrow: "Your Personalized Reading",
    westernTopline: "Western Zodiac",
    baziTopline: "Bazi Chart",
    baziTitle: "Your Bazi Chart (Four Pillars of Destiny)",
    baziHelp: "Each pillar represents different aspects of life.",
    guideYear: "Year → background",
    guideMonth: "Month → career",
    guideDay: "Day → core self",
    guideHour: "Hour → future potential",
    thLayer: "Layer",
    thYear: "Year",
    thMonth: "Month",
    thDay: "Day",
    thHour: "Hour",
    hiddenTopline: "Hidden Elements",
    hiddenTitle: "Deeper Influences in Your Chart",
    hiddenHelp: "Hidden elements represent deeper influences in your chart.",
    elementsTopline: "Five Elements Balance",
    elementsTitle: "Your Energy Distribution",
    summaryTopline: "Personality Summary",
    summaryTitle: "Free Snapshot",
    compareLabel: "Chinese Astrology vs Western Zodiac",
    premiumTopline: "Premium Analysis",
    premiumTitle: "Unlock Your Full Bazi Analysis",
    premiumCopy: "Get the extended interpretation of your chart with deeper insights, premium guidance, and a shareable report.",
    premiumItems: [
      "detailed personality analysis",
      "element balance interpretation",
      "relationship compatibility",
      "career tendencies",
      "10-year energy cycles",
      "downloadable report",
    ],
    premiumCta: "Get Full Report – $9.99",
    rows: {
      stem: "Heavenly Stem",
      branch: "Earthly Branch",
      pillar: "Pillar",
      nayin: "Na Yin",
    },
    hiddenLabels: ["Year Pillar", "Month Pillar", "Day Pillar", "Hour Pillar"],
    resultHeading: (location) => `Your Bazi Chart for ${location}`,
    resultMeta: (chart, birthInfo) => `${birthInfo.date} at ${birthInfo.time} · Solar ${chart.solar.toYmdHms()} · Lunar ${chart.lunar.toString()}`,
    elementsSummary: (chart) => `Your chart shows strong ${chart.dominantElement.nameEn} energy.`,
  },
  zh: {
    navCalculator: "测算",
    navKnowledge: "知识",
    navAnother: "重新测算",
    resultEyebrow: "你的专属命盘结果",
    westernTopline: "西方星座",
    baziTopline: "八字命盘",
    baziTitle: "你的八字命盘（四柱）",
    baziHelp: "每一柱都象征人生中不同的层面。",
    guideYear: "年柱 → 背景",
    guideMonth: "月柱 → 事业",
    guideDay: "日柱 → 核心自我",
    guideHour: "时柱 → 未来潜能",
    thLayer: "层级",
    thYear: "年柱",
    thMonth: "月柱",
    thDay: "日柱",
    thHour: "时柱",
    hiddenTopline: "藏干",
    hiddenTitle: "命盘中的深层影响",
    hiddenHelp: "藏干代表命盘里更深一层、较不表面的能量影响。",
    elementsTopline: "五行平衡",
    elementsTitle: "你的能量分布",
    summaryTopline: "性格摘要",
    summaryTitle: "免费版分析",
    compareLabel: "中国命理与西方星座对照",
    premiumTopline: "深度分析",
    premiumTitle: "解锁完整八字报告",
    premiumCopy: "获得更深入的命盘解读，包括个性分析、职业倾向、关系风格与十年能量周期。",
    premiumItems: [
      "深度性格分析",
      "五行平衡解读",
      "关系匹配倾向",
      "职业发展方向",
      "10年能量周期",
      "可下载报告",
    ],
    premiumCta: "获取完整报告 – $9.99",
    rows: {
      stem: "天干",
      branch: "地支",
      pillar: "四柱",
      nayin: "纳音",
    },
    hiddenLabels: ["年柱藏干", "月柱藏干", "日柱藏干", "时柱藏干"],
    resultHeading: (location) => `${location} 的八字命盘`,
    resultMeta: (chart, birthInfo) => `${birthInfo.date} ${birthInfo.time} · 阳历 ${chart.solar.toYmdHms()} · 农历 ${chart.lunar.toString()}`,
    elementsSummary: (chart) => `你的命盘显示出较强的${chart.dominantElement.nameZh}元素能量。`,
  },
};

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function fillStaticText(lang) {
  const t = translations[lang];
  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-another", t.navAnother);
  setText("result-eyebrow", t.resultEyebrow);
  setText("western-topline", t.westernTopline);
  setText("bazi-topline", t.baziTopline);
  setText("bazi-title", t.baziTitle);
  setText("bazi-help", t.baziHelp);
  setText("guide-year", t.guideYear);
  setText("guide-month", t.guideMonth);
  setText("guide-day", t.guideDay);
  setText("guide-hour", t.guideHour);
  setText("th-layer", t.thLayer);
  setText("th-year", t.thYear);
  setText("th-month", t.thMonth);
  setText("th-day", t.thDay);
  setText("th-hour", t.thHour);
  setText("hidden-topline", t.hiddenTopline);
  setText("hidden-title", t.hiddenTitle);
  setText("hidden-help", t.hiddenHelp);
  setText("elements-topline", t.elementsTopline);
  setText("elements-title", t.elementsTitle);
  setText("summary-topline", t.summaryTopline);
  setText("summary-title", t.summaryTitle);
  setText("compare-label", t.compareLabel);
  setText("premium-topline", t.premiumTopline);
  setText("premium-title", t.premiumTitle);
  setText("premium-copy", t.premiumCopy);
  t.premiumItems.forEach((item, index) => setText(`premium-item-${index + 1}`, item));
  setText("premium-cta", t.premiumCta);
}

function renderPage(lang) {
  fillStaticText(lang);
  if (!chart) {
    return;
  }
  const t = translations[lang];

  setText("result-heading", t.resultHeading(birthInfo.location));
  setText("result-meta", t.resultMeta(chart, birthInfo));
  setText("western-sign-name", lang === "zh" ? chart.signNameZh : chart.signNameEn);
  setText("western-sign-summary", lang === "zh" ? chart.signSummaryZh : chart.signSummaryEn);

  pillarsTableBody.innerHTML = "";
  chart.pillars.forEach((row) => {
    const tr = document.createElement("tr");
    const first = document.createElement("td");
    first.textContent = t.rows[row.key];
    tr.appendChild(first);
    row.values.forEach((value) => {
      const td = document.createElement("td");
      td.innerHTML = window.BaziChart.formatChineseDisplay(value, lang);
      tr.appendChild(td);
    });
    pillarsTableBody.appendChild(tr);
  });

  hiddenGrid.innerHTML = "";
  chart.hiddenElements.forEach((item, index) => {
    const wrap = document.createElement("article");
    wrap.className = "hidden-pill";
    wrap.innerHTML = `
      <h3>${t.hiddenLabels[index]}</h3>
      <p>${window.BaziChart.formatMixedList(item.hidden, lang)}</p>
    `;
    hiddenGrid.appendChild(wrap);
  });

  elementsBars.innerHTML = "";
  chart.elementBalance.forEach((item) => {
    const label = lang === "zh" ? item.nameZh : item.nameEn;
    const row = document.createElement("div");
    row.className = "element-row";
    row.innerHTML = `
      <strong>${label}</strong>
      <div class="element-track">
        <div class="element-fill" style="width: ${item.percent}%"></div>
      </div>
      <span>${item.percent}%</span>
    `;
    elementsBars.appendChild(row);
  });

  setText("elements-summary", t.elementsSummary(chart));
  setText("personality-summary", window.BaziChart.createPersonalitySummary(chart, lang));
  setText("compare-summary", window.BaziChart.createCompareSummary(chart, lang));
}

window.BaziChart.bindLanguageSwitcher(renderPage);
renderPage(window.BaziChart.getLanguage());

premiumCta.addEventListener("click", () => {
  const params = new URLSearchParams({
    date: birthInfo.date,
    time: birthInfo.time,
    location: birthInfo.location,
    lang: window.BaziChart.getLanguage(),
  });
  window.location.href = `./checkout.html?${params.toString()}`;
});
