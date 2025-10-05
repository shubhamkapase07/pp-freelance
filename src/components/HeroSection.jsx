import React from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { companyInfo } from '../mock/mockData';

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-orange-600/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
            <img src="/logo.png" alt="PP Freelance" className="w-48 h-48 object-contain" />
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg animate-bounce">
            🔥
          </div>
        </div>

        {/* Brand name */}
        <h1 className="font-display text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight group inline-block">
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent transition-[background-position] duration-500 bg-[length:200%_100%] bg-left hover:bg-right">
            PP FREELANCE
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-orange-400 text-xl md:text-2xl lg:text-3xl font-medium mb-12 max-w-4xl mx-auto leading-relaxed">
          {companyInfo.tagline}
        </p>

        {/* CTA Button */}
        <div className="mb-16">
          <button 
            onClick={handleWhatsAppClick}
            className="cta-button inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <MessageCircle className="w-6 h-6" />
            Let's Talk
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToServices}
            className="animate-bounce text-orange-400 hover:text-orange-300 transition-colors duration-300"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;