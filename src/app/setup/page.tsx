import SetupPage from '@/components/SetupPage';
import { canonicalPath, localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

const title = 'My Desk Setup - George Valandis';
const description = 'The desk, Mac accessories, camera and audio gear I use to build iOS apps and content.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/setup/',
    languages: localizedAlternates('/setup/', '/de/setup/'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'George Valandis',
    url: canonicalPath('/setup'),
    title,
    description,
    images: [{ url: '/setup/desk.jpg', alt: 'George Valandis desk setup' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/setup/desk.jpg'],
  },
};

export default function SetupRoute() {
  return <SetupPage locale="en" />;
}
