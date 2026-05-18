import BlogIndexPage from '@/components/BlogIndexPage';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - George Valandis',
  description:
    'Thoughts and updates about iOS development, marketing, and building in public.',
  alternates: {
    canonical: '/blog/',
    languages: localizedAlternates('/blog/', '/de/blog/'),
  },
};

export default function BlogPage() {
  return <BlogIndexPage locale="en" />;
}
