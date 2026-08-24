<div align="center">

# Sukhvant Singh — Full Stack Developer & AI Engineer

**A recruiter-first developer portfolio with a built-in AI representative.**

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-sukhvant.vercel.app-00FF66?style=for-the-badge&logo=vercel&logoColor=white)](https://sukhvant.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-SSukhvant-111111?style=for-the-badge&logo=github)](https://github.com/SSukhvant)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sukhvant%20Singh-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sukhvantsingh)

</div>

---

## `whoami`

This repository powers **Sukhvant Singh's personal developer portfolio** — designed to feel less like a traditional resume website and more like a **developer workstation built for recruiters**.

The visual language combines a **pure-black / white theme, terminal-inspired UI, Linux-style developer aesthetics, neon-green accents, and an AI orb** that acts as Sukhvant's portfolio representative.

The goal is simple:

> **Don't make a recruiter search for the information. Let the portfolio explain it.**

---

## `./features`

### ✦ Sukhvant AI

A portfolio-native AI assistant built specifically around Sukhvant's professional profile.

It can help recruiters explore:

- Professional experience
- Brownfleet experience
- Technical skills
- AI / LLM / Agents / MCP work
- Projects and architecture
- Resume
- GitHub and LinkedIn
- Contact information
- Availability and remote work
- Hiring fit and transferable skills

The AI is intentionally **not a generic ChatGPT clone**.

Its knowledge model follows three principles:

```text
VERIFIED FACT
    ↓
Answer confidently

SUPPORTED INFERENCE
    ↓
Explain the professional reasoning

NO RELIABLE EVIDENCE
    ↓
Don't invent — redirect honestly
```

That lets it answer questions such as:

> “Does Sukhvant know AWS?”

without falsely claiming AWS experience, while still explaining how his backend, Docker, API and deployment background can transfer to cloud engineering.

---

## `./portfolio`

The portfolio presents Sukhvant as a **Full Stack Developer & AI Engineer** with a focus on modern product engineering.

### Core areas

```text
Frontend
React · Next.js · TypeScript · JavaScript · Tailwind CSS

Backend
Node.js · Express · REST APIs

Data
PostgreSQL · MongoDB · MySQL · Supabase · Firebase

AI Engineering
LLM APIs · AI Agents · MCP · AI Workflows

Tooling
Docker · Git · GitHub · Linux · Bash
```

---

## `./selected-work`

### AI-Powered SaaS Platform

A context-aware intelligence platform combining full-stack architecture with AI agents, LLM workflows, MCP tooling, streaming and tenant-aware data isolation.

### Invoice Builder SaaS

A subscription SaaS product with invoice creation, authentication, Stripe billing, analytics, PostgreSQL-backed data and PDF/email workflows.

### CareerLooms

A high-performance job platform focused on searchable job listings, SEO-friendly pages, application workflows and responsive accessibility.

---

## `./recruiter-mode`

The portfolio is designed around a real hiring conversation rather than a static resume page.

Recruiters can ask things like:

```text
What are his strongest technical skills?

Tell me about Brownfleet.

What AI and MCP experience does he have?

Why should I hire Sukhvant?

Does he know Docker?

Can he move into Android development?

What is his GitHub?

Show me his resume.
```

The assistant can also understand contextual follow-ups such as:

```text
Tell me about Brownfleet.
→ What did he do there?
→ What AI work was involved?
→ What happened after Brownfleet?
```

---

## `./contact.sh`

The portfolio includes a real contact pipeline rather than a fake form submission flow.

```text
Recruiter
   ↓
React Contact Form
   ↓
/api/contact
   ↓
Resend
   ↓
Sukhvant's inbox
```

The API keeps the Resend credential on the server side and validates incoming contact data before dispatching the message.

For the current free/testing setup, Resend's testing sender can be used with the account email. A verified custom domain can be added later for production sender branding.

---

## `./stack`

| Layer | Technologies |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS, Lucide, Motion |
| Build | Vite |
| Server | Node.js, Express, TypeScript/TSX |
| AI | Google Gemini API |
| Email | Resend |
| Deployment | Vercel |
| Version Control | Git, GitHub |

---

## `./run-local`

### Prerequisites

- Node.js 18+
- npm
- Gemini API key
- Resend API key for contact-form email

### Install

```bash
npm install
```

### Environment

Create `.env` in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_recipient_email
EMAIL_FROM=Sukhvant Portfolio <onboarding@resend.dev>
```

Never commit `.env` or API keys to GitHub.

### Start development

```bash
npm run dev
```

The development server runs on:

```text
http://localhost:3000
```

---

## `./build`

```bash
npm run build
npm start
```

For Vercel, configure the required environment variables in the project settings before deploying.

---

## `./architecture`

```text
                    ┌─────────────────────┐
                    │   Recruiter / User  │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
        Portfolio Interface             Sukhvant AI Orb
                │                             │
                │                    Intent / Context
                │                             │
                │                             ▼
                │                    Verified Profile Data
                │                             │
                │                             ▼
                │                       Gemini Fallback
                │
                ▼
          Contact Form
                │
                ▼
          /api/contact
                │
                ▼
             Resend
                │
                ▼
          Sukhvant Inbox
```

The architecture keeps recruiter-facing interactions focused while protecting secrets on the server side.

---

## `./design-language`

The interface intentionally follows a **coder / Linux workstation aesthetic**:

- Pure black dark mode
- Clean white light mode
- Neon green system accents
- Terminal-inspired labels and commands
- Monospace technical typography
- AI orb as the central intelligence cue
- Subtle borders and system-console details
- Responsive layouts for desktop and mobile

The objective is to make the portfolio immediately recognizable as **an engineer's environment**, not another template-based portfolio.

---

## `./project-status`

```text
[████████████████████] PORTFOLIO      ONLINE
[████████████████████] AI RECRUITER   ONLINE
[████████████████████] CONTACT API    ONLINE
[████████████████░░░░] EMAIL PROD     EVOLVING
```

The portfolio is actively maintained as an engineering project, not just a presentation site.

---

## `./notes-for-contributors`

This repository began as an AI Studio-generated portfolio and has been progressively refined into a custom React application with a dedicated recruiter-oriented AI layer, backend API handling, rate limiting, contact delivery and production deployment support.

When changing the UI, preserve the core design language unless the change is explicitly intended to redesign the experience.

---

<div align="center">

### Built to be explored. Built to be hired.

**Sukhvant Singh · Full Stack Developer & AI Engineer**

</div>
