import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { profileData } from '../../data/profile';
import { socialsData } from '../../data/skills';
import { Mail, Github, Linkedin, Send, Check, Copy, Terminal, ArrowUpRight } from 'lucide-react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete all fields before dispatching message.');
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim()) || (emailInput && !emailInput.checkValidity())) {
      setErrorMsg('Please enter a valid email address, for example name@company.com.');
      return;
    }

    if (email.trim().length > 254) {
      setErrorMsg('Email address is too long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Unable to dispatch the message right now.');
      }

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Unable to dispatch the message right now. Please use the direct email option.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading number="08 / CONTACT" title="INITIATE COLLABORATION" subtitle="Let's build something interesting. Send a direct transmission or connect via professional networks." commandPrompt="./contact.sh --recipient=sukhvant" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl p-5 sm:p-6 shadow-xs dark:shadow-xl space-y-4">
              <div className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-semibold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] animate-pulse"></span><span>DIRECT CHANNELS</span>
              </div>
              <p className="text-xs sm:text-sm text-[#555555] dark:text-[#8A8A8A] leading-relaxed font-sans font-light">I am actively considering full-time engineering roles, AI product consulting, and bespoke software contracting.</p>
              <div className="bg-[#FFFFFF] dark:bg-[#0E0E0E] border border-[#E5E7E5] dark:border-[#151A15] p-3.5 rounded-lg flex items-center justify-between font-mono-tech text-xs">
                <div className="flex items-center gap-2 truncate"><Mail className="w-4 h-4 text-[#00873D] dark:text-[#00FF66] shrink-0" /><span className="text-[#111111] dark:text-[#FFFFFF] truncate font-mono text-xs">{profileData.contactEmail}</span></div>
                <button type="button" id="contact-copy-email-btn" onClick={handleCopyEmail} className="bg-[#F0F0F0] dark:bg-[#141414] hover:bg-[#E5E5E5] dark:hover:bg-[#1A1A1A] text-[#444444] dark:text-[#A3A3A3] hover:text-black dark:hover:text-white border border-[#E5E7E5] dark:border-white/10 px-2.5 py-1 rounded transition-colors text-[11px] flex items-center gap-1 shrink-0 ml-2 font-mono cursor-pointer">{copiedEmail ? <Check className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}<span>{copiedEmail ? 'Copied' : 'Copy'}</span></button>
              </div>
              <div className="space-y-2 pt-2">
                <a id="contact-mail-direct-btn" href={`mailto:${profileData.contactEmail}`} className="w-full bg-[#FFFFFF] dark:bg-[#0E0E0E] hover:bg-[#F5F5F5] dark:hover:bg-[#141414] text-[#222222] dark:text-[#E5E5E5] hover:text-black dark:hover:text-white border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 p-3 rounded-lg flex items-center justify-between transition-all font-mono-tech text-xs group"><div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" /><span className="group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors">Send Direct Email</span></div><ArrowUpRight className="w-3.5 h-3.5 text-[#777777] dark:text-[#666666] group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors" /></a>
                <a id="contact-github-link" href={socialsData.github} target="_blank" rel="noreferrer" className="w-full bg-[#FFFFFF] dark:bg-[#0E0E0E] hover:bg-[#F5F5F5] dark:hover:bg-[#141414] text-[#222222] dark:text-[#E5E5E5] hover:text-black dark:hover:text-white border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 p-3 rounded-lg flex items-center justify-between transition-all font-mono-tech text-xs group"><div className="flex items-center gap-2"><Github className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" /><span className="group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors">GitHub Profile & Repos</span></div><ArrowUpRight className="w-3.5 h-3.5 text-[#777777] dark:text-[#666666] group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors" /></a>
                <a id="contact-linkedin-link" href={socialsData.linkedin} target="_blank" rel="noreferrer" className="w-full bg-[#FFFFFF] dark:bg-[#0E0E0E] hover:bg-[#F5F5F5] dark:hover:bg-[#141414] text-[#222222] dark:text-[#E5E5E5] hover:text-black dark:hover:text-white border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 p-3 rounded-lg flex items-center justify-between transition-all font-mono-tech text-xs group"><div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" /><span className="group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors">LinkedIn Network</span></div><ArrowUpRight className="w-3.5 h-3.5 text-[#777777] dark:text-[#666666] group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors" /></a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl overflow-hidden shadow-xs dark:shadow-xl font-mono-tech text-xs">
            <div className="bg-[#F0F0F0] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-5 py-3.5 flex items-center justify-between"><div className="flex items-center gap-2"><Terminal className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" /><span className="font-medium text-[#111111] dark:text-[#FFFFFF]">./contact.sh</span></div><span className="text-[10px] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00A84F]/30 dark:border-[#00FF66]/30 tracking-wider uppercase font-mono font-medium">SECURE DISPATCH</span></div>
            <div className="p-5 sm:p-7">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-3"><div className="w-12 h-12 rounded-full bg-[#00A84F]/10 dark:bg-[#00FF66]/10 border border-[#00A84F]/30 dark:border-[#00FF66]/30 text-[#00873D] dark:text-[#00FF66] flex items-center justify-center mx-auto shadow-sm"><Check className="w-6 h-6" /></div><h4 className="font-editorial-serif text-xl text-[#111111] dark:text-white font-normal">Transmission Dispatched</h4><p className="text-xs text-[#555555] dark:text-[#8A8A8A] max-w-md mx-auto leading-relaxed font-sans font-light">Thank you for reaching out. Your transmission payload has been recorded. Sukhvant will review and reply promptly.</p><button type="button" onClick={() => setIsSubmitted(false)} className="mt-4 font-mono-tech text-xs bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#222222] dark:text-[#E5E5E5] hover:text-black dark:hover:text-white border border-[#E5E7E5] dark:border-white/10 hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 px-4 py-2 rounded-lg transition-all cursor-pointer">Send Another Transmission</button></div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 font-sans">
                  {errorMsg && <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-xs font-mono">! {errorMsg}</div>}
                  <div className="space-y-1.5 font-mono"><label htmlFor="contact-form-name" className="block text-xs text-[#666666] dark:text-[#8A8A8A] uppercase tracking-wider font-mono-tech">Name / Organization</label><input id="contact-form-name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required placeholder="Jane Doe or Acme Corp" className="w-full bg-[#FFFFFF] dark:bg-[#050505] border border-[#E5E7E5] dark:border-[#151A15] focus:border-[#00873D] dark:focus:border-[#00FF66] rounded-lg p-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#666666] font-sans focus:outline-none transition-colors" /></div>
                  <div className="space-y-1.5 font-mono"><label htmlFor="contact-form-email" className="block text-xs text-[#666666] dark:text-[#8A8A8A] uppercase tracking-wider font-mono-tech">Email Address</label><input id="contact-form-email" name="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} required placeholder="jane@organization.com" className="w-full bg-[#FFFFFF] dark:bg-[#050505] border border-[#E5E7E5] dark:border-[#151A15] focus:border-[#00873D] dark:focus:border-[#00FF66] rounded-lg p-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#666666] font-sans focus:outline-none transition-colors" /></div>
                  <div className="space-y-1.5 font-mono"><label htmlFor="contact-form-message" className="block text-xs text-[#666666] dark:text-[#8A8A8A] uppercase tracking-wider font-mono-tech">Message / Project Scope</label><textarea id="contact-form-message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={5000} required placeholder="Tell me about the role, product roadmap, or architectural challenge..." className="w-full bg-[#FFFFFF] dark:bg-[#050505] border border-[#E5E7E5] dark:border-[#151A15] focus:border-[#00873D] dark:focus:border-[#00FF66] rounded-lg p-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#666666] font-sans focus:outline-none transition-colors resize-none" /></div>
                  <div className="pt-2"><button id="contact-submit-btn" type="submit" disabled={isSubmitting} className="w-full bg-[#00FF66] text-black font-semibold uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-[#00D957] transition-all flex items-center justify-center gap-2 font-mono-tech text-xs shadow-[0_0_14px_rgba(0,255,102,0.25)] disabled:opacity-50 cursor-pointer"><Send className="w-3.5 h-3.5" /><span>{isSubmitting ? 'DISPATCHING PAYLOAD...' : 'DISPATCH TRANSMISSION'}</span></button></div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
