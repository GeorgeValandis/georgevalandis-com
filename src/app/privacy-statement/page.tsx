import PrivacyStatementContent from '@/components/PrivacyStatementContent';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Statement - George Valandis',
  description: 'Privacy information for georgevalandis.com.',
  alternates: {
    canonical: '/privacy-statement/',
    languages: localizedAlternates('/privacy-statement/', '/de/privacy-statement/'),
  },
};

export default function PrivacyStatementPage() {
  return <PrivacyStatementContent locale="en" />;
}
