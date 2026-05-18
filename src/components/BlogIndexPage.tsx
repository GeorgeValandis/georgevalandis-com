'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { blogPosts, type BlogPost } from '@/content/blogPosts';
import type { SiteLocale } from '@/lib/siteLocale';
import { localizedPath } from '@/lib/siteLocale';
import { ArrowLeft, ArrowUpRight, Calendar, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';

type BlogIndexPageProps = {
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

function BlogCard({ locale, post }: { locale: SiteLocale; post: BlogPost }) {
  return (
    <Link
      href={localizedPath(locale, `/blog/${post.slug}`)}
      className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-amber-500/30"
    >
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
        <Calendar size={12} />
        <span>{post.date}</span>
      </div>

      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-xl font-semibold leading-snug transition-colors group-hover:text-white">
          {post.title}
        </h2>
        <ArrowUpRight
          size={16}
          className="mt-1 shrink-0 text-gray-600 transition-colors group-hover:text-amber-400"
        />
      </div>

      <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
    </Link>
  );
}

function BlogListRow({ locale, post }: { locale: SiteLocale; post: BlogPost }) {
  return (
    <Link
      href={localizedPath(locale, `/blog/${post.slug}`)}
      className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-amber-500/30 hover:bg-white/[0.04] md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
    >
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} />
          <span>{post.date}</span>
        </div>
        <h2 className="text-lg font-semibold leading-snug text-white">
          {post.title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400">
          {post.excerpt}
        </p>
      </div>

      <ArrowUpRight
        size={16}
        className="text-gray-600 transition-colors group-hover:text-amber-400 md:justify-self-end"
      />
    </Link>
  );
}

export default function BlogIndexPage({ locale }: BlogIndexPageProps) {
  const copy = getSiteCopy(locale);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href={localizedPath(locale, '/')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          {copy.blog.backToHome}
        </Link>

        <header className="mt-8 mb-12">
          <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {copy.blog.overviewTitle}
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl">{copy.blog.overviewDescription}</p>
        </header>

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
          <div className="grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} locale={locale} post={post} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {blogPosts.map((post) => (
              <BlogListRow key={post.slug} locale={locale} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
