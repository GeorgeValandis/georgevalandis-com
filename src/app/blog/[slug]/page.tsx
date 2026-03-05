import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import {
  blogPosts,
  getBlogPostBySlug,
  type BlogContentBlock,
} from '@/content/blogPosts';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

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

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found - George Valandis',
    };
  }

  return {
    title: `${post.title} - George Valandis`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <header className="mt-8 mb-10">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        <div>{post.content.map((block, index) => renderBlock(block, index))}</div>
      </article>
    </main>
  );
}
