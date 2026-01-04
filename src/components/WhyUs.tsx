'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { CheckCircle2 } from 'lucide-react';
import contentData from '@/data/content.json';

export default function WhyUs() {
  const { language } = useLanguage();
  const content = contentData.whyUs[language];

  return (
    <section className="section-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Title & Description */}
          <div>
            <h2 className="section-title mb-6">
              <span className="gradient-text-red">{content.title}</span>
            </h2>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              {language === 'ar'
                ? 'نتميز بتقديم خدمات لوجستية استثنائية تجعلنا الخيار الأمثل لشركائنا'
                : 'We excel in providing exceptional logistics services that make us the ideal choice for our partners'}
            </p>

            {/* CTA */}
            <a href="#contact" className="btn-primary inline-flex items-center gap-3">
              <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
            </a>
          </div>

          {/* Right - Features List */}
          <div className="space-y-4">
            {content.items.map((item, index) => (
              <div
                key={index}
                className="why-item group"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 
                    size={24} 
                    className="text-primary-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" 
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/50">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

