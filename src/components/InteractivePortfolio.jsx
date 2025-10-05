import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { portfolioProjects } from '../mock/mockData';

const InteractivePortfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-rotate portfolio items
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % portfolioProjects.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % portfolioProjects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  const activeProject = portfolioProjects[activeIndex];

  return (
    <section className="py-24 bg-slate-900 overflow-hidden" id="portfolio">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-orange-400">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our innovative projects that showcase creativity and technical excellence
          </p>
        </div>

        {/* Main Interactive Display */}
        <div className="relative mb-16" ref={containerRef}>
          {/* Background gradient based on active project */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${activeProject.bgColor} opacity-5 rounded-3xl transition-all duration-1000 blur-3xl`}
          ></div>

          <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-700 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Project Image */}
              <div className="relative overflow-hidden group">
                <img 
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Project type badge */}
                <div className="absolute top-6 left-6">
                  <span className="service-button bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {activeProject.type}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {activeProject.title}
                </h3>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-orange-400 font-semibold mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                    <ExternalLink className="w-5 h-5" />
                    View Project
                  </button>
                  <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                    <Github className="w-5 h-5" />
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevProject}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-orange-500/90 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextProject}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-orange-500/90 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Project Thumbnails - Floating Carousel */}
        <div className="relative">
          <div className="flex justify-center gap-4 overflow-x-auto pb-4">
            {portfolioProjects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => handleItemClick(index)}
                className={`flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                  index === activeIndex 
                    ? 'border-orange-500 shadow-lg shadow-orange-500/30 scale-105' 
                    : 'border-slate-600 hover:border-orange-400'
                }`}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </button>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {portfolioProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-slate-600 hover:bg-orange-400'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};

export default InteractivePortfolio;