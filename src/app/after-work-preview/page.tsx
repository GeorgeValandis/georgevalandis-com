import type { Metadata } from 'next';
import AfterWorkHomepagePreview from '@/components/AfterWorkHomepagePreview';

export const metadata: Metadata = {
  title: 'After Work Homepage Preview — George Valandis',
  description: 'Private visual preview for the George Valandis After Work homepage concept.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AfterWorkPreviewPage() {
  return <AfterWorkHomepagePreview />;
}
