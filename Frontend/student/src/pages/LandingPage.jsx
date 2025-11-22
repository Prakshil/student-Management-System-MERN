import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/hero/Hero';
import Features from '@/components/features/Features';
import Testimonials from '@/components/testimonials/Testimonials';
import FAQ from '@/components/faq/FAQ';
import Footer from '@/components/footer/Footer';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-950 relative overflow-hidden">
      {/* Dark Nebula Mesh Background */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          background: `
            radial-gradient(at 20% 80%, hsla(270, 100%, 50%, 0.1) 0px, transparent 50%), 
            radial-gradient(at 80% 20%, hsla(200, 100%, 50%, 0.1) 0px, transparent 50%), 
            radial-gradient(at 50% 50%, hsla(300, 100%, 50%, 0.1) 0px, transparent 50%)
          `
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>

      {/* Floating CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link to="/signup">
          <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-semibold px-8 py-6 rounded-full shadow-2xl">
            Get Started Free
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingPage;
