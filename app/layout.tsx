import type { Metadata } from 'next';
import { Playfair_Display, Cormorant, Montserrat } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Our Wedding',
  description: 'Join us in celebrating our special day',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
