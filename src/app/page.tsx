import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Blog from '@/components/Services';
import Apps from '@/components/Work';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Hero />
      <Apps />
      <About />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
