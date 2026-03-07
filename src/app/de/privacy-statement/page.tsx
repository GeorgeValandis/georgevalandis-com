import PrivacyStatementContent from '@/components/PrivacyStatementContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklaerung - George Valandis',
  description: 'Datenschutzhinweise fuer georgevalandis.com.',
};

export default function GermanPrivacyStatementPage() {
  return <PrivacyStatementContent locale="de" />;
}
