'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

interface VenuePageProps {
  dataEn: any;
  dataEs: any;
}

export default function VenuePage({ dataEn, dataEs }: VenuePageProps) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="max-w-4xl mx-auto px-8 pb-20" />;
  }

  const content = i18n.language === 'es' ? dataEs?.data : dataEn?.data;

  return (
    <div className="max-w-4xl mx-auto px-8 pb-20">
      <div className="text-center pt-16 pb-12">
        <h1 className="font-playfair text-5xl md:text-6xl text-dark mb-4 font-bold tracking-wide">
          {content?.title || t('venue.title')}
        </h1>
        <p className="font-cormorant text-xl md:text-2xl text-gray-600 italic">
          {t('venue.subtitle')}
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-lg border border-gold/10">
        {content?.venueName && (
          <h2 className="font-playfair text-3xl md:text-4xl text-gold mb-6 text-center font-bold">
            {content.venueName}
          </h2>
        )}

        {content?.address && (
          <p className="font-cormorant text-xl text-dark mb-8 text-center leading-relaxed">
            {content.address}
          </p>
        )}

        {content?.directions && (
          <div
            className="font-cormorant text-lg text-dark leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.directions }}
          />
        )}

        {content?.mapLink && (
          <div className="mt-8 text-center">
            <a
              href={content.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white font-montserrat px-8 py-3 rounded-lg hover:bg-gold/90 transition-colors uppercase tracking-wider text-sm font-semibold shadow-lg"
            >
              View on Map
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
