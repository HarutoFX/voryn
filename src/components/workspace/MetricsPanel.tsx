import type React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';

type VibeTheme = 'cyan' | 'purple' | 'amber';

interface MetricsPanelProps {
  ollamaStatus: 'testing' | 'online' | 'offline';
  ollamaUrl: string;
  selectedModel: string;
  availableModels: string[];
  cpuUsage: number;
  ramUsage: number;
  synapsesCount: number;
  compileLatency: number;
  theme: VibeTheme;
  onOllamaUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTestOllamaConnection: () => void;
  onSelectedModelChange: (value: string) => void;
}

export default function MetricsPanel({
  ollamaStatus,
  ollamaUrl,
  selectedModel,
  availableModels,
  cpuUsage,
  ramUsage,
  synapsesCount,
  compileLatency,
  theme,
  onOllamaUrlChange,
  onTestOllamaConnection,
  onSelectedModelChange,
}: MetricsPanelProps) {
  return (
    <aside className="xl:col-span-3 premium-surface-strong p-4 sm:p-5 flex flex-col gap-6 max-h-[calc(100vh-77px)] overflow-y-auto select-none xl:border-l xl:border-white/8">
      <div className="rounded-3xl border border-white/6 bg-white/[0.02] p-4 shadow-[0_20px_50px_rgba(2,6,23,0.18)]">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-4">
          <span className="text-[10px] font-mono tracking-[0.22em] font-semibold text-slate-500 flex items-center gap-1.5 uppercase">
            Ollama Core Tuner
          </span>
          <div className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold border ${ollamaStatus === 'online' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : ollamaStatus === 'testing' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse' : 'bg-slate-500/10 border-slate-500/30 text-slate-500'}`}>
            {ollamaStatus.toUpperCase()}
          </div>
        </div>
        <div className="space-y-3 p-3.5 bg-black/20 border border-white/5 rounded-2xl">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-[0.16em]">Remote API Client URL</label>
            <div className="flex gap-2">
              <input type="text" value={ollamaUrl} onChange={onOllamaUrlChange} placeholder="http://localhost:11434" className="flex-1 bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none premium-input" />
              <button onClick={onTestOllamaConnection} data-magnetic title="Validate connection" className="px-3 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-all flex items-center justify-center cursor-pointer premium-button">
                <span className="text-xs">↻</span>
              </button>
            </div>
          </div>
          {ollamaStatus === 'online' ? (
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-medium text-slate-500 uppercase block tracking-[0.16em]">Active Container Models</label>
              <select value={selectedModel} onChange={(e) => onSelectedModelChange(e.target.value)} className="w-full text-xs font-mono bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2.5 text-white outline-none premium-input">
                {availableModels.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          ) : (
            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-2xl text-[10px] font-mono leading-relaxed text-red-300">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-red-400">
                <ShieldAlert className="h-3.5 w-3.5" /> OLLAMA OFFLINE
              </div>
              System is operating on the synaptic fallback layer. Ensure Docker is running local LLM configurations on port 11434 to align weights physically.
            </div>
          )}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-mono tracking-[0.22em] font-semibold text-slate-500 block mb-3 uppercase">Hardware Telemetry Index</span>
        <div className="space-y-3.5">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                Processor Alignment Load
              </span>
              <strong className="text-white">{cpuUsage}%</strong>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
              <div className={`h-full transition-all duration-500 rounded-full ${cpuUsage > 75 ? 'bg-rose-500' : cpuUsage > 40 ? 'bg-amber-500' : theme === 'cyan' ? 'bg-cyan-400' : theme === 'purple' ? 'bg-purple-400' : 'bg-amber-400'}`} style={{ width: `${cpuUsage}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-[0.16em]">Active Neurons</span>
              <p className="font-mono text-sm font-semibold text-white tracking-wider">{synapsesCount.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-[0.16em]">RAM Core Alloc</span>
              <p className="font-mono text-sm font-semibold text-white tracking-wider">{ramUsage.toFixed(2)} GB</p>
            </div>
          </div>
          <div className="p-3.5 bg-slate-950/80 border border-white/5 rounded-2xl space-y-2">
            <span className="text-[9px] font-mono font-semibold text-slate-500 uppercase block tracking-[0.16em]">High-Frequency Telemetry Osc</span>
            <div className="h-16 flex items-center justify-center relative bg-black/40 rounded-xl overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 160 50">
                <defs>
                  <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                  </linearGradient>
                </defs>
                <path d={`M0 25 Q 40 ${25 + Math.sin(Date.now() / 200) * 15} 80 ${25 - Math.sin(Date.now() / 200) * 15} T 160 25`} fill="none" stroke="url(#glowGrad)" strokeWidth="2" />
                <path d={`M0 25 T 40 ${25 - Math.cos(Date.now() / 300) * 8} T 120 ${25 + Math.cos(Date.now() / 300) * 8} T 160 25`} fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" />
              </svg>
              <span className="absolute bottom-1 right-1.5 text-[8px] font-mono text-slate-600 tracking-wider">FIPS Level 4 Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-[160px]">
        <span className="text-[10px] font-mono tracking-[0.22em] font-semibold text-slate-500 block mb-2.5 uppercase">Trace Stream Verification</span>
        <div className="flex-1 bg-black/60 p-3.5 rounded-2xl border border-white/5 font-mono text-[10px] text-slate-400 space-y-2 select-text overflow-y-auto max-h-[180px] scrollbar-thin">
          <div className="leading-relaxed border-l-2 border-cyan-500/20 pl-2">
            <span className="text-cyan-500/60 font-semibold mr-1">Voryn$</span>
            Latency Stream: <strong className="text-white">{compileLatency}ms</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}
