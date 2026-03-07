import BlogIndexPage from '@/components/BlogIndexPage';

export const metadata = {
  title: 'Blog - George Valandis',
  description:
    'Thoughts and updates about iOS development, marketing, and building in public.',
};

export default function BlogPage() {
  return <BlogIndexPage locale="en" />;
}
