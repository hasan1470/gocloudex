export interface Service {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  intro: string;
  bestFor: string;
  deliverables: { title: string; description: string }[];
  stack: string[];
  projectSlugs: string[];
  questions: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "website-design",
    number: "01",
    title: "Websites that make a strong first impression.",
    shortTitle: "Website design",
    category: "Design & development",
    summary:
      "Distinctive business websites, thoughtfully designed for the people who use them.",
    intro:
      "Turn an outdated website or a new business idea into a clear, useful digital presence. We bring content, design and development together, with a structure your team can keep up to date.",
    bestFor:
      "Service businesses, creative studios, personal brands and companies refreshing an existing website.",
    deliverables: [
      {
        title: "A clear content structure",
        description:
          "Page planning, navigation and purposeful sections that help visitors understand your offer.",
      },
      {
        title: "Design for every screen",
        description:
          "Custom layouts, reusable components and responsive typography for phones, tablets and desktops.",
      },
      {
        title: "An editable website",
        description:
          "WordPress, Elementor or a custom CMS setup matched to how your team publishes content.",
      },
      {
        title: "A considered launch",
        description:
          "Image optimization, page metadata, keyboard checks, browser testing and practical handover notes.",
      },
    ],
    stack: ["WordPress", "Elementor", "Next.js", "Tailwind CSS"],
    projectSlugs: ["jenifurro", "journal"],
    questions: [
      {
        question: "Can you improve our current website?",
        answer:
          "Yes. We first review the content, platform and main visitor journeys, then agree whether focused improvements or a rebuild will serve you better.",
      },
      {
        question: "Will we be able to edit the content?",
        answer:
          "We choose the editing setup during discovery. It can include editable pages, articles, products or portfolio entries, with a walkthrough at handover.",
      },
      {
        question: "Do you supply copy and images?",
        answer:
          "We can help organize and refine your copy. Photography, illustration, translations and licensed assets are agreed separately so ownership and scope stay clear.",
      },
    ],
  },
  {
    slug: "web-application",
    number: "02",
    title: "Useful software. Built around your workflow.",
    shortTitle: "Web applications",
    category: "Design & development",
    summary:
      "Customer portals, practical tools and business software with real working features.",
    intro:
      "A good application makes a complicated task feel simple. We map the workflow, build the essential features and test the complete journey, from the first input to the saved result.",
    bestFor:
      "Founders validating a product, teams replacing spreadsheets and businesses building customer self-service.",
    deliverables: [
      {
        title: "A focused product scope",
        description:
          "User journeys, feature priorities and a first release that can be reviewed and used.",
      },
      {
        title: "A complete interface",
        description:
          "Responsive workspaces, clear empty states, validation, loading feedback and accessible controls.",
      },
      {
        title: "Connected functionality",
        description:
          "APIs, databases, authentication and integrations selected for the requirements of your product.",
      },
      {
        title: "Maintainable delivery",
        description:
          "Version-controlled source, regression checks, deployment configuration and setup documentation.",
      },
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    projectSlugs: ["toolstack", "recast", "prescripto"],
    questions: [
      {
        question: "Can we start with a smaller first release?",
        answer:
          "Yes. We define a useful core workflow and prioritize it first. Additional features can follow after feedback from the people using it.",
      },
      {
        question: "Can you connect an existing API or database?",
        answer:
          "Yes, after reviewing its documentation, access rules and data model. Integration requirements and third-party costs are included in the scope.",
      },
      {
        question: "Who receives the source code?",
        answer:
          "The handover includes the agreed source code, setup instructions and deployment details. Third-party components retain their original licenses.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    number: "03",
    title: "A better path from browsing to checkout.",
    shortTitle: "E-commerce",
    category: "Design & development",
    summary:
      "Online stores with thoughtful product discovery, clear checkout and manageable catalogs.",
    intro:
      "Build a shopping experience around your products and your operations. We connect storefront design with catalog management, payment configuration and the details that make ordering understandable.",
    bestFor:
      "Independent retailers, growing product brands and businesses moving an existing catalog online.",
    deliverables: [
      {
        title: "Product discovery",
        description:
          "Categories, search, product pages and product photography layouts that make comparison easier.",
      },
      {
        title: "Cart and checkout",
        description:
          "Clear totals, shipping rules, checkout states and payment provider integration where supported.",
      },
      {
        title: "Store management",
        description:
          "A catalog and order workflow using Shopify, WooCommerce or a custom content platform.",
      },
      {
        title: "Launch preparation",
        description:
          "Test orders, mobile checkout checks, transactional states and an operational handover.",
      },
    ],
    stack: ["Shopify", "WooCommerce", "Next.js", "Sanity", "Stripe"],
    projectSlugs: ["shopcart"],
    questions: [
      {
        question: "Which platform should we use?",
        answer:
          "The choice depends on your catalog, payment region, shipping needs and editing preferences. We compare the practical tradeoffs before recommending a platform.",
      },
      {
        question: "Are payment and hosting fees included?",
        answer:
          "Platform subscriptions, payment processing and other third-party fees are separate. We identify the required services before development begins.",
      },
      {
        question: "Can you migrate products from an old store?",
        answer:
          "We can plan a migration after checking the export format, images, variants and order data. Redirects and verification are included in the migration plan.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    number: "04",
    title: "Everyday tools, designed to go with you.",
    shortTitle: "Mobile applications",
    category: "Design & development",
    summary:
      "Responsive mobile experiences and cross-platform apps built with React Native and Expo.",
    intro:
      "We design mobile workflows around short sessions, small screens and reliable feedback. A shared React Native codebase can support iOS and Android while keeping product development manageable.",
    bestFor:
      "Companion apps, productivity tools, internal mobile workflows and early-stage mobile products.",
    deliverables: [
      {
        title: "Mobile-first flows",
        description:
          "Screen planning, clear navigation, accessible touch targets and appropriate input controls.",
      },
      {
        title: "Cross-platform development",
        description:
          "Reusable React Native components, platform-aware layouts and integrations within the agreed scope.",
      },
      {
        title: "Practical data handling",
        description:
          "Local persistence, sync requirements and useful offline behavior where the product needs it.",
      },
      {
        title: "Testing and release support",
        description:
          "Device testing, builds and guidance for store submission or internal distribution.",
      },
    ],
    stack: ["React Native", "Expo", "TypeScript", "REST APIs"],
    projectSlugs: ["pocketwise"],
    questions: [
      {
        question: "Do you build for both iOS and Android?",
        answer:
          "React Native and Expo can share much of the application across both platforms. Device-specific features and testing requirements are planned separately.",
      },
      {
        question: "Will the app be published to app stores?",
        answer:
          "Store submission can be included in the project scope. Developer accounts, review decisions and store fees belong to the relevant platform and account owner.",
      },
      {
        question: "Could a mobile-friendly website be enough?",
        answer:
          "Often, yes. We consider a responsive web app first when native device features and app-store distribution are not essential.",
      },
    ],
  },
  {
    slug: "cloud-solutions",
    number: "05",
    title: "From working locally to running reliably.",
    shortTitle: "Cloud & performance",
    category: "Technology",
    summary:
      "Deployment, integrations and performance improvements for an existing website or application.",
    intro:
      "Make your application easier to ship and maintain. We review the current setup, identify slow or fragile parts and implement practical changes with a way to verify the result.",
    bestFor:
      "Live websites needing speed improvements, applications ready for deployment and teams simplifying their infrastructure.",
    deliverables: [
      {
        title: "A measured review",
        description:
          "Review loading behavior, images, rendering, database calls and the current deployment setup.",
      },
      {
        title: "Targeted optimization",
        description:
          "Caching, smaller assets, server rendering and fewer unnecessary requests where they help.",
      },
      {
        title: "Deployment setup",
        description:
          "Build configuration, domain connection, environment variables and a repeatable release workflow.",
      },
      {
        title: "A maintainable handover",
        description:
          "Documented configuration, verification steps and recommendations for monitoring and backups.",
      },
    ],
    stack: ["Vercel", "Cloudflare", "MongoDB", "Cloudinary", "GitHub"],
    projectSlugs: ["toolstack", "recast"],
    questions: [
      {
        question: "Can you make our existing site faster?",
        answer:
          "We begin by measuring the current site and identifying the main bottlenecks. Improvements depend on the platform, hosting, integrations and content.",
      },
      {
        question: "Will a migration affect our live domain?",
        answer:
          "We prepare and verify the new environment before a planned cutover. Existing domain settings, redirects and rollback options are reviewed first.",
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer:
          "Maintenance can be agreed as a separate engagement, with a defined scope for updates, monitoring, backups and support availability.",
      },
    ],
  },
  {
    slug: "seo",
    number: "06",
    title: "Help the right people find your website.",
    shortTitle: "Technical & on-page SEO",
    category: "Content & growth",
    summary:
      "Search-friendly structure, useful content and a technically sound foundation.",
    intro:
      "Good search visibility starts with pages that are useful and easy to understand. We review your site structure, technical setup and content, then turn the findings into a prioritized improvement plan.",
    bestFor:
      "Business websites with indexing issues, new websites preparing to launch and teams improving existing service pages.",
    deliverables: [
      {
        title: "Technical site review",
        description:
          "Check crawlability, page metadata, canonical URLs, redirects, sitemaps and broken links.",
      },
      {
        title: "Search intent mapping",
        description:
          "Connect relevant topics and visitor questions to clear pages with a defined purpose.",
      },
      {
        title: "On-page improvements",
        description:
          "Improve headings, internal links, descriptions and image alternatives without keyword stuffing.",
      },
      {
        title: "Measurement setup",
        description:
          "Agree useful metrics and configure Search Console or analytics when access is available.",
      },
    ],
    stack: ["Search Console", "Structured data", "Sitemaps", "Core Web Vitals"],
    projectSlugs: ["journal"],
    questions: [
      {
        question: "Can you guarantee first-page rankings?",
        answer:
          "No. Rankings depend on competition, content, search systems and many other factors. We focus on useful improvements and transparent measurement.",
      },
      {
        question: "Is SEO included in a new website?",
        answer:
          "Basic technical setup can be included in a website build. Ongoing research, content production and reporting are scoped separately.",
      },
      {
        question: "Can you work with our existing content?",
        answer:
          "Yes. We review existing pages, identify gaps and suggest edits, consolidation or new pages where they serve a clear visitor need.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    number: "07",
    title: "Content with a purpose and a plan.",
    shortTitle: "Social content",
    category: "Content & growth",
    summary:
      "Consistent brand content, reusable creative assets and manageable publishing plans.",
    intro:
      "Make your expertise easier to discover through content built for your audience. We help define themes, adapt your source material and organize a publishing rhythm your team can maintain.",
    bestFor:
      "Small brands, creators and service businesses that need a more consistent content workflow.",
    deliverables: [
      {
        title: "A content direction",
        description:
          "Audience needs, brand voice, content themes and the role of each selected platform.",
      },
      {
        title: "Reusable creative assets",
        description:
          "Editable post templates and visual guidelines for a consistent look across content.",
      },
      {
        title: "A practical calendar",
        description:
          "Post ideas, draft captions and an approval workflow organized around your publishing capacity.",
      },
      {
        title: "Review and iteration",
        description:
          "A reporting structure focused on useful audience responses and agreed business objectives.",
      },
    ],
    stack: [
      "Canva",
      "Content calendars",
      "Brand systems",
      "Platform analytics",
    ],
    projectSlugs: ["recast"],
    questions: [
      {
        question: "Can you repurpose our existing material?",
        answer:
          "Yes. Articles, videos and approved brand material can become platform-specific drafts. Your team reviews claims, tone and publishing permissions.",
      },
      {
        question: "Do you publish directly to our accounts?",
        answer:
          "Publishing and community management are optional scopes. Account access and the approval process are agreed before any content is posted.",
      },
      {
        question: "Do you guarantee follower growth?",
        answer:
          "No. We agree content and measurement goals, then use real performance to guide the next iteration.",
      },
    ],
  },
  {
    slug: "ads-campaign",
    number: "08",
    title: "A clearer journey from an ad to an action.",
    shortTitle: "Campaigns & landing pages",
    category: "Content & growth",
    summary:
      "Focused landing pages, campaign creative and measurement setup for your offer.",
    intro:
      "Give each campaign a clear destination. We connect the message, creative and landing page, then plan the tracking needed to understand what visitors do next.",
    bestFor:
      "Businesses preparing a product launch, testing an offer or improving an existing advertising landing page.",
    deliverables: [
      {
        title: "A focused campaign brief",
        description:
          "Define the audience, offer, conversion goal and the role of the landing page.",
      },
      {
        title: "Landing page design",
        description:
          "A responsive page with a clear hierarchy, relevant proof and one primary action.",
      },
      {
        title: "Creative variations",
        description:
          "Agreed copy and visual variations for testing different messages and formats.",
      },
      {
        title: "Measurement planning",
        description:
          "Event tracking, campaign tags and a review plan aligned with consent and platform requirements.",
      },
    ],
    stack: ["Landing pages", "Google Ads", "Meta Ads", "Analytics"],
    projectSlugs: ["shopcart"],
    questions: [
      {
        question: "Is advertising spend included?",
        answer:
          "No. Media spend is paid through your advertising account. Creative, landing-page development and campaign management are scoped separately.",
      },
      {
        question: "Can you work with our current marketing team?",
        answer:
          "Yes. We can focus on landing pages, development and tracking while your team manages strategy, budgets and the advertising account.",
      },
      {
        question: "Can you guarantee sales or a specific return?",
        answer:
          "No. Results depend on your offer, market, budget and other factors. We use agreed measurements to evaluate changes.",
      },
    ],
  },
];

export const deliveryProcess = [
  {
    title: "Understand",
    description:
      "We clarify your audience, goals, existing setup and the work that matters most.",
  },
  {
    title: "Design",
    description:
      "We shape the structure and key screens, with something concrete for you to review.",
  },
  {
    title: "Build & test",
    description:
      "We implement the agreed features and check the important journeys across screen sizes.",
  },
  {
    title: "Launch & hand over",
    description:
      "We prepare the release, verify it and give you the source and instructions you need.",
  },
];
