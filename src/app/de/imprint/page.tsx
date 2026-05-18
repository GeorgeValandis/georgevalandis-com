import ImprintContent from '@/components/ImprintContent';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum - George Valandis',
  description: 'Impressumsangaben und Anbieterkennzeichnung fuer georgevalandis.com.',
  alternates: {
    canonical: '/de/imprint/',
    languages: localizedAlternates('/imprint/', '/de/imprint/'),
  },
};

export default function GermanImprintPage() {
  return <ImprintContent locale="de" />;
}
