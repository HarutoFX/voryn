import type React from 'react';
import CustomCursor from '../CustomCursor';
import WorkspaceHeader from './WorkspaceHeader';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import MetricsPanel from './MetricsPanel';

interface WorkspaceLayoutProps {
  theme: 'cyan' | 'purple' | 'amber';
  synthEnabled: boolean;
  synthVolume: number;
  memoriesCount: number;
  memories: Array<{ id: string; fact: string; category: 'system' | 'optimization' | 'identity' | 'general'; createdAt: string }>;
  newMemoryText: string;
  newMemoryCategory: 'system' | 'optimization' | 'identity' | 'general';
  threads: Array<{ id: string; title: string; createdAt: string }>;
  activeThreadId: string;
  activeThreadTitle: string;
  cortexMode: 'standard' | 'deep' | 'register';
  messages: Array<{ id: string; sender: 'user' | 'voryn'; text: string; timestamp: string; thoughts?: string[]; mode?: 'standard' | 'deep' | 'register'; attachedFiles?: Array<{ name: string; content: string; size: string }> }>;
  isStreaming: boolean;
  attachedFiles: Array<{ name: string; content: string; size: string }>;
  isDragging: boolean;
  isListening: boolean;
  compileLatency: number;
  ollamaStatus: 'testing' | 'online' | 'offline';
  ollamaUrl: string;
  selectedModel: string;
  availableModels: string[];
  cpuUsage: number;
  ramUsage: number;
  synapsesCount: number;
  inputText: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  waveCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onToggleSynth: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThemeChange: (theme: 'cyan' | 'purple' | 'amber') => void;
  onNewMemoryTextChange: (value: string) => void;
  onNewMemoryCategoryChange: (value: 'system' | 'optimization' | 'identity' | 'general') => void;
  onAddMemory: () => void;
  onDeleteMemory: (id: string) => void;
  onSetCortexMode: (mode: 'standard' | 'deep' | 'register') => void;
  onNewSession: () => void;
  onSetActiveThreadId: (id: string) => void;
  onDeleteThread: (id: string, event: React.MouseEvent) => void;
  onHandleToggleVoice: () => void;
  onHandleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onHandleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onHandleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemoveFileAttachment: (index: number) => void;
  onSetInputText: (value: string) => void;
  onExecuteMessageQuery: () => void;
  onTestOllamaConnection: () => void;
  onOllamaUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectedModelChange: (value: string) => void;
  onAddLog: (log: string) => void;
  getThemeTextClass: () => string;
  getThemeButtonClass: () => string;
}

export default function WorkspaceLayout(props: WorkspaceLayoutProps) {
  return (
    <div className="min-h-screen bg-[#030114] text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <CustomCursor />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(16,10,38,0.9)_0%,rgba(3,1,20,1)_60%,rgba(3,1,20,1)_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <WorkspaceHeader
        theme={props.theme}
        synthEnabled={props.synthEnabled}
        synthVolume={props.synthVolume}
        memoriesCount={props.memoriesCount}
        onToggleSynth={props.onToggleSynth}
        onVolumeChange={props.onVolumeChange}
        onThemeChange={props.onThemeChange}
      />
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 relative z-10 overflow-hidden gap-0 xl:gap-px bg-white/5 xl:bg-white/6">
        <Sidebar
          memories={props.memories}
          newMemoryText={props.newMemoryText}
          newMemoryCategory={props.newMemoryCategory}
          threads={props.threads}
          activeThreadId={props.activeThreadId}
          cortexMode={props.cortexMode}
          theme={props.theme}
          onNewMemoryTextChange={props.onNewMemoryTextChange}
          onNewMemoryCategoryChange={props.onNewMemoryCategoryChange}
          onAddMemory={props.onAddMemory}
          onDeleteMemory={props.onDeleteMemory}
          onSetCortexMode={props.onSetCortexMode}
          onNewSession={props.onNewSession}
          onSetActiveThreadId={props.onSetActiveThreadId}
          onDeleteThread={props.onDeleteThread}
          onAddLog={props.onAddLog}
          getThemeTextClass={props.getThemeTextClass}
        />
        <ChatPanel
          messages={props.messages}
          isStreaming={props.isStreaming}
          attachedFiles={props.attachedFiles}
          isDragging={props.isDragging}
          isListening={props.isListening}
          activeThreadTitle={props.activeThreadTitle}
          compileLatency={props.compileLatency}
          theme={props.theme}
          getThemeTextClass={props.getThemeTextClass}
          getThemeButtonClass={props.getThemeButtonClass}
          messagesEndRef={props.messagesEndRef}
          waveCanvasRef={props.waveCanvasRef}
          fileInputRef={props.fileInputRef}
          inputText={props.inputText}
          onSetInputText={props.onSetInputText}
          onExecuteMessageQuery={props.onExecuteMessageQuery}
          onHandleToggleVoice={props.onHandleToggleVoice}
          onHandleFileSelect={props.onHandleFileSelect}
          onHandleDragOver={props.onHandleDragOver}
          onHandleDragLeave={props.onHandleDragLeave}
          onHandleDrop={props.onHandleDrop}
          onRemoveFileAttachment={props.onRemoveFileAttachment}
          onAddLog={props.onAddLog}
        />
        <MetricsPanel
          ollamaStatus={props.ollamaStatus}
          ollamaUrl={props.ollamaUrl}
          selectedModel={props.selectedModel}
          availableModels={props.availableModels}
          cpuUsage={props.cpuUsage}
          ramUsage={props.ramUsage}
          synapsesCount={props.synapsesCount}
          compileLatency={props.compileLatency}
          theme={props.theme}
          onOllamaUrlChange={props.onOllamaUrlChange}
          onTestOllamaConnection={props.onTestOllamaConnection}
          onSelectedModelChange={props.onSelectedModelChange}
        />
      </div>
    </div>
  );
}
