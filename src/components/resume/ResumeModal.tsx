import React, { useEffect } from 'react';
import { X, Download, Terminal, Shield, Printer } from 'lucide-react';
import { profileData } from '../../data/profile';
import { experienceData } from '../../data/experience';
import { skillsRecord } from '../../data/skills';
import { projectsData } from '../../data/projects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FFFFFF] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-mono-tech text-[#111111] dark:text-[#E5E5E5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Terminal className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />
            <span className="font-medium text-[#111111] dark:text-white font-mono">$ cat ~/sukhvant/resume.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-print-btn"
              onClick={handlePrint}
              title="Print / Save as PDF"
              className="p-1.5 rounded-lg text-[#666666] dark:text-[#8A8A8A] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="resume-close-btn"
              onClick={onClose}
              title="Close (Esc)"
              className="p-1.5 rounded-lg text-[#666666] dark:text-[#8A8A8A] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-[#F0F0F0] dark:bg-[#0A0A0A] border-b border-[#E5E7E5] dark:border-[#151A15] px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#555555] dark:text-[#8A8A8A] font-mono">
            <Shield className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
            <span>Format: PDF / Document &bull; Status: <span className="text-[#00873D] dark:text-[#00FF66] font-medium">Verified Record</span></span>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="download-resume-pdf-btn"
              href="/resume.pdf"
              download="Sukhvant_Singh_Resume.pdf"
              className="bg-[#00FF66] text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-[#00D957] transition-all flex items-center gap-1.5 font-mono text-xs uppercase shadow-[0_0_10px_rgba(0,255,102,0.25)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>

        {/* Document Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed">
          
          {/* Header Summary */}
          <div className="border-b border-[#E5E7E5] dark:border-[#151A15] pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-editorial-serif text-[#111111] dark:text-white font-normal">
              SUKHVANT SINGH
            </h1>
            <div className="text-xs text-[#00873D] dark:text-[#00FF66] font-mono font-medium">
              Full Stack Developer & AI Engineer
            </div>
            <div className="text-[#666666] dark:text-[#8A8A8A] text-xs pt-1 font-mono">
              Email: {profileData.contactEmail} &bull; Availability: Full-Time / Contract Remote
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5 font-sans">
            <h3 className="font-mono text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-widest">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-[#555555] dark:text-[#A3A3A3] text-xs sm:text-sm font-light leading-relaxed">
              Full Stack Developer with deep proficiency across Next.js, React, TypeScript, Node.js, and PostgreSQL. Experienced in architecting context-aware AI agent pipelines using Model Context Protocol (MCP) and delivering production-ready commercial SaaS applications.
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-4 font-sans">
            <h3 className="font-mono text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-widest">
              WORK EXPERIENCE
            </h3>
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-1.5 bg-[#FAFAFA] dark:bg-[#0E0E0E] p-4 rounded-xl border border-[#E5E7E5] dark:border-[#151A15]">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                  <span className="font-medium text-[#111111] dark:text-white">{exp.company} — {exp.role}</span>
                  <span className="text-[#777777] dark:text-[#666666]">{exp.period}</span>
                </div>
                <p className="text-xs text-[#555555] dark:text-[#8A8A8A] pt-1 font-light">
                  {exp.summary}
                </p>
                <ul className="space-y-1 pt-1.5 text-xs text-[#555555] dark:text-[#8A8A8A] font-light">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#00873D] dark:text-[#00FF66] font-mono">&gt;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Core Projects */}
          <div className="space-y-3 font-sans">
            <h3 className="font-mono text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-widest">
              FEATURED PRODUCTION PROJECTS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectsData.map((proj) => (
                <div key={proj.id} className="p-3 bg-[#FAFAFA] dark:bg-[#0E0E0E] rounded-xl border border-[#E5E7E5] dark:border-[#151A15] space-y-1">
                  <div className="text-xs font-mono font-medium text-[#111111] dark:text-white">{proj.title}</div>
                  <div className="text-[11px] text-[#00873D] dark:text-[#00FF66] font-mono">{proj.stack.slice(0, 3).join(' • ')}</div>
                  <p className="text-xs text-[#555555] dark:text-[#8A8A8A] font-light">{proj.tagline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Clusters */}
          <div className="space-y-2 font-sans pt-2 border-t border-[#E5E7E5] dark:border-[#151A15]">
            <h3 className="font-mono text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-widest">
              CORE TECHNICAL SKILLS
            </h3>
            <div className="text-xs text-[#555555] dark:text-[#A3A3A3] space-y-1 font-mono">
              <div><strong className="text-[#111111] dark:text-white">Frontend:</strong> {skillsRecord.frontend.join(', ')}</div>
              <div><strong className="text-[#111111] dark:text-white">Backend:</strong> {skillsRecord.backend.join(', ')}</div>
              <div><strong className="text-[#111111] dark:text-white">Databases:</strong> {skillsRecord.database.join(', ')}</div>
              <div><strong className="text-[#111111] dark:text-white">AI & Agents:</strong> {skillsRecord.ai.join(', ')}</div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E5E7E5] dark:border-[#151A15] px-6 py-3.5 flex items-center justify-between text-xs font-mono">
          <span className="text-[#777777] dark:text-[#666666]">Official Profile Dossier &bull; Updated 2026</span>
          <button
            onClick={onClose}
            className="bg-[#00FF66] text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-[#00D957] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
