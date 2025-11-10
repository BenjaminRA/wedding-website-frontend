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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
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
    <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center">
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:text-gold ${
                    pathname === link.href
                      ? 'text-gold font-semibold border-b-2 border-gold'
                      : 'text-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded font-montserrat text-sm transition-all ${
                i18n.language === 'en'
                  ? 'bg-gold text-white'
                  : 'bg-gray-200 text-dark hover:bg-gray-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('es')}
              className={`px-3 py-1 rounded font-montserrat text-sm transition-all ${
                i18n.language === 'es'
                  ? 'bg-gold text-white'
                  : 'bg-gray-200 text-dark hover:bg-gray-300'
              }`}
            >
              ES
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="grid grid-cols-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-montserrat text-xs uppercase tracking-wider text-center py-2 transition-all duration-300 hover:text-gold ${
                  pathname === link.href
                    ? 'text-gold font-semibold border-b-2 border-gold'
                    : 'text-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
