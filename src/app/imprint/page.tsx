import ImprintContent from '@/components/ImprintContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imprint - George Valandis',
  description: 'Legal notice and provider information for georgevalandis.com.',
};

export default function ImprintPage() {
  return <ImprintContent locale="en" />;
}
