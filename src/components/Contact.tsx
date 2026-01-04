'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Send, Phone, Mail, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import contentData from '@/data/content.json';

export default function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-dark relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text-red">{t('contact.title')}</span>
          </h2>
          <p className="section-subtitle">
            {contentData.contact[language].subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
              </h3>
              <p className="text-white/60 mb-8">
                {language === 'ar'
                  ? 'يسعدنا تواصلك معنا في أي وقت'
                  : 'We are happy to hear from you anytime'}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href={`tel:${contentData.settings.phone}`}
                className="card-dark flex items-center gap-4 group"
              >
                <div className="service-icon">
                  <Phone size={24} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">
                    {language === 'ar' ? 'الهاتف' : 'Phone'}
                  </p>
                  <p className="text-white font-semibold group-hover:text-primary-400 transition-colors" dir="ltr">
                    {contentData.settings.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${contentData.settings.email}`}
                className="card-dark flex items-center gap-4 group"
              >
                <div className="service-icon">
                  <Mail size={24} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </p>
                  <p className="text-white font-semibold group-hover:text-primary-400 transition-colors">
                    {contentData.settings.email}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${contentData.settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-dark flex items-center gap-4 group"
              >
                <div className="service-icon">
                  <MessageCircle size={24} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">
                    {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </p>
                  <p className="text-white font-semibold group-hover:text-primary-400 transition-colors">
                    {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-dark">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">{t('contact.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder={t('contact.name')}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">{t('contact.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="form-input resize-none"
                  placeholder={t('contact.message')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/30">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-green-400">{t('contact.success')}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                  <AlertCircle size={20} className="text-red-500" />
                  <span className="text-red-400">{t('contact.error')}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

