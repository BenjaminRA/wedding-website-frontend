'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Countdown from '@/components/Countdown';
import '../lib/i18n';
import { getUploadsUrl } from '@/lib/api';

interface WelcomePageProps {
  dataEn?: any;
  dataEs?: any;
}

export default function WelcomePage({ dataEn, dataEs }: WelcomePageProps) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-mist to-white" />
    );
  }

  const content = i18n.language === 'es' ? dataEs : dataEn;

  const defaultDate = new Date(
    Date.now() + 180 * 24 * 60 * 60 * 1000
  ).toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-mist to-white">
      <div className="min-h-screen flex items-center justify-center overflow-hidden relative pb-10">
        {content?.heroImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{
                backgroundImage: `url(${getUploadsUrl(content.heroImage.url)})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-mist/75 via-cream/85 to-white/92" />
          </>
        )}

        <div className="relative z-10 text-center px-8 max-w-5xl">
          {/* <div className="text-6xl text-forest-green opacity-60 mt-10 md:mb-6">
            ❦
          </div> */}
          {/* <div className="my-6 md:mb-6 flex justify-center opacity-95">
            <img
              className="w-52"
              src="/assets/wedding-logo.png"
              alt=""
            />
          </div> */}

          <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-dark mb-6 tracking-wide leading-tight">
            {content?.title || t('welcome.title')}
          </h1>

          <p className="font-cormorant text-2xl md:text-3xl text-forest-dark mb-16 italic tracking-wide">
            {content?.subtitle || t('welcome.subtitle')}
          </p>

          {(content?.weddingDate || defaultDate) && (
            <Countdown weddingDate={content?.weddingDate || defaultDate} />
          )}
        </div>

        {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-4xl text-gold opacity-60 animate-bounce">
          ↓
        </div> */}
      </div>
    </div>
  );
}
