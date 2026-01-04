'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';
import { 
  ArrowRight, ArrowLeft, Upload, Send, CheckCircle, AlertCircle, 
  Loader2, Briefcase, MapPin, Globe, X, Menu, FileText
} from 'lucide-react';
import jobsData from '@/data/jobs.json';
import branchesData from '@/data/branches.json';

function CareersContent() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;
  
  const jobs = jobsData.jobs.filter(j => j.active);
  const branches = branchesData.branches.filter(b => b.active);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    position: '',
    experience: '',
    notes: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      if (file) {
        submitData.append('file', file);
      }

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          phone: '',
          city: '',
          position: '',
          experience: '',
          notes: '',
        });
        setFile(null);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 navbar-blur py-4">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">FLL</span>
              <span className="text-2xl font-black text-primary-500">Express</span>
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <Globe size={18} className="text-primary-500" />
                <span className="text-white font-medium text-sm">
                  {language === 'ar' ? 'EN' : 'عربي'}
                </span>
              </button>

              <Link
                href="/"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white"
              >
                <Arrow size={18} className={language === 'ar' ? '' : 'rotate-180'} />
                <span>{language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}</span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-white"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white"
          >
            <X size={32} />
          </button>
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl text-white font-semibold hover:text-primary-500 transition-colors"
          >
            {language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
              <Briefcase size={18} className="text-primary-500" />
              <span className="text-primary-400 text-sm font-medium">
                {language === 'ar' ? 'فرص وظيفية' : 'Job Opportunities'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {t('careers.title')}
            </h1>
            <p className="text-xl text-white/50">
              {t('careers.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Available Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            {language === 'ar' ? 'الوظائف المتاحة' : 'Available Positions'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {jobs.map((job) => {
              const jobContent = job[language];
              return (
                <div key={job.id} className="card-dark">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="service-icon">
                      <Briefcase size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{jobContent.title}</h3>
                  </div>
                  <p className="text-white/60 mb-4">{jobContent.description}</p>
                  <div className="space-y-2">
                    {jobContent.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-primary-500" />
                        <span className="text-white/50 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Application Form */}
          <div className="max-w-2xl mx-auto">
            <div className="card-dark glow-red-sm">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                {language === 'ar' ? 'نموذج التقديم' : 'Application Form'}
              </h2>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t('careers.form.success')}
                  </h3>
                  <p className="text-white/50 mb-8">
                    {language === 'ar' 
                      ? 'سنتواصل معك في أقرب وقت ممكن'
                      : 'We will contact you as soon as possible'}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-primary"
                  >
                    {language === 'ar' ? 'تقديم طلب آخر' : 'Submit Another Application'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      {t('careers.form.name')} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder={t('careers.form.name')}
                    />
                  </div>

                  {/* Phone & City */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        {t('careers.form.phone')} *
                      </label>
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
                      <label className="block text-white/70 text-sm mb-2">
                        {t('careers.form.city')} *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">{t('careers.form.selectCity')}</option>
                        {branches.map((branch) => (
                          <option key={branch.id} value={branch[language].city}>
                            {branch[language].city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      {t('careers.form.position')} *
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">{t('careers.form.selectPosition')}</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job[language].title}>
                          {job[language].title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      {t('careers.form.experience')}
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={3}
                      className="form-input resize-none"
                      placeholder={t('careers.form.experience')}
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      {t('careers.form.file')}
                    </label>
                    <div className="file-upload">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <div className="flex flex-col items-center gap-2">
                        {file ? (
                          <>
                            <FileText size={32} className="text-primary-500" />
                            <span className="text-white font-medium">{file.name}</span>
                            <span className="text-white/50 text-sm">{t('careers.form.fileSelected')}</span>
                          </>
                        ) : (
                          <>
                            <Upload size={32} className="text-white/40" />
                            <span className="text-white/50">{t('careers.form.dragDrop')}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      {t('careers.form.notes')}
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="form-input resize-none"
                      placeholder={t('careers.form.notes')}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>{t('careers.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>{t('careers.form.submit')}</span>
                      </>
                    )}
                  </button>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                      <AlertCircle size={20} className="text-red-500" />
                      <span className="text-red-400">{t('contact.error')}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} FLL Express Logistics. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function CareersPage() {
  return (
    <LanguageProvider>
      <CareersContent />
    </LanguageProvider>
  );
}

