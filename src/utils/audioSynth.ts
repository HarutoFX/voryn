/**
 * Built-in Synthesizer Engine using Web Audio API.
 * Generates an immersive, low-frequency atmospheric drone at 55Hz (A1) and 110.2Hz (A2)
 * with a slow sweep resonant filter. Completely self-contained and loads instantly.
 */

let audioCtx: AudioContext | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let subOsc: OscillatorNode | null = null;
let biquadFilter: BiquadFilterNode | null = null;
let gainNode: GainNode | null = null;
let lfo: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;

export function initAmbientSynth(): void {
  if (audioCtx) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();

    // Create multi-voice subtractive nodes
    osc1 = audioCtx.createOscillator();
    osc2 = audioCtx.createOscillator();
    subOsc = audioCtx.createOscillator();
    biquadFilter = audioCtx.createBiquadFilter();
    gainNode = audioCtx.createGain();
    lfo = audioCtx.createOscillator();
    lfoGain = audioCtx.createGain();

    // Frequency setups (Carthusian drone tuning)
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55.0, audioCtx.currentTime); // A1 note - deep warm fundamental
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110.2, audioCtx.currentTime); // A2 slightly detuned by +0.2Hz for rich chorus pulsing
    
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(27.5, audioCtx.currentTime); // A0 Sub-bass for cinematic gravity

    // Slow modulating Low-Frequency Oscillator (LFO) to control Filter cutoff
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, audioCtx.currentTime); // 12-second cycle sweep
    lfoGain.gain.setValueAtTime(150, audioCtx.currentTime); // Moderate sweep range in Hz

    // Filter setup for deep underwater warm analog texture
    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.setValueAtTime(220, audioCtx.currentTime);
    biquadFilter.Q.setValueAtTime(3.5, audioCtx.currentTime); // Resonant hump

    // Volume Setup
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime); // Absolute silent start for anti-pop

    // Connect Modulation Routing: LFO -> LFO-Gain -> Filter-Cutoff
    lfo.connect(lfoGain);
    lfoGain.connect(biquadFilter.frequency);

    // Audio Routing: Oscillators -> Lowpass Filter -> Volume Gain -> Context Out
    osc1.connect(biquadFilter);
    osc2.connect(biquadFilter);
    subOsc.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Boot oscillator timers
    const now = audioCtx.currentTime;
    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);
    lfo.start(now);
  } catch (error) {
    console.warn("Audioscape initialization blocked by environment privacy constraints:", error);
  }
}

export function startAmbientSynth(): void {
  initAmbientSynth();
  if (!audioCtx) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  if (gainNode) {
    // Elegant exponential ramp to simulate deep cinematic fade-in
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.exponentialRampToValueAtTime(0.18, now + 3); // Warm subtle volume level (safe)
  }
}

export function stopAmbientSynth(): void {
  if (!audioCtx || !gainNode) return;
  const now = audioCtx.currentTime;
  try {
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    // Smooth fade-out to prevent pop clicks
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  } catch (err) {
    // Fail-safe fall back to absolute zero value
    gainNode.gain.setValueAtTime(0, now);
  }
}

export function setSynthVolumeScale(scale: number): void {
  if (!audioCtx || !gainNode) return;
  const now = audioCtx.currentTime;
  const targetGain = Math.max(0.001, 0.18 * scale);
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.exponentialRampToValueAtTime(targetGain, now + 0.5);
}
