import { ChatMessage } from '../types';
import { profileData } from '../data/profile';
import { experienceData } from '../data/experience';
import { projectsData } from '../data/projects';
import { skillsRecord, socialsData } from '../data/skills';

export interface AIResponsePayload {
  reply: string;
  sources?: string[];
  source?: string;
  action?:
    | 'open-resume'
    | 'open-github'
    | 'open-linkedin'
    | 'open-contact'
    | 'navigate-projects'
    | 'navigate-experience'
    | 'navigate-skills'
    | 'navigate-ai'
    | 'navigate-about';
}

/**
 * Remove Markdown syntax from model/local responses so the recruiter never
 * sees raw **bold**, ## headings, [links](...), etc.
 */
const clean = (text: string) =>
  text
    .replace(/```[\s\S]*?```/g, (block) =>
      block
        .replace(/^```[^\n]*\n?/, '')
        .replace(/```$/, '')
        .trim()
    )
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/^\s*\d+[.)]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const has = (q: string, values: string[]) =>
  values.some((value) => q.includes(value));

const greeting = (q: string) =>
  /^(hi|hello|hey|hii|heyy|good morning|good afternoon|good evening|how are you)[!,.\\s]*$/i.test(
    q
  );

const acknowledgement = (q: string) =>
  /^(great|good|nice|perfect|awesome|excellent|interesting|got it|okay|ok|thanks|thank you|thx|cool|sounds good|understood)[!,.\\s]*$/i.test(
    q
  );

const out = (
  reply: string,
  sources: string[] = [],
  action?: AIResponsePayload['action']
): AIResponsePayload => ({
  reply: clean(reply),
  sources,
  action,
  source: 'verified-knowledge-engine',
});

/**
 * Get the most recent assistant answer.
 *
 * We use assistant context because the previous answer often contains
 * the entity/topic that a recruiter is referring to:
 *
 * "Tell me about Brownfleet."
 * "What did he do there?"
 */
function lastContext(history: ChatMessage[]) {
  return (
    [...history]
      .reverse()
      .find((message) => message.role === 'assistant' && message.content)
      ?.content.toLowerCase() || ''
  );
}

/**
 * Normalize punctuation/capitalization before intent matching.
 */
