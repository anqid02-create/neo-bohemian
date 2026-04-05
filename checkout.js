const params = new URLSearchParams(window.location.search);
const date = params.get("date");
const time = params.get("time") || "12:00";
const birthLocation = params.get("location") || "";

const emailInput = document.getElementById("checkout-email");
const paypalButtonContainer = document.getElementById("paypal-button-container");
const paypalStatus = document.getElementById("paypal-status");
const paypalConfigHelp = document.getElementById("paypal-config-help");
const navGenerateLink = document.getElementById("nav-generate");

let currentLang = window.BaziChart.getLanguage();
let paypalRenderPromise = null;

const translations = {
  en: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navPremium: "Premium Report",
    navGenerate: "Generate Chart",
    eyebrow: "Premium Checkout",
    title: "Unlock Your Full Destiny Report",
    summary: `You are unlocking the premium manuscript for ${birthLocation} on ${date} at ${time}. Pay once with PayPal and continue directly into the full report.`,
    whatTopline: "Premium Access",
    whatTitle: "What You'll Get",
    itemLabel: "Included",
    items: [
      "Core Personality Blueprint",
      "Emotional World",
      "Talent & Natural Abilities",
      "Career & Professional Path",
    ],
    ellipsisLabel: "And More",
    ellipsisSymbol: "...",
    ellipsisCopy:
      "Life cycles, compatibility, final guidance, and the rest of your premium manuscript continue inside the full report.",
    trustTitle: "Secure report delivery",
    trustCopy:
      "Your PayPal approval unlocks the premium page immediately and keeps your current chart context attached.",
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
    paypalNote:
      "Complete your payment with PayPal and we will unlock your full report immediately.",
    note:
      "This checkout uses PayPal. Sandbox mode is enabled automatically until you replace the Client ID with your live one.",
    disclaimer: "For entertainment purposes only.",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. Etched in the stars.",
    configMissing:
      "PayPal sandbox test mode is active. Replace the Client ID in checkout.html when you're ready to switch to your real account.",
    blocked:
      "Please enter a valid email before continuing to PayPal. We use it to attach your unlocked report to this session.",
    loading: "Loading PayPal checkout...",
    ready: "PayPal is ready. Approve the payment to unlock your premium report.",
    processing: "Completing your PayPal payment...",
    success: "Payment approved. Redirecting to your premium report...",
    cancelled:
      "PayPal checkout was cancelled. Your report remains locked until payment is approved.",
    failed:
      "We couldn't initialize PayPal on this page. Please check your Client ID and try again.",
    captureFailed:
      "PayPal returned an error while finalizing the payment. Please try again.",
  },
  zh: {
    navCalculator: "Home",
    navKnowledge: "知识",
    navPremium: "深度报告",
    navGenerate: "生成命盘",
    eyebrow: "高级支付",
    title: "解锁完整深度命盘报告",
    summary: `你正在为 ${birthLocation}（${date} ${time}）解锁完整高级手稿。通过 PayPal 完成一次支付后，将直接进入完整版报告。`,
    whatTopline: "高级权限",
    whatTitle: "你将获得",
    itemLabel: "包含内容",
    items: [
      "Core Personality Blueprint",
      "Emotional World",
      "Talent & Natural Abilities",
      "Career & Professional Path",
    ],
    ellipsisLabel: "更多内容",
    ellipsisSymbol: "...",
    ellipsisCopy:
      "人生周期、匹配概览、最终指引以及更多深度内容，都将在完整版报告里继续展开。",
    trustTitle: "安全交付",
    trustCopy:
      "PayPal 支付成功后会立刻解锁高级页面，并保留你当前这份命盘上下文。",
    trustTop1: "支付",
    trust1: "由 PayPal 处理",
    trustTop2: "解锁",
    trust2: "支付通过后立即开放",
    trustTop3: "形式",
    trust3: "高级命理手稿体验",
    priceTopline: "一次性支付",
    priceNote: "单次购买，立即解锁。",
    status: "PayPal 支付",
    emailLabel: "邮箱",
    paypalTitle: "通过 PayPal 支付",
    paypalSubtitle: "智能按钮结账",
    paypalNote:
      "完成 PayPal 支付后，我们会立即为你解锁完整报告。",
    note:
      "当前页面已接入 PayPal。在你替换成正式 Client ID 之前，会默认使用 sandbox 测试模式。",
    disclaimer: "此结果仅供娱乐。",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
    configMissing:
      "当前已启用 PayPal sandbox 测试模式。等你准备上线时，再把 checkout.html 里的 Client ID 替换成正式账号即可。",
    blocked:
      "请先填写有效邮箱，再继续跳转 PayPal。我们会用它来关联本次解锁状态。",
    loading: "正在加载 PayPal 支付组件...",
    ready: "PayPal 已就绪，完成支付后会自动解锁高级报告。",
    processing: "正在确认你的 PayPal 支付...",
    success: "支付成功，正在跳转到高级报告...",
    cancelled: "你已取消 PayPal 支付，报告仍保持未解锁状态。",
    failed: "当前页面无法初始化 PayPal。请检查 Client ID 后重试。",
    captureFailed: "PayPal 在完成支付时返回了错误，请稍后再试。",
  },
};

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setStatus(target, message, visible) {
  if (!target) return;
  target.textContent = message || "";
  target.classList.toggle("hidden", !visible);
}

