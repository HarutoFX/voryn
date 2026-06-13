import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Zap, RefreshCw, Layers, Globe, ChevronRight, Check } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface FeaturesGridProps {
  theme: VibeTheme;
  glow: GlowLevel;
}

export default function FeaturesGrid({ theme, glow }: FeaturesGridProps) {
  // Console state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'voryn init system-cluster',
    '● BOOTING CLOUD INSTANCE: tokyo-alpha-09',
    '✓ MEMORY POOL SYNC COMPLETE',
  ]);
  const [activeInput, setActiveInput] = useState('');
  
  // Ping trace state
  const [traceState, setTraceState] = useState<'idle' | 'running' | 'done'>('idle');
  const [latencyStats, setLatencyStats] = useState({ Tokyo: '1ms', London: '32ms', SFO: '18ms' });
  const [pingProgress, setPingProgress] = useState(0);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncPercentage, setSyncPercentage] = useState(100);

  // Sync handler
  const handleTriggerSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncPercentage(0);
    
    const interval = setInterval(() => {
      setSyncPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Run virtual command
  const runConsoleCommand = (cmd: string) => {
    setConsoleLogs((prev) => [...prev, `voryn run ${cmd}`, `● EXECUTED: ${cmd.toUpperCase()}_PIPELINE`, `✓ COMPILE SUCCEEDED: 1.09ms`]);
  };

  // Trigger Packet Trace Simulator
  const triggerPacketTrace = () => {
    if (traceState === 'running') return;
    setTraceState('running');
    setPingProgress(0);
    
    const interval = setInterval(() => {
      setPingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTraceState('done');
          setLatencyStats({
            Tokyo: `${(Math.random() * 2 + 0.4).toFixed(2)}ms`,
            London: `${(Math.random() * 5 + 26.2).toFixed(2)}ms`,
            SFO: `${(Math.random() * 4 + 14.5).toFixed(2)}ms`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const getThemeColors = () => {
    if (theme === 'cyan') return {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      gradient: 'from-cyan-500 to-blue-500',
    };
    if (theme === 'purple') return {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      gradient: 'from-purple-500 to-indigo-500',
    };
    return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      gradient: 'from-amber-500 to-orange-500',
    };
  };

  const colors = getThemeColors();

  return (
    <section id="features" className="relative py-28 overflow-hidden bg-brand-deep">
      
      {/* Background radial soft light */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <span className={`px-3 py-1 font-mono text-[11px] rounded-full border ${colors.border} ${colors.bg} ${colors.text} mb-4 font-semibold uppercase tracking-wider`}>
            ENGINE STACK
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Built on pure spatial engineering.
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-4 leading-relaxed">
            Voryn consolidates thousands of server transactions into structured, micro-reactive viewport grid widgets.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 perspective-card-container">
          
          {/* Card 1: Interactive Terminal Widget (7 cols on MD/LG) */}
          <div 
            data-cursor="card"
            data-tilt
            data-spotlight
            className="md:col-span-7 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between group hover:border-white/20 transition-all h-[420px] relative overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Spotlight reflection shadow background layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
              style={{
                background: 'radial-gradient(320px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(34, 211, 238, 0.07) 0%, transparent 80%)'
              }}
            />
            
            <div className="w-full relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className={`h-5 w-5 ${colors.text}`} />
                  <span className="font-display font-bold text-sm text-white">Dynamic Console Controller</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">interactive shell</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Execute core compiler shortcuts instantly and view spatial compilation outputs in real-time.
              </p>

              {/* Console simulator */}
              <div className="bg-slate-950/95 border border-white/5 rounded-xl p-4 font-mono text-[11px] leading-5 text-slate-300 h-44 overflow-y-auto custom-scrollbar shadow-inner">
                {consoleLogs.map((log, i) => (
                  <div key={i} className={log.startsWith('✓') ? 'text-green-400' : log.startsWith('●') ? colors.text : 'text-slate-300'}>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2 relative z-10">
              <span className="text-xs text-slate-400 font-mono font-medium">Quick Scripts:</span>
              {['opt_mem_pool', 'mesh_trace', 'reboot_alpha'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runConsoleCommand(cmd)}
                  data-magnetic
                  className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-100 text-[10px] font-mono px-3 py-1.5 rounded transition-all active:scale-95"
                >
                  ./{cmd}.sh
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Micro-State Sync Dial (5 cols) */}
          <div 
            data-cursor="card"
            data-tilt
            data-spotlight
            className="md:col-span-5 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between group hover:border-white/20 transition-all h-[420px] relative overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Spotlight reflection shadow background layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
              style={{
                background: 'radial-gradient(320px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(168, 85, 247, 0.08) 0%, transparent 80%)'
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-400" />
                  <span className="font-display font-bold text-sm text-white">Cryptographic Mesh Synergizer</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">atomic sync</span>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                Align state across distributed data centers with mathematically secure quantum hashes.
              </p>

              <div className="flex flex-col items-center justify-center p-4 relative">
                {/* Dial structure */}
                <div className="relative h-28 w-28 rounded-full border border-white/15 flex items-center justify-center">
                  {/* Rotating visual gradient ring */}
                  <motion.div 
                    animate={isSyncing ? { rotate: 360 } : {}}
                    transition={isSyncing ? { repeat: Infinity, duration: 1.5, ease: 'linear' } : {}}
                    className={`absolute -inset-1 rounded-full border-t-2 border-r-2 ${
                      theme === 'cyan' ? 'border-cyan-400' : theme === 'purple' ? 'border-purple-400' : 'border-amber-400'
                    } opacity-40 pointer-events-none`}
                  />
                  <div className="flex flex-col items-center text-center">
                    <span className="text-lg font-mono font-bold text-white">{syncPercentage}%</span>
                    <span className="text-[9px] font-sans text-slate-400 uppercase tracking-wider font-semibold">SYNCHRONIZED</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              data-magnetic
              className={`w-full py-3 rounded-xl border font-bold font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all relative z-10 ${
                isSyncing 
                  ? 'border-white/10 text-slate-500 bg-white/5 cursor-not-allowed'
                  : theme === 'cyan' 
                    ? 'border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10' 
                    : theme === 'purple' 
                      ? 'border-purple-500/20 hover:border-purple-500/40 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10' 
                      : 'border-amber-500/20 hover:border-amber-500/40 text-amber-400 bg-amber-500/5 hover:bg-amber-500/10'
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>SYNCHRONIZING SECURE TUNNELS...</span>
                </>
              ) : (
                <>
                  <Shield className="h-3.5 w-3.5" />
                  <span>SYNC CRYPTO-MEMBER STACK</span>
                </>
              )}
            </button>
          </div>

          {/* Card 3: Multi-Region Packet Trace Simulator (5 cols) */}
          <div 
            data-cursor="card"
            data-tilt
            data-spotlight
            className="md:col-span-5 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between group hover:border-white/20 transition-all h-[420px] relative overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Spotlight reflection shadow background layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
              style={{
                background: 'radial-gradient(320px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(59, 130, 246, 0.08) 0%, transparent 80%)'
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span className="font-display font-bold text-sm text-white">Global Edge Node Tracing</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">live ping map</span>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                Trace real-time packet transmissions from active server blocks around the world.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(latencyStats).map(([region, latency]) => (
                  <div key={region} className="flex justify-between items-center p-2.5 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {region} Server Node
                    </span>
                    <span className={`font-semibold ${colors.text} animate-pulse`}>{latency}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={triggerPacketTrace}
              data-magnetic
              className={`w-full py-3 rounded-xl border font-bold font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all relative z-10 ${
                traceState === 'running'
                  ? 'border-white/10 text-slate-500 bg-white/5 cursor-not-allowed'
                  : theme === 'cyan' 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 hover:bg-cyan-400' 
                    : theme === 'purple' 
                      ? 'bg-purple-500 text-white border-purple-400 hover:bg-purple-400' 
                      : 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400'
              }`}
            >
              {traceState === 'running' ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>TRANSMITTING PACKETS... {pingProgress}%</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5" />
                  <span>DIAGNOSTICS: RUN PACKET TRACE</span>
                </>
              )}
            </button>
          </div>

          {/* Card 4: Hardware Matrix Core Specifications (7 cols) */}
          <div 
            data-cursor="card"
            data-tilt
            data-spotlight
            className="md:col-span-7 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between group hover:border-white/20 transition-all h-[420px] relative overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Spotlight reflection shadow background layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
              style={{
                background: 'radial-gradient(320px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(16, 185, 129, 0.08) 0%, transparent 80%)'
              }}
            />

            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <span className="font-display font-bold text-sm text-white">Kernel Architecture Safety Matrix</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">eBPF compiler sandboxing</span>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                Voryn sandboxes all memory and code compilations inside high-performance hardware-level isolated spaces prior to cloud publishing.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Isolated eBPF Runtimes', desc: 'Secure direct kernel interaction hooks' },
                  { title: 'Deterministic Builds', desc: 'Repeatable builds signed via Ledger protocols' },
                  { title: 'Zero-Leak Memory management', desc: 'Pre-allocation of data structures' },
                  { title: 'Hardware TLS Accel', desc: 'Cryptography integrated direct to CPU modules' }
                ].map((spec, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/10 transition-all">
                    <span className="flex items-center gap-1.5 text-xs font-semibold font-display text-white mb-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      {spec.title}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-relaxed block">{spec.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs text-slate-400 font-mono relative z-10">
              <span>Security Certification: FIPS 140-3 Level 4</span>
              <a 
                href="#licensing" 
                data-magnetic
                className={`flex items-center gap-1 hover:underline ${colors.text}`}
              >
                view audit logs
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
