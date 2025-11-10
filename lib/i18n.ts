import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultLocale = 'en';
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

const resources = {
  en: {
    translation: {
      nav: {
        welcome: 'Welcome',
        gallery: 'Gallery',
        venue: 'Venue',
        rsvp: 'RSVP',
        dressCode: 'Dress Code',
        gifts: 'Gifts',
        schedule: 'Schedule',
      },
      welcome: {
        title: 'Welcome to Our Wedding',
        subtitle: 'Join us in celebrating our special day',
        countdown: 'Countdown to our big day',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
      gallery: {
        title: 'Our Story',
        subtitle: 'Memories we\'ve shared together',
      },
      venue: {
        title: 'Venue Information',
        subtitle: 'Join us at',
      },
      rsvp: {
        title: 'RSVP',
        subtitle: 'Please let us know if you can attend',
        firstName: 'First Name',
        lastName: 'Last Name',
        password: 'Password',
        submit: 'Find Guest',
        guestFound: 'Guest Found',
        willAttend: 'Will you attend?',
        yes: 'Yes',
        no: 'No',
        confirmRSVP: 'Confirm RSVP',
        success: 'Thank you for your response!',
        error: 'There was an error processing your RSVP',
        notFound: 'Guest not found or incorrect password',
        passwordError: 'Incorrect password',
      },
      dressCode: {
        title: 'Dress Code',
        subtitle: 'Please dress accordingly',
      },
      gifts: {
        title: 'Gifts',
        subtitle: 'Your presence is the best present',
      },
      schedule: {
        title: 'Schedule',
        subtitle: 'Timeline for our special day',
      },
    },
  },
  es: {
    translation: {
      nav: {
        welcome: 'Bienvenida',
        gallery: 'Galería',
        venue: 'Lugar',
        rsvp: 'Confirmación',
        dressCode: 'Código de Vestimenta',
        gifts: 'Regalos',
        schedule: 'Cronograma',
      },
      welcome: {
        title: 'Bienvenidos a Nuestra Boda',
        subtitle: 'Únete a nosotros para celebrar nuestro día especial',
        countdown: 'Cuenta regresiva para nuestro gran día',
        days: 'Días',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos',
      },
      gallery: {
        title: 'Nuestra Historia',
        subtitle: 'Recuerdos que hemos compartido juntos',
      },
      venue: {
        title: 'Información del Lugar',
        subtitle: 'Únete a nosotros en',
      },
      rsvp: {
        title: 'Confirmación de Asistencia',
        subtitle: 'Por favor déjanos saber si puedes asistir',
        firstName: 'Nombre',
        lastName: 'Apellido',
        password: 'Contraseña',
        submit: 'Buscar Invitado',
        guestFound: 'Invitado Encontrado',
        willAttend: '¿Asistirás?',
        yes: 'Sí',
        no: 'No',
        confirmRSVP: 'Confirmar Asistencia',
        success: '¡Gracias por tu respuesta!',
        error: 'Hubo un error al procesar tu confirmación',
        notFound: 'Invitado no encontrado o contraseña incorrecta',
        passwordError: 'Contraseña incorrecta',
      },
      dressCode: {
        title: 'Código de Vestimenta',
        subtitle: 'Por favor vístete apropiadamente',
      },
      gifts: {
        title: 'Regalos',
        subtitle: 'Tu presencia es el mejor regalo',
      },
      schedule: {
        title: 'Cronograma',
        subtitle: 'Línea de tiempo para nuestro día especial',
      },
    },
  },
};

if (typeof window !== 'undefined') {
  i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || undefined,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