function normalizeQuery(q: string) {
  return q
    .toLowerCase()
    .replace(/[!?.,;:()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Local verified knowledge engine.
 *
 * High-confidence portfolio questions are intentionally handled locally
 * before Gemini so simple factual questions about Sukhvant remain reliable.
 */
function localAnswer(
  message: string,
  history: ChatMessage[] = []
): AIResponsePayload {
  const raw = message.toLowerCase().trim();
  const q = normalizeQuery(raw);
  const previous = lastContext(history);

  // -----------------------------------------------------------------------
  // CONVERSATION
  // -----------------------------------------------------------------------

  if (greeting(raw)) {
    return out(
      "Hi! I'm Sukhvant AI. I can help you review Sukhvant's experience, employers, projects, technical skills, AI/MCP work, engineering approach, resume, contact details, availability, or fit for a role.",
      [
        'About',
        'Experience',
        'Projects',
        'Skills',
        'AI Engineering',
        'Resume',
      ]
    );
  }

  if (acknowledgement(raw)) {
    return out(
      has(q, ['thanks', 'thank you', 'thx'])
        ? "You're welcome. Let me know what you'd like to explore about Sukhvant."
        : "Glad that helps. I can also walk you through Sukhvant's projects, strongest technical areas, AI engineering work, experience, or potential fit for a role.",
      ['About', 'Experience', 'Projects']
    );
  }

  // -----------------------------------------------------------------------
  // RESUME / GITHUB / LINKEDIN / CONTACT / NAVIGATION
  // -----------------------------------------------------------------------

  if (
    q === 'resume' ||
    has(q, [
      'open resume',
      'show resume',
      'show his resume',
      'view resume',
      'download resume',
      'open cv',
      'show cv',
      'can i see his resume',
      'where is his resume',
      'where is his cv',
    ])
  ) {
    return out(
      "Sukhvant's resume covers his Full Stack Developer and AI Engineer experience, Brownfleet, freelance/self-employed work, his OSCARBLACK internship, projects, and core technical skills.",
      ['Resume'],
      'open-resume'
    );
  }

  if (
    has(q, [
      'github',
      'git hub',
      'repositories',
      'repos',
      'github profile',
      'github account',
      'github link',
    ])
  ) {
    return out(
      `Sukhvant's GitHub profile is ${socialsData.github.replace(
        'https://',
        ''
      )}. It contains his public repositories and engineering work.`,
      ['GitHub'],
      'open-github'
    );
  }

  if (
    has(q, [
      'linkedin',
      'linked in',
      'linkedin profile',
      'linkedin account',
      'linkedin link',
    ])
  ) {
    return out(
      `Sukhvant's LinkedIn profile is ${socialsData.linkedin.replace(
        'https://',
        ''
      )}. You can use it to review his professional profile and connect with him.`,
      ['LinkedIn'],
      'open-linkedin'
    );
  }

  if (
    has(q, [
      'contact info',
      'contact information',
      'contact details',
      'how can i contact',
      'how do i contact',
      'reach him',
      'reach sukhvant',
      'contact sukhvant',
      'how to contact',
      'contact him',
    ])
  ) {
    return out(
      `The easiest way to contact Sukhvant is by email at ${profileData.contactEmail}. His portfolio also provides direct GitHub and LinkedIn channels.`,
      ['Contact', 'GitHub', 'LinkedIn'],
      'open-contact'
    );
  }

  if (
    has(q, ['email', 'e mail', 'mail address', 'email address', 'his mail'])
  ) {
    return out(
      `Sukhvant's professional email is ${profileData.contactEmail}. It can be used for job opportunities, engineering roles, AI product work, or software development inquiries.`,
      ['Contact'],
      'open-contact'
    );
  }

  if (
    has(q, [
      'open projects',
      'show projects',
      'show me his projects',
      'projects section',
      'take me to projects',
    ])
  ) {
    return out(
      "Sukhvant's featured projects span AI engineering, full-stack SaaS, frontend architecture and client platforms.",
      ['Projects'],
      'navigate-projects'
    );
  }

  if (
    has(q, [
      'open experience',
      'show experience',
      'experience section',
      'take me to experience',
    ])
  ) {
    return out(
      "Sukhvant's recorded experience includes Brownfleet, freelance/self-employed full-stack work and an OSCARBLACK frontend internship.",
      ['Experience'],
      'navigate-experience'
    );
  }

  if (
    has(q, [
      'open skills',
      'show skills',
      'skills section',
      'take me to skills',
    ])
  ) {
    return out(
      "Sukhvant's strongest technical areas are TypeScript-based frontend/full-stack development, backend systems, databases and AI engineering.",
      ['Technical Skills'],
      'navigate-skills'
    );
  }

  if (
    has(q, [
      'open ai engineering',
      'show ai engineering',
      'ai engineering section',
      'open mcp',
      'take me to ai',
    ])
  ) {
    return out(
      "Sukhvant's AI engineering work includes LLM APIs, AI agents, AI workflows and Model Context Protocol (MCP).",
      ['AI Engineering'],
      'navigate-ai'
    );
  }

  // -----------------------------------------------------------------------
  // PROFILE / ABOUT SUKHVANT
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'tell me about sukhvant',
      'about sukhvant',
      'quick summary',
      'brief summary',
      '30 second summary',
      'summarize sukhvant',
      'who is sukhvant',
      'what should i know about him',
      'give me a summary',
      'tell me about him',
      'tell me about his profile',
      'his profile',
      'profile summary',
      'about him',
      'who is he',
      'what do you know about him',
      'what do you know about sukhvant',
      'give me an overview',
      'overview of sukhvant',
      'sukhvant overview',
    ])
  ) {
    return out(
      `${profileData.name} is a ${profileData.title} focused on modern web applications, SaaS products and AI-powered experiences. His strongest foundation is TypeScript full-stack engineering across React/Next.js, Node.js and PostgreSQL, with hands-on work in AI agents and MCP. His recorded experience includes Brownfleet, freelance/self-employed development and an OSCARBLACK frontend internship.`,
      ['About', 'Experience', 'Technical Skills', 'AI Engineering']
    );
  }

  // Catch direct "Sukhvant" profile questions more broadly.
  if (
    q === 'sukhvant' ||
    q === 'sukhvant singh' ||
    q.includes('about sukhvant') ||
    q.includes('sukhvant profile')
  ) {
    return out(
      `${profileData.name} is a ${profileData.title} focused on modern web applications, SaaS products and AI-powered experiences. His strongest foundation is TypeScript full-stack engineering across React/Next.js, Node.js and PostgreSQL, with hands-on work in AI agents and MCP. His recorded experience includes Brownfleet, freelance/self-employed development and an OSCARBLACK frontend internship.`,
      ['About', 'Experience', 'Technical Skills', 'AI Engineering']
    );
  }

  if (
    has(q, [
      'available',
      'availability',
      'remote',
      'work remotely',
      'can he work remote',
      'where is he based',
      'location',
      'where is he located',
      'is he available',
    ])
  ) {
    return out(
      `Sukhvant is listed as ${profileData.status.toLowerCase()} and available worldwide / remote.`,
      ['About', 'Contact']
    );
  }

  if (
    has(q, [
      'from india',
      'in india',
      'indian',
      'nationality',
      'country',
      'country of origin',
    ])
  ) {
    return out(
      "The current professional portfolio does not explicitly record Sukhvant's nationality or country of origin, so I wouldn't want to invent that detail. It does list him as available worldwide / remote.",
      ['About']
    );
  }

  // -----------------------------------------------------------------------
  // CONTEXTUAL FOLLOW-UP
  // -----------------------------------------------------------------------

  if (q === 'why' || q === 'why?') {
    if (has(previous, ['hire', 'candidate', 'fit'])) {
      return out(
        "Because Sukhvant combines strong TypeScript full-stack development with production SaaS experience and hands-on AI engineering. His background spans React/Next.js, Node.js, PostgreSQL, APIs, AI workflows, Agents and MCP, giving him the breadth to contribute across a modern product rather than only one layer.",
        ['About', 'Experience', 'AI Engineering', 'Technical Skills']
      );
    }

    if (has(previous, ['brownfleet'])) {
      return out(
        "At Brownfleet, the strongest part of Sukhvant's work was combining full-stack product engineering with AI workflows and MCP integrations in production SaaS systems.",
        ['Brownfleet Experience', 'AI Engineering']
      );
    }

    if (has(previous, ['docker'])) {
      return out(
        "Docker matters here because it complements his backend, API and deployment experience and gives him a practical foundation for containerized development environments.",
        ['Technical Skills', 'Experience']
      );
    }

    if (has(previous, ['aws', 'cloud'])) {
      return out(
        "The reason I would view the AWS transition positively is that his backend, Docker, API and deployment experience already covers several adjacent concepts used in cloud environments.",
        ['Technical Skills', 'Experience']
      );
    }
  }

  if (
    has(q, [
      'there',
      'his work',
      'what he did',
      'what did he do',
      'what was his role there',
      'what was he doing there',
    ]) &&
    has(previous, ['brownfleet'])
  ) {
    return out(
      "At Brownfleet, Sukhvant worked as a Full Stack Developer for the recorded 2-year full-time period. He built SaaS features with Next.js and TypeScript, integrated AI workflows, LLM endpoints and MCP tooling, designed PostgreSQL models and REST APIs, and contributed to product engineering and performance work.",
      ['Brownfleet Experience', 'AI Engineering']
    );
  }

  if (
    has(q, [
      'after that',
      'after brownfleet',
      'what did he do after brownfleet',
      'what came after brownfleet',
      'what happened after brownfleet',
    ]) ||
    (q.includes('after') && previous.includes('brownfleet'))
  ) {
    return out(
      "After Brownfleet, the next recorded experience is Sukhvant's freelance/self-employed Full Stack Developer work, where he built end-to-end web applications and digital platforms for business, travel, non-profit, e-commerce and marketing clients.",
      ['Experience'],
      'navigate-experience'
    );
  }

  if (
    (has(q, [
      'before that',
      'before brownfleet',
      'what did he do before brownfleet',
      'what came before brownfleet',
    ]) ||
      q.includes('before')) &&
    previous.includes('brownfleet')
  ) {
    return out(
      "Before Brownfleet, the recorded experience in Sukhvant's portfolio is his OSCARBLACK Front-End Developer internship. That work focused on responsive interfaces, HTML/CSS, JavaScript, frontend optimization and accessibility.",
      ['OSCARBLACK Internship', 'Experience'],
      'navigate-experience'
    );
  }

  // -----------------------------------------------------------------------
  // EXPERIENCE
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'professional experience',
      'work experience',
      'where did he work',
      'where did he worked',
      'where has he worked',
      'where does he work',
      'employer',
      'employers',
      'career history',
      'career background',
      'worked where',
      'has he worked',
      'did he work',
    ]) ||
    q === 'experience'
  ) {
    return out(
      'Yes. Sukhvant has professional experience across three recorded engagements: Brownfleet as a Full Stack Developer for 2 years, freelance/self-employed full-stack work, and an OSCARBLACK Front-End Developer internship. His experience spans production web applications, SaaS, backend systems, responsive interfaces, APIs, databases and AI integrations.',
      ['Experience', 'Brownfleet Experience', 'OSCARBLACK Internship'],
      'navigate-experience'
    );
  }

  if (
    has(q, [
      'how long at brownfleet',
      'how long did he work at brownfleet',
      'years at brownfleet',
      'duration at brownfleet',
      'brownfleet duration',
    ])
  ) {
    return out(
      "Sukhvant's recorded Brownfleet experience is Full Time / 2 Years as a Full Stack Developer.",
      ['Brownfleet Experience']
    );
  }

  if (q.includes('brownfleet')) {
    return out(
      "Brownfleet was a company where Sukhvant worked as a Full Stack Developer for the recorded 2-year full-time period. His work focused on scalable AI-powered SaaS solutions and full-stack web applications. He worked with Next.js, TypeScript, Node.js, PostgreSQL, APIs, AI workflows, LLM endpoints and Model Context Protocol (MCP). His responsibilities included building SaaS features, integrating AI and MCP tooling into production services, designing PostgreSQL models and REST APIs, and contributing to product engineering and performance work.",
      ['Brownfleet Experience', 'AI Engineering'],
      'navigate-experience'
    );
  }

  if (
    has(q, [
      'how many years of experience',
      'years of experience',
      'experience level',
      'how experienced is he',
      'does he have 2 years',
    ])
  ) {
    return out(
      "The portfolio records a 2-year full-time role at Brownfleet plus freelance/self-employed and internship experience. I wouldn't convert the mixed timelines into a larger number than the records explicitly support, but the profile clearly shows production experience across frontend, backend, SaaS and AI work.",
      ['Experience']
    );
  }

  // -----------------------------------------------------------------------
  // AI / MCP
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'ai experience',
      'ai mcp',
      'ai & mcp',
      'ai and mcp',
      'mcp experience',
      'ai engineering',
      'ai engineering experience',
      'ai work',
      'what has he done with ai',
      'what has he done with mcp',
      'worked with mcp',
      'llm experience',
      'ai agents',
      'agent experience',
      'what ai technologies',
      'does he know mcp',
      'has he worked with ai',
      'does he have ai experience',
      'ai background',
    ])
  ) {
    return out(
      "Sukhvant has hands-on experience building AI-powered SaaS systems and integrating AI workflows into full-stack applications. His recorded AI work includes LLM APIs, AI agents, context-aware workflows and Model Context Protocol (MCP), including connecting AI capabilities with tools and production services. At Brownfleet, he worked with Next.js, TypeScript, Node.js, PostgreSQL and APIs alongside AI and MCP integrations. His AI experience is focused on integrating AI into real software products, not just adding a chatbot UI.",
      ['AI Engineering', 'AI-Powered SaaS Platform', 'Brownfleet Experience'],
      'navigate-ai'
    );
  }

  // -----------------------------------------------------------------------
  // SKILLS / TECHNOLOGIES
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'strongest technical skills',
      'strongest skills',
      'his skills',
      'what are his skills',
      'technical skills',
      'tech stack',
      'technology stack',
      'what technologies does he know',
      'what is he best at',
      'is he good at',
      'is he good in',
      'what is his strongest technology',
    ])
  ) {
    return out(
      "Sukhvant's strongest foundation is TypeScript-based full-stack development: React and Next.js on the frontend, Node.js and Express on the backend, with PostgreSQL and other databases underneath. He also has hands-on AI experience with LLM APIs, AI Agents and MCP, supported by Docker, Git and Linux/Bash. His portfolio connects these skills to real SaaS, AI and commercial projects.",
      ['Technical Skills', 'Projects', 'AI Engineering'],
      'navigate-skills'
    );
  }

  if (q.includes('docker') || q.includes('container')) {
    return out(
      "Yes. Docker is part of Sukhvant's technical skill set. Combined with his Node.js services, APIs, databases, deployment workflows and production SaaS experience, it supports a practical understanding of containerized development and deployment environments.",
      ['Technical Skills', 'Experience'],
      'navigate-skills'
    );
  }

  if (q.includes('postgresql') || q.includes('postgres')) {
    return out(
      "Yes. PostgreSQL is part of Sukhvant's backend/database skill set and appears in both his professional experience and projects. He has worked with PostgreSQL models, relational application data, REST APIs and production SaaS systems.",
      ['Technical Skills', 'Brownfleet Experience', 'AI-Powered SaaS Platform'],
      'navigate-skills'
    );
  }

  if (q.includes('react')) {
    return out(
      "Yes. React is one of Sukhvant's core frontend technologies and appears across multiple production projects and full-stack work.",
      ['Technical Skills', 'Projects'],
      'navigate-skills'
    );
  }

  if (
    q.includes('next js') ||
    q.includes('nextjs') ||
    q.includes('next.js') ||
    q.includes('next')
  ) {
    return out(
      "Yes. Next.js is one of Sukhvant's strongest technologies. He uses it across full-stack and frontend architectures, including SaaS, job-platform and AI product work.",
      ['Technical Skills', 'Projects'],
      'navigate-skills'
    );
  }

  if (q.includes('typescript')) {
    return out(
      "Yes. TypeScript is a central part of Sukhvant's engineering stack across React/Next.js frontend work, Node.js backend services and production SaaS systems.",
      ['Technical Skills', 'Projects', 'Experience'],
      'navigate-skills'
    );
  }

  if (q.includes('linux') || q.includes('bash')) {
    return out(
      "Yes. Linux/Bash is part of Sukhvant's tooling profile and fits his broader developer-workstation, backend and deployment experience.",
      ['Technical Skills']
    );
  }

  if (q.includes('git')) {
    return out(
      "Yes. Git is part of Sukhvant's engineering tooling and is used across his development workflow and production projects.",
      ['Technical Skills']
    );
  }

  // -----------------------------------------------------------------------
  // TRANSFERABLE SKILL GAPS
  // -----------------------------------------------------------------------

  if (
    q.includes('android') ||
    q.includes('ios') ||
    q.includes('mobile') ||
    q.includes('react native')
  ) {
    return out(
      "Direct professional Android or iOS development isn't specifically recorded in Sukhvant's portfolio. However, his strong React, TypeScript, JavaScript, frontend architecture and API experience gives him a solid foundation for moving into mobile development, including a React Native-style stack. His existing frontend/full-stack background should make that transition relatively approachable.",
      ['Technical Skills']
    );
  }

  if (q.includes('aws') || q.includes('cloud')) {
    return out(
      "AWS isn't specifically listed in Sukhvant's recorded experience. However, his backend services, APIs, databases, Docker, deployment workflows and production SaaS experience give him a strong foundation for adapting to cloud environments such as AWS.",
      ['Technical Skills', 'Experience']
    );
  }

  for (const tech of [
    'python',
    'java',
    'flutter',
    'kubernetes',
    'spring boot',
    'angular',
    'vue',
    'golang',
    'go',
    'rust',
    'azure',
    'gcp',
    'php',
    'c#',
    'dotnet',
    '.net',
    'swift',
    'kotlin',
    'mongodb atlas',
  ]) {
    if (q.includes(tech)) {
      const label =
        tech === 'go'
          ? 'Go'
          : tech === 'c#'
          ? 'C#'
          : tech === 'dotnet' || tech === '.net'
          ? '.NET'
          : tech === 'gcp'
          ? 'GCP'
          : tech === 'azure'
          ? 'Azure'
          : tech
              .split(' ')
              .map(
                (part) => part.charAt(0).toUpperCase() + part.slice(1)
              )
              .join(' ');

      return out(
        `${label} is not specifically listed in Sukhvant's recorded skills. However, his broad TypeScript/JavaScript full-stack background, backend/API experience and work across production architectures give him a strong foundation for learning and adapting to a new stack. I would describe that as transferable capability rather than existing professional ${label} experience.`,
        ['Technical Skills', 'Experience']
      );
    }
  }

  // -----------------------------------------------------------------------
  // HIRING / ROLE FIT
  // -----------------------------------------------------------------------

  const hireQuestion = has(q, [
    'why should i hire',
    'why hire',
    'why should we hire',
    'good candidate',
    'good fit',
    'fit for this role',
    'would he fit',
    'is he suitable',
    'should i hire him',
    'should we hire him',
    'hire him',
    'worth hiring',
    'would you hire him',
    'should i hire',
    'is he a good candidate',
    'is he a good fit',
  ]);

  if (hireQuestion) {
    return out(
      "Based on the portfolio evidence, I would consider Sukhvant a strong candidate for roles that value end-to-end web engineering and AI-enabled product development. He combines TypeScript full-stack work with production SaaS experience and hands-on AI engineering across agents, LLM workflows and MCP. That breadth lets him contribute across frontend, backend, database and AI layers, while his project history shows practical product-building rather than only isolated technical exercises.",
      ['About', 'Experience', 'Projects', 'AI Engineering', 'Technical Skills']
    );
  }

  if (
    q.includes('leadership') ||
    q.includes('team lead') ||
    q.includes('management')
  ) {
    return out(
      "The portfolio does not document a formal people-management or team-lead title. What it does show is end-to-end product engineering across frontend, backend, databases, APIs, AI integrations and deployment, which suggests strong technical ownership and a foundation for growing into greater technical leadership.",
      ['Experience', 'Projects', 'Technical Skills']
    );
  }

  if (
    q.includes('senior') ||
    q.includes('junior') ||
    q.includes('mid level') ||
    q.includes('midlevel')
  ) {
    return out(
      "Sukhvant's portfolio positions him as a Full Stack Developer & AI Engineer with production SaaS and AI experience. Formal seniority is not explicitly stated, but the breadth across frontend, backend, databases, APIs and AI systems suggests he can take meaningful end-to-end engineering ownership.",
      ['About', 'Experience', 'Technical Skills']
    );
  }

  // -----------------------------------------------------------------------
  // PROJECTS
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'featured projects',
      'what projects',
      'his projects',
      'projects',
      'what has he built',
      'what did he build',
    ])
  ) {
    return out(
      "Sukhvant's featured work includes the AI-Powered SaaS Platform, Invoice Builder SaaS, CareerLooms and commercial client platforms. Together they demonstrate AI engineering, full-stack SaaS development, frontend architecture, backend APIs, databases, payments and production product engineering.",
      ['Projects'],
      'navigate-projects'
    );
  }

  if (q.includes('ai powered saas') || q.includes('ai saas')) {
    return out(
      "The AI-Powered SaaS Platform is a context-aware intelligence platform built with Next.js, TypeScript, Node.js, PostgreSQL, AI APIs, AI Agents and MCP. It includes multi-agent tool orchestration, MCP connectors, structured outputs, real-time streaming and tenant-aware database isolation.",
      ['AI-Powered SaaS Platform', 'AI Engineering'],
      'navigate-ai'
    );
  }

  if (q.includes('invoice builder') || q.includes('invoice')) {
    return out(
      "Invoice Builder SaaS is a full-stack subscription product built with Next.js, TypeScript, Supabase, PostgreSQL and Stripe. It includes a real-time invoice builder, authentication, multi-tenant profiles, Stripe subscriptions/webhooks, revenue analytics and PDF/email delivery workflows.",
      ['Invoice Builder SaaS', 'Projects'],
      'navigate-projects'
    );
  }

  if (q.includes('careerlooms')) {
    return out(
      "CareerLooms is a high-performance job portal built with Next.js, Firebase, TypeScript and Tailwind CSS, focused on fast search/filtering, SEO-friendly job pages, real-time application tracking and mobile accessibility.",
      ['CareerLooms', 'Projects'],
      'navigate-projects'
    );
  }

  if (
    has(q, [
      'most advanced project',
      'strongest ai project',
      'best ai project',
      'most complex project',
      'most impressive project',
    ])
  ) {
    return out(
      "Based on the documented architecture and feature scope, the AI-Powered SaaS Platform appears to demonstrate the broadest engineering scope because it combines full-stack application architecture with AI agents, LLM workflows and MCP tool integration.",
      ['AI-Powered SaaS Platform', 'Projects', 'AI Engineering']
    );
  }

  // -----------------------------------------------------------------------
  // PERSONAL-INTEREST INFERENCE
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'love coding',
      'likes coding',
      'like coding',
      'passionate about coding',
      'enjoy coding',
      'does he code a lot',
      'interested in coding',
      'does he like coding',
      'is he interested in coding',
    ])
  ) {
    return out(
      "The profile doesn't formally use the phrase \"I love coding,\" but based on the sustained work documented across full-stack applications, SaaS products, AI engineering and continuous use of modern development technologies, I'd say software development is clearly a major professional interest for Sukhvant.",
      ['About', 'Projects', 'AI Engineering']
    );
  }

  if (
    has(q, [
      'hobby',
      'hobbies',
      'favorite food',
      'favourite food',
      'football',
      'favorite sport',
      'favourite sport',
      'favorite movie',
      'music',
      'favorite game',
    ])
  ) {
    return out(
      "That personal detail isn't covered by Sukhvant's current verified portfolio knowledge, so I wouldn't want to invent an answer. I can tell you about his professional interests, engineering work, projects and AI experience instead.",
      ['About', 'Experience', 'Projects']
    );
  }

  // -----------------------------------------------------------------------
  // SALARY / UNSUPPORTED CLAIMS
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'salary',
      'ctc',
      'compensation',
      'expected salary',
      'current salary',
      'notice period',
      'current pay',
      'expected pay',
    ])
  ) {
    return out(
      "That specific detail is not included in Sukhvant's verified portfolio knowledge, so I wouldn't want to guess. For hiring discussions, the portfolio provides his experience, skills, projects, availability and contact channels.",
      ['Experience', 'Technical Skills', 'Contact']
    );
  }

  // -----------------------------------------------------------------------
  // GENERAL POSITIVE INFERENCE
  // -----------------------------------------------------------------------

  if (
    has(q, [
      'can he learn',
      'can he adapt',
      'can he switch',
      'can he move into',
      'would he be able to learn',
      'can he handle a new stack',
      'can he learn this',
      'can he pick this up',
      'can he transition',
    ])
  ) {
    return out(
      "Based on the breadth of Sukhvant's existing frontend, backend, API, database and AI experience, he has a strong foundation for adapting to adjacent technologies. I would treat that as a positive professional inference rather than claiming prior experience with a technology that isn't listed.",
      ['About', 'Experience', 'Technical Skills']
    );
  }

  // -----------------------------------------------------------------------
  // SAFE FINAL FALLBACK
  // -----------------------------------------------------------------------

  return out(
    "I don't have enough information in Sukhvant's verified portfolio knowledge to answer that specifically. I can still help with his experience, projects, technical skills, AI engineering, engineering approach, role fit, availability, resume, or contact details.",
    ['About', 'Experience', 'Projects', 'Skills']
  );
}

