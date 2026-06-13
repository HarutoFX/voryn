import type React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Brain, Copy, Cpu, FileCode, Loader2, Mic, Paperclip, Send, X } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'voryn';
  text: string;
  timestamp: string;
  thoughts?: string[];
  mode?: 'standard' | 'deep' | 'register';
  attachedFiles?: Array<{ name: string; content: string; size: string }>;
}

interface ChatPanelProps {
  messages: Message[];
  isStreaming: boolean;
  attachedFiles: Array<{ name: string; content: string; size: string }>;
  isDragging: boolean;
  isListening: boolean;
  activeThreadTitle: string;
  compileLatency: number;
  theme: 'cyan' | 'purple' | 'amber';
  getThemeTextClass: () => string;
  getThemeButtonClass: () => string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  waveCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  inputText: string;
  onSetInputText: (value: string) => void;
  onExecuteMessageQuery: () => void;
  onHandleToggleVoice: () => void;
  onHandleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onHandleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onHandleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemoveFileAttachment: (index: number) => void;
  onAddLog: (log: string) => void;
}

export default function ChatPanel(props: ChatPanelProps) {
  const {
    messages,
    isStreaming,
    attachedFiles,
    isDragging,
    isListening,
    activeThreadTitle,
    compileLatency,
    theme,
    getThemeTextClass,
    getThemeButtonClass,
    messagesEndRef,
    waveCanvasRef,
    fileInputRef,
    inputText,
    onSetInputText,
    onExecuteMessageQuery,
    onHandleToggleVoice,
    onHandleFileSelect,
    onHandleDragOver,
    onHandleDragLeave,
    onHandleDrop,
    onRemoveFileAttachment,
    onAddLog,
  } = props;

  return (
    <main className="xl:col-span-6 premium-surface flex flex-col max-h-[calc(100vh-77px)] relative">
      <div className="px-4 sm:px-5 py-3.5 bg-slate-950/55 border-b border-white/5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300 tracking-[0.18em] uppercase">Active Compiler Sandbox</span>
          <span className={`px-2 py-0.5 rounded-full bg-white/5 border border-white/5 ${getThemeTextClass()}`}>{activeThreadTitle || 'Core Pipeline'}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span>Latency Stream: <strong className={getThemeTextClass()}>{compileLatency}ms</strong></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
        {messages.map((m, index) => {
          const isVoryn = m.sender === 'voryn';
          return (
            <div key={m.id || index} className={`flex ${isVoryn ? 'justify-start' : 'justify-end'} items-start gap-3 sm:gap-4`}>
              {isVoryn && (
                <div className={`p-2.5 rounded-2xl flex-shrink-0 border bg-gradient-to-tr from-[#0b0525] to-[#121a36] ${theme === 'cyan' ? 'border-cyan-500/30 text-cyan-400' : theme === 'purple' ? 'border-purple-500/30 text-purple-400' : 'border-amber-500/30 text-amber-400'} shadow-[0_14px_35px_rgba(2,6,23,0.28)]`}>
                  <Cpu className="h-5 w-5" />
                </div>
              )}

              <div className="w-full max-w-2xl flex flex-col gap-2.5">
                {!isVoryn && m.attachedFiles && m.attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {m.attachedFiles.map((f, fi) => (
                      <div key={fi} className="bg-slate-950/80 border border-white/10 rounded-xl px-2.5 py-2 flex items-center gap-2 text-xs font-mono">
                        <FileCode className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="text-slate-300 truncate max-w-[140px]">{f.name}</span>
                        <span className="text-[10px] text-slate-500">({f.size})</span>
                      </div>
                    ))}
                  </div>
                )}
                {isVoryn && m.thoughts && m.thoughts.length > 0 && (
                  <div className="border border-white/5 bg-[#0a0625] rounded-2xl p-3.5 text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-500 font-semibold mb-2 text-[10px] uppercase tracking-[0.18em]">
                      <Brain className="h-3.5 w-3.5 text-purple-400" />
                      Synaptic Alignment Steps:
                    </div>
                    <div className="space-y-1.5 pl-3 border-l border-white/5 text-[11px] text-slate-400">
                      {m.thoughts.map((step, si) => (
                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={si} className="flex items-start gap-2">
                          <span className="text-cyan-400">↳</span>
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={`p-4 sm:p-4.5 rounded-3xl text-[15px] leading-7 border shadow-lg ${isVoryn ? 'bg-[#090624]/92 border-white/[0.08] text-slate-100' : 'bg-slate-950/85 border-slate-800 text-slate-100 self-end'} max-w-full`}>
                  {isVoryn ? (
                    <div className="space-y-4">
                      {m.text.split('\n\n').map((paragraph, pi) => {
                        if (paragraph.startsWith('```')) {
                          const lines = paragraph.split('\n');
                          const language = lines[0].replace('```', '') || 'code';
                          const code = lines.slice(1, -1).join('\n');
                          return (
                            <div key={pi} className="rounded-2xl border border-white/5 bg-slate-950 overflow-hidden font-mono mt-2 text-xs">
                              <div className="bg-white/5 p-2.5 px-4 flex items-center justify-between text-slate-400 text-[10px] uppercase border-b border-white/5 tracking-[0.18em]">
                                <span>{language}</span>
                                <button onClick={() => { navigator.clipboard.writeText(code); onAddLog('Copied synthesized source block to clipboard.'); }} className="flex items-center gap-1 hover:text-white transition-all active:scale-95">
                                  <Copy className="h-3 w-3" /> COPY
                                </button>
                              </div>
                              <pre className="p-4 overflow-x-auto text-slate-300 text-[12px] leading-6"><code>{code}</code></pre>
                            </div>
                          );
                        }
                        return <p key={pi} className="text-slate-200">{paragraph.split('`').map((part, index) => index % 2 === 1 ? <code key={index} className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-cyan-300 text-xs">{part}</code> : part)}</p>;
                      })}
                    </div>
                  ) : (
                    <p>{m.text}</p>
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-600 uppercase self-end tracking-[0.18em]">{m.timestamp}</span>
              </div>

              {!isVoryn && (
                <div className="p-2.5 rounded-2xl flex-shrink-0 bg-slate-900 border border-slate-800 text-slate-400 shadow-[0_14px_35px_rgba(2,6,23,0.28)]">
                  <Cpu className="h-5 w-5" />
                </div>
              )}
            </div>
          );
        })}

        {isStreaming && (
          <div className="flex justify-start items-center gap-4">
            <div className="p-2.5 rounded-2xl border bg-[#090623] text-cyan-400 animate-spin">
              <Loader2 className="h-5 w-5" />
            </div>
            <div className="text-xs font-mono text-slate-500 animate-pulse tracking-[0.12em] uppercase">Voryn is compiling synaptic answers...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {attachedFiles.length > 0 && (
        <div className="px-4 sm:px-6 py-3 border-t border-white/5 bg-slate-950/60 flex flex-wrap gap-2">
          <span className="text-[10px] font-mono font-medium text-slate-500 self-center uppercase tracking-[0.18em]">Indexing Context Files</span>
          {attachedFiles.map((f, fi) => (
            <div key={fi} className="bg-white/5 border border-white/10 rounded-full p-1.5 pl-2.5 flex items-center gap-1.5 text-xs font-mono animate-fade-in">
              <FileCode className="h-3 w-3 text-cyan-400" />
              <span className="text-slate-200 text-[11px] truncate max-w-[120px]">{f.name}</span>
              <button onClick={() => onRemoveFileAttachment(fi)} className="p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isDragging && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#090627]/88 z-30 flex flex-col items-center justify-center border-2 border-dashed border-cyan-400/40 m-4 rounded-[28px] backdrop-blur-xl shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
            <div className="p-4 bg-cyan-400/10 rounded-full border border-cyan-400/30 text-cyan-400 mb-3">
              <Paperclip className="h-8 w-8" />
            </div>
            <h3 className="font-display font-medium text-lg text-white">Engage Context Extraction</h3>
            <p className="text-xs font-mono text-slate-400 mt-1 text-center max-w-sm">Release mouse to parse and index file parameters into active memory.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 sm:p-6 border-t border-white/5 bg-slate-950/80 backdrop-blur-md" onDragOver={onHandleDragOver} onDragLeave={onHandleDragLeave} onDrop={onHandleDrop}>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => fileInputRef.current?.click()} data-magnetic className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center premium-button shrink-0" title="Index Local file structure">
            <Paperclip className="h-5 w-5" />
          </button>
          <input type="file" ref={fileInputRef} onChange={onHandleFileSelect} multiple className="hidden" accept=".txt,.rs,.json,.ts,.tsx,.go,.cpp,.c,.h,.py,.sh,.yaml,.yml,.toml" />
          <div className="flex-1 relative">
            <input type="text" placeholder="Synthesize compiler requests... (or drag in .rs files)" value={inputText} onChange={(e) => onSetInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onExecuteMessageQuery()} disabled={isStreaming} className="w-full min-h-[56px] bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-3.5 text-slate-200 text-sm font-sans focus:outline-none premium-input placeholder:text-slate-600 transition-all pr-12" />
            <button type="button" onClick={onHandleToggleVoice} className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isListening ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`} title="Direct sensor: Speech-to-text pipeline">
              <Mic className="h-4.5 w-4.5" />
            </button>
          </div>
          <button disabled={isStreaming || (!inputText.trim() && attachedFiles.length === 0)} onClick={onExecuteMessageQuery} data-magnetic className={`min-h-[56px] px-6 rounded-2xl flex items-center justify-center gap-2 font-mono font-bold text-[11px] uppercase tracking-[0.22em] transition-all premium-button ${ (inputText.trim() || attachedFiles.length > 0) && !isStreaming ? getThemeButtonClass() : 'bg-white/5 border border-white/5 text-slate-600 cursor-not-allowed'}`}>
            COMPILE <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        {isListening && (
          <div className="mt-3 flex items-center gap-3 bg-[#fd3c3c]/5 border border-red-500/10 rounded-2xl p-2.5">
            <span className="text-[10px] font-mono font-bold text-red-400 flex items-center gap-1 tracking-[0.16em]">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" />
              VOICE DECK ACTIVE:
            </span>
            <canvas ref={waveCanvasRef} width="200" height="25" className="w-full max-w-[280px] h-6 bg-transparent" />
            <span className="text-[10px] font-mono text-slate-500">Transcribing live sensor feeds...</span>
          </div>
        )}
      </div>
    </main>
  );
}
