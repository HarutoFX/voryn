export type VibeTheme = 'cyan' | 'purple' | 'amber';
export type GlowLevel = 'stealth' | 'normal' | 'intense';

export interface AmbientConfig {
  theme: VibeTheme;
  glow: GlowLevel;
  synthEnabled: boolean;
  particlesEnabled: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  latencyMetric?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnually: number;
  features: string[];
  cta: string;
  popular: boolean;
  tier: 'builder' | 'protocol' | 'enterprise';
}
