import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, BarChart2, ShieldCheck, HeartPulse, Sparkles, TrendingUp } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface StatisticsProps {
  theme: VibeTheme;
  glow: GlowLevel;
}

export default function Statistics({ theme, glow }: StatisticsProps) {
  const [metricMode, setMetricMode] = useState<'throughput' | 'latency' | 'reliability'>('throughput');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Smooth counting states
  const [counters, setCounters] = useState({
    throughput: 0,
    latency: 99.9,
    savedTime: 0,
  });

  useEffect(() => {
    // Elegant incremental counter boot animation
    const interval = setTimeout(() => {
      setCounters({
        throughput: 4920,
        latency: 1.84,
        savedTime: 825,
      });
    }, 200);

    return () => clearTimeout(interval);
  }, []);

  // Custom high-end telemetry wave coordinate arrays for line charts
  const datasets = {
    throughput: [
      { text: '09:00', val: 50, desc: '450K req/s' },
      { text: '11:00', val: 80, desc: '820K req/s' },
      { text: '13:00', val: 120, desc: '1.2M req/s' },
      { text: '15:00', val: 95, desc: '980K req/s' },
      { text: '17:00', val: 160, desc: '1.6M req/s' },
      { text: '19:00', val: 140, desc: '1.4M req/s' },
      { text: '21:00', val: 210, desc: '2.1M req/s' },
    ],
    latency: [
      { text: '09:00', val: 120, desc: '4.8ms wait' },
      { text: '11:00', val: 90, desc: '3.1ms wait' },
      { text: '13:00', val: 70, desc: '2.4ms wait' },
      { text: '15:00', val: 85, desc: '2.9ms wait' },
      { text: '17:00', val: 55, desc: '1.8ms wait' },
      { text: '19:00', val: 62, desc: '2.1ms wait' },
      { text: '21:00', val: 40, desc: '1.1ms wait' },
    ],
    reliability: [
      { text: '09:00', val: 180, desc: '99.99%' },
      { text: '11:00', val: 190, desc: '99.99%' },
      { text: '13:00', val: 200, desc: '100%' },
      { text: '15:00', val: 195, desc: '99.99%' },
      { text: '17:00', val: 200, desc: '100%' },
      { text: '19:00', val: 200, desc: '100%' },
      { text: '21:00', val: 220, desc: '100%' },
    ],
  };

  const getThemeColors = () => {
    if (theme === 'cyan') return {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      fill: '#22d3ee',
      shadow: 'shadow-[0_0_20px_rgba(34,211,238,0.2)]',
    };
    if (theme === 'purple') return {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      fill: '#a855f7',
      shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    };
    return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      fill: '#f59e0b',
      shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
    };
  };

  const colors = getThemeColors();
  const currentData = datasets[metricMode];

  // Convert points to SVG polyline coordinates
  const pointsString = currentData.map((d, i) => `${(i * 100) + 50},${250 - d.val}`).join(' ');

  return (
    <section id="analytics" className="relative py-28 overflow-hidden bg-[#030014]">
      {/* Glow Backdrops */}
      <div className="absolute right-10 bottom-10 w-96 h-96 bg-purple-500/5 filter blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] rounded-full border ${colors.border} ${colors.text} uppercase tracking-wider mb-4`}>
            REALTIME TELEMETRY ENGINE
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Performant. Traceable. Infinite.
          </h2>
          <p className="text-slate-400 text-lg mt-4 leading-relaxed max-w-xl">
            Aether provides deep kernel diagnostics with instant feedback loops. Watch compiler throughput and latency cycles live.
          </p>
        </div>

        {/* Dynamic Metric Dashboard Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* Left stats panel columns (5 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Stat Card 1 */}
            <div 
              data-cursor="card"
              data-tilt
              data-spotlight
              className={`p-6 rounded-2xl bg-[#080521]/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between h-40 relative group overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${colors.shadow}`}
            >
              {/* Spotlight reflection shadow background layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
                style={{
                  background: 'radial-gradient(180px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(34, 211, 238, 0.08) 0%, transparent 80%)'
                }}
              />

              <div className="flex justify-between items-start relative z-10">
                <span className="text-xs uppercase tracking-wider font-mono font-medium text-slate-400">Total Compiled</span>
                <div className={`p-2 rounded bg-white/5 ${colors.text}`}>
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <div className="relative z-10">
                <motion.span 
                  className="font-display font-bold text-3xl md:text-4xl text-white block mt-2"
                >
                  {counters.throughput > 0 ? '4,921,802' : '0'}
                </motion.span>
                <span className="text-xs font-sans text-slate-400">transactions/min compiled live</span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div 
              data-cursor="card"
              data-tilt
              data-spotlight
              className={`p-6 rounded-2xl bg-[#080521]/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between h-40 relative group overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${colors.shadow}`}
            >
              {/* Spotlight reflection shadow background layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
                style={{
                  background: 'radial-gradient(180px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(168, 85, 247, 0.08) 0%, transparent 80%)'
                }}
              />

              <div className="flex justify-between items-start relative z-10">
                <span className="text-xs uppercase tracking-wider font-mono font-medium text-slate-400">Average Latency</span>
                <div className="p-2 rounded bg-white/5 text-purple-400">
                  <HeartPulse className="h-4 w-4" />
                </div>
              </div>
              <div className="relative z-10">
                <span className="font-display font-bold text-3xl md:text-4xl text-white block mt-2">
                  {counters.latency > 2 ? '0.00' : '1.84ms'}
                </span>
                <span className="text-xs font-sans text-slate-400">global routing node average</span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div 
              data-cursor="card"
              data-tilt
              data-spotlight
              className={`p-6 rounded-2xl bg-[#080521]/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between h-40 relative group overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${colors.shadow}`}
            >
              {/* Spotlight reflection shadow background layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
                style={{
                  background: 'radial-gradient(180px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(16, 185, 129, 0.08) 0%, transparent 80%)'
                }}
              />

              <div className="flex justify-between items-start relative z-10">
                <span className="text-xs uppercase tracking-wider font-mono font-medium text-slate-400">Saved DevOps Time</span>
                <div className="p-2 rounded bg-white/5 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              </div>
              <div className="relative z-10">
                <span className="font-display font-bold text-3xl md:text-4xl text-white block mt-2">
                  {counters.savedTime > 0 ? '825 Hrs' : '0 Hrs'}
                </span>
                <span className="text-xs font-sans text-slate-400">average developer saved / year</span>
              </div>
            </div>

          </div>

          {/* Right line chart card column (8 cols) */}
          <div 
            data-cursor="card"
            data-tilt
            data-spotlight
            className="lg:col-span-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.01] border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all min-h-[480px] relative overflow-hidden perspective-element hover:translate-z-6"
          >
            {/* Spotlight reflection shadow background layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
              style={{
                background: 'radial-gradient(420px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(255, 255, 255, 0.04) 0%, transparent 80%)'
              }}
            />
            
            {/* Chart controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 mb-6 gap-4 relative z-10">
              <div>
                <span className="font-display font-bold text-sm text-white block">Cluster Performance Stream</span>
                <span className="font-mono text-[10px] text-slate-400">Interactive live compile metrics</span>
              </div>

              {/* Toggle controls */}
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950/80 border border-white/5">
                {[
                  { id: 'throughput', label: 'Packets/s' },
                  { id: 'latency', label: 'Latency' },
                  { id: 'reliability', label: 'Nodes' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setMetricMode(mode.id as any)}
                    data-magnetic
                    className={`px-3 py-1.5 rounded text-[11px] font-mono font-medium uppercase transition-all ${
                      metricMode === mode.id 
                        ? 'bg-white/10 text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Line wave representation (SVG based) */}
            <div className="relative flex-1 w-full h-[280px] flex items-end justify-center">
              
              {/* Plot bounds & gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="h-px w-full bg-white/5" />
                <div className="h-px w-full bg-white/5" />
                <div className="h-px w-full bg-white/5" />
                <div className="h-px w-full bg-white/5" />
                <div className="h-px w-full bg-white/5" />
              </div>

              {/* Main SVG Plot Canvas */}
              <svg className="w-full h-full overflow-visible z-10">
                <defs>
                  <linearGradient id="gradientThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.fill} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={colors.fill} stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Shaded Area Under Line */}
                <path
                  d={`M 50,250 ${currentData.map((d, i) => `L ${(i * 100) + 50},${250 - d.val}`).join(' ')} L ${((currentData.length - 1) * 100) + 50},250 Z`}
                  fill="url(#gradientThroughput)"
                  className="transition-all duration-750 ease-out"
                />

                {/* Connecting Web Line */}
                <polyline
                  fill="none"
                  stroke={colors.fill}
                  strokeWidth="2.5"
                  points={pointsString}
                  className="transition-all duration-750 ease-out"
                />

                {/* Plot Data Nodes */}
                {currentData.map((d, i) => {
                  const cx = (i * 100) + 50;
                  const cy = 250 - d.val;
                  const isHovered = hoveredPointIndex === i;

                  return (
                    <g key={i} className="cursor-pointer group">
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 8 : 4.5}
                        fill={isHovered ? '#ffffff' : colors.fill}
                        stroke="#030014"
                        strokeWidth="1.5"
                        onMouseEnter={() => setHoveredPointIndex(i)}
                        onMouseLeave={() => setHoveredPointIndex(null)}
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip Overlay */}
              <AnimatePresence>
                {hoveredPointIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      left: `${(hoveredPointIndex * 100) / (currentData.length - 1) * 75 + 10}%`,
                      bottom: `${currentData[hoveredPointIndex].val / 2.5 + 30}px`,
                    }}
                    className="absolute z-20 p-2.5 rounded-lg bg-slate-950/95 border border-white/10 shadow-lg text-left text-[11px] font-mono pointer-events-none"
                  >
                    <span className="block text-slate-500 uppercase text-[9px] font-bold">TIME RECORDED: {currentData[hoveredPointIndex].text}</span>
                    <span className={`block font-semibold ${colors.text} text-xs mt-0.5`}>{currentData[hoveredPointIndex].desc}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom X-Axis timestamps */}
            <div className="flex justify-between items-center px-4 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-500">
              {currentData.map((d, i) => (
                <span key={i}>{d.text}</span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
