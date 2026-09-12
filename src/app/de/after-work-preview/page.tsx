import type { Metadata } from 'next';
import AfterWorkHomepagePreview from '@/components/AfterWorkHomepagePreview';

export const metadata: Metadata = {
  title: 'After Work Homepage Preview — George Valandis (DE)',
  description: 'Deutsche Preview für die neue After Work Homepage von George Valandis.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function GermanAfterWorkPreviewPage() {
  return <AfterWorkHomepagePreview locale="de" />;
}
