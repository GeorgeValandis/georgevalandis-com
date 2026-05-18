'use client';

import { blogPosts, type BlogPost } from '@/content/blogPosts';
import { getSiteCopy } from '@/content/siteCopy';
import { localizedPath, type SiteLocale } from '@/lib/siteLocale';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';

type BlogProps = {
  locale: SiteLocale;
};

type ViewMode = 'grid' | 'list';

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

function BlogCard({
  locale,
  post,
  index,
}: {
  locale: SiteLocale;
  post: BlogPost;
  index: number;
}) {
  return (
    <motion.a
      key={post.slug}
      href={localizedPath(locale, `/blog/${post.slug}`)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
      className="group relative block rounded-2xl border border-white/5 bg-white/[0.02] p-7 transition-all duration-500 hover:border-amber-500/20"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} />
          <span>{post.date}</span>
        </div>

        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-white">
            {post.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="mt-1 shrink-0 text-gray-600 transition-colors group-hover:text-amber-400"
          />
        </div>

        <p className="text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
      </div>
    </motion.a>
  );
}

function BlogListRow({
  locale,
  post,
  index,
}: {
  locale: SiteLocale;
  post: BlogPost;
  index: number;
}) {
  return (
    <motion.a
      key={post.slug}
      href={localizedPath(locale, `/blog/${post.slug}`)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' as const }}
      className="group grid gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-500 hover:border-amber-500/20 hover:bg-white/[0.04] md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
    >
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} />
          <span>{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-white">
          {post.title}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">
          {post.excerpt}
        </p>
      </div>

      <ArrowUpRight
        size={16}
        className="text-gray-600 transition-colors group-hover:text-amber-400 md:justify-self-end"
      />
    </motion.a>
  );
}

export default function Blog({ locale }: BlogProps) {
  const copy = getSiteCopy(locale);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <section id="blog" className="py-32 relative">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-amber-400 font-mono text-sm mb-3 tracking-wider uppercase">
            {copy.blog.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {copy.blog.titleTop}
            <br />
            <span className="text-gray-500">{copy.blog.titleBottom}</span>
          </h2>
        </motion.div>

        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            <ViewButton
              active={viewMode === 'grid'}
              label={copy.blog.gridViewLabel}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={14} />
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              label={copy.blog.listViewLabel}
              onClick={() => setViewMode('list')}
            >
              <List size={15} />
            </ViewButton>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} locale={locale} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {blogPosts.map((post, i) => (
              <BlogListRow key={post.slug} locale={locale} post={post} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href={localizedPath(locale, '/blog')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group/link"
          >
            <span className="text-sm font-medium">{copy.blog.viewAll}</span>
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
