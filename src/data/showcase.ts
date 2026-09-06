export interface ShowcaseProject {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  image: string;
  imageAlt: string;
  kind: "Independent product" | "Portfolio demo" | "Client project";
  role: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenge: string;
  approach: string;
  features: string[];
  walkthrough: string[];
  note: string;
  credit?: string;
  overviewHtml?: string;
}

export type ProjectPreview = Pick<
  ShowcaseProject,
  | "slug"
  | "title"
  | "category"
  | "tags"
  | "summary"
  | "image"
  | "imageAlt"
  | "kind"
  | "stack"
>;

// Curated from the owner's repositories and public deployments. See docs/portfolio-sources.md.
export const showcase: ShowcaseProject[] = [
  {
    slug: "pocketwise",
    title: "PocketWise",
    category: "Finance & mobile",
    tags: ["finance", "mobile", "react", "web-apps"],
    kind: "Independent product",
    summary:
      "A personal finance workspace for everyday spending, budgets and savings goals.",
    image: "/portfolio/pocketwise.webp",
    imageAlt:
      "PocketWise dashboard with transaction tracking, budgets and account balances",
    role: "Cross-platform application design & development",
    stack: ["React Native", "Expo", "TypeScript", "Local storage"],
    liveUrl: "https://pocketwise-personal-finance-app.vercel.app",
    githubUrl: "https://github.com/hasan1470/pocketwise-personal-finance-app",
    challenge:
      "Personal finance tools should connect day-to-day transactions with the bigger picture of budgets, accounts and savings goals, without requiring a bank connection to explore the product.",
    approach:
      "Build a shared mobile and web interface with local persistence. Add practical management flows for accounts, budgets, goals and bills, including balance updates and export controls.",
    features: [
      "Income and expense tracking",
      "Category budgets and savings goals",
      "Account and monthly bill management",
      "Goal contributions and balance updates",
      "CSV and JSON exports",
      "Saved browser-local data",
    ],
    walkthrough: [
      "Explore the dashboard and add a sample transaction.",
      "Open Manage to set a budget or create a savings goal.",
      "Record a monthly bill, review the balance and export the data.",
    ],
    note: "The public web demo uses local data. No bank, payment or financial service is connected. Native app-store releases are not part of this showcase.",
  },
  {
    slug: "craftlab",
    title: "CraftLab",
    category: "Product customization",
    tags: ["ecommerce", "web-apps", "react", "design"],
    kind: "Portfolio demo",
    summary:
      "An interactive product studio that takes custom artwork from editable canvas to a complete demo order.",
    image: "/portfolio/craftlab.webp",
    imageAlt:
      "CraftLab product designer with a shirt preview, artwork tools and size quantities",
    role: "Product editor, storefront workflow & merchant dashboard development",
    stack: ["Next.js", "React", "TypeScript", "Konva", "IndexedDB"],
    liveUrl: "https://product-designer-plugin.vercel.app",
    githubUrl: "https://github.com/hasan1470/product-designer-plugin",
    challenge:
      "Custom product orders need to preserve the customer's artwork, product choices and quantities throughout the design and checkout journey. The editor also needs to make precise artwork changes approachable.",
    approach:
      "Build a canvas editor with editable front and back layers, product previews and portable design files. Connect saved designs to a browser-local cart, simulated checkout and a merchant workspace that can inspect designs and update order status.",
    features: [
      "Text, image and shape layers with drag, resize and rotate controls",
      "Front and back artwork, undo/redo and layer management",
      "Product colors, print areas and quantities by size",
      "Named saved designs and editable project import/export",
      "Transparent artwork PNGs and product proof exports",
      "Demo checkout and merchant product/order management",
    ],
    walkthrough: [
      "Choose a product and add text or artwork to its front and back.",
      "Save the design, reopen it from My designs and export an artwork PNG or editable project.",
      "Add the design to the cart, complete a demo order and inspect it in the merchant workspace.",
    ],
    note: "The public demo stores designs and orders in the current browser. Payments, delivery and fulfilment are simulated. WooCommerce and Shopify integration packages are provided in the repository; live store installation is not part of this showcase.",
  },
  {
    slug: "toolstack",
    title: "Toolstack",
    category: "Productivity",
    tags: ["web-apps", "react", "cloud", "productivity"],
    kind: "Independent product",
    summary:
      "Everyday file, text and developer tools in one private browser workspace.",
    image: "/portfolio/toolstack.webp",
    imageAlt: "Toolstack website with its utility search and tool collection",
    role: "Product design & full-stack development",
    stack: ["Next.js", "React", "TypeScript", "PDF-lib"],
    liveUrl: "https://toolstack-lovat.vercel.app",
    githubUrl: "https://github.com/hasan1470/Toolstack",
    challenge:
      "Small tasks such as formatting JSON, compressing an image or combining PDFs often send people between different websites. The goal was a useful collection that processes files in the browser.",
    approach:
      "Organize 19 utilities into a searchable workspace. Give each tool useful examples, validation and clear output controls, with recent tools and favorites stored on the device.",
    features: [
      "JSON formatting and validation",
      "Image compression and format conversion",
      "PDF merging and page extraction",
      "Password generation and text utilities",
      "Search, favorites and recent tools",
      "Browser-local file processing",
    ],
    walkthrough: [
      "Find JSON Formatter and try valid or invalid JSON.",
      "Open an image or PDF tool and process a sample file.",
      "Favorite a tool and revisit it from the workspace.",
    ],
    note: "Independent utility product. File processing happens in your browser; no account is needed.",
  },
  {
    slug: "shopcart",
    title: "Shopcart",
    category: "E-commerce",
    tags: ["ecommerce", "ecommerce-tech", "react", "web-apps"],
    kind: "Portfolio demo",
    summary:
      "A complete storefront journey, from product discovery to saved demo orders.",
    image: "/portfolio/shopcart.webp",
    imageAlt:
      "Shopcart storefront showing product discovery and shopping navigation",
    role: "Storefront customization & commerce workflows",
    stack: ["Next.js", "Sanity", "TypeScript", "Stripe"],
    liveUrl: "https://shopcart-neon.vercel.app",
    githubUrl: "https://github.com/hasan1470/shopcart",
    challenge:
      "A storefront needs more than product cards. Visitors should be able to find an item, understand the total, complete checkout and return to an order.",
    approach:
      "Extend the storefront with product search, persistent cart and wishlist, shipping options and an account-free demonstration checkout. Keep connected commerce integrations configurable for a production setup.",
    features: [
      "Catalog search and category filters",
      "Product detail pages and variants",
      "Persistent cart and wishlist",
      "Standard and express delivery options",
      "Simulated checkout and saved orders",
      "Order cancellation and JSON export",
    ],
    walkthrough: [
      "Find a product and add it to the cart.",
      "Use the demo checkout and compare shipping totals.",
      "Open the saved order, reload the page or try cancellation.",
    ],
    note: "Demonstration storefront. Payments and orders are simulated; no goods are purchased or delivered.",
    credit:
      "Developed from an existing commerce starter. This case study covers the customization and added workflows in the linked repository.",
  },
  {
    slug: "prescripto",
    title: "Prescripto",
    category: "Healthcare",
    tags: ["healthcare", "react", "web-apps"],
    kind: "Portfolio demo",
    summary:
      "Doctor discovery, appointment booking and a connected demonstration staff workflow.",
    image: "/portfolio/prescripto.webp",
    imageAlt:
      "Prescripto appointment website with doctor discovery and booking navigation",
    role: "Application development & booking workflow improvements",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://prescripto-doctorbooking.vercel.app",
    githubUrl: "https://github.com/hasan1470/prescripto",
    challenge:
      "An appointment product needs a coherent journey for both visitors and staff. A portfolio version also needs to let people explore that journey without creating real medical bookings.",
    approach:
      "Build a local demonstration flow for finding doctors, booking available times, managing appointments and updating their status from a staff desk. Retain authenticated backend workflows for connected use.",
    features: [
      "Doctor search and specialty filters",
      "Profiles and appointment slots",
      "Booking history and cancellation",
      "Simulated payment confirmation",
      "Demonstration staff desk",
      "Saved browser-local appointments",
    ],
    walkthrough: [
      "Search for a doctor and choose a sample appointment slot.",
      "Review your appointment and try simulated payment.",
      "Open the demo staff desk to complete the appointment.",
    ],
    note: "Uses fictional sample data. No real consultation, medical service or payment is created.",
    credit:
      "Built on the GreatStack Prescripto starter, with added demo journeys, booking behavior and backend improvements. Original starter credit is retained in the repository.",
  },
  {
    slug: "recast",
    title: "Recast AI",
    category: "Content tools",
    tags: ["content", "react", "web-apps", "cloud"],
    kind: "Independent product",
    summary:
      "Turn source content into editable drafts and an organized publishing calendar.",
    image: "/portfolio/recast.webp",
    imageAlt:
      "Recast content studio showing its source input and editing workspace",
    role: "Product design, development & deployment",
    stack: ["Next.js", "React", "TypeScript", "OpenAI API"],
    liveUrl: "https://ai-content-repurposer-orcin.vercel.app",
    githubUrl: "https://github.com/hasan1470/ai-content-repurposer",
    challenge:
      "Adapting one article or transcript for several channels creates repetitive editing and planning work. The goal was to keep the source, drafts and schedule together.",
    approach:
      "Create a workspace for importing source text, generating channel-specific drafts, editing a calendar and saving or exporting the result. Include a local mode so the public demo works without a paid AI request.",
    features: [
      "Text and Markdown source import",
      "Five editable content formats",
      "Seven-day publishing calendar",
      "Saved and searchable projects",
      "Text and CSV exports",
      "Optional server-side AI integration",
    ],
    walkthrough: [
      "Paste an article or transcript of at least 20 words.",
      "Create the drafts, then edit a caption or calendar entry.",
      "Save the project, reload and reopen it, or export a CSV.",
    ],
    note: "The public demo rearranges source text locally. AI generation is an optional configured integration; review drafts before publishing.",
  },
  {
    slug: "journal",
    title: "Blogger Studio",
    category: "Publishing",
    tags: ["content", "react", "web-apps", "web-design"],
    kind: "Portfolio demo",
    summary:
      "An editorial website with a working writing, editing and article discovery experience.",
    image: "/portfolio/journal.webp",
    imageAlt: "Journal publishing website with featured articles and search",
    role: "Editorial interface & publishing workflow development",
    stack: ["Next.js", "React", "MongoDB", "IndexedDB"],
    liveUrl: "https://blog-app24.vercel.app",
    githubUrl: "https://github.com/hasan1470/blog-app",
    challenge:
      "A publishing site should make articles pleasant to read and straightforward to manage. The portfolio needed to demonstrate the writer workflow as well as the public interface.",
    approach:
      "Bring article discovery, a writer dashboard and an editable publishing workflow together. Use local persistence in the public demo and preserve the connected backend for configured deployments.",
    features: [
      "Article search and reading pages",
      "Writer dashboard",
      "Article creation with images",
      "Edit and reopen saved articles",
      "Browser-local demo persistence",
      "Connected ownership controls",
    ],
    walkthrough: [
      "Search the journal and open an article.",
      "Explore the writer workspace and create a sample draft.",
      "Edit the title, save and reload to inspect the saved version.",
    ],
    note: "Demo writing is stored in the current browser. It does not publish an article for other visitors.",
    credit:
      "Customized from an existing blog starter, with additional editorial, writer and persistence features.",
  },
  {
    slug: "jenifurro",
    title: "Jeniffer Urbáez",
    category: "Brand & property",
    tags: ["web-design", "react", "client", "property"],
    kind: "Client project",
    summary:
      "A cohesive digital home for property, interiors and a curated lifestyle collection.",
    image: "/portfolio/jenifurro.webp",
    imageAlt:
      "Jeniffer Urbáez website connecting real estate, interiors and a lifestyle collection",
    role: "Website design & development",
    stack: ["React", "TypeScript", "Tailwind CSS", "Content management"],
    liveUrl: "https://jeniffer-urbaez-world.andreas-stahl632934.chatgpt.site",
    githubUrl:
      "https://github.com/hasan1470/jenifurro-realstate-deco-collection-website",
    challenge:
      "Three related offers—property, interior design and a collection—needed a coherent brand experience without losing their individual identity.",
    approach:
      "Organize the website around distinct content areas with shared typography and navigation. Give property and collection content room for photography, detail and exploration.",
    features: [
      "Separate property, interiors and collection areas",
      "Property discovery and detail pages",
      "Image-led responsive layouts",
      "Catalog and content management",
      "A shared visual language",
    ],
    walkthrough: [
      "Explore the real estate section and a property detail.",
      "Move between interiors and the collection.",
      "Review how navigation and content adapt to a small screen.",
    ],
    note: "A website implementation shown through its public project preview. Availability and business information belong to the client.",
  },
];

export const portfolioFilters = [
  { label: "All work", value: "all" },
  { label: "Web applications", value: "web-apps" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Content & publishing", value: "content" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Websites", value: "web-design" },
];

export const designReferences = [
  {
    name: "Linear",
    domain: "linear.app",
    url: "https://linear.app",
    category: "Product storytelling",
    description:
      "A reference for presenting a complex software product through clear sections and focused interface details.",
  },
  {
    name: "Stripe",
    domain: "stripe.com",
    url: "https://stripe.com",
    category: "Service architecture",
    description:
      "A reference for organizing a broad set of services while helping different audiences find a relevant path.",
  },
  {
    name: "GOV.UK",
    domain: "gov.uk",
    url: "https://www.gov.uk",
    category: "Content clarity",
    description:
      "A reference for direct language, task-oriented navigation and making useful information easy to find.",
  },
];
