import AfterWorkHomepagePreview from '@/components/AfterWorkHomepagePreview';
import { homeJsonLd } from '@/lib/homeSeo';
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'George Valandis',
    title: 'George Valandis — Indie iOS Apps & After Work',
    description:
      'Indie iOS apps, real problems, and a calmer kind of work life. Follow George Valandis from 5 to 9 and join the After Work newsletter.',
    images: [
      {
        url: '/after-work-preview/hero-desk.webp',
        width: 1672,
        height: 941,
        alt: 'A warm late-night developer desk with a laptop and notebook',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'George Valandis — Indie iOS Apps & After Work',
    description:
      'Indie iOS apps, real problems, and a calmer kind of work life. Follow George Valandis from 5 to 9 and join the After Work newsletter.',
    images: ['/after-work-preview/hero-desk.webp'],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd('en')) }} />
      <AfterWorkHomepagePreview locale="en" />
    </>
  );
}
