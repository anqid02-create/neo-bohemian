const purchase = sessionStorage.getItem("bazichart_demo_purchase");
const premiumParams = new URLSearchParams(window.location.search);
const unlocked = premiumParams.get("unlocked");
const previewMode = premiumParams.get("preview") === "1";
const sectionsRoot = document.getElementById("premium-sections");
const navGenerateLink = document.getElementById("nav-generate");

if (!previewMode && (!purchase || unlocked !== "1")) {
  const redirectParams = new URLSearchParams(window.location.search);
  window.location.replace(`./checkout.html?${redirectParams.toString()}`);
}

const demoBirthInfo = {
  date: "1994-08-18",
  time: "14:30",
  location: "Shanghai, China",
  year: 1994,
  month: 8,
  day: 18,
  hour: 14,
  minute: 30,
};

const birthInfo = window.BaziChart.parseBirthInfoFromUrl() || demoBirthInfo;
const chart = birthInfo ? window.BaziChart.buildChartData(birthInfo) : null;

const uiText = {
  en: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navPremium: "Premium Report",
    navGenerate: "Generate Chart",
    eyebrow: "Confidential Manuscript",
    disclaimer: "For entertainment purposes only.",
    sideSubtitle: "Subject 882",
    sideTitle: "The Manuscript",
    sideCore: "Core Personality",
    sideEmotional: "Emotional World",
    sideRelationship: "Relationship",
    sideSocial: "Social Style",
    sideTalents: "Natural Talents",
    sideCareer: "Career Path",
    sideWealth: "Financial Pattern",
    sideCycles: "Life Cycles",
    sideGrowth: "Growth Path",
    sideEnergy: "Energy Balance",
    sideCompatibility: "Compatibility",
    sideGuidance: "Final Guidance",
    mobileChart: "Chart",
    mobileCycles: "Cycles",
    mobileProfile: "Profile",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. Etched in the stars.",
  },
  zh: {
    navCalculator: "Home",
    navKnowledge: "知识",
    navPremium: "深度报告",
    navGenerate: "生成命盘",
    eyebrow: "机密命盘手稿",
    disclaimer: "此结果仅供娱乐。",
    sideSubtitle: "命盘档案",
    sideTitle: "深度手稿",
    sideCore: "核心人格",
    sideEmotional: "情绪世界",
    sideRelationship: "关系模式",
    sideSocial: "社交风格",
    sideTalents: "天赋能力",
    sideCareer: "事业路径",
    sideWealth: "财富模式",
    sideCycles: "人生周期",
    sideGrowth: "成长路径",
    sideEnergy: "能量平衡",
    sideCompatibility: "匹配概览",
    sideGuidance: "最终指引",
    mobileChart: "图表",
    mobileCycles: "周期",
    mobileProfile: "结果",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
  },
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function dayMaster() {
  return chart.pillars.find((row) => row.key === "stem").values[2];
}

function dayBranch() {
  return chart.pillars.find((row) => row.key === "branch").values[2];
}

function pillar(key, index) {
  return chart.pillars.find((row) => row.key === key).values[index];
}

function dominantElement(lang) {
  return lang === "zh" ? chart.dominantElement.nameZh : chart.dominantElement.nameEn;
}

function secondaryElement(lang) {
  const item = chart.elementBalance[1];
  return lang === "zh" ? item.nameZh : item.nameEn;
}

function weakestElement(lang) {
  const item = chart.elementBalance[chart.elementBalance.length - 1];
  return lang === "zh" ? item.nameZh : item.nameEn;
}

function signName(lang) {
  return lang === "zh" ? chart.signNameZh : chart.signNameEn;
}

function signSummary(lang) {
  return lang === "zh" ? chart.signSummaryZh : chart.signSummaryEn;
}

function compareSummary(lang) {
  return window.BaziChart.createCompareSummary(chart, lang);
}

function moneyLens(lang) {
  const dominant = dominantElement(lang);
  if (lang === "zh") {
    return `当前版本还没有接入完整的西方本命盘宫位系统，因此这里的财富视角主要采用八字结构，并结合太阳星座气质做辅助判断。就你现在的命盘来看，财富判断更偏向${dominant}式的积累路径，也就是依靠识别价值、稳定布局和长期兑现来放大结果。`;
  }
  return `This version does not calculate a full Western house system yet, so the financial reading is led by Bazi structure and supported by your solar style. In your chart, the money pattern is expressed most clearly through a ${dominant} style of value recognition, steady positioning, and long-horizon payoff.`;
}

function sectionTitleLine(title) {
  return `
    <div class="mb-12 flex items-center gap-4">
      <div class="h-[1px] w-12 bg-primary"></div>
      <h2 class="font-headline text-3xl font-bold text-text">${title}</h2>
    </div>
  `;
}

function getElementIcon(nameEn) {
  const iconMap = {
    Wood: "park",
    Fire: "local_fire_department",
    Earth: "terrain",
    Metal: "radio_button_checked",
    Water: "water_drop",
  };
  return iconMap[nameEn] || "auto_awesome";
}

function escape(value) {
  return window.BaziChart.escapeHtml(String(value));
}

function downloadCurrentReportAsPdf(lang) {
  const reportRoot = document.querySelector("main");
  const trigger = document.getElementById("download-pdf-button");
  if (!reportRoot || !trigger) {
    return;
  }

  const originalLabel = trigger.textContent;
  trigger.disabled = true;
  trigger.textContent = lang === "zh" ? "正在生成 PDF..." : "Generating PDF...";
  trigger.classList.add("opacity-70", "cursor-wait");

  const locationSlug = (birthInfo.location || "bazi-report")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  const filename = `${locationSlug || "bazi-report"}-${birthInfo.date || "report"}`;

  const exportShell = document.createElement("div");
  exportShell.style.width = "100%";
  exportShell.style.maxWidth = "980px";
  exportShell.style.margin = "0 auto";
  exportShell.style.padding = "32px 24px 48px";
  exportShell.style.background = "#11131c";
  exportShell.style.color = "#e1e1ef";

  const exportClone = reportRoot.cloneNode(true);
  exportClone.style.margin = "0";
  exportClone.style.padding = "0";
  exportClone.style.maxWidth = "none";
  exportClone.style.width = "100%";
  exportClone.style.background = "#11131c";
  const sectionsStack = exportClone.querySelector("#premium-sections");
  if (sectionsStack) {
    sectionsStack.style.display = "block";
  }
  exportClone.querySelectorAll("section").forEach((section) => {
    section.style.breakInside = "auto";
    section.style.pageBreakInside = "auto";
    section.style.marginBottom = "18mm";
  });
  exportClone.querySelectorAll("section > div, .grid > div").forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    node.style.breakInside = "avoid";
    node.style.pageBreakInside = "avoid";
  });
  exportClone.querySelectorAll("[id='download-pdf-button']").forEach((node) => node.remove());
  exportClone.querySelectorAll(".animate-pulse").forEach((node) => node.classList.remove("animate-pulse"));
  exportClone.querySelectorAll(".glass-card").forEach((node) => {
    node.style.background = "#1d1f29";
    node.style.backdropFilter = "none";
    node.style.webkitBackdropFilter = "none";
  });
  exportClone.querySelectorAll("*").forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    const computed = window.getComputedStyle(node);
    if (computed.position === "fixed" || computed.position === "sticky") {
      node.style.position = "static";
      node.style.inset = "auto";
    }
    if (computed.backdropFilter && computed.backdropFilter !== "none") {
      node.style.backdropFilter = "none";
      node.style.webkitBackdropFilter = "none";
    }
    if (computed.color === "rgba(0, 0, 0, 0)") {
      node.style.color = "#e1e1ef";
    }
  });

  exportShell.appendChild(exportClone);

  const printWindow = window.open("", "_blank", "width=1200,height=900");
  if (!printWindow) {
    trigger.disabled = false;
    trigger.textContent = originalLabel;
    trigger.classList.remove("opacity-70", "cursor-wait");
    alert(lang === "zh" ? "浏览器拦截了新窗口，请允许弹窗后重试。" : "Your browser blocked the print window. Please allow pop-ups and try again.");
    return;
  }

  const inheritedStyles = [...document.querySelectorAll("style, link[rel='stylesheet']")]
    .map((node) => node.outerHTML)
    .join("\n");

  printWindow.document.open();
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${filename}</title>
        ${inheritedStyles}
        <style>
          :root {
            color-scheme: dark;
          }
          * {
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: #11131c;
            color: #e1e1ef;
            font-family: "Manrope", sans-serif;
          }
          body {
            padding: 20px 0 40px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          h1, h2, h3, h4 {
            font-family: "Cormorant Garamond", serif;
            color: #f3e7b0;
            margin-top: 0;
          }
          h1 {
            font-size: 34px !important;
            line-height: 1.15 !important;
            margin-bottom: 10px !important;
          }
          h2 {
            font-size: 26px !important;
            line-height: 1.2 !important;
            margin-bottom: 12px !important;
          }
          h3 {
            font-size: 22px !important;
            line-height: 1.25 !important;
          }
          h4 {
            font-size: 18px !important;
            line-height: 1.3 !important;
          }
          p, li, span, div {
            color: #e1e1ef;
          }
          p, li {
            font-size: 12.5px !important;
            line-height: 1.75 !important;
          }
          img {
            max-width: 100%;
          }
          button {
            display: none !important;
          }
          main {
            max-width: none !important;
            padding: 0 !important;
          }
          section {
            page-break-inside: auto;
            break-inside: auto;
            margin-bottom: 18mm !important;
          }
          section > div,
          .glass-card,
          [class*="bg-panel"],
          [class*="bg-low"],
          [class*="bg-high"],
          [class*="bg-highest"],
          [class*="rounded"],
          [class*="border"] {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .space-y-32 > * + * {
            margin-top: 0 !important;
          }
          .space-y-12 > * + * {
            margin-top: 20px !important;
          }
          .space-y-8 > * + * {
            margin-top: 14px !important;
          }
          .space-y-6 > * + * {
            margin-top: 10px !important;
          }
          .mb-24 {
            margin-bottom: 16mm !important;
          }
          .mb-12 {
            margin-bottom: 8mm !important;
          }
          .mt-16 {
            margin-top: 8mm !important;
          }
          .grid {
            gap: 12px !important;
          }
          .print-shell {
            width: 100%;
            max-width: 980px;
            margin: 0 auto;
            padding: 0 16px;
          }
          @page {
            size: A4;
            margin: 10mm 9mm 12mm;
          }
          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-shell">${exportShell.innerHTML}</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();

  const finish = () => {
    trigger.disabled = false;
    trigger.textContent = originalLabel;
    trigger.classList.remove("opacity-70", "cursor-wait");
  };

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      finish();
    }, 500);
  };
}

