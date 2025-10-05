import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../mock/mockData';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-24 bg-slate-800" id="testimonials">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client <span className="text-orange-400">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear what our clients say about their experience working with PP Freelance
          </p>
        </div>

        {/* Main testimonial display */}
        <div className="relative">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Stars rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-orange-400 fill-current" />
                ))}
              </div>

              {/* Testimonial content */}
              <div className="text-center mb-8">
                <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 max-w-4xl mx-auto">
                  "{testimonials[currentIndex].feedback}"
                </blockquote>
                
                {/* Client info */}
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div className="text-left">
                    <div className="text-xl font-semibold text-white">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-orange-400">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-orange-500/90 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-orange-500/90 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-orange-500 w-8' 
                  : 'bg-slate-600 hover:bg-orange-400'
              }`}
            />
          ))}
        </div>

        {/* All testimonials preview (hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`text-left p-6 bg-slate-700/50 rounded-xl border transition-all duration-300 hover:bg-slate-700 hover:scale-105 ${
                index === currentIndex 
                  ? 'border-orange-500 bg-slate-700' 
                  : 'border-slate-600'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-orange-400 text-xs">
                    {testimonial.role.split(',')[0]}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                {testimonial.feedback.substring(0, 120)}...
              </p>
              
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;