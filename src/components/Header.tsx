import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ShieldCheck, Cpu, Volume2, VolumeX, Sparkles, Sliders } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface HeaderProps {
  theme: VibeTheme;
  glow: GlowLevel;
  synthEnabled: boolean;
  onToggleSynth: () => void;
  onOpenControls: () => void;
}

export default function Header({ theme, glow, synthEnabled, onToggleSynth, onOpenControls }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeColors = {
    cyan: 'text-cyan-400 border-cyan-500/30 hover:text-cyan-300',
    purple: 'text-purple-400 border-purple-500/30 hover:text-purple-300',
    amber: 'text-amber-400 border-amber-500/30 hover:text-amber-300',
  };

  const getGlowStyle = () => {
    if (glow === 'stealth') return 'border-b border-white/5 bg-brand-deep/85 backdrop-blur-md';
    if (glow === 'intense') return `border-b border-${theme === 'cyan' ? 'cyan' : theme === 'purple' ? 'purple' : 'amber'}-500/30 bg-brand-deep/90 drop-shadow-[0_4px_20px_rgba(59,130,246,0.15)]backdrop-blur-xl`;
    return 'border-b border-white/10 bg-brand-deep/80 backdrop-blur-xl';
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 24, stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 ${
        scrolled ? getGlowStyle() : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r ${
              theme === 'cyan' ? 'from-cyan-500 to-blue-600' : theme === 'purple' ? 'from-purple-500 to-indigo-600' : 'from-amber-500 to-orange-600'
            } opacity-70 blur-xs group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative h-10 w-10 rounded-2xl bg-brand-deep flex items-center justify-center border border-white/10 shadow-[0_14px_40px_rgba(2,6,23,0.28)]">
              <Cpu className={`h-5 w-5 ${
                theme === 'cyan' ? 'text-cyan-400' : theme === 'purple' ? 'text-purple-400' : 'text-amber-400'
              } animate-pulse`} />
            </div>
          </div>
          <span className="font-display font-semibold text-xl tracking-[0.16em] text-white gap-1 flex items-center">
            VORYN
            <span className={`text-[10px] font-mono border px-1.5 py-0.5 rounded-full ${
              theme === 'cyan' ? 'border-cyan-500/30 text-cyan-400' : theme === 'purple' ? 'border-purple-500/30 text-purple-400' : 'border-amber-500/30 text-amber-400'
            }`}>
              v1.0
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Protocol', 'Features', 'System IDE', 'Analytics', 'Licensing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              data-magnetic
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-2 group"
            >
              {item}
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                theme === 'cyan' ? 'bg-cyan-400' : theme === 'purple' ? 'bg-purple-400' : 'bg-amber-400'
              } transition-all duration-300 group-hover:w-full`} />
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Audio Synth Toggle */}
          <button
            onClick={onToggleSynth}
            title={synthEnabled ? "Mute Atmospheric Drone" : "Unmute Atmospheric Drone"}
            data-magnetic
            className={`p-2.5 rounded-xl border transition-all duration-300 text-slate-300 hover:text-white premium-button ${
              synthEnabled 
                ? theme === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : theme === 'purple' ? 'bg-purple-500/10 border-purple-500/40 text-purple-400' : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'border-white/5 hover:bg-white/5'
            }`}
          >
            {synthEnabled ? <Volume2 className="h-4.5 w-4.5 animate-bounce" /> : <VolumeX className="h-4.5 w-4.5 opacity-60" />}
          </button>

          {/* Quick Config Drawer Access */}
          <button
            onClick={onOpenControls}
            title="Environment Settings"
            data-magnetic
            className="p-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-slate-300 hover:text-white transition-all duration-300 premium-button"
          >
            <Sliders className="h-4.5 w-4.5" />
          </button>

          <a
            href="/app.html"
            data-magnetic
            className={`relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2.5 rounded-2xl border transition-all duration-300 overflow-hidden group premium-button ${
              theme === 'cyan' 
                ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20' 
                : theme === 'purple' 
                  ? 'bg-purple-500/10 border-purple-400/30 text-purple-300 hover:bg-purple-500/20' 
                  : 'bg-amber-500/10 border-amber-400/30 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            <span>Launch Interface</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Action */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onToggleSynth}
            className={`p-2 rounded-xl border transition-all premium-button ${
              synthEnabled ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-slate-400'
            }`}
          >
            {synthEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          
          <button
            onClick={onOpenControls}
            className="p-2 rounded-xl border border-white/5 text-slate-400 hover:text-white premium-button"
          >
            <Sliders className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-200 premium-button"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-white/10 bg-brand-deep/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
              {['Protocol', 'Features', 'System IDE', 'Analytics', 'Licensing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
              >
                {item}
              </a>
              ))}
              
              <div className="h-px bg-white/10 my-1" />
              
              <a
                href="/app.html"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 h-12 w-full font-bold text-center rounded-xl border border-white/10 px-6 ${
                  theme === 'cyan' ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : theme === 'purple' ? 'bg-purple-500 text-white hover:bg-purple-400' : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                } transition-all`}
              >
                <span>Launch Client Console</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
