import AfterWorkConfirmationPage from '@/components/AfterWorkConfirmationPage';
import { localizedAlternates } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "You're in — After Work | George Valandis",
  description: 'Confirmation page for the George Valandis After Work newsletter.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/after-work-confirmed/',
    languages: localizedAlternates('/after-work-confirmed/', '/de/after-work-confirmed/'),
  },
};

export default function AfterWorkConfirmedPage() {
  return <AfterWorkConfirmationPage locale="en" />;
}
