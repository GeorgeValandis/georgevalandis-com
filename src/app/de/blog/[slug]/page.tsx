import BlogPostPageContent from '@/components/BlogPostPageContent';
import { blogPosts, getBlogPostBySlug } from '@/content/blogPosts';
import { getLocalizedBlogPost } from '@/content/blogPostTranslations';
import { canonicalPath, localizedAlternates } from '@/lib/seo';
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

  const localizedPost = getLocalizedBlogPost(post, 'de');
  const canonical = canonicalPath(`/de/blog/${post.slug}`);

  return {
    title: `${localizedPost.title} - George Valandis`,
    description: localizedPost.excerpt,
    alternates: {
      canonical,
      languages: localizedAlternates(`/blog/${post.slug}/`, `/de/blog/${post.slug}/`),
    },
    openGraph: {
      type: 'article',
      locale: 'de_DE',
      siteName: 'George Valandis',
      url: canonical,
      title: `${localizedPost.title} - George Valandis`,
      description: localizedPost.excerpt,
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      authors: ['George Valandis'],
      images: [{ url: '/after-work-preview/hero-desk.webp', alt: localizedPost.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${localizedPost.title} - George Valandis`,
      description: localizedPost.excerpt,
      images: ['/after-work-preview/hero-desk.webp'],
    },
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
