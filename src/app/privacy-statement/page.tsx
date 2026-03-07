import PrivacyStatementContent from '@/components/PrivacyStatementContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Statement - George Valandis',
  description: 'Privacy information for georgevalandis.com.',
};

export default function PrivacyStatementPage() {
  return <PrivacyStatementContent locale="en" />;
}
