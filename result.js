const birthInfo = window.BaziChart.parseBirthInfoFromUrl();
if (!birthInfo) {
  window.location.replace("./index.html");
}
const navGenerateLink = document.getElementById("nav-generate");

const chart = birthInfo ? window.BaziChart.buildChartData(birthInfo) : null;
const pillarGrid = document.getElementById("pillar-grid");
const hiddenGrid = document.getElementById("hidden-grid");
const elementsBars = document.getElementById("elements-bars");
const elementInsightGrid = document.getElementById("element-insight-grid");
const elementExplainGrid = document.getElementById("element-explain-grid");
const elementsWheel = document.getElementById("elements-wheel");
const elementsWheelCenter = document.getElementById("elements-wheel-center");
const personalityTraits = document.getElementById("personality-traits");
const premiumCta = document.getElementById("premium-cta");

const pillarDescriptions = {
  en: {
    year: "The Year Pillar often reflects family atmosphere, social background, and the kind of energy you inherit early in life.",
    month: "The Month Pillar is strongly connected to career rhythm, responsibility, ambition, and the environment that shapes your adult path.",
    day: "The Day Pillar is the most personal pillar. It is often used to understand your inner personality, relationship style, and sense of self.",
    hour: "The Hour Pillar is associated with future potential, later-life direction, ideas, aspirations, and how your energy continues to unfold.",
  },
  zh: {
    year: "年柱通常与原生背景、家庭氛围、早期环境和你从出生起就带着的基调有关。",
    month: "月柱常被用来理解事业节奏、责任感、成年阶段的成长环境，以及你如何走向社会。",
    day: "日柱是最贴近核心自我的一柱，常用来理解性格本质、关系风格和你内在的驱动力。",
    hour: "时柱多与未来潜能、后半生方向、愿景、想法以及能量如何继续展开有关。",
  },
};

const zodiacExpanded = {
  en: {
    Aries: "Aries usually comes across as direct and energetic. It often adds initiative, courage, and a strong instinct to act quickly. In your chart, this can make the outer personality feel bolder than the quieter layers underneath.",
    Taurus: "Taurus often appears steady, grounded, and resistant to unnecessary chaos. It can add patience, sensuality, and a preference for consistency. In combination with Bazi, it often makes the personality feel more stable and deliberate.",
    Gemini: "Gemini tends to present as curious, expressive, and mentally quick. It can add a social, adaptive quality and a love of information. In your reading, this often colors how you communicate and process new environments.",
    Cancer: "Cancer often adds emotional sensitivity, protectiveness, and a strong need for meaningful closeness. It can make your outer personality feel more caring and responsive. In a mixed reading, it often softens sharper parts of the chart.",
    Leo: "Leo often appears bright, expressive, and naturally visible. It can add leadership instinct, creative pride, and a desire to leave a memorable impression. In your chart, this usually strengthens confidence, presentation, and the urge to be fully seen.",
    Virgo: "Virgo often appears observant, exacting, and quietly capable. It can add detail-awareness, discipline, and practical intelligence. In your chart, this often sharpens how you evaluate people, tasks, and standards.",
    Libra: "Libra tends to feel refined, social, and relationally aware. It can add diplomacy, aesthetic sense, and a desire for balance. In combination with Bazi, it often changes how tension, cooperation, and attraction are expressed.",
    Scorpio: "Scorpio often gives the personality a more intense, private, and magnetic tone. It can add emotional depth, strategic focus, and stronger inner commitment. In your chart, it usually makes motivations feel deeper than first impressions suggest.",
    Sagittarius: "Sagittarius often brings openness, exploration, and direct honesty. It can add idealism, movement, and a need for growth through experience. In your chart, this often creates a more adventurous social expression.",
    Capricorn: "Capricorn often shows up as composed, serious, and determined. It can add endurance, long-term thinking, and respect for structure. In your chart, this often makes ambition and responsibility more visible.",
    Aquarius: "Aquarius tends to feel independent, unusual, and idea-driven. It can add originality, distance, and a need to think differently. In your chart, it often makes personality expression feel less conventional and more future-oriented.",
    Pisces: "Pisces often appears soft, intuitive, and emotionally permeable. It can add imagination, empathy, and stronger sensitivity to mood. In your chart, it often increases the dreamlike or symbolic tone of your personality.",
  },
  zh: {
    白羊座: "白羊座通常会让人显得直接、热情而有行动力，也更容易表现出先做再调整的风格。它会让外在气质更大胆、更有冲劲。放进八字里看时，往往会让你的第一印象比内在层次更鲜明。",
    金牛座: "金牛座往往让人显得稳定、务实，也更重视节奏和安全感。它会增强耐心、感官体验和长期积累的倾向。与八字结合时，常让性格表现得更稳、更能守住自己的步调。",
    双子座: "双子座通常会让人显得灵活、善交流、反应快。它会给性格增加信息感、适应力和表达欲。放进命盘中看时，常常影响你处理环境变化和沟通的方式。",
    巨蟹座: "巨蟹座会让外在气质更细腻、更有保护欲，也更重视情感连接。它会增加共情和亲密关系中的投入度。结合八字来看时，往往会柔化命盘里过强的锋芒感。",
    狮子座: "狮子座通常会让人显得明亮、自信、表达力强，也天然带有被看见的需求。它会增强领导感、创造欲和舞台感。放进命盘里看时，往往会放大你的存在感和自我呈现能力。",
    处女座: "处女座往往让人显得细致、讲究、安静但很有标准。它会强化观察力、秩序感和实际判断。结合八字时，常让你在处理任务、人际和规则时更谨慎也更精准。",
    天秤座: "天秤座通常让人显得圆融、讲分寸，也更在意相处中的平衡感。它会加强审美、关系意识和协调能力。放进命盘看时，往往会影响你表达冲突与合作的方式。",
    天蝎座: "天蝎座会让性格呈现更深、更强烈、更有磁性的气质。它会增加专注度、洞察力和更深的情感投入。结合八字时，常让一个人的动机和真实需求比表面更复杂。",
    射手座: "射手座通常会让人显得坦率、开放，也更渴望探索与成长。它会增加理想感、行动半径和体验欲。放进命盘中时，常使人格外显层更有冒险感和扩张性。",
    摩羯座: "摩羯座通常让人显得克制、稳重，也更重视目标与结果。它会加强耐力、长期思维和责任感。结合命盘时，往往会让事业心和现实执行力更明显。",
    水瓶座: "水瓶座常让人显得独立、有想法、不太愿意被常规定义。它会增加原创性、距离感和更偏未来的视角。放进命盘看时，常会让你的表达更有个人风格。",
    双鱼座: "双鱼座通常会让气质更柔软、更有感受力，也更容易受到情绪和氛围影响。它会增加想象力、共情与直觉。结合八字时，往往会让人格的象征感和感受层更明显。",
  },
};

