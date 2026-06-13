import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface TestimonialsProps {
  theme: VibeTheme;
  glow: GlowLevel;
}

export default function Testimonials({ theme, glow }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "Aether has completely revolutionized how we monitor our distributed network compiler pipelines. We resolved a massive routing choke within twenty seconds of plugging the topological mesh in.",
      author: "Marcus Vance",
      role: "Lead Systems Architect",
      company: "Stripe Core Node",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "The spatial compiler interface is a masterpiece of user experience design. Managing complex micro-transactions and database sync nodes at 60 FPS feels like controlling a living, breathing software organism.",
      author: "Sienna Holt",
      role: "Director of Product Design",
      company: "Linear Systems",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Deterministic builds combined with hardware-level isolated compile sandboxes. Aether provides the strict security and zero-compromise latency that hyper-scale operations demand.",
      author: "Dr. Kenji Sato",
      role: "Principal Infrastructure Engineer",
      company: "Apple Cloud Grid",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const getThemeColors = () => {
    if (theme === 'cyan') return {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      accentBg: 'bg-cyan-500/10',
    };
    if (theme === 'purple') return {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      accentBg: 'bg-purple-500/10',
    };
    return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      accentBg: 'bg-amber-500/10',
    };
  };

  const colors = getThemeColors();
  const current = testimonials[activeIndex];

  return (
    <section id="features-showcase" className="relative py-28 overflow-hidden bg-brand-deep border-t border-white/5">
      
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-blue-500/5 filter blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Quote symbol */}
        <div className={`p-4 rounded-full ${colors.accentBg} ${colors.text} mb-8 animate-bounce-slow`}>
          <Quote className="h-8 w-8" />
        </div>

        {/* Sliding quote framework */}
        <div className="min-h-[220px] md:min-h-[185px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed italic block">
                "{current.quote}"
              </p>

              {/* Star rating */}
              <div className="flex items-center justify-center gap-1 mt-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Author metadata */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <img 
                  src={current.avatarUrl} 
                  alt={current.author} 
                  className={`h-12 w-12 rounded-full border-2 ${colors.border} object-cover`}
                />
                <div className="text-left">
                  <span className="block font-display font-semibold text-white uppercase tracking-wider text-sm flex items-center gap-1.5">
                    {current.author}
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </span>
                  <span className="block text-xs font-mono text-slate-400 mt-0.5">{current.role}, <strong className="text-slate-300">{current.company}</strong></span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel buttons and indicators */}
        <div className="flex items-center gap-6 mt-12">
          
          <button
            onClick={prevTestimonial}
            data-magnetic
            className="p-3 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots group */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                data-magnetic
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i 
                    ? `w-6 ${theme === 'cyan' ? 'bg-cyan-400' : theme === 'purple' ? 'bg-purple-400' : 'bg-amber-400'}` 
                    : 'w-2 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            data-magnetic
            className="p-3 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
