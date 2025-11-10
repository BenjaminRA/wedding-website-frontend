'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

interface SchedulePageProps {
  dataEn: any;
  dataEs: any;
}

export default function SchedulePage({ dataEn, dataEs }: SchedulePageProps) {
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
          {content?.title || t('schedule.title')}
        </h1>
        <p className="font-cormorant text-xl md:text-2xl text-gray-600 italic">
          {t('schedule.subtitle')}
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-lg border border-gold/10">
        {content?.events && content.events.length > 0 ? (
          <div className="space-y-6">
            {content.events.map((event: any, index: number) => (
              <div
                key={index}
                className="border-l-4 border-gold pl-6 py-2"
              >
                <div className="font-montserrat text-sm uppercase tracking-wider text-gold font-semibold mb-2">
                  {event.time}
                </div>
                <h3 className="font-playfair text-2xl text-dark mb-2 font-bold">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="font-cormorant text-lg text-gray-600">
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="font-cormorant text-xl text-dark text-center">
            Schedule coming soon...
          </p>
        )}
      </div>
    </div>
  );
}
