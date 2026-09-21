import AfterWorkHomepagePreview from '@/components/AfterWorkHomepagePreview';
import { homeJsonLd } from '@/lib/homeSeo';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'George Valandis — Indie-iOS-Apps & After Work',
  description:
    'Indie-iOS-Apps, echte Probleme und eine ruhigere Art zu arbeiten. Begleite George Valandis von 17 bis 21 Uhr und abonniere den After-Work-Newsletter.',
  alternates: {
    canonical: '/de/',
    languages: localizedAlternates('/', '/de/'),
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: '/de/',
    siteName: 'George Valandis',
    title: 'George Valandis — Indie-iOS-Apps & After Work',
    description:
      'Indie-iOS-Apps, echte Probleme und eine ruhigere Art zu arbeiten. Begleite George Valandis von 17 bis 21 Uhr und abonniere den After-Work-Newsletter.',
    images: [
      {
        url: '/after-work-preview/hero-desk.webp',
        width: 1672,
        height: 941,
        alt: 'Ein warmer Entwicklerarbeitsplatz am späten Abend mit Laptop und Notizbuch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'George Valandis — Indie-iOS-Apps & After Work',
    description:
      'Indie-iOS-Apps, echte Probleme und eine ruhigere Art zu arbeiten. Begleite George Valandis von 17 bis 21 Uhr und abonniere den After-Work-Newsletter.',
    images: ['/after-work-preview/hero-desk.webp'],
  },
};

export default function GermanHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd('de')) }} />
      <AfterWorkHomepagePreview locale="de" />
    </>
  );
}
