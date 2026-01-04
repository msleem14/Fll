'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Truck, Settings, GraduationCap, Link2, ArrowUpRight } from 'lucide-react';
import contentData from '@/data/content.json';

const iconMap: Record<string, React.ElementType> = {
  fleet: Truck,
  operations: Settings,
  training: GraduationCap,
  integration: Link2,
};

export default function Services() {
  const { language } = useLanguage();
  const content = contentData.services[language];

  return (
    <section id="services" className="section-dark">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text-red">{content.title}</span>
          </h2>
          <p className="section-subtitle">{content.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {content.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Truck;
            return (
              <div
                key={index}
                className="card-dark group relative overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="service-icon">
                      <Icon size={28} className="text-primary-500" />
                    </div>
                    <ArrowUpRight 
                      size={24} 
                      className="text-white/20 group-hover:text-primary-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-white/70">
              {language === 'ar' 
                ? 'نقدم حلول مخصصة تناسب احتياجات عملك'
                : 'We provide customized solutions that fit your business needs'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

