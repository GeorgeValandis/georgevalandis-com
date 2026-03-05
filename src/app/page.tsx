import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Work from '@/components/Work';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
