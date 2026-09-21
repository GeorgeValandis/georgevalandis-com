import BlogIndexPage from '@/components/BlogIndexPage';
import { canonicalPath, localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - George Valandis',
  description:
    'Gedanken und Updates zu iOS-Entwicklung, Marketing und dem öffentlichen Aufbau meiner Produkte.',
  alternates: {
    canonical: '/de/blog/',
    languages: localizedAlternates('/blog/', '/de/blog/'),
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'George Valandis',
    url: canonicalPath('/de/blog'),
    title: 'Blog - George Valandis',
    description:
      'Gedanken und Updates zu iOS-Entwicklung, Marketing und dem öffentlichen Aufbau meiner Produkte.',
    images: [{ url: '/after-work-preview/hero-desk.webp', alt: 'George Valandis an einem nächtlichen Entwicklerarbeitsplatz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - George Valandis',
    description:
      'Gedanken und Updates zu iOS-Entwicklung, Marketing und dem öffentlichen Aufbau meiner Produkte.',
    images: ['/after-work-preview/hero-desk.webp'],
  },
};

export default function GermanBlogPage() {
  return <BlogIndexPage locale="de" />;
}
