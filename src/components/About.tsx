'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Eye, Target, Award, TrendingUp } from 'lucide-react';
import contentData from '@/data/content.json';

export default function About() {
  const { language, t } = useLanguage();
  const content = contentData.about[language];

  return (
    <section id="about" className="section-dark">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-white">{content.title.split(' ')[0]}</span>{' '}
            <span className="gradient-text-red">{content.title.split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Description */}
          <div className="space-y-8">
            <p className="text-xl text-white/70 leading-relaxed">
              {content.description}
            </p>

            {/* Vision & Mission */}
            <div className="grid gap-6">
              <div className="card-dark flex gap-5">
                <div className="service-icon shrink-0">
                  <Eye size={28} className="text-primary-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('about.vision')}</h3>
                  <p className="text-white/60">{content.vision}</p>
                </div>
              </div>

              <div className="card-dark flex gap-5">
                <div className="service-icon shrink-0">
                  <Target size={28} className="text-primary-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('about.mission')}</h3>
                  <p className="text-white/60">{content.mission}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-3xl" />
            
            <div className="relative p-8 md:p-12">
              {/* Main Card */}
              <div className="card-dark glow-red-sm">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-500/20 mb-4">
                    <TrendingUp size={40} className="text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'ar' ? 'نمو مستمر' : 'Continuous Growth'}
                  </h3>
                  <p className="text-white/50">
                    {language === 'ar' 
                      ? 'نسعى دائماً لتطوير خدماتنا وتوسيع نطاق عملنا'
                      : 'We always strive to develop our services and expand our scope'}
                  </p>
                </div>

                <div className="divider-gradient my-6" />

                {/* Values */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Award, label: language === 'ar' ? 'الجودة' : 'Quality' },
                    { icon: TrendingUp, label: language === 'ar' ? 'التطور' : 'Growth' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                      <item.icon size={20} className="text-primary-500" />
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

