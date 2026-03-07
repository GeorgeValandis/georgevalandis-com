import { getSiteCopy } from '@/content/siteCopy';
import { blogPosts } from '@/content/blogPosts';
import type { SiteLocale } from '@/lib/siteLocale';
import { localizedPath } from '@/lib/siteLocale';
import { ArrowLeft, ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';

type BlogIndexPageProps = {
  locale: SiteLocale;
};

export default function BlogIndexPage({ locale }: BlogIndexPageProps) {
  const copy = getSiteCopy(locale);

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

        <div className="grid sm:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={localizedPath(locale, `/blog/${post.slug}`)}
              className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-amber-500/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>

              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl font-semibold leading-snug group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <ArrowUpRight
                  size={16}
                  className="text-gray-600 group-hover:text-amber-400 transition-colors shrink-0 mt-1"
                />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
