import type React from 'react';
import { Activity, Brain, Clock, Cpu, Layers, Terminal, Trash2, Plus } from 'lucide-react';
import MemoryPanel from './MemoryPanel';

type VibeTheme = 'cyan' | 'purple' | 'amber';

interface MemoryItem {
  id: string;
  fact: string;
  category: 'system' | 'optimization' | 'identity' | 'general';
  createdAt: string;
}

interface ChatThread {
  id: string;
  title: string;
  createdAt: string;
}

interface SidebarProps {
  memories: MemoryItem[];
  newMemoryText: string;
  newMemoryCategory: MemoryItem['category'];
  threads: ChatThread[];
  activeThreadId: string;
  cortexMode: 'standard' | 'deep' | 'register';
  theme: VibeTheme;
  onNewMemoryTextChange: (value: string) => void;
  onNewMemoryCategoryChange: (value: MemoryItem['category']) => void;
  onAddMemory: () => void;
  onDeleteMemory: (id: string) => void;
  onSetCortexMode: (mode: 'standard' | 'deep' | 'register') => void;
  onNewSession: () => void;
  onSetActiveThreadId: (id: string) => void;
  onDeleteThread: (id: string, event: React.MouseEvent) => void;
  onAddLog: (log: string) => void;
  getThemeTextClass: () => string;
}

export default function Sidebar({
  memories,
  newMemoryText,
  newMemoryCategory,
  threads,
  activeThreadId,
  cortexMode,
  theme,
  onNewMemoryTextChange,
  onNewMemoryCategoryChange,
  onAddMemory,
  onDeleteMemory,
  onSetCortexMode,
  onNewSession,
  onSetActiveThreadId,
  onDeleteThread,
  onAddLog,
  getThemeTextClass,
}: SidebarProps) {
  return (
    <aside className="xl:col-span-3 premium-surface-strong p-4 sm:p-5 flex flex-col gap-6 select-none max-h-[calc(100vh-77px)] overflow-y-auto xl:border-r xl:border-white/8">
      <MemoryPanel
        memories={memories}
        newMemoryText={newMemoryText}
        newMemoryCategory={newMemoryCategory}
        onNewMemoryTextChange={onNewMemoryTextChange}
        onNewMemoryCategoryChange={onNewMemoryCategoryChange}
        onAddMemory={onAddMemory}
        onDeleteMemory={onDeleteMemory}
      />

      <div className="rounded-3xl border border-white/6 bg-white/[0.02] p-4 shadow-[0_20px_50px_rgba(2,6,23,0.18)]">
        <span className="text-[10px] font-mono tracking-[0.22em] font-semibold text-slate-500 block mb-3 uppercase">Cortex Logic Protocols</span>
        <div className="grid grid-cols-3 gap-2 p-1 bg-black/20 border border-white/5 rounded-2xl">
          {(['standard', 'deep', 'register'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                onSetCortexMode(mode);
                onAddLog(`Cortex protocol re-aligned: [${mode.toUpperCase()}] mode initialized.`);
              }}
              data-magnetic
              className={`py-2.5 rounded-xl font-mono text-[9px] font-bold uppercase tracking-[0.16em] transition-all flex flex-col items-center gap-1.5 text-center premium-button ${cortexMode === mode ? 'bg-white/10 text-white shadow-[0_10px_30px_rgba(2,6,23,0.25)] border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/6'}`}
            >
              {mode === 'standard' && <Cpu className="h-3.5 w-3.5" />}
              {mode === 'deep' && <Brain className="h-3.5 w-3.5" />}
              {mode === 'register' && <Layers className="h-3.5 w-3.5" />}
              <span>{mode}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 p-3 bg-white/[0.02] border border-white/5 rounded-2xl max-h-[96px] overflow-hidden text-[10px] font-mono text-slate-400 leading-relaxed">
          {cortexMode === 'standard' && '⚡ Lightweight direct queries routed straight to compilers. Minimal thought overhead or latency metrics.'}
          {cortexMode === 'deep' && '🧠 Full cognitive synthesis. Traces sequential thought alignment stacks, retrieving memories automatically.'}
          {cortexMode === 'register' && '⚙️ Visualizes direct hardware alignments. Maps hex values, compiler map pointers, and stack buffers.'}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-[160px]">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2.5">
          <span className="text-[10px] font-mono tracking-[0.22em] font-semibold text-slate-500 flex items-center gap-1.5 uppercase">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            Active Synthesis Streams
          </span>
          <button onClick={onNewSession} data-magnetic className="px-2.5 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold flex items-center gap-1.5 hover:bg-cyan-400/20 premium-button">
            <Plus className="h-3 w-3" /> New
          </button>
        </div>
        <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[220px]">
          {threads.map((t) => {
            const isActive = activeThreadId === t.id;
            return (
              <div
                key={t.id}
                onClick={() => onSetActiveThreadId(t.id)}
                className={`group p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all premium-button ${isActive ? 'bg-white/10 border-white/15 text-white shadow-[0_12px_35px_rgba(2,6,23,0.25)]' : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Terminal className={`h-3.5 w-3.5 ${isActive ? getThemeTextClass() : 'text-slate-600'}`} />
                  <span className="font-mono text-[11px] truncate max-w-[150px]">{t.title}</span>
                </div>
                {threads.length > 1 && (
                  <button onClick={(e) => onDeleteThread(t.id, e)} className="p-1.5 rounded-full text-slate-600 hover:text-red-400 hover:bg-white/5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 xl:opacity-100 transition-all premium-button" title="Decouple thread stream">
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
