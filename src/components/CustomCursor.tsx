import React, { useEffect, useRef, useState } from 'react';

interface TrailDot {
  id: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

interface OrbitParticle {
  id: number;
  angle: number;
  speed: number;
  radius: number;
  phase: number;
  color: string;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'text' | 'card' | 'indicator'>('default');
  
  // Real mouse coordinates
  const realMouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  
  // Render coordinates
  const coreRef = useRef({ x: 0, y: 0 });
  const outerRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  
  // Element references for DOM tracking
  const coreDOMRef = useRef<HTMLDivElement>(null);
  const outerDOMRef = useRef<HTMLDivElement>(null);
  const magnetDOMRef = useRef<HTMLElement | null>(null);
  const tiltedDOMRef = useRef<HTMLElement | null>(null);

  // States
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [orbitActive, setOrbitActive] = useState(false);
  const orbitParticles = useRef<OrbitParticle[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      angle: (i * (Math.PI * 2)) / 5,
      speed: 0.05 + Math.random() * 0.03,
      radius: 20 + Math.random() * 8,
      phase: Math.random() * 100,
      color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a855f7' : '#f59e0b',
    }))
  );

  useEffect(() => {
    // Only mount if supporting hover and pointer (desktop device detection)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      realMouseRef.current = { x: e.clientX, y: e.clientY };

      // Trailing path evaluation for neural trail
      const dx = realMouseRef.current.x - prevMouseRef.current.x;
      const dy = realMouseRef.current.y - prevMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      velocityRef.current = Math.min(distance * 0.8, 100);

      prevMouseRef.current = { ...realMouseRef.current };

      // Advanced DOM detection
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find nearest interactable ancestor
      const interactiveEl = target.closest('button, a, [role="button"], input, textarea, [data-magnetic]') as HTMLElement | null;
      const cardEl = target.closest('[data-cursor="card"], [data-tilt]') as HTMLElement | null;
      const isInputText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('[data-cursor="text"]');

      if (isInputText) {
        setCursorType('text');
        setOrbitActive(false);
        magnetDOMRef.current = null;
      } else if (interactiveEl) {
        setCursorType('button');
        setOrbitActive(true);
        
        // Track for magnetic attraction
        const isMagnetic = interactiveEl.hasAttribute('data-magnetic') || interactiveEl.classList.contains('magnetic-btn');
        if (isMagnetic) {
          magnetDOMRef.current = interactiveEl;
        } else {
          magnetDOMRef.current = null;
        }
      } else if (cardEl) {
        setCursorType('card');
        setOrbitActive(true);
        magnetDOMRef.current = null;
      } else {
        setCursorType('default');
        setOrbitActive(false);
        magnetDOMRef.current = null;
      }

      // 3D Tilt handling
      const currentTiltEl = target.closest('[data-tilt]') as HTMLElement | null;
      if (currentTiltEl) {
        if (tiltedDOMRef.current && tiltedDOMRef.current !== currentTiltEl) {
          // Remove transform from previous tilted element
          tiltedDOMRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
        }
        tiltedDOMRef.current = currentTiltEl;

        const rect = currentTiltEl.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;

        // Save percentages as CSS properties for spotlight reflections
        currentTiltEl.style.setProperty('--mouse-x', `${(relativeX / rect.width) * 100}%`);
        currentTiltEl.style.setProperty('--mouse-y', `${(relativeY / rect.height) * 100}%`);
        currentTiltEl.style.setProperty('--mouse-px-x', `${relativeX}px`);
        currentTiltEl.style.setProperty('--mouse-px-y', `${relativeY}px`);

        // Calculate 3D tilt angles (max tilt 10 degrees)
        const tiltX = -((relativeY / rect.height) - 0.5) * 16;
        const tiltY = ((relativeX / rect.width) - 0.5) * 16;

        currentTiltEl.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      } else if (tiltedDOMRef.current) {
        // Reset tilt
        tiltedDOMRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        tiltedDOMRef.current = null;
      }

      // Local spotlight tracking for ANY elements with [data-spotlight]
      const spotlightEl = target.closest('[data-spotlight]') as HTMLElement | null;
      if (spotlightEl && !currentTiltEl) {
        const rect = spotlightEl.getBoundingClientRect();
        const pX = e.clientX - rect.left;
        const pY = e.clientY - rect.top;
        spotlightEl.style.setProperty('--mouse-x', `${(pX / rect.width) * 100}%`);
        spotlightEl.style.setProperty('--mouse-y', `${(pY / rect.height) * 100}%`);
        spotlightEl.style.setProperty('--mouse-px-x', `${pX}px`);
        spotlightEl.style.setProperty('--mouse-px-y', `${pY}px`);
      }
    };

    const handleMouseLeave = () => {
      // Hide cursor elements if mouse exits browser viewport
      if (coreDOMRef.current) coreDOMRef.current.style.opacity = '0';
      if (outerDOMRef.current) outerDOMRef.current.style.opacity = '0';
      if (tiltedDOMRef.current) {
        tiltedDOMRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    };

    const handleMouseEnter = () => {
      if (coreDOMRef.current) coreDOMRef.current.style.opacity = '1';
      if (outerDOMRef.current) outerDOMRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Request Animation Frame processing
    let animationFrameId: number;
    let particleTicks = 0;

    const tick = () => {
      particleTicks += 1;
      
      let targetX = realMouseRef.current.x;
      let targetY = realMouseRef.current.y;

      // Draw Neural Trail if velocity is high
      if (velocityRef.current > 15 && particleTicks % 2 === 0) {
        setTrail((prev) => {
          const newDot: TrailDot = {
            id: Math.random().toString(36).substring(2, 6),
            x: coreRef.current.x,
            y: coreRef.current.y,
            scale: Math.min(0.35 + (velocityRef.current / 50), 1.2),
            opacity: 0.65,
          };
          return [newDot, ...prev.slice(0, 18)]; // Limit to max 18 points
        });
      }

      // Smoothly reduce trail opacities
      setTrail((prev) => 
        prev
          .map((dot) => ({
            ...dot,
            opacity: dot.opacity - 0.045,
            scale: dot.scale * 0.94,
          }))
          .filter((dot) => dot.opacity > 0.02)
      );

      // Handle magnetic pull physics and element translations
      if (magnetDOMRef.current) {
        const rect = magnetDOMRef.current.getBoundingClientRect();
        const mCenterX = rect.left + rect.width / 2;
        const mCenterY = rect.top + rect.height / 2;
        
        const distToCenter = Math.sqrt(
          Math.pow(targetX - mCenterX, 2) + Math.pow(targetY - mCenterY, 2)
        );

        // Maximum binding attraction distance is around 100px
        if (distToCenter < 100) {
          const influence = (100 - distToCenter) / 100; // 0 to 1
          
          // Pull target cursor towards interactive center (feeling elastic)
          targetX = targetX + (mCenterX - targetX) * influence * 0.52;
          targetY = targetY + (mCenterY - targetY) * influence * 0.52;

          // Push the element towards real cursor slightly to have tactile opposition
          const elementPullX = (realMouseRef.current.x - mCenterX) * influence * 0.28;
          const elementPullY = (realMouseRef.current.y - mCenterY) * influence * 0.28;
          
          magnetDOMRef.current.style.transform = `translate3d(${elementPullX}px, ${elementPullY}px, 0)`;
          magnetDOMRef.current.style.transition = 'none';
        } else {
          // Deattracted
          magnetDOMRef.current.style.transform = 'translate3d(0px, 0px, 0)';
          magnetDOMRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
          magnetDOMRef.current = null;
        }
      }

      // CORE interpolates towards coordinates with low-coefficient lag
      coreRef.current.x += (targetX - coreRef.current.x) * 0.25;
      coreRef.current.y += (targetY - coreRef.current.y) * 0.25;

      // OUTER ring spring physics update
      const k = 0.16; // spring stiffness
      const d = 0.58; // damping factor
      
      const ax = -k * (outerRef.current.x - targetX);
      const ay = -k * (outerRef.current.y - targetY);
      
      outerRef.current.vx = (outerRef.current.vx + ax) * d;
      outerRef.current.vy = (outerRef.current.vy + ay) * d;
      
      outerRef.current.x += outerRef.current.vx;
      outerRef.current.y += outerRef.current.vy;

      // Apply coordinates straight to DOM elements via performant translate3d calls
      if (coreDOMRef.current) {
        coreDOMRef.current.style.transform = `translate3d(${coreRef.current.x}px, ${coreRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      if (outerDOMRef.current) {
        // High speed causes expansion/shaping of the ring
        const speed = Math.min(velocityRef.current / 4, 8);
        const ringScale = cursorType === 'button' ? 2.2 : cursorType === 'text' ? 0.3 : cursorType === 'card' ? 2.8 : 1 + speed / 12;
        outerDOMRef.current.style.transform = `translate3d(${outerRef.current.x}px, ${outerRef.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      // Update orbiting positions
      if (orbitActive) {
        orbitParticles.current.forEach((particle) => {
          particle.angle += particle.speed;
        });
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorType, orbitActive]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Neural energy trail - Faded items behind cursor */}
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[99999] bg-cyan-400/35 mix-blend-screen"
          style={{
            transform: `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dot.scale})`,
            opacity: dot.opacity,
            filter: 'blur(3px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* 2. Outer Ring - spring tracking */}
      <div
        ref={outerDOMRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99998] transition-all duration-300 ease-out will-change-transform ${
          cursorType === 'button'
            ? 'w-10 h-10 border border-cyan-400/40 bg-cyan-500/10'
            : cursorType === 'card'
            ? 'w-14 h-14 border border-purple-500/30 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
            : cursorType === 'text'
            ? 'w-2 h-8 border-l border-white bg-transparent rounded-none'
            : 'w-7 h-7 border border-white/20 bg-white/5'
        }`}
        style={{
          transform: 'translate3d(0px, 0px, 0) translate(-50%, -50%)',
        }}
      />

      {/* 3. Core Laser Cursor */}
      <div
        ref={coreDOMRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99999] transition-all duration-150 ease-out will-change-transform ${
          cursorType === 'text'
            ? 'w-0 h-0 opacity-0'
            : cursorType === 'button'
            ? 'w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
            : cursorType === 'card'
            ? 'w-2 h-2 bg-purple-400 shadow-[0_0_12px_#a855f7]'
            : 'w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
        }`}
        style={{
          transform: 'translate3d(0px, 0px, 0) translate(-50%, -50%)',
        }}
      />

      {/* 4. Living Digital Entity Orbiting Particles */}
      {orbitActive && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[99999]"
          style={{
            transform: `translate3d(${coreRef.current.x}px, ${coreRef.current.y}px, 0) translate(-50%, -50%)`,
          }}
        >
          {orbitParticles.current.map((particle) => {
            const rad = cursorType === 'button' ? particle.radius + 6 : particle.radius + 14;
            const px = Math.cos(particle.angle) * rad;
            const py = Math.sin(particle.angle) * rad;
            return (
              <div
                key={particle.id}
                className="absolute w-1 h-1 rounded-full animate-pulse pointer-events-none"
                style={{
                  transform: `translate3d(${px}px, ${py}px, 0)`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 6px ${particle.color}`,
                  opacity: 0.75,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
