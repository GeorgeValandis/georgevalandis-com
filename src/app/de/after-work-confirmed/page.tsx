import AfterWorkConfirmationPage from '@/components/AfterWorkConfirmationPage';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Du bist dabei — After Work | George Valandis',
  description: 'Bestätigungsseite für den After-Work-Newsletter von George Valandis.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/de/after-work-confirmed/',
    languages: localizedAlternates('/after-work-confirmed/', '/de/after-work-confirmed/'),
  },
};

export default function GermanAfterWorkConfirmedPage() {
  return <AfterWorkConfirmationPage locale="de" />;
}
