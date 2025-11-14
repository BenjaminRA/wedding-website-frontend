'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  weddingDate: string;
}

export default function Countdown({ weddingDate }: CountdownProps) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const wedding = new Date(weddingDate).getTime();
      const now = new Date().getTime();
      const distance = wedding - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const renderCountdownUnit = (value: number, label: string) => (
    <>
      {/* Desktop Countdown */}
      <div className="hidden md:block bg-white border-2 border-gold rounded-2xl p-8 min-w-[140px] transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl shadow-gold/20">
        <div className="font-playfair text-5xl md:text-6xl font-bold text-gold leading-none mb-2">
          {value}
        </div>
        <div className="font-montserrat text-sm uppercase tracking-widest text-gray-600 font-medium">
          {label}
        </div>
      </div>

      {/* Mobile Countdown */}
      <div className="md:hidden flex flex-col items-center gap-2">
        <div className="bg-white border-2 border-gold rounded-2xl p-2 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl shadow-gold/20 w-[50px]">
          <div className="font-playfair text-2xl font-bold text-gold leading-none mb-2">
            {value}
          </div>
        </div>
        <div className="font-montserrat text-xs uppercase tracking-widest text-gray-600 font-medium">
          {label[0]}
          {label[0]}
        </div>
      </div>
    </>
  );

  return (
    <div className="mt-16 p-12 bg-white/80 backdrop-blur-md rounded-3xl border border-gold/20 shadow-2xl">
      <h2 className="font-cormorant text-xl md:text-4xl mb-10 text-dark font-semibold italic tracking-wide">
        {t('welcome.countdown')}
      </h2>

      <div className="grid grid-cols-4 gap-4 md:flex md:flex-wrap md:gap-6 justify-center">
        {renderCountdownUnit(countdown.days, t('welcome.days'))}

        {renderCountdownUnit(countdown.hours, t('welcome.hours'))}

        {renderCountdownUnit(countdown.minutes, t('welcome.minutes'))}

        {renderCountdownUnit(countdown.seconds, t('welcome.seconds'))}
      </div>
    </div>
  );
}
