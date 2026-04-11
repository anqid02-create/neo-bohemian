(function () {
  const LANG_KEY = "bazichart_lang";

  const signNames = {
    en: {
      白羊: "Aries",
      金牛: "Taurus",
      双子: "Gemini",
      巨蟹: "Cancer",
      狮子: "Leo",
      处女: "Virgo",
      天秤: "Libra",
      天蝎: "Scorpio",
      射手: "Sagittarius",
      摩羯: "Capricorn",
      水瓶: "Aquarius",
      双鱼: "Pisces",
    },
    zh: {
      白羊: "白羊座",
      金牛: "金牛座",
      双子: "双子座",
      巨蟹: "巨蟹座",
      狮子: "狮子座",
      处女: "处女座",
      天秤: "天秤座",
      天蝎: "天蝎座",
      射手: "射手座",
      摩羯: "摩羯座",
      水瓶: "水瓶座",
      双鱼: "双鱼座",
    },
  };

  const signSummaries = {
    en: {
      Aries: "Aries energy is direct, bold, and action-oriented.",
      Taurus: "Taurus energy is steady, grounded, and comfort-seeking.",
      Gemini: "Gemini energy is curious, social, and mentally agile.",
      Cancer: "Cancer energy is intuitive, emotional, and protective.",
      Leo: "Leos are confident, expressive, and natural leaders.",
      Virgo: "Virgo energy is observant, analytical, and detail-driven.",
      Libra: "Libra energy seeks harmony, beauty, and balanced relationships.",
      Scorpio: "Scorpio energy is intense, focused, and emotionally deep.",
      Sagittarius: "Sagittarius energy is adventurous, idealistic, and growth-oriented.",
      Capricorn: "Capricorn energy is disciplined, ambitious, and responsible.",
      Aquarius: "Aquarius energy is original, independent, and future-facing.",
      Pisces: "Pisces energy is imaginative, empathic, and emotionally porous.",
    },
    zh: {
      白羊座: "白羊座通常直接、热情，行动力强。",
      金牛座: "金牛座通常稳健、务实，也很重视安全感。",
      双子座: "双子座往往好奇、灵活，擅长交流和变化。",
      巨蟹座: "巨蟹座常常细腻、重感情，也有保护欲。",
      狮子座: "狮子座自信、外放，往往带有天然领导气质。",
      处女座: "处女座重细节、讲秩序，注重质量与标准。",
      天秤座: "天秤座重视平衡、关系与审美体验。",
      天蝎座: "天蝎座深沉、专注，洞察力往往比较强。",
      射手座: "射手座乐观、探索欲强，喜欢更广阔的体验。",
      摩羯座: "摩羯座踏实、负责，重视长期目标和成果。",
      水瓶座: "水瓶座独立、有想法，常有与众不同的视角。",
      双鱼座: "双鱼座感受力强、共情高，也更富想象力。",
    },
  };

  const elementNames = {
    en: { 木: "Wood", 火: "Fire", 土: "Earth", 金: "Metal", 水: "Water" },
    zh: { 木: "木", 火: "火", 土: "土", 金: "金", 水: "水" },
  };

  const stemPinyin = {
    甲: "Jia",
    乙: "Yi",
    丙: "Bing",
    丁: "Ding",
    戊: "Wu",
    己: "Ji",
    庚: "Geng",
    辛: "Xin",
    壬: "Ren",
    癸: "Gui",
  };

  const branchPinyin = {
    子: "Zi",
    丑: "Chou",
    寅: "Yin",
    卯: "Mao",
    辰: "Chen",
    巳: "Si",
    午: "Wu",
    未: "Wei",
    申: "Shen",
    酉: "You",
    戌: "Xu",
    亥: "Hai",
  };

  const fixedPinyin = {
    长生: "Chang Sheng",
    沐浴: "Mu Yu",
    冠带: "Guan Dai",
    临官: "Lin Guan",
    帝旺: "Di Wang",
    衰: "Shuai",
    病: "Bing",
    死: "Si",
    墓: "Mu",
    绝: "Jue",
    胎: "Tai",
    养: "Yang",
    城头土: "Cheng Tou Tu",
    石榴木: "Shi Liu Mu",
    山下火: "Shan Xia Huo",
    天河水: "Tian He Shui",
  };

  const elementDescriptions = {
    en: {
      Wood: "growth, movement, and ambition",
      Fire: "expression, charisma, and drive",
      Earth: "stability, support, and realism",
      Metal: "discipline, precision, and boundaries",
      Water: "intuition, flexibility, and depth",
    },
    zh: {
      木: "成长、延展和规划力",
      火: "表达、热情和行动驱动力",
      土: "稳定、支持和现实感",
      金: "边界、判断和秩序",
      水: "感知、灵活和深度",
    },
  };

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      return null;
    }
    return null;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "zh" || fromUrl === "en") {
      safeStorageSet(LANG_KEY, fromUrl);
      return fromUrl;
    }
    return safeStorageGet(LANG_KEY) || "en";
  }

  function setLanguage(lang) {
    safeStorageSet(LANG_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.body.dataset.lang = lang;
  }

  function bindLanguageSwitcher(onChange) {
    const buttons = document.querySelectorAll("[data-lang-switch]");
    const current = getLanguage();
    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.langSwitch === current);
      button.addEventListener("click", () => {
        const next = button.dataset.langSwitch;
        setLanguage(next);
        buttons.forEach((item) => {
          item.classList.toggle("is-active", item.dataset.langSwitch === next);
        });
        onChange(next);
      });
    });
  }

  function getSearchParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function parseBirthInfoFromUrl() {
    const date = getSearchParam("date");
    const time = getSearchParam("time") || "12:00";
    const location = getSearchParam("location") || "";

    if (!date) {
      return null;
    }

    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
    if (!dateMatch || !timeMatch) {
      return null;
    }

    return {
      date,
      time,
      location,
      year: Number(dateMatch[1]),
      month: Number(dateMatch[2]),
      day: Number(dateMatch[3]),
      hour: Number(timeMatch[1]),
      minute: Number(timeMatch[2]),
    };
  }

  function getChinesePinyin(value) {
    if (!value) {
      return "";
    }
    if (fixedPinyin[value]) {
      return fixedPinyin[value];
    }
    return [...String(value)]
      .map((char) => stemPinyin[char] || branchPinyin[char] || fixedPinyin[char] || char)
      .join(" ");
  }

  function formatChineseDisplay(value, lang) {
    const safe = escapeHtml(value);
    if (lang === "zh") {
      return `<span class="term-main">${safe}</span>`;
    }
    const pinyin = getChinesePinyin(String(value));
    return `<span class="term-main">${safe}</span><span class="term-sub">${escapeHtml(pinyin)}</span>`;
  }

  function formatMixedList(values, lang) {
    return values
      .map((value) => formatChineseDisplay(value, lang))
      .join(lang === "zh" ? "<span class=\"term-divider\"> / </span>" : "<span class=\"term-divider\"> / </span>");
  }

  function countElements(items) {
    const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
    items.forEach((item) => {
      [...item].forEach((char) => {
        if (counts[char] !== undefined) {
          counts[char] += 1;
        }
      });
    });
    return counts;
  }

  function getElementPercentages(counts) {
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0) || 1;
    return Object.entries(counts)
      .map(([key, value]) => ({
        key,
        nameEn: elementNames.en[key],
        nameZh: elementNames.zh[key],
        count: value,
        percent: Math.round((value / total) * 100),
      }))
      .sort((a, b) => b.percent - a.percent);
  }

  function getDominantElement(elements) {
    return elements[0];
  }

  function createPersonalitySummary(chart, lang) {
    if (lang === "zh") {
      return `你的命盘以${chart.dominantElement.nameZh}元素为主，这通常意味着你的核心气质更偏向${elementDescriptions.zh[chart.dominantElement.nameZh]}。同时，${chart.signNameZh}也提供了一个更容易被外界识别的性格外显层。两套系统放在一起看，可以帮助理解你如何表达自己、处理关系，以及追求目标。`;
    }

    return `Your chart is dominated by ${chart.dominantElement.nameEn} energy, which points to ${elementDescriptions.en[chart.dominantElement.nameEn]}. ${chart.signNameEn} adds a familiar Western zodiac lens, so together these systems describe both your inner energetic structure and your outer personality style.`;
  }

  function createCompareSummary(chart, lang) {
    if (lang === "zh") {
      return `西方星座更像是在描述你的外在气质和第一印象，而八字更偏向揭示内在能量结构、节奏和人生模式。简单来说：星座像“你给人的感觉”，八字像“你真正是如何运作的”。`;
    }

    return `Your Western zodiac highlights how you appear and express yourself socially, while your Bazi chart reveals the deeper energy structure underneath. In simple terms: zodiac describes how you show up, while Bazi describes how your inner pattern works.`;
  }

  function createPremiumReport(chart, lang) {
    const currentYear = new Date().getFullYear();
    const birthYear = chart.birthInfo.year;
    const currentAge = Math.max(currentYear - birthYear, 18);
    const decadeStart = Math.floor(currentAge / 10) * 10;
    const secondaryElement = chart.elementBalance[1];

    if (lang === "zh") {
      return {
        personalityTitle: `${chart.dominantElement.nameZh}元素主导的人格模式`,
        personalityCopy: `你的命盘显示出明显的${chart.dominantElement.nameZh}性，这意味着你的深层性格更容易被${elementDescriptions.zh[chart.dominantElement.nameZh]}所塑造。更深入的阅读会进一步看你在压力之下如何运作、面对机会时如何做决定，以及什么样的成长路径更自然。${chart.signNameZh}提供的是更外显的一层，而八字揭示的是背后的结构。`,
        elementTitle: `${chart.dominantElement.nameZh}能量领先`,
        elementCopy: `${chart.dominantElement.nameZh}是你最强的元素，而${secondaryElement.nameZh}也提供了重要支持。这通常意味着你的命盘适合在表达、推进和稳定之间取得平衡。高级报告会进一步解释哪些能量过强、哪些偏弱，以及什么样的环境更能让你回到稳定状态。`,
        relationshipCopy: `在关系中，你往往更适合与能理解你天然节奏、又不会压制你本来能量的人建立连接。能量平衡时，你会很有吸引力；失衡时，则可能在投入和退缩之间摆动得更快。`,
        careerCopy: `职业上，你更适合那些能让主导元素被看见的路径，比如决策、表达、创意、引导、策略或稳定影响力。高级报告不会把它解释成命定职业，而会把它视为更容易顺势发挥的工作方向。`,
        cycles: [0, 10, 20, 30].map((offset, index) => {
          const start = decadeStart + offset;
          const end = start + 9;
          const themes = ["基础与自我", "扩张与被看见", "修正与定向", "整合与沉淀"];
          const copies = [
            "这个阶段更强调建立自信、清晰感，以及对自己道路的基本信任。",
            "这个阶段通常会增加曝光、选择压力，以及让主导元素变得更明显的机会。",
            "这个阶段更适合筛选方向、建立边界，并把注意力放在真正重要的承诺上。",
            "这个阶段更强调整合经验、形成长期视角，并更有意识地安排关系与事业。",
          ];
          return { range: `${start}-${end}岁`, theme: themes[index], copy: copies[index] };
        }),
      };
    }

    return {
      personalityTitle: `${chart.dominantElement.nameEn}-Led Personality Pattern`,
      personalityCopy: `Your chart shows a strong ${chart.dominantElement.nameEn} signature, which suggests that your deeper personality is shaped by ${elementDescriptions.en[chart.dominantElement.nameEn]}. A premium reading looks at how your inner energy behaves under pressure, how you respond to opportunity, and what style of growth feels natural rather than forced. ${chart.signNameEn} adds a visible social layer, but your Bazi chart explains the deeper structure underneath.`,
      elementTitle: `${chart.dominantElement.nameEn} Takes the Lead`,
      elementCopy: `${chart.dominantElement.nameEn} is your strongest element, while ${secondaryElement.nameEn} also plays a meaningful support role. This usually means your chart works best when expression and momentum stay balanced with enough grounding. The premium lens interprets where energy is overactive, where it is undernourished, and what environments help restore equilibrium.`,
      relationshipCopy: `In relationships, your chart suggests that you connect best with people who understand your natural energetic style without trying to flatten it. When your energy is balanced, you can be deeply magnetic; when it is off-balance, you may either overcompensate or withdraw too quickly.`,
      careerCopy: `Career-wise, your chart points toward roles where your dominant energy can become visible through decision-making, creativity, strategy, guidance, or steady influence. The premium report frames this as a tendency rather than a fixed fate: the best path is usually one where your native strengths are rewarded instead of suppressed.`,
      cycles: [0, 10, 20, 30].map((offset, index) => {
        const start = decadeStart + offset;
        const end = start + 9;
        const themes = [
          "Foundation & Identity",
          "Expansion & Visibility",
          "Refinement & Direction",
          "Integration & Legacy",
        ];
        const copies = [
          "This cycle emphasizes building confidence, clarity, and the internal structure needed to trust your own path.",
          "This cycle tends to increase visibility, decision pressure, and opportunities to express your chart’s strongest element.",
          "This cycle favors alignment, stronger boundaries, and choosing the right commitments over more commitments.",
          "This cycle supports synthesis, long-term perspective, and using experience to become more intentional about relationships and work.",
        ];
        return { range: `Age ${start}-${end}`, theme: themes[index], copy: copies[index] };
      }),
    };
  }

  function buildChartData(birthInfo) {
    const solar = Solar.fromYmdHms(
      birthInfo.year,
      birthInfo.month,
      birthInfo.day,
      birthInfo.hour,
      birthInfo.minute,
      0
    );
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();
    const signKey = solar.getXingZuo();
    const wuxing = lunar.getBaZiWuXing();
    const counts = countElements(wuxing);
    const elementBalance = getElementPercentages(counts);
    const dominantElement = getDominantElement(elementBalance);

    return {
      birthInfo,
      solar,
      lunar,
      eightChar,
      signKey,
      signNameEn: signNames.en[signKey],
      signNameZh: signNames.zh[signKey],
      signSummaryEn: signSummaries.en[signNames.en[signKey]],
      signSummaryZh: signSummaries.zh[signNames.zh[signKey]],
      pillars: [
        { key: "stem", values: [eightChar.getYearGan(), eightChar.getMonthGan(), eightChar.getDayGan(), eightChar.getTimeGan()] },
        { key: "branch", values: [eightChar.getYearZhi(), eightChar.getMonthZhi(), eightChar.getDayZhi(), eightChar.getTimeZhi()] },
        { key: "pillar", values: [eightChar.getYear(), eightChar.getMonth(), eightChar.getDay(), eightChar.getTime()] },
        { key: "nayin", values: [lunar.getYearNaYin(), lunar.getMonthNaYin(), lunar.getDayNaYin(), lunar.getTimeNaYin()] },
      ],
      hiddenElements: [
        { key: "year", hidden: eightChar.getYearHideGan() },
        { key: "month", hidden: eightChar.getMonthHideGan() },
        { key: "day", hidden: eightChar.getDayHideGan() },
        { key: "hour", hidden: eightChar.getTimeHideGan() },
      ],
      elementBalance,
      dominantElement,
    };
  }

  setLanguage(getLanguage());

  window.BaziChart = {
    bindLanguageSwitcher,
    buildChartData,
    buildPremiumReport: createPremiumReport,
    createCompareSummary,
    createPersonalitySummary,
    escapeHtml,
    formatChineseDisplay,
    formatMixedList,
    getChinesePinyin,
    getLanguage,
    parseBirthInfoFromUrl,
    setLanguage,
  };
})();
