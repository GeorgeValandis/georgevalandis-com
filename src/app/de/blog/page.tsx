import BlogIndexPage from '@/components/BlogIndexPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - George Valandis',
  description:
    'Gedanken und Updates zu iOS-Entwicklung, Marketing und dem öffentlichen Aufbau meiner Produkte.',
};

export default function GermanBlogPage() {
  return <BlogIndexPage locale="de" />;
}
