'use client';

import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Partners from '@/components/Partners';
import Branches from '@/components/Branches';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Partners />
        <Branches />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}

