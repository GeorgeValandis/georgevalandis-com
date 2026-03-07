import BlogPostPageContent from '@/components/BlogPostPageContent';
import { blogPosts, getBlogPostBySlug } from '@/content/blogPosts';
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
      title: 'Beitrag nicht gefunden - George Valandis',
    };
  }

  return {
    title: `${post.title} - George Valandis`,
    description: post.excerpt,
  };
}

export default async function GermanBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageContent locale="de" post={post} />;
}
