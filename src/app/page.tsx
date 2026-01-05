'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, X, Globe, ArrowLeft, ArrowRight, Truck, Users, Clock, Shield,
  Eye, Target, Settings, GraduationCap, Link2, ArrowUpRight, CheckCircle2,
  MapPin, Phone, Mail, MessageCircle, Send, Loader2, CheckCircle, AlertCircle, ArrowUp
} from 'lucide-react';

type Language = 'ar' | 'en';

const content = {
  ar: {
    nav: { home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا', partners: 'شركاؤنا', contact: 'تواصل معنا', careers: 'التوظيف' },
    hero: {
      badge: 'حلول لوجستية متكاملة للمطاعم',
      title1: 'إف إل إل',
      title2: 'إكسبريس',
      subtitle: 'شريكك الأمثل في إدارة أساطيل التوصيل',
      description: 'نقدم حلول لوجستية متكاملة للمطاعم والمتاجر، مع إدارة احترافية لأساطيل التوصيل وشراكات استراتيجية مع أكبر منصات التوصيل في المملكة',
      cta1: 'طلب خدمة',
      cta2: 'انضم لفريقنا',
      stats: [
        { value: '500+', label: 'مندوب توصيل' },
        { value: '50+', label: 'شريك تجاري' },
        { value: '24/7', label: 'دعم متواصل' },
        { value: '99%', label: 'معدل الرضا' }
      ]
    },
    about: {
      title: 'من نحن',
      description: 'إف إل إل إكسبريس شركة سعودية رائدة في مجال الخدمات اللوجستية، متخصصة في إدارة وتشغيل أساطيل التوصيل للمطاعم والمتاجر.',
      vision: 'أن نكون الخيار الأول لإدارة أساطيل التوصيل في المملكة العربية السعودية',
      mission: 'تقديم خدمات لوجستية احترافية تضمن رضا عملائنا وشركائنا',
      visionLabel: 'رؤيتنا',
      missionLabel: 'رسالتنا'
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'حلول لوجستية شاملة لقطاع المطاعم',
      items: [
        { title: 'إدارة الأساطيل', description: 'إدارة كاملة لأسطول التوصيل الخاص بك مع متابعة مستمرة', icon: 'fleet' },
        { title: 'تشغيل يومي متكامل', description: 'نضمن تشغيل سلس ومستمر لعمليات التوصيل', icon: 'operations' },
        { title: 'تدريب المندوبين', description: 'برامج تدريبية احترافية لضمان جودة الخدمة', icon: 'training' },
        { title: 'تكامل مع المنصات', description: 'ربط مباشر مع جميع منصات التوصيل الرئيسية', icon: 'integration' }
      ]
    },
    whyUs: {
      title: 'لماذا إف إل إل؟',
      subtitle: 'نتميز بتقديم خدمات لوجستية استثنائية',
      items: [
        { title: 'خبرة واسعة', description: 'سنوات من الخبرة في قطاع اللوجستيات' },
        { title: 'شراكات قوية', description: 'شراكات استراتيجية مع أكبر منصات التوصيل' },
        { title: 'تقنية متقدمة', description: 'أنظمة تتبع وإدارة حديثة' },
        { title: 'دعم متواصل', description: 'فريق دعم على مدار الساعة' }
      ],
      cta: 'تواصل معنا'
    },
    partners: {
      title: 'شركاؤنا في النجاح',
      subtitle: 'نعمل مع أكبر منصات التوصيل في المملكة'
    },
    branches: {
      title: 'فروعنا',
      riyadh: 'فرع الرياض',
      address: 'حي العليا، الرياض'
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا لمساعدتك',
      name: 'الاسم الكامل',
      phone: 'رقم الجوال',
      email: 'البريد الإلكتروني',
      message: 'رسالتك',
      send: 'إرسال',
      sending: 'جاري الإرسال...',
      success: 'تم إرسال رسالتك بنجاح!',
      error: 'حدث خطأ، حاول مرة أخرى',
      whatsapp: 'تواصل عبر واتساب',
      phoneLabel: 'الهاتف',
      emailLabel: 'البريد الإلكتروني'
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      quickLinks: 'روابط سريعة',
      contactInfo: 'معلومات التواصل',
      backToTop: 'العودة للأعلى'
    }
  },
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', partners: 'Partners', contact: 'Contact', careers: 'Careers' },
    hero: {
      badge: 'Integrated Logistics for Restaurants',
      title1: 'FLL',
      title2: 'Express',
      subtitle: 'Your Optimal Partner in Delivery Fleet Management',
      description: 'We provide integrated logistics solutions for restaurants and stores, with professional fleet management and strategic partnerships with the largest delivery platforms',
      cta1: 'Request Service',
      cta2: 'Join Our Team',
      stats: [
        { value: '500+', label: 'Delivery Agents' },
        { value: '50+', label: 'Business Partners' },
        { value: '24/7', label: 'Continuous Support' },
        { value: '99%', label: 'Satisfaction Rate' }
      ]
    },
    about: {
      title: 'About Us',
      description: 'FLL Express is a leading Saudi company in logistics services, specializing in managing and operating delivery fleets for restaurants and stores.',
      vision: 'To be the first choice for delivery fleet management in Saudi Arabia',
      mission: 'Providing professional logistics services that ensure satisfaction',
      visionLabel: 'Our Vision',
      missionLabel: 'Our Mission'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive Logistics Solutions',
      items: [
        { title: 'Fleet Management', description: 'Complete management of your delivery fleet with continuous monitoring', icon: 'fleet' },
        { title: 'Daily Operations', description: 'We ensure smooth delivery operations around the clock', icon: 'operations' },
        { title: 'Agent Training', description: 'Professional training programs for service quality', icon: 'training' },
        { title: 'Platform Integration', description: 'Direct connection with all major delivery platforms', icon: 'integration' }
      ]
    },
    whyUs: {
      title: 'Why FLL?',
      subtitle: 'We excel in providing exceptional logistics services',
      items: [
        { title: 'Extensive Experience', description: 'Years of experience in logistics sector' },
        { title: 'Strong Partnerships', description: 'Strategic partnerships with largest platforms' },
        { title: 'Advanced Technology', description: 'Modern tracking and management systems' },
        { title: 'Continuous Support', description: 'Support team available 24/7' }
      ],
      cta: 'Contact Us'
    },
    partners: {
      title: 'Our Success Partners',
      subtitle: 'We work with the largest delivery platforms'
    },
    branches: {
      title: 'Our Branches',
      riyadh: 'Riyadh Branch',
      address: 'Al Olaya District, Riyadh'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to help you',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email',
      message: 'Your Message',
      send: 'Send',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'An error occurred, please try again',
      whatsapp: 'Chat on WhatsApp',
      phoneLabel: 'Phone',
      emailLabel: 'Email'
    },
    footer: {
      rights: 'All Rights Reserved',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Info',
      backToTop: 'Back to Top'
    }
  }
};

