const checkoutForm = document.getElementById("checkout-form");
const checkoutSummary = document.getElementById("checkout-summary");
const checkoutBackLink = document.getElementById("checkout-back-link");

const params = new URLSearchParams(window.location.search);
const date = params.get("date");
const time = params.get("time") || "12:00";
const location = params.get("location") || "";

const translations = {
  en: {
    navCalculator: "Calculator",
    navKnowledge: "Knowledge",
    navBack: "Back to Result",
    eyebrow: "Premium Checkout",
    title: "Unlock Your Full Bazi Analysis",
    summary: `You are unlocking the premium report for ${location} on ${date} at ${time}.`,
    whatTitle: "What You’ll Get",
    items: [
      "detailed personality analysis",
      "element balance interpretation",
      "relationship compatibility",
      "career tendencies",
      "10-year energy cycles",
      "downloadable report",
    ],
    priceTopline: "One-Time Payment",
    status: "Demo Checkout",
    emailLabel: "Email",
    cardLabel: "Card Number",
    expiryLabel: "Expiry",
    cvcLabel: "CVC",
    button: "Pay $9.99",
    note: "This is a demo payment flow for product prototyping. No real card will be charged.",
  },
  zh: {
    navCalculator: "测算",
    navKnowledge: "知识",
    navBack: "返回结果页",
    eyebrow: "高级报告结账",
    title: "解锁完整八字报告",
    summary: `你正在为 ${location}（${date} ${time}）解锁高级命盘报告。`,
    whatTitle: "你将获得",
    items: [
      "深度性格分析",
      "五行平衡解读",
      "关系匹配倾向",
      "职业发展方向",
      "10年能量周期",
      "可下载报告",
    ],
    priceTopline: "一次性支付",
    status: "演示支付",
    emailLabel: "邮箱",
    cardLabel: "卡号",
    expiryLabel: "有效期",
    cvcLabel: "安全码",
    button: "支付 $9.99",
    note: "这是一个用于产品原型演示的假支付流程，不会进行真实扣款。",
  },
};

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function applyLanguage(lang) {
  const t = translations[lang];
  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("checkout-back-link", t.navBack);
  setText("checkout-eyebrow", t.eyebrow);
  setText("checkout-title", t.title);
  setText("checkout-summary", t.summary);
  setText("checkout-what-title", t.whatTitle);
  t.items.forEach((item, index) => setText(`checkout-item-${index + 1}`, item));
  setText("checkout-price-topline", t.priceTopline);
  setText("checkout-status", t.status);
  setText("checkout-email-label", t.emailLabel);
  setText("checkout-card-label", t.cardLabel);
  setText("checkout-expiry-label", t.expiryLabel);
  setText("checkout-cvc-label", t.cvcLabel);
  setText("checkout-button", t.button);
  setText("checkout-note", t.note);
}

if (!date) {
  window.location.replace("./index.html");
} else {
  checkoutBackLink.href = `./result.html?${new URLSearchParams({ date, time, location, lang: window.BaziChart.getLanguage() }).toString()}`;
  window.BaziChart.bindLanguageSwitcher(applyLanguage);
  applyLanguage(window.BaziChart.getLanguage());

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("checkout-email").value.trim();
    const card = document.getElementById("checkout-card").value.trim();
    if (!email || !card) {
      return;
    }
    sessionStorage.setItem(
      "bazichart_demo_purchase",
      JSON.stringify({ email, paidAt: new Date().toISOString(), reference: `demo_${Date.now()}` })
    );
    const nextParams = new URLSearchParams({
      date,
      time,
      location,
      unlocked: "1",
      lang: window.BaziChart.getLanguage(),
    });
    window.location.href = `./premium-report.html?${nextParams.toString()}`;
  });
}
