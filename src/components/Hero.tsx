'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { ArrowLeft, ArrowRight, Truck, Users, Clock, Shield } from 'lucide-react';
import contentData from '@/data/content.json';

export default function Hero() {
  const { language, t } = useLanguage();
  const content = contentData.hero[language];
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const stats = [
    { icon: Truck, value: '500+', label: language === 'ar' ? 'مندوب توصيل' : 'Delivery Agents' },
    { icon: Users, value: '50+', label: language === 'ar' ? 'شريك تجاري' : 'Business Partners' },
    { icon: Clock, value: '24/7', label: language === 'ar' ? 'دعم متواصل' : 'Continuous Support' },
    { icon: Shield, value: '99%', label: language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate' },
  ];

  return (
    <section id="home" className="hero-bg min-h-screen flex items-center pt-24 pb-16 relative">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-primary-400 text-sm font-medium">
              {language === 'ar' ? 'حلول لوجستية متكاملة للمطاعم' : 'Integrated Logistics for Restaurants'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="text-white">{language === 'ar' ? 'إف إل إل' : 'FLL'}</span>
            <br />
            <span className="gradient-text-red">
              {language === 'ar' ? 'إكسبريس' : 'Express'}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-white/80 font-medium mb-6">
            {content.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a
              href="#contact"
              className="btn-primary flex items-center gap-3 group w-full sm:w-auto justify-center"
            >
              <span>{t('hero.cta.service')}</span>
              <Arrow size={20} className="arrow-animate" />
            </a>
            <Link
              href="/careers"
              className="btn-secondary flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <span>{t('hero.cta.job')}</span>
              <Users size={20} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card-dark text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="service-icon mx-auto mb-4">
                  <stat.icon size={28} className="text-primary-500" />
                </div>
                <div className="stat-number mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-white/30 text-xs">
          {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

