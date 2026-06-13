import type React from 'react';
import { Brain, Plus, X } from 'lucide-react';

interface MemoryItem {
  id: string;
  fact: string;
  category: 'system' | 'optimization' | 'identity' | 'general';
  createdAt: string;
}

interface MemoryPanelProps {
  memories: MemoryItem[];
  newMemoryText: string;
  newMemoryCategory: MemoryItem['category'];
  onNewMemoryTextChange: (value: string) => void;
  onNewMemoryCategoryChange: (value: MemoryItem['category']) => void;
  onAddMemory: () => void;
  onDeleteMemory: (id: string) => void;
}

export default function MemoryPanel({
  memories,
  newMemoryText,
  newMemoryCategory,
  onNewMemoryTextChange,
  onNewMemoryCategoryChange,
  onAddMemory,
  onDeleteMemory,
}: MemoryPanelProps) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
        <span className="text-[10px] font-mono tracking-wider font-bold text-slate-500 flex items-center gap-1.5 uppercase">
          <Brain className="h-3.5 w-3.5 text-purple-400" />
          Neural Memory Cache
        </span>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-400">
          {memories.length} facts
        </span>
      </div>
      <div className="space-y-1.5 mb-4 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
        <input
          type="text"
          placeholder="Insert custom rule (e.g. AWS cluster priorities)"
          value={newMemoryText}
          onChange={(e) => onNewMemoryTextChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAddMemory()}
          className="w-full text-xs font-mono p-2 rounded bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
        />
        <div className="flex items-center justify-between gap-1.5">
          <select
            value={newMemoryCategory}
            onChange={(e) => onNewMemoryCategoryChange(e.target.value as MemoryItem['category'])}
            className="text-[10px] font-mono bg-slate-900 border border-white/5 text-slate-400 rounded px-1.5 py-1 focus:outline-none"
          >
            <option value="general">GENERAL</option>
            <option value="system">SYSTEM</option>
            <option value="optimization">OPTIMIZATION</option>
            <option value="identity">IDENTITY</option>
          </select>
          <button
            onClick={onAddMemory}
            data-magnetic
            className="bg-white/5 hover:bg-white/10 border border-white/5 rounded p-1 px-3 text-[10px] font-mono font-bold flex items-center gap-1 text-slate-200 transition-all"
          >
            <Plus className="h-3 w-3" /> Align Memory
          </button>
        </div>
      </div>
      <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-thin">
        {memories.length === 0 ? (
          <div className="text-[10px] font-mono text-slate-600 text-center py-4">No memories aligned yet. Add facts above.</div>
        ) : (
          memories.map((m) => (
            <div key={m.id} className="p-2 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-between text-[11px] font-mono gap-3 hover:bg-white/5 transition-all group">
              <div className="flex-1 overflow-hidden">
                <span className={`text-[9px] uppercase font-bold tracking-wider mr-1 px-1.5 py-0.2 rounded bg-white/5 ${m.category === 'optimization' ? 'text-emerald-400' : m.category === 'system' ? 'text-cyan-400' : 'text-slate-400'}`}>
                  {m.category}
                </span>
                <p className="text-slate-300 leading-normal line-clamp-2 mt-1">{m.fact}</p>
              </div>
              <button onClick={() => onDeleteMemory(m.id)} className="p-1 rounded text-slate-600 hover:text-red-400 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all" title="Forgot memory node">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
