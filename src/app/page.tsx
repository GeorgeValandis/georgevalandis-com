import HomePage from '@/components/HomePage';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: localizedAlternates('/', '/de/'),
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
