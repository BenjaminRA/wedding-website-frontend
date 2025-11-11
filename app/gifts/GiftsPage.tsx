'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

interface GiftsPageProps {
  dataEn?: any;
  dataEs?: any;
}

export default function GiftsPage({ dataEn, dataEs }: GiftsPageProps) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="max-w-4xl mx-auto px-8 pb-20" />;
  }

  const content = i18n.language === 'es' ? dataEs : dataEn;

  return (
    <div className="max-w-4xl mx-auto px-8 pb-20">
      <div className="text-center pt-16 pb-12">
        <h1 className="font-playfair text-5xl md:text-6xl text-dark mb-4 font-bold tracking-wide">
          {content?.title || t('gifts.title')}
        </h1>
        <p className="font-cormorant text-xl md:text-2xl text-gray-600 italic">
          {t('gifts.subtitle')}
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-lg border border-gold/10">
        {content?.message && (
          <div
            className="font-cormorant text-xl text-dark leading-relaxed text-center"
            dangerouslySetInnerHTML={{ __html: content.message }}
          />
        )}
      </div>
    </div>
  );
}
