'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['en', 'es'].includes(savedLang)) {
      i18n.changeLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const lang = browserLang === 'es' ? 'es' : 'en';
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
    }
  }, [i18n]);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('nav.welcome') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/venue', label: t('nav.venue') },
    { href: '/rsvp', label: t('nav.rsvp') },
    { href: '/dress-code', label: t('nav.dressCode') },
    { href: '/gifts', label: t('nav.gifts') },
    { href: '/schedule', label: t('nav.schedule') },
  ];

  if (!mounted) return null;

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-forest-green/15">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Button - Mobile & Tablet */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-dark transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-dark transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-dark transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>

            <div className="flex left-1/2 -translate-x-1/2 justify-center absolute xl:translate-x-0 xl:left-4 xl:w-auto xl:absolute z-0">
              <img
                className="w-10"
                src="/assets/wedding-logo.png"
                alt="Wedding Logo"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="flex-1 flex items-center justify-center">
              <div className="hidden xl:flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:text-forest-green ${
                      pathname === link.href
                        ? 'text-forest-green font-semibold border-b-2 border-forest-green'
                        : 'text-dark'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex space-x-2">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded font-montserrat text-sm transition-all ${
                  i18n.language === 'en'
                    ? 'bg-forest-green text-white'
                    : 'bg-mist text-dark hover:bg-sage/30'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('es')}
                className={`px-3 py-1 rounded font-montserrat text-sm transition-all ${
                  i18n.language === 'es'
                    ? 'bg-forest-green text-white'
                    : 'bg-mist text-dark hover:bg-sage/30'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden z-40 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        style={{ top: '64px' }}
      />

      {/* Mobile & Tablet Sliding Menu */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out xl:hidden z-40 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`font-montserrat text-base uppercase tracking-wider py-3 px-4 rounded-lg transition-all duration-300 hover:bg-mist hover:text-forest-green ${
                pathname === link.href
                  ? 'text-forest-green font-semibold bg-mist border-l-4 border-forest-green'
                  : 'text-dark'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
