import BlogIndexPage from '@/components/BlogIndexPage';
import { canonicalPath, localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - George Valandis',
  description:
    'Thoughts and updates about iOS development, marketing, and building in public.',
  alternates: {
    canonical: '/blog/',
    languages: localizedAlternates('/blog/', '/de/blog/'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'George Valandis',
    url: canonicalPath('/blog'),
    title: 'Blog - George Valandis',
    description:
      'Thoughts and updates about iOS development, marketing, and building in public.',
    images: [{ url: '/after-work-preview/hero-desk.webp', alt: 'George Valandis working at a late-night developer desk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - George Valandis',
    description:
      'Thoughts and updates about iOS development, marketing, and building in public.',
    images: ['/after-work-preview/hero-desk.webp'],
  },
};

export default function BlogPage() {
  return <BlogIndexPage locale="en" />;
}
