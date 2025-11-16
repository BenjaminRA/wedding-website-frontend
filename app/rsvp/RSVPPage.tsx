'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { findGuestWithPassword, submitRSVP } from '@/lib/api';
import Swal from 'sweetalert2';
import '../../lib/i18n';

interface Guest {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  type: string;
  country: string;
  rsvp: boolean;
  attending: boolean | null;
}

interface GuestGroup {
  id: number;
  documentId: string;
  groupName: string;
  guests: Guest[];
}

interface GuestData extends Guest {
  guest_group: GuestGroup;
}

export default function RSVPPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [guestAttendance, setGuestAttendance] = useState<
    Record<number, boolean>
  >({});
  const [wishes, setWishes] = useState('');
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
      const response = await findGuestWithPassword(
        firstName,
        lastName,
        password
      );
      if (response.data) {
        setGuest(response.data);
        // Initialize attendance state for all guests in the group
        const initialAttendance: Record<number, boolean> = {};
        if (response.data.guest_group?.guests) {
          response.data.guest_group.guests.forEach((g: Guest) => {
            initialAttendance[g.id] = g.attending ?? false;
          });
        }
        setGuestAttendance(initialAttendance);
        setWishes(response.data.guest_group?.wishes || '');
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

  const handleBackToSearch = () => {
    setGuest(null);
    setError('');
    setMessage('');
  };

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!guest) return;

    try {
      // Prepare the RSVP data with all guest information
      const rsvpData = guest.guest_group.guests.map((g) => ({
        id: g.id,
        documentId: g.documentId,
        rsvp: true,
        attending: guestAttendance[g.id] ?? false,
      }));

      await submitRSVP({
        guests: rsvpData,
        guest_group_id: guest.guest_group.id,
        wishes: wishes.trim(),
      });

      await Swal.fire({
        title: t('rsvp.success'),
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2d5f4f',
        customClass: {
          popup: 'font-cormorant',
          title: 'font-playfair text-2xl',
          confirmButton: 'font-montserrat uppercase tracking-wider',
        },
        iconColor: '#2d5f4f',
      });

      setGuest(null);
      setFirstName('');
      setLastName('');
      setPassword('');
      setMessage('');
      setGuestAttendance({});
      setWishes('');
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

      {guest && (
        <button
          type="button"
          onClick={handleBackToSearch}
          className="flex items-center gap-2 text-forest-green hover:text-forest-green/80 font-montserrat text-sm uppercase tracking-wider font-semibold transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {t('rsvp.backToSearch')}
        </button>
      )}

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-fobg-forest-green/10">
        {!guest ? (
          <form
            onSubmit={handleFindGuest}
            className="space-y-6"
          >
            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wider text-dark mb-2 font-semibold">
                {t('rsvp.firstName')}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fobg-forest-green focus:border-transparent font-cormorant text-lg"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fobg-forest-green focus:border-transparent font-cormorant text-lg"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fobg-forest-green focus:border-transparent font-cormorant text-lg"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-cormorant">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-forest-green text-white font-montserrat px-8 py-4 rounded-lg hover:bg-forest-green/90 transition-colors uppercase tracking-wider text-sm font-semibold shadow-lg"
            >
              {t('rsvp.submit')}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitRSVP}
            className="space-y-8"
          >
            {guest.guest_group?.groupName && (
              <div className="text-center pb-4 border-b border-gray-200">
                <p className="font-cormorant text-lg text-gray-600">
                  {t('rsvp.party')}
                </p>
                <p className="font-playfair text-2xl font-semibold text-dark mt-1">
                  {guest.guest_group.groupName}
                </p>
              </div>
            )}

            <div className="space-y-5">
              <h3 className="font-montserrat text-xs uppercase tracking-widest text-gray-500 text-center">
                {t('rsvp.willAttend')}
              </h3>

              {guest.guest_group?.guests &&
                guest.guest_group.guests.map((groupGuest) => (
                  <div
                    key={groupGuest.id}
                    className="bg-gray-50 rounded-xl p-5 space-y-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-cormorant text-lg font-semibold text-dark">
                      {groupGuest.firstName} {groupGuest.lastName}
                      <span className="ml-2 text-sm text-gray-500 font-normal">
                        ({groupGuest.type})
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setGuestAttendance((prev) => ({
                            ...prev,
                            [groupGuest.id]: true,
                          }))
                        }
                        className={`flex-1 px-4 py-3 rounded-lg font-montserrat uppercase tracking-wider text-xs font-semibold transition-all ${
                          guestAttendance[groupGuest.id]
                            ? 'bg-forest-green text-white shadow-lg'
                            : 'bg-white text-dark hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        {t('rsvp.yes')}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setGuestAttendance((prev) => ({
                            ...prev,
                            [groupGuest.id]: false,
                          }))
                        }
                        className={`flex-1 px-4 py-3 rounded-lg font-montserrat uppercase tracking-wider text-xs font-semibold transition-all ${
                          !guestAttendance[groupGuest.id]
                            ? 'bg-forest-green text-white shadow-lg'
                            : 'bg-white text-dark hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        {t('rsvp.no')}
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <label className="block font-montserrat text-xs uppercase tracking-widest text-gray-500 text-center">
                {t('rsvp.wishes')}
              </label>
              <p className="text-center font-cormorant text-sm text-gray-600 italic">
                {t('rsvp.wishesDescription')}
              </p>
              <textarea
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                rows={4}
                // maxLength={500}
                placeholder={t('rsvp.wishesPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent font-cormorant text-base resize-none"
              />
              {/* <p className="text-right text-xs text-gray-500 font-montserrat">
                {wishes.length}/500
              </p> */}
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
              className="w-full bg-forest-green text-white font-montserrat px-8 py-4 rounded-lg hover:bg-forest-green/90 transition-colors uppercase tracking-wider text-sm font-semibold shadow-lg"
            >
              {t('rsvp.confirmRSVP')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
