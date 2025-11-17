'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { getUploadsUrl } from '../../lib/api';
import '../../lib/i18n';

interface GiftItem {
  id: number;
  name: string;
  url: string;
  amount: string;
  icon?: {
    url: string;
    alternativeText?: string;
  };
}

interface GiftRegion {
  id: number;
  title: string;
  content: string;
  list: GiftItem[];
  iframe?: string;
}

interface GiftsPageProps {
  dataEn?: any;
  dataEs?: any;
}

interface GiftRegionBoxProps {
  region: GiftRegion;
}

function GiftRegionBox({ region }: GiftRegionBoxProps) {
  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-sage">
      <h2 className="font-playfair text-3xl md:text-4xl text-dark mb-6 font-bold text-center">
        {region.title}
      </h2>

      {region.content && (
        <div className="mb-8">
          <MarkdownRenderer content={region.content} />
        </div>
      )}

      {region.iframe && (
        <div className="-mx-8 md:-mx-12 mb-8">
          <iframe
            src={region.iframe}
            className="w-full border-0"
            style={{ minHeight: '900px' }}
            title={`${region.title} iframe`}
          />
        </div>
      )}

      {region.list && region.list.length > 0 && (
        <div className="space-y-4">
          {region.list.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border-2 border-sage rounded-xl hover:border-forest-green hover:shadow-md transition-all duration-300 group"
            >
              {item.icon && (
                <div className="flex-shrink-0">
                  <Image
                    src={getUploadsUrl(item.icon.url)}
                    alt={item.icon.alternativeText || item.name}
                    width={64}
                    height={64}
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-playfair text-xl md:text-2xl text-dark font-semibold group-hover:text-forest-green transition-colors">
                  {item.name}
                </h3>
                <p className="font-montserrat text-sm md:text-base text-gray-600 mt-1">
                  {item.amount}
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-forest-green opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GiftsPage({ dataEn, dataEs }: GiftsPageProps) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="max-w-6xl mx-auto px-8 pb-20" />;
  }

  const content = i18n.language === 'es' ? dataEs : dataEn;

  const contentOrder =
    i18n.language === 'es' ? ['chile', 'us'] : ['us', 'chile'];

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-b from-white to-cream">
        <div className="max-w-6xl mx-auto px-8 text-center pt-16 pb-8">
          <h1 className="font-playfair text-5xl md:text-6xl text-dark mb-4 font-bold tracking-wide">
            {t('gifts.title')}
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-gray-600 italic">
            {t('gifts.subtitle')}
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {contentOrder.map(
            (regionKey) =>
              content?.[regionKey] && (
                <GiftRegionBox
                  key={regionKey}
                  region={content[regionKey]}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
