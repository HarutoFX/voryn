import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Mail, Send, Github, MessageSquare, Twitter, Disc, CheckCircle } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface FooterProps {
  theme: VibeTheme;
  glow: GlowLevel;
}

export default function Footer({ theme, glow }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmailInput('');
      
      // Auto-expire success alert
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1200);
  };

  const getThemeColors = () => {
    if (theme === 'cyan') return {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      btn: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    };
    if (theme === 'purple') return {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      btn: 'bg-purple-500 hover:bg-purple-400 text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    };
    return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      btn: 'bg-amber-500 hover:bg-amber-400 text-slate-950 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    };
  };

  const colors = getThemeColors();

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden bg-[#02000c] border-t border-white/5">
      
      {/* Background soft lighting glows */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Upper row: Brand card & subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-16 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            <a href="#" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-brand-deep border border-white/10 flex items-center justify-center">
                <Cpu className={`h-4 w-5 ${colors.text}`} />
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">VORYN PROTOCOL</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The spatial compiler and real-time state synchronizer. Engineered for sub-millisecond hyper-scale operations.
            </p>

            {/* Social handles */}
            <div className="flex items-center gap-3 mt-2">
              {[DiscordLogo, Twitter, Github].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2.5 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Subscribe Col */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-left">
            <span className="font-display font-bold text-sm text-white uppercase tracking-wider block">
              Subscribe to Compiler updates
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Receive raw technical details, security reviews, and direct eBPF core specifications. No promotional noise.
            </p>

            {/* Form layout */}
            <form onSubmit={handleSubscribe} className="relative max-w-md w-full flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 outline-none focus:border-white/20 transition-all focus:ring-1 focus:ring-white/10"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-11 px-5 rounded-xl font-bold uppercase tracking-wider text-[10px] flex items-center gap-2 transition-all duration-300 ${colors.btn}`}
              >
                {isSubmitting ? (
                  <span>Wait...</span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="h-3 w-3" />
                  </>
                )}
              </button>
            </form>

            {/* Success micro interaction callback */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-400 text-[11px] font-mono flex items-center gap-1.5"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Protocol accepted. Encryption key dispatched to destination.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Middle row: Columns Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5 pb-16 mb-12">
          
          {/* Dir 1 */}
          <div className="text-left flex flex-col gap-3.5">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">PRODUCT METRICS</span>
            {['Compiler Core', 'eBPF Sandbox', 'Relational Sync', 'Pricing Models'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Dir 2 */}
          <div className="text-left flex flex-col gap-3.5">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">SPECIFICATIONS</span>
            {['Hardware Accel', 'FIPS Security', 'Ledger Checksums', 'Topology Engine'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Dir 3 */}
          <div className="text-left flex flex-col gap-3.5">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">RESOURCES</span>
            {['Developer Hub', 'Status Console', 'Audit Ledger', 'System Rust Crates'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Dir 4 */}
          <div className="text-left flex flex-col gap-3.5">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">CORPORATION</span>
            {['Quantum Lab', 'Privacy Policy', 'System SLA', 'Launch Logbook'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

        </div>

        {/* Lower row: Copyright and Network status indicators */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-[11px] font-mono text-slate-500">
          
          <div>
            <span>© 2026 Voryn Protocols Corp. All operations isolated.</span>
          </div>

          {/* Real-time Uptime dynamic panel */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
            <span>UPTIME: 99.9997%</span>
            <span>LATENCY: 1.84ms</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

// Custom simple inline Discord SVG logo placeholder
function DiscordLogo(props: any) {
  return (
    <svg viewBox="0 0 127.14 96.36" className="h-4 w-4 fill-current" {...props}>
      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c.88-.65,1.74-1.34,2.58-2a75.58,75.58,0,0,0,72.9,0c.84.71,1.7,1.4,2.58,2a68.45,68.45,0,0,1-10.45,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.58-18.83C129.17,47.88,122.15,25.12,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
    </svg>
  );
}