const elementExplain = {
  en: {
    Wood: "Wood is associated with growth, movement, ambition, and renewal. In a chart, it often relates to planning, expansion, and the instinct to keep developing.",
    Fire: "Fire is linked to expression, visibility, charisma, warmth, and drive. Strong Fire often feels energetic, creative, and eager to be seen or felt.",
    Earth: "Earth represents grounding, stability, realism, support, and nourishment. It often brings reliability, patience, and an instinct to hold things together.",
    Metal: "Metal is connected to structure, precision, boundaries, discipline, and discernment. It often sharpens judgment and the ability to define what matters.",
    Water: "Water relates to intuition, adaptability, depth, observation, and inner movement. It often appears through sensitivity, flexibility, and strategic flow.",
  },
  zh: {
    木: "木对应成长、延展、规划和向上生发的力量。在命盘中，木常与理想、发展感和推动事情继续前进的倾向有关。",
    火: "火对应表达、热度、可见度、魅力和行动驱动力。火旺的人通常更有存在感，也更容易把能量外放出来。",
    土: "土对应稳定、承载、现实感、支持与滋养。土的能量常带来可靠、耐心，以及先稳住局面的能力。",
    金: "金对应结构、边界、判断、原则与秩序。金的能量会让一个人在取舍、标准和效率上更鲜明。",
    水: "水对应直觉、流动、观察、适应和深层感知。水的能量常让人更灵活，也更容易从环境变化中找到方向。",
  },
};

