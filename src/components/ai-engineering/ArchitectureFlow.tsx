import React, { useState } from 'react';
import { User, Smartphone, Cpu, Wrench, Database, CheckCircle2 } from 'lucide-react';

interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

export const ArchitectureFlow: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('ai-agent');

  const nodes: ArchitectureNode[] = [
    {
      id: 'user',
      label: 'USER',
      sublabel: 'Intent / Query',
      icon: <User className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      description: 'End user submits a high-level command, unstructured data, or scheduled workflow trigger.',
      details: ['Natural language prompts', 'Event hooks', 'Web interface inputs']
    },
    {
      id: 'app',
      label: 'APPLICATION',
      sublabel: 'Next.js / TypeScript',
      icon: <Smartphone className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      description: 'Full-stack application validates authentication, enforces tenant boundaries, and formats system context.',
      details: ['Next.js App Router', 'Schema validation (Zod)', 'Session & Rate limit checks']
    },
    {
      id: 'ai-agent',
      label: 'AI AGENT',
      sublabel: 'Reasoning Engine',
      icon: <Cpu className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      description: 'LLM reasoning engine deconstructs tasks, verifies context, and decides which tools/MCP methods to invoke.',
      details: ['Task decomposition', 'Structured JSON output', 'Error recovery & retry loops']
    },
    {
      id: 'mcp-tools',
      label: 'TOOLS / MCP',
      sublabel: 'Model Context Protocol',
      icon: <Wrench className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      description: 'Standardized Model Context Protocol servers execute sandboxed tools and parameter verification safely.',
      details: ['Model Context Protocol (MCP)', 'External API connectors', 'Calculators & Vector search']
    },
    {
      id: 'api-database',
      label: 'DATABASE / API',
      sublabel: 'PostgreSQL / Supabase',
      icon: <Database className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      description: 'Transactional database reads/writes, Stripe webhook updates, or third-party web services.',
      details: ['PostgreSQL relational store', 'Stripe payment verification', 'Encrypted credentials']
    },
    {
      id: 'result',
      label: 'RESULT',
      sublabel: 'Verified Stream',
      icon: <CheckCircle2 className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      description: 'Synthesized, schema-compliant outcome streamed directly back to the UI with deterministic source evidence.',
      details: ['Real-time streaming UI', 'Action confirmation logs', 'Auditable evidence']
    }
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[2];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl p-5 sm:p-7 shadow-sm dark:shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E7E5] dark:border-[#151A15] pb-3">
        <div className="font-mono-tech text-xs text-[#111111] dark:text-white font-medium flex items-center gap-2 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] animate-pulse"></span>
          <span>CONTEXT-AWARE AGENT ARCHITECTURE PIPELINE</span>
        </div>
        <span className="text-[11px] font-mono-tech text-[#666666] dark:text-[#8A8A8A]">
          Click any step to inspect technical details
        </span>
      </div>

      {/* Responsive Step Flow Diagram */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {nodes.map((node, index) => {
          const isSelected = selectedNode === node.id;
          return (
            <button
              key={node.id}
              id={`arch-node-${node.id}`}
              onClick={() => setSelectedNode(node.id)}
              className={`p-3 rounded-lg border text-left font-mono-tech transition-all flex flex-col justify-between relative group cursor-pointer ${
                isSelected
                  ? 'bg-[#00A84F]/10 dark:bg-[#00FF66]/10 border-[#00873D] dark:border-[#00FF66] text-[#111111] dark:text-white shadow-xs'
                  : 'bg-[#FFFFFF] dark:bg-[#0D0D0D] border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 hover:bg-[#F5F5F5] dark:hover:bg-[#121212]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-[#F5F5F5] dark:bg-[#050505] border border-[#E5E7E5] dark:border-[#151A15]">
                  {node.icon}
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-[#00873D] dark:text-[#00FF66] font-bold' : 'text-[#888888] dark:text-[#555555]'}`}>0{index + 1}</span>
              </div>

              <div>
                <div className={`text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-[#00873D] dark:text-[#00FF66]' : 'text-[#333333] dark:text-[#D4D4D4]'}`}>
                  {node.label}
                </div>
                <div className="text-[10px] text-[#666666] dark:text-[#8A8A8A] truncate mt-0.5 font-light">
                  {node.sublabel}
                </div>
              </div>

              {/* Arrow indicator between nodes on desktop */}
              {index < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#AAAAAA] dark:text-[#444444] pointer-events-none text-xs">
                  →
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Node Inspector Details Box */}
      <div className="bg-[#FFFFFF] dark:bg-[#050505] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl p-4 font-mono-tech text-xs sm:text-sm animate-in fade-in duration-150">
        <div className="flex items-center justify-between mb-2 border-b border-[#E5E7E5] dark:border-[#151A15] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#00873D] dark:text-[#00FF66] font-semibold tracking-wider text-[11px] uppercase">NODE_INSPECTOR:</span>
            <span className="text-[#111111] dark:text-white font-medium">{activeNodeData.label} — {activeNodeData.sublabel}</span>
          </div>
          <span className="text-[10px] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00A84F]/30 dark:border-[#00FF66]/30 tracking-widest uppercase font-medium">
            ● ACTIVE PIPELINE
          </span>
        </div>

        <p className="text-[#555555] dark:text-[#A3A3A3] text-xs leading-relaxed mb-3 font-light">
          {activeNodeData.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {activeNodeData.details.map((item, idx) => (
            <span
              key={idx}
              className="bg-[#FAFAFA] dark:bg-[#0D0D0D] text-[#333333] dark:text-[#E5E5E5] border border-[#E5E7E5] dark:border-white/10 px-2.5 py-1 rounded text-[11px]"
            >
              ✓ {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
