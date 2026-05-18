'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { motion } from 'framer-motion';
import { ExternalLink, Grid3X3, List, Monitor, Smartphone } from 'lucide-react';
import { apps, type AppEntry } from '@/content/apps';
import { type SiteLocale } from '@/lib/siteLocale';
import type { ReactNode } from 'react';
import { useState } from 'react';

type AppsProps = {
  locale: SiteLocale;
};

type ViewMode = 'grid' | 'list';

function PlatformBadge({ platform }: { platform: AppEntry['platforms'][number] }) {
  const PlatformIcon = platform === 'macOS' ? Monitor : Smartphone;
  const badgeClasses =
    platform === 'macOS'
      ? 'border-slate-300/20 bg-slate-200/10 text-slate-100'
      : platform === 'Android'
        ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'
      : 'border-sky-300/20 bg-sky-300/10 text-sky-100';
  const iconClasses =
    platform === 'macOS'
      ? 'text-slate-200'
      : platform === 'Android'
        ? 'text-emerald-200'
        : 'text-sky-200';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide shadow-[0_0_0_1px_rgba(255,255,255,0.03)] ${badgeClasses}`}
    >
      <PlatformIcon size={12} className={iconClasses} />
      {platform} App
    </span>
  );
}

function ViewButton({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors ${
        active
          ? 'bg-white text-gray-950'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}

function AppCard({
  app,
  copy,
  index,
}: {
  app: AppEntry;
  copy: ReturnType<typeof getSiteCopy>;
  index: number;
}) {
  const cardHref = app.appStoreLink ?? app.websitePath;
  const isExternalCard = Boolean(app.appStoreLink);

  return (
    <motion.article
      key={app.slug}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' as const }}
      className={`group relative rounded-2xl border border-white/5 ${app.accentBorder} bg-white/[0.02] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] block`}
    >
      {cardHref ? (
        <a
          href={cardHref}
          target={isExternalCard ? '_blank' : undefined}
          rel={isExternalCard ? 'noopener noreferrer' : undefined}
          aria-label={
            isExternalCard
              ? `${copy.apps.appStoreAriaPrefix} ${app.title} in the App Store`
              : `Open ${app.title}`
          }
          className="absolute inset-0 z-10"
        />
      ) : null}

      <div
        className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />

      <div className="relative z-20 p-7 pointer-events-none">
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <img
              src={app.logo}
              alt={`${app.title} logo`}
              className="w-11 h-11 rounded-xl border border-white/10 object-cover shrink-0"
              loading="lazy"
            />
            <div className="min-w-0">
              <h3 className="text-xl font-bold truncate">{app.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {app.platforms.map((platform) => (
                  <PlatformBadge key={platform} platform={platform} />
                ))}
              </div>
            </div>
          </div>
          {cardHref ? (
            <ExternalLink
              size={16}
              className="text-gray-600 group-hover:text-white transition-colors duration-300 mt-1 shrink-0"
            />
          ) : null}
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
  );
}

function AppListRow({
  app,
  copy,
  index,
}: {
  app: AppEntry;
  copy: ReturnType<typeof getSiteCopy>;
  index: number;
}) {
  const cardHref = app.appStoreLink ?? app.websitePath;
  const isExternalCard = Boolean(app.appStoreLink);

  return (
    <motion.article
      key={app.slug}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' as const }}
      className={`group relative overflow-hidden rounded-2xl border border-white/5 ${app.accentBorder} bg-white/[0.02] transition-all duration-500 hover:bg-white/[0.04]`}
    >
      {cardHref ? (
        <a
          href={cardHref}
          target={isExternalCard ? '_blank' : undefined}
          rel={isExternalCard ? 'noopener noreferrer' : undefined}
          aria-label={
            isExternalCard
              ? `${copy.apps.appStoreAriaPrefix} ${app.title} in the App Store`
              : `Open ${app.title}`
          }
          className="absolute inset-0 z-10"
        />
      ) : null}

      <div
        className={`absolute inset-0 bg-gradient-to-r ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />

      <div className="relative z-20 grid gap-4 p-5 pointer-events-none md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="flex min-w-0 items-start gap-4">
          <img
            src={app.logo}
            alt={`${app.title} logo`}
            className="h-12 w-12 rounded-xl border border-white/10 object-cover shrink-0"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-bold text-white">{app.title}</h3>
              <div className="flex flex-wrap gap-2">
                {app.platforms.map((platform) => (
                  <PlatformBadge key={platform} platform={platform} />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-amber-400/75">
              {app.subtitle}
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-gray-400">
              {app.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {app.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-mono text-gray-400"
            >
              {tag}
            </span>
          ))}
          <a
            href={app.legal.termsPath}
            className="pointer-events-auto rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-mono text-amber-100 transition-colors hover:border-amber-200/55 hover:bg-amber-300/20 hover:text-amber-50"
          >
            {copy.apps.termsLabel}
          </a>
          <a
            href={app.legal.privacyPath}
            className="pointer-events-auto rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-mono text-amber-100 transition-colors hover:border-amber-200/55 hover:bg-amber-300/20 hover:text-amber-50"
          >
            {copy.apps.privacyLabel}
          </a>
          {cardHref ? (
            <ExternalLink
              size={16}
              className="text-gray-600 transition-colors duration-300 group-hover:text-white"
            />
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Apps({ locale }: AppsProps) {
  const copy = getSiteCopy(locale);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <section id="apps" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={false}
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

        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            <ViewButton
              active={viewMode === 'grid'}
              label={copy.apps.gridViewLabel}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={14} />
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              label={copy.apps.listViewLabel}
              onClick={() => setViewMode('list')}
            >
              <List size={15} />
            </ViewButton>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, i) => (
              <AppCard key={app.slug} app={app} copy={copy} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {apps.map((app, i) => (
              <AppListRow key={app.slug} app={app} copy={copy} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
