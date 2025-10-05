import React from 'react';
import { 
  Video, Code, FileText, Play, Palette, Share2, 
  FileCheck, Linkedin, TrendingUp, Wrench 
} from 'lucide-react';
import { services } from '../mock/mockData';

const ServicesSection = () => {
  const iconMap = {
    Video, Code, FileText, Play, Palette, Share2,
    FileCheck, Linkedin, TrendingUp, Wrench
  };

  return (
    <section className="py-24 bg-slate-900" id="services">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-orange-400">Services</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive creative and technical solutions to elevate your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div 
                key={service.id}
                className="service-card group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 hover:border-orange-500/50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">
                  {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Custom Projects highlight */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl p-8 border border-orange-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Wrench className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Something Custom?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              We specialize in flexible solutions tailored to your unique business needs. 
              No project is too complex or too simple.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-button bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Discuss Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;