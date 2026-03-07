import ImprintContent from '@/components/ImprintContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum - George Valandis',
  description: 'Impressumsangaben und Anbieterkennzeichnung fuer georgevalandis.com.',
};

export default function GermanImprintPage() {
  return <ImprintContent locale="de" />;
}
