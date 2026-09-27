import AfterWorkSignupPage from '@/components/AfterWorkSignupPage';
import type { Metadata } from 'next';

const title = 'Afterwork Newsletter — George Valandis';
const description =
  "A short weekly note from an indie iOS developer: the apps I'm building after work, the decisions behind them, and what I learn along the way.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/after-work/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/after-work/',
    siteName: 'George Valandis',
    title,
    description,
    images: [
      {
        url: '/profile/george-valandis.webp',
        width: 1009,
        height: 1024,
        alt: 'George Valandis',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/profile/george-valandis.webp'],
  },
};

export default function AfterWorkPage() {
  return <AfterWorkSignupPage />;
}
