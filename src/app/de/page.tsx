import HomePage from '@/components/HomePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'George Valandis — iOS-Entwicklung',
  description:
    'iOS-Entwickler und Solopreneur. Ich baue Apps wie Flowa, MoodFlora, GlanceAway und mehr und teile meine Reise von 17 bis 21 Uhr.',
};

export default function GermanHomePage() {
  return <HomePage locale="de" />;
}
