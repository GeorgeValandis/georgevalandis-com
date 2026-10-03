import SetupPage from '@/components/SetupPage';
import { canonicalPath, localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

const title = 'Mein Schreibtisch-Setup - George Valandis';
const description = 'Schreibtisch, Mac-Zubehör, Kamera und Audio: das Equipment, mit dem ich iOS-Apps und Inhalte baue.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/de/setup/',
    languages: localizedAlternates('/setup/', '/de/setup/'),
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'George Valandis',
    url: canonicalPath('/de/setup'),
    title,
    description,
    images: [{ url: '/setup/desk.jpg', alt: 'Schreibtisch-Setup von George Valandis' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/setup/desk.jpg'],
  },
};

export default function GermanSetupRoute() {
  return <SetupPage locale="de" />;
}
