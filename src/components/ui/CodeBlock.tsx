import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-[#182018] bg-[#050805] overflow-hidden my-4 shadow-sm font-mono-tech text-xs sm:text-sm">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#080C08] border-b border-[#182018] text-[#626A63]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#182018]"></span>
            <span className="text-[#A3ACA4] text-xs font-mono-tech">{filename}</span>
          </div>
          <button
            id={`copy-btn-${filename.replace(/[^a-zA-Z0-9]/g, '-')}`}
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-[#A3ACA4] hover:text-[#00FF66] transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto text-[#F2F5F2] leading-relaxed">
        <pre>{code}</pre>
      </div>
    </div>
  );
};
