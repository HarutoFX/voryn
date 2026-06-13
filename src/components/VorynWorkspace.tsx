import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Cpu, Database, Activity, HardDrive, Terminal, Settings, 
  Volume2, VolumeX, ArrowLeft, Copy, FileCode, Paperclip, Sliders, 
  Gauge, Clock, Sparkles, Trash2, Mic, MicOff, Plus, X, Check, 
  Loader2, RefreshCw, Layers, Brain, Server, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { startAmbientSynth, stopAmbientSynth, setSynthVolumeScale } from '../utils/audioSynth';
import WorkspaceLayout from './workspace/WorkspaceLayout';
import { useWorkspaceState } from '../hooks/useWorkspaceState';
import { useMemory } from '../hooks/useMemory';

// Chat message format
interface Message {
  id: string;
  sender: 'user' | 'voryn';
  text: string;
  timestamp: string;
  thoughts?: string[];
  mode?: 'standard' | 'deep' | 'register';
  attachedFiles?: Array<{ name: string; content: string; size: string }>;
}

export default function VorynWorkspace() {
  // Connection config for Ollama
  const [ollamaUrl, setOllamaUrl] = useState(() => {
    return localStorage.getItem('voryn_ollama_url') || 'http://localhost:11434';
  });
  const [ollamaStatus, setOllamaStatus] = useState<'testing' | 'online' | 'offline'>('offline');
  const [availableModels, setAvailableModels] = useState<string[]>(['llama3.2', 'mistral', 'gemma2', 'codegemma']);
  const [isTagsLoading, setIsTagsLoading] = useState(false);

  // Workspace layout and parameters
  const {
    theme,
    setTheme,
    synthEnabled,
    setSynthEnabled,
    synthVolume,
    setSynthVolume,
    cortexMode,
    setCortexMode,
    selectedModel,
    setSelectedModel,
  } = useWorkspaceState();
  const [inputText, setInputText] = useState('');

  // File Upload State
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; content: string; size: string }>>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Status gauges (simulated Real-Time indicators)
  const [cpuUsage, setCpuUsage] = useState(4.2);
  const [ramUsage, setRamUsage] = useState(1.42);
  const [synapsesCount, setSynapsesCount] = useState(38401);
  const [compileLatency, setCompileLatency] = useState(0.85);

  // Trace logs streams
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'VORYN eBPF Compiler Core initialized successfully.',
    'Atmospheric sensory stream synchronized (55Hz / 110Hz).',
    'Hardware thread array spawned: Core 0-7 active.',
    'System standby: ready for multi-dimensional alignment.'
  ]);

  // Voice Interaction Module
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const waveAnimIdRef = useRef<number | null>(null);

  // Messaging controls
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle systemic trace logs append
  const addLog = (log: string) => {
    const time = new Date().toLocaleTimeString();
    setSystemLogs((prev) => [`[${time}] ${log}`, ...prev.slice(0, 40)]);
  };

  const {
    memories,
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
  } = useMemory(addLog);

  // 2. Ollama connection control
  const testOllamaConnection = async (url: string) => {
    setOllamaStatus('testing');
    addLog(`Pinging local Ollama repository at ${url}...`);
    try {
      // Test endpoints
      const response = await fetch(`${url}/api/tags`).catch((err) => {
        throw new Error('Connection failed');
      });
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
    } catch (e) {
      setOllamaStatus('offline');
      addLog('Connection refused. Is Ollama currently running on localhost? Defaulting to built-in compiler simulations.');
    }
  };

  const handleOllamaUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOllamaUrl(val);
    localStorage.setItem('voryn_ollama_url', val);
  };

  // Toggling atmospheric audio synths matches marketing page
  const handleToggleSynth = () => {
    const nextState = !synthEnabled;
    setSynthEnabled(nextState);
    if (nextState) {
      startAmbientSynth();
      setSynthVolumeScale(synthVolume / 100);
      addLog('Sensory environment: Drone active (55Hz A1 cinematic layer).');
    } else {
      stopAmbientSynth();
      addLog('Sensory environment: Drone deactivated.');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    setSynthVolume(vol);
    if (synthEnabled) {
      setSynthVolumeScale(vol / 100);
    }
  };

  // 3. Simulated/Real Hardware Telemetry Loop (60 FPS feel)
  useEffect(() => {
    const interval = setInterval(() => {
      // CPU fluctuations
      setCpuUsage((prev) => {
        const factor = isStreaming ? 2.5 : 0.4;
        const diff = (Math.random() - 0.5) * factor;
        return Math.max(1.2, Math.min(84.5, parseFloat((prev + diff).toFixed(2))));
      });
      // Synaptic connection index
      setSynapsesCount((prev) => {
        const diff = Math.floor((Math.random() - 0.5) * 8);
        return prev + diff;
      });
      // Compiler speed
      setCompileLatency((prev) => {
        const ideal = cortexMode === 'standard' ? 0.42 : cortexMode === 'deep' ? 1.76 : 0.82;
        const diff = (ideal - prev) * 0.1;
        return parseFloat((prev + diff + (Math.random() - 0.5) * 0.05).toFixed(2));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming, cortexMode]);

  // Scroll to bottom helper
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // 4. Advanced Voice Module Using Standard Web Speech API
  const handleToggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in this browser. Please use Chrome/Edge or type directly.");
      return;
    }

    if (isListening) {
      // Terminate Listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      addLog('Voice pipeline captured and closed.');
      stopWaveAnimation();
    } else {
      // Start Listening
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        addLog('Voice compilation matrix opened. Speak clearly into sensor.');
        startWaveAnimation();
      };

      recognition.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        if (resultText) {
          setInputText((prev) => prev ? `${prev} ${resultText}` : resultText);
          addLog(`Voice transcode: "${resultText}"`);
        }
      };

      recognition.onerror = (err: any) => {
        console.error('Speech recognition error: ', err);
        addLog(`Voice recognition error captured: ${err.error}`);
        setIsListening(false);
        stopWaveAnimation();
      };

      recognition.onend = () => {
        setIsListening(false);
        stopWaveAnimation();
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  // Interactive wave animations on speech button
  const startWaveAnimation = () => {
    if (!waveCanvasRef.current) return;
    const canvas = waveCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = theme === 'cyan' ? '#22d3ee' : theme === 'purple' ? '#c084fc' : '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const width = canvas.width;
      const height = canvas.height;
      const segments = 100;
      
      for (let i = 0; i < segments; i++) {
        const pct = i / segments;
        const x = pct * width;
        // Bell envelope to pinch ends
        const envelope = Math.sin(pct * Math.PI);
        const y = height / 2 + Math.sin(pct * Math.PI * 4.5 + phase) * (height * 0.38) * envelope;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw secondary lighter line for premium feel
      ctx.strokeStyle = theme === 'cyan' ? 'rgba(34,211,238,0.3)' : theme === 'purple' ? 'rgba(192,132,252,0.3)' : 'rgba(251,191,36,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        const pct = i / segments;
        const x = pct * width;
        const envelope = Math.sin(pct * Math.PI);
        const y = height / 2 + Math.sin(pct * Math.PI * 3.1 - phase * 1.5) * (height * 0.28) * envelope;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.18;
      waveAnimIdRef.current = requestAnimationFrame(render);
    };

    render();
  };

  const stopWaveAnimation = () => {
    if (waveAnimIdRef.current) {
      cancelAnimationFrame(waveAnimIdRef.current);
      waveAnimIdRef.current = null;
    }
    const canvas = waveCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // 5. Intelligent Multi-mode Response Synthesizer Engine
  const executeMessageQuery = async () => {
    if (!inputText.trim() && attachedFiles.length === 0) return;

    const userQuery = inputText;
    const userAttached = [...attachedFiles];
    setInputText('');
    setAttachedFiles([]);
    setIsStreaming(true);

    // 1. Create and post user message object
    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: userQuery || `Processed attachments: ${userAttached.map(f => f.name).join(', ')}`,
      timestamp: new Date().toLocaleTimeString(),
      attachedFiles: userAttached
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveMessagesToThread(activeThreadId, updatedMessages);

    addLog(`Initiating Core compilations: Mode: ${cortexMode.toUpperCase()}`);

    // Create container message for Voryn streaming response
    const vorynMsgId = Math.random().toString(36).substring(7);
    const thinkingSteps: string[] = [];

    // Phase 1: Custom Deep thought/Chain of thought sequence simulation (even when connected to real Ollama)
    if (cortexMode === 'deep') {
      thinkingSteps.push('Accessing memory register stacks...');
      setMessages([...updatedMessages, {
        id: vorynMsgId,
        sender: 'voryn',
        text: '',
        timestamp: new Date().toLocaleTimeString(),
        thoughts: [...thinkingSteps],
        mode: 'deep'
      }]);

      await delay(800);
      
      // Match with long term memories
      const retrievedFacts = memories.filter(m => 
        userQuery.toLowerCase().includes(m.fact.toLowerCase().split(' ').slice(0, 2).join(' ')) ||
        userQuery.toLowerCase().includes(m.category)
      );

      if (retrievedFacts.length > 0) {
        thinkingSteps.push(`Retrieved system memory: "${retrievedFacts[0].fact}"`);
      } else {
        thinkingSteps.push(`Loaded current global constraints (${memories.length} facts in active index)`);
      }
      setMessages([...updatedMessages, {
        id: vorynMsgId,
        sender: 'voryn',
        text: '',
        timestamp: new Date().toLocaleTimeString(),
        thoughts: [...thinkingSteps],
        mode: 'deep'
      }]);

      await delay(900);
      thinkingSteps.push('Connecting synaptic compiler clusters...');
      setMessages([...updatedMessages, {
        id: vorynMsgId,
        sender: 'voryn',
        text: '',
        timestamp: new Date().toLocaleTimeString(),
        thoughts: [...thinkingSteps],
        mode: 'deep'
      }]);

      await delay(700);
      thinkingSteps.push('Compiling response array structures...');
      setMessages([...updatedMessages, {
        id: vorynMsgId,
        sender: 'voryn',
        text: '',
        timestamp: new Date().toLocaleTimeString(),
        thoughts: [...thinkingSteps],
        mode: 'deep'
      }]);
      await delay(500);
    } else if (cortexMode === 'register') {
      thinkingSteps.push('ADDR: 0x7FFA90DC; SP: 0x24F; THREADS_ALLOCATED: 0x8');
      thinkingSteps.push('INSTR: MOV EAX, CR0; INC REG; SYS_CALL eBPF_MAP_LOOKUP');
      setMessages([...updatedMessages, {
        id: vorynMsgId,
        sender: 'voryn',
        text: '',
        timestamp: new Date().toLocaleTimeString(),
        thoughts: [...thinkingSteps],
        mode: 'register'
      }]);
      await delay(1000);
    }

    // Phase 2: Compute response content
    let finalAnswer = '';

    if (ollamaStatus === 'online') {
      // ROUTE TO ACTUAL PHYSICAL OLLAMA ENDPOINT
      try {
        const fullContextPrompt = `
          System instructions: You are VORYN, a multi-dimensional spatial operating system intelligence engine. 
          Respond elegantly, with a technical, high-performance tone. Include code blocks where helpful.
          Active long-term memories:
          ${memories.map(m => `- ${m.fact}`).join('\n')}
          
          User Attached Files:
          ${userAttached.map(f => `File: ${f.name}\nContent:\n${f.content}`).join('\n')}
          
          User Prompt: ${userQuery}
        `;

        const res = await fetch(`${ollamaUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: selectedModel,
            prompt: fullContextPrompt,
            stream: false
          })
        });

        if (res.ok) {
          const data = await res.json();
          finalAnswer = data.response;
        } else {
          throw new Error('Fallback called');
        }
      } catch (err) {
        addLog('Real-time connection stream faulted. Activating semantic fallback layer.');
        finalAnswer = getFallbackResponse(userQuery, userAttached);
      }
    } else {
      // LOCAL SYNAPTIC PREVIEW SIMULATOR
      finalAnswer = getFallbackResponse(userQuery, userAttached);
    }

    // Step 3: Stream generated response words perfectly
    const words = finalAnswer.split(' ');
    let currentWords = '';
    
    for (let i = 0; i < words.length; i++) {
      currentWords += (i === 0 ? '' : ' ') + words[i];
      setMessages([...updatedMessages, {
        id: vorynMsgId,
        sender: 'voryn',
        text: currentWords,
        timestamp: new Date().toLocaleTimeString(),
        thoughts: thinkingSteps.length > 0 ? thinkingSteps : undefined,
        mode: cortexMode
      }]);
      // Intelligent fast delay matches reading speed
      await delay(Math.min(42, 10 + words[i].length * 2));
    }

    // Save final combined results
    const finalMsgList: Message[] = [...updatedMessages, {
      id: vorynMsgId,
      sender: 'voryn',
      text: finalAnswer,
      timestamp: new Date().toLocaleTimeString(),
      thoughts: thinkingSteps.length > 0 ? thinkingSteps : undefined,
      mode: cortexMode
    }];
    setMessages(finalMsgList);
    saveMessagesToThread(activeThreadId, finalMsgList);
    setIsStreaming(false);
    addLog('Synthesis matrix response compiled fully.');
  };

  // Safe timeout helper
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Synthesise realistic local software developer replies
  const getFallbackResponse = (query: string, files: any[]): string => {
    const q = query.toLowerCase();
    
    // Check files
    let fileInfoText = '';
    if (files.length > 0) {
      fileInfoText = `Analyzing attached source manifest ${files.map(f => `\`${f.name}\``).join(' and ')} size (${files.reduce((a, b) => a + parseInt(b.size), 0)} bytes). Synthesizing compiler mapping...\n\n`;
    }

    // Match facts dynamically
    const savedRules = memories.map(m => m.fact).join(', ');

    if (q.includes('help') || q.includes('system') || q.includes('operating')) {
      return `${fileInfoText}**VORYN OS Core Control Deck** aligns multiple compiler grids. 
Here are the active configurations loaded:
- **Cortex Synthesis**: Running inside \`${cortexMode.toUpperCase()}\` mode.
- **Cognitive Database**: Active rules mapped include: _${savedRules || 'No active memories loaded'}_. 
- **eBPF Registers**: Allocated hardware thread allocation index: 64.

To interface Voryn safely with local development environments, configure the Ollama container link in the right panel and test connection. We can compile deep node structures directly from standard standard configurations.`;
    }

    if (q.includes('docker') || q.includes('ollama') || q.includes('run') || q.includes('model') || q.includes('connect')) {
      return `${fileInfoText}To spin up and mount local heavy linguistic pipelines directly within the **VORYN multidimensional workspace**, compile the service through standard containers:

\`\`\`bash
# 1. Download and start the Ollama instance on localhost
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# 2. Synchronize and run highly accelerated technical models
docker exec -it ollama ollama run llama3.2:3b
\`\`\`

Once running, Voryn automatically connects to your local instance on port \`11434\`. Any file structures provided below are instantly mapped as context payloads. Let me know if you would like me to compile specific hardware traces.`;
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('voryn')) {
      return `${fileInfoText}**Multidimensional Alignment Synchronized.** 
Greetings, operator. I have retrieved active hardware parameters. Current memory constraint states point towards optimizations on **${memories.find(m => m.category === 'optimization')?.fact || 'general speed and depth'}**.

What file architectures are we building today? Drag in a source file to index it instantly.`;
    }

    // Standard high-fidelity developer response
    return `${fileInfoText}**COMPILATION PATH VERIFIED ✅**

Using active long-term memories:
- _Applying constraint: "${memories[0]?.fact || 'Core performance prioritization'}"_

I have generated the optimized multidimensional pipeline structure matching your request:

\`\`\`rust
// Synthesized in Voryn OS v1.0.8 (eBPF compilation framework)
use std::sync::atomic::{AtomicUsize, Ordering};

struct SynapticCluster {
    core_id: usize,
    capacity: AtomicUsize,
}

impl SynapticCluster {
    pub fn align_nodes(&self, incoming_nodes: usize) -> Result<(), &'static str> {
        let current = self.capacity.load(Ordering::Relaxed);
        if current + incoming_nodes > 4096 {
            return Err("Cortex boundary overflow.");
        }
        self.capacity.fetch_add(incoming_nodes, Ordering::SeqCst);
        println!("[VORYN_TRACER] Synced {} nodes onto Core {}", incoming_nodes, self.core_id);
        Ok(())
    }
}
\`\`\`

This aligns thread distribution with the registered latency parameter index (\`${compileLatency}ms\`). Let me know if you want to push this firmware directly into production pipelines.`;
  };

  // 6. Native Drag-and-Drop / File Upload
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (fileList: FileList) => {
    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textContent = event.target?.result as string;
        setAttachedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            content: textContent || '[Empty File/Binaries]',
            size: (file.size / 1024).toFixed(1) + ' KB'
          }
        ]);
        addLog(`File attached: "${file.name}" (${(file.size / 1024).toFixed(1)} KB) - parsed into context.`);
      };
      reader.readAsText(file);
    });
  };

  const removeFileAttachment = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Highlight color maps according to landing state themes
  const getThemeTextClass = () => {
    if (theme === 'purple') return 'text-purple-400';
    if (theme === 'amber') return 'text-amber-400';
    return 'text-cyan-400';
  };

  const getThemeBgClass = () => {
    if (theme === 'purple') return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
    if (theme === 'amber') return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
    return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';
  };

  const getThemeButtonClass = () => {
    if (theme === 'purple') return 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/30 text-white';
    if (theme === 'amber') return 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/30 text-white';
    return 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/30 text-white';
  };

  return (
    <WorkspaceLayout
      theme={theme}
      synthEnabled={synthEnabled}
      synthVolume={synthVolume}
      memoriesCount={memories.length}
      memories={memories}
      newMemoryText={newMemoryText}
      newMemoryCategory={newMemoryCategory}
      threads={threads}
      activeThreadId={activeThreadId}
      activeThreadTitle={threads.find((t) => t.id === activeThreadId)?.title || 'Core Pipeline'}
      cortexMode={cortexMode}
      messages={messages}
      isStreaming={isStreaming}
      attachedFiles={attachedFiles}
      isDragging={isDragging}
      isListening={isListening}
      compileLatency={compileLatency}
      ollamaStatus={ollamaStatus}
      ollamaUrl={ollamaUrl}
      selectedModel={selectedModel}
      availableModels={availableModels}
      cpuUsage={cpuUsage}
      ramUsage={ramUsage}
      synapsesCount={synapsesCount}
      inputText={inputText}
      messagesEndRef={messagesEndRef}
      waveCanvasRef={waveCanvasRef}
      fileInputRef={fileInputRef}
      onToggleSynth={handleToggleSynth}
      onVolumeChange={handleVolumeChange}
      onThemeChange={(nextTheme) => {
        setTheme(nextTheme);
        localStorage.setItem('voryn_theme', nextTheme);
        addLog(`Matrix color spectrum shifted: ${nextTheme.toUpperCase()}.`);
      }}
      onNewMemoryTextChange={setNewMemoryText}
      onNewMemoryCategoryChange={setNewMemoryCategory}
      onAddMemory={handleAddMemory}
      onDeleteMemory={handleDeleteMemory}
      onSetCortexMode={(mode) => {
        setCortexMode(mode);
        addLog(`Cortex protocol re-aligned: [${mode.toUpperCase()}] mode initialized.`);
      }}
      onNewSession={handleNewSession}
      onSetActiveThreadId={setActiveThreadId}
      onDeleteThread={handleDeleteThread}
      onHandleToggleVoice={handleToggleVoice}
      onHandleFileSelect={handleFileSelect}
      onHandleDragOver={handleDragOver}
      onHandleDragLeave={handleDragLeave}
      onHandleDrop={handleDrop}
      onRemoveFileAttachment={removeFileAttachment}
      onSetInputText={setInputText}
      onExecuteMessageQuery={executeMessageQuery}
      onTestOllamaConnection={() => testOllamaConnection(ollamaUrl)}
      onOllamaUrlChange={handleOllamaUrlChange}
      onSelectedModelChange={(value) => {
        setSelectedModel(value);
        localStorage.setItem('voryn_selected_model', value);
        addLog(`Ollama active weights swapped: \`${value}\` selected.`);
      }}
      onAddLog={addLog}
      getThemeTextClass={getThemeTextClass}
      getThemeButtonClass={getThemeButtonClass}
    />
  );
}
