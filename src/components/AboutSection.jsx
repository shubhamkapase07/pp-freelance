import React, { useEffect, useRef, useState } from 'react';
import { Users, Target, Award, Handshake } from 'lucide-react';
import { companyInfo } from '../mock/mockData';

// Light-weight counter that animates when scrolled into view
const CountUp = ({ target, duration = 1500, suffix = '' }) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return (
    <span ref={ref}>{value.toLocaleString()}{suffix}</span>
  );
};

const AboutSection = () => {
  const features = [
    {
      icon: Users,
      title: "Real-World Exposure",
      description: "Giving students and job seekers hands-on experience with live projects"
    },
    {
      icon: Target,
      title: "Affordable Solutions",
      description: "High-quality creative and tech services at budget-friendly prices"
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "Delivering exceptional results that exceed client expectations"
    },
    {
      icon: Handshake,
      title: "Collaborative Growth",
      description: "Building strong partnerships that foster learning, innovation, and mutual success"
    }
  ];

  return (
    <section className="py-24 bg-slate-800" id="about">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-orange-400">PP Freelance</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              {companyInfo.about}
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-300">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual element: Impact stats */}
          <div className="relative">
            <div className="rounded-2xl p-8 lg:p-10 border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Impact in Numbers</h3>
              <p className="text-gray-300 mb-8">Empowering talent and delivering real results through our growing community.</p>
              <div className="grid sm:grid-cols-2 gap-6 items-stretch">
                <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 h-full flex flex-col">
                  <div className="text-3xl mb-2">🧩</div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    <CountUp target={100} />+
                  </div>
                  <div className="text-orange-400 font-semibold">Projects Completed</div>
                  <p className="text-gray-400 text-sm mt-2">Successfully delivered high-quality creative and tech solutions for diverse clients.</p>
                </div>
                <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 h-full flex flex-col">
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    <CountUp target={37} />+
                  </div>
                  <div className="text-orange-400 font-semibold">Active Clients</div>
                  <p className="text-gray-400 text-sm mt-2">Partnering with businesses and organizations across multiple industries.</p>
                </div>
                <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 h-full flex flex-col sm:col-span-1">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    <CountUp target={4000} />+
                  </div>
                  <div className="text-orange-400 font-semibold">Community on YouTube & Telegram</div>
                  <p className="text-gray-400 text-sm mt-2">Growing learners and professionals across both channels every day.</p>
                </div>
                <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 h-full flex flex-col">
                  <div className="text-3xl mb-2">🔗</div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    <CountUp target={100} />+
                  </div>
                  <div className="text-orange-400 font-semibold">Monthly LinkedIn Visits</div>
                  <p className="text-gray-400 text-sm mt-2">Connecting students, freelancers, and clients every single day.</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;