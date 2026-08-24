import { ChatMessage } from '../types';
import { profileData } from '../data/profile';
import { experienceData } from '../data/experience';
import { projectsData } from '../data/projects';
import { skillsRecord, socialsData } from '../data/skills';

export interface AIResponsePayload {
  reply: string;
  sources?: string[];
  source?: string;
  action?: 'open-resume' | 'open-github' | 'open-linkedin' | 'open-contact' | 'navigate-projects' | 'navigate-experience' | 'navigate-skills' | 'navigate-ai' | 'navigate-about';
}

function normalizeAIResponse(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/^```[^\n]*\n?/, '').replace(/```$/, '').trim())
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, '• ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function hasAny(text: string, patterns: string[]) {
  return patterns.some((pattern) => text.includes(pattern));
}

function isAcknowledgement(text: string) {
  return /^(great|good|nice|perfect|awesome|excellent|interesting|got it|okay|ok|thanks|thank you|thx|cool)[!,.\s]*$/i.test(text);
}

function getLastTopic(history: ChatMessage[]) {
  return history.slice().reverse().find((message) => message.role === 'assistant' && message.content)?.content.toLowerCase() || '';
}

function response(reply: string, sources: string[], action?: AIResponsePayload['action']): AIResponsePayload {
  return { reply, sources, action, source: 'verified-knowledge-engine' };
}

function experienceSummary() {
  return experienceData.map((item) => `${item.company} — ${item.role} — ${item.period}`).join(' | ');
}

