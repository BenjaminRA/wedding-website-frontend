'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { findGuestWithPassword, updateGuestRSVP } from '@/lib/api';
import '../../lib/i18n';

export default function RSVPPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [guest, setGuest] = useState<any>(null);
  const [attending, setAttending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFindGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await findGuestWithPassword(firstName, lastName, password);
      if (response.data) {
        setGuest(response.data);
        setAttending(response.data.attending || false);
      } else {
        setError(t('rsvp.notFound'));
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError(t('rsvp.passwordError'));
      } else {
        setError(t('rsvp.notFound'));
      }
    }
  };

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!guest) return;

    try {
      await updateGuestRSVP(guest.id, {
        rsvp: true,
        attending,
      });
      setMessage(t('rsvp.success'));
      setTimeout(() => {
        setGuest(null);
        setFirstName('');
        setLastName('');
        setPassword('');
        setMessage('');
      }, 3000);
    } catch (err) {
      setError(t('rsvp.error'));
    }
  };

  if (!mounted) {
    return <div className="max-w-2xl mx-auto px-8 pb-20" />;
  }

  return (
    <div className="max-w-2xl mx-auto px-8 pb-20">
      <div className="text-center pt-16 pb-12">
        <h1 className="font-playfair text-5xl md:text-6xl text-dark mb-4 font-bold tracking-wide">
          {t('rsvp.title')}
        </h1>
        <p className="font-cormorant text-xl md:text-2xl text-gray-600 italic">
          {t('rsvp.subtitle')}
        </p>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-lg border border-gold/10">
        {!guest ? (
          <form onSubmit={handleFindGuest} className="space-y-6">
            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wider text-dark mb-2 font-semibold">
                {t('rsvp.firstName')}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent font-cormorant text-lg"
              />
            </div>

            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wider text-dark mb-2 font-semibold">
                {t('rsvp.lastName')}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent font-cormorant text-lg"
              />
            </div>

            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wider text-dark mb-2 font-semibold">
                {t('rsvp.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent font-cormorant text-lg"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-cormorant">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold text-white font-montserrat px-8 py-4 rounded-lg hover:bg-gold/90 transition-colors uppercase tracking-wider text-sm font-semibold shadow-lg"
            >
              {t('rsvp.submit')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitRSVP} className="space-y-6">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg font-cormorant text-lg text-center">
              {t('rsvp.guestFound')}: {guest.firstName} {guest.lastName}
            </div>

            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wider text-dark mb-4 font-semibold">
                {t('rsvp.willAttend')}
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 px-6 py-4 rounded-lg font-montserrat uppercase tracking-wider text-sm font-semibold transition-all ${
                    attending
                      ? 'bg-gold text-white shadow-lg'
                      : 'bg-gray-100 text-dark hover:bg-gray-200'
                  }`}
                >
                  {t('rsvp.yes')}
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 px-6 py-4 rounded-lg font-montserrat uppercase tracking-wider text-sm font-semibold transition-all ${
                    !attending
                      ? 'bg-gold text-white shadow-lg'
                      : 'bg-gray-100 text-dark hover:bg-gray-200'
                  }`}
                >
                  {t('rsvp.no')}
                </button>
              </div>
            </div>

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg font-cormorant">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-cormorant">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold text-white font-montserrat px-8 py-4 rounded-lg hover:bg-gold/90 transition-colors uppercase tracking-wider text-sm font-semibold shadow-lg"
            >
              {t('rsvp.confirmRSVP')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
