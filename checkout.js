const params = new URLSearchParams(window.location.search);
const date = params.get("date");
const time = params.get("time") || "12:00";
const birthLocation = params.get("location") || "";

const emailInput = document.getElementById("checkout-email");
const paymentButtonMount = document.getElementById("payment-button-mount");
const paymentStatus = document.getElementById("payment-status");
const paymentConfigHelp = document.getElementById("payment-config-help");
const navGenerateLink = document.getElementById("nav-generate");

let currentLang = window.BaziChart.getLanguage();

const SUPPORT_EMAIL = "anqid02@gmail.com";

const translations = {
  en: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navGenerate: "Generate Chart",
    eyebrow: "Premium Checkout",
    title: "Request Your Full Destiny Report",
    summary: `You are requesting the premium manuscript for ${birthLocation} on ${date} at ${time}.`,
    whatTopline: "Premium Access",
    whatTitle: "What You'll Get",
    itemLabel: "Included",
    items: ["Core Personality Blueprint", "Emotional World", "Talent & Natural Abilities", "Career & Professional Path"],
    ellipsisLabel: "And More",
    ellipsisSymbol: "...",
    ellipsisCopy: "Life cycles, compatibility, final guidance, and more.",
    trustTitle: "Personal support delivery",
    trustCopy: "We review each request manually and send payment instructions before unlocking your premium page.",
    trustTop1: "Request",
    trust1: "Submitted from this page",
    trustTop2: "Payment",
    trust2: "Confirmed manually by email",
    trustTop3: "Access",
    trust3: "Unlocked after confirmation",
    priceTopline: "One-Time Payment",
    priceNote: "Manual payment confirmation. Premium access follows after approval.",
    status: "Manual Checkout",
    emailLabel: "Email",
    paymentTitle: "Request full report",
    paymentSubtitle: "Manual payment flow",
    paymentNote: "Submit your details and we will contact you with payment instructions.",
    note: "We currently confirm payments manually before unlocking the full report.",
    disclaimer: "For entertainment purposes only.",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. Etched in the stars.",
    blocked: "Please enter a valid email so we can contact you.",
    ready: "Ready to submit your premium report request.",
    submitted: "Your request is ready. Your email app should open with the details prefilled.",
    fallbackCopy: `If your email app does not open, please email ${SUPPORT_EMAIL} and include your birth details.`,
    cta: "Request Full Report",
    helper: "We will review your request and reply with payment instructions.",
  },
  zh: {
    navCalculator: "首页",
    navKnowledge: "知识",
    navGenerate: "生成命盘",
    eyebrow: "高级支付",
    title: "申请完整深度命盘报告",
    summary: `您正在为 ${birthLocation}（${date} ${time}）申请完整报告。`,
    whatTopline: "高级权限",
    whatTitle: "您将获得",
    itemLabel: "包含内容",
    items: ["核心性格蓝图", "情感世界解析", "天赋与自然能力", "事业发展路径"],
    ellipsisLabel: "更多",
    ellipsisSymbol: "...",
    ellipsisCopy: "包含人生周期、匹配概览、最终指引等内容。",
    trustTitle: "人工确认交付",
    trustCopy: "我们会人工审核每一笔请求，并通过邮件发送付款说明，确认后解锁高级页面。",
    trustTop1: "申请",
    trust1: "在本页提交",
    trustTop2: "付款",
    trust2: "通过邮件人工确认",
    trustTop3: "解锁",
    trust3: "确认后开放完整报告",
    priceTopline: "一次性支付",
    priceNote: "人工确认付款，确认后开通高级内容。",
    status: "人工收款",
    emailLabel: "邮箱",
    paymentTitle: "申请完整报告",
    paymentSubtitle: "人工付款流程",
    paymentNote: "提交你的信息后，我们会通过邮件联系你并发送付款说明。",
    note: "目前我们通过人工确认付款后解锁完整报告。",
    disclaimer: "仅供娱乐参考。",
    footerContact: "任何信息可以联系邮箱：anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
    blocked: "请填写有效邮箱，方便我们联系你。",
    ready: "可以提交你的完整报告申请了。",
    submitted: "你的申请已准备好，系统会尝试打开默认邮箱并自动填入信息。",
    fallbackCopy: `如果没有自动打开邮箱，请直接发邮件到 ${SUPPORT_EMAIL}，并附上你的出生信息。`,
    cta: "申请完整报告",
    helper: "我们会审核申请并通过邮件回复付款说明。",
  },
};

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setStatus(node, message) {
  if (!node) return;
  node.textContent = message || "";
  node.classList.toggle("hidden", !message);
}

