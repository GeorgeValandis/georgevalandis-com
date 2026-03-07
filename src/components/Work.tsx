'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { apps } from '@/content/apps';
import { type SiteLocale } from '@/lib/siteLocale';

type AppsProps = {
  locale: SiteLocale;
};

export default function Apps({ locale }: AppsProps) {
  const copy = getSiteCopy(locale);

  return (
    <section id="apps" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-amber-400 font-mono text-sm mb-3 tracking-wider uppercase">
            {copy.apps.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {copy.apps.title}
            <span className="text-gray-500">{copy.apps.titleAccent}</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl">
            {copy.apps.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <motion.article
              key={app.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }}
              className={`group relative rounded-2xl border border-white/5 ${app.accentBorder} bg-white/[0.02] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] block`}
            >
              <a
                href={app.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.apps.appStoreAriaPrefix} ${app.title} in the App Store`}
                className="absolute inset-0 z-10"
              />

              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />

              <div className="relative z-20 p-7 pointer-events-none">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={app.logo}
                      alt={`${app.title} logo`}
                      className="w-11 h-11 rounded-xl border border-white/10 object-cover shrink-0"
                      loading="lazy"
                    />
                    <h3 className="text-xl font-bold truncate">{app.title}</h3>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-600 group-hover:text-white transition-colors duration-300 mt-1 shrink-0"
                  />
                </div>

                <p className="text-amber-400/70 text-sm font-medium mb-4">
                  {app.subtitle}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {app.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 font-mono">
                    {copy.apps.legalLabel}
                  </span>
                  <a
                    href={app.legal.termsPath}
                    className="pointer-events-auto px-3 py-1 text-xs font-mono text-amber-100 bg-amber-300/10 rounded-full border border-amber-300/35 hover:text-amber-50 hover:border-amber-200/55 hover:bg-amber-300/20 transition-colors"
                  >
                    {copy.apps.termsLabel}
                  </a>
                  <a
                    href={app.legal.privacyPath}
                    className="pointer-events-auto px-3 py-1 text-xs font-mono text-amber-100 bg-amber-300/10 rounded-full border border-amber-300/35 hover:text-amber-50 hover:border-amber-200/55 hover:bg-amber-300/20 transition-colors"
                  >
                    {copy.apps.privacyLabel}
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono text-gray-400 bg-white/5 rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
