'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import '../../lib/i18n';

interface GalleryPageProps {
  dataEn: any;
  dataEs: any;
}

export default function GalleryPage({ dataEn, dataEs }: GalleryPageProps) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="max-w-7xl mx-auto px-8 pb-20" />;
  }

  const content = i18n.language === 'es' ? dataEs?.data : dataEn?.data;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:1337';

  return (
    <div className="max-w-7xl mx-auto px-8 pb-20">
      <div className="text-center pt-16 pb-8 bg-gradient-to-b from-white to-cream">
        <h1 className="font-playfair text-5xl md:text-6xl text-dark mb-4 font-bold tracking-wide">
          {content?.title || t('gallery.title')}
        </h1>
        <p className="font-cormorant text-xl md:text-2xl text-gray-600 italic">
          {t('gallery.subtitle')}
        </p>
      </div>

      {content?.story && (
        <div className="bg-white p-14 rounded-3xl my-12 max-w-4xl mx-auto leading-8 font-cormorant text-xl text-dark shadow-lg border border-gold/10 relative">
          <div className="text-8xl text-gold opacity-30 leading-none mb-8 font-playfair">"</div>
          <div dangerouslySetInnerHTML={{ __html: content.story }} />
        </div>
      )}

      {content?.photos && content.photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {content.photos.map((photo: any, index: number) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl relative group"
            >
              <div className="relative w-full h-96">
                <Image
                  src={`${API_BASE}${photo.url}`}
                  alt={photo.alternativeText || `Photo ${index + 1}`}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-400"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
