import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sliders, Volume2, VolumeX, ArrowUp, X, Check } from 'lucide-react';

// Types and Sound synthesizers
import { AmbientConfig, VibeTheme, GlowLevel } from './types';
import { startAmbientSynth, stopAmbientSynth, setSynthVolumeScale } from './utils/audioSynth';

// Sections
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import InteractiveShowcase from './components/InteractiveShowcase';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  // Global atmospheric parameters
  const [ambientConfig, setAmbientConfig] = useState<AmbientConfig>({
    theme: 'cyan',
    glow: 'normal',
    synthEnabled: false,
    particlesEnabled: true,
  });

  const [controlPanelOpen, setControlPanelOpen] = useState(false);
  const [synthVolume, setSynthVolume] = useState(50);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Update scroll triggers
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update cursor coordinates for particles drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Audio synthesizer logic handler
  const handleToggleSynth = () => {
    const nextState = !ambientConfig.synthEnabled;
    setAmbientConfig(prev => ({
      ...prev,
      synthEnabled: nextState
    }));

    if (nextState) {
      startAmbientSynth();
      setSynthVolumeScale(synthVolume / 100);
    } else {
      stopAmbientSynth();
    }
  };

  // Adjust volume trigger
  const handleVolumeChange = (vol: number) => {
    setSynthVolume(vol);
    if (ambientConfig.synthEnabled) {
      setSynthVolumeScale(vol / 100);
    }
  };

  // Update theme setting
  const handleThemeChange = (newTheme: VibeTheme) => {
    setAmbientConfig(prev => ({ ...prev, theme: newTheme }));
  };

  // Update glow setting
  const handleGlowChange = (newGlow: GlowLevel) => {
    setAmbientConfig(prev => ({ ...prev, glow: newGlow }));
  };

  // 4. Interactive Space Particles Canvas Loop
  useEffect(() => {
    if (!ambientConfig.particlesEnabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Coordinate Particle structures
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      originalOpacity: number;
    }> = [];

    const createParticles = () => {
      particles.length = 0;
      const amount = Math.min(65, Math.floor(width / 22));
      for (let i = 0; i < amount; i++) {
        const size = Math.random() * 2 + 0.5;
        const opacity = Math.random() * 0.45 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: (Math.random() - 0.5) * 0.22,
          speedY: -(Math.random() * 0.4 + 0.1), // Rising slowly upwards
          opacity,
          originalOpacity: opacity,
        });
      }
    };

    createParticles();

    // Resize observer
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };
    window.addEventListener('resize', handleResize);

    // Core Drawing frame loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Loop boundaries
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        // Mouse magnetic distortion drift (subtle and high-fidelity)
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dSquared = dx * dx + dy * dy;
        
        if (dSquared < 20000) {
          const force = (20000 - dSquared) / 20000;
          p.x -= dx * force * 0.035;
          p.y -= dy * force * 0.035;
          p.opacity = Math.min(0.9, p.originalOpacity + force * 0.4);
        } else {
          p.opacity = p.originalOpacity;
        }

        // Select coordinate color aligned to brand setting
        let color = 'rgba(255, 255, 255, ';
        if (ambientConfig.theme === 'cyan') {
          color = 'rgba(34, 211, 238, ';
        } else if (ambientConfig.theme === 'purple') {
          color = 'rgba(168, 85, 247, ';
        } else if (ambientConfig.theme === 'amber') {
          color = 'rgba(245, 158, 11, ';
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${p.opacity})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = ambientConfig.theme === 'cyan' ? '#22d3ee' : ambientConfig.theme === 'purple' ? '#a855f7' : '#f59e0b';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [ambientConfig.particlesEnabled, ambientConfig.theme]);

  // Color theme class map helpers
  const themeGradients = {
    cyan: 'from-cyan-500/20 via-blue-500/5 to-transparent',
    purple: 'from-purple-500/20 via-indigo-500/5 to-transparent',
    amber: 'from-amber-500/20 via-orange-500/5 to-transparent',
  };

  const activeThemeColor = {
    cyan: 'text-cyan-400 border-cyan-500/30 ring-cyan-500/20',
    purple: 'text-purple-400 border-purple-500/30 ring-purple-500/20',
    amber: 'text-amber-400 border-amber-500/30 ring-amber-500/20',
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-100 selection:bg-brand-cyan/20">
      
      {/* Custom Ultra-responsive Reactive Cursor System */}
      <CustomCursor />
      
      {/* Dynamic drifting background particles overlay */}
      {ambientConfig.particlesEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-5 pointer-events-none"
        />
      )}

      {/* Cinematic grid lines scanning helper */}
      <div className="fixed inset-0 z-1 pointer-events-none opacity-[0.02] scanlines" />

      {/* Global Ambient Lighting overlay depending on selected setting */}
      {ambientConfig.glow !== 'stealth' && (
        <div 
          className={`fixed inset-0 pointer-events-none z-2 transition-all duration-1000 ${
            ambientConfig.glow === 'intense' ? 'opacity-100' : 'opacity-50'
          }`}
          style={{
            background: `radial-gradient(ellipse at top, ${
              ambientConfig.theme === 'cyan' ? 'rgba(34,211,238,0.06)' : ambientConfig.theme === 'purple' ? 'rgba(168,85,247,0.06)' : 'rgba(245,158,11,0.06)'
            } 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Header element */}
      <Header
        theme={ambientConfig.theme}
        glow={ambientConfig.glow}
        synthEnabled={ambientConfig.synthEnabled}
        onToggleSynth={handleToggleSynth}
        onOpenControls={() => setControlPanelOpen(true)}
      />

      {/* App Main Blocks Frame */}
      <main className="relative z-10">
        
        {/* 1. Hero Block */}
        <Hero 
          theme={ambientConfig.theme} 
          glow={ambientConfig.glow} 
        />

        {/* 2. Interactive IDE Studio Showcase */}
        <InteractiveShowcase
          theme={ambientConfig.theme}
          glow={ambientConfig.glow}
        />

        {/* 3. Bento Features Grid */}
        <FeaturesGrid
          theme={ambientConfig.theme}
          glow={ambientConfig.glow}
        />

        {/* 4. Real-time Analytics & Statistics mapping */}
        <Statistics
          theme={ambientConfig.theme}
          glow={ambientConfig.glow}
        />

        {/* 5. Executive Endorsements Testimonials slider */}
        <Testimonials
          theme={ambientConfig.theme}
          glow={ambientConfig.glow}
        />

        {/* 6. Pricing licenses configurations */}
        <Pricing
          theme={ambientConfig.theme}
          glow={ambientConfig.glow}
        />

      </main>

      {/* Footer Element */}
      <Footer
        theme={ambientConfig.theme}
        glow={ambientConfig.glow}
      />

      {/* Floating corner triggers */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        
        {/* Scroll back to core top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Scroll to Top"
              className="p-3.5 rounded-full border border-white/10 bg-brand-deep/80 backdrop-blur-md text-slate-300 hover:text-white transition-all shadow-xl hover:border-white/25 active:scale-90"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Halo system settings trigger */}
        <button
          onClick={() => setControlPanelOpen(true)}
          title="Open Atmospheric Core Controls"
          className={`p-4 rounded-full border backdrop-blur-md transition-all shadow-2xl active:scale-90 flex items-center justify-center relative group ${
            ambientConfig.theme === 'cyan' 
              ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20' 
              : ambientConfig.theme === 'purple' 
                ? 'border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' 
                : 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
          }`}
        >
          {/* Pulsing indicator orb */}
          <span className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border border-slate-950 ${
            ambientConfig.theme === 'cyan' ? 'bg-cyan-400' : ambientConfig.theme === 'purple' ? 'bg-purple-400' : 'bg-amber-400'
          } animate-ping`} />
          <span className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border border-slate-950 ${
            ambientConfig.theme === 'cyan' ? 'bg-cyan-400' : ambientConfig.theme === 'purple' ? 'bg-purple-400' : 'bg-amber-400'
          }`} />

          <Sliders className="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>

      {/* Atmospheric Core Config Sidepanel (Glassmorphic Slider Drawer) */}
      <AnimatePresence>
        {controlPanelOpen && (
          <>
            {/* Dark backing overlay shield */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setControlPanelOpen(false)}
              className="fixed inset-0 z-45 bg-[#010006]"
            />

            {/* Main Slidebar Grid panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-brand-deep/95 backdrop-blur-3xl border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              
              {/* UPPER BAR */}
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Sliders className={`h-5 w-5 ${
                      ambientConfig.theme === 'cyan' ? 'text-cyan-400' : ambientConfig.theme === 'purple' ? 'text-purple-400' : 'text-amber-400'
                    }`} />
                    <span className="font-display font-black tracking-wider uppercase text-white text-sm">ENVIRONMENT CONTROL CORE</span>
                  </div>

                  <button
                    onClick={() => setControlPanelOpen(false)}
                    className="p-1.5 rounded-lg border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans">
                  Tune our spatial website variables to experience deep visual renderings, custom-compiled atmospheric audio synth channels, and floating particles.
                </p>

                {/* 1. SECTOR COLOR VIBE PALETTE */}
                <div className="space-y-3 mb-8">
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">1. BRAND DESIGN PALETTE</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cyan', label: 'Æ Cyan', code: 'bg-cyan-500' },
                      { id: 'purple', label: 'Nebula', code: 'bg-purple-500' },
                      { id: 'amber', label: 'Solar core', code: 'bg-amber-500' }
                    ].map((pal) => (
                      <button
                        key={pal.id}
                        onClick={() => handleThemeChange(pal.id as VibeTheme)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all relative ${
                          ambientConfig.theme === pal.id 
                            ? 'border-white/15 bg-white/5 text-white' 
                            : 'border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <span className={`h-3 w-3 rounded-full ${pal.code} shadow-md`} />
                        <span className="text-[10px] font-mono font-medium">{pal.label}</span>
                        {ambientConfig.theme === pal.id && (
                          <div className={`absolute top-1 right-1 h-2.5 w-2.5 rounded-full ${pal.code} flex items-center justify-center`}>
                            <Check className="h-1.5 w-1.5 text-slate-950 font-black" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. GLOW & ATMOSPHERIC INTENSITY */}
                <div className="space-y-3 mb-8">
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">2. GLOW & DEPTH INTENSITY</span>
                  <div className="space-y-1.5">
                    {[
                      { id: 'stealth', label: 'Stealth Matte Mode', desc: 'No heavy shaders. Pure clean dark mode' },
                      { id: 'normal', label: 'Standard Volumetric', desc: 'Classic glow mapping interfaces' },
                      { id: 'intense', label: 'Hyper Cyberpunk Blast', desc: 'Max glass refraction and neon bursts' }
                    ].map((gl) => (
                      <button
                        key={gl.id}
                        onClick={() => handleGlowChange(gl.id as GlowLevel)}
                        className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all relative ${
                          ambientConfig.glow === gl.id 
                            ? 'border-white/15 bg-white/5' 
                            : 'border-white/5 bg-slate-950/60 hover:border-white/10'
                        }`}
                      >
                        <div className={`h-4.5 w-4.5 rounded-full border border-white/20 mt-0.5 flex items-center justify-center shrink-0 ${
                          ambientConfig.glow === gl.id ? 'bg-white text-slate-950' : 'bg-transparent'
                        }`}>
                          {ambientConfig.glow === gl.id && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="block font-sans text-xs font-semibold text-white">{gl.label}</span>
                          <span className="block text-[10px] text-slate-400 leading-relaxed mt-0.5">{gl.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. ATMOSPHERIC SOUND SYNTH */}
                <div className="space-y-3 mb-8">
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">3. ATMOSPHERIC Drone GRAPH (Web Audio)</span>
                  
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/60 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {ambientConfig.synthEnabled ? <Volume2 className="h-4.5 w-4.5 text-cyan-400" /> : <VolumeX className="h-4.5 w-4.5 text-slate-500" />}
                        <div>
                          <span className="block text-xs font-semibold text-white">Interactive Drone synth</span>
                          <span className="block text-[9px] font-mono text-slate-500 mt-0.5">55Hz fundamental (A1) oscillator</span>
                        </div>
                      </div>

                      {/* Power switch */}
                      <button
                        onClick={handleToggleSynth}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase border tracking-wider transition-all ${
                          ambientConfig.synthEnabled 
                            ? 'bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20' 
                            : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {ambientConfig.synthEnabled ? 'MUTED' : 'BOOT SYNTH'}
                      </button>
                    </div>

                    {/* Volume slide controller */}
                    {ambientConfig.synthEnabled && (
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-[10px] text-slate-500">
                          <span>SYNTH DECAY VOLUME LEVEL:</span>
                          <span>{synthVolume}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={synthVolume}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. FLOATING SPACE PARTICLES */}
                <div className="p-4 rounded-xl border border-white/5 bg-slate-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-purple-400" />
                    <div>
                      <span className="block text-xs font-semibold text-white font-sans">Active Space Particles</span>
                      <span className="block text-[9px] font-mono text-slate-500 mt-0.5">Rise & magnetic drift coordinates</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setAmbientConfig(prev => ({ ...prev, particlesEnabled: !prev.particlesEnabled }))}
                    className={`h-7 px-3 rounded-lg font-mono text-[10px] font-black uppercase border transition-all ${
                      ambientConfig.particlesEnabled 
                        ? 'border-cyan-500/25 bg-cyan-500/5 text-cyan-400' 
                        : 'border-white/5 text-slate-500 hover:border-white/10'
                    }`}
                  >
                    {ambientConfig.particlesEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>

              </div>

              {/* LOWER LOGS TAPE */}
              <div className="pt-6 border-t border-white/5">
                <span className="font-mono text-[9px] text-slate-600 block uppercase font-bold mb-1.5">Environment Core Logs</span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-white/5 font-mono text-[9px] text-slate-400 leading-4">
                  <div>SYS-VIBE: PROGRESSED TO: #{ambientConfig.theme.toUpperCase()}</div>
                  <div>SYS-GLOW-INDEX: {ambientConfig.glow.toUpperCase()}</div>
                  <div>SYS-SYNTH-AUDIO: {ambientConfig.synthEnabled ? 'TRANSMITTING-55HZ' : 'OFFLINE'}</div>
                  <div>SYS-PARTICLES: {ambientConfig.particlesEnabled ? 'ACTIVE-65-NODES' : 'OFFLINE'}</div>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
