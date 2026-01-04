'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import partnersData from '@/data/partners.json';

export default function Partners() {
  const { language, t } = useLanguage();
  const partners = partnersData.partners.filter(p => p.active);

  return (
    <section id="partners" className="section-dark">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text-red">{t('partners.title')}</span>
          </h2>
          <p className="section-subtitle">{t('partners.subtitle')}</p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="card-dark flex flex-col items-center justify-center py-8 px-6 group"
            >
              {/* Partner Logo Placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-all duration-300">
                <span className="text-2xl font-bold text-white/60 group-hover:text-primary-400 transition-colors">
                  {partner.name.charAt(0)}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white text-center group-hover:text-primary-400 transition-colors">
                {language === 'ar' ? partner.nameAr : partner.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-lg">
            {language === 'ar'
              ? 'نفتخر بثقة شركائنا ونعمل دائماً على تقديم الأفضل'
              : 'We are proud of our partners trust and always strive to deliver the best'}
          </p>
        </div>
      </div>
    </section>
  );
}

