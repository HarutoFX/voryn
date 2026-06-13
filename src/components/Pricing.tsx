import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, HelpCircle, ArrowRight, ShieldCheck, Cpu, Database } from 'lucide-react';
import { VibeTheme, GlowLevel } from '../types';

interface PricingProps {
  theme: VibeTheme;
  glow: GlowLevel;
}

export default function Pricing({ theme, glow }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');

  const plans = [
    {
      name: 'Developer Sandbox',
      tagline: 'Ideal for prototyping localized compiler streams.',
      priceMonthly: 0,
      priceAnnually: 0,
      features: [
        'Single node compiler gateway',
        'Standard eBPF sandbox zone',
        '2.4 GB memory payload caches',
        'Dynamic terminal console metrics',
        'Community dev support only'
      ],
      cta: 'Provision Sandbox Free',
      popular: false,
      tier: 'builder' as const,
    },
    {
      name: 'Spatial Protocol',
      tagline: 'Unlocks complete global state replication grids.',
      priceMonthly: 79,
      priceAnnually: 64,
      features: [
        'Infinite node compiler mesh',
        'Multi-center state synchronized tunnels',
        'Sub-2ms edge packet trace logs',
        'Holographic architecture maps',
        'FIPS 140-3 Level 4 sandbox encryption',
        '24/7 dedicated engineering support'
      ],
      cta: 'Acquire Protocol License',
      popular: true,
      tier: 'protocol' as const,
    },
    {
      name: 'Enterprise Grid',
      tagline: 'Engineered for planetary-scale hardware pipelines.',
      priceMonthly: 299,
      priceAnnually: 239,
      features: [
        'Dedicated bare-metal instances',
        'QuantumVault key synchronization',
        'Deterministic hardware TLS chips',
        'Audit-ready ledger compilation',
        'Custom SLAs & sub-millisecond latency',
        'White-glove infrastructure architect'
      ],
      cta: 'Establish Enterprise Grid',
      popular: false,
      tier: 'enterprise' as const,
    },
  ];

  const getThemeColors = () => {
    if (theme === 'cyan') return {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      btn: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]',
      accentGlow: 'from-cyan-500/15 via-blue-500/5 to-transparent',
    };
    if (theme === 'purple') return {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      btn: 'bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]',
      accentGlow: 'from-purple-500/15 via-indigo-500/5 to-transparent',
    };
    return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      btn: 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)]',
      accentGlow: 'from-amber-500/15 via-orange-500/5 to-transparent',
    };
  };

  const colors = getThemeColors();

  return (
    <section id="licensing" className="relative py-28 overflow-hidden bg-brand-deep border-t border-white/5">
      
      {/* Background visual halo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 filter blur-[125px] rounded-full pointing-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className={`inline-flex items-center gap-1 px-3 py-1 font-mono text-[11px] rounded-full border ${colors.border} ${colors.bg} ${colors.text} font-bold uppercase mb-4`}>
            LICENSING TIERS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-none">
            Planetary scale pricing structures.
          </h2>
          <p className="text-slate-400 text-lg mt-4 leading-relaxed">
            Choose the license depth suited for your compilation clusters. Clear billing, no friction, absolute scaling.
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center gap-4 mt-10 p-1 rounded-xl bg-slate-950/80 border border-white/5 relative">
            <button
              onClick={() => setBillingPeriod('monthly')}
              data-magnetic
              className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase transition-all duration-300 ${
                billingPeriod === 'monthly' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annually')}
              data-magnetic
              className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase transition-all duration-300 relative flex items-center gap-1.5 ${
                billingPeriod === 'annually' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`px-1.5 py-0.5 text-[9px] rounded-full font-sans font-bold bg-green-500/10 border border-green-500/25 ${
                billingPeriod === 'annually' ? 'text-green-300' : 'text-green-500'
              }`}>
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full">
          {plans.map((plan, index) => {
            const isStandard = plan.tier === 'protocol';
            const priceVal = billingPeriod === 'annually' ? plan.priceAnnually : plan.priceMonthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-cursor="card"
                data-tilt
                data-spotlight
                className={`relative rounded-2xl flex flex-col justify-between p-6 md:p-8 backdrop-blur-xl border transition-all duration-500 group overflow-hidden perspective-element hover:translate-z-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                  isStandard 
                    ? `border-${theme === 'cyan' ? 'cyan' : theme === 'purple' ? 'purple' : 'amber'}-500/35 bg-gradient-to-b ${colors.accentGlow} to-[#060419]/90 scale-105-calc z-20 shadow-2xl`
                    : 'border-white/10 bg-[#06041a]/60 hover:border-white/20 z-10'
                }`}
              >
                {/* Spotlight reflection shadow background layer */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
                  style={{
                    background: plan.tier === 'protocol' 
                      ? 'radial-gradient(320px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(34, 211, 238, 0.12) 0%, transparent 80%)'
                      : 'radial-gradient(320px circle at var(--mouse-px-x, 50%) var(--mouse-px-y, 50%), rgba(255, 255, 255, 0.08) 0%, transparent 80%)'
                  }}
                />

                {/* Visual Glow boundaries for popular card */}
                {isStandard && (
                  <div className={`absolute top-0 right-0 px-3.5 py-1 rounded-bl-xl font-mono text-[9px] font-bold text-center uppercase border-l border-b border-${theme === 'cyan' ? 'cyan' : theme === 'purple' ? 'purple' : 'amber'}-500/30 ${colors.bg} ${colors.text} z-20`}>
                    MOST APPLIED
                  </div>
                )}

                {/* Upper Frame */}
                <div className="relative z-10">
                  <span className="font-display font-bold text-lg text-white block mb-2">{plan.name}</span>
                  <span className="text-slate-400 text-xs font-sans tracking-wide leading-relaxed block h-10 mb-6">{plan.tagline}</span>
                  
                  {/* Price mapping */}
                  <div className="flex items-baseline gap-2 mb-6 border-b border-white/5 pb-6">
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-white">
                      ${priceVal}
                    </span>
                    <span className="font-mono text-xs text-slate-500 uppercase">
                      / month {billingPeriod === 'annually' && 'billed annually'}
                    </span>
                  </div>

                  {/* Bullet features list */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-0.5 bg-white/5 border border-white/10 ${colors.text}`}>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-slate-300 text-xs leading-relaxed font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lower Action CTA */}
                <button
                  data-magnetic
                  className={`w-full py-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 relative z-10 ${
                    isStandard 
                      ? colors.btn
                      : 'border-white/10 hover:border-white/25 hover:bg-white/5 text-white bg-transparent'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Trust section below card */}
        <div className="mt-16 text-center text-slate-500 text-xs font-mono max-w-lg mx-auto leading-relaxed border border-white/5 rounded-2xl p-6 bg-slate-950/60 flex flex-col sm:flex-row items-center gap-4">
          <ShieldCheck className={`h-8 w-8 ${colors.text} shrink-0 animate-pulse`} />
          <div className="text-left">
            <span className="block text-white font-semibold mb-0.5 uppercase tracking-wide">Enterprise Compliance Grid Secure</span>
            Every transaction compiled through our spatial system is encrypted with military-grade keys and covered by modular ledger redundancy.
          </div>
        </div>

      </div>
    </section>
  );
}
