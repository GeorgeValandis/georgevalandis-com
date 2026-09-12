import AfterWorkHomepagePreview from '@/components/AfterWorkHomepagePreview';
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
};

export default function GermanHomePage() {
  return <AfterWorkHomepagePreview locale="de" />;
}
