import type React from 'react';
import { useEffect, useState } from 'react';
import type { WorkspaceMemory } from './useWorkspaceState';

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

export function useMemory(addLog: (log: string) => void) {
  const [memories, setMemories] = useState<WorkspaceMemory[]>([]);
  const [newMemoryText, setNewMemoryText] = useState('');
  const [newMemoryCategory, setNewMemoryCategory] = useState<WorkspaceMemory['category']>('general');
  const [activeThreadId, setActiveThreadId] = useState('default-thread');
  const [threads, setThreads] = useState<WorkspaceThread[]>([]);
  const [messages, setMessages] = useState<WorkspaceMessage[]>([]);

  useEffect(() => {
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
        initDefaultMemories();
      }
    } else {
      initDefaultMemories();
    }

    const threadMessagesKey = `voryn_messages_${activeThreadId}`;
    const savedMsg = localStorage.getItem(threadMessagesKey);
    if (savedMsg) {
      try {
        setMessages(JSON.parse(savedMsg));
      } catch {
        setMessages(getInitialWelcomeMessages());
      }
    } else {
      const initMsgs = getInitialWelcomeMessages();
      setMessages(initMsgs);
      localStorage.setItem(threadMessagesKey, JSON.stringify(initMsgs));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (memories.length > 0) localStorage.setItem('voryn_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    const threadMessagesKey = `voryn_messages_${activeThreadId}`;
    localStorage.setItem(threadMessagesKey, JSON.stringify(messages));
  }, [activeThreadId, messages]);

  const initDefaultMemories = () => {
    const defaults: WorkspaceMemory[] = [
      { id: 'm1', fact: 'Target compiler architecture: WASM / eBPF kernel triggers.', category: 'optimization', createdAt: new Date().toISOString() },
      { id: 'm2', fact: 'User prefer deep thought chains for complex backend queries.', category: 'system', createdAt: new Date().toISOString() },
      { id: 'm3', fact: 'Local core identity set to VORYN Spatial System AI.', category: 'identity', createdAt: new Date().toISOString() },
    ];
    setMemories(defaults);
    localStorage.setItem('voryn_memories', JSON.stringify(defaults));
  };

  const getInitialWelcomeMessages = (): WorkspaceMessage[] => ([{
    id: 'wel-1',
    sender: 'voryn',
    text: 'System online. I am VORYN. The spatial multidimensional intelligence engine. How shall we compile your digital nodes today?',
    timestamp: new Date().toLocaleTimeString(),
    mode: 'standard',
  }]);

  const handleAddMemory = () => {
    if (!newMemoryText.trim()) return;
    const item: WorkspaceMemory = {
      id: 'm-' + Math.random().toString(36).substring(4),
      fact: newMemoryText,
      category: newMemoryCategory,
      createdAt: new Date().toISOString()
    };
    setMemories((prev) => [item, ...prev]);
    setNewMemoryText('');
    addLog(`Neural Memory index expanded: Fact stored under [${newMemoryCategory.toUpperCase()}]`);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
    addLog(`Synaptic coordinate pruned: Memory ID ${id} dropped.`);
  };

  const handleNewSession = () => {
    const newId = 't-' + Math.random().toString(36).substring(3);
    const newTitle = `Synthesis Stream #${threads.length + 1}`;
    const newThread: WorkspaceThread = { id: newId, title: newTitle, createdAt: new Date().toISOString() };
    const updatedThreads = [newThread, ...threads];
    setThreads(updatedThreads);
    localStorage.setItem('voryn_threads', JSON.stringify(updatedThreads));
    setActiveThreadId(newId);
    const welcome = getInitialWelcomeMessages();
    setMessages(welcome);
    localStorage.setItem(`voryn_messages_${newId}`, JSON.stringify(welcome));
    addLog(`Spawned separate compilation sandbox: "${newTitle}"`);
  };

  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (threads.length <= 1) {
      alert('At least one synthesis stream thread is required.');
      return;
    }
    const updatedThreads = threads.filter(t => t.id !== id);
    setThreads(updatedThreads);
    localStorage.setItem('voryn_threads', JSON.stringify(updatedThreads));
    localStorage.removeItem(`voryn_messages_${id}`);
    if (activeThreadId === id) setActiveThreadId(updatedThreads[0].id);
    addLog('Sandboxed compilation container removed.');
  };

  const saveMessagesToThread = (threadId: string, msgs: WorkspaceMessage[]) => {
    localStorage.setItem(`voryn_messages_${threadId}`, JSON.stringify(msgs));
  };

  return {
    memories,
    setMemories,
    newMemoryText,
    setNewMemoryText,
    newMemoryCategory,
    setNewMemoryCategory,
    activeThreadId,
    setActiveThreadId,
    threads,
    setThreads,
    messages,
    setMessages,
    handleAddMemory,
    handleDeleteMemory,
    handleNewSession,
    handleDeleteThread,
    saveMessagesToThread,
  };
}
