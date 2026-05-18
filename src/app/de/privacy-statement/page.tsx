import PrivacyStatementContent from '@/components/PrivacyStatementContent';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklaerung - George Valandis',
  description: 'Datenschutzhinweise fuer georgevalandis.com.',
  alternates: {
    canonical: '/de/privacy-statement/',
    languages: localizedAlternates('/privacy-statement/', '/de/privacy-statement/'),
  },
};

export default function GermanPrivacyStatementPage() {
  return <PrivacyStatementContent locale="de" />;
}
