import { useRef, useState } from 'react';
import { startAmbientSynth, stopAmbientSynth, setSynthVolumeScale } from '../utils/audioSynth';

export function useVoice(theme: 'cyan' | 'purple' | 'amber') {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const waveAnimIdRef = useRef<number | null>(null);

  const handleToggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (isListening) {
      recognitionRef.current?.stop?.();
      setIsListening(false);
      stopWaveAnimation();
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onstart = () => {
        setIsListening(true);
        startWaveAnimation();
      };
      recognition.onend = () => {
        setIsListening(false);
        stopWaveAnimation();
      };
      recognitionRef.current = recognition;
      recognition.start();
    }
  };

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
      for (let i = 0; i < 100; i++) {
        const pct = i / 100;
        const x = pct * width;
        const y = height / 2 + Math.sin(pct * Math.PI * 4.5 + phase) * (height * 0.38) * Math.sin(pct * Math.PI);
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
    if (waveAnimIdRef.current) cancelAnimationFrame(waveAnimIdRef.current);
    waveAnimIdRef.current = null;
    const canvas = waveCanvasRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return { isListening, setIsListening, recognitionRef, waveCanvasRef, handleToggleVoice };
}
