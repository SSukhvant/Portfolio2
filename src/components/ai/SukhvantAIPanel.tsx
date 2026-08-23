import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, RefreshCw, Terminal, ArrowUpRight, ShieldCheck, CornerDownLeft } from 'lucide-react';
import { ChatMessage, ThemeMode } from '../../types';
import { querySukhvantAI } from '../../lib/aiEngine';
import { AIOrb } from './AIOrb';
import { AIStatus } from './AIStatus';

interface SukhvantAIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  theme?: ThemeMode;
}

export const SukhvantAIPanel: React.FC<SukhvantAIPanelProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  theme = 'dark'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [aiState, setAiState] = useState<'idle' | 'thinking' | 'response'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    "What AI & MCP experience does Sukhvant have?",
    "What are his strongest technical skills?",
    "Tell me about the Invoice Builder SaaS architecture.",
    "What did he build at Brownfleet?",
    "Why should I hire Sukhvant as a Full Stack Developer?"
  ];

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'assistant',
          content: "Hi, I'm Sukhvant AI.\n\nAsk me anything about Sukhvant — his experience, projects, technical skills, AI work, or how he approaches building software.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: ["About", "Projects", "Experience", "Skills", "AI Engineering"]
        }
      ]);
    }
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, processingStep, isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (userPrompt: string) => {
    const prompt = userPrompt.trim();
    if (!prompt || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsProcessing(true);
    setAiState('thinking');

    setProcessingStep('● querying verified profile knowledge...');
    await new Promise((r) => setTimeout(r, 200));
    setProcessingStep('● generating structured response...');

    try {
      const responsePayload = await querySukhvantAI(prompt, messages);

      setProcessingStep('✓ response ready');
      await new Promise((r) => setTimeout(r, 120));

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responsePayload.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: responsePayload.sources
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setAiState('response');
      setTimeout(() => setAiState('idle'), 1200);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: "I ran into a temporary issue retrieving that record. Please feel free to reach out directly to Sukhvant at sukhvantsingh581998@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setAiState('idle');
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handleSourceClick = (sourceName: string) => {
    onClose();
    const lower = sourceName.toLowerCase();
    if (lower.includes('project') || lower.includes('invoice') || lower.includes('saas') || lower.includes('careerloom')) {
      onNavigateSection('projects');
    } else if (lower.includes('experience') || lower.includes('brownfleet') || lower.includes('oscarblack')) {
      onNavigateSection('experience');
    } else if (lower.includes('skill')) {
      onNavigateSection('skills');
    } else if (lower.includes('ai') || lower.includes('mcp')) {
      onNavigateSection('ai-engineering');
    } else if (lower.includes('contact')) {
      onNavigateSection('contact');
    } else {
      onNavigateSection('about');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[680px] font-mono-tech relative border ${
              theme === 'dark'
                ? 'bg-[#050505] border-[#151A15] text-[#FFFFFF]'
                : 'bg-[#FFFFFF] border-[#E5E7E5] text-[#111111]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Colorful AI Core */}
            <div
              className={`px-4 py-3.5 flex items-center justify-between border-b ${
                theme === 'dark'
                  ? 'bg-[#080808] border-[#151A15]'
                  : 'bg-[#FAFAFA] border-[#E5E7E5]'
              }`}
            >
              <div className="flex items-center gap-3">
                <AIOrb size="sm" state={aiState} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#00FF66] font-semibold tracking-wider">
                      ✦ sukhvant-ai.service
                    </span>
                    <span className="text-[10px] bg-[#00FF66]/10 text-[#00FF66] px-2 py-0.5 rounded border border-[#00FF66]/30 font-mono tracking-wider font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-[#8A8A8A] font-sans">
                    Multi-Model Fallback &bull; Verified Portfolio Knowledge
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="ai-panel-reset-btn"
                  onClick={() => {
                    setMessages([]);
                    setTimeout(() => {
                      setMessages([
                        {
                          id: 'welcome-reset',
                          role: 'assistant',
                          content: "Hi, I'm Sukhvant AI.\n\nAsk me anything about Sukhvant — his experience, projects, technical skills, AI work, or how he approaches building software.",
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          sources: ["About", "Projects", "Skills", "AI Engineering"]
                        }
                      ]);
                    }, 50);
                  }}
                  title="Reset conversation"
                  className={`p-1.5 rounded transition-colors ${
                    theme === 'dark'
                      ? 'text-[#8A8A8A] hover:text-white hover:bg-white/10'
                      : 'text-[#666666] hover:text-black hover:bg-black/5'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  id="ai-panel-close-btn"
                  onClick={onClose}
                  title="Close panel (Esc)"
                  className={`p-1.5 rounded transition-colors ${
                    theme === 'dark'
                      ? 'text-[#8A8A8A] hover:text-white hover:bg-white/10'
                      : 'text-[#666666] hover:text-black hover:bg-black/5'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Viewport */}
            <div
              className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm ${
                theme === 'dark' ? 'bg-[#000000]' : 'bg-[#FAFAFA]'
              }`}
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="shrink-0 mt-1">
                        <AIOrb size="sm" state="idle" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-xl p-3.5 sm:p-4 leading-relaxed ${
                        isUser
                          ? theme === 'dark'
                            ? 'bg-[#0E0E0E] border border-white/15 text-white'
                            : 'bg-[#EAEAEA] border border-[#D0D0D0] text-[#111111]'
                          : theme === 'dark'
                          ? 'bg-[#060606] border border-[#151A15] text-[#E5E5E5]'
                          : 'bg-[#FFFFFF] border border-[#E5E7E5] text-[#111111]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1.5 text-[10px] text-[#8A8A8A] font-mono-tech">
                        <span className={isUser ? (theme === 'dark' ? 'text-white' : 'text-[#111111]') : 'text-[#00FF66] font-semibold'}>
                          {isUser ? 'recruiter@workstation' : '✦ sukhvant-ai'}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                        {msg.content}
                      </div>

                      {/* Verified Sources / References */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 font-mono-tech text-[11px]">
                          <div className="text-[#8A8A8A] mb-1.5 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#00FF66]" />
                            <span>Verified Evidence & Profile Records:</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.map((src, sIdx) => (
                              <button
                                key={sIdx}
                                id={`ai-src-btn-${sIdx}`}
                                onClick={() => handleSourceClick(src)}
                                className={`px-2 py-0.5 rounded text-[10px] transition-colors flex items-center gap-1 font-mono ${
                                  theme === 'dark'
                                    ? 'bg-[#0D0D0D] hover:bg-[#151515] text-[#A3A3A3] hover:text-[#00FF66] border border-white/10 hover:border-[#00FF66]/30'
                                    : 'bg-[#F0F0F0] hover:bg-[#E5E5E5] text-[#555555] hover:text-[#00A84F] border border-[#E0E0E0]'
                                }`}
                              >
                                <span>→ {src}</span>
                                <ArrowUpRight className="w-2.5 h-2.5" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Processing Status Indicator */}
              {isProcessing && (
                <div className="flex gap-3 items-center text-xs text-[#00FF66] font-mono-tech pl-2">
                  <AIOrb size="sm" state="thinking" />
                  <span>{processingStep || 'processing query...'}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 3 && !isProcessing && (
              <div
                className={`px-4 py-2.5 border-t ${
                  theme === 'dark'
                    ? 'bg-[#080808] border-[#151A15]'
                    : 'bg-[#FAFAFA] border-[#E5E7E5]'
                }`}
              >
                <div className="text-[10px] text-[#8A8A8A] mb-1.5 uppercase tracking-widest font-mono">
                  SUGGESTED VERIFIED QUERIES
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      id={`suggested-q-${idx}`}
                      onClick={() => handleSendMessage(q)}
                      className={`text-[11px] px-2.5 py-1 rounded transition-colors text-left font-mono ${
                        theme === 'dark'
                          ? 'bg-[#050505] hover:bg-[#121212] text-[#A3A3A3] hover:text-[#00FF66] border border-white/10 hover:border-[#00FF66]/30'
                          : 'bg-[#FFFFFF] hover:bg-[#EFEFEF] text-[#444444] hover:text-[#00A84F] border border-[#E0E0E0]'
                      }`}
                    >
                      [ {q} ]
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div
              className={`p-3 sm:p-4 border-t ${
                theme === 'dark'
                  ? 'bg-[#080808] border-[#151A15]'
                  : 'bg-[#FAFAFA] border-[#E5E7E5]'
              }`}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputVal);
                }}
                className="flex items-center gap-2"
              >
                <div
                  className={`relative flex-1 flex items-center rounded-xl px-3 py-2 border transition-colors ${
                    theme === 'dark'
                      ? 'bg-[#050505] border-white/10 focus-within:border-[#00FF66]/60'
                      : 'bg-[#FFFFFF] border-[#D5D5D5] focus-within:border-[#00A84F]'
                  }`}
                >
                  <span className="text-[#00FF66] font-mono-tech mr-2 font-bold">&gt;</span>
                  <input
                    ref={inputRef}
                    id="ai-panel-input"
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask something about Sukhvant's work, AI, or stack..."
                    disabled={isProcessing}
                    className="w-full bg-transparent text-xs sm:text-sm font-sans focus:outline-none font-light placeholder:text-[#8A8A8A]"
                  />
                </div>
                <button
                  id="ai-panel-send-btn"
                  type="submit"
                  disabled={!inputVal.trim() || isProcessing}
                  className="bg-[#00FF66] text-black p-2.5 rounded-xl font-medium hover:bg-[#00D957] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_12px_rgba(0,255,102,0.3)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-[#8A8A8A] mt-2 px-1 font-mono">
                <span>Multi-Model AI Engine &bull; Verified Portfolio</span>
                <span>Esc to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