function getLocalKnowledgeAnswer(message: string, conversationHistory: ChatMessage[] = []): AIResponsePayload {
  const lower = message.toLowerCase().trim();
  const previous = getLastTopic(conversationHistory);

  // Conversation layer
  if (/^(hi|hello|hey|hii|good morning|good afternoon|good evening|how are you)[!,.\s]*$/i.test(lower)) {
    return response("Hi! I'm Sukhvant AI. I can help you review Sukhvant's professional experience, projects, technical skills, AI/MCP work, engineering approach, resume, or role fit.", ['About', 'Experience', 'Projects', 'Skills', 'AI Engineering', 'Resume'], 'navigate-about');
  }
  if (isAcknowledgement(lower)) {
    return response(lower.includes('thank') || lower === 'thx'
      ? "You're welcome. Let me know what you'd like to explore about Sukhvant."
      : "Glad that helps. I can also walk you through Sukhvant's projects, strongest technical areas, AI engineering work, experience, or potential fit for a role.", ['About', 'Experience', 'Projects']);
  }

  // Action / navigation intents
  if (hasAny(lower, ['open resume', 'show resume', 'show his resume', 'view resume', 'download resume', 'open cv', 'show cv']) || lower === 'resume' || lower === 'resume?') {
    return response("Sukhvant's resume covers his Full Stack Developer and AI Engineer experience, including Brownfleet, freelance/self-employed work, his OSCARBLACK internship, projects, and core technical skills.", ['Resume'], 'open-resume');
  }
  if (hasAny(lower, ['open github', 'show github', 'his github', 'github profile', 'github repos', 'github repositories'])) {
    return response(`Sukhvant's GitHub profile is ${socialsData.github.replace('https://', '')}. It contains his public repositories and engineering work.`, ['GitHub'], 'open-github');
  }
  if (hasAny(lower, ['open linkedin', 'show linkedin', 'his linkedin', 'linkedin profile', 'linkedin'])) {
    return response(`Sukhvant's LinkedIn profile is ${socialsData.linkedin.replace('https://', '')}. You can use it to review his professional profile and connect with him.`, ['LinkedIn'], 'open-linkedin');
  }
  if (hasAny(lower, ['contact info', 'contact information', 'how can i contact', 'how do i contact', 'reach him', 'reach sukhvant', 'contact sukhvant', 'contact details'])) {
    return response(`The easiest way to contact Sukhvant is by email at ${profileData.contactEmail}. His portfolio also provides direct GitHub and LinkedIn channels.`, ['Contact', 'GitHub', 'LinkedIn'], 'open-contact');
  }
  if (lower.includes('email') || lower.includes('e-mail') || lower.includes('mail address')) {
    return response(`Sukhvant's professional email is ${profileData.contactEmail}. It can be used for job opportunities, engineering roles, AI product work, or software development inquiries.`, ['Contact'], 'open-contact');
  }
  if (hasAny(lower, ['open projects', 'show projects', 'his projects', 'show me his projects', 'projects section'])) {
    return response("Sukhvant's featured projects span AI engineering, full-stack SaaS, frontend architecture, and client platforms.", ['Projects'], 'navigate-projects');
  }
  if (hasAny(lower, ['open experience', 'show experience', 'his experience', 'experience section'])) {
    return response("Sukhvant's recorded experience includes Brownfleet, freelance/self-employed full-stack work, and an OSCARBLACK frontend internship.", ['Experience'], 'navigate-experience');
  }
  if (hasAny(lower, ['open skills', 'show skills', 'his skills', 'skills section'])) {
    return response("Sukhvant's strongest technical areas are TypeScript-based frontend/full-stack development, backend systems, databases, and AI engineering.", ['Technical Skills'], 'navigate-skills');
  }
  if (hasAny(lower, ['open ai engineering', 'show ai engineering', 'ai engineering section', 'open mcp'])) {
    return response("Sukhvant's AI engineering work includes LLM APIs, AI agents, AI workflows and Model Context Protocol (MCP).", ['AI Engineering'], 'navigate-ai');
  }

  // Profile overview / recruiter summary
  if (hasAny(lower, ['tell me about sukhvant', 'about sukhvant', 'quick summary', 'brief summary', '30 second summary', 'summarize sukhvant', 'what should i know about him']) || lower === 'who is sukhvant') {
    return response(`${profileData.name} is a ${profileData.title} focused on modern web applications, SaaS products and AI-powered experiences. His strongest foundation is TypeScript full-stack engineering across React/Next.js, Node.js and PostgreSQL, with additional hands-on work in AI agents and MCP. His recorded experience includes Brownfleet, freelance/self-employed development and an OSCARBLACK frontend internship.`, ['About', 'Experience', 'Technical Skills', 'AI Engineering']);
  }

  // Experience / timeline
  if (hasAny(lower, ['professional experience', 'work experience', 'where did he work', 'where did he worked', 'where has he worked', 'where does he work', 'employer', 'employers', 'career history', 'career background']) || lower === 'experience') {
    return response(`Yes. Sukhvant has professional experience across three recorded engagements: Brownfleet as a Full Stack Developer for 2 years, freelance/self-employed full-stack work, and an OSCARBLACK Front-End Developer internship. His experience spans production web applications, SaaS, backend systems, responsive interfaces, APIs, databases and AI integrations.`, ['Experience', 'Brownfleet Experience', 'OSCARBLACK Internship']);
  }
  if (hasAny(lower, ['after brownfleet', 'what did he do after brownfleet', 'what did he do after that']) || (lower.includes('after') && previous.includes('brownfleet'))) {
    const index = experienceData.findIndex((item) => item.id === 'brownfleet');
    const next = index >= 0 ? experienceData[index + 1] : undefined;
    return next
      ? response(`After Brownfleet, the next recorded experience in Sukhvant's portfolio is ${next.company} as a ${next.role}. ${next.summary}`, ['Experience'], 'navigate-experience')
      : response("I don't have a later recorded experience after Brownfleet in the verified portfolio data.", ['Experience']);
  }
  if ((lower.includes('there') || lower.includes('he did') || lower.includes('his work')) && previous.includes('brownfleet')) {
    return response("At Brownfleet, Sukhvant worked as a Full Stack Developer for the recorded 2-year full-time period. His work included architecting SaaS features with Next.js and TypeScript, integrating AI workflows and MCP tooling, designing PostgreSQL models and REST APIs, and contributing to product engineering, performance profiling and deployment workflows.", ['Brownfleet Experience', 'AI Engineering']);
  }
  if (lower.includes('brownfleet')) {
    return response("Brownfleet was a company where Sukhvant worked as a Full Stack Developer for the recorded 2-year full-time period. His work focused on scalable AI-powered SaaS solutions and full-stack web applications. He worked with Next.js, TypeScript, Node.js, PostgreSQL, APIs, AI workflows, LLM endpoints and Model Context Protocol (MCP). His responsibilities included building SaaS features, integrating AI and MCP tooling into production services, designing PostgreSQL models and REST APIs, and contributing to product engineering and performance work.", ['Brownfleet Experience', 'AI Engineering'], 'navigate-experience');
  }

  // AI / MCP
  if (hasAny(lower, ['ai experience', 'ai & mcp', 'ai and mcp', 'mcp experience', 'ai engineering', 'ai engineering experience', 'ai work', 'what has he done with ai', 'what has he done with mcp', 'worked with mcp', 'llm experience', 'ai agents', 'agent experience'])) {
    return response("Sukhvant has hands-on experience building AI-powered SaaS systems and integrating AI workflows into full-stack applications. His recorded AI work includes LLM APIs, AI agents, context-aware workflows and Model Context Protocol (MCP), including connecting AI capabilities with tools and production services. At Brownfleet, he worked with Next.js, TypeScript, Node.js, PostgreSQL and APIs alongside AI and MCP integrations. His AI experience is therefore focused on integrating AI into real software products, not just adding a chatbot UI.", ['AI Engineering', 'AI-Powered SaaS Platform', 'Brownfleet Experience'], 'navigate-ai');
  }

  // Skills / technology
  if (hasAny(lower, ['strongest technical skills', 'strongest skills', 'his skills', 'what are his skills', 'technical skills', 'tech stack', 'technology stack', 'what technologies does he know', 'what is he best at'])) {
    return response("Sukhvant's strongest foundation is TypeScript-based full-stack development: React and Next.js on the frontend, Node.js and Express on the backend, with PostgreSQL and other databases underneath. He also has hands-on AI experience with LLM APIs, AI Agents and MCP, supported by Docker, Git and Linux/Bash. His portfolio connects these skills to real SaaS, AI and commercial projects.", ['Technical Skills', 'Projects', 'AI Engineering'], 'navigate-skills');
  }
  if (lower.includes('docker') || lower.includes('container')) {
    return response("Yes. Docker is part of Sukhvant's technical skill set. Combined with his Node.js services, APIs, databases, deployment workflows and production SaaS experience, it supports a practical understanding of containerized development and deployment environments.", ['Technical Skills', 'Experience'], 'navigate-skills');
  }
  if (lower.includes('postgresql') || lower.includes('postgres')) return response("Yes. PostgreSQL is part of Sukhvant's backend/database skill set and appears in both his professional experience and projects. He has worked with PostgreSQL models, relational application data, REST APIs and production SaaS systems.", ['Technical Skills', 'Brownfleet Experience', 'AI-Powered SaaS Platform'], 'navigate-skills');
  if (lower.includes('react')) return response("Yes. React is one of Sukhvant's core frontend technologies. His profile positions React alongside Next.js and TypeScript, and those technologies appear across multiple production projects and full-stack work.", ['Technical Skills', 'Projects'], 'navigate-skills');
  if (lower.includes('next.js') || lower.includes('nextjs')) return response("Yes. Next.js is one of Sukhvant's strongest technologies. He uses it across full-stack and frontend architectures, including SaaS, job-platform and AI product work.", ['Technical Skills', 'Projects'], 'navigate-skills');
  if (lower.includes('typescript')) return response("Yes. TypeScript is a central part of Sukhvant's engineering stack. His profile repeatedly uses it across React/Next.js frontend work, Node.js backend services and production SaaS systems.", ['Technical Skills', 'Projects', 'Experience'], 'navigate-skills');

  // Transferable skill gaps
  if (lower.includes('android') || lower.includes('ios') || lower.includes('mobile') || lower.includes('react native')) {
    return response("Direct professional Android or iOS development isn't specifically recorded in Sukhvant's portfolio. However, his strong React, TypeScript, JavaScript, frontend architecture and API experience gives him a solid foundation for moving into mobile development, including a React Native-style stack. His existing frontend/full-stack background should make that transition relatively approachable.", ['Technical Skills']);
  }
  if (lower.includes('aws') || lower.includes('cloud')) {
    return response("AWS isn't specifically listed in Sukhvant's recorded experience. However, his backend services, APIs, databases, Docker, deployment workflows and production SaaS experience give him a strong foundation for adapting to cloud environments such as AWS.", ['Technical Skills', 'Experience']);
  }
  if (lower.includes('python') || lower.includes('java') || lower.includes('flutter') || lower.includes('kubernetes') || lower.includes('spring boot')) {
    const tech = lower.includes('python') ? 'Python' : lower.includes('java') ? 'Java' : lower.includes('flutter') ? 'Flutter' : lower.includes('kubernetes') ? 'Kubernetes' : 'Spring Boot';
    return response(`${tech} is not specifically listed in Sukhvant's recorded skills. However, his broad TypeScript/JavaScript full-stack background, backend/API experience and ability to work across production architectures give him a strong foundation for learning and adapting to a new stack. I would describe that as transferable capability rather than existing professional ${tech} experience.`, ['Technical Skills', 'Experience']);
  }

  // Hiring / role fit
  if (hasAny(lower, ['why should i hire', 'why hire', 'why should we hire', 'good candidate', 'good fit', 'fit for this role', 'would he fit', 'is he suitable', 'can he work as', 'suitable for a react role', 'suitable for a frontend role', 'suitable for a backend role', 'suitable for ai role'])) {
    return response("Sukhvant brings a combination that is especially useful for modern product teams: strong TypeScript full-stack development, real production SaaS experience and hands-on AI engineering. His background spans React/Next.js, Node.js, PostgreSQL, APIs, AI workflows, Agents and MCP, so he can contribute across multiple layers of a product instead of being limited to one part of the stack. Based on that breadth, he should be a strong fit for roles that value end-to-end web engineering and AI-enabled product development.", ['About', 'Experience', 'Projects', 'AI Engineering', 'Technical Skills']);
  }
  if (lower.includes('leadership') || lower.includes('team lead') || lower.includes('management')) {
    return response("The portfolio does not document a formal people-management or team-lead title. What it does show is end-to-end product engineering across frontend, backend, databases, APIs, AI integrations and deployment, which suggests strong technical ownership and a foundation for growing into greater technical leadership.", ['Experience', 'Projects', 'Technical Skills']);
  }
  if (lower.includes('senior') || lower.includes('junior') || lower.includes('mid-level')) {
    return response("Sukhvant's portfolio positions him as a Full Stack Developer & AI Engineer with production SaaS and AI experience. Formal seniority is not explicitly stated, but the breadth across frontend, backend, databases, APIs and AI systems suggests he can take meaningful end-to-end engineering ownership.", ['About', 'Experience', 'Technical Skills']);
  }

  // Project questions
  if (hasAny(lower, ['featured projects', 'what projects', 'his projects', 'projects'])) {
    return response("Sukhvant's featured work includes the AI-Powered SaaS Platform, Invoice Builder SaaS, CareerLooms and commercial client platforms. Together they demonstrate AI engineering, full-stack SaaS development, frontend architecture, backend APIs, databases, payments and client-focused product engineering.", ['Projects'], 'navigate-projects');
  }
  const project = projectsData.find((item) => lower.includes(item.title.toLowerCase()) || lower.includes(item.id));
  if (project) {
    return response(`${project.title} is a ${project.category.toLowerCase()} project. ${project.description} Its documented stack includes ${project.stack.join(', ')}. The architecture is ${project.architectureSummary}.`, ['Projects']);
  }
  if (lower.includes('most advanced project') || lower.includes('most complex project') || lower.includes('best ai project')) {
    return response("Based on the scope documented in the portfolio, the AI-Powered SaaS Platform demonstrates the broadest engineering range because it combines full-stack application architecture with AI agents, LLM workflows, MCP tooling, PostgreSQL, structured tool execution and multi-tenant SaaS concerns. That's an evidence-based assessment rather than a formal ranking stated by Sukhvant.", ['AI-Powered SaaS Platform', 'Projects', 'AI Engineering']);
  }

  // Availability / location / fit
  if (lower.includes('available') || lower.includes('availability') || lower.includes('notice period')) return response(`Sukhvant's portfolio lists him as ${profileData.status.toLowerCase()} and available for ${profileData.availabilityBadge.replace('OPERATIONAL / READY FOR ', '').toLowerCase()}.`, ['About', 'Contact']);
  if (lower.includes('remote') || lower.includes('work remotely')) return response(`Yes. Sukhvant's profile lists ${profileData.location.toLowerCase()} and shows remote/hybrid experience across his recorded work.`, ['About', 'Experience']);
  if (lower.includes('where is he based') || lower.includes('location')) return response(`Sukhvant's profile lists his location as ${profileData.location}.`, ['About']);

  // Education / personal / salary boundary
  if (lower.includes('salary') || lower.includes('ctc') || lower.includes('expected salary') || lower.includes('current salary')) return response("Salary or CTC information is not part of Sukhvant's verified portfolio knowledge, so I wouldn't want to invent a number.", ['About']);
  if (lower.includes('love coding') || lower.includes('like coding') || lower.includes('passionate about coding')) return response("While the profile doesn't formally state the phrase \"I love coding,\" I'd say software development is clearly a major professional interest for Sukhvant. His sustained work across full-stack applications, SaaS products, AI engineering and modern development technologies strongly supports that interpretation.", ['About', 'Projects', 'AI Engineering']);
  if (lower.includes('hobby') || lower.includes('hobbies') || lower.includes('favorite food') || lower.includes('favourite food') || lower.includes('football')) return response("That's outside the personal information covered by Sukhvant's professional portfolio. I wouldn't want to invent a personal preference, but I can tell you about his engineering interests, projects, AI work and professional experience.", ['About', 'Experience']);

  // Generic recruiter-positive fallback; Gemini handles deeper natural questions.
  return response(`I can help with Sukhvant's experience, projects, technical skills, AI engineering, career fit, availability, resume, or contact details.`, ['About', 'Experience', 'Projects', 'Skills']);
}

