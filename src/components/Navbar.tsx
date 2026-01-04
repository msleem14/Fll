'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#partners', label: t('nav.partners') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'navbar-blur py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <span className="text-2xl md:text-3xl font-black text-white">
                  FLL
                </span>
                <span className="text-primary-500 text-2xl md:text-3xl font-black">Express</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                <Globe size={18} className="text-primary-500" />
                <span className="text-white font-medium text-sm">
                  {language === 'ar' ? 'EN' : 'عربي'}
                </span>
              </button>

              {/* Careers Button - Desktop */}
              <Link
                href="/careers"
                className="hidden md:flex btn-primary text-sm px-6 py-3"
              >
                {t('nav.careers')}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-white"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-open">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-white font-semibold hover:text-primary-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/careers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary mt-4"
            >
              {t('nav.careers')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

