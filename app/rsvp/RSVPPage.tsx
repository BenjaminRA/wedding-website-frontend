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
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFindGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await findGuestWithPassword(
        firstName.trim(),
        lastName.trim(),
        password.trim()
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
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className="max-w-2xl mx-auto px-8 pb-20" />;
  }

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-b from-white to-cream">
        <div className="max-w-2xl mx-auto px-8 text-center pt-16 pb-8">
          <h1 className="font-playfair text-5xl md:text-6xl text-dark mb-4 font-bold tracking-wide">
            {t('rsvp.title')}
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-gray-600 italic">
            {t('rsvp.subtitle')}
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-8">
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

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-sage">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent font-cormorant text-lg"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent font-cormorant text-lg"
                />
              </div>

              <div>
                <label className="block font-montserrat text-sm uppercase tracking-wider text-dark mb-2 font-semibold">
                  {t('rsvp.password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent font-cormorant text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-cormorant">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-forest-green text-white font-montserrat px-8 py-4 rounded-lg hover:bg-forest-dark transition-colors uppercase tracking-wider text-sm font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isLoading
                  ? t('rsvp.loading') || 'Loading...'
                  : t('rsvp.submit')}
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
                    {guest.guest_group.groupName.replace(/%%.*?%%/g, '').trim()}
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
                        {/* <span className="ml-2 text-sm text-gray-500 font-normal">
                          ({groupGuest.type})
                        </span> */}
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
                disabled={isLoading}
                className="w-full bg-forest-green text-white font-montserrat px-8 py-4 rounded-lg hover:bg-forest-dark transition-colors uppercase tracking-wider text-sm font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isLoading
                  ? t('rsvp.loading') || 'Loading...'
                  : t('rsvp.confirmRSVP')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
