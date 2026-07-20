export const SITE = {
  name: "Neetrick",
  tagline: ["Smart tricks.", "Better everyday."],
  description:
    "An IT + marketing studio in Jamnagar building brands, products, and growth engines that actually move numbers.",
  email: "sales@neetrick.com",
  phone: "+91 7698301043",
  location: "Jamnagar, Gujarat, India",
};

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type ServiceDetail = {
  introHeading: string;
  introParagraphs: string[];
  buildTitle: string;
  buildItems: { title: string; text?: string; items: string[] }[];
  gridTitle: string;
  gridGroups: { title: string; items: string[] }[];
  process: { no: string; title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
};

export const SERVICES: {
  no: string;
  slug: string;
  title: string;
  promise: string;
  deliverables: string[];
  detail: ServiceDetail;
}[] = [
  {
    no: "01",
    slug: "web-app-development",
    title: "Web & App Development",
    promise: "Build Digital Products That Scale, Perform, and Grow Your Business",
    deliverables: ["Web platforms", "Mobile apps", "Headless commerce"],
    detail: {
      introHeading: "Build Digital Products That Scale, Perform, and Grow",
      introParagraphs: [
        "Your website or application is more than an online presence - it becomes your sales team, customer support, marketing platform, and business engine working around the clock.",
        "At NEETRICK, we design and develop custom digital solutions tailored to your business objectives instead of relying on templates. Every solution is engineered for speed, scalability, security, and exceptional user experience.",
        "Whether you're building a startup, SaaS platform, enterprise solution, or customer-facing application, we transform your ideas into reliable digital products.",
      ],
      buildTitle: "What We Build",
      buildItems: [
        {
          title: "Business Websites",
          text: "Professional websites designed to establish credibility, generate leads, and strengthen your digital presence.",
          items: ["Responsive Design", "SEO Friendly Structure", "CMS Integration", "Performance Optimization", "Analytics Setup", "Secure Deployment"],
        },
        {
          title: "Custom Web Applications",
          text: "Tailor-made software engineered around your business workflows and operational goals.",
          items: ["CRM Systems", "ERP Solutions", "Booking Platforms", "Admin Dashboards", "Inventory Management", "Business Automation"],
        },
        {
          title: "SaaS Product Development",
          items: ["Multi-Tenant Architecture", "Subscription Billing", "User Management", "Analytics Dashboard", "Cloud Infrastructure"],
        },
        {
          title: "Mobile Applications",
          items: ["Android Apps", "iOS Apps", "Cross Platform Development", "Push Notifications", "Payment Gateway Integration"],
        },
      ],
      gridTitle: "Technology Stack",
      gridGroups: [
        { title: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"] },
        { title: "Backend", items: ["Node.js", "Express.js", "NestJS", "Laravel", "Django", "FastAPI"] },
        { title: "Mobile", items: ["React Native", "Flutter", "Kotlin", "Swift"] },
      ],
      process: [
        { no: "01", title: "Discovery & Strategy", text: "Requirement gathering, business analysis, planning, and roadmap creation." },
        { no: "02", title: "UI/UX Design", text: "Wireframes, prototypes, user journeys, and interface design." },
        { no: "03", title: "Development", text: "Frontend, backend, APIs, integrations, and cloud architecture." },
        { no: "04", title: "Testing", text: "Quality assurance, security testing, and performance optimization." },
        { no: "05", title: "Launch & Support", text: "Deployment, monitoring, maintenance, and future enhancements." },
      ],
      ctaTitle: "Ready to Build Your Next Digital Product?",
      ctaText: "From startups to enterprise software, we build scalable digital solutions that help businesses innovate, automate, and grow.",
    },
  },
  {
    no: "02",
    slug: "web-design",
    title: "Web Design & UI/UX",
    promise: "Interfaces people actually enjoy using - designed, not just built.",
    deliverables: ["Website design", "UI/UX design", "Site redesigns"],
    detail: {
      introHeading: "Design That Makes People Stay",
      introParagraphs: [
        "A site that's technically well-built can still lose visitors in the first five seconds if it looks dated, confusing, or generic. Design is what makes someone trust you enough to scroll, click, and buy.",
        "At NEETRICK, we design before we build - wireframes, user flows, and visual systems crafted around how people actually behave, not just what looks good in a mockup.",
        "Whether you need a brand-new site designed from scratch or a tired one rebuilt into something modern, we design experiences that convert, not just decorate.",
      ],
      buildTitle: "What We Design",
      buildItems: [
        {
          title: "Website Design",
          text: "Custom-designed sites built around your brand, not a templated theme.",
          items: ["Landing Pages", "Marketing Sites", "E-commerce Design", "Design Systems", "Responsive Layouts"],
        },
        {
          title: "Site Redesigns",
          text: "Rebuilding an existing site's look, feel, and flow without losing what already works.",
          items: ["Visual Refresh", "Information Architecture", "Conversion-Focused Redesign", "Content Migration", "SEO-Safe Rebuilds"],
        },
        {
          title: "UI/UX Design",
          items: ["User Research", "Wireframing", "Prototyping", "Interaction Design", "Usability Testing"],
        },
        {
          title: "Design Systems & Handoff",
          items: ["Component Libraries", "Figma Design Files", "Developer Handoff", "Accessibility Standards"],
        },
      ],
      gridTitle: "Design Toolkit",
      gridGroups: [
        { title: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator"] },
        { title: "Prototyping", items: ["Figma Prototypes", "Framer", "Principle"] },
        { title: "Handoff", items: ["Figma Dev Mode", "Zeplin", "Storybook"] },
      ],
      process: [
        { no: "01", title: "Discovery & Research", text: "Understanding your users, goals, and what's actually holding the current experience back." },
        { no: "02", title: "Wireframes & Flows", text: "Mapping the structure and user journeys before any visual design starts." },
        { no: "03", title: "Visual Design", text: "Applying your brand into high-fidelity screens, states, and components." },
        { no: "04", title: "Prototyping & Testing", text: "Interactive prototypes tested with real users before a single line of code is written." },
        { no: "05", title: "Handoff & Launch", text: "Developer-ready files, design systems, and support through build." },
      ],
      ctaTitle: "Ready for a Site People Actually Enjoy Using?",
      ctaText: "From a first design to a full redesign, we build interfaces that make people trust you enough to stay.",
    },
  },
  {
    no: "03",
    slug: "brand-identity",
    title: "Brand & Identity",
    promise: "Distinctive brands that are impossible to ignore.",
    deliverables: ["Logo & systems", "Visual identity", "Guidelines"],
    detail: {
      introHeading: "Craft a Brand That's Impossible to Ignore",
      introParagraphs: [
        "Your brand is the first impression, the tone of every email, and the reason someone chooses you over a competitor with a lower price. It's rarely an accident - it's designed.",
        "At NEETRICK, we build brand systems from first principles: research, positioning, and visual identity that work together instead of a logo bolted onto a color palette.",
        "Whether you're launching from scratch or repositioning an established business, we give you a brand that holds up across every touchpoint - digital, print, and in person.",
      ],
      buildTitle: "What We Build",
      buildItems: [
        {
          title: "Brand Strategy & Positioning",
          text: "The thinking that makes every design decision easier.",
          items: ["Market & Competitor Research", "Brand Positioning", "Messaging Framework", "Brand Voice & Tone", "Naming & Taglines"],
        },
        {
          title: "Visual Identity Systems",
          text: "The look and feel that carries your brand everywhere it shows up.",
          items: ["Logo Design", "Color Systems", "Typography", "Iconography & Illustration", "Brand Guidelines"],
        },
        {
          title: "Marketing Collateral",
          items: ["Business Cards & Stationery", "Pitch Decks", "Packaging Design", "Signage & Print", "Merchandise"],
        },
        {
          title: "Digital Brand Assets",
          items: ["Website UI Kits", "App Icons & Splash Screens", "Social Media Kits", "Email Templates"],
        },
      ],
      gridTitle: "Where Your Brand Shows Up",
      gridGroups: [
        { title: "Digital", items: ["Website", "App Icons", "Social Profiles", "Email"] },
        { title: "Print", items: ["Business Cards", "Packaging", "Signage", "Brochures"] },
        { title: "In Person", items: ["Merchandise", "Events", "Retail", "Presentations"] },
      ],
      process: [
        { no: "01", title: "Discovery & Research", text: "Market analysis, competitor audits, and stakeholder interviews to uncover your brand's true position." },
        { no: "02", title: "Strategy & Positioning", text: "Messaging framework, brand voice, and a positioning statement that sets you apart." },
        { no: "03", title: "Visual Identity Design", text: "Logo exploration, color systems, typography, and the full visual language." },
        { no: "04", title: "Guidelines & Assets", text: "A complete brand guideline and asset library ready for every touchpoint." },
        { no: "05", title: "Rollout & Support", text: "Launch support, collateral rollout, and ongoing brand governance." },
      ],
      ctaTitle: "Ready to Build a Brand People Remember?",
      ctaText: "From positioning to the last pixel of your guidelines, we build brand systems that make every future decision easier.",
    },
  },
  {
    no: "04",
    slug: "performance-marketing",
    title: "Performance Marketing",
    promise: "Paid growth tuned for real return on every rupee.",
    deliverables: ["Meta & Google Ads", "Funnels", "CRO"],
    detail: {
      introHeading: "Paid Growth Engineered for Real Return",
      introParagraphs: [
        "Ad spend without a system is just an expensive experiment. We treat every rupee like it has to earn its way back, with the data to prove it.",
        "At NEETRICK, we build, launch, and optimize paid campaigns across search, social, and display - tied to pipeline and revenue, not just clicks.",
        "Whether you're scaling an existing account or starting from zero, we build funnels that compound instead of campaigns that plateau.",
      ],
      buildTitle: "What We Run",
      buildItems: [
        {
          title: "Paid Search & Shopping",
          items: ["Google Search Ads", "Shopping Campaigns", "YouTube Ads", "Display Remarketing", "Keyword Strategy"],
        },
        {
          title: "Social & Meta Advertising",
          items: ["Facebook & Instagram Ads", "Lead Gen Campaigns", "Retargeting Funnels", "Creative Testing", "Audience Segmentation"],
        },
        {
          title: "Conversion & Funnel Optimization",
          items: ["Landing Page Design", "A/B Testing", "CRO Audits", "Checkout Optimization", "Heatmap Analysis"],
        },
        {
          title: "Analytics & Reporting",
          items: ["Pixel & Tag Setup", "Attribution Modeling", "ROAS Dashboards", "Weekly Performance Reports"],
        },
      ],
      gridTitle: "Platforms We Run On",
      gridGroups: [
        { title: "Ad Platforms", items: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads", "Microsoft Ads"] },
        { title: "Analytics", items: ["GA4", "Google Tag Manager", "Hotjar", "Meta Pixel"] },
        { title: "Automation", items: ["Zapier", "HubSpot", "Klaviyo"] },
      ],
      process: [
        { no: "01", title: "Audit & Benchmarking", text: "Account audits, competitor analysis, and baseline performance benchmarking." },
        { no: "02", title: "Strategy & Funnel Mapping", text: "Channel selection, budget allocation, and funnel design tied to real business goals." },
        { no: "03", title: "Campaign Build", text: "Ad creative, copy, targeting, and tracking setup across every channel." },
        { no: "04", title: "Launch & Optimize", text: "Continuous A/B testing, bid optimization, and creative refresh cycles." },
        { no: "05", title: "Report & Scale", text: "Weekly reporting, ROAS analysis, and scaling what works." },
      ],
      ctaTitle: "Ready to Turn Ad Spend Into Pipeline?",
      ctaText: "From first campaign to full-funnel scale, we run paid growth that's measured in revenue, not impressions.",
    },
  },
  {
    no: "05",
    slug: "seo-content",
    title: "SEO & Content",
    promise: "Compounding organic traffic that keeps paying.",
    deliverables: ["Technical SEO", "Content strategy", "Link building"],
    detail: {
      introHeading: "Compounding Organic Growth That Keeps Paying",
      introParagraphs: [
        "Paid traffic stops the moment you stop paying. Organic traffic keeps compounding - if it's built on the right technical foundation and content strategy.",
        "At NEETRICK, we combine technical SEO, content strategy, and authority building into one system, instead of treating them as separate line items.",
        "Whether you're recovering from a ranking drop or starting a content engine from zero, we build organic growth that keeps paying long after the project ends.",
      ],
      buildTitle: "What We Deliver",
      buildItems: [
        {
          title: "Technical SEO",
          items: ["Site Audits", "Core Web Vitals", "Crawlability & Indexing", "Schema Markup", "Site Architecture"],
        },
        {
          title: "Content Strategy",
          items: ["Keyword Research", "Content Calendars", "Topic Clusters", "Blog & Article Writing", "Landing Page Copy"],
        },
        {
          title: "Off-Page SEO",
          items: ["Link Building", "Digital PR", "Guest Posting", "Backlink Audits"],
        },
        {
          title: "Local & E-commerce SEO",
          items: ["Google Business Profile", "Local Pack Rankings", "Product Page Optimization", "Category SEO"],
        },
      ],
      gridTitle: "Tools We Use",
      gridGroups: [
        { title: "Research", items: ["Ahrefs", "SEMrush", "Google Search Console"] },
        { title: "Content", items: ["Surfer SEO", "Clearscope", "Grammarly"] },
        { title: "Reporting", items: ["Looker Studio", "GA4", "Screaming Frog"] },
      ],
      process: [
        { no: "01", title: "Technical Audit", text: "Full-site crawl, Core Web Vitals, and indexing health check." },
        { no: "02", title: "Keyword & Content Strategy", text: "Keyword mapping, topic clusters, and a prioritized content calendar." },
        { no: "03", title: "On-Page & Content Production", text: "Optimized pages, articles, and landing copy built to rank and convert." },
        { no: "04", title: "Off-Page & Authority Building", text: "Link building, digital PR, and citation cleanup." },
        { no: "05", title: "Monitor & Compound", text: "Rank tracking, monthly reporting, and continuous iteration." },
      ],
      ctaTitle: "Ready to Own Your Search Results?",
      ctaText: "From technical fixes to a content engine that compounds, we build organic growth that keeps paying.",
    },
  },
  {
    no: "06",
    slug: "social-creative",
    title: "Social & Creative",
    promise: "Scroll-stopping creative built for the feed.",
    deliverables: ["Social management", "Reels & video", "Campaigns"],
    detail: {
      introHeading: "Scroll-Stopping Creative Built for the Feed",
      introParagraphs: [
        "Attention is the scarcest resource on the internet. Generic content gets scrolled past - creative built for the platform gets watched, saved, and shared.",
        "At NEETRICK, we plan, shoot, edit, and publish content built around how each platform actually works, not a repurposed version of your last campaign.",
        "Whether you need a full always-on social presence or a single high-impact launch campaign, we bring the creative and the strategy in one team.",
      ],
      buildTitle: "What We Create",
      buildItems: [
        {
          title: "Social Media Management",
          items: ["Content Calendars", "Community Management", "Platform Strategy", "Trend Monitoring", "Growth Campaigns"],
        },
        {
          title: "Video & Reels Production",
          items: ["Short-Form Video", "Reels & TikToks", "Motion Graphics", "Editing & Sound Design", "Storyboarding"],
        },
        {
          title: "Photography & Design",
          items: ["Product Photography", "Lifestyle Shoots", "Carousel Design", "Story Templates", "Ad Creatives"],
        },
        {
          title: "Campaign Creative",
          items: ["Launch Campaigns", "Influencer Collaborations", "UGC Direction", "Seasonal Campaigns"],
        },
      ],
      gridTitle: "Creative Toolkit",
      gridGroups: [
        { title: "Design", items: ["Adobe Photoshop", "Illustrator", "Canva Pro"] },
        { title: "Video", items: ["Premiere Pro", "After Effects", "CapCut"] },
        { title: "Scheduling", items: ["Meta Business Suite", "Later", "Buffer"] },
      ],
      process: [
        { no: "01", title: "Brand & Audience Discovery", text: "Understanding your audience, tone, and where they actually spend time." },
        { no: "02", title: "Content Strategy", text: "Content pillars, calendars, and a visual direction for every platform." },
        { no: "03", title: "Production", text: "Shooting, editing, and designing scroll-stopping creative." },
        { no: "04", title: "Publishing & Community", text: "Scheduled publishing, community management, and real-time engagement." },
        { no: "05", title: "Analyze & Iterate", text: "Performance reviews and creative iteration based on what resonates." },
      ],
      ctaTitle: "Ready for Content People Actually Stop For?",
      ctaText: "From strategy to the final cut, we build social and creative that earns attention instead of asking for it.",
    },
  },
];

export const WORK = [
  {
    slug: "yatharth-travel",
    name: "Yatharth Travel Company",
    client: "Yatharth Travel",
    tags: ["Web", "Marketing"],
    year: "2026",
    color: "#123a4d",
    image: "/brand/Yatharth-Travel-Company-Banner.png",
    video: "/brand/Yatharth-Travel-Company-Banner.png",
  },
  {
    slug: "kb-motors",
    name: "KB Motors",
    client: "KB Motors",
    tags: ["Web", "Branding"],
    year: "2026",
    color: "#3a1414",
    image: "/brand/KB-Motors.png",
    video: "/brand/KB-Motors.png",
  },
  {
    slug: "hexa-academy",
    name: "Hexa Academy",
    client: "Hexa Academy",
    tags: ["Branding", "Marketing"],
    year: "2026",
    color: "#241a4d",
    image: "/brand/Hexa-Academy.png",
    video: "/brand/Hexa-Academy.png",
  },
  {
    slug: "flex-gym",
    name: "Flex Gym",
    client: "Flex Gym",
    tags: ["Branding", "Social"],
    year: "2026",
    color: "#1a3a24",
    image: "/brand/Flex-Gym.png",
    video: "/brand/Flex-Gym.png",
  },
];

export const PROCESS = [
  { no: "01", title: "Discover", text: "We dig into your business, market, and goals to find the real opportunity." },
  { no: "02", title: "Strategy", text: "We map a sharp plan - positioning, channels, and the metrics that matter." },
  { no: "03", title: "Build", text: "Design and engineering come together to ship something genuinely premium." },
  { no: "04", title: "Grow", text: "We optimize, scale, and report - turning launches into compounding growth." },
];

export const STATS = [
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 18, suffix: "+", label: "Happy clients" },
  { value: 4.8, suffix: "×", label: "Avg. ROI" },
  { value: 1, suffix: " yrs", label: "Experience" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Neetrick rebuilt our brand and our funnel in one go. Leads tripled within a quarter.",
    name: "Priya Mehta",
    role: "CMO, Atlas",
  },
  {
    quote:
      "One partner for design, dev, and marketing. The craft and speed are unreal.",
    name: "Rahul Shah",
    role: "Founder, VoltEdge",
  },
  {
    quote:
      "They treat our growth like their own. Easily the sharpest team we've worked with.",
    name: "Anita Desai",
    role: "Director, Saffron Foods",
  },
  {
    quote:
      "From strategy to launch, everything just felt effortless. The craft shows in every detail.",
    name: "Karan Patel",
    role: "CEO, Northwind",
  },
  {
    quote:
      "Our search traffic doubled in months. Neetrick simply gets results that compound.",
    name: "Sneha Rao",
    role: "Head of Growth, Lumen",
  },
];

export const ROLES = [
  { slug: "bde", title: "Business Development Executive (BDE)", dept: "Sales", location: "Remote", type: "Freelance" },
  { slug: "business-analyst", title: "Business Analyst (BA)", dept: "Strategy", location: "Remote", type: "Freelance" },
  { slug: "wordpress-developer", title: "Backend WordPress Developer", dept: "Engineering", location: "Remote", type: "Freelance" },
  { slug: "shopify-developer", title: "Shopify Developer", dept: "Engineering", location: "Remote", type: "Freelance" },
];

export const VALUES = [
  { title: "Clever", text: "Smart tricks over brute force. We find the elegant route." },
  { title: "Honest", text: "Straight talk, clear reporting, no vanity metrics." },
  { title: "Outcome-obsessed", text: "We measure success in your numbers, not our awards." },
  { title: "Crafted", text: "Every pixel, line of code, and word is considered." },
];
