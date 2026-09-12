import AfterWorkHomepagePreview from '@/components/AfterWorkHomepagePreview';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'George Valandis — Indie iOS Apps & After Work',
  description:
    'Indie iOS apps, real problems, and a calmer kind of work life. Follow George Valandis from 5 to 9 and join the After Work newsletter.',
  alternates: {
    canonical: '/',
    languages: localizedAlternates('/', '/de/'),
  },
};

export default function Page() {
  return <AfterWorkHomepagePreview locale="en" />;
}
