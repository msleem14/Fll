'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { ar: 'الرئيسية', en: 'Home' },
  'nav.about': { ar: 'من نحن', en: 'About' },
  'nav.services': { ar: 'خدماتنا', en: 'Services' },
  'nav.partners': { ar: 'شركاؤنا', en: 'Partners' },
  'nav.contact': { ar: 'تواصل معنا', en: 'Contact' },
  'nav.careers': { ar: 'التوظيف', en: 'Careers' },
  
  // Hero
  'hero.cta.service': { ar: 'طلب خدمة', en: 'Request Service' },
  'hero.cta.job': { ar: 'انضم لفريقنا', en: 'Join Our Team' },
  
  // About
  'about.vision': { ar: 'رؤيتنا', en: 'Our Vision' },
  'about.mission': { ar: 'رسالتنا', en: 'Our Mission' },
  
  // Services
  'services.title': { ar: 'خدماتنا', en: 'Our Services' },
  
  // Partners
  'partners.title': { ar: 'شركاؤنا في النجاح', en: 'Our Success Partners' },
  'partners.subtitle': { ar: 'نعمل مع أكبر منصات التوصيل في المملكة', en: 'We work with the largest delivery platforms in the Kingdom' },
  
  // Branches
  'branches.title': { ar: 'فروعنا', en: 'Our Branches' },
  
  // Contact
  'contact.title': { ar: 'تواصل معنا', en: 'Contact Us' },
  'contact.name': { ar: 'الاسم الكامل', en: 'Full Name' },
  'contact.phone': { ar: 'رقم الجوال', en: 'Phone Number' },
  'contact.email': { ar: 'البريد الإلكتروني', en: 'Email' },
  'contact.message': { ar: 'رسالتك', en: 'Your Message' },
  'contact.send': { ar: 'إرسال', en: 'Send' },
  'contact.sending': { ar: 'جاري الإرسال...', en: 'Sending...' },
  'contact.success': { ar: 'تم إرسال رسالتك بنجاح!', en: 'Your message has been sent successfully!' },
  'contact.error': { ar: 'حدث خطأ، حاول مرة أخرى', en: 'An error occurred, please try again' },
  
  // Careers
  'careers.title': { ar: 'انضم لفريقنا', en: 'Join Our Team' },
  'careers.subtitle': { ar: 'نبحث عن مواهب متميزة للانضمام إلى فريقنا', en: 'We are looking for talented individuals to join our team' },
  'careers.form.name': { ar: 'الاسم الكامل', en: 'Full Name' },
  'careers.form.phone': { ar: 'رقم الجوال', en: 'Phone Number' },
  'careers.form.city': { ar: 'المدينة', en: 'City' },
  'careers.form.position': { ar: 'الوظيفة المطلوبة', en: 'Position' },
  'careers.form.experience': { ar: 'الخبرة السابقة (اختياري)', en: 'Previous Experience (Optional)' },
  'careers.form.file': { ar: 'رفع ملف (سيرة ذاتية أو هوية)', en: 'Upload File (CV or ID)' },
  'careers.form.notes': { ar: 'ملاحظات', en: 'Notes' },
  'careers.form.submit': { ar: 'إرسال الطلب', en: 'Submit Application' },
  'careers.form.submitting': { ar: 'جاري الإرسال...', en: 'Submitting...' },
  'careers.form.success': { ar: 'تم إرسال طلبك بنجاح!', en: 'Your application has been submitted successfully!' },
  'careers.form.selectPosition': { ar: 'اختر الوظيفة', en: 'Select Position' },
  'careers.form.selectCity': { ar: 'اختر المدينة', en: 'Select City' },
  'careers.form.dragDrop': { ar: 'اسحب الملف هنا أو اضغط للاختيار', en: 'Drag file here or click to select' },
  'careers.form.fileSelected': { ar: 'تم اختيار الملف', en: 'File selected' },
  
  // Footer
  'footer.rights': { ar: 'جميع الحقوق محفوظة', en: 'All Rights Reserved' },
  'footer.quickLinks': { ar: 'روابط سريعة', en: 'Quick Links' },
  'footer.contactInfo': { ar: 'معلومات التواصل', en: 'Contact Info' },
  
  // Common
  'common.learnMore': { ar: 'اعرف المزيد', en: 'Learn More' },
  'common.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
        setLanguage(savedLang);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language, mounted]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
