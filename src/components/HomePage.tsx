import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Blog from '@/components/Services';
import Apps from '@/components/Work';
import type { SiteLocale } from '@/lib/siteLocale';

type HomePageProps = {
  locale: SiteLocale;
};

export default function HomePage({ locale }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar locale={locale} />
      <Hero locale={locale} />
      <Apps locale={locale} />
      <About locale={locale} />
      <Blog locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
