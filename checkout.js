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
let sdkLoadPromise = null;
let publicSettingsPromise = null;
let lastPayPalError = "";
const LOCAL_PAYPAL_KEY = "bazichart_public_paypal_settings";

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
    disabled: "PayPal is currently disabled in admin settings.",
    missingConfig: "PayPal credentials are missing. Please set client id and secret in admin.",
    serverConfigMissing: "PayPal server credentials are incomplete. Add a matching Client ID and Secret before accepting payments.",
    fallbackMode: "Using direct PayPal checkout because the server payment config is incomplete.",
    loading: "Loading PayPal...",
    ready: "PayPal is ready. Complete payment to unlock.",
    blocked: "Please enter a valid email before continuing.",
    processing: "Processing your payment...",
    success: "Success! Redirecting...",
    failed: "Payment failed. Please try again.",
    initFailed: "Could not initialize PayPal checkout.",
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
    items: ["核心性格蓝图", "情感世界解析", "天赋与自然能力", "事业发展路径"],
    ellipsisLabel: "更多",
    ellipsisSymbol: "...",
    ellipsisCopy: "包含人生周期、匹配概览、最终指引等内容。",
    trustTitle: "安全交付",
    trustCopy: "PayPal 支付成功后立即解锁高级页面。",
    trustTop1: "支付",
    trust1: "由 PayPal 处理",
    trustTop2: "解锁",
    trust2: "支付后立即开放",
    trustTop3: "格式",
    trust3: "高级手稿体验",
    priceTopline: "一次性支付",
    priceNote: "单次购买，立即解锁。",
    status: "PayPal 支付",
    emailLabel: "邮箱",
    paypalTitle: "通过 PayPal 支付",
    paypalSubtitle: "智能按钮结账",
    paypalNote: "完成 PayPal 支付即可解锁。",
    note: "由 PayPal 提供安全支付支持。",
    disclaimer: "仅供娱乐参考。",
    footerContact: "任何信息可以联系邮箱：anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
    disabled: "后台设置中暂未启用 PayPal。",
    missingConfig: "PayPal 配置缺失，请先在后台填写 client id 与 secret。",
    serverConfigMissing: "PayPal 服务端凭据不完整。请先配置成对的 Client ID 和 Secret，再开启支付。",
    fallbackMode: "服务端支付配置不完整，正在直接使用 PayPal 官方结账流程。",
    loading: "正在加载 PayPal...",
    ready: "PayPal 已就绪，完成支付即可解锁。",
    blocked: "请先填写有效邮箱再继续。",
    processing: "正在处理支付...",
    success: "支付成功，正在跳转...",
    failed: "支付失败，请重试。",
    initFailed: "PayPal 初始化失败。",
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

function formatPayPalErrorMessage(lang, errorLike) {
  const t = translations[lang] || translations.en;
  const raw = typeof errorLike === "string" ? errorLike : errorLike?.message || "";
  if (!raw) return t.failed;
  if (/invalid_client/i.test(raw) || /client authentication failed/i.test(raw)) {
    return `${t.failed} PayPal rejected the server credentials. Check that Client ID, Secret, and mode all match.`;
  }
  if (/missing paypal credentials/i.test(raw)) {
    return t.serverConfigMissing;
  }
  return `${t.failed} ${raw}`;
}

function canUseClientSideFallback(config, errorLike) {
  if (!config?.clientId) return false;
  if (!config?.configured) return true;
  const raw = typeof errorLike === "string" ? errorLike : errorLike?.message || "";
  return /invalid_client|client authentication failed|missing paypal credentials|incomplete paypal/i.test(raw);
}

function isValidEmail(value) {
  return Boolean(value && value.includes("@") && value.includes("."));
}

async function loadPublicSettings() {
  if (!publicSettingsPromise) {
    publicSettingsPromise = fetch("/api/admin/settings?public=1")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Failed to load settings");
        }
        return data.settings || {};
      })
      .catch(() => ({}));
  }
  return publicSettingsPromise;
}

