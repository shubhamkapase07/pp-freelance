import React from 'react';
import { companyInfo } from '../mock/mockData';
import { ArrowUp, Youtube, Instagram, Linkedin, Send, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@Placement_Prodigy', label: 'YouTube' },
    { icon: Instagram, href: 'https://www.instagram.com/placementprodigy/', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://t.me/placementprodigy', label: 'Telegram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/placement-prodigy/', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main footer content */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.png" alt="PP Freelance" className="w-12 h-12 rounded-lg object-contain bg-gradient-to-r from-white-400 to-white-600 p-0.5" />
              <div className="text-2xl font-bold text-white">
                PP Freelance
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Empowering businesses with affordable creative and technical solutions while providing real-world experience to aspiring professionals.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-slate-800 hover:bg-orange-500 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Contact Info
            </h3>
            <div className="space-y-3 text-gray-400">
              <div>
                <div className="font-medium text-white mb-1">WhatsApp</div>
                <a href="https://wa.me/919834190623" className="hover:text-orange-400 transition-colors duration-300">
                  +91 9834190623
                </a>
              </div>
              <div>
                <div className="font-medium text-white mb-1">Email</div>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-orange-400 transition-colors duration-300">
                  {companyInfo.email}
                </a>
              </div>
              <div>
                <div className="font-medium text-white mb-1">Location</div>
                <div>{companyInfo.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {currentYear} PP Freelance. All rights reserved.</p>
            <p className="text-sm mt-1">
              Powered by <span className="text-orange-400">Placement Prodigy</span> | PP Freelance
            </p>
          </div>
          
          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
};

export default Footer;