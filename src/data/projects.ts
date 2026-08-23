import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "ai-saas-platform",
    title: "AI-Powered SaaS Platform",
    slug: "ai-saas-platform",
    tagline: "Context-aware intelligence platform powered by AI agents and Model Context Protocol (MCP)",
    category: "AI Engineering",
    featured: true,
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AI APIs", "AI Agents", "MCP"],
    description: "A production-ready SaaS application where AI is deeply integrated into operational workflows. Features multi-agent tool execution, MCP connectors for external data, and context-aware business automations.",
    features: [
      "Multi-agent autonomous tool orchestration and task decomposition",
      "Model Context Protocol (MCP) server integration for secure tool execution",
      "Structured output validation with runtime schema guarantees",
      "Real-time streaming generation with token usage telemetry",
      "Role-based access control and multi-tenant database isolation"
    ],
    architectureSummary: "Client (Next.js SSR) ↔ API Gateway (Node.js/Express) ↔ MCP Tool Host & LLM Engine ↔ PostgreSQL Relational Store",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    caseStudy: {
      overview: "Traditional software requires users to manually execute multi-step repetitive tasks. This platform embeds autonomous AI agents directly into standard business workflows to automate complex context-heavy operations.",
      problem: "Standard LLM chatbots operate in silos without live access to proprietary company schemas, databases, or third-party APIs, leading to hallucinations and manual copy-pasting.",
      approach: "Adopted Model Context Protocol (MCP) standards to establish safe bi-directional pipes between agent reasoning engines and backend PostgreSQL services, allowing the model to safely execute parameterized tools.",
      architecture: "The application uses Next.js on the frontend with React Server Components, communicating with a Node.js/Express backend that hosts MCP clients. State and tenant data reside in PostgreSQL with connection pooling.",
      keyFeatures: [
        "Dynamic tool calling with schema validation",
        "Agent reflection and error recovery mechanisms",
        "Token consumption metrics and per-seat billing controls",
        "Session persistence and reproducible agent execution logs"
      ],
      technology: [
        { category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"] },
        { category: "Backend & AI", items: ["Node.js", "MCP Client", "LLM APIs", "Express.js"] },
        { category: "Database", items: ["PostgreSQL", "Prisma ORM"] }
      ],
      challenges: "Ensuring low-latency streaming while simultaneously validating structured tool execution schemas and maintaining strict tenant boundary security.",
      outcome: "Delivered a rock-solid, production-ready AI SaaS foundation that handles complex data flows with complete type safety and verifiable tool execution."
    }
  },
  {
    id: "invoice-builder-saas",
    title: "Invoice Builder SaaS",
    slug: "invoice-builder-saas",
    tagline: "Full-stack subscription billing, customizable PDF invoice generation, and revenue analytics",
    category: "Full Stack",
    featured: true,
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Tailwind CSS"],
    description: "A database-backed SaaS solution designed for freelancers and businesses to generate, track, and dispatch compliant invoices with recurring Stripe subscriptions and real-time revenue analytics.",
    features: [
      "Interactive real-time invoice builder with customizable line items and taxes",
      "Complete user authentication, session security, and multi-tenant profiles",
      "Stripe Customer Portal and multi-tier subscription billing webhooks",
      "Revenue tracking dashboard with payment status filters and exportable CSVs",
      "Direct PDF generation and one-click email delivery pipeline"
    ],
    architectureSummary: "Next.js App Router ↔ Supabase Auth & PostgreSQL ↔ Stripe Webhook Engine ↔ PDF Vector Rendering",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    caseStudy: {
      overview: "An end-to-end commercial SaaS application handling invoice generation, tax calculation, client CRM directories, and payment collection via Stripe.",
      problem: "Freelancers and SMBs often struggle with disjointed invoicing tools that either lack payment integration or have overly complex enterprise interfaces.",
      approach: "Built a lightning-fast, reactive web application with Next.js and Supabase PostgreSQL, offering instant live-preview editing and atomic Stripe checkout workflows.",
      architecture: "Built on Next.js with Supabase for PostgreSQL persistence and Row Level Security (RLS). Webhooks synchronize Stripe subscription states asynchronously.",
      keyFeatures: [
        "Live interactive invoice preview with instant tax/discount calculation",
        "Secure Stripe payment links embedded into dispatched invoices",
        "Automated recurring invoice generation on calendar schedules",
        "Comprehensive financial analytics: Paid, Pending, Overdue"
      ],
      technology: [
        { category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        { category: "Backend & DB", items: ["Supabase", "PostgreSQL", "Stripe API"] }
      ],
      challenges: "Synchronizing asynchronous Stripe webhook events reliably with Supabase database state without race conditions during simultaneous customer checkouts.",
      outcome: "A production-grade, highly responsive web product that enables rapid invoicing and friction-free subscription monetization."
    }
  },
  {
    id: "careerlooms",
    title: "CareerLooms",
    slug: "careerlooms",
    tagline: "High-performance job portal and career matching platform with real-time indexing",
    category: "Frontend Architecture",
    featured: true,
    stack: ["Next.js", "Firebase", "TypeScript", "Tailwind CSS"],
    description: "A dynamic tech job exploration platform engineered for speed, SEO discoverability, faceted multi-attribute filtering, and real-time application tracking.",
    features: [
      "Multi-faceted search and filter engine by salary, location, tech stack, and experience",
      "Search-engine optimized static and server-rendered job detail routes",
      "Firebase real-time database integration for applicant submissions",
      "Responsive, clean UI engineered for high conversion and mobile accessibility"
    ],
    architectureSummary: "Next.js SSR/ISR ↔ Firebase Firestore ↔ Tailwind CSS Engine",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    caseStudy: {
      overview: "CareerLooms is a dedicated job discovery platform connecting developers and tech talent with curated opportunities across global companies.",
      problem: "Many job boards suffer from slow client-side filtering, poor SEO ranking, and sluggish mobile performance.",
      approach: "Leveraged Next.js Incremental Static Regeneration (ISR) combined with Firebase Firestore real-time listeners for fast data updates and high lighthouse scores.",
      architecture: "Next.js frontend with Tailwind CSS, utilizing Firebase for backend data storage, authentication, and job posting pipelines.",
      keyFeatures: [
        "Faceted instant search without page reloads",
        "Structured Schema.org JobPosting metadata for Google Search ranking",
        "Bookmark and application management dashboard",
        "Mobile-first responsive drawer filters"
      ],
      technology: [
        { category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Firebase", "Firestore"] }
      ],
      challenges: "Optimizing search latency across thousands of job listings while maintaining instant client-side state transitions.",
      outcome: "An accessible, SEO-optimized career portal with sub-second page loads and seamless mobile UX."
    }
  },
  {
    id: "freelance-client-systems",
    title: "Client Platforms & Commercial Systems",
    slug: "client-platforms",
    tagline: "Custom full-stack web solutions across E-commerce, NGO, Travel, and Marketing",
    category: "Client Platforms",
    featured: false,
    stack: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    description: "A collection of commercial web applications delivered for diverse business clients, including high-converting digital marketing platforms, NGO donation hubs, booking systems for travel, and e-commerce stores.",
    features: [
      "Custom e-commerce storefronts with cart persistence and checkout pipelines",
      "Travel booking and inquiry engines with interactive itinerary planners",
      "Non-profit donation portals with donor analytics and transparency logs",
      "High-converting marketing landing systems with analytics and lead routing"
    ],
    architectureSummary: "React/Next.js ↔ Node.js API ↔ PostgreSQL/MySQL ↔ Payment/CRM integrations",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    caseStudy: {
      overview: "Freelance production development delivering tailored web applications with unique domain logic for commercial and non-profit organizations.",
      problem: "Clients required bespoke digital experiences tailored to their exact operational workflows without the bloated overhead of generic template builders.",
      approach: "Engineered scalable, performant TypeScript web applications with custom backends, intuitive CMS interfaces, and direct payment processing.",
      architecture: "Modular React and Node.js components connected to secure SQL/NoSQL databases and integrated with third-party transactional APIs.",
      keyFeatures: [
        "Custom administrative dashboards for non-technical team members",
        "Automated email notification and lead routing pipelines",
        "Responsive accessibility compliance across all viewport sizes",
        "Robust error boundaries and uptime logging"
      ],
      technology: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
        { category: "Database", items: ["PostgreSQL", "MongoDB", "MySQL"] }
      ],
      challenges: "Balancing tight turnaround times with rigorous code quality, strict security standards, and client-specific business constraints.",
      outcome: "100% delivered client satisfaction with sustained uptime, increased lead conversions, and performant user interfaces."
    }
  }
];
