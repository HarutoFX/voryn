import { useEffect, useState } from 'react';

export type VibeTheme = 'cyan' | 'purple' | 'amber';
export type GlowLevel = 'stealth' | 'normal' | 'intense';

export interface WorkspaceMemory {
  id: string;
  fact: string;
  category: 'system' | 'optimization' | 'identity' | 'general';
  createdAt: string;
}

export interface WorkspaceThread {
  id: string;
  title: string;
  createdAt: string;
}

export interface WorkspaceMessage {
  id: string;
  sender: 'user' | 'voryn';
  text: string;
  timestamp: string;
  thoughts?: string[];
  mode?: 'standard' | 'deep' | 'register';
  attachedFiles?: Array<{ name: string; content: string; size: string }>;
}

export function useWorkspaceState() {
  const [theme, setTheme] = useState<VibeTheme>('cyan');
  const [synthEnabled, setSynthEnabled] = useState(false);
  const [synthVolume, setSynthVolume] = useState(40);
  const [cortexMode, setCortexMode] = useState<'standard' | 'deep' | 'register'>('deep');
  const [selectedModel, setSelectedModel] = useState('llama3.2');
  const [activeThreadId, setActiveThreadId] = useState<string>('default-thread');
  const [threads, setThreads] = useState<WorkspaceThread[]>([]);
  const [messages, setMessages] = useState<WorkspaceMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [memories, setMemories] = useState<WorkspaceMemory[]>([]);
  const [newMemoryText, setNewMemoryText] = useState('');
  const [newMemoryCategory, setNewMemoryCategory] = useState<WorkspaceMemory['category']>('general');
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; content: string; size: string }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(4.2);
  const [ramUsage, setRamUsage] = useState(1.42);
  const [synapsesCount, setSynapsesCount] = useState(38401);
  const [compileLatency, setCompileLatency] = useState(0.85);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'VORYN eBPF Compiler Core initialized successfully.',
    'Atmospheric sensory stream synchronized (55Hz / 110Hz).',
    'Hardware thread array spawned: Core 0-7 active.',
    'System standby: ready for multi-dimensional alignment.',
  ]);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('voryn_theme') as VibeTheme | null;
    if (savedTheme) setTheme(savedTheme);
    const savedSelectedModel = localStorage.getItem('voryn_selected_model');
    if (savedSelectedModel) setSelectedModel(savedSelectedModel);

    const savedThreads = localStorage.getItem('voryn_threads');
    if (savedThreads) {
      try {
        const parsed = JSON.parse(savedThreads) as WorkspaceThread[];
        setThreads(parsed);
        if (parsed.length > 0) setActiveThreadId(parsed[0].id);
      } catch {
        const defaultThreads = [{ id: 'default-thread', title: 'Synthesized Core Kernel', createdAt: new Date().toISOString() }];
        setThreads(defaultThreads);
        localStorage.setItem('voryn_threads', JSON.stringify(defaultThreads));
      }
    } else {
      const defaultThreads = [{ id: 'default-thread', title: 'Synthesized Core Kernel', createdAt: new Date().toISOString() }];
      setThreads(defaultThreads);
      localStorage.setItem('voryn_threads', JSON.stringify(defaultThreads));
    }

    const savedMemories = localStorage.getItem('voryn_memories');
    if (savedMemories) {
      try {
        setMemories(JSON.parse(savedMemories));
      } catch {
        const defaults = [
          { id: 'm1', fact: 'Target compiler architecture: WASM / eBPF kernel triggers.', category: 'optimization', createdAt: new Date().toISOString() },
          { id: 'm2', fact: 'User prefer deep thought chains for complex backend queries.', category: 'system', createdAt: new Date().toISOString() },
          { id: 'm3', fact: 'Local core identity set to VORYN Spatial System AI.', category: 'identity', createdAt: new Date().toISOString() },
        ] satisfies WorkspaceMemory[];
        setMemories(defaults);
        localStorage.setItem('voryn_memories', JSON.stringify(defaults));
      }
    } else {
      const defaults = [
        { id: 'm1', fact: 'Target compiler architecture: WASM / eBPF kernel triggers.', category: 'optimization', createdAt: new Date().toISOString() },
        { id: 'm2', fact: 'User prefer deep thought chains for complex backend queries.', category: 'system', createdAt: new Date().toISOString() },
        { id: 'm3', fact: 'Local core identity set to VORYN Spatial System AI.', category: 'identity', createdAt: new Date().toISOString() },
      ] satisfies WorkspaceMemory[];
      setMemories(defaults);
      localStorage.setItem('voryn_memories', JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    if (memories.length > 0) localStorage.setItem('voryn_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => Math.max(1.2, Math.min(84.5, parseFloat((prev + (Math.random() - 0.5) * (isStreaming ? 2.5 : 0.4)).toFixed(2)))));
      setSynapsesCount((prev) => prev + Math.floor((Math.random() - 0.5) * 8));
      setCompileLatency((prev) => {
        const ideal = cortexMode === 'standard' ? 0.42 : cortexMode === 'deep' ? 1.76 : 0.82;
        return parseFloat((prev + (ideal - prev) * 0.1 + (Math.random() - 0.5) * 0.05).toFixed(2));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isStreaming, cortexMode]);

  return {
    theme, setTheme,
    synthEnabled, setSynthEnabled,
    synthVolume, setSynthVolume,
    cortexMode, setCortexMode,
    selectedModel, setSelectedModel,
    activeThreadId, setActiveThreadId,
    threads, setThreads,
    messages, setMessages,
    inputText, setInputText,
    memories, setMemories,
    newMemoryText, setNewMemoryText,
    newMemoryCategory, setNewMemoryCategory,
    attachedFiles, setAttachedFiles,
    isDragging, setIsDragging,
    cpuUsage, setCpuUsage,
    ramUsage, setRamUsage,
    synapsesCount, setSynapsesCount,
    compileLatency, setCompileLatency,
    systemLogs, setSystemLogs,
    isStreaming, setIsStreaming,
  };
}
