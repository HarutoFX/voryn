import { useState } from 'react';
import type React from 'react';

export function useOllama(addLog: (log: string) => void) {
  const [ollamaUrl, setOllamaUrl] = useState(() => localStorage.getItem('voryn_ollama_url') || 'http://localhost:11434');
  const [ollamaStatus, setOllamaStatus] = useState<'testing' | 'online' | 'offline'>('offline');
  const [availableModels, setAvailableModels] = useState<string[]>(['llama3.2', 'mistral', 'gemma2', 'codegemma']);
  const [selectedModel, setSelectedModel] = useState('llama3.2');
  const [isTagsLoading, setIsTagsLoading] = useState(false);

  const testOllamaConnection = async (url: string) => {
    setOllamaStatus('testing');
    addLog(`Pinging local Ollama repository at ${url}...`);
    try {
      const response = await fetch(`${url}/api/tags`).catch(() => { throw new Error('Connection failed'); });
      if (response && response.ok) {
        const data = await response.json();
        setOllamaStatus('online');
        addLog('Ollama Core connection verified. Neural pipeline aligned.');
        if (data && data.models) {
          const names = data.models.map((m: any) => m.name);
          if (names.length > 0) {
            setAvailableModels(names);
            setSelectedModel(names[0]);
          }
        }
      } else {
        setOllamaStatus('offline');
        addLog('Ollama target responded with invalid status. Falling back to internal synaptic firmware.');
      }
    } catch {
      setOllamaStatus('offline');
      addLog('Connection refused. Is Ollama currently running on localhost? Defaulting to built-in compiler simulations.');
    }
  };

  const handleOllamaUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOllamaUrl(e.target.value);
    localStorage.setItem('voryn_ollama_url', e.target.value);
  };

  return { ollamaUrl, setOllamaUrl, ollamaStatus, setOllamaStatus, availableModels, setAvailableModels, selectedModel, setSelectedModel, isTagsLoading, setIsTagsLoading, testOllamaConnection, handleOllamaUrlChange };
}
