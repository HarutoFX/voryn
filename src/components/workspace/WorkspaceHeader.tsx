import type React from 'react';
import { Activity, ArrowLeft, Database, Volume2, VolumeX } from 'lucide-react';

type VibeTheme = 'cyan' | 'purple' | 'amber';

interface WorkspaceHeaderProps {
  theme: VibeTheme;
  synthEnabled: boolean;
  synthVolume: number;
  memoriesCount: number;
  onToggleSynth: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThemeChange: (theme: VibeTheme) => void;
}

export default function WorkspaceHeader({
  theme,
  synthEnabled,
  synthVolume,
  memoriesCount,
  onToggleSynth,
  onVolumeChange,
  onThemeChange,
}: WorkspaceHeaderProps) {
  return (
    <header className="relative z-40 px-4 sm:px-6 py-4 sm:py-4 flex items-center justify-between premium-surface">
      <div className="flex items-center gap-4">
        <a
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white premium-button"
          title="Return to Marketing Landing"
          data-magnetic
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-[11px] font-mono font-semibold uppercase hidden sm:inline tracking-[0.18em]">Landing Page</span>
        </a>
        <div className="w-px h-6 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2.5">
          <div className={`h-2.5 w-2.5 rounded-full shadow-[0_0_16px_rgba(34,211,238,0.45)] ${theme === 'cyan' ? 'bg-cyan-400' : theme === 'purple' ? 'bg-purple-400' : 'bg-amber-400'}`} />
          <span className="font-display font-semibold tracking-tight text-white flex items-center gap-2 text-[15px] sm:text-base">
            VORYN <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/8 border border-white/10 font-bold tracking-[0.18em] text-slate-300">Workspace</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-mono text-slate-400 shadow-[0_10px_30px_rgba(2,6,23,0.25)]">
          <Database className="h-3.5 w-3.5 text-slate-500" />
          <span>Memory: <strong className="text-white">{memoriesCount} rules</strong></span>
          <span className="text-white/20">|</span>
          <Activity className="h-3.5 w-3.5 text-slate-500" />
          <span>Threads: <strong className="text-white">8 active</strong></span>
        </div>

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1.5 px-3">
          <button
            onClick={onToggleSynth}
            title={synthEnabled ? 'Mute Drone' : 'Amplify Ambient Drone'}
            data-magnetic
            className={`p-2 rounded-xl premium-button ${
              synthEnabled ? 'text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 shadow-[0_0_24px_rgba(34,211,238,0.12)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            {synthEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={synthVolume}
            onChange={onVolumeChange}
            className="w-20 sm:w-24 h-1.5 rounded-lg accent-cyan-400 cursor-pointer bg-white/10"
            title="Drone volume"
          />
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
          {(['cyan', 'purple', 'amber'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onThemeChange(t)}
              className={`w-5 h-5 rounded-full border ${
                t === 'cyan' ? 'bg-cyan-500 border-cyan-300' : t === 'purple' ? 'bg-purple-500 border-purple-300' : 'bg-amber-500 border-amber-300'
              } ${theme === t ? 'opacity-100 scale-110 shadow-[0_0_16px_rgba(255,255,255,0.1)]' : 'opacity-45 hover:opacity-80'} premium-button`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
