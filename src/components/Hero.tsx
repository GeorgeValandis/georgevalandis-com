'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { type SiteLocale } from '@/lib/siteLocale';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

type HeroProps = {
  locale: SiteLocale;
};

export default function Hero({ locale }: HeroProps) {
  const copy = getSiteCopy(locale);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-glow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow [animation-delay:4s]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-sm text-gray-400">
              {copy.hero.badge}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8"
        >
          <span className="block">{copy.hero.titleLines[0]}</span>
          <span className="block mt-2 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-gradient">
            {copy.hero.titleLines[1]}
          </span>
          <span className="block mt-2 text-gray-500">{copy.hero.titleLines[2]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {copy.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#apps"
            className="group px-8 py-4 bg-white text-gray-950 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 flex items-center justify-center gap-2"
          >
            {copy.hero.primaryCta}
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-white/10 rounded-full font-semibold text-sm hover:bg-white/5 transition-all duration-300 text-gray-300 flex items-center justify-center"
          >
            {copy.hero.secondaryCta}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#apps"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
