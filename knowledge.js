const sectionsRoot = document.getElementById("knowledge-sections");
const navGenerateLink = document.getElementById("nav-generate");

const translations = {
  en: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navPremium: "Premium Report",
    navGenerate: "Generate Chart",
    title: "Knowledge",
    subtitle: "The Celestial Manuscript: Deciphering the language of the stars and elements.",
    disclaimer: "For entertainment purposes only.",
    ctaTitle: "Ready to unlock your own manuscript?",
    ctaCopy: "Calculate your personal Bazi chart and Western zodiac profile in one unified experience.",
    ctaButton: "Generate Your Chart",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. Etched in the stars.",
    sections: [
      {
        id: "intro",
        type: "imageSplit",
        ghost: "01",
        title: "What is BaZi?",
        accent: "Beginner's Guide",
        imageLabel: "The Four Pillars",
        imageSub: "Year, Month, Day, and Hour",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCRvKCr_5iNgiiqiqDVFueyl2xhQO4G4lSZSfTEp6VAf_I2PxwlTHuVbzL7K5JSNEvdJXRVFLo24Uft8OwTYxO4stQmlV_8biKNbm7JXLGUA-MEcRGa5Z2LCzPeWbnFRIqV_HWfcN__u1PSNlHbRMUv7Qq2W18L5BT0eVf2giax-R95Ili0FRdQqs9lNkWBVq6X18d8d5pu_UceiUfXtcsgMbs7pOzCrJCZK73sbwdZ9ZzDtFoD8miKbEZky5SpI3nq6wV2wccKYgU",
        paragraphs: [
          "BaZi, literally 'Eight Characters,' is a classical Chinese metaphysical system built from the four time markers of birth: year, month, day, and hour. Each pillar contains a Heavenly Stem and an Earthly Branch, and together these eight symbols describe the energetic conditions present at the moment a life begins.",
          "Professional readers do not treat BaZi as simplistic fortune-telling. They use it as a structural language for reading temperament, life rhythm, elemental balance, relational tendencies, and the kinds of environments in which a person is more likely to thrive or struggle. In that sense, BaZi is closer to an energetic blueprint than a fixed sentence about fate.",
          "The sophistication of BaZi comes from context. A single element does not mean the same thing in every chart. Its meaning changes according to season, neighboring symbols, hidden stems, and whether the day master is supported or pressured. This is why serious interpretation is less about memorizing keywords and more about understanding relationships within the system.",
        ],
      },
      {
        id: "pillars",
        type: "detailGrid",
        title: "The Four Pillars of Destiny",
        intro:
          "The Four Pillars are the backbone of BaZi interpretation. Each pillar represents a different layer of life, and each one contributes a different kind of information. A professional reading does not isolate them; it studies how they cooperate, reinforce, or clash.",
        cards: [
          {
            title: "Year Pillar",
            body:
              "The Year Pillar is often linked to ancestry, family atmosphere, early environment, and the larger social field into which a person is born. It can show how someone is perceived publicly, what kind of inherited tone surrounds the chart, and what deeper generational patterns may be in play.",
          },
          {
            title: "Month Pillar",
            body:
              "The Month Pillar is one of the most important pillars in professional analysis because it reveals the seasonal strength of the chart. It often relates to career rhythm, adulthood responsibilities, practical life pressure, and the environment that shapes a person's social role and working life.",
          },
          {
            title: "Day Pillar",
            body:
              "The Day Pillar contains the Day Master, which is treated as the center of selfhood in BaZi. This pillar is essential for understanding personality, emotional style, close relationships, and how the individual experiences themselves from the inside. It is usually the most intimate pillar in the whole chart.",
          },
          {
            title: "Hour Pillar",
            body:
              "The Hour Pillar often points toward future potential, later-life development, inner aspirations, creative output, and the part of the self that becomes more visible over time. In some readings it is also used to discuss children, legacy, or what a person gradually grows into.",
          },
        ],
      },
      {
        id: "bazi-vs-western",
        type: "comparison",
        title: "BaZi vs Western Astrology",
        leftTitle: "The Solar Path (BaZi)",
        leftCopy:
          "BaZi is fundamentally concerned with energetic timing. It reads how the Five Elements move through seasonal structure, how the day master is supported or challenged, and how life develops through cycles of luck and environment. It is especially strong at showing pattern, structure, and long-term timing.",
        rightTitle: "The Planetary Map (Western)",
        rightCopy:
          "Western astrology is planetary and zodiac-based. It is especially effective for psychological description, symbolic identity, inner narrative, and the language of personal archetypes. It often feels immediately familiar because it names personality traits in a very direct way.",
        tableRows: [
          ["Core input", "Birth date and exact birth time", "Birth date, time, and planetary positions"],
          ["Main language", "Five Elements, stems, branches, seasonal Qi", "Signs, planets, houses, aspects"],
          ["Primary strength", "Structure, timing, life pattern, energetic balance", "Psychology, symbolic identity, inner narrative"],
          ["Reading style", "Contextual and relational", "Archetypal and expressive"],
        ],
        note:
          "Neither system is 'better' in absolute terms. They answer different questions. BaZi is often stronger at pattern and timing; Western astrology is often stronger at psychological storytelling.",
      },
      {
        id: "day-master",
        type: "centerFeature",
        title: "The Day Master: Your True Self",
        paragraphs: [
          "In classical BaZi, the Day Master is the center of the chart. It is the Heavenly Stem of the Day Pillar, and it acts as the reference point from which all other symbols are interpreted. Without identifying the day master correctly, the rest of the chart cannot be judged with precision.",
          "This is why many professional readings begin by asking a fundamental question: is the day master strong, weak, supported, pressured, rooted, exposed, or transformed by the surrounding chart? The answer changes how ten gods are interpreted, how favorable elements are chosen, and how later luck cycles are understood.",
          "A beginner may think the day master is simply 'your element,' but that is only the beginning. A Wood day master in spring behaves differently from a Wood day master in autumn. A Metal day master supported by Earth reads differently from a Metal day master attacked by Fire. The day master is the sovereign of the chart, but it is never interpreted in isolation.",
        ],
        chips: ["Soul Core", "True Nature", "Life Anchor", "Interpretive Center"],
      },
      {
        id: "moon-signs",
        type: "imageReverse",
        title: "The Moon Sign and Emotional Life",
        accent: "Inner Climate",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCdhGmOkEyWWFce1BRw6QcC1rrGy7U_BQkO9yC2yUIoNCRdaBuuJOyXsVmrG6moeZVQuqJ41xAlLlhGL2NhsIiSXK_k-SHxY6T4ih1h-wcwktzxpKd_1P7n0p1-g5zStg1owdvxfvMaHVSXIqfiQXhVz2RvlSxibVDMp9Xlhgje8K2GQfBhDuDbIKn0UufncuO-6Twitwvff2RFQAQ29xCoXkpv14ZZIxWKHskteAE6K7qM6hUeCd98e4E22EUQEfLNRVABHWnmFfA",
        paragraphs: [
          "If BaZi provides the structural framework of a life, the Moon sign in Western astrology often helps describe the emotional atmosphere inside that structure. It is associated with instinctive reactions, emotional needs, safety patterns, and the places a person returns to when life becomes too loud.",
          "This is why many modern hybrid readers like to compare BaZi and the Moon sign together. BaZi can show whether the chart is naturally dry or damp, hot or cold, stable or unstable; the Moon sign can help describe how that energetic weather is experienced psychologically. One system gives structural conditions, the other gives emotional texture.",
          "For international users especially, this bridge is useful. A person may understand their Moon sign quickly because it feels intimate and familiar, and then use that recognition as a doorway into the more layered language of Chinese metaphysics.",
        ],
      },
      {
        id: "five-elements",
        type: "elements",
        title: "The Five Elemental Archetypes",
        intro:
          "The Five Elements are not literal substances. They are symbolic modes of motion and relationship. Each one describes a way energy grows, expresses, stabilizes, sharpens, or flows. In professional reading, the goal is not to ask which element sounds nicest, but to understand which ones are abundant, missing, excessive, or supportive in a specific chart.",
        elements: [
          ["Wood", "nature", "#4caf50", "Wood represents growth, planning, direction, and upward momentum. In personality it can look like generosity, aspiration, and the need to keep developing. When imbalanced, it may become frustration, impatience, or rigid insistence on a fixed direction."],
          ["Fire", "local_fire_department", "#f44336", "Fire represents expression, warmth, visibility, enthusiasm, and the urge to radiate outward. In balanced form it brings charisma and clarity. In excess it may become agitation, drama, or burnout; in deficiency it can show up as low vitality or difficulty sustaining passion."],
          ["Earth", "landscape", "#ffc107", "Earth represents containment, stability, nourishment, reliability, and the ability to hold things together. It often appears as patience and practicality. Too much Earth can become heaviness or stagnation; too little can make life feel ungrounded or unsupported."],
          ["Metal", "architecture", "#e9c349", "Metal represents structure, discipline, discernment, standards, and boundary-making. It helps define what is essential and what should be cut away. In balance it gives integrity and precision. In imbalance it can become rigidity, harshness, or excessive control."],
          ["Water", "tsunami", "#2196f3", "Water represents adaptability, intuition, depth, strategy, and movement through hidden channels. In balance it brings wisdom and subtle intelligence. In excess it may feel like drift or over-sensitivity; in deficiency it can show up as fear, dryness, or reduced flexibility."],
        ],
      },
      {
        id: "practice",
        type: "wideEssay",
        title: "How a Professional Reader Actually Interprets a Chart",
        paragraphs: [
          "A professional BaZi reading is not made by listing meanings symbol by symbol. A serious reader first determines the season of birth, the condition of the day master, the relationship between visible stems and hidden stems, and whether the chart is asking to be balanced, strengthened, warmed, cooled, dried, or regulated in some other way.",
          "After that, the reader examines the Ten Gods, combinations, clashes, punishments, branch relationships, and larger timing cycles. This is why two people with the same visible element may live very different lives. Context decides meaning.",
          "The most useful beginner mindset is therefore not 'What label am I?' but 'What is my chart trying to do?' Once you begin reading BaZi as a living structure instead of a personality quiz, the system becomes much deeper and much more coherent.",
        ],
      },
    ],
  },
  zh: {
    navCalculator: "Home",
    navKnowledge: "Knowledge",
    navPremium: "深度报告",
    navGenerate: "生成命盘",
    title: "Knowledge",
    subtitle: "命理手稿：拆解星象与五行背后的语言结构。",
    disclaimer: "此结果仅供娱乐。",
    ctaTitle: "准备好解锁你的个人命盘手稿了吗？",
    ctaCopy: "把你的八字命盘与西方星座人格放进同一套体验里查看。",
    ctaButton: "生成你的命盘",
    footerContact: "For any information, please contact: anqid02@gmail.com",
    footerCopy: "© 2026 BaziChart. 星图已启。",
    sections: [
      {
        id: "intro",
        type: "imageSplit",
        ghost: "01",
        title: "什么是八字？",
        accent: "入门指南",
        imageLabel: "四柱结构",
        imageSub: "年、月、日、时",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCRvKCr_5iNgiiqiqDVFueyl2xhQO4G4lSZSfTEp6VAf_I2PxwlTHuVbzL7K5JSNEvdJXRVFLo24Uft8OwTYxO4stQmlV_8biKNbm7JXLGUA-MEcRGa5Z2LCzPeWbnFRIqV_HWfcN__u1PSNlHbRMUv7Qq2W18L5BT0eVf2giax-R95Ili0FRdQqs9lNkWBVq6X18d8d5pu_UceiUfXtcsgMbs7pOzCrJCZK73sbwdZ9ZzDtFoD8miKbEZky5SpI3nq6wV2wccKYgU",
        paragraphs: [
          "八字，也就是“八个字”，本质上是一套把出生时间转化为象征结构的中国命理系统。它以年、月、日、时四个时间点为基础，每一柱都由天干和地支组成，因此合起来形成八个核心字符。",
          "真正专业的八字阅读，并不是把它当成一句“命运结论”，而是把它当成一套结构语言。它用来分析一个人的性格节奏、能量偏向、优势来源、失衡位置，以及在人生不同阶段更容易遇到的主题。",
          "八字之所以复杂，是因为任何一个元素都不能脱离上下文单独理解。季节、月令、藏干、干支关系、日主强弱，都会影响判断方向。所以专业解读的核心不是背关键词，而是读结构。",
        ],
      },
      {
        id: "pillars",
        type: "detailGrid",
        title: "四柱命运结构",
        intro:
          "四柱是整个八字分析的骨架。每一柱都代表人生中的一个层面，真正专业的判断不是把它们拆开看，而是观察它们如何彼此支持、牵制、呼应或冲突。",
        cards: [
          {
            title: "年柱",
            body:
              "年柱常被用来理解一个人的原生背景、家族氛围、早年环境与社会位置感。它也常常代表外在社会首先能读到的那层信息，所以与家族印记、出身氛围和早期认同有很强关系。",
          },
          {
            title: "月柱",
            body:
              "月柱在专业判断里极其重要，因为它决定季节，也就是日主所处的能量环境。它通常与成年之后的事业节奏、现实压力、资源条件和社会角色有关，是判断强弱与用神的重要切口。",
          },
          {
            title: "日柱",
            body:
              "日柱最贴近自我核心，因为其中包含日主。很多关于人格、关系模式、伴侣互动、内在驱动力的分析，都必须从日柱出发。它是最“像自己”的那一柱，也是专业阅读的中心。",
          },
          {
            title: "时柱",
            body:
              "时柱常被理解为后期展开、未来潜能、创造力输出、生命后半段逐渐浮现出来的方向。有些流派还会用它讨论子女、晚景或更深层的志向与潜藏能力。",
          },
        ],
      },
      {
        id: "bazi-vs-western",
        type: "comparison",
        title: "八字 vs 西方占星",
        leftTitle: "太阳路径（八字）",
        leftCopy:
          "八字本质上更强调时间、季节与能量条件。它关注五行如何在时间中流动、日主是被支持还是被压制、人生会在什么样的大运节奏里展开。它最擅长的是结构、时机和长周期模式。",
        rightTitle: "行星地图（西方）",
        rightCopy:
          "西方占星以行星、星座、宫位和相位为核心，尤其擅长解释心理原型、人格叙事、内在驱力和个人故事感。它会让人更快理解“我像什么样的人”，因为表达更直观。",
        tableRows: [
          ["核心输入", "出生日期与出生时刻", "出生时间与行星位置"],
          ["主要语言", "五行、天干地支、季节气", "星座、行星、宫位、相位"],
          ["主要优势", "结构、时机、人生模式、能量平衡", "心理描述、人格原型、叙事感"],
          ["阅读方式", "重关系与上下文", "重象征与心理表达"],
        ],
        note:
          "这两套系统并不是互相替代，而是回答不同问题。八字更强在结构与时机，西方占星更强在心理与叙事。",
      },
      {
        id: "day-master",
        type: "centerFeature",
        title: "日主：真正的自我核心",
        paragraphs: [
          "在八字里，日主是判断的中心。它是日柱天干，也就是整个命盘最重要的参照点。没有先判断日主，后面的十神、喜用、格局方向都很难准确成立。",
          "所以专业命理师真正会先问的是：这个日主强还是弱？有根还是无根？被扶持还是被克泄？所处季节是帮它还是压它？这些问题会直接改变整张命盘的解释逻辑。",
          "初学者常把日主理解成“你的元素”，这当然没错，但远远不够。春天的木日主与秋天的木日主完全不同，被火照亮的金日主与被土埋住的金日主也完全不同。日主是中心，但它永远要放回整张命盘里去读。",
        ],
        chips: ["命盘核心", "人格中心", "判断起点", "真正自我"],
      },
      {
        id: "moon-signs",
        type: "imageReverse",
        title: "月亮星座与情绪世界",
        accent: "内在气候",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCdhGmOkEyWWFce1BRw6QcC1rrGy7U_BQkO9yC2yUIoNCRdaBuuJOyXsVmrG6moeZVQuqJ41xAlLlhGL2NhsIiSXK_k-SHxY6T4ih1h-wcwktzxpKd_1P7n0p1-g5zStg1owdvxfvMaHVSXIqfiQXhVz2RvlSxibVDMp9Xlhgje8K2GQfBhDuDbIKn0UufncuO-6Twitwvff2RFQAQ29xCoXkpv14ZZIxWKHskteAE6K7qM6hUeCd98e4E22EUQEfLNRVABHWnmFfA",
        paragraphs: [
          "如果说八字更擅长解释一个人命盘的结构，那么西方占星里的月亮星座则特别适合用来理解一个人的情绪气候。它与安全感、情绪需求、直觉反应和下意识的习惯模式有很强关系。",
          "所以很多现代混合式阅读，会把八字与月亮星座结合来看。八字能够告诉我们命盘偏冷还是偏热、偏干还是偏湿、结构稳定还是流动，而月亮星座则帮助解释这种结构在心理层面是如何被感受到的。",
          "对于国际用户来说，这种桥接尤其有帮助。很多人先通过月亮星座理解自己的情绪模式，再借此进入八字更深、更复杂的结构语言，会更容易建立理解。",
        ],
      },
      {
        id: "five-elements",
        type: "elements",
        title: "五行原型",
        intro:
          "五行并不是自然科学意义上的五种物质，而是五种不同的能量运行方式。真正专业的五行判断，从来不是问哪一行听起来最好，而是看哪一行过强、过弱、失衡或最能支持日主。",
        elements: [
          ["Wood", "nature", "#4caf50", "木代表生长、延展、规划与向上之力。落在人格层面，它常表现为愿景、理想、推动力和发展冲动。失衡时则可能表现为急躁、拗、挫败感强。"],
          ["Fire", "local_fire_department", "#f44336", "火代表表达、热度、可见性与向外放射的能量。平衡时它带来魅力、行动力和感染力；过强时容易躁、急、耗，过弱时则可能表现为动力不足或热情难以持续。"],
          ["Earth", "landscape", "#ffc107", "土代表承载、稳定、支持、现实感与整合能力。平衡时它让人稳、能接住事，也能让关系与生活更有根基；过强时会变得重、慢、停滞，过弱时则容易缺乏支持感。"],
          ["Metal", "architecture", "#e9c349", "金代表结构、边界、标准、判断与收敛。平衡时它带来清晰、效率和原则感；失衡时可能表现为过硬、过度控制、过于批判或弹性不足。"],
          ["Water", "tsunami", "#2196f3", "水代表流动、直觉、深度、策略与适应。平衡时它让人敏锐、有洞察，也更懂得顺势而为；失衡时可能表现为漂浮、回避、焦虑或缺乏稳定方向。"],
        ],
      },
      {
        id: "practice",
        type: "wideEssay",
        title: "专业命理师到底如何读一张命盘？",
        paragraphs: [
          "真正专业的八字阅读，不是把每个字拆开逐个贴标签，而是先判断季节、月令、日主状态，再观察天干地支之间的关系、藏干、十神、合冲刑害与大运背景。",
          "也正因为如此，两个看起来元素相似的人，人生轨迹可以完全不同。真正决定差异的，是上下文，是结构，是每个符号之间在具体命盘里的关系。",
          "所以对初学者来说，最好的问题往往不是“我是什么型”，而是“我的命盘正在做什么”。当你开始把八字看成一套活的结构语言，而不是一个快速人格测试，它就会真正变得清晰而深刻。",
        ],
      },
    ],
  },
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function renderImageSplit(section) {
  return `
    <section class="relative group" id="${section.id}">
      <div class="pointer-events-none absolute -left-8 -top-12 select-none font-headline text-[10rem] font-bold text-white/[0.02] xl:-left-12 xl:text-[12rem]">${section.ghost || ""}</div>
      <div class="flex flex-col items-center gap-12 md:flex-row md:gap-20">
        <div class="flex-1">
          <h2 class="mb-8 font-headline text-4xl text-text">${section.title} <span class="italic text-primary">${section.accent}</span></h2>
          <div class="space-y-6 text-lg leading-relaxed text-muted">
            ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </div>
        </div>
        <div class="relative h-96 w-full shrink-0 overflow-hidden rounded-xl bg-low md:w-96">
          <img alt="" class="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:grayscale-0" src="${section.imageUrl}" />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div class="absolute bottom-6 left-6 right-6">
            <p class="text-[10px] font-bold uppercase tracking-widest text-primary">${section.imageLabel}</p>
            <p class="mt-1 text-xs italic text-secondary/80">${section.imageSub}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDetailGrid(section) {
  return `
    <section class="space-y-12" id="${section.id}">
      <div class="max-w-4xl">
        <h2 class="mb-6 font-headline text-4xl text-text">${section.title}</h2>
        <p class="text-lg leading-relaxed text-muted">${section.intro}</p>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        ${section.cards
          .map(
            (card) => `
              <article class="rounded-xl border border-white/5 bg-low p-8 transition-colors duration-300 hover:bg-panel">
                <h3 class="mb-4 font-headline text-2xl italic text-primary">${card.title}</h3>
                <p class="leading-relaxed text-muted">${card.body}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderComparison(section, lang) {
  return `
    <section class="space-y-12" id="${section.id}">
      <h2 class="mb-16 text-center font-headline text-4xl italic text-text">${section.title}</h2>
      <div class="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/5 md:grid-cols-2">
        <div class="flex flex-col justify-between bg-low p-12 transition-colors duration-300 hover:bg-panel">
          <div>
            <span class="material-symbols-outlined mb-6 text-primary" style="font-size:40px;">flare</span>
            <h3 class="mb-4 font-headline text-2xl text-primary">${section.leftTitle}</h3>
            <p class="leading-relaxed text-muted">${section.leftCopy}</p>
          </div>
          <div class="mt-12 border-t border-white/5 pt-6">
            <span class="text-[10px] uppercase tracking-[0.2rem] text-secondary/40">${lang === "zh" ? "结构与时机" : "Structure & Timing"}</span>
          </div>
        </div>
        <div class="flex flex-col justify-between bg-low p-12 transition-colors duration-300 hover:bg-panel">
          <div>
            <span class="material-symbols-outlined mb-6 text-tertiary" style="font-size:40px;">star</span>
            <h3 class="mb-4 font-headline text-2xl text-tertiary">${section.rightTitle}</h3>
            <p class="leading-relaxed text-muted">${section.rightCopy}</p>
          </div>
          <div class="mt-12 border-t border-white/5 pt-6">
            <span class="text-[10px] uppercase tracking-[0.2rem] text-secondary/40">${lang === "zh" ? "心理与原型" : "Psychology & Archetype"}</span>
          </div>
        </div>
      </div>
      <div class="overflow-hidden rounded-xl border border-white/5 bg-low">
        <div class="custom-scroll overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-white/5">
                ${(lang === "zh" ? ["主题", "八字", "西方占星"] : ["Topic", "BaZi", "Western Astrology"])
                  .map((label) => `<th class="px-6 py-4 text-left text-[10px] uppercase tracking-[0.2rem] text-secondary/50">${label}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${section.tableRows
                .map(
                  (row) => `
                    <tr class="border-b border-white/5 last:border-b-0">
                      ${row.map((cell) => `<td class="px-6 py-5 text-sm leading-relaxed text-muted">${cell}</td>`).join("")}
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <p class="text-center text-base italic text-secondary">${section.note}</p>
    </section>
  `;
}

function renderCenterFeature(section) {
  return `
    <section class="relative overflow-hidden rounded-2xl bg-[#0c0e17] px-10 py-24 text-center md:px-16" id="${section.id}">
      <div class="pointer-events-none absolute inset-0 opacity-10">
        <img
          alt=""
          class="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3K6PeREVqZfhKiFViD4on-0whjsUoAZ61Cyrk_kmjNyCmS554iryK0ikFJNgseI3Ut4EsDNTQgiG-ebGrmXRXG9C3kFIoskSDHlHbOlk2MewcMf6NZYFTsSVpkUvzrBq_YqcTIbbF5CNiwvbOo4C18Qvx0zx820kaTpLxqCkwiLOIbYIpXMAmPrHYGRWz5YTID86sw5eJfHmIsKsqsmlHzy5QJzTMOI1mIaH-bY7A_ZBBG2D6Ed1KK75J0k5MJc_RNj522jbeoe8"
        />
      </div>
      <div class="relative z-10 mx-auto max-w-4xl">
        <h2 class="mb-8 font-headline text-5xl text-text">${section.title}</h2>
        <div class="space-y-6 text-xl leading-relaxed text-muted">
          ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          ${section.chips.map((chip) => `<span class="rounded-full bg-tertiary/15 px-6 py-2 text-xs uppercase tracking-wider text-tertiary">${chip}</span>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderImageReverse(section) {
  return `
    <section class="flex flex-col items-center gap-16 md:flex-row-reverse md:gap-20" id="${section.id}">
      <div class="flex-1">
        <h2 class="mb-8 font-headline text-4xl text-text">${section.title} <span class="italic text-tertiary">${section.accent}</span></h2>
        <div class="space-y-6 text-lg leading-relaxed text-muted">
          ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </div>
      <div class="relative h-72 w-72 shrink-0 rounded-full border border-secondary/20 p-3">
        <div class="h-full w-full overflow-hidden rounded-full">
          <img alt="" class="h-full w-full object-cover opacity-60 transition-transform duration-[2000ms] hover:scale-110" src="${section.imageUrl}" />
        </div>
        <div class="absolute -right-4 -top-4 rounded-full border border-secondary/10 bg-background p-4 shadow-lg">
          <span class="material-symbols-outlined scale-125 text-secondary" style="font-variation-settings:'FILL' 1;">dark_mode</span>
        </div>
      </div>
    </section>
  `;
}

function renderElements(section) {
  return `
    <section class="space-y-16" id="${section.id}">
      <div class="text-center">
        <h2 class="font-headline text-4xl italic text-text">${section.title}</h2>
        <div class="mx-auto mt-6 h-1 w-24 bg-primary"></div>
        <p class="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-muted">${section.intro}</p>
      </div>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
        ${section.elements
          .map(
            ([name, icon, color, copy]) => `
              <div class="group rounded-xl border-b-4 border-transparent bg-low p-8 text-center transition-all hover:bg-panel" style="border-color:${color}20;">
                <span class="material-symbols-outlined mb-4 text-4xl" style="color:${color}">${icon}</span>
                <h4 class="mb-3 font-headline text-xl italic">${name}</h4>
                <p class="text-sm leading-relaxed text-muted">${copy}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderWideEssay(section) {
  return `
    <section class="rounded-2xl border border-white/5 bg-low p-10 md:p-14" id="${section.id}">
      <h2 class="mb-8 font-headline text-4xl text-text">${section.title}</h2>
      <div class="space-y-6 text-lg leading-relaxed text-muted">
        ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
    </section>
  `;
}

function renderSection(section, lang) {
  if (section.type === "imageSplit") return renderImageSplit(section);
  if (section.type === "detailGrid") return renderDetailGrid(section);
  if (section.type === "comparison") return renderComparison(section, lang);
  if (section.type === "centerFeature") return renderCenterFeature(section);
  if (section.type === "imageReverse") return renderImageReverse(section);
  if (section.type === "elements") return renderElements(section);
  return renderWideEssay(section);
}

function renderKnowledge(lang) {
  const t = translations[lang];
  setText("nav-calculator", t.navCalculator);
  setText("nav-knowledge", t.navKnowledge);
  setText("nav-generate", t.navGenerate);
  setText("knowledge-title", t.title);
  setText("knowledge-subtitle", t.subtitle);
  setText("knowledge-disclaimer", t.disclaimer);
  setText("cta-title", t.ctaTitle);
  setText("cta-copy", t.ctaCopy);
  setText("cta-button", t.ctaButton);
  setText("footer-contact", t.footerContact);
  setText("footer-copy", t.footerCopy);

  sectionsRoot.innerHTML = t.sections.map((section) => renderSection(section, lang)).join("");

  if (navGenerateLink) {
    const birthInfo = window.BaziChart.parseBirthInfoFromUrl();
    navGenerateLink.href = birthInfo
      ? `./result.html?${new URLSearchParams({
          date: birthInfo.date,
          time: birthInfo.time,
          location: birthInfo.location,
          lang,
        }).toString()}`
      : "./index.html#calculator";
  }
}

window.BaziChart.bindLanguageSwitcher(renderKnowledge);
renderKnowledge(window.BaziChart.getLanguage());
