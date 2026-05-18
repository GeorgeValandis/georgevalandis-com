import BlogIndexPage from '@/components/BlogIndexPage';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - George Valandis',
  description:
    'Gedanken und Updates zu iOS-Entwicklung, Marketing und dem öffentlichen Aufbau meiner Produkte.',
  alternates: {
    canonical: '/de/blog/',
    languages: localizedAlternates('/blog/', '/de/blog/'),
  },
};

export default function GermanBlogPage() {
  return <BlogIndexPage locale="de" />;
}