const elementPersonalReadings = {
  en: {
    dominantLead: (name) => `Your chart is led by ${name} energy.`,
    dominantCopy: {
      Wood: "This often suggests a personality that wants to grow, improve, and keep moving toward the next horizon. You may feel most alive when there is progress, learning, or a sense of expansion.",
      Fire: "This often points to an expressive, visible, and emotionally warm personality. You may naturally radiate enthusiasm, creativity, or the desire to leave a strong impression.",
      Earth: "This usually suggests a grounded and containing personality style. You may be someone who stabilizes situations, protects others, and values trust, continuity, and practical support.",
      Metal: "This often points to a personality that values clarity, standards, and inner structure. You may come across as more decisive, self-disciplined, or particular about what feels right and worthwhile.",
      Water: "This often suggests a reflective, perceptive, and adaptive personality. You may read atmosphere quickly, think in subtle ways, and prefer flexibility over forcing a rigid path.",
    },
    weakestLead: (name) => `${name} appears lighter in your chart.`,
    weakestCopy: {
      Wood: "This may mean growth energy needs to be cultivated more consciously. At times, it can feel harder to begin, stretch outward, or trust long-range development without encouragement.",
      Fire: "This may mean outward expression is not always the first instinct. You might keep more inside, warm up slowly, or need the right environment before showing full confidence and visibility.",
      Earth: "This may mean stability and containment are things you build deliberately rather than automatically. In busy periods, you may need extra routines, grounding, or supportive structure.",
      Metal: "This may mean boundaries, precision, or decisiveness become important growth themes. You may prefer openness over strict order, and need time before cutting away what no longer fits.",
      Water: "This may mean rest, reflection, or emotional flow need more intentional space. At times you may move quickly on willpower, and only later notice the deeper feelings underneath.",
    },
    overallTitle: "Overall Five Elements Reading",
    overallCopy: (dominant, weakest, secondary) =>
      `Together, this creates a chart that is strongest in ${dominant}, supported by ${secondary}, while ${weakest} plays a quieter role. In personality terms, that usually means your most natural strengths show up first, while the lighter element marks an area where balance, maturity, or environment can make a big difference.`,
    cards: {
      dominant: "Dominant Element",
      weakest: "Lighter Element",
      overall: "Balance Interpretation",
    },
  },
  zh: {
    dominantLead: (name) => `你的命盘以${name}能量为主。`,
    dominantCopy: {
      木: "这通常说明你更容易被成长、推进、发展和向前延展的感觉所驱动。你往往在有空间进步、有目标可追时更容易发挥状态。",
      火: "这通常说明你的性格里有更明显的表达欲、存在感和热度。你更容易把情绪、创意和行动力往外释放出来，也更容易被人感受到。",
      土: "这通常说明你的人格底色更稳，更擅长承接、协调和稳定局面。你往往重视安全感、信任感，以及事情能不能真正落地。",
      金: "这通常说明你会更重视边界、标准、判断和秩序。你可能在取舍、原则感和执行层面更鲜明，也更容易看出什么真正重要。",
      水: "这通常说明你更有观察力、感受力和适应力。你可能不一定总是最先外放，但往往能更快察觉环境与人心的变化。",
    },
    weakestLead: (name) => `${name}在你的命盘里相对偏弱。`,
    weakestCopy: {
      木: "这代表“生长与展开”的力量可能需要后天更多培养。某些时候你可能不那么容易主动开启、拉长战线，或者需要外界推动才更容易进入发展状态。",
      火: "这代表“表达与外放”的力量不是最先出现的。你可能更慢热，也可能需要足够安全的环境，才会把真正的热度和自信展示出来。",
      土: "这代表“稳定与承接”的力量需要刻意建立。忙乱或压力大的时候，你可能更需要规律、节奏和现实支撑来帮助自己站稳。",
      金: "这代表“边界与判断”的议题会更值得练习。你可能更愿意保持开放，但在做取舍、定标准时需要更长一点时间。",
      水: "这代表“流动与内在感受”的空间需要被主动留出来。你有时可能先靠意志往前走，之后才慢慢意识到更深的情绪和疲惫。",
    },
    overallTitle: "整体五行解读",
    overallCopy: (dominant, weakest, secondary) =>
      `整体来看，你的命盘以${dominant}为主，并受到${secondary}的辅助，而${weakest}的比重相对更轻。放到性格里理解，通常就是你最自然的能力会先表现出来，而偏弱的那一行则更像需要环境、经验或后天练习来补足的部分。`,
    cards: {
      dominant: "主导元素",
      weakest: "偏弱元素",
      overall: "平衡解读",
    },
  },
};

const hiddenPersonality = {
  en: {
    year: "Because the Year Pillar sits furthest from the core self, it often shapes the social aura people notice first. It can suggest inherited tone, family style, and the kind of symbolic backdrop you carry into public life.",
    month: "The Month Pillar often acts like the engine room of adulthood. It can point to work ethic, pressure response, achievement patterns, and the kind of structure in which your personality matures.",
    day: "The Day Pillar is the most intimate layer in Bazi interpretation. It often reveals how you love, protect yourself, build trust, and define your personal identity from the inside.",
    hour: "The Hour Pillar is often quieter when someone is young, but it becomes more noticeable over time. It can suggest your future direction, inner wishes, creative offspring, and how your personality may evolve later.",
  },
  zh: {
    year: "年柱离核心自我最远，因此常常塑造别人最先感受到的气场。它会透露你身上的原生背景感、家庭风格，以及你带入公共生活中的整体基调。",
    month: "月柱很像成年阶段的发动机。它常与工作方式、压力下的反应、成就模式，以及你在什么样的结构里最容易成长有关。",
    day: "日柱是八字里最贴近私人核心的一层，常用来理解你如何去爱、如何建立信任、如何保护自己，以及你真正认同的自我感。",
    hour: "时柱在年轻时可能不那么明显，但随着时间推移会越来越重要。它多与未来方向、内在愿望、创意延伸，以及你后期如何继续变化有关。",
  },
};