/**
 * Main AI query function.
 *
 * Important design rule:
 * Any clear question that appears to be about Sukhvant or his professional
 * profile goes through the verified local knowledge engine first.
 *
 * Gemini is used only for less obvious wording/questions.
 */
export async function querySukhvantAI(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<AIResponsePayload> {
  const q = normalizeQuery(message);

  /*
   * IMPORTANT:
   * Keep this list broad enough that a recruiter question about Sukhvant
   * cannot accidentally get routed to generic Gemini fallback.
   */
  const known =
    greeting(message.trim()) ||
    acknowledgement(message.trim()) ||
    /^(resume|resume\?)$/i.test(message.trim()) ||
    has(q, [
      // Direct identity / profile
      'sukhvant',
      'sukhvant singh',
      'him',
      'his',
      'he',
      'about him',
      'about me',
      'profile',
      'profile summary',
      'summary',
      'overview',
      'who is he',
      'who is sukhvant',

      // Contact
      'github',
      'linkedin',
      'email',
      'contact',

      // Experience
      'brownfleet',
      'experience',
      'worked',
      'work experience',
      'professional experience',
      'employer',
      'employers',
      'career',
      'before',
      'after',

      // Skills / technology
      'docker',
      'android',
      'ios',
      'mobile',
      'aws',
      'cloud',
      'ai',
      'mcp',
      'llm',
      'agent',
      'react',
      'next',
      'typescript',
      'postgres',
      'linux',
      'bash',
      'git',
      'python',
      'java',
      'flutter',
      'kubernetes',
      'spring boot',
      'angular',
      'vue',
      'golang',
      'go',
      'rust',
      'azure',
      'gcp',
      '.net',
      'dotnet',
      'kotlin',
      'swift',

      // Projects
      'projects',
      'project',
      'built',
      'saas',
      'invoice',
      'careerlooms',

      // Hiring
      'hire',
      'candidate',
      'fit',
      'suitable',
      'leadership',
      'senior',
      'junior',
      'mid level',
      'midlevel',

      // Personal-interest inference
      'coding',
      'hobby',
      'football',
      'music',

      // Hiring boundaries / logistics
      'salary',
      'ctc',
      'compensation',
      'remote',
      'available',
      'availability',
      'notice period',

      // Location
      'india',
      'nationality',
      'country',
      'location',
    ]);

  if (known) {
    return localAnswer(message, conversationHistory);
  }

  /*
   * Gemini is still available for less obvious wording.
   * The conversation history is sent so Gemini can resolve natural
   * follow-up language, but the response is still normalized before display.
   */
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    return {
      reply: clean(data.reply || 'No response received.'),
      sources: data.sources || [],
      source: data.source || 'gemini-2.5-flash',
      action: data.action,
    };
  } catch (error) {
    console.warn('Sukhvant AI fallback:', error);
    return localAnswer(message, conversationHistory);
  }
}