import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WorkSection from '../components/WorkSection';
import AboutSection from '../components/AboutSection';
import InterestsSection from '../components/InterestsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';
import ScrollGuideBird from '../components/decorative/ScrollGuideBird';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header onMenuClick={() => setMenuOpen(true)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <ScrollGuideBird />
      <main>
        <Hero />
        <WorkSection />
        <AboutSection />
        <InterestsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;