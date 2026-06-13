import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Terminal, Cpu, Database, Share2, Sparkles, Activity } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface HeroProps {
  theme: VibeTheme;
  glow: GlowLevel;
}

export default function Hero({ theme, glow }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getThemeColor = () => {
    if (theme === 'cyan') return {
      glow: 'rgba(34, 211, 238, 0.15)',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      button: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34, 211, 238, 0.4)]',
      accentGlow: 'bg-cyan-500/10'
    };
    if (theme === 'purple') return {
      glow: 'rgba(168, 85, 247, 0.15)',
      gradient: 'from-purple-400 via-indigo-500 to-pink-600',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      button: 'bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_20px_rgba(168, 85, 247, 0.4)]',
      accentGlow: 'bg-purple-500/10'
    };
    return {
      glow: 'rgba(245, 158, 11, 0.15)',
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      button: 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245, 158, 11, 0.4)]',
      accentGlow: 'bg-amber-500/10'
    };
  };

  const colors = getThemeColor();

  // Floating background elements parameters
  const floatingAssets = [
    { icon: Cpu, label: 'Compute Unit', desc: 'Kernel #409', top: '15%', left: '10%' },
    { icon: Database, label: 'State Sync', desc: 'Tokyo region', top: '65%', left: '8%' },
    { icon: Share2, label: 'Cluster Stream', desc: '4.8 GB/s load', top: '22%', right: '12%' },
    { icon: Activity, label: 'Neural Pipeline', desc: 'Active runtime', top: '70%', right: '10%' },
  ];

  return (
    <section id="protocol" className="relative min-h-screen pt-32 pb-24 overflow-hidden flex flex-col justify-center">
      {/* 1. Futuristic Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#030014]" />
        
        {/* Animated panning grid helper */}
        <div className="absolute inset-0 cyber-grid pan-grid opacity-75 pointer-events-none" />
        
        {/* Custom volumetric atmospheric lights (react to theme & cursor coordinate) */}
        <div 
          className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full filter blur-[120px] opacity-40 mix-blend-screen transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors.glow} 0%, rgba(59, 130, 246, 0.04) 50%, transparent 100%)`,
            left: `${40 + mousePosition.x * 30}%`,
            top: `${25 + mousePosition.y * 30}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Dynamic horizon glow ring */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-xs" />
      </div>

      {/* 2. Main Content Frame */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Copy Panel */}
        <div className="lg:col-span-6 flex flex-col text-left gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ${colors.border} ${colors.accentGlow}`}>
              <Sparkles className={`h-3 w-3 ${colors.text} animate-spin-slow`} />
              <span>SPATIAL COMPILER PROTOCOL v1.02</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-4xl sm:text-5xl xl:text-[68px] leading-[1.05] tracking-tight bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
          >
            Synthesize your <br />
            <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
              software galaxy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl"
          >
            Voryn replaces clunky, fragmented command pipelines with a real-time, 
            multidimensional compiler environment. Build, trace, and scale cloud networks at 60 frames per second.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4"
          >
            <a
              href="#licensing"
              data-magnetic
              className={`flex items-center justify-center gap-3 h-14 px-8 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 ${colors.button}`}
            >
              <span>Get Spatial License</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#system-ide"
              data-magnetic
              className="flex items-center justify-center gap-3 h-14 px-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 text-slate-100 font-bold uppercase tracking-wider text-xs transition-all duration-300"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Watch Deep-dive (2m)</span>
            </a>
          </motion.div>

          {/* Quick Metrics ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-8 mt-6 pt-6 border-t border-white/5 text-slate-500 text-xs font-mono"
          >
            <div>
              <span className="block text-slate-300 font-semibold text-sm">99.9997%</span>
              COMPILE DEPTH
            </div>
            <div className="w-px h-8 bg-white/15" />
            <div>
              <span className="block text-slate-300 font-semibold text-sm">&lt;2.4 ms</span>
              GLOBAL LATENCY
            </div>
            <div className="w-px h-8 bg-white/15" />
            <div>
              <span className="block text-slate-300 font-semibold text-sm">4.2 Billion</span>
              NODES COMPILED
            </div>
          </motion.div>
        </div>

        {/* Right 3D Interactive Mockup Panel */}
        <div className="lg:col-span-6 relative h-[450px] lg:h-[600px] w-full flex items-center justify-center">
          
          {/* Custom Interactive Floating Nodes in 3D */}
          <motion.div
            style={{
              x: mousePosition.x * 35,
              y: mousePosition.y * 35,
              rotateX: -mousePosition.y * 12,
              rotateY: mousePosition.x * 12,
              perspective: 1000,
            }}
            data-cursor="card"
            data-spotlight
            transition={{ type: 'spring', damping: 20, stiffness: 80 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-3xl overflow-hidden cursor-grab active:cursor-grabbing group/viewport transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.12)] bg-gradient-to-b from-brand-deep/80 to-[#0c0828]/40"
          >
            {/* Visual Glass highlights inside target node viewport */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
            
            {/* Mesh background effect */}
            <div className="absolute inset-x-0 bottom-0 top-[30%] bg-[linear-gradient(to_bottom,transparent_30%,rgba(34,211,238,0.03)_100%)] cyber-grid opacity-40 pointer-events-none" />

            {/* Glowing active horizon element */}
            <div className={`absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t ${
              theme === 'cyan' ? 'from-cyan-500/10' : theme === 'purple' ? 'from-purple-500/10' : 'from-amber-500/10'
            } via-transparent to-transparent blur-md pointer-events-none`} />

            {/* Viewport Nav bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500/60" />
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/60" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-500/60" />
                <span className="text-slate-400 font-mono text-[11px] ml-2 font-medium">voryn_compiler_core.node</span>
              </div>
              <span className={`px-2 py-0.5 font-mono text-[10px] rounded border ${colors.border} ${colors.text} flex items-center gap-1`}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block" />
                STREAMING
              </span>
            </div>

            {/* Inner Interactive Visual Graph representation */}
            <div className="relative w-full h-[calc(100%-60px)] flex items-center justify-center">
              
              {/* Dynamic SVG connecting web */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Connecting web lines */}
                <path 
                  d="M 240 160 L 120 120 M 240 160 L 360 120 M 240 160 L 140 220 M 240 160 L 340 220 M 120 120 L 360 120 M 140 220 L 340 220" 
                  stroke={theme === 'cyan' ? 'url(#cyanGrad)' : theme === 'purple' ? 'url(#purpleGrad)' : 'url(#amberGrad)'} 
                  strokeWidth="1.5" 
                  className="stroke-dasharray-anim"
                  style={{ strokeDasharray: '4,4' }}
                />
              </svg>

              {/* Central Core Sphere */}
              <div className="relative h-24 w-24 rounded-full flex items-center justify-center cursor-pointer group">
                <div className={`absolute -inset-2 rounded-full bg-gradient-to-tr ${
                  theme === 'cyan' ? 'from-cyan-500/20 to-blue-500/30' : theme === 'purple' ? 'from-purple-500/20 to-pink-500/30' : 'from-amber-500/20 to-orange-500/30'
                } blur-xs animate-ping`} />
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                  theme === 'cyan' ? 'from-cyan-500 to-blue-600' : theme === 'purple' ? 'from-purple-500 to-pink-600' : 'from-amber-500 to-orange-600'
                } opacity-85 hover:scale-105 transition-transform shadow-[0_0_40px_rgba(32,211,238,0.3)] flex items-center justify-center`} />
                <div className="relative z-10 flex flex-col items-center">
                  <Terminal className="h-6 w-6 text-slate-950 font-bold" />
                  <span className="text-[9px] text-slate-950 font-mono font-black mt-1">VO-CORE</span>
                </div>
              </div>

              {/* Satellites Cards */}
              <div 
                className="absolute top-[18px] left-[15px] p-3 rounded-lg bg-[#0e0a29]/80 border border-white/5 shadow-lg flex items-center gap-2"
                style={{ transform: `scale(${isHovered ? 1.05 : 1})`, transition: 'all 0.3s' }}
              >
                <div className="p-1 px-1.5 rounded-md bg-green-500/10 text-green-400 font-mono text-[9px] font-bold">NODE 01</div>
                <div>
                  <span className="block text-[10px] text-white font-mono font-medium">9.2 KB Data Out</span>
                  <span className="block text-[8px] text-slate-400 font-mono">Sync latency: 1.1ms</span>
                </div>
              </div>

              <div 
                className="absolute top-[18px] right-[15px] p-3 rounded-lg bg-[#0e0a29]/80 border border-white/5 shadow-lg flex items-center gap-2"
                style={{ transform: `scale(${isHovered ? 1.05 : 1})`, transition: 'all 0.3s' }}
              >
                <div className={`p-1 px-1.5 rounded-md ${colors.accentGlow} ${colors.text} font-mono text-[9px] font-bold`}>NODE 02</div>
                <div>
                  <span className="block text-[10px] text-white font-mono font-medium">102 Compute Units</span>
                  <span className="block text-[8px] text-slate-400 font-mono">Active instances</span>
                </div>
              </div>

              <div 
                className="absolute bottom-[20px] left-[35px] p-3 rounded-lg bg-[#0e0a29]/80 border border-white/5 shadow-lg flex items-center gap-2"
                style={{ transform: `scale(${isHovered ? 1.05 : 1})`, transition: 'all 0.3s' }}
              >
                <div className="p-1.5 rounded bg-brand-cyan/10">
                  <Database className={`h-3 w-3 ${colors.text}`} />
                </div>
                <div>
                  <span className="block text-[10px] text-white font-mono font-medium">Memory Pool</span>
                  <span className="block text-[8px] text-green-400 font-mono">921 GB cache active</span>
                </div>
              </div>

              <div 
                className="absolute bottom-[20px] right-[35px] p-3 rounded-lg bg-[#0e0a29]/80 border border-white/5 shadow-lg flex items-center gap-2"
                style={{ transform: `scale(${isHovered ? 1.05 : 1})`, transition: 'all 0.3s' }}
              >
                <div className="p-1.5 rounded bg-brand-purple/10">
                  <Cpu className="h-3 w-3 text-purple-400" />
                </div>
                <div>
                  <span className="block text-[10px] text-white font-mono font-medium">Auto-Compiler</span>
                  <span className="block text-[8px] text-cyan-400 font-mono">Build compiled in 0.8ms</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* 3D Floating Context Nodes around (Mouse Parallax) */}
          {floatingAssets.map((asset, index) => {
            const IconComponent = asset.icon;
            // Introduce mathematical offset patterns based on index to distribute nicely
            const depthFactor = (index + 1) * 20;
            return (
              <motion.div
                key={index}
                style={{
                  top: asset.top,
                  left: asset.left,
                  right: asset.right,
                  // Higher depth factor implies greater responsive offset
                  x: mousePosition.x * depthFactor,
                  y: mousePosition.y * depthFactor,
                }}
                className="absolute z-20 hidden md:flex items-center gap-3 p-3.5 px-4 rounded-xl bg-brand-deep/80 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-lg group/asset hover:border-white/20 transition-all pointer-events-none"
              >
                <div className={`p-2 rounded-lg bg-white/5 ${colors.text} group-hover/asset:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs text-white font-semibold font-display">{asset.label}</span>
                  <span className="block text-[10px] text-slate-400 font-mono">{asset.desc}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
