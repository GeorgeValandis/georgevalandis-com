import BlogPostPageContent from '@/components/BlogPostPageContent';
import { blogPosts, getBlogPostBySlug } from '@/content/blogPosts';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

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
    alternates: {
      canonical: `/blog/${post.slug}/`,
      languages: localizedAlternates(
        `/blog/${post.slug}/`,
        `/de/blog/${post.slug}/`
      ),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageContent locale="en" post={post} />;
}