const stemTraits = {
  en: {
    甲: "Jia Wood is upright, pioneering, and growth-oriented.",
    乙: "Yi Wood is refined, adaptive, and quietly persistent.",
    丙: "Bing Fire is bright, expressive, and naturally visible.",
    丁: "Ding Fire is subtle, perceptive, and emotionally warm.",
    戊: "Wu Earth is steady, protective, and structurally minded.",
    己: "Ji Earth is careful, receptive, and skilled at support.",
    庚: "Geng Metal is direct, disciplined, and action-oriented.",
    辛: "Xin Metal is precise, elegant, and detail-sensitive.",
    壬: "Ren Water is broad, strategic, and fast-moving.",
    癸: "Gui Water is intuitive, reflective, and quietly observant.",
  },
  zh: {
    甲: "甲木的气质偏向挺拔、主动、带着开拓与向上生长的力量。",
    乙: "乙木更细腻、柔韧，也更擅长在环境中慢慢延展。",
    丙: "丙火通常明亮、外放、存在感强，容易被人注意到。",
    丁: "丁火更像细火与灯火，敏感、温暖，也更重视感受和氛围。",
    戊: "戊土偏稳、能扛事，有保护性，也重视结构与秩序。",
    己: "己土细致、包容、讲分寸，常带着照顾与承接别人的能力。",
    庚: "庚金直接、果断、执行力强，做事更有硬度与推进感。",
    辛: "辛金精致、敏锐、讲究标准，常有较强的判断与审美。",
    壬: "壬水流动感强、视野大，也更擅长顺势而动和灵活应变。",
    癸: "癸水细腻、直觉强、观察深，往往不张扬但感受很丰富。",
  },
};

const branchTraits = {
  en: {
    子: "Zi suggests alertness, sensitivity, and inner movement.",
    丑: "Chou suggests patience, reserve, and slow-building endurance.",
    寅: "Yin suggests initiative, expansion, and a forward-driving spirit.",
    卯: "Mao suggests diplomacy, sensitivity, and social grace.",
    辰: "Chen suggests complexity, inner storage, and layered potential.",
    巳: "Si suggests intensity, insight, and a sharpened will.",
    午: "Wu suggests visibility, passion, and expressive confidence.",
    未: "Wei suggests gentleness, containment, and emotional nuance.",
    申: "Shen suggests intelligence, adaptability, and quick response.",
    酉: "You suggests polish, self-awareness, and attention to refinement.",
    戌: "Xu suggests loyalty, seriousness, and inner guarding.",
    亥: "Hai suggests imagination, empathy, and intuitive depth.",
  },
  zh: {
    子: "子水多带来敏感、机警和内在流动感。",
    丑: "丑土常表现出耐性、克制和慢慢累积的韧性。",
    寅: "寅木往往带着启动感、扩张感和向前推进的气势。",
    卯: "卯木更偏细腻、人际感和温和的表达方式。",
    辰: "辰土常代表内在层次多、储藏感强，也带一点复杂性。",
    巳: "巳火往往更敏锐、有洞察，也带着较强的意志力。",
    午: "午火通常增强热度、表现力和外放的自信。",
    未: "未土偏柔和、含蓄，也更有情绪与包容层次。",
    申: "申金常带来聪明、反应快和适应变化的能力。",
    酉: "酉金更讲究修饰、标准和自我要求。",
    戌: "戌土偏忠诚、认真，也常有自我守护的一面。",
    亥: "亥水多与想象力、共情和直觉深度有关。",
  },
};

function buildPillarSpecificAnalysis(lang, key, stem, branch, hidden) {
  const roleIntro = pillarDescriptions[lang][key];
  const personality = hiddenPersonality[lang][key];
  const stemText = stemTraits[lang][stem] || "";
  const branchText = branchTraits[lang][branch] || "";
  const hiddenCountText =
    lang === "zh"
      ? `这柱里还藏着${hidden.join("、")}，说明它不是单一气质，而是带着更细的内在层次。`
      : `Its hidden stems ${hidden.join(", ")} add secondary motives and make this pillar more layered than the visible surface suggests.`;

  if (lang === "zh") {
    return `${roleIntro}${stemText}${branchText}${hiddenCountText}${personality}`;
  }

  return `${roleIntro} ${stemText} ${branchText} ${hiddenCountText} ${personality}`;
}

