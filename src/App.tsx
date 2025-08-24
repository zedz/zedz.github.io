
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Code2, Database, PenTool, Languages, Wrench, Rocket,
  GraduationCap, Mail, Globe, ArrowDown, ArrowUp, Download, MonitorCog, FileText,
  type LucideIcon
} from "lucide-react";

type Lang = "zh" | "en";

type Experience = {
  company: string;
  title: string;
  location?: string;
  period: string;
  bullets: string[];
};

type Project = {
  name: string;
  period?: string;
  bullets: string[];
  tags?: string[];
};

type Copy = {
  name: string;
  role: string;
  tagline: string;
  contacts: { label: string; value: string; href?: string; icon: LucideIcon }[];
  sections: { id: string; label: string }[];
  intro: string[];
  skills: { group: string; items: string[]; icon: LucideIcon }[];
  experience: Experience[];
  projects: Project[];
  edu: { school: string; degree: string; period: string; bullets?: string[] }[];
  certs: string[];
  extras?: string[];
};

// Email obfuscation (weak but deters simple scrapers)
function obfuscateEmail(e: string) {
  return e.replace(/@/g, " [at] ").replace(/\./g, " [dot] ");
}

export default function InteractiveResume() {
  const [lang, setLang] = useState<Lang>("zh");
  const [theme, setTheme] = useState<"day" | "night">("day");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Data
  const copy: Record<Lang, Copy> = useMemo(() => ({
    zh: {
      name: "桓语 Zedz",
      role: "客户体验 / 运营 / 内容｜No‑Code & 自动化爱好者",
      tagline:
        "专业客服与商家运营背景，擅长文件与数据管理、AI 辅助内容与小程序搭建。能把复杂事物拆简单、落实到 SOP 并持续优化。",
      contacts: [
        { label: "Email", value: "jamiezzj@gmail.com", href: "mailto:jamiezzj@gmail.com", icon: Mail },
        { label: "WeChat", value: "邮件/私信后提供", icon: Globe },
        { label: "X", value: "@ZedzDrm", href: "https://x.com/ZedzDrm", icon: Globe },
        { label: "LinkedIn", value: "@ooojamieooo", href: "https://www.linkedin.com/in/ooojamieooo", icon: Globe },
        { label: "Location", value: "Changsha, China · Remote‑friendly", icon: Globe },
      ],
      sections: [
        { id: "about", label: "关卡 1：关于" },
        { id: "skills", label: "关卡 2：技能树" },
        { id: "exp", label: "关卡 3：经历" },
        { id: "projects", label: "关卡 4：项目" },
        { id: "edu", label: "关卡 5：教育 / 证书" },
        { id: "contact", label: "关卡 6：联系" },
      ],
      intro: [
        "● 专业客服能力，快速准确回答客户问题；偏条理型表达。",
        "● 长期负责文件管理与数据分析，能快速学习并熟练使用各类系统。",
        "● 办公软件、AI、作图与排版娴熟；良好的英文功底与编程思维。",
        "● 热爱分析，乐于沟通，耐心细心，具备责任感。",
        "● 爱好：视频剪辑 / 基于 SaaS 的小程序制作 / Web3 与自动化学习。",
      ],
      skills: [
        { group: "客户体验 & 运营", items: ["多平台客服（电话/微信/美团/小程序）","SOP 搭建与优化","自助空间运营（24h 棋牌馆）","库存/售货机/现场卫生管理","活动与内容联动引流"], icon: Briefcase },
        { group: "内容 & 设计", items: ["图文/短视频策划与剪辑（小红书/抖音）","品牌物料与页面排版","摄影与基础修图","文案与双语写作"], icon: PenTool },
        { group: "数据 & 工具", items: ["Excel/WPS 数据分析与报表","Notion/Obsidian 结构化知识库","n8n/自动化流程（基础）","Docker/Portainer 入门","JSON/CSV 数据处理"], icon: Database },
        { group: "产品 & 技术", items: ["微信小程序（页面搭建/链接闭环）","前端审美与基本 UI 设计","Java 后端早期经验（GWT/GXT）","Python 基础 + Pandas 入门","Web3/DeFi 基础与监控原型"], icon: Code2 },
        { group: "语言", items: ["中文（母语）","英文（流利，雅思 6.5）"], icon: Languages },
      ],
      experience: [
        { company: "欢寓 SPACE（长沙）", title: "商家运营 / 专业客服", location: "24h 自助棋牌馆（7 间包房 / 方和牌桌 / 新风系统）", period: "2022.09 – 至今",
          bullets: ["负责日常运营：客服接待（电话/微信）、房间使用指南编撰、卫生与排班、售货机补货与结算","搭建线上阵地：美团与小程序“装修”、规则页与预约流程优化，降低咨询成本","内容引流：策划 #青年退休生活 系列与《来打牌吧》吸客内容方向，结合场馆卖点展示"] },
        { company: "合一美仓（小程序）", title: "制作人与运营者", period: "2022 – 至今",
          bullets: ["负责页面搭建与 UI 美化，完成商品图拍摄与编辑，设计信息架构与下单闭环","结合 B 端仓配与 C 端体验，探索“美业绿仓”快闪/体验零售路径（概念验证阶段）"] },
        { company: "虾皮跨境电商（Shopee）", title: "跨境店铺运营", period: "2022.04 – 2022.08",
          bullets: ["The Light Choice（台湾站）、Bazzar+（墨西哥站）日常上新、页面与客服，了解跨境物流链路"] },
        { company: "杭州妮可杰米美甲工作室", title: "店长 / 运营", period: "2022.03 – 2022.08",
          bullets: ["预约与排班、业绩统计与发薪、人员激励与日常管理","拍摄剪辑抖音短视频并发布，维护门店线上曝光"] },
        { company: "欢寓工作室（软装顾问）", title: "软装顾问 / 销售", period: "2021.05 – 2022.02",
          bullets: ["奥体国际村项目：负责销售与落地，业绩约 26 万元，含 9 套软装与 4 套民宿代运营","奥莱金街入门项目：单套从选品、清单、采购到安装全流程落地","独立上线工作室小程序：案例展示与预约功能"] },
        { company: "长沙景谊化妆品有限公司（五分公司）", title: "客服专员 / 助理", period: "2018.03 – 2021.01",
          bullets: ["对外：对接厂家（打款、进货、折扣配送、资料整理），会务物料与场地筹备，差旅订票","对内：仓配开单/发货/维修，考勤与数据填报，经营数据支持与分析，新人产品知识培训"] },
        { company: "长沙景谊化妆品有限公司（企划部）", title: "电商运营 / 企划", period: "2017.04 – 2018.03",
          bullets: ["推动互联网转型：搭建官网、微店、淘宝与小程序；完成产品拍摄、页面与网店设计"] },
        { company: "武汉同和中控信息技术有限公司（EMR）", title: "初级程序员（Java / GWT）", period: "2014.01 – 2015.01",
          bullets: ["后台：医嘱/套餐复制与转换、草药套餐维护、打印与瓶签逻辑，Dubbo + Maven + JBoss","前台：GXT 医嘱核对与打印、住院医生站会诊/输血医嘱界面开发"] },
        { company: "长沙景谊化妆品有限公司", title: "助理 / 前台 / 行政", period: "2013.01 – 2014.01",
          bullets: ["财务文档整理、前台接待与基础销售支持"] },
        { company: "BlackBerry 制造运营部（实习）", title: "制造运营助理（行政）", period: "2011.01 – 2012.01 · 滑铁卢，加拿大",
          bullets: ["例会记录、生产任务与指标汇总（Word/Excel/PPT），生产线公告展示","维护简单 PHP 数据库，撰写工具/流程使用说明"] },
      ],
      projects: [
        { name: "欢寓 SPACE · 运营系统化", period: "2022 – 至今",
          bullets: ["编写《房间使用指南》与清洁 SOP，显著降低一问一答成本","美团/小程序页面结构优化，统一风格与 FAQ","策划《来打牌吧》吸客内容：环境、流程、玩法、顾客故事等子系列"], tags: ["运营","SOP","内容引流"] },
        { name: "合一美仓 · 小程序", bullets: ["独立完成信息架构、页面搭建、UI 美化与商品图拍摄","对接仓配，完成下单与售后流程闭环（概念验证）"], tags: ["小程序","UI","摄影"] },
        { name: "内容账号矩阵（小红书）", bullets: ["Jamiiieee：#青年退休生活 系列；Do‑Re‑Mi：德文卷毛猫新手养猫日常与测评","截至 2025‑04：主号约 1.3k 关注、2.6w 赞藏（用于验证内容方向与引流路径）"], tags: ["内容运营","短视频","图文"] },
        { name: "DeFi 风险监控 Agent（原型）", bullets: ["基于 Aave v3（Arbitrum）指标设置触发：TVL 24h 变化、清算额、USDC 借贷 APR","以 JSON 规则 + 定时检查（思路）输出建议动作（补保证金/偿还部分借款等）"], tags: ["Web3","监控","自动化"] },
        { name: "Docker Homelab & n8n 自动化（入门）", bullets: ["装机与虚拟化：VMware + Docker + Portainer；优先部署 Firefly III（个人财务）","目录规范化：D:/NAS_Data/docker_compose | volumes | backup；.env 统一配置"], tags: ["Docker","自动化","DevOps 入门"] },
        { name: "Obsidian 笔记体系『The Innerverse｜第二文本』", bullets: ["中文正文 + 英文标签/大目录；结合 Dataview/Templater/Tasks/Calendar 等插件","目标：知识沉淀与内容再利用，支持脚本化检索与生成"], tags: ["知识管理","模板"] },
        { name: "虚拟资源便利店（试运营）", bullets: ["搭建多行业模板/资料/课程杂货铺，探索内容产品化与分发效率"], tags: ["电商","模板","内容产品"] },
      ],
      edu: [{ school: "Simon Fraser University（加拿大）", degree: "本科 · Business（MIS）", period: "2009 – 2012" }],
      certs: ["雅思 6.5","Java 开发培训（达内 · 2014.01–03）"],
      extras: ["Web3 共学项目获优秀（内容与术语理解）","爱猫人士 · 德文卷毛猫 Do‑Re‑Mi 🐾"],
    },
    en: {
      name: "Zedz",
      role: "Customer Experience & Operations · Content · No‑Code / Automation",
      tagline:
        "CX/ops generalist with strong documentation and data hygiene. Builds lean workflows, no‑code mini‑apps, and content funnels that reduce support load.",
      contacts: [
        { label: "Email", value: "jamiezzj@gmail.com", href: "mailto:jamiezzj@gmail.com", icon: Mail },
        { label: "WeChat", value: "By request via email/DM", icon: Globe },
        { label: "X", value: "@ZedzDrm", href: "https://x.com/ZedzDrm", icon: Globe },
        { label: "LinkedIn", value: "@ooojamieooo", href: "https://www.linkedin.com/in/ooojamieooo", icon: Globe },
        { label: "Location", value: "Changsha, China · Remote‑friendly", icon: Globe },
      ],
      sections: [
        { id: "about", label: "Level 1: About" },
        { id: "skills", label: "Level 2: Skill Tree" },
        { id: "exp", label: "Level 3: Experience" },
        { id: "projects", label: "Level 4: Projects" },
        { id: "edu", label: "Level 5: Education & Certs" },
        { id: "contact", label: "Level 6: Contact" },
      ],
      intro: [
        "● CX specialist: fast, accurate answers with structured communication.",
        "● Files & data: spreadsheets, reporting, and SOP documentation.",
        "● Tools: office suite, AI‑assisted design/layout & writing.",
        "● Curious, patient, responsible; programming mindset.",
        "● Hobbies: video editing, SaaS mini‑app building, Web3/automation.",
      ],
      skills: [
        { group: "Customer Experience & Ops", items: ["Multi‑channel support (phone/WeChat/Meituan/mini‑app)","SOP creation & optimization","Self‑service venue ops (24h board‑game/mahjong)","Inventory/vending/cleanliness","Content‑driven acquisition"], icon: Briefcase },
        { group: "Content & Design", items: ["Copy + bilingual writing","Image/video: planning, shooting, editing","Brand materials & page layout","Photography & retouching"], icon: PenTool },
        { group: "Data & Tools", items: ["Excel/WPS analytics","Notion/Obsidian knowledge systems","n8n automations (basic)","Docker/Portainer (intro)","JSON/CSV wrangling"], icon: Database },
        { group: "Product & Tech", items: ["WeChat mini‑apps (pages/flow)","UI taste & basic design","Early Java backend (GWT/GXT)","Python basics + Pandas","Web3/DeFi basics & monitoring prototype"], icon: Code2 },
        { group: "Languages", items: ["Chinese (native)","English (IELTS 6.5)"], icon: Languages },
      ],
      experience: [
        { company: "Huanyu SPACE (Changsha)", title: "Ops / Customer Success", location: "24h self‑service mahjong venue (7 rooms, new‑air system)", period: "Sep 2022 – Present",
          bullets: ["Daily ops: CX via phone/WeChat, house manual, cleaning rota, vending restock/settlement","Online presence: Meituan & mini‑app structure and rules/FAQ to reduce inquiries","Content funnel: #YoungRetirement life series and 'Come Play Mahjong' posts"] },
        { company: "HeYi Beauty Warehouse · Mini‑app", title: "Maker & Operator", period: "2022 – Present",
          bullets: ["Built info architecture & pages, UI polish, product photography","Explored B2B warehouse × B2C pop‑up retail (POC)"] },
        { company: "Shopee Cross‑border", title: "Store Operator", period: "Apr 2022 – Aug 2022",
          bullets: ["Taiwan (The Light Choice) & Mexico (Bazzar+) listings, page ops, and support"] },
        { company: "Nico & Jamie Nail Studio (Hangzhou)", title: "Store Manager", period: "Mar 2022 – Aug 2022",
          bullets: ["Scheduling, payroll & KPI tracking; team motivation","Shot/edited TikTok (Douyin) shorts for exposure"] },
        { company: "Huanyu Studio (Soft‑furnishing)", title: "Consultant / Sales", period: "May 2021 – Feb 2022",
          bullets: ["Olympic Village project: ~¥260k sales, 9 furnishing sets + 4 Airbnb mgmt","Outlet Street starter project: end‑to‑end from sourcing to install","Launched studio mini‑app with cases & booking"] },
        { company: "Changsha Jingyi Cosmetics (Branch 5)", title: "CX Specialist / Assistant", period: "Mar 2018 – Jan 2021",
          bullets: ["External: vendor payments, inbound/outbound, discount logistics, events & venue; travel booking","Internal: warehouse tickets/shipping/repairs, attendance & forms, analytics & training"] },
        { company: "Changsha Jingyi Cosmetics · Planning Dept.", title: "E‑commerce Ops / Planning", period: "Apr 2017 – Mar 2018",
          bullets: ["Drove online shift: website, Weidian/Taobao, and mini‑app; product shoots and page/shop design"] },
        { company: "Wuhan Tonghe Zhongkong (EMR)", title: "Junior Developer (Java / GWT)", period: "Jan 2014 – Jan 2015",
          bullets: ["Backend: orders/packages conversion, herb packages, printing & labels (Dubbo/Maven/JBoss)","Frontend: GXT UIs for verification/printing, consult & transfusion order screens"] },
        { company: "Changsha Jingyi Cosmetics", title: "Assistant / Front Desk", period: "Jan 2013 – Jan 2014",
          bullets: ["Finance docs, reception, sales support"] },
        { company: "BlackBerry Manufacturing Ops (Intern)", title: "Admin Assistant", period: "Jan 2011 – Jan 2012 · Waterloo, Canada",
          bullets: ["Weekly meeting notes; production KPIs in Excel/PPT; line board displays","Maintained a small PHP DB; wrote mini user guides"] },
      ],
      projects: [
        { name: "Huanyu SPACE – Systemized Ops", period: "2022 – Present",
          bullets: ["Wrote room manual & cleaning SOPs to cut repetitive Q&A","Optimized Meituan/mini‑app structure with unified FAQ","Story‑based acquisition posts: environment/process/plays & customer stories"], tags: ["Ops","SOP","Content"] },
        { name: "HeYi Beauty Warehouse · Mini‑app", bullets: ["IA + UI + product photos; order & after‑sales flow (POC)"], tags: ["Mini‑app","UI","Photo"] },
        { name: "Content Matrix (RED)", bullets: ["Jamiiieee: Young‑Retirement series; Do‑Re‑Mi: Devon Rex newbie care & reviews","As of 2025‑04: ~1.3k followers, 26k saves/likes on main account"], tags: ["Content","Short‑form","Copy"] },
        { name: "DeFi Risk Monitor (Prototype)", bullets: ["Rules for Aave v3 (Arbitrum): TVL delta, liquidations, USDC APR","Planned JSON rules + scheduled checks + action hints"], tags: ["Web3","Monitoring","Automation"] },
        { name: "Docker Homelab & n8n (Intro)", bullets: ["VMware + Docker + Portainer; prioritized Firefly III","Normalized folders: D:/NAS_Data/docker_compose | volumes | backup; unified .env"], tags: ["Docker","Automation","DevOps"] },
        { name: "Obsidian System – The Innerverse", bullets: ["Chinese body text + EN tags; Dataview/Templater/Tasks"], tags: ["PKM","Templates"] },
        { name: "Virtual Resources Store (Pilot)", bullets: ["Templates/ebooks/courses across verticals"], tags: ["E‑commerce","Content"] },
      ],
      edu: [{ school: "Simon Fraser University (Canada)", degree: "BBA · Management Information Systems", period: "2009 – 2012" }],
      certs: ["IELTS 6.5","Java Training (Tedu, 2014.01–03)"],
      extras: ["Web3 study cohort · Excellence mention","Cat person · Devon Rex Do‑Re‑Mi 🐾"],
    },
  }), []);

  const t = copy[lang];

  // L3 Minimal View: only show Level 1 & 2 unless unlocked
  const params = new URLSearchParams(window.location.search);
  const isUnlocked = params.get('code') === 'zedz2025';
  const sectionsToRender = React.useMemo(
    () => (isUnlocked ? t.sections : t.sections.filter(s => s.id === 'about' || s.id === 'skills')),
    [isUnlocked, t]
  );

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  // scroll progress for avatar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? scrollTop / docH : 0;
      setProgress(p);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // themes
  const themeBg = theme === "day" ? "bg-gradient-to-b from-cyan-50 via-white to-amber-50" : "bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950";
  const themeText = theme === "day" ? "text-slate-800" : "text-slate-100";
  const cardBg = theme === "day" ? "bg-white/80" : "bg-slate-900/50";
  const cardBorder = theme === "day" ? "border-slate-200" : "border-slate-700";

  const downloadJSON = () => {
    const data = {
      name: t.name, role: t.role, tagline: t.tagline, contacts: t.contacts,
      skills: t.skills, experience: t.experience, projects: t.projects, education: t.edu,
      certifications: t.certs, extras: t.extras,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zedz-resume-${lang}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${themeBg} ${themeText} relative font-[ui-sans-serif]`}>
      <HUD
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        sections={sectionsToRender}
        progress={progress}
      />

      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Avatar progress={progress} theme={theme} />
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold leading-tight">{t.name}</h1>
            <p className="text-sm md:text-base opacity-80">{t.role}</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => window.print()} className="px-3 py-2 rounded-xl border hover:opacity-90 transition text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" /> {lang === "zh" ? "打印/保存 PDF" : "Print / Save PDF"}
            </button>
            <button onClick={downloadJSON} className="px-3 py-2 rounded-xl border hover:opacity-90 transition text-sm flex items-center gap-2">
              <Download className="w-4 h-4" /> JSON
            </button>
          </div>
        </div>
      </header>

      <main>
        {sectionsToRender.map((sec, i) => (
          <motion.section
            key={sec.id}
            id={sec.id}
            ref={(el) => (sectionRefs.current[i] = el)}
            className="py-16 md:py-24 scroll-mt-24"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="max-w-5xl mx-auto w-full px-4">
              <LevelBadge index={i} label={sec.label} theme={theme} />
              {sec.id === "about" && <About copy={t} cardBg={cardBg} cardBorder={cardBorder} />}
              {sec.id === "skills" && <Skills copy={t} cardBg={cardBg} cardBorder={cardBorder} />}
              {sec.id === "exp" && isUnlocked && <Experience copy={t} cardBg={cardBg} cardBorder={cardBorder} />}
              {sec.id === "projects" && isUnlocked && <Projects copy={t} cardBg={cardBg} cardBorder={cardBorder} />}
              {sec.id === "edu" && isUnlocked && <Education copy={t} cardBg={cardBg} cardBorder={cardBorder} lang={lang} />}
              {sec.id === "contact" && isUnlocked && <Contact copy={t} cardBg={cardBg} cardBorder={cardBorder} lang={lang} />}
            </div>
          </motion.section>
        ))}
      </main>

      <Footer />
      <style>{`
        @media print {
          header, .hud, .footer { display: none !important; }
          section { page-break-inside: avoid; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}

function HUD({
  lang, setLang, theme, setTheme, sections, progress,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: "day" | "night";
  setTheme: (t: "day" | "night") => void;
  sections: { id: string; label: string }[];
  progress: number;
}) {
  return (
    <div className="hud fixed right-3 bottom-3 z-40 flex flex-col items-end gap-2">
      <div className="rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur p-2 flex items-center gap-2">
        <button className="px-2 py-1 text-xs rounded-lg border" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
          {lang === "zh" ? "EN" : "中"}
        </button>
        <button className="px-2 py-1 text-xs rounded-lg border" onClick={() => setTheme(theme === "day" ? "night" : "day")}>
          {theme === "day" ? "🌙" : "☀️"}
        </button>
        <div className="w-28 h-2 rounded-full bg-slate-200/70 dark:bg-slate-700/70 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      </div>
      <div className="hidden md:flex rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur p-2 gap-1">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="text-xs px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/60">
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Avatar({ progress, theme }: { progress: number; theme: "day" | "night" }) {
  const x = progress * 40;
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner"
      style={{ background: theme === "day" ? "radial-gradient(circle at 30% 30%, #fff, #e0f2fe)" : "radial-gradient(circle at 30% 30%, #0f172a, #1e293b)" }}
      title="Zedz"
    >
      <span className="text-lg" role="img" aria-label="avatar">🧭</span>
    </motion.div>
  );
}

function LevelBadge({ index, label, theme }: { index: number; label: string; theme: "day" | "night" }) {
  return (
    <motion.div
      className="mb-6"
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${theme === "day" ? "bg-white/70 border-slate-200" : "bg-slate-900/50 border-slate-700"}`}>
        <Rocket className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
    </motion.div>
  );
}

function Card({ children, cardBg, cardBorder }: { children: React.ReactNode; cardBg: string; cardBorder: string }) {
  return <div className={`rounded-2xl ${cardBg} border ${cardBorder} shadow-sm p-5`}>{children}</div>;
}

function About({ copy, cardBg, cardBorder }: { copy: Copy; cardBg: string; cardBorder: string }) {
  return (
    <Card cardBg={cardBg} cardBorder={cardBorder}>
      <p className="text-base leading-7 opacity-90">{copy.tagline}</p>
      <ul className="mt-4 grid md:grid-cols-2 gap-2 list-disc pl-5">
        {copy.intro.map((line, i) => (<li key={i} className="leading-7">{line}</li>))}
      </ul>
      <div className="mt-5 grid md:grid-cols-3 gap-3">
        {copy.contacts.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <c.icon className="w-4 h-4 opacity-80" />
            {c.label === "Email"
              ? (<span>{obfuscateEmail(c.value)}</span>)
              : (c.href ? (<a href={c.href} className="underline underline-offset-4" target="_blank" rel="noreferrer">{c.value}</a>) : (<span>{c.value}</span>))
            }
          </div>
        ))}
      </div>
      <Hint className="mt-4" text={copy.sections[1]?.label} />
    </Card>
  );
}

function Skills({ copy, cardBg, cardBorder }: { copy: Copy; cardBg: string; cardBorder: string }) {
  const isUnlocked = new URLSearchParams(window.location.search).get('code') === 'zedz2025';
  return (
    <motion.div className="grid md:grid-cols-2 gap-4" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }} initial="hidden" whileInView="show" viewport={{ once:false, amount:0.2 }}>
      {copy.skills.map((s, i) => (
        <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}>
          <Card cardBg={cardBg} cardBorder={cardBorder}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-5 h-5" />
              <h3 className="font-semibold">{s.group}</h3>
            </div>
            <ul className="grid gap-2 list-disc pl-5">
              {s.items.map((it, j) => (<li key={j} className="leading-7">{it}</li>))}
            </ul>
          </Card>
        </motion.div>
      ))}
      {!isUnlocked && (
        <p className="mt-6 text-xs opacity-70 col-span-full">
          这是简化公开版（仅展示关卡 1 & 2）。如需查看完整履历，请邮件联系：jamiezzj [at] gmail [dot] com
        </p>
      )}
    </motion.div>
  );
}

function Experience({ copy, cardBg, cardBorder }: { copy: Copy; cardBg: string; cardBorder: string }) {
  return (
    <motion.div className="grid gap-4" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }} initial="hidden" whileInView="show" viewport={{ once:false, amount:0.2 }}>
      {copy.experience.map((e, i) => (
        <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}>
          <Card cardBg={cardBg} cardBorder={cardBorder}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{e.company}</h3>
              <div className="text-sm opacity-70">{e.period}</div>
            </div>
            <div className="text-sm opacity-90 mb-2">{e.title}{e.location ? ` ｜ ${e.location}` : ""}</div>
            <ul className="grid gap-2 list-disc pl-5">
              {e.bullets.map((b, j) => (<li key={j} className="leading-7">{b}</li>))}
            </ul>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Projects({ copy, cardBg, cardBorder }: { copy: Copy; cardBg: string; cardBorder: string }) {
  return (
    <motion.div className="grid md:grid-cols-2 gap-4" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }} initial="hidden" whileInView="show" viewport={{ once:false, amount:0.2 }}>
      {copy.projects.map((p, i) => (
        <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}>
          <Card cardBg={cardBg} cardBorder={cardBorder}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{p.name}</h3>
              {p.period && <div className="text-xs opacity-70">{p.period}</div>}
            </div>
            <ul className="mt-2 grid gap-2 list-disc pl-5">
              {p.bullets.map((b, j) => (<li key={j} className="leading-7">{b}</li>))}
            </ul>
            {p.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t, k) => (<span key={k} className="text-xs px-2 py-0.5 rounded-full border border-slate-300/60 dark:border-slate-700/60">{t}</span>))}
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Education({ copy, cardBg, cardBorder, lang }: { copy: Copy; cardBg: string; cardBorder: string; lang: Lang }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card cardBg={cardBg} cardBorder={cardBorder}>
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5" />
          <h3 className="font-semibold">{lang === 'en' ? 'Education' : '教育经历'}</h3>
        </div>
        <ul className="grid gap-3">
          {copy.edu.map((e, i) => (
            <li key={i}>
              <div className="font-medium">{e.school}</div>
              <div className="text-sm opacity-80">{e.degree} ｜ {e.period}</div>
              {e.bullets && (
                <ul className="list-disc pl-5 mt-1 text-sm opacity-90">
                  {e.bullets.map((b, j) => (<li key={j}>{b}</li>))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Card>
      <Card cardBg={cardBg} cardBorder={cardBorder}>
        <div className="flex items-center gap-2 mb-2">
          <Wrench className="w-5 h-5" />
          <h3 className="font-semibold">{lang === 'en' ? 'Certifications & Training' : '证书 / 培训'}</h3>
        </div>
        <ul className="grid gap-2 list-disc pl-5">
          {copy.certs.map((c, i) => (<li key={i} className="leading-7">{c}</li>))}
        </ul>
        {copy.extras && (
          <>
            <div className="h-3" />
            <div className="flex items-center gap-2 mb-1">
              <MonitorCog className="w-5 h-5" />
              <h3 className="font-semibold">{lang === 'en' ? 'Extras' : '补充'}</h3>
            </div>
            <ul className="grid gap-2 list-disc pl-5 text-sm opacity-90">
              {copy.extras.map((e, i) => (<li key={i}>{e}</li>))}
            </ul>
          </>
        )}
      </Card>
    </div>
  );
}

function Contact({ copy, cardBg, cardBorder, lang }: { copy: Copy; cardBg: string; cardBorder: string; lang: Lang }) {
  return (
    <Card cardBg={cardBg} cardBorder={cardBorder}>
      <div className="grid md:grid-cols-3 gap-3">
        {copy.contacts.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <c.icon className="w-4 h-4 opacity-80" />
            <span className="font-medium">{c.label}：</span>
            {c.label === "Email"
              ? (<span>{obfuscateEmail(c.value)}</span>)
              : (c.href ? (<a href={c.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">{c.value}</a>) : (<span>{c.value}</span>))
            }
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm opacity-80">
        {lang === 'en'
          ? "Open to remote/flexible roles in CX/Ops, content, and no‑code automation."
          : "开放远程/灵活合作机会：客户体验、运营、内容与 No‑Code 自动化相关岗位。"}
      </p>
      <Hint className="mt-4" text={lang === 'en' ? 'Use ↑ / ↓ to navigate levels' : '可用 ↑ / ↓ 键在关卡间跳转'} />
    </Card>
  );
}

function Hint({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs opacity-70 ${className}`}>
      <ArrowUp className="w-3 h-3" />
      <ArrowDown className="w-3 h-3" />
      <span>{text}</span>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer py-8">
      <div className="max-w-5xl mx-auto px-4 text-center text-xs opacity-70">
        <p>Built with React · Framer Motion · Tailwind · Lucide. Inspired by Robby Leonardi's interactive resume.</p>
        <p>© {new Date().getFullYear()} Zedz. All rights reserved.</p>
      </div>
    </div>
  );
}
