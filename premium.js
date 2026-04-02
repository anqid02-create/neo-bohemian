const purchase = sessionStorage.getItem("bazichart_demo_purchase");
const premiumParams = new URLSearchParams(window.location.search);
const unlocked = premiumParams.get("unlocked");
const premiumBackLink = document.getElementById("premium-back-link");

if (!purchase || unlocked !== "1") {
  const redirectParams = new URLSearchParams(window.location.search);
  window.location.replace(`./checkout.html?${redirectParams.toString()}`);
}

const birthInfo = window.BaziChart.parseBirthInfoFromUrl();
if (!birthInfo) {
  window.location.replace("./index.html");
}

const chart = birthInfo ? window.BaziChart.buildChartData(birthInfo) : null;

const staticTranslations = {
  en: {
    navCalculator: "Calculator",
    navKnowledge: "Knowledge",
    navBack: "Back to Result",
    eyebrow: "Premium Report Unlocked",
    personalityTopline: "Deep Personality Analysis",
    elementTopline: "Element Balance Interpretation",
    relationshipTopline: "Relationship Compatibility",
    relationshipTitle: "Connection Style",
    careerTopline: "Career Tendencies",
    careerTitle: "Work Style & Direction",
    cyclesTopline: "10-Year Energy Cycles",
    cyclesTitle: "Long-Term Rhythm",
    download: "Download Report",
  },
  zh: {
    navCalculator: "测算",
    navKnowledge: "知识",
    navBack: "返回结果页",
    eyebrow: "高级报告已解锁",
    personalityTopline: "深度性格分析",
    elementTopline: "五行平衡解读",
    relationshipTopline: "关系匹配倾向",
    relationshipTitle: "连接方式",
    careerTopline: "职业发展方向",
    careerTitle: "工作风格与路径",
    cyclesTopline: "10年能量周期",
    cyclesTitle: "长期节奏",
    download: "下载报告",
  },
};

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function renderPremium(lang) {
  const ui = staticTranslations[lang];
  const report = window.BaziChart.buildPremiumReport(chart, lang);

  setText("nav-calculator", ui.navCalculator);
  setText("nav-knowledge", ui.navKnowledge);
  setText("premium-back-link", ui.navBack);
  setText("premium-eyebrow", ui.eyebrow);
  setText("premium-personality-topline", ui.personalityTopline);
  setText("premium-element-topline", ui.elementTopline);
  setText("premium-relationship-topline", ui.relationshipTopline);
  setText("premium-relationship-title", ui.relationshipTitle);
  setText("premium-career-topline", ui.careerTopline);
  setText("premium-career-title", ui.careerTitle);
  setText("premium-cycles-topline", ui.cyclesTopline);
  setText("premium-cycles-title", ui.cyclesTitle);
  setText("download-report", ui.download);

  premiumBackLink.href = `./result.html?${new URLSearchParams({ date: birthInfo.date, time: birthInfo.time, location: birthInfo.location, lang }).toString()}`;
  setText("premium-heading", lang === "zh" ? `${birthInfo.location} 的高级八字报告` : `Premium Report for ${birthInfo.location}`);
  setText("premium-meta", lang === "zh"
    ? `${birthInfo.date} ${birthInfo.time} · ${chart.signNameZh} · 主导元素 ${chart.dominantElement.nameZh}`
    : `${birthInfo.date} at ${birthInfo.time} · ${chart.signNameEn} · Dominant ${chart.dominantElement.nameEn}`);
  setText("premium-personality-title", report.personalityTitle);
  setText("premium-personality-copy", report.personalityCopy);
  setText("premium-element-title", report.elementTitle);
  setText("premium-element-copy", report.elementCopy);
  setText("premium-relationship-copy", report.relationshipCopy);
  setText("premium-career-copy", report.careerCopy);

  const cyclesGrid = document.getElementById("cycles-grid");
  cyclesGrid.innerHTML = "";
  report.cycles.forEach((cycle) => {
    const card = document.createElement("article");
    card.className = "cycle-card";
    card.innerHTML = `
      <p class="card-topline">${cycle.range}</p>
      <h3>${cycle.theme}</h3>
      <p>${cycle.copy}</p>
    `;
    cyclesGrid.appendChild(card);
  });

  document.getElementById("download-report").onclick = () => {
    const lines = [
      lang === "zh" ? "BaziChart 高级报告" : "BaziChart Premium Report",
      `${lang === "zh" ? "地点" : "Location"}: ${birthInfo.location}`,
      `${lang === "zh" ? "出生信息" : "Birth"}: ${birthInfo.date} ${birthInfo.time}`,
      `${lang === "zh" ? "西方星座" : "Western Zodiac"}: ${lang === "zh" ? chart.signNameZh : chart.signNameEn}`,
      `${lang === "zh" ? "主导元素" : "Dominant Element"}: ${lang === "zh" ? chart.dominantElement.nameZh : chart.dominantElement.nameEn}`,
      "",
      report.personalityCopy,
      "",
      report.elementCopy,
      "",
      report.relationshipCopy,
      "",
      report.careerCopy,
      "",
      ...report.cycles.map((cycle) => `- ${cycle.range}: ${cycle.theme} — ${cycle.copy}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = lang === "zh" ? "bazi-premium-report-zh.txt" : "bazi-premium-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
}

window.BaziChart.bindLanguageSwitcher(renderPremium);
renderPremium(window.BaziChart.getLanguage());