function isValidEmail(value) {
  return Boolean(value && value.includes("@") && value.includes("."));
}

function buildMailto(email, lang) {
  const subject =
    lang === "zh"
      ? `完整命盘报告申请 - ${date} ${time}`
      : `Premium report request - ${date} ${time}`;
  const bodyLines =
    lang === "zh"
      ? [
          "你好，我想购买完整命盘报告。",
          "",
          `邮箱: ${email}`,
          `出生日期: ${date}`,
          `出生时间: ${time}`,
          `出生地点: ${birthLocation}`,
          `语言: ${lang}`,
          "",
          "请把付款方式和后续步骤发给我，谢谢。",
        ]
      : [
          "Hello, I would like to purchase the full destiny report.",
          "",
          `Email: ${email}`,
          `Birth date: ${date}`,
          `Birth time: ${time}`,
          `Birth location: ${birthLocation}`,
          `Language: ${lang}`,
          "",
          "Please send me the payment instructions and next steps. Thank you.",
        ];

  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

function renderManualCheckout(lang) {
  const t = translations[lang];
  if (!paymentButtonMount) return;

  paymentButtonMount.innerHTML = `
    <button
      class="w-full rounded-2xl border border-primary/30 bg-primary px-5 py-4 text-sm font-extrabold uppercase tracking-[0.24em] text-background transition hover:brightness-105"
      id="manual-checkout-button"
      type="button"
    >
      ${t.cta}
    </button>
    <p class="mt-3 text-xs leading-relaxed text-secondary/75" id="manual-checkout-helper">
      ${t.helper}
    </p>
  `;

  setStatus(paymentConfigHelp, "");
  setStatus(paymentStatus, t.ready);

  const button = document.getElementById("manual-checkout-button");
  if (!button) return;

  button.addEventListener("click", () => {
    const email = emailInput?.value.trim() || "";
    if (!isValidEmail(email)) {
      setStatus(paymentStatus, t.blocked);
      emailInput?.focus();
      return;
    }

    setStatus(paymentStatus, `${t.submitted} ${t.fallbackCopy}`);
    window.location.href = buildMailto(email, lang);
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-generate", t.navGenerate);
  if (navGenerateLink) {
    navGenerateLink.href = date
      ? `./result.html?${new URLSearchParams({ date, time, location: birthLocation, lang }).toString()}`
      : "./index.html#calculator";
  }

  setText("checkout-eyebrow", t.eyebrow);
  setText("checkout-title", t.title);
  setText("checkout-summary", t.summary);
  setText("checkout-what-topline", t.whatTopline);
  setText("checkout-what-title", t.whatTitle);
  setText("checkout-trust-title", t.trustTitle);
  setText("checkout-trust-copy", t.trustCopy);
  setText("checkout-trust-1-top", t.trustTop1);
  setText("checkout-trust-1", t.trust1);
  setText("checkout-trust-2-top", t.trustTop2);
  setText("checkout-trust-2", t.trust2);
  setText("checkout-trust-3-top", t.trustTop3);
  setText("checkout-trust-3", t.trust3);
  setText("checkout-price-topline", t.priceTopline);
  setText("checkout-price-note", t.priceNote);
  setText("checkout-status", t.status);
  setText("checkout-email-label", t.emailLabel);
  setText("checkout-payment-title", t.paymentTitle);
  setText("checkout-payment-subtitle", t.paymentSubtitle);
  setText("payment-note", t.paymentNote);
  setText("checkout-note", t.note);
  setText("checkout-disclaimer", t.disclaimer);
  setText("footer-contact", t.footerContact);
  setText("footer-copy", t.footerCopy);

  for (let i = 0; i < t.items.length; i += 1) {
    setText(`checkout-item-${i + 1}-label`, t.itemLabel);
    setText(`checkout-item-${i + 1}`, t.items[i]);
  }
  setText("checkout-ellipsis-label", t.ellipsisLabel);
  setText("checkout-ellipsis-symbol", t.ellipsisSymbol);
  setText("checkout-ellipsis-copy", t.ellipsisCopy);

  renderManualCheckout(lang);
}

if (!date) {
  window.location.replace("./index.html");
} else {
  window.BaziChart.bindLanguageSwitcher(applyLanguage);
  applyLanguage(currentLang);
}
