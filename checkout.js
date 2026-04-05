const params = new URLSearchParams(window.location.search);
const date = params.get("date");
const time = params.get("time") || "12:00";
const birthLocation = params.get("location") || "";

const emailInput = document.getElementById("checkout-email");
const paypalButtonContainer = document.getElementById("paypal-button-container");
const paypalStatus = document.getElementById("paypal-status");
const navGenerateLink = document.getElementById("nav-generate");

let currentLang = window.BaziChart.getLanguage();

const translations = {
  en: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navGenerate: "Generate Chart",
    eyebrow: "Premium Checkout",
    title: "Unlock Your Full Destiny Report",
    summary: `You are unlocking the premium manuscript for ${birthLocation} on ${date} at ${time}.`,
    whatTopline: "Premium Access",
    whatTitle: "What You'll Get",
    itemLabel: "Included",
    items: ["Core Personality Blueprint", "Emotional World", "Talent & Natural Abilities", "Career & Professional Path"],
    ellipsisLabel: "And More",
    ellipsisSymbol: "...",
    ellipsisCopy: "Life cycles, compatibility, final guidance, and more.",
    trustTitle: "Secure report delivery",
    trustCopy: "Your PayPal approval unlocks the premium page immediately.",
    trustTop1: "Payment",
    trust1: "Processed with PayPal",
    trustTop2: "Access",
    trust2: "Unlocked right after approval",
    trustTop3: "Format",
    trust3: "Premium manuscript experience",
    priceTopline: "One-Time Payment",
    priceNote: "Single purchase. Immediate unlock.",
    status: "PayPal Checkout",
    emailLabel: "Email",
    paypalTitle: "Pay with PayPal",
    paypalSubtitle: "Smart Buttons Checkout",
    paypalNote: "Complete your payment with PayPal.",
    note: "Secure payment powered by PayPal.",
    disclaimer: "For entertainment purposes only.",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. Etched in the stars.",
    failed: "Payment failed. Please try again.",
    loading: "Loading PayPal...",
    success: "Success! Redirecting..."
  },
  zh: {
    navCalculator: "首页",
    navKnowledge: "知识",
    navGenerate: "生成命盘",
    eyebrow: "高级支付",
    title: "解锁完整深度命盘报告",
    summary: `您正在为 ${birthLocation}（${date} ${time}）解锁完整报告。`,
    whatTopline: "高级权限",
    whatTitle: "您将获得",
    itemLabel: "包含内容",
    items: ["核心性格蓝图", "情感世界解析", "天赋与潜能", "事业发展路径"],
    ellipsisLabel: "更多内容",
    ellipsisSymbol: "...",
    ellipsisCopy: "人生周期、匹配概览、最终指引等更多内容。",
    trustTitle: "安全交付",
    trustCopy: "PayPal 支付成功后立即解锁高级页面。",
    trustTop1: "支付",
    trust1: "PayPal 安全支付",
    trustTop2: "解锁",
    trust2: "支付后立即开放",
    trustTop3: "格式",
    trust3: "高级命理手稿",
    priceTopline: "一次性支付",
    priceNote: "单次购买，立即解锁。",
    status: "PayPal 支付",
    emailLabel: "邮箱",
    paypalTitle: "PayPal 支付",
    paypalSubtitle: "智能按钮结账",
    paypalNote: "完成 PayPal 支付后立即解锁。",
    note: "由 PayPal 提供安全支付支持。",
    disclaimer: "仅供娱乐参考。",
    footerContact: "联系我们: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
    failed: "支付失败，请重试。",
    loading: "加载中...",
    success: "支付成功！跳转中..."
  }
};

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setStatus(target, message, isError) {
  if (!target) return;
  target.textContent = message || "";
  target.classList.remove("hidden");
}

function getCheckoutConfig() {
  const inlineConfig = window.BaziChartCheckoutConfig || {};
  return {
    clientId: inlineConfig.paypalClientId || "sb",
    currency: inlineConfig.currency || "USD",
    amount: inlineConfig.amount || "9.99",
    intent: inlineConfig.intent || "capture",
  };
}

function renderPayPal(currentConfig, lang) {
  const t = translations[lang];
  if (!paypalButtonContainer) return;

  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: currentConfig.amount,
            currency_code: currentConfig.currency
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        console.log("PAYMENT SUCCESS", details);
        setStatus(paypalStatus, t.success, false);
        sessionStorage.setItem('paymentCompleted', 'true');
        sessionStorage.setItem('paymentDetails', JSON.stringify(details));
        setTimeout(() => {
          window.location.href = "/premium-report.html";
        }, 1500);
      });
    },
    onError: function(err) {
      console.error("PayPal error:", err);
      setStatus(paypalStatus, t.failed, true);
    }
  }).render("#paypal-button-container");
}

function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  const config = getCheckoutConfig();

  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-generate", t.navGenerate);
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
  setText("checkout-paypal-title", t.paypalTitle);
  setText("checkout-paypal-subtitle", t.paypalSubtitle);
  setText("paypal-note", t.paypalNote);
  setText("checkout-note", t.note);
  setText("checkout-disclaimer", t.disclaimer);
  setText("footer-contact", t.footerContact);
  setText("footer-copy", t.footerCopy);

  for (let i = 0; i < t.items.length; i++) {
    setText(`checkout-item-${i + 1}-label`, t.itemLabel);
    setText(`checkout-item-${i + 1}`, t.items[i]);
  }

  setText("checkout-ellipsis-label", t.ellipsisLabel);
  setText("checkout-ellipsis-symbol", t.ellipsisSymbol);
  setText("checkout-ellipsis-copy", t.ellipsisCopy);

  renderPayPal(config, lang);
}

if (!date) {
  window.location.replace("./index.html");
} else {
  window.BaziChart.bindLanguageSwitcher(applyLanguage);
  applyLanguage(currentLang);
}
