import ImprintContent from '@/components/ImprintContent';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imprint - George Valandis',
  description: 'Legal notice and provider information for georgevalandis.com.',
  alternates: {
    canonical: '/imprint/',
    languages: localizedAlternates('/imprint/', '/de/imprint/'),
  },
};

export default function ImprintPage() {
  return <ImprintContent locale="en" />;
}