function getCheckoutConfig() {
  const inlineConfig = window.BaziChartCheckoutConfig || {};
  const urlClientId = params.get("paypalClientId");
  const urlCurrency = params.get("currency");

  return {
    clientId: urlClientId || inlineConfig.paypalClientId || "sb",
    currency: urlCurrency || inlineConfig.currency || "USD",
    amount: inlineConfig.amount || "9.99",
    intent: inlineConfig.intent || "capture",
  };
}

function hasRealClientId(clientId) {
  return Boolean(clientId && !clientId.includes("YOUR_PAYPAL_CLIENT_ID"));
}

function loadPayPalSdk(config) {
  if (window.paypal) {
    return Promise.resolve(window.paypal);
  }

  if (paypalRenderPromise) {
    return paypalRenderPromise;
  }

  paypalRenderPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const sdkUrl = new URL("https://www.paypal.com/sdk/js");
    sdkUrl.searchParams.set("client-id", config.clientId);
    sdkUrl.searchParams.set("currency", config.currency);
    sdkUrl.searchParams.set("intent", config.intent);
    sdkUrl.searchParams.set("components", "buttons");
    script.src = sdkUrl.toString();
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        resolve(window.paypal);
      } else {
        reject(new Error("paypal-sdk-missing"));
      }
    };
    script.onerror = () => reject(new Error("paypal-sdk-load-failed"));
    document.head.appendChild(script);
  });

  return paypalRenderPromise;
}

function unlockAndRedirect(email, captureDetails) {
  sessionStorage.setItem(
    "bazichart_demo_purchase",
    JSON.stringify({
      provider: "paypal",
      email,
      paidAt: new Date().toISOString(),
      reference: captureDetails.id,
      payerName: captureDetails.payer?.name?.given_name || "",
      captureDetails,
    })
  );

  const nextParams = new URLSearchParams({
    date,
    time,
    location: birthLocation,
    unlocked: "1",
    lang: currentLang,
  });

  window.location.href = `./premium-report.html?${nextParams.toString()}`;
}

function renderPayPal(currentConfig, lang) {
  const t = translations[lang];
  if (!paypalButtonContainer) return;

  paypal.Buttons({
    createOrder: async () => {
      try {
        const response = await fetch("/api/create-order", {
          method: "POST"
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const order = await response.json();
        return order.id;
      } catch (err) {
        console.error("createOrder error:", err);
        setStatus(paypalStatus, t.failed, true);
        throw err;
      }
    },

    onApprove: async (data) => {
      try {
        const response = await fetch("/api/capture-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const capture = await response.json();
        console.log("PAYMENT SUCCESS", capture);
        window.location.href = "/premium-report.html";
      } catch (err) {
        console.error("onApprove error:", err);
        setStatus(paypalStatus, t.failed, true);
      }
    },

    onError: (err) => {
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

  if (navGenerateLink) {
    navGenerateLink.href = date
      ? `./result.html?${new URLSearchParams({
          date,
          time,
          location: birthLocation,
          lang,
        }).toString()}`
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
  setText("checkout-paypal-title", t.paypalTitle);
  setText("checkout-paypal-subtitle", t.paypalSubtitle);
  setText("paypal-note", t.paypalNote);
  setText("checkout-note", t.note);
  setText("checkout-disclaimer", t.disclaimer);
  setText("footer-contact", t.footerContact);
  setText("footer-copy", t.footerCopy);

  for (let index = 0; index < t.items.length; index += 1) {
    setText(`checkout-item-${index + 1}-label`, t.itemLabel);
    setText(`checkout-item-${index + 1}`, t.items[index]);
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