const translations = {
  en: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navPremium: "Premium Report",
    navGenerate: "Generate Chart",
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
    hiddenTopline: "Deeper Influences",
    hiddenTitle: "Deeper Influences in Your Chart",
    hiddenHelp: "Each pillar carries hidden stems and a different psychological emphasis, so this section looks beneath the visible surface of your chart.",
    elementsTopline: "Five Elements Balance",
    elementsTitle: "Your Energy Distribution",
    summaryTopline: "The Internal Alchemy",
    summaryTitle: "Your Core Personality",
    compareLabel: "Chinese Astrology vs Western Zodiac",
    premiumTopline: "Premium Analysis",
    premiumTitle: "Destiny Directions",
    premiumTitleMain: "Unlock Your Full Destiny Report",
    premiumCopy: "Get the extended interpretation of your chart with deeper insights, premium guidance, and a shareable report.",
    premiumItems: ["detailed personality analysis","element balance interpretation","relationship compatibility","career tendencies","10-year energy cycles","downloadable report"],
    premiumCta: "Get Full Report Now",
    rows: { stem: "Heavenly Stem", branch: "Earthly Branch", pillar: "Pillar", nayin: "Na Yin" },
    hiddenLabels: ["Year Pillar", "Month Pillar", "Day Pillar", "Hour Pillar"],
    hiddenLabelWithValue: (label, value) => `${label}: ${value}`,
    hiddenMeta: "Hidden stems",
    resultHeading: (location) => `Your Bazi Chart for ${location}`,
    resultMeta: (chart, info) => `${info.date} at ${info.time} · ${chart.signNameEn} · Four Pillars calculated from your birth details`,
    elementsSummary: (chart) => `Your chart shows strong ${chart.dominantElement.nameEn} energy. The circular chart below shows how each element participates in your personality structure.`,
    disclaimer: "For entertainment purposes only.",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. Etched in the stars.",
  },
  zh: {
    navCalculator: "Home",
    navKnowledge: "知识",
    navPremium: "深度报告",
    navGenerate: "生成命盘",
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
    hiddenTopline: "深层影响",
    hiddenTitle: "命盘中的深层影响",
    hiddenHelp: "每一柱不仅有表面的干支，还包含藏干与更细的性格重心，因此这里会进一步解释四柱在你人格中的作用。",
    elementsTopline: "五行平衡",
    elementsTitle: "你的能量分布",
    summaryTopline: "内在结构",
    summaryTitle: "你的核心人格",
    compareLabel: "中国命理与西方星座对照",
    premiumTopline: "深度分析",
    premiumTitle: "命运方向",
    premiumTitleMain: "解锁完整命盘报告",
    premiumCopy: "获得更深入的命盘解读，包括个性分析、职业倾向、关系风格与十年能量周期。",
    premiumItems: ["深度性格分析","五行平衡解读","关系匹配倾向","职业发展方向","10年能量周期","可下载报告"],
    premiumCta: "立即获取完整报告",
    rows: { stem: "天干", branch: "地支", pillar: "四柱", nayin: "纳音" },
    hiddenLabels: ["年柱", "月柱", "日柱", "时柱"],
    hiddenLabelWithValue: (label, value) => `${label}：${value}`,
    hiddenMeta: "藏干",
    resultHeading: (location) => `${location} 的八字命盘`,
    resultMeta: (chart, info) => `${info.date} ${info.time} · ${chart.signNameZh} · 基于出生信息生成的四柱命盘`,
    elementsSummary: (chart) => `你的命盘显示出较强的${chart.dominantElement.nameZh}元素能量。下方的圆盘图能帮助你直观看到五行在整体人格结构中的参与比例。`,
    disclaimer: "此结果仅供娱乐。",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
  },
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function buildWheel(balance) {
  const colors = {
    Wood: "#7bd4b5",
    Fire: "#f39ac7",
    Earth: "#d8b56f",
    Metal: "#bfcbe1",
    Water: "#7bb6ff",
  };
  let start = 0;
  const stops = balance.map((item) => {
    const end = start + item.percent;
    const color = colors[item.nameEn];
    const stop = `${color} ${start}% ${end}%`;
    start = end;
    return stop;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

function getElementLabel(item, lang) {
  return lang === "zh" ? item.nameZh : item.nameEn;
}

function getDayMaster(chart) {
  return chart.pillars.find((row) => row.key === "stem").values[2];
}

function buildPersonalitySections(chart, lang) {
  const dayMaster = getDayMaster(chart);
  const dominant = lang === "zh" ? chart.dominantElement.nameZh : chart.dominantElement.nameEn;
  const compare = window.BaziChart.createCompareSummary(chart, lang);
  const sign = lang === "zh" ? chart.signNameZh : chart.signNameEn;

  if (lang === "zh") {
    return [
      {
        icon: "military_tech",
        color: "text-primary",
        border: "border-primary/20 group-hover:border-primary",
        title: "天生的主导力与人格立场",
        copy: `你的日主为${dayMaster}，这通常会让人格里带着更明确的立场感、判断力和承担感。再加上命盘里较强的${dominant}元素，你在面对复杂局面时往往不喜欢模糊不清，而更倾向于主动建立秩序、明确方向，并在关键时刻做决定。你给人的感觉通常不是轻飘的热闹，而是一种能够压住场面、让别人愿意把注意力交给你的存在感。`,
      },
      {
        icon: "waves",
        color: "text-secondary",
        border: "border-secondary/20 group-hover:border-secondary",
        title: "情绪深度与直觉共振",
        copy: `虽然你外在可能并不总是先展示柔软的一面，但八字里隐藏的层次和五行分布说明，你对气氛、情绪和关系变化其实很敏锐。你不一定会第一时间把感受说出来，却很容易察觉别人没有说出口的东西。这让你在人际里往往同时具备理性判断和情绪感知两种能力，也让你的内在世界比表面看起来更深。`,
      },
      {
        icon: "auto_awesome",
        color: "text-primary",
        border: "border-primary/20 group-hover:border-primary",
        title: "原则感、可信度与人格骨架",
        copy: `你的命盘结构里有比较清晰的内在标准，所以“可靠”往往会成为别人对你的重要印象。你通常不太喜欢空泛、随意或没有边界的状态，而更重视规则、承诺、长期价值以及真正站得住脚的东西。这种人格骨架会让你在工作和关系里显得有分量，也让你更容易建立起持续性的信任。`,
      },
      {
        icon: "ac_unit",
        color: "text-[#ffb4ab]",
        border: "border-[#ffb4ab]/20 group-hover:border-[#ffb4ab]",
        title: "潜在盲点：过度用力与弹性挑战",
        copy: `你的强项越明显，压力之下就越容易往同一个方向用力过猛。比如当你太想维持秩序、标准或掌控感时，可能会显得不够放松，或者很难接受节奏突然改变。这里也是你命盘真正值得成长的地方：不是放弃原则，而是在坚持自我和保留流动性之间找到更成熟的平衡。${compare}`,
      },
    ];
  }

  return [
    {
      icon: "military_tech",
      color: "text-primary",
      border: "border-primary/20 group-hover:border-primary",
      title: "Innate Leadership & Archetypal Authority",
      copy: `Your Day Master is ${dayMaster}, which often gives the personality a stronger axis of conviction, judgment, and personal presence. Combined with your chart’s pronounced ${dominant} energy, you are unlikely to feel comfortable inside vague or unstructured dynamics for long. Instead, you tend to clarify the atmosphere, define priorities, and step into responsibility when something meaningful needs direction. The impression you leave is not just charisma, but gravity: people often feel that you can hold the center of a situation when it matters.`,
    },
    {
      icon: "waves",
      color: "text-secondary",
      border: "border-secondary/20 group-hover:border-secondary",
      title: "Profound Emotional Depth & Intuitive Resonances",
      copy: `Even if your outer style appears composed or structured, the hidden layers in your Bazi chart suggest real sensitivity beneath the surface. You may not always verbalize emotion immediately, but you tend to register shifts in tone, mood, and human dynamics very quickly. This creates a fascinating inner duality: one part of you prefers coherence and definition, while another part is quietly reading atmosphere, subtext, and emotional undercurrents. That balance can make you both perceptive and psychologically nuanced.`,
    },
    {
      icon: "auto_awesome",
      color: "text-primary",
      border: "border-primary/20 group-hover:border-primary",
      title: "Unyielding Integrity & Moral Architecture",
      copy: `There is a visible internal structure in your chart that often translates into reliability, standards, and a strong personal code. You are usually less interested in appearances for their own sake and more interested in what is lasting, coherent, and genuinely trustworthy. In both work and relationships, this can make you the person others turn to when steadiness, discernment, or follow-through is required. Over time, your credibility becomes part of your identity.`,
    },
    {
      icon: "ac_unit",
      color: "text-[#ffb4ab]",
      border: "border-[#ffb4ab]/20 group-hover:border-[#ffb4ab]",
      title: "The Rigid Edge: Challenges of Cognitive Flexibility",
      copy: `Every defining strength carries a potential shadow. Because your chart has a strong inner framework, pressure can sometimes push you toward over-control, mental rigidity, or difficulty yielding when plans change unexpectedly. You may feel safest when values, roles, and expectations are clear, but growth often comes from learning how to preserve your standards without becoming trapped by them. ${compare} Your Western sign of ${sign} adds another layer to this story, showing how your outer style may soften, dramatize, or reinterpret that inner structure.`,
    },
  ];
}

function renderPillarGrid(lang) {
  const t = translations[lang];
  const order = [3, 2, 1, 0];
  const pillarNames = [t.thHour, t.thDay, t.thMonth, t.thYear];
  const stems = chart.pillars.find((row) => row.key === "stem").values;
  const branches = chart.pillars.find((row) => row.key === "branch").values;

  pillarGrid.innerHTML = "";

  order.forEach((sourceIndex, displayIndex) => {
    const column = document.createElement("div");
    column.className = "flex flex-col gap-3 sm:gap-4";
    const isDay = sourceIndex === 2;
    const label = pillarNames[displayIndex];
    const stem = stems[sourceIndex];
    const branch = branches[sourceIndex];
    const stemDisplay = window.BaziChart.formatChineseDisplay(stem, lang);
    const branchDisplay = window.BaziChart.formatChineseDisplay(branch, lang);

    column.innerHTML = `
      <div class="relative py-1 text-center">
        <span class="text-[10px] uppercase tracking-[0.2em] ${isDay ? "font-bold text-primary" : "text-secondary"}">${label}</span>
        ${isDay ? `<div class="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-tight text-[#241a00]">${lang === "zh" ? "日主" : "Day Master"}</div>` : ""}
      </div>
      <div class="${isDay ? "border-2 border-primary bg-[#1b1400]" : "border border-outline/20 bg-[#0c0e17]"} flex h-24 flex-col justify-center rounded-lg p-5 text-center">
        <div class="font-headline text-3xl text-primary">${stemDisplay}</div>
      </div>
      <div class="${isDay ? "border border-primary/30 bg-primary/5" : "border border-outline/20 bg-[#0c0e17]"} flex h-24 flex-col justify-center rounded-lg p-5 text-center">
        <div class="font-headline text-3xl text-secondary">${branchDisplay}</div>
      </div>
    `;

    pillarGrid.appendChild(column);
  });
}

function renderPage(lang) {
  const t = translations[lang];
  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-generate", t.navGenerate);
  if (navGenerateLink && birthInfo) {
    navGenerateLink.href = `./result.html?${new URLSearchParams({
      date: birthInfo.date,
      time: birthInfo.time,
      location: birthInfo.location,
      lang,
    }).toString()}`;
  }
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
  setText("premium-topline", t.premiumTopline);
  setText("premium-title", t.premiumTitle);
  setText("premium-title-main", t.premiumTitleMain);
  setText("premium-copy", t.premiumCopy);
  t.premiumItems.forEach((item, index) => setText(`premium-item-${index + 1}`, item));
  setText("premium-cta", t.premiumCta);
  setText("result-disclaimer", t.disclaimer);
  setText("footer-contact", t.footerContact);
  setText("footer-copy", t.footerCopy);
  setText("result-bottom-note", "This test result is for entertainment only and does not constitute any professional interpretation.");
  setText("th-layer-stem", t.rows.stem);
  setText("th-layer-branch", t.rows.branch);
  setText("western-card-title", t.compareLabel);

  if (!chart) {
    return;
  }

  setText("result-heading", t.resultHeading(birthInfo.location));
  setText("result-meta", t.resultMeta(chart, birthInfo));
  const signKey = lang === "zh" ? chart.signNameZh : chart.signNameEn;
  setText("western-sign-name", signKey);
  setText("western-sign-summary", zodiacExpanded[lang][signKey]);
  setText("compare-summary", `${zodiacExpanded[lang][signKey]} ${window.BaziChart.createCompareSummary(chart, lang)}`);
  renderPillarGrid(lang);

  hiddenGrid.innerHTML = "";
  chart.hiddenElements.forEach((item, index) => {
    const wrap = document.createElement("article");
    wrap.className = "rounded-xl border border-outline/20 bg-[#0c0e17] p-5";
    const hiddenText = window.BaziChart.formatMixedList(item.hidden, lang);
    const key = ["year", "month", "day", "hour"][index];
    const stem = chart.pillars.find((row) => row.key === "stem").values[index];
    const branch = chart.pillars.find((row) => row.key === "branch").values[index];
    const pillarTitle = window.BaziChart.formatChineseDisplay(`${stem}/${branch}`, lang);
    const analysis = buildPillarSpecificAnalysis(lang, key, stem, branch, item.hidden);
    wrap.innerHTML = `
      <div class="mb-3 border-b border-outline/20 pb-3">
        <h3 class="font-headline text-2xl text-text">${t.hiddenLabelWithValue(t.hiddenLabels[index], pillarTitle)}</h3>
        <p class="mt-2 text-sm font-semibold text-secondary"><strong>${t.hiddenMeta}:</strong> ${hiddenText}</p>
      </div>
      <p class="leading-relaxed text-muted">${analysis}</p>
    `;
    hiddenGrid.appendChild(wrap);
  });

  elementsBars.innerHTML = "";
  chart.elementBalance.forEach((item) => {
    const label = lang === "zh" ? item.nameZh : item.nameEn;
    const row = document.createElement("div");
    row.className = "space-y-2";
    const colorMap = {
      Wood: "#88c057",
      Fire: "#ff5c5c",
      Earth: "#c8a47e",
      Metal: "#e9c349",
      Water: "#adcbd6",
    };
    const barColor = colorMap[item.nameEn] || "#e9c349";
    row.innerHTML = `
      <div class="flex justify-between text-sm">
        <span style="color:${barColor}" class="font-bold">${label}</span>
        <span>${item.percent}%</span>
      </div>
      <div class="h-1.5 w-full overflow-hidden rounded-full bg-[#32343e]"><div class="h-full rounded-full" style="width:${item.percent}%; background:${barColor}"></div></div>
    `;
    elementsBars.appendChild(row);
  });

  elementsWheel.style.background = buildWheel(chart.elementBalance);
  elementsWheelCenter.textContent = lang === "zh" ? chart.dominantElement.nameZh : chart.dominantElement.nameEn;
  setText("elements-summary", t.elementsSummary(chart));

  const sortedBalance = [...chart.elementBalance].sort((a, b) => b.percent - a.percent);
  const dominant = sortedBalance[0];
  const secondary = sortedBalance[1];
  const weakest = sortedBalance[sortedBalance.length - 1];
  const reading = elementPersonalReadings[lang];

  elementInsightGrid.innerHTML = "";
  [
    {
      title: reading.cards.dominant,
      lead: reading.dominantLead(getElementLabel(dominant, lang)),
      copy:
        lang === "zh"
          ? reading.dominantCopy[dominant.nameZh]
          : reading.dominantCopy[dominant.nameEn],
    },
    {
      title: reading.cards.weakest,
      lead: reading.weakestLead(getElementLabel(weakest, lang)),
      copy:
        lang === "zh"
          ? reading.weakestCopy[weakest.nameZh]
          : reading.weakestCopy[weakest.nameEn],
    },
    {
      title: reading.cards.overall,
      lead: reading.overallTitle,
      copy: reading.overallCopy(
        getElementLabel(dominant, lang),
        getElementLabel(weakest, lang),
        getElementLabel(secondary, lang)
      ),
    },
  ].forEach((item) => {
    const card = document.createElement("article");
    card.className = "rounded-xl border border-outline/20 bg-panel p-5";
    card.innerHTML = `
      <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">${item.title}</p>
      <h3 class="font-headline text-2xl text-text">${item.lead}</h3>
      <p class="mt-3 leading-relaxed text-muted">${item.copy}</p>
    `;
    elementInsightGrid.appendChild(card);
  });

  elementExplainGrid.innerHTML = "";
  chart.elementBalance.forEach((item) => {
    const card = document.createElement("article");
    card.className = "rounded-xl border border-outline/20 bg-panel p-5";
    const name = getElementLabel(item, lang);
    card.innerHTML = `
      <h3 class="font-headline text-2xl text-text">${name}</h3>
      <p class="mt-3 leading-relaxed text-muted">${lang === "zh" ? elementExplain.zh[item.nameZh] : elementExplain.en[item.nameEn]}</p>
    `;
    elementExplainGrid.appendChild(card);
  });

  personalityTraits.innerHTML = "";
  buildPersonalitySections(chart, lang).forEach((section, index, list) => {
    const block = document.createElement("div");
    block.className = `group flex flex-col gap-8 ${index < list.length - 1 ? "border-b border-outline/10 pb-8" : ""} md:flex-row`;
    block.innerHTML = `
      <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border ${section.border} bg-panel shadow-lg transition-colors">
        <span class="material-symbols-outlined text-4xl ${section.color}">${section.icon}</span>
      </div>
      <div class="space-y-4">
        <h4 class="font-headline text-2xl ${section.color}">${section.title}</h4>
        <p class="text-lg leading-relaxed text-muted">${section.copy}</p>
      </div>
    `;
    personalityTraits.appendChild(block);
  });
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