const partners = ['Keeta', 'HungerStation', 'Jahez', 'The Chefs', 'Mrsool', 'iMile', 'Ninja'];
const partnersAr = ['كيتا', 'هنقرستيشن', 'جاهز', 'ذا شيفز', 'مرسول', 'إيميل', 'نينجا'];

const settings = {
  email: 'info@fll-express.com',
  phone: '+966 50 000 0000',
  whatsapp: '+966500000000'
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('ar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const t = content[language];
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    setTimeout(() => {
      setContactStatus('success');
      setContactForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setContactStatus('idle'), 5000);
    }, 1500);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const iconMap: Record<string, React.ElementType> = {
    fleet: Truck, operations: Settings, training: GraduationCap, integration: Link2
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3' : 'py-5 bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo-simple.svg" 
                alt="FLL Express Logistics" 
                width={120} 
                height={50}
                className="invert"
                priority
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {[
                { href: '#home', label: t.nav.home },
                { href: '#about', label: t.nav.about },
                { href: '#services', label: t.nav.services },
                { href: '#partners', label: t.nav.partners },
                { href: '#contact', label: t.nav.contact },
              ].map((link) => (
                <a key={link.href} href={link.href} className="text-white/70 hover:text-white transition-colors font-medium">{link.label}</a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <Globe size={18} className="text-red-500" />
                <span className="text-white font-medium text-sm">{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
              <Link href="/careers" className="hidden md:flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30">
                {t.nav.careers}
              </Link>
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-white">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 text-white"><X size={32} /></button>
          {[t.nav.home, t.nav.about, t.nav.services, t.nav.partners, t.nav.contact].map((label, i) => (
            <a key={i} href={`#${['home', 'about', 'services', 'partners', 'contact'][i]}`} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-white font-semibold hover:text-red-500 transition-colors">{label}</a>
          ))}
          <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 rounded-xl font-bold mt-4">{t.nav.careers}</Link>
        </div>
      )}

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="text-white">{t.hero.title1}</span><br />
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t.hero.title2}</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white/80 font-medium mb-6">{t.hero.subtitle}</h2>
            <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">{t.hero.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <a href="#contact" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 w-full sm:w-auto justify-center">
                <span>{t.hero.cta1}</span><Arrow size={20} />
              </a>
              <Link href="/careers" className="border-2 border-white/20 hover:border-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all w-full sm:w-auto justify-center">
                <span>{t.hero.cta2}</span><Users size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {t.hero.stats.map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-6 text-center hover:border-red-500/30 transition-all hover:-translate-y-2">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t.about.title}</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-xl text-white/70 leading-relaxed">{t.about.description}</p>
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-6 flex gap-5 hover:border-red-500/30 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0"><Eye size={28} className="text-red-500" /></div>
                  <div><h3 className="text-xl font-bold text-white mb-2">{t.about.visionLabel}</h3><p className="text-white/60">{t.about.vision}</p></div>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-6 flex gap-5 hover:border-red-500/30 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0"><Target size={28} className="text-red-500" /></div>
                  <div><h3 className="text-xl font-bold text-white mb-2">{t.about.missionLabel}</h3><p className="text-white/60">{t.about.mission}</p></div>
                </div>
              </div>
            </div>
            <div className="relative p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl" />
              <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-8 shadow-2xl shadow-red-500/10">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/20 mb-4"><Truck size={40} className="text-red-500" /></div>
                  <h3 className="text-2xl font-bold text-white mb-2">{language === 'ar' ? 'نمو مستمر' : 'Continuous Growth'}</h3>
                  <p className="text-white/50">{language === 'ar' ? 'نسعى دائماً لتطوير خدماتنا' : 'We always strive to develop our services'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4"><span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t.services.title}</span></h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {t.services.items.map((service, i) => {
              const Icon = iconMap[service.icon] || Truck;
              return (
                <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-all hover:-translate-y-2 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center"><Icon size={28} className="text-red-500" /></div>
                      <ArrowUpRight size={24} className="text-white/20 group-hover:text-red-500 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">{service.title}</h3>
                    <p className="text-white/60">{service.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6"><span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t.whyUs.title}</span></h2>
              <p className="text-xl text-white/60 leading-relaxed mb-8">{t.whyUs.subtitle}</p>
              <a href="#contact" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-xl font-bold inline-flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30">{t.whyUs.cta}</a>
            </div>
            <div className="space-y-4">
              {t.whyUs.items.map((item, i) => (
                <div key={i} className={`relative py-4 border-white/10 transition-all hover:border-red-500 group ${language === 'ar' ? 'pr-8 border-r-2' : 'pl-8 border-l-2'}`}>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 size={24} className="text-red-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{item.title}</h3>
                      <p className="text-white/50">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4"><span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t.partners.title}</span></h2>
            <p className="text-white/50 text-lg">{t.partners.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-red-500/30 transition-all hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-all">
                  <span className="text-2xl font-bold text-white/60 group-hover:text-red-400 transition-colors">{partner.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-bold text-white text-center group-hover:text-red-400 transition-colors">{language === 'ar' ? partnersAr[i] : partner}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black"><span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t.branches.title}</span></h2>
          </div>
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center"><MapPin size={24} className="text-red-500" /></div>
                <div><h3 className="text-xl font-bold text-white">{t.branches.riyadh}</h3><p className="text-white/50 text-sm">{language === 'ar' ? 'الرياض' : 'Riyadh'}</p></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><MapPin size={18} className="text-red-500 shrink-0 mt-1" /><p className="text-white/60 text-sm">{t.branches.address}</p></div>
                <div className="flex items-center gap-3"><Phone size={18} className="text-red-500 shrink-0" /><a href={`tel:${settings.phone}`} className="text-white/60 text-sm hover:text-red-400 transition-colors" dir="ltr">{settings.phone}</a></div>
                <div className="flex items-center gap-3"><Mail size={18} className="text-red-500 shrink-0" /><a href={`mailto:${settings.email}`} className="text-white/60 text-sm hover:text-red-400 transition-colors">{settings.email}</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4"><span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t.contact.title}</span></h2>
            <p className="text-white/50 text-lg">{t.contact.subtitle}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <a href={`tel:${settings.phone}`} className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-red-500/30 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center"><Phone size={24} className="text-red-500" /></div>
                <div><p className="text-white/50 text-sm mb-1">{t.contact.phoneLabel}</p><p className="text-white font-semibold group-hover:text-red-400 transition-colors" dir="ltr">{settings.phone}</p></div>
              </a>
              <a href={`mailto:${settings.email}`} className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-red-500/30 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center"><Mail size={24} className="text-red-500" /></div>
                <div><p className="text-white/50 text-sm mb-1">{t.contact.emailLabel}</p><p className="text-white font-semibold group-hover:text-red-400 transition-colors">{settings.email}</p></div>
              </a>
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-red-500/30 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center"><MessageCircle size={24} className="text-red-500" /></div>
                <div><p className="text-white/50 text-sm mb-1">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</p><p className="text-white font-semibold group-hover:text-red-400 transition-colors">{t.contact.whatsapp}</p></div>
              </a>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div><label className="block text-white/70 text-sm mb-2">{t.contact.name}</label><input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all" placeholder={t.contact.name} /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-white/70 text-sm mb-2">{t.contact.phone}</label><input type="tel" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} required className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all" placeholder="05xxxxxxxx" dir="ltr" /></div>
                  <div><label className="block text-white/70 text-sm mb-2">{t.contact.email}</label><input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all" placeholder="example@email.com" dir="ltr" /></div>
                </div>
                <div><label className="block text-white/70 text-sm mb-2">{t.contact.message}</label><textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required rows={4} className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none" placeholder={t.contact.message} /></div>
                <button type="submit" disabled={contactStatus === 'loading'} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50">
                  {contactStatus === 'loading' ? <><Loader2 size={20} className="animate-spin" /><span>{t.contact.sending}</span></> : <><Send size={20} /><span>{t.contact.send}</span></>}
                </button>
                {contactStatus === 'success' && <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/30"><CheckCircle size={20} className="text-green-500" /><span className="text-green-400">{t.contact.success}</span></div>}
                {contactStatus === 'error' && <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30"><AlertCircle size={20} className="text-red-500" /><span className="text-red-400">{t.contact.error}</span></div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/5 py-16">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Image 
                  src="/logo-simple.svg" 
                  alt="FLL Express Logistics" 
                  width={150} 
                  height={65}
                  className="invert"
                />
              </div>
              <p className="text-white/50 mb-6 max-w-md leading-relaxed">{t.about.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {[t.nav.home, t.nav.about, t.nav.services, t.nav.partners, t.nav.contact, t.nav.careers].map((label, i) => (
                  <li key={i}><a href={i < 5 ? `#${['home', 'about', 'services', 'partners', 'contact'][i]}` : '/careers'} className="text-white/50 hover:text-red-400 transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">{t.footer.contactInfo}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><Phone size={18} className="text-red-500 shrink-0 mt-1" /><a href={`tel:${settings.phone}`} className="text-white/50 hover:text-red-400 transition-colors" dir="ltr">{settings.phone}</a></li>
                <li className="flex items-start gap-3"><Mail size={18} className="text-red-500 shrink-0 mt-1" /><a href={`mailto:${settings.email}`} className="text-white/50 hover:text-red-400 transition-colors">{settings.email}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} FLL Express Logistics. {t.footer.rights}</p>
            <button onClick={scrollToTop} className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors group">
              <span className="text-sm">{t.footer.backToTop}</span><ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