function buildSections(lang) {
  const dm = dayMaster();
  const dz = dayBranch();
  const dominant = dominantElement(lang);
  const secondary = secondaryElement(lang);
  const weakest = weakestElement(lang);
  const sign = signName(lang);
  const compare = compareSummary(lang);
  const yearPillar = `${pillar("stem", 0)}${pillar("branch", 0)}`;
  const monthPillar = `${pillar("stem", 1)}${pillar("branch", 1)}`;
  const dayPillar = `${pillar("stem", 2)}${pillar("branch", 2)}`;
  const hourPillar = `${pillar("stem", 3)}${pillar("branch", 3)}`;
  const topElements = chart.elementBalance
    .slice(0, 2)
    .map((item) => `${lang === "zh" ? item.nameZh : item.nameEn} ${item.percent}%`)
    .join(lang === "zh" ? "、" : " · ");

  if (lang === "zh") {
    return [
      {
        id: "core",
        render: () => `
          <section class="scroll-mt-32" id="core">
            ${sectionTitleLine("Core Personality Blueprint")}
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div class="glass-card border-l border-primary/30 p-8">
                <span class="material-symbols-outlined mb-4 text-primary">tsunami</span>
                <h3 class="mb-4 font-headline text-xl">${escape(dm)} Day Master</h3>
                <p class="mb-4 text-sm leading-relaxed text-muted">你的日主是 ${escape(dm)}，这代表你真正的内在驱动力。它不像外在形象那样容易被看见，却决定了你面对选择、压力、关系和长期成长时最真实的运转方式。日主强的一面，是让你在复杂局面中依旧保有自己的重心；但它的挑战也在于，你很容易因为太习惯依赖原有模式，而忽略自己已经需要升级。</p>
                <div class="space-y-2 text-[11px] font-bold uppercase tracking-widest text-secondary">
                  <p>Core Pillar: ${escape(dayPillar)}</p>
                  <p>Dominant Energy: ${escape(dominant)}</p>
                </div>
              </div>
              <div class="glass-card border-l border-secondary/30 p-8">
                <span class="material-symbols-outlined mb-4 text-secondary">wb_sunny</span>
                <h3 class="mb-4 font-headline text-xl">${escape(sign)} Solar Lens</h3>
                <p class="mb-4 text-sm leading-relaxed text-muted">${escape(signSummary(lang))} 太阳星座更像别人首先看到的你，它决定了你进入社交场域时的气质、表达调性和最容易被贴上的标签。也正因为如此，你常常会出现“别人以为你是这样，但你内在其实更深、更复杂”的落差。</p>
                <div class="space-y-2 text-[11px] font-bold uppercase tracking-widest text-secondary">
                  <p>Outer Style: Recognizable</p>
                  <p>Social Tone: ${escape(sign)}</p>
                </div>
              </div>
              <div class="glass-card border-l border-primary/30 p-8">
                <span class="material-symbols-outlined mb-4 text-primary">explore</span>
                <h3 class="mb-4 font-headline text-xl">Chart Impression</h3>
                <p class="mb-4 text-sm leading-relaxed text-muted">从整体命盘来看，你不是单一型人格。年柱 ${escape(yearPillar)} 让你带着早期气质和背景印记，月柱 ${escape(monthPillar)} 会影响你进入社会后的节奏和标准，日柱 ${escape(dayPillar)} 是核心自我，而时柱 ${escape(hourPillar)} 则更像未来潜能与后半程人生的展开方式。你的人格层次感正来自这些力量并不是完全一致，而是在彼此拉扯中形成辨识度。</p>
              </div>
            </div>
            <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div class="border border-outline/30 bg-[#08090e] p-8">
                <h4 class="mb-4 font-headline text-2xl text-primary">Strengths, Weaknesses & Triggers</h4>
                <p class="mb-4 text-sm leading-relaxed text-muted">你的优势首先来自 ${escape(dominant)} 的稳定发挥，它让你更容易在特定环境中展现判断力、整合力、韧性或持续推进的能力。辅助元素 ${escape(secondary)} 会让你在次级层面上拥有更柔和或更灵活的补充，所以你并不是只有一种做事方式，而是能够在主轴清晰的前提下进行调整。</p>
                <p class="mb-4 text-sm leading-relaxed text-muted">隐藏弱点则更多来自偏弱元素 ${escape(weakest)}。这意味着当你状态不好、环境不匹配，或者压力过高时，你最容易失去的往往不是强项，而是那个本来可以帮助你恢复平衡的能力。于是别人眼里的你可能依旧稳定，但你自己会明显感觉到底层能量正在被透支。</p>
                <p class="text-sm leading-relaxed text-muted">你的触发点通常与被误读、节奏被打断、边界被越过或努力得不到正确回应有关。你不是单纯怕困难，而是会对“低质量环境”特别敏感，因为它会逼你用不适合自己的方式运作。</p>
              </div>
              <div class="border border-outline/30 bg-panel p-8">
                <h4 class="mb-4 font-headline text-2xl text-primary">Decision-Making Style</h4>
                <p class="mb-4 text-sm leading-relaxed text-muted">你的决策方式并不是极端理性或极端感性，而是先由内在结构感捕捉重点，再慢慢形成外部可执行的判断。也就是说，你做决定往往需要一个“看懂整体”的过程，而不是仅凭某个瞬间的刺激就立刻行动。</p>
                <p class="mb-4 text-sm leading-relaxed text-muted">如果环境允许你先观察、整理、判断轻重，你的决策会非常稳，也更有后劲。但如果你被迫在信息不足的情况下快速反应，或者被外界情绪拖着跑，你就容易暂时偏离自己原本更强的判断体系。</p>
                <p class="text-sm leading-relaxed text-muted">总体来看，你适合做那些能够兼顾长期价值、现实结果和内在匹配度的决定，而不是只追求当下最刺激或最容易被看见的选项。</p>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "emotional",
        render: () => `
          <section class="scroll-mt-32" id="emotional">
            ${sectionTitleLine("Emotional World")}
            <div class="grid items-start gap-12 lg:grid-cols-2">
              <div class="space-y-8">
                <div class="flex gap-6">
                  <div class="h-fit rounded-lg bg-tertiary/10 p-3"><span class="material-symbols-outlined text-tertiary">dark_mode</span></div>
                  <div>
                    <h4 class="mb-2 font-headline text-xl text-text">Emotional Needs</h4>
                    <p class="text-sm leading-relaxed text-muted">你的情绪需求并不只是“被喜欢”或“被理解”这么简单。真正让你安心的，是一种与你命盘结构相匹配的生活氛围。主导元素 ${escape(dominant)} 决定了你最需要的情绪土壤，而偏弱元素 ${escape(weakest)} 则指出你最容易忽视、却最需要被补足的支持方式。所以你最怕的并不是一时的不开心，而是长期处在让自己无法自然展开的环境里。</p>
                  </div>
                </div>
                <div class="flex gap-6">
                  <div class="h-fit rounded-lg bg-primary/10 p-3"><span class="material-symbols-outlined text-primary">priority_high</span></div>
                  <div>
                    <h4 class="mb-2 font-headline text-xl text-text">Processing & Stress Reaction</h4>
                    <p class="text-sm leading-relaxed text-muted">你处理情绪通常会先通过身体感受、内在节奏和对局面的判断来完成，而不是立刻说出口。也正因为如此，你在压力期未必会显得失控，但内在其实已经高速运转。高压状态下，你最容易把自己最熟悉的能量模式开到最大，比如更控制、更防御、更内耗或更安静，这会让别人误以为你没事，实际上你只是把波动收进了内部。</p>
                  </div>
                </div>
                <div class="flex gap-6">
                  <div class="h-fit rounded-lg bg-secondary/10 p-3"><span class="material-symbols-outlined text-secondary">self_improvement</span></div>
                  <div>
                    <h4 class="mb-2 font-headline text-xl text-text">Emotional Recovery</h4>
                    <p class="text-sm leading-relaxed text-muted">你的情绪修复更适合慢节奏、可持续、可重复的方法。对你来说，真正有效的恢复不是短暂发泄，而是重新找回秩序感、空间感和可控节奏。稳定作息、长期关系、低噪音环境、能够让你独处整理的空间，往往比表面热闹更能真正帮你回到平衡。</p>
                  </div>
                </div>
              </div>
              <div class="relative rounded border border-outline/30 bg-panel p-10">
                <div class="absolute right-4 top-4">
                  <span class="material-symbols-outlined text-6xl text-tertiary opacity-30">psychology_alt</span>
                </div>
                <h4 class="mb-6 font-label text-xs uppercase tracking-widest text-primary">Inner Fears</h4>
                <ul class="space-y-5 text-sm italic text-muted">
                  <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-primary"></span><span>你最深的担心通常不是表面的失误，而是自己真实的需求被长期忽略，最后不得不用错误的方式生活。</span></li>
                  <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-primary"></span><span>当环境不稳定、关系没有边界、节奏无法预期时，你会比一般人更快进入防御状态，因为那会直接破坏你的内在安全结构。</span></li>
                  <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-primary"></span><span>你也会害怕自己长期压抑之后变得麻木，所以命盘其实一直在提醒你，不要只做一个高功能的人，也要做一个能感受到自己的人。</span></li>
                </ul>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "relationship",
        render: () => `
          <section class="scroll-mt-32" id="relationship">
            ${sectionTitleLine("Relationship Style")}
            <div class="grid gap-4 md:grid-cols-4">
              <div class="flex h-auto flex-col justify-between border-t-2 border-primary bg-high p-8 md:col-span-2">
                <div>
                  <h4 class="mb-3 font-headline text-xl">Ideal Partner Type</h4>
                  <p class="mb-4 text-sm leading-relaxed text-muted">最适合你的人，不一定和你完全一样，但一定要有稳定重心。他们最好能够承接你的复杂度，而不是被你的深度吓退；能够尊重你的边界，而不是把亲密误解为随时进入你的内部世界。你更适合那种可靠、诚实、节奏稳定，同时又愿意真正理解你的人。</p>
                  <p class="text-sm leading-relaxed text-muted">对你而言，理想关系不是戏剧化地拉扯，而是彼此都能在关系里更像自己。真正好的关系，会让你慢慢放下防御，而不是让你永远保持警觉。</p>
                </div>
                <div class="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <span class="material-symbols-outlined text-sm">favorite</span>
                  <span>Love Language: steady action, presence, trust, and lived consistency</span>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center bg-panel p-8 text-center">
                <span class="material-symbols-outlined mb-4 text-3xl text-secondary">link</span>
                <h5 class="mb-2 text-xs font-bold uppercase tracking-widest">Attachment Style</h5>
                <p class="font-headline text-lg italic">Depth with Caution</p>
                <p class="mt-3 text-sm leading-relaxed text-muted">你会认真观察一段关系是否真的值得信任，确认之后才会更深地打开。</p>
              </div>
              <div class="flex flex-col justify-center border border-outline/30 bg-low p-8">
                <h5 class="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Relationship Challenges</h5>
                <p class="text-sm leading-relaxed text-muted">你在关系中的主要挑战是如何兼顾深度与安全感。一方面你渴望真正的连接，另一方面你又很清楚错误关系会让自己过度消耗，所以常常会在靠近和保护之间反复拉扯。</p>
              </div>
              <div class="border border-outline/30 bg-[#08090e] p-8 md:col-span-2">
                <h5 class="mb-4 font-headline text-xl text-primary">How You Express Love</h5>
                <p class="mb-4 text-sm leading-relaxed text-muted">你表达爱的方式更像长期地在场，而不是短促地表演。真正投入之后，你会通过行动、责任、照顾、回应、耐心以及对细节的记得来表达爱。你未必天天说很多热烈的话，但你会让对方在日常里感受到“你真的在”。</p>
                <p class="text-sm leading-relaxed text-muted">也正因为如此，你其实比表面看起来更深情，只是这份深情需要建立在被尊重、被珍惜、被认真对待的基础上。</p>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "social",
        render: () => `
          <section class="scroll-mt-32" id="social">
            ${sectionTitleLine("Social & Communication Style")}
            <div class="grid gap-8 lg:grid-cols-12">
              <div class="bg-primary p-8 text-[#3c2f00] lg:col-span-4">
                <h4 class="mb-4 font-headline text-2xl font-bold italic leading-tight">"The Observed Depth"</h4>
                <p class="mb-8 text-sm font-medium leading-relaxed opacity-90">别人通常会先感受到你的气场，而不是先理解你的全部。你的社交存在感并不一定喧闹，但很容易让人觉得你有分量、有边界，也有一种不轻易被看透的密度。</p>
                <div class="flex items-center justify-between border-t border-[#3c2f00]/20 pt-6">
                  <span class="text-[10px] font-black uppercase tracking-widest">Social Energy</span>
                  <span class="font-headline text-2xl font-bold italic">${escape(dominant)}</span>
                </div>
              </div>
              <div class="grid gap-8 md:grid-cols-2 lg:col-span-8">
                <div class="border border-outline/30 p-6">
                  <div class="mb-4 flex items-center gap-4">
                    <span class="material-symbols-outlined text-primary">campaign</span>
                    <h4 class="text-sm font-bold uppercase tracking-widest">Communication Strengths</h4>
                  </div>
                  <p class="text-sm leading-relaxed text-muted">你的表达优势在于有结构、有分寸，而且能够在复杂局面中抓到真正重要的重点。你不太适合持续输出空泛热闹的信息，但很适合在关键时刻说出真正有价值的话，让别人对局面突然清楚起来。</p>
                </div>
                <div class="border border-outline/30 p-6">
                  <div class="mb-4 flex items-center gap-4">
                    <span class="material-symbols-outlined text-secondary">groups</span>
                    <h4 class="text-sm font-bold uppercase tracking-widest">Leadership vs Support</h4>
                  </div>
                  <p class="text-sm leading-relaxed text-muted">你既能主导，也能支持，但你不适合长期待在完全看不见价值的位置。即使不是最外放的人，你也更适合在能够定义方向、稳定节奏、影响判断的位置上发挥作用。</p>
                </div>
                <div class="border border-outline/30 p-6 md:col-span-2">
                  <div class="mb-4 flex items-center gap-4">
                    <span class="material-symbols-outlined text-tertiary">forum</span>
                    <h4 class="text-sm font-bold uppercase tracking-widest">Social Energy Pattern</h4>
                  </div>
                  <p class="mb-4 text-sm leading-relaxed text-muted">你的社交能量不是平均分配型，而是会随着环境质量和关系深度发生明显变化。对频的时候，你会显得很有存在感，也愿意投入；但在低质量场域里，你会迅速把能量收回来。这不是冷淡，而是一种自然的筛选机制。</p>
                  <p class="text-sm leading-relaxed text-muted">换句话说，你更适合高质量连接，而不是大量消耗式社交。你的人脉价值往往不是“认识很多人”，而是“真正重要的人会认真记住你”。</p>
                </div>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "talents",
        render: () => `
          <section class="scroll-mt-32" id="talents">
            ${sectionTitleLine("Talent & Natural Abilities")}
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
                <h4 class="mb-4 font-headline text-xl italic text-primary">Natural Talents</h4>
                <p class="text-sm leading-relaxed text-muted">你的天然天赋主要来自 ${escape(dominant)} 与 ${escape(secondary)} 的组合。它会让你在判断轻重、组织资源、识别结构和看懂局势方面更容易“自然上手”，很多人要靠训练才能形成的能力，你往往比较早就会表现出来。</p>
              </div>
              <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
                <h4 class="mb-4 font-headline text-xl italic text-primary">Creative Abilities</h4>
                <p class="text-sm leading-relaxed text-muted">你的创造力不一定只表现为艺术表达，也可能表现为方法设计、问题重组、内容表达、氛围营造或把复杂信息重新整理成他人能理解的形式。你适合做“把无形变成有形”的事。</p>
              </div>
              <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
                <h4 class="mb-4 font-headline text-xl italic text-primary">Analytical Strengths</h4>
                <p class="text-sm leading-relaxed text-muted">你的分析优势不在于机械堆叠信息，而在于你更容易从杂乱信息里提炼真正核心。你会 instinctively 去看结构、逻辑、顺序和隐藏因果，这使你在策略判断、研究和长期规划上非常有潜力。</p>
              </div>
              <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
                <h4 class="mb-4 font-headline text-xl italic text-primary">Problem-Solving Style</h4>
                <p class="text-sm leading-relaxed text-muted">你解决问题更像先判断“问题真正卡在哪”，然后才决定切入方式。你的优势不是莽撞地快，而是精准地切中关键。很多时候，你能解决问题并不是因为做得最多，而是因为你找到的切口更有效。</p>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "career",
        render: () => `
          <section class="scroll-mt-32" id="career">
            ${sectionTitleLine("Career & Professional Path")}
            <div class="grid gap-12 lg:grid-cols-2">
              <div class="space-y-6">
                <p class="leading-relaxed text-muted">你的事业路径更适合走向“有影响力的位置”，而不是长期停留在纯执行角色。命盘显示，你在专业成长中更容易经历三个阶段：先建立能力与标准，再形成自己的判断体系，最后逐渐走向能够定义方向、拥有话语权或建立个人方法论的位置。</p>
                <p class="leading-relaxed text-muted">从五行和性格结构来看，你适合那些既需要洞察力、也需要稳定推进的领域。比如策略、咨询、管理、内容决策、创意统筹、品牌方向、研究判断、资源整合，或者任何需要把复杂问题变得更清晰的工作。</p>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-high p-4">
                    <span class="mb-2 block font-label text-[10px] uppercase tracking-widest text-primary">Fields</span>
                    <p class="text-sm font-bold">Strategy, consulting, research, design thinking, systems work</p>
                  </div>
                  <div class="bg-high p-4">
                    <span class="mb-2 block font-label text-[10px] uppercase tracking-widest text-primary">Work Style</span>
                    <p class="text-sm font-bold">Clear, selective, result-oriented, and quietly influential</p>
                  </div>
                </div>
                <p class="leading-relaxed text-muted">你的领导潜力并不一定表现得很张扬，但会体现在关键时刻能定义标准、稳住秩序、影响判断。至于创业，你并不是不能做，而是更适合在看清规则、确定定位和资源路径之后再出手，这会比情绪驱动式创业更适合你。</p>
              </div>
              <div class="relative group">
                <div class="aspect-video overflow-hidden rounded border border-outline/30 bg-panel">
                  <div class="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-10">
                    <div class="max-w-sm text-center">
                      <p class="mb-4 font-headline text-2xl italic text-primary">"Influence grows when structure meets timing."</p>
                      <p class="text-sm leading-relaxed text-muted">你不是只能完成任务的人，你更像能够在复杂系统里慢慢形成方法和影响力的人。真正适合你的事业，不只是赚钱，而是让你的判断力和存在感被正确使用。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "wealth",
        render: () => `
          <section class="scroll-mt-32" id="wealth">
            ${sectionTitleLine("Wealth & Financial Pattern")}
            <div class="grid gap-8 md:grid-cols-3">
              <div class="glass-card p-10 md:col-span-2">
                <div class="mb-8 flex items-start justify-between">
                  <div>
                    <span class="mb-2 block font-label text-[10px] uppercase tracking-[0.3em] text-primary">Wealth Pattern Reading</span>
                    <h3 class="font-headline text-2xl italic">The Structured Value Path</h3>
                  </div>
                  <span class="material-symbols-outlined text-4xl text-primary">payments</span>
                </div>
                <p class="mb-5 leading-relaxed text-muted">你的财富观更偏向“真实价值能否沉淀下来”，而不是单纯追求表面增长。你更适合把赚钱理解成能力、判断和资源逐渐汇聚后的结果，而不是短期情绪刺激下的动作。真正适合你的财富路径，往往需要一点耐心，也需要比别人更清楚自己到底擅长靠什么创造价值。</p>
                <p class="mb-5 leading-relaxed text-muted">从命盘来看，你的赚钱方式更适合依赖判断、定位、时机感和长期价值识别，而不是完全靠机械重复劳动。也就是说，当你站得更高、看得更远、能够整合资源而不是只消耗体力时，财务曲线会明显变好。</p>
                <p class="leading-relaxed text-muted">${escape(moneyLens(lang))}</p>
                <div class="grid grid-cols-1 gap-8 border-t border-outline/30 pt-8 md:grid-cols-2">
                  <div>
                    <h4 class="mb-2 text-xs font-bold uppercase text-secondary">Financial Strengths</h4>
                    <p class="text-sm leading-relaxed text-muted">你的财务强项是能够形成自己的规则，不容易被所有外界声音同时拉走。你适合在熟悉节奏后逐步放大成果，而不是不断换方向。</p>
                  </div>
                  <div>
                    <h4 class="mb-2 text-xs font-bold uppercase text-secondary">Money Challenges</h4>
                    <p class="text-sm leading-relaxed text-muted">真正的挑战不是你不会赚钱，而是在状态不好、节奏不对或被外部焦虑影响时，容易做出不符合长期策略的决定。对你来说，错时下注比错过机会更需要警惕。</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center justify-between bg-primary p-8 text-center text-[#3c2f00]">
                <span class="material-symbols-outlined text-5xl">auto_graph</span>
                <div>
                  <h4 class="mb-2 text-[10px] font-black uppercase tracking-widest text-[#3c2f00]/70">Wealth Capacity</h4>
                  <p class="font-headline text-4xl font-bold">Tier 01</p>
                  <p class="mt-2 text-xs font-bold italic text-[#3c2f00]/80">Strong long-range prosperity potential</p>
                </div>
                <div class="w-full h-[1px] bg-[#3c2f00]/20"></div>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "cycles",
        render: () => `
          <section class="scroll-mt-32" id="cycles">
            ${sectionTitleLine("Life Cycles & Timing")}
            <div class="relative space-y-16 pl-8 md:pl-16">
              <div class="absolute bottom-0 left-0 top-0 w-[1px] bg-gradient-to-b from-primary via-outline/30 to-transparent"></div>
              <div class="relative">
                <div class="absolute -left-[37px] h-4 w-4 bg-primary ring-8 ring-primary/10 md:-left-[69px]"></div>
                <div>
                  <span class="font-label text-[10px] font-bold uppercase tracking-widest text-primary">Current Structural Theme</span>
                  <h4 class="mt-2 mb-4 font-headline text-2xl italic">Expansion Through Alignment</h4>
                  <p class="max-w-2xl text-sm leading-relaxed text-muted">你现在的人生阶段更强调“看清自己的优势，然后让它真正进入现实”。这通常意味着职业方向更明确、关系标准更清晰、能量使用更谨慎，也更容易感受到某些旧模式已经不适合继续带着走。你的人生在这个阶段不是单纯往前冲，而是在筛选什么才值得长期投入。</p>
                </div>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] h-3 w-3 bg-outline ring-4 ring-outline/10 md:-left-[67px]"></div>
                <div>
                  <span class="font-label text-[10px] font-bold uppercase tracking-widest text-muted">Turning Points</span>
                  <h4 class="mt-2 mb-4 font-headline text-2xl italic">Identity, Work, and Relationship Revisions</h4>
                  <p class="max-w-2xl text-sm leading-relaxed text-muted">你的转折点往往不是突然的戏剧事件，而是当你开始深刻意识到，某个旧身份、旧关系方式或旧职业路径已经不再匹配自己时。你的人生改变通常来自“结构被看清”的时刻，而不是单纯依赖运气的瞬间。</p>
                </div>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] h-3 w-3 bg-outline ring-4 ring-outline/10 md:-left-[67px]"></div>
                <div>
                  <span class="font-label text-[10px] font-bold uppercase tracking-widest text-muted">10-year Luck Logic</span>
                  <h4 class="mt-2 mb-4 font-headline text-2xl italic">Big Atmospheres, Not Small Commands</h4>
                  <p class="max-w-2xl text-sm leading-relaxed text-muted">十年大运更像你人生的气候背景，它会放大某些元素、弱化某些惯性，并重新排列人生重点。命盘的意义并不是把每一年都写死，而是让你知道什么时候适合扩张，什么时候适合收束，什么时候要把注意力从外部成绩转回内部修正。</p>
                </div>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] h-3 w-3 bg-outline ring-4 ring-outline/10 md:-left-[67px]"></div>
                <div>
                  <span class="font-label text-[10px] font-bold uppercase tracking-widest text-muted">Growth Periods</span>
                  <h4 class="mt-2 mb-4 font-headline text-2xl italic">When the Strong and Supporting Elements Work Together</h4>
                  <p class="max-w-2xl text-sm leading-relaxed text-muted">你最明显的成长高峰，往往出现在主导元素 ${escape(dominant)} 得到支持，而辅助元素 ${escape(secondary)} 也能顺利发挥的时期。那个时候你会发现自己做事更顺、人也更稳，选择不再只是“能不能”，而是更清楚“该不该”。</p>
                </div>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "growth",
        render: () => `
          <section class="scroll-mt-32" id="growth">
            ${sectionTitleLine("Personal Growth Path")}
            <div class="grid gap-12 md:grid-cols-2">
              <div class="space-y-8">
                <div class="border border-outline/30 bg-low p-6">
                  <h4 class="mb-2 font-headline text-lg italic">Growth Challenges</h4>
                  <p class="text-sm leading-relaxed text-muted">你真正的成长挑战，通常不是能力不够，而是太习惯依赖自己已经擅长的那一套方式。命盘里偏弱的 ${escape(weakest)} 提醒你，下一阶段的成熟不一定来自更用力，而更可能来自补上原本被忽略的能力。</p>
                </div>
                <div class="border border-outline/30 bg-low p-6">
                  <h4 class="mb-2 font-headline text-lg italic">Lessons Your Life Teaches</h4>
                  <p class="text-sm leading-relaxed text-muted">你的人生会不断教你一件事：真正适合自己的节奏，比看起来厉害更重要。很多困难时刻，其实不是因为你不够努力，而是因为你还在试图用别人的路径来解释自己的人生。</p>
                </div>
                <div class="border border-outline/30 bg-low p-6">
                  <h4 class="mb-2 font-headline text-lg italic">Evolution Path</h4>
                  <p class="text-sm leading-relaxed text-muted">你的进化不是把自己变成完全不同的人，而是让原本就存在的能力变得更可持续、更稳定、更成熟。你会越来越知道什么时候该推进、什么时候该保留、什么时候该让自己休息和重组。</p>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center border border-tertiary/20 bg-tertiary/5 p-8 text-center">
                <span class="material-symbols-outlined mb-6 text-6xl text-tertiary">psychology</span>
                <h4 class="mb-4 font-headline text-2xl italic">Inner Evolution</h4>
                <p class="max-w-md text-sm italic leading-relaxed text-muted">你真正的成熟，不是在任何局面下都显得强，而是在不压抑真实自己的前提下，依旧能够稳稳地处理复杂人生。成长的目标不是变硬，而是变得更完整。</p>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "energy",
        render: () => `
          <section class="scroll-mt-32" id="energy">
            ${sectionTitleLine("Energy Balance (Five Elements)")}
            <div class="mb-12 grid h-64 grid-cols-5 items-end gap-4">
              ${chart.elementBalance.map((item) => `
                <div class="flex flex-col items-center gap-4">
                  <span class="text-[10px] font-bold uppercase tracking-widest ${item.nameEn === "Wood" ? "text-secondary" : item.nameEn === "Fire" ? "text-primary" : item.nameEn === "Earth" ? "text-muted" : item.nameEn === "Metal" ? "text-tertiary" : "text-primary"}">${escape(item.nameEn)}</span>
                  <div class="relative w-full rounded-t-lg ${item.nameEn === "Wood" ? "bg-secondary/20" : item.nameEn === "Fire" ? "bg-primary/20" : item.nameEn === "Earth" ? "bg-muted/20" : item.nameEn === "Metal" ? "bg-tertiary/20" : "border-x border-primary/50 bg-primary/40"}" style="height:${Math.max(item.percent, 10)}%">
                    <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold ${item.nameEn === "Water" ? "text-primary" : ""}">${item.percent}%</div>
                  </div>
                </div>
              `).join("")}
            </div>
            <div class="grid gap-8 md:grid-cols-3">
              <div class="border border-outline/30 bg-panel p-8">
                <h4 class="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Dominant Element</h4>
                <p class="text-sm leading-relaxed text-muted">你的主导元素是 ${escape(dominant)}。这意味着你最自然、最容易先表现出来的人格部分，会与这一行所代表的特质强烈相关。它是你的核心优势来源，也是在失衡时最容易被过度使用的地方。</p>
              </div>
              <div class="border border-outline/30 bg-panel p-8">
                <h4 class="mb-4 text-xs font-bold uppercase tracking-widest text-secondary">Lighter Element</h4>
                <p class="text-sm leading-relaxed text-muted">偏弱元素是 ${escape(weakest)}。它并不等于你“天生缺什么”，而是说明某些议题你更需要靠环境、经验和主动练习来补足。所以真正的平衡，不是把自己改成别人，而是知道哪里需要多一点意识。</p>
              </div>
              <div class="border border-outline/30 bg-panel p-8">
                <h4 class="mb-4 text-xs font-bold uppercase tracking-widest text-tertiary">Life Tendencies</h4>
                <p class="text-sm leading-relaxed text-muted">当前你的五行重心是 ${escape(topElements)}。这会直接影响你的性格表现、工作偏好、关系节奏和恢复方式。五行不是抽象标签，而更像一张长期的人生说明书：告诉你什么是顺势，什么会让你越来越偏离自己。</p>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "compatibility",
        render: () => `
          <section class="scroll-mt-32" id="compatibility">
            ${sectionTitleLine("Compatibility Overview")}
            <div class="grid gap-8 md:grid-cols-2">
              <div class="rounded border-l-4 border-primary bg-panel p-8">
                <div class="mb-6 flex items-center gap-4">
                  <span class="material-symbols-outlined text-primary">add_task</span>
                  <h4 class="text-sm font-bold uppercase tracking-widest">Best Personality Matches</h4>
                </div>
                <p class="mb-4 text-sm leading-relaxed text-muted">最适合你的人格类型，通常是那些稳定、有边界、能够理解深度而不会被深度吓退的人。他们未必最热闹，却更能给你真正可持续的支持，让你在关系里慢慢放松下来。</p>
                <p class="text-sm leading-relaxed text-muted">对你来说，好的匹配不是表面上非常刺激，而是对方能够理解你内在需要什么、尊重你的节奏，并且在现实层面上也能维持可靠与一致。</p>
              </div>
              <div class="rounded border-l-4 border-outline bg-low p-8">
                <div class="mb-6 flex items-center gap-4">
                  <span class="material-symbols-outlined text-muted">warning</span>
                  <h4 class="text-sm font-bold uppercase tracking-widest text-muted">Challenging Matches</h4>
                </div>
                <p class="mb-4 text-sm leading-relaxed text-muted">更具挑战性的匹配，往往来自情绪过于漂浮、边界感薄弱、只停留在表面热情，或者完全无法理解你真实复杂度的人。这样的关系并非完全不能发生，但很容易让你持续处在既想靠近又必须防御的状态。</p>
                <p class="text-sm leading-relaxed text-muted">一段关系如果总让你解释自己、压缩自己或长期不被真正理解，那么再强的吸引力也很难变成真正的稳定连接。</p>
              </div>
            </div>
          </section>
        `,
      },
      {
        id: "guidance",
        render: () => `
          <section class="scroll-mt-32 pb-24" id="guidance">
            <div class="relative overflow-hidden bg-highest p-12 text-center md:p-20">
              <div class="pointer-events-none absolute inset-0 opacity-5">
                <div class="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary animate-pulse"></div>
              </div>
              <div class="relative z-10 mx-auto max-w-3xl">
                <span class="mb-6 block font-label text-xs uppercase tracking-[0.5em] text-primary">Final Guidance</span>
                <h2 class="ink-text-shadow mb-10 font-headline text-4xl font-bold italic md:text-5xl">Your Path to Mastery</h2>
                <div class="mb-12 space-y-6 text-lg leading-relaxed text-muted">
                  <p>你最值得拥抱的力量，是命盘里已经反复出现的核心优势：${escape(dominant)} 带来的主导能力、${escape(secondary)} 提供的支持节奏，以及你在复杂环境中依旧能慢慢找回中心的本事。这些不是偶然的优点，而是你真正可以长期依赖的生命结构。</p>
                  <p>你最需要管理的，不只是外部困难，而是自己在压力下可能过度依赖旧模式的倾向。偏弱元素 ${escape(weakest)} 提醒你，下一阶段的进步常常来自补足，而不是只是一味加大强度。</p>
                  <p>${escape(compare)} 这份命盘最后真正想告诉你的，不是宿命，而是方向。越清楚什么是真正适合自己的节奏、环境与关系，你的人生就越不容易被外界标准带偏，也越能把自己的力量用在真正值得的地方。</p>
                </div>
                <div class="flex flex-wrap justify-center gap-6">
                  <button class="bg-primary px-10 py-4 text-[10px] font-black uppercase tracking-widest text-[#3c2f00] transition-transform hover:scale-95" id="download-pdf-button" type="button">Download Manuscript (PDF)</button>
                </div>
                <div class="mt-16 flex justify-center gap-8 opacity-40">
                  <span class="material-symbols-outlined">stars</span>
                  <span class="material-symbols-outlined">shield_moon</span>
                  <span class="material-symbols-outlined">auto_fix_high</span>
                </div>
              </div>
            </div>
          </section>
        `,
      },
    ];
  }

  return [
    {
      id: "core",
      render: () => `
        <section class="scroll-mt-32" id="core">
          ${sectionTitleLine("Core Personality Blueprint")}
          <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div class="glass-card border-l border-primary/30 p-8">
              <span class="material-symbols-outlined mb-4 text-primary">tsunami</span>
              <h3 class="mb-4 font-headline text-xl">${escape(dm)} Day Master</h3>
              <p class="mb-4 text-sm leading-relaxed text-muted">Your Day Master ${escape(dm)} is the inner engine of the chart. It describes how you naturally meet the world when no one is watching: how you decide, endure, protect yourself, and sustain your direction over time. It is usually more honest than your social presentation, which is why understanding it gives the report its structural depth.</p>
              <div class="space-y-2 text-[11px] font-bold uppercase tracking-widest text-secondary">
                <p>Core Pillar: ${escape(dayPillar)}</p>
                <p>Dominant Energy: ${escape(dominant)}</p>
              </div>
            </div>
            <div class="glass-card border-l border-secondary/30 p-8">
              <span class="material-symbols-outlined mb-4 text-secondary">wb_sunny</span>
              <h3 class="mb-4 font-headline text-xl">${escape(sign)} Solar Lens</h3>
              <p class="mb-4 text-sm leading-relaxed text-muted">${escape(signSummary(lang))} Your solar sign operates here as the outer astrological lens of the report: the tone people first notice, the style through which your presence becomes socially legible, and the part of you most likely to be named before your deeper structure is understood.</p>
              <div class="space-y-2 text-[11px] font-bold uppercase tracking-widest text-secondary">
                <p>Outer Style: Recognizable</p>
                <p>Social Tone: ${escape(sign)}</p>
              </div>
            </div>
            <div class="glass-card border-l border-primary/30 p-8">
              <span class="material-symbols-outlined mb-4 text-primary">explore</span>
              <h3 class="mb-4 font-headline text-xl">Chart Impression</h3>
              <p class="mb-4 text-sm leading-relaxed text-muted">Your chart impression is not flat or singular. The Year Pillar ${escape(yearPillar)} reflects inherited atmosphere and early identity coding, the Month Pillar ${escape(monthPillar)} describes your social operating rhythm, the Day Pillar ${escape(dayPillar)} reveals core selfhood, and the Hour Pillar ${escape(hourPillar)} points toward later-life expression and future potential. The richness of your personality comes from how these layers do not repeat each other perfectly.</p>
            </div>
          </div>
          <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div class="border border-outline/30 bg-[#08090e] p-8">
              <h4 class="mb-4 font-headline text-2xl text-primary">Strengths, Weaknesses & Triggers</h4>
              <p class="mb-4 text-sm leading-relaxed text-muted">Your strengths emerge most clearly through the stable expression of ${escape(dominant)}. That gives you a stronger instinct for the capacities that belong to this element: direction, containment, expression, discernment, structure, movement, or depth. The supporting influence of ${escape(secondary)} means you are not one-note; there is enough internal range for adaptation, nuance, and second-order intelligence.</p>
              <p class="mb-4 text-sm leading-relaxed text-muted">The chart’s hidden vulnerability lies closer to ${escape(weakest)}. This does not mean deficiency in a simplistic sense; it means that under stress, the function most likely to weaken is also the function most needed for recovery. That is why your blind spots often show up not when you are weak, but when you are overusing your strengths.</p>
              <p class="text-sm leading-relaxed text-muted">Your triggers tend to center around misreading, poor pacing, boundary violations, and environments that demand the wrong version of you. You are not merely sensitive to difficulty; you are structurally sensitive to low-quality fit.</p>
            </div>
            <div class="border border-outline/30 bg-panel p-8">
              <h4 class="mb-4 font-headline text-2xl text-primary">Decision-Making Style</h4>
              <p class="mb-4 text-sm leading-relaxed text-muted">You do not make your best decisions through raw impulse. Your process tends to move by pattern recognition first, visible action second. That means you often need enough time to sense the structure of a situation before translating it into a concrete choice.</p>
              <p class="mb-4 text-sm leading-relaxed text-muted">When you are given space to observe, evaluate, and sort what truly matters, your judgment becomes one of your strongest assets. But when you are forced into speed without clarity, or pulled into other people’s emotional urgency, your natural precision can be temporarily displaced.</p>
              <p class="text-sm leading-relaxed text-muted">Overall, you are built for decisions that integrate timing, consequence, and internal truth rather than short-lived visibility or reactive excitement.</p>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "emotional",
      render: () => `
        <section class="scroll-mt-32" id="emotional">
          ${sectionTitleLine("Emotional World")}
          <div class="grid items-start gap-12 lg:grid-cols-2">
            <div class="space-y-8">
              <div class="flex gap-6">
                <div class="h-fit rounded-lg bg-tertiary/10 p-3"><span class="material-symbols-outlined text-tertiary">dark_mode</span></div>
                <div>
                  <h4 class="mb-2 font-headline text-xl text-text">Emotional Needs</h4>
                  <p class="text-sm leading-relaxed text-muted">Your emotional needs are not shallow or generic. The dominant element ${escape(dominant)} shows what kind of atmosphere allows your nervous system to loosen and trust life, while the lighter element ${escape(weakest)} reveals the support you may need most but ask for least. You do not simply need affection; you need a life structure that feels emotionally compatible with your nature.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="h-fit rounded-lg bg-primary/10 p-3"><span class="material-symbols-outlined text-primary">priority_high</span></div>
                <div>
                  <h4 class="mb-2 font-headline text-xl text-text">Processing & Stress Reaction</h4>
                  <p class="text-sm leading-relaxed text-muted">You are unlikely to process emotion only through speech. More often, feeling moves through bodily tension, rhythm, inner pacing, and private interpretation before it becomes language. Under stress, the strongest habit in the chart becomes even stronger, which means you may become more controlled, more internal, more guarded, or more overextended depending on which part of your energetic structure takes over.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="h-fit rounded-lg bg-secondary/10 p-3"><span class="material-symbols-outlined text-secondary">self_improvement</span></div>
                <div>
                  <h4 class="mb-2 font-headline text-xl text-text">Emotional Recovery</h4>
                  <p class="text-sm leading-relaxed text-muted">Your recovery pattern is usually gradual, not explosive. Consistency, solitude, lower-noise environments, embodied routine, and private reflection often help you far more than dramatic catharsis. In your case, restoration comes from re-entering a rhythm that your inner system actually recognizes as safe.</p>
                </div>
              </div>
            </div>
            <div class="relative rounded border border-outline/30 bg-panel p-10">
              <div class="absolute right-4 top-4">
                <span class="material-symbols-outlined text-6xl text-tertiary opacity-30">psychology_alt</span>
              </div>
              <h4 class="mb-6 font-label text-xs uppercase tracking-widest text-primary">Inner Fears</h4>
              <ul class="space-y-5 text-sm italic text-muted">
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-primary"></span><span>Your deeper fear is rarely simple failure. It is the fear of living too long in conditions that distort your real needs and slowly train you away from yourself.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-primary"></span><span>Instability without meaning, intimacy without trust, and pressure without pacing can feel especially destabilizing because they interrupt the internal order your chart depends on.</span></li>
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 rounded-full bg-primary"></span><span>There is also a quieter fear of becoming emotionally numb through over-functioning, which is why part of your life path is learning not only how to endure, but how to remain inwardly alive.</span></li>
              </ul>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "relationship",
      render: () => `
        <section class="scroll-mt-32" id="relationship">
          ${sectionTitleLine("Relationship Style")}
          <div class="grid gap-4 md:grid-cols-4">
            <div class="flex h-auto flex-col justify-between border-t-2 border-primary bg-high p-8 md:col-span-2">
              <div>
                <h4 class="mb-3 font-headline text-xl">Ideal Partner Type</h4>
                <p class="mb-4 text-sm leading-relaxed text-muted">Your ideal partner is not necessarily identical to you, but stable enough to remain whole in your presence. They need sufficient emotional weight, self-respect, and patience to meet your complexity without trying to flatten it. The best relationships for you feel less like performance and more like a gradually earned sanctuary.</p>
                <p class="text-sm leading-relaxed text-muted">You are likely to do best with someone who can offer steadiness without dullness, honesty without intrusion, and intimacy without collapsing all boundaries.</p>
              </div>
              <div class="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                <span class="material-symbols-outlined text-sm">favorite</span>
                <span>Love Language: steady action, presence, trust, and lived consistency</span>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center bg-panel p-8 text-center">
              <span class="material-symbols-outlined mb-4 text-3xl text-secondary">link</span>
              <h5 class="mb-2 text-xs font-bold uppercase tracking-widest">Attachment Style</h5>
              <p class="font-headline text-lg italic">Depth with Caution</p>
              <p class="mt-3 text-sm leading-relaxed text-muted">You tend to open slowly, not because you lack feeling, but because your chart prefers closeness that can survive reality.</p>
            </div>
            <div class="flex flex-col justify-center border border-outline/30 bg-low p-8">
              <h5 class="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Relationship Challenges</h5>
              <p class="text-sm leading-relaxed text-muted">Your challenge lies in balancing depth with self-protection. You may long for genuine emotional fusion while also knowing exactly how costly the wrong bond can be. Much of your relational growth comes from learning how to reveal yourself without abandoning discernment.</p>
            </div>
            <div class="border border-outline/30 bg-[#08090e] p-8 md:col-span-2">
              <h5 class="mb-4 font-headline text-xl text-primary">How You Express Love</h5>
              <p class="mb-4 text-sm leading-relaxed text-muted">You express love most powerfully through constancy. Your affection becomes visible through attention, responsibility, reliability, emotional memory, and the willingness to remain present over time. Once trust is established, you often prove far more devoted than your initial presentation suggests.</p>
              <p class="text-sm leading-relaxed text-muted">For you, love is not only a feeling. It is a pattern of repeated care that makes the other person experience your presence as dependable, rooted, and real.</p>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "social",
      render: () => `
        <section class="scroll-mt-32" id="social">
          ${sectionTitleLine("Social & Communication Style")}
          <div class="grid gap-8 lg:grid-cols-12">
            <div class="bg-primary p-8 text-[#3c2f00] lg:col-span-4">
              <h4 class="mb-4 font-headline text-2xl font-bold italic leading-tight">"The Observed Depth"</h4>
              <p class="mb-8 text-sm font-medium leading-relaxed opacity-90">People tend to sense your weight before they understand your details. There is something in your field that often reads as composed, layered, and not easily trivialized. Even in quiet settings, your presence may carry more gravity than you intend.</p>
              <div class="flex items-center justify-between border-t border-[#3c2f00]/20 pt-6">
                <span class="text-[10px] font-black uppercase tracking-widest">Social Energy</span>
                <span class="font-headline text-2xl font-bold italic">${escape(dominant)}</span>
              </div>
            </div>
            <div class="grid gap-8 md:grid-cols-2 lg:col-span-8">
              <div class="border border-outline/30 p-6">
                <div class="mb-4 flex items-center gap-4">
                  <span class="material-symbols-outlined text-primary">campaign</span>
                  <h4 class="text-sm font-bold uppercase tracking-widest">Communication Strengths</h4>
                </div>
                <p class="text-sm leading-relaxed text-muted">You are often strongest when communication has structure. Rather than scattering energy, you naturally move toward what is essential, which makes your words land with more consequence. In the right context, your communication clarifies rather than merely fills space.</p>
              </div>
              <div class="border border-outline/30 p-6">
                <div class="mb-4 flex items-center gap-4">
                  <span class="material-symbols-outlined text-secondary">groups</span>
                  <h4 class="text-sm font-bold uppercase tracking-widest">Leadership vs Support</h4>
                </div>
                <p class="text-sm leading-relaxed text-muted">You can both lead and support, but long-term fulfillment usually rises when your influence is visible rather than hidden. Even without formal authority, you function best when helping define direction, pace, standards, or emotional tone.</p>
              </div>
              <div class="border border-outline/30 p-6 md:col-span-2">
                <div class="mb-4 flex items-center gap-4">
                  <span class="material-symbols-outlined text-tertiary">forum</span>
                  <h4 class="text-sm font-bold uppercase tracking-widest">Social Energy Pattern</h4>
                </div>
                <p class="mb-4 text-sm leading-relaxed text-muted">Your social energy is not evenly distributed across all environments. In aligned spaces, you may appear strikingly present and memorable. In low-quality or misaligned settings, you can retract quickly, not from weakness, but from an intelligent conservation instinct.</p>
                <p class="text-sm leading-relaxed text-muted">This means your relational power is often rooted less in quantity and more in impact. You do not necessarily need a wide social field to matter deeply within the one you choose.</p>
              </div>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "talents",
      render: () => `
        <section class="scroll-mt-32" id="talents">
          ${sectionTitleLine("Talent & Natural Abilities")}
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
              <h4 class="mb-4 font-headline text-xl italic text-primary">Natural Talents</h4>
              <p class="text-sm leading-relaxed text-muted">Your natural talents arise from the interaction between ${escape(dominant)} and ${escape(secondary)}. That combination often produces instinctive competence in judgment, organization, pattern recognition, emotional reading, or strategic response long before you consciously name those gifts.</p>
            </div>
            <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
              <h4 class="mb-4 font-headline text-xl italic text-primary">Creative Abilities</h4>
              <p class="text-sm leading-relaxed text-muted">Your creativity may not always look conventionally artistic. It can appear through language, framing, sequencing, design, direction-setting, or the ability to transform complexity into clarity. You are especially strong wherever abstraction must become something useful and felt.</p>
            </div>
            <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
              <h4 class="mb-4 font-headline text-xl italic text-primary">Analytical Strengths</h4>
              <p class="text-sm leading-relaxed text-muted">Your analysis is usually strongest when the issue is noisy or layered. You tend to read beneath the visible surface, which makes you better at identifying root dynamics than merely reacting to symptoms. That gives you leverage in strategy, planning, diagnosis, and high-stakes interpretation.</p>
            </div>
            <div class="border border-outline/30 bg-[#08090e] p-8 transition-colors hover:border-primary/50">
              <h4 class="mb-4 font-headline text-xl italic text-primary">Problem-Solving Style</h4>
              <p class="text-sm leading-relaxed text-muted">You tend to solve problems by finding the actual hinge point. Rather than pushing at everything equally, you prefer the move that changes the whole system. Your advantage is not speed without thought, but precision with consequence.</p>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "career",
      render: () => `
        <section class="scroll-mt-32" id="career">
          ${sectionTitleLine("Career & Professional Path")}
          <div class="grid gap-12 lg:grid-cols-2">
            <div class="space-y-6">
              <p class="leading-relaxed text-muted">Your professional path favors work in which influence can become visible. The chart suggests a gradual evolution from capability, to authority, to recognized direction-setting. You are not best used where you are permanently hidden inside repetitive execution with no meaningful voice.</p>
              <p class="leading-relaxed text-muted">From an element and personality perspective, you are well suited to work involving strategy, research, communication, consulting, systems design, leadership, synthesis, or any field that rewards reading structure beneath surface motion. The more your role reflects your real energetic architecture, the more sustainable success becomes.</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-high p-4">
                  <span class="mb-2 block font-label text-[10px] uppercase tracking-widest text-primary">Fields</span>
                  <p class="text-sm font-bold">Strategy, consulting, research, design thinking, systems work</p>
                </div>
                <div class="bg-high p-4">
                  <span class="mb-2 block font-label text-[10px] uppercase tracking-widest text-primary">Work Style</span>
                  <p class="text-sm font-bold">Clear, selective, result-oriented, and quietly influential</p>
                </div>
              </div>
              <p class="leading-relaxed text-muted">You also show leadership potential that may appear more through judgment and credibility than performance charisma. Entrepreneurship is possible, but the chart suggests it succeeds best when built through method, timing, and real positioning rather than emotional urgency alone.</p>
            </div>
            <div class="relative group">
              <div class="aspect-video overflow-hidden rounded border border-outline/30 bg-panel">
                <div class="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-10">
                  <div class="max-w-sm text-center">
                    <p class="mb-4 font-headline text-2xl italic text-primary">"Influence grows when structure meets timing."</p>
                    <p class="text-sm leading-relaxed text-muted">You are not only here to perform work. You are built to develop a recognizable method, hold complexity, and gradually become the person whose judgment changes outcomes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "wealth",
      render: () => `
        <section class="scroll-mt-32" id="wealth">
          ${sectionTitleLine("Wealth & Financial Pattern")}
          <div class="grid gap-8 md:grid-cols-3">
            <div class="glass-card p-10 md:col-span-2">
              <div class="mb-8 flex items-start justify-between">
                <div>
                  <span class="mb-2 block font-label text-[10px] uppercase tracking-[0.3em] text-primary">Wealth Pattern Reading</span>
                  <h3 class="font-headline text-2xl italic">The Structured Value Path</h3>
                </div>
                <span class="material-symbols-outlined text-4xl text-primary">payments</span>
              </div>
              <p class="mb-5 leading-relaxed text-muted">Your financial orientation favors durable value over spectacle. Money in this chart is not only about accumulation, but about how safety, self-trust, timing, and long-term reality are built. You generally benefit more from coherent strategy than from dramatic financial volatility.</p>
              <p class="mb-5 leading-relaxed text-muted">Your earning style is more likely to thrive through competence, interpretation, positioning, and long-horizon value recognition than through pure output volume alone. The more your work is aligned with your actual strengths, the more income becomes an extension of method rather than a battle for validation.</p>
              <p class="leading-relaxed text-muted">${escape(moneyLens(lang))}</p>
              <div class="grid grid-cols-1 gap-8 border-t border-outline/30 pt-8 md:grid-cols-2">
                <div>
                  <h4 class="mb-2 text-xs font-bold uppercase text-secondary">Financial Strengths</h4>
                  <p class="text-sm leading-relaxed text-muted">One of your strongest financial qualities is the ability to build your own system rather than mimicking whatever money style happens to be fashionable around you.</p>
                </div>
                <div>
                  <h4 class="mb-2 text-xs font-bold uppercase text-secondary">Money Challenges</h4>
                  <p class="text-sm leading-relaxed text-muted">Your main challenge is usually mistiming or stress distortion: moving too hard in the wrong season, or trying to force wealth through a rhythm that does not actually fit your structure.</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center justify-between bg-primary p-8 text-center text-[#3c2f00]">
              <span class="material-symbols-outlined text-5xl">auto_graph</span>
              <div>
                <h4 class="mb-2 text-[10px] font-black uppercase tracking-widest text-[#3c2f00]/70">Wealth Capacity</h4>
                <p class="font-headline text-4xl font-bold">Tier 01</p>
                <p class="mt-2 text-xs font-bold italic text-[#3c2f00]/80">Strong long-range prosperity potential</p>
              </div>
              <div class="w-full h-[1px] bg-[#3c2f00]/20"></div>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "cycles",
      render: () => `
        <section class="scroll-mt-32" id="cycles">
          ${sectionTitleLine("Life Cycles & Timing")}
          <div class="relative space-y-16 pl-8 md:pl-16">
            <div class="absolute bottom-0 left-0 top-0 w-[1px] bg-gradient-to-b from-primary via-outline/30 to-transparent"></div>
            <div class="relative">
              <div class="absolute -left-[37px] h-4 w-4 bg-primary ring-8 ring-primary/10 md:-left-[69px]"></div>
              <div>
                <span class="font-label text-[10px] font-bold uppercase tracking-widest text-primary">Current Structural Theme</span>
                <h4 class="mt-2 mb-4 font-headline text-2xl italic">Expansion Through Alignment</h4>
                <p class="max-w-2xl text-sm leading-relaxed text-muted">This phase of life emphasizes the difference between mere movement and true alignment. It is a season in which work, identity, and direction become more honest. You are likely to feel increasing pressure to stop scattering energy and begin investing more seriously in what actually reflects your real nature.</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[35px] h-3 w-3 bg-outline ring-4 ring-outline/10 md:-left-[67px]"></div>
              <div>
                <span class="font-label text-[10px] font-bold uppercase tracking-widest text-muted">Turning Points</span>
                <h4 class="mt-2 mb-4 font-headline text-2xl italic">Identity, Work, and Relationship Revisions</h4>
                <p class="max-w-2xl text-sm leading-relaxed text-muted">Your turning points usually arise when an old structure no longer fits the person you have become. These moments may look like career redefinition, relational restructuring, a revised standard for success, or a deeper refusal to continue living in ways that cost too much internally.</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[35px] h-3 w-3 bg-outline ring-4 ring-outline/10 md:-left-[67px]"></div>
              <div>
                <span class="font-label text-[10px] font-bold uppercase tracking-widest text-muted">10-year Luck Logic</span>
                <h4 class="mt-2 mb-4 font-headline text-2xl italic">Big Atmospheres, Not Small Commands</h4>
                <p class="max-w-2xl text-sm leading-relaxed text-muted">Ten-year luck cycles are best understood as large atmospheres that reorder emphasis. They do not eliminate agency, but they do shift what grows easily, what resists, and what life seems to keep asking you to learn. Timing matters because the chart does not mature at the same speed in every chapter.</p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[35px] h-3 w-3 bg-outline ring-4 ring-outline/10 md:-left-[67px]"></div>
              <div>
                <span class="font-label text-[10px] font-bold uppercase tracking-widest text-muted">Growth Periods</span>
                <h4 class="mt-2 mb-4 font-headline text-2xl italic">When the Strong and Supporting Elements Work Together</h4>
                <p class="max-w-2xl text-sm leading-relaxed text-muted">Growth intensifies when the dominant element ${escape(dominant)} is supported rather than obstructed, and when the secondary element ${escape(secondary)} can also contribute without strain. During those periods, your life tends to feel less fragmented and more internally coherent.</p>
              </div>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "growth",
      render: () => `
        <section class="scroll-mt-32" id="growth">
          ${sectionTitleLine("Personal Growth Path")}
          <div class="grid gap-12 md:grid-cols-2">
            <div class="space-y-8">
              <div class="border border-outline/30 bg-low p-6">
                <h4 class="mb-2 font-headline text-lg italic">Growth Challenges</h4>
                <p class="text-sm leading-relaxed text-muted">Your challenges often come less from lack of ability and more from the temptation to overuse whatever has already worked before. The lighter element ${escape(weakest)} points toward the exact function that may feel least natural now and most essential for future maturity.</p>
              </div>
              <div class="border border-outline/30 bg-low p-6">
                <h4 class="mb-2 font-headline text-lg italic">Lessons Your Life Teaches</h4>
                <p class="text-sm leading-relaxed text-muted">A major lesson of your life is that fit matters more than imitation. Many of your hardest periods may coincide with trying to live from someone else’s model of strength, success, or selfhood instead of honoring your own energetic reality.</p>
              </div>
              <div class="border border-outline/30 bg-low p-6">
                <h4 class="mb-2 font-headline text-lg italic">Evolution Path</h4>
                <p class="text-sm leading-relaxed text-muted">Your evolution is not about becoming a different person. It is about becoming more skillful at being fully and sustainably yourself. That includes knowing when to act, when to rest, when to reveal, and when to protect the inner architecture that makes your life truly yours.</p>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center border border-tertiary/20 bg-tertiary/5 p-8 text-center">
              <span class="material-symbols-outlined mb-6 text-6xl text-tertiary">psychology</span>
              <h4 class="mb-4 font-headline text-2xl italic">Inner Evolution</h4>
              <p class="max-w-md text-sm italic leading-relaxed text-muted">Mastery in your chart does not come from becoming invulnerable. It comes from remaining psychologically alive while carrying increasing power, responsibility, and self-knowledge with more grace.</p>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "energy",
      render: () => `
        <section class="scroll-mt-32" id="energy">
          ${sectionTitleLine("Energy Balance (Five Elements)")}
          <div class="mb-8 flex items-center justify-center gap-3 text-secondary/40">
            <span class="h-px w-10 bg-gradient-to-r from-transparent to-secondary/30"></span>
            <span class="material-symbols-outlined text-sm">trip_origin</span>
            <span class="material-symbols-outlined text-sm">brightness_1</span>
            <span class="material-symbols-outlined text-base text-primary/45">star</span>
            <span class="material-symbols-outlined text-sm">brightness_1</span>
            <span class="material-symbols-outlined text-sm">trip_origin</span>
            <span class="material-symbols-outlined text-base text-primary/45">south</span>
            <span class="material-symbols-outlined text-sm">trip_origin</span>
            <span class="material-symbols-outlined text-sm">brightness_1</span>
            <span class="material-symbols-outlined text-base text-primary/45">star</span>
            <span class="material-symbols-outlined text-sm">brightness_1</span>
            <span class="material-symbols-outlined text-sm">trip_origin</span>
            <span class="h-px w-10 bg-gradient-to-l from-transparent to-secondary/30"></span>
          </div>
          <div class="mb-12 grid h-64 grid-cols-5 items-end gap-4">
            ${chart.elementBalance.map((item) => `
              <div class="flex flex-col items-center gap-2">
                <div class="flex flex-col items-center gap-1">
                  <span class="material-symbols-outlined ${item.nameEn === "Wood" ? "text-secondary" : item.nameEn === "Fire" ? "text-primary" : item.nameEn === "Earth" ? "text-muted" : item.nameEn === "Metal" ? "text-tertiary" : "text-primary"}">${getElementIcon(item.nameEn)}</span>
                  <span class="text-[10px] font-bold uppercase tracking-widest ${item.nameEn === "Wood" ? "text-secondary" : item.nameEn === "Fire" ? "text-primary" : item.nameEn === "Earth" ? "text-muted" : item.nameEn === "Metal" ? "text-tertiary" : "text-primary"}">${escape(item.nameEn)}</span>
                </div>
                <div class="relative w-full rounded-t-lg ${item.nameEn === "Wood" ? "bg-secondary/20" : item.nameEn === "Fire" ? "bg-primary/20" : item.nameEn === "Earth" ? "bg-muted/20" : item.nameEn === "Metal" ? "bg-tertiary/20" : "border-x border-primary/50 bg-primary/40"}" style="height:${Math.max(item.percent, 10)}%">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold ${item.nameEn === "Water" ? "text-primary" : ""}">${item.percent}%</div>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="grid gap-8 md:grid-cols-3">
            <div class="border border-outline/30 bg-panel p-8">
              <h4 class="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Dominant Element</h4>
              <p class="text-sm leading-relaxed text-muted">Your dominant element is ${escape(dominant)}. This means the first layer of your style, instinct, and life strategy is strongly shaped by its qualities. It is a source of talent and traction, but can also become the most obvious imbalance when overused.</p>
            </div>
            <div class="border border-outline/30 bg-panel p-8">
              <h4 class="mb-4 text-xs font-bold uppercase tracking-widest text-secondary">Lighter Element</h4>
              <p class="text-sm leading-relaxed text-muted">The lighter element ${escape(weakest)} is the part of the system that may require more environment, awareness, and deliberate cultivation. It often points not to a curse, but to the exact doorway through which deeper development becomes possible.</p>
            </div>
            <div class="border border-outline/30 bg-panel p-8">
              <h4 class="mb-4 text-xs font-bold uppercase tracking-widest text-tertiary">Life Tendencies</h4>
              <p class="text-sm leading-relaxed text-muted">Your current balance is led by ${escape(topElements)}. This influences how you relate, work, recover, choose, and respond to pressure. The Five Elements do not just describe personality. They describe the conditions under which personality either flourishes or fragments.</p>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "compatibility",
      render: () => `
        <section class="scroll-mt-32" id="compatibility">
          ${sectionTitleLine("Compatibility Overview")}
          <div class="grid gap-8 md:grid-cols-2">
            <div class="rounded border-l-4 border-primary bg-panel p-8">
              <div class="mb-6 flex items-center gap-4">
                <span class="material-symbols-outlined text-primary">add_task</span>
                <h4 class="text-sm font-bold uppercase tracking-widest">Best Personality Matches</h4>
              </div>
              <p class="mb-4 text-sm leading-relaxed text-muted">Your most supportive matches are typically the people who can remain steady while still understanding emotional depth. They do not flatten complexity into convenience, and they offer enough self-possession that your intensity can become intimacy rather than instability.</p>
              <p class="text-sm leading-relaxed text-muted">For you, true compatibility usually improves where there is sincerity, pacing, patience, and a real respect for psychological depth.</p>
            </div>
            <div class="rounded border-l-4 border-outline bg-low p-8">
              <div class="mb-6 flex items-center gap-4">
                <span class="material-symbols-outlined text-muted">warning</span>
                <h4 class="text-sm font-bold uppercase tracking-widest text-muted">Challenging Matches</h4>
              </div>
              <p class="mb-4 text-sm leading-relaxed text-muted">More challenging matches tend to come from personalities that are overly unstable, shallow in emotional structure, chaotic in pacing, or unable to understand the gap between your outer expression and your deeper needs.</p>
              <p class="text-sm leading-relaxed text-muted">Those bonds may create fascination, but they often require more defense than nourishment. The chart suggests that excitement alone is rarely enough to sustain you.</p>
            </div>
          </div>
        </section>
      `,
    },
    {
      id: "guidance",
      render: () => `
        <section class="scroll-mt-32 pb-24" id="guidance">
          <div class="relative overflow-hidden bg-highest p-12 text-center md:p-20">
            <div class="pointer-events-none absolute inset-0 opacity-5">
              <div class="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary animate-pulse"></div>
            </div>
            <div class="relative z-10 mx-auto max-w-3xl">
              <span class="mb-6 block font-label text-xs uppercase tracking-[0.5em] text-primary">Final Guidance</span>
              <h2 class="ink-text-shadow mb-10 font-headline text-4xl font-bold italic md:text-5xl">Your Path to Mastery</h2>
              <div class="mb-12 space-y-6 text-lg leading-relaxed text-muted">
                <p>The strengths most worth embracing are the ones your chart repeats clearly: the authority of ${escape(dominant)}, the support of ${escape(secondary)}, and the ability to recover center even when life becomes complex. These are not accidental traits. They are structural advantages.</p>
                <p>The challenges most worth managing are not only external pressures, but your own tendency to rely too heavily on what once protected you. The lighter element ${escape(weakest)} reminds you that future growth may depend more on expansion of range than on raw intensity.</p>
                <p>${escape(compare)} The ultimate purpose of this chart is not fatalism. It is strategic self-recognition. The more clearly you know what truly fits your rhythm, values, and environment, the less likely you are to be ruled by external expectations and the more likely you are to build a life that feels authentically yours.</p>
              </div>
              <div class="flex flex-wrap justify-center gap-6">
                <button class="bg-primary px-10 py-4 text-[10px] font-black uppercase tracking-widest text-[#3c2f00] transition-transform hover:scale-95" id="download-pdf-button" type="button">Download Manuscript (PDF)</button>
              </div>
              <div class="mt-16 flex justify-center gap-8 opacity-40">
                <span class="material-symbols-outlined">stars</span>
                <span class="material-symbols-outlined">shield_moon</span>
                <span class="material-symbols-outlined">auto_fix_high</span>
              </div>
            </div>
          </div>
        </section>
      `,
    },
  ];
}

function renderSections(lang) {
  sectionsRoot.innerHTML = buildSections(lang)
    .map((section) => section.render())
    .join("");

  const downloadButton = document.getElementById("download-pdf-button");
  if (downloadButton) {
    downloadButton.addEventListener("click", () => downloadCurrentReportAsPdf(lang));
  }
}

function updateActiveSidebar() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".side-link")];
  if (!sections.length || !links.length) {
    return;
  }

  let current = sections[0].id;
  const threshold = window.scrollY + window.innerHeight * 0.25;
  sections.forEach((section) => {
    if (section.offsetTop <= threshold) {
      current = section.id;
    }
  });

  links.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("is-active", active);
  });
}

function renderPremium(lang) {
  const ui = uiText[lang];

  setText("nav-calculator", ui.navCalculator);
  setText("nav-knowledge", ui.navKnowledge);
  setText("nav-generate", ui.navGenerate);
  if (navGenerateLink) {
    navGenerateLink.href = birthInfo
      ? `./result.html?${new URLSearchParams({
          date: birthInfo.date,
          time: birthInfo.time,
          location: birthInfo.location,
          lang,
        }).toString()}`
      : "./index.html#calculator";
  }
  setText("premium-eyebrow", ui.eyebrow);
  setText("premium-disclaimer", ui.disclaimer);
  setText("side-subtitle", ui.sideSubtitle);
  setText("side-title", ui.sideTitle);
  setText("side-core", ui.sideCore);
  setText("side-emotional", ui.sideEmotional);
  setText("side-relationship", ui.sideRelationship);
  setText("side-social", ui.sideSocial);
  setText("side-talents", ui.sideTalents);
  setText("side-career", ui.sideCareer);
  setText("side-wealth", ui.sideWealth);
  setText("side-cycles", ui.sideCycles);
  setText("side-growth", ui.sideGrowth);
  setText("side-energy", ui.sideEnergy);
  setText("side-compatibility", ui.sideCompatibility);
  setText("side-guidance", ui.sideGuidance);
  setText("mobile-chart", ui.mobileChart);
  setText("mobile-cycles", ui.mobileCycles);
  setText("mobile-profile", ui.mobileProfile);
  setText("footer-contact", ui.footerContact);
  setText("footer-copy", ui.footerCopy);
  setText("premium-bottom-note", "This test result is for entertainment only and does not constitute any professional interpretation.");

  setText(
    "premium-heading",
    lang === "zh" ? `${birthInfo.location} 的完整命盘深度报告` : `Unlock Your Full Destiny Report`
  );
  setText(
    "premium-meta",
    lang === "zh"
      ? `${birthInfo.date} ${birthInfo.time} · ${chart.signNameZh} · 主导元素 ${chart.dominantElement.nameZh} · 四柱 ${pillar("pillar", 0)} / ${pillar("pillar", 1)} / ${pillar("pillar", 2)} / ${pillar("pillar", 3)}`
      : `${birthInfo.date} at ${birthInfo.time} · ${chart.signNameEn} · Dominant ${chart.dominantElement.nameEn} · Four Pillars ${pillar("pillar", 0)} / ${pillar("pillar", 1)} / ${pillar("pillar", 2)} / ${pillar("pillar", 3)}`
  );

  renderSections(lang);
  updateActiveSidebar();
}

window.BaziChart.bindLanguageSwitcher(renderPremium);
window.addEventListener("scroll", updateActiveSidebar, { passive: true });
window.addEventListener("resize", updateActiveSidebar);

renderPremium(window.BaziChart.getLanguage());
