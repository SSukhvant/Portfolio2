import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { socialsData } from '../../data/skills';
import { Github, GitBranch, ArrowUpRight, Folder, Terminal } from 'lucide-react';

export const GithubStatusSection: React.FC = () => {
  const repositories = [
    {
      name: "invoice-builder-saas",
      description: "Full-stack subscription invoice generator with Supabase PostgreSQL and Stripe webhooks.",
      language: "TypeScript",
      branch: "main",
      stars: "Active",
      updated: "Recently updated"
    },
    {
      name: "ai-mcp-agent-platform",
      description: "Model Context Protocol (MCP) server integration for autonomous tool calling pipelines.",
      language: "TypeScript",
      branch: "main",
      stars: "Active",
      updated: "Recently updated"
    },
    {
      name: "careerlooms-frontend",
      description: "SEO-optimized job portal architecture with Next.js ISR and Firebase Firestore.",
      language: "TypeScript",
      branch: "main",
      stars: "Active",
      updated: "Production"
    }
  ];

  return (
    <section id="github" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06 / REPOSITORIES"
          title="VERSION CONTROL & GIT STATUS"
          subtitle="Direct GitHub integration and code repositories backing Sukhvant's portfolio."
          commandPrompt="git status --verbose"
        />

        <div className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl overflow-hidden shadow-xs dark:shadow-xl font-mono-tech text-xs mb-8">
          {/* Status Header */}
          <div className="bg-[#F0F0F0] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />
              <span className="font-medium text-[#111111] dark:text-[#FFFFFF]">git status</span>
              <span className="text-[#888888] dark:text-[#555555]">&bull;</span>
              <span className="text-[#00873D] dark:text-[#00FF66] font-mono text-xs">On branch main</span>
            </div>
            <a
              id="github-profile-link"
              href={socialsData.github}
              target="_blank"
              rel="noreferrer"
              className="bg-[#FFFFFF] dark:bg-[#121212] text-[#222222] dark:text-[#E5E5E5] hover:text-black dark:hover:text-white hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/40 border border-[#E5E7E5] dark:border-white/10 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-sans text-xs"
            >
              <Github className="w-3.5 h-3.5 text-[#666666] dark:text-[#8A8A8A]" />
              <span>Open GitHub Profile</span>
              <ArrowUpRight className="w-3 h-3 text-[#777777] dark:text-[#666666]" />
            </a>
          </div>

          {/* Terminal Diff Output */}
          <div className="p-5 sm:p-6 space-y-2 text-[#555555] dark:text-[#A3A3A3] leading-relaxed border-b border-[#E5E7E5] dark:border-[#151A15] font-mono">
            <div className="text-[#111111] dark:text-[#E5E5E5] flex items-center gap-2">
              <span className="text-[#00873D] dark:text-[#00FF66]">✓</span>
              <span>Your branch is up to date with &lsquo;origin/main&rsquo;.</span>
            </div>
            <div className="text-[#777777] dark:text-[#666666] text-xs">
              nothing to commit, working tree clean &bull; remote repositories synchronized
            </div>
          </div>

          {/* Repositories Cards */}
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {repositories.map((repo, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] dark:bg-[#0E0E0E] border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 rounded-xl p-4 flex flex-col justify-between transition-all group shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-[#111111] dark:text-white font-medium">
                      <Folder className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
                      <span className="truncate font-mono text-xs text-[#111111] dark:text-white group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors">{repo.name}</span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-[#555555] dark:text-[#8A8A8A] leading-relaxed mb-4 font-light">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7E5] dark:border-[#151A15] flex items-center justify-between text-[11px] text-[#777777] dark:text-[#666666] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]"></span>
                    <span className="text-[#333333] dark:text-[#A3A3A3]">{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#555555] dark:text-[#8A8A8A]">
                    <GitBranch className="w-3 h-3 text-[#00873D] dark:text-[#00FF66]" />
                    <span>{repo.branch}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
