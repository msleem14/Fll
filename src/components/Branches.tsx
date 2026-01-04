'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';
import branchesData from '@/data/branches.json';

export default function Branches() {
  const { language, t } = useLanguage();
  const branches = branchesData.branches.filter(b => b.active);

  if (branches.length === 0) return null;

  return (
    <section className="section-dark">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text-red">{t('branches.title')}</span>
          </h2>
        </div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {branches.map((branch) => {
            const branchContent = branch[language];
            return (
              <div key={branch.id} className="card-dark group">
                {/* Branch Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="service-icon">
                    <MapPin size={24} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {branchContent.name}
                    </h3>
                    <p className="text-white/50 text-sm">{branchContent.city}</p>
                  </div>
                </div>

                {/* Branch Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary-500 shrink-0 mt-1" />
                    <p className="text-white/60 text-sm">{branchContent.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-primary-500 shrink-0" />
                    <a 
                      href={`tel:${branch.phone}`} 
                      className="text-white/60 text-sm hover:text-primary-400 transition-colors"
                      dir="ltr"
                    >
                      {branch.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary-500 shrink-0" />
                    <a 
                      href={`mailto:${branch.email}`} 
                      className="text-white/60 text-sm hover:text-primary-400 transition-colors"
                    >
                      {branch.email}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

