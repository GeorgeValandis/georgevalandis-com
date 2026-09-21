import { getSiteCopy } from '@/content/siteCopy';
import type { BlogContentBlock, BlogPost } from '@/content/blogPosts';
import { formatBlogPostDate, getLocalizedBlogPost } from '@/content/blogPostTranslations';
import { blogPostJsonLd } from '@/lib/blogSeo';
import type { SiteLocale } from '@/lib/siteLocale';
import { localizedPath } from '@/lib/siteLocale';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

function renderBlock(block: BlogContentBlock, index: number) {
  if (block.type === 'heading') {
    return (
      <h2 key={index} className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-white">
        {block.text}
      </h2>
    );
  }

  if (block.type === 'list') {
    return (
      <ul key={index} className="list-disc pl-6 space-y-2 text-gray-300 leading-relaxed mb-6">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="text-gray-300 leading-relaxed mb-5">
      {block.text}
    </p>
  );
}

type BlogPostPageContentProps = {
  locale: SiteLocale;
  post: BlogPost;
};

export default function BlogPostPageContent({
  locale,
  post,
}: BlogPostPageContentProps) {
  const copy = getSiteCopy(locale);
  const localizedPost = getLocalizedBlogPost(post, locale);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post, locale)) }}
      />
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href={localizedPath(locale, '/blog')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          {copy.blog.backToBlog}
        </Link>

        <header className="mt-8 mb-10">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <Calendar size={14} />
            <span>{formatBlogPostDate(post, locale)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {localizedPost.title}
          </h1>
        </header>

        <div>{localizedPost.content.map((block, index) => renderBlock(block, index))}</div>
      </article>
    </main>
  );
}