export async function querySukhvantAI(message: string, conversationHistory: ChatMessage[] = []): Promise<AIResponsePayload> {
  const lower = message.toLowerCase().trim();
  const highConfidenceIntent =
    /^(hi|hello|hey|hii|good morning|good afternoon|good evening|how are you)[!,.\s]*$/i.test(lower) ||
    isAcknowledgement(lower) ||
    hasAny(lower, ['resume', 'cv', 'github', 'git hub', 'linkedin', 'contact', 'email', 'brownfleet', 'mcp', 'ai experience', 'ai engineering', 'ai work', 'ai agents', 'professional experience', 'work experience', 'docker', 'android', 'ios', 'mobile', 'aws', 'python', 'java', 'flutter', 'kubernetes', 'spring boot', 'why should i hire', 'why hire', 'good fit', 'good candidate', 'project', 'skill', 'remote', 'availability', 'salary', 'ctc', 'location', 'hobbies', 'football']);

  // High-confidence profile intents use the verified local knowledge layer first.
  if (highConfidenceIntent) return getLocalKnowledgeAnswer(message, conversationHistory);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversationHistory: conversationHistory.map(m => ({ role: m.role, content: m.content })) })
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const data = await res.json();
    return { reply: normalizeAIResponse(data.reply || 'No response received.'), sources: data.sources || [], source: data.source || 'gemini-2.5-flash' };
  } catch (error) {
    console.warn('API /api/chat error, using verified local fallback:', error);
    return getLocalKnowledgeAnswer(message, conversationHistory);
  }
}