function loadLocalPaypalSettings() {
  try {
    const raw = window.localStorage.getItem(LOCAL_PAYPAL_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}

async function getCheckoutConfig() {
  const urlClientId = params.get("paypalClientId") || "";
  const urlCurrency = params.get("currency") || "";
  const urlAmount = params.get("amount") || "";
  const urlIntent = params.get("intent") || "";
  const inlineConfig = window.BaziChartCheckoutConfig || {};
  const settings = await loadPublicSettings();
  const paypal = settings.paypal || {};
  const hasPublicConfig = Object.keys(paypal).length > 0;
  const local = hasPublicConfig ? {} : loadLocalPaypalSettings();
  return {
    enabled: (paypal.enabled !== false) && (local.enabled !== false),
    configError: paypal.configError || "",
    configured: paypal.configured !== false,
    clientId: urlClientId || paypal.clientId || local.clientId || inlineConfig.paypalClientId || "",
    currency: (urlCurrency || paypal.currency || local.currency || inlineConfig.currency || "USD").toUpperCase(),
    amount: String(urlAmount || paypal.amount || local.amount || inlineConfig.amount || "9.99"),
    intent: String(urlIntent || paypal.intent || local.intent || inlineConfig.intent || "CAPTURE").toUpperCase(),
  };
}

function loadPayPalSdk(config) {
  if (window.paypal) {
    return Promise.resolve(window.paypal);
  }
  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }

  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const sdkUrl = new URL("https://www.paypal.com/sdk/js");
    sdkUrl.searchParams.set("client-id", config.clientId);
    sdkUrl.searchParams.set("currency", config.currency);
    sdkUrl.searchParams.set("intent", config.intent.toLowerCase());
    sdkUrl.searchParams.set("components", "buttons");
    script.src = sdkUrl.toString();
    script.async = true;
    script.onload = () => (window.paypal ? resolve(window.paypal) : reject(new Error("paypal-sdk-missing")));
    script.onerror = () => reject(new Error("paypal-sdk-load-failed"));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

function unlockAndRedirect(email, captureDetails) {
  sessionStorage.setItem(
    "bazichart_demo_purchase",
    JSON.stringify({
      provider: "paypal",
      email,
      paidAt: new Date().toISOString(),
      reference: captureDetails.id || "",
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

async function renderPayPal(lang) {
  const t = translations[lang];
  const config = await getCheckoutConfig();

  if (!paymentButtonMount) return;
  paymentButtonMount.innerHTML = "";
  lastPayPalError = "";
  setStatus(paymentStatus, "");
  setStatus(paymentConfigHelp, "");

  if (!config.enabled) {
    setStatus(paymentConfigHelp, t.disabled);
    return;
  }
  if (!config.clientId) {
    setStatus(paymentConfigHelp, t.missingConfig);
    return;
  }
  if (!config.configured) {
    setStatus(paymentConfigHelp, config.configError || t.serverConfigMissing);
  }

  setStatus(paymentStatus, t.loading);

  try {
    const paypal = await loadPayPalSdk(config);
    setStatus(paymentStatus, t.ready);
    let orderFlow = canUseClientSideFallback(config) ? "client" : "server";

    await paypal
      .Buttons({
        style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal", height: 48 },
        onClick(data, actions) {
          const email = emailInput?.value.trim() || "";
          if (!isValidEmail(email)) {
            setStatus(paymentStatus, t.blocked);
            return actions.reject();
          }
          return actions.resolve();
        },
        createOrder: async (data, actions) => {
          const createClientOrder = () =>
            actions.order.create({
              intent: config.intent,
              purchase_units: [
                {
                  amount: {
                    currency_code: config.currency,
                    value: config.amount,
                  },
                },
              ],
            });

          if (orderFlow === "client") {
            setStatus(paymentStatus, t.fallbackMode);
            return createClientOrder();
          }
          try {
            const email = emailInput?.value.trim() || "";
            const response = await fetch("/api/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                amount: config.amount,
                currency: config.currency,
                intent: config.intent,
              }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data.id) {
              throw new Error(data.details || data.error || "create-order failed");
            }
            orderFlow = "server";
            return data.id;
          } catch (error) {
            if (canUseClientSideFallback(config, error)) {
              orderFlow = "client";
              setStatus(paymentStatus, t.fallbackMode);
              return createClientOrder();
            }
            lastPayPalError = formatPayPalErrorMessage(lang, error);
            setStatus(paymentStatus, lastPayPalError);
            throw error;
          }
        },
        onApprove: async (data, actions) => {
          try {
            setStatus(paymentStatus, t.processing);
            const email = emailInput?.value.trim() || "";
            if (orderFlow === "client") {
              const capture = await actions.order.capture();
              setStatus(paymentStatus, t.success);
              unlockAndRedirect(email, capture);
              return;
            }
            const response = await fetch("/api/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID, email }),
            });
            const capture = await response.json().catch(() => ({}));
            if (!response.ok || !capture.ok) {
              throw new Error(capture.details || capture.error || "capture-order failed");
            }
            setStatus(paymentStatus, t.success);
            unlockAndRedirect(email, capture);
          } catch (error) {
            if (canUseClientSideFallback(config, error) && actions?.order?.capture) {
              const email = emailInput?.value.trim() || "";
              const capture = await actions.order.capture();
              setStatus(paymentStatus, t.success);
              unlockAndRedirect(email, capture);
              return;
            }
            lastPayPalError = formatPayPalErrorMessage(lang, error);
            setStatus(paymentStatus, lastPayPalError);
            throw error;
          }
        },
        onCancel: () => {
          setStatus(paymentStatus, t.failed);
        },
        onError: (error) => {
          const message = lastPayPalError || formatPayPalErrorMessage(lang, error);
          setStatus(paymentStatus, message);
        },
      })
      .render("#payment-button-mount");
  } catch (error) {
    setStatus(paymentStatus, `${t.initFailed}${error?.message ? ` (${error.message})` : ""}`);
  }
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
  setText("checkout-payment-title", t.paypalTitle);
  setText("checkout-payment-subtitle", t.paypalSubtitle);
  setText("payment-note", t.paypalNote);
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

  renderPayPal(lang);
}

if (!date) {
  window.location.replace("./index.html");
} else {
  window.BaziChart.bindLanguageSwitcher(applyLanguage);
  applyLanguage(currentLang);
}
