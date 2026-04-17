// src/app/layout.tsx (or layout.js)
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
// Import the configured fonts
import { dancingScript, montserrat } from './utils/fonts';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export const metadata: Metadata = {
  metadataBase: new URL('https://suntagandtitle.com'),
  title: {
    default: 'Sun Tag & Title | Maryland Tag Agency – Columbia, MD',
    template: '%s | Sun Tag & Title – Columbia, MD',
  },
  description:
    'Sun Tag & Title is a licensed Maryland tag agency in Columbia, MD. Same-day vehicle registration, title transfers, license plate renewals, temporary tags, and notary services. Walk-ins welcome.',
  keywords: [
    'Maryland tag agency',
    'Columbia MD tag agency',
    'vehicle title transfer Maryland',
    'car registration Columbia MD',
    'Maryland license plate renewal',
    'MVA tag agency Columbia',
    'temporary tag Maryland',
    'duplicate title Maryland',
    'vehicle registration renewal Howard County',
    'notary Columbia MD',
    'same day title transfer',
    'Sun Tag and Title',
    'suntagandtitle.com',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://suntagandtitle.com',
    siteName: 'Sun Tag & Title',
    title: 'Sun Tag & Title | Maryland Tag Agency – Columbia, MD',
    description:
      'Licensed Maryland tag agency in Columbia, MD. Same-day vehicle registration, title transfers, license plate renewals, temporary tags, and notary services.',
    images: [
      {
        url: '/assets/hero-bg.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sun Tag & Title – Maryland Tag Agency in Columbia, MD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sun Tag & Title | Maryland Tag Agency – Columbia, MD',
    description:
      'Licensed Maryland tag agency in Columbia, MD. Same-day vehicle registration, title transfers, license plate renewals, and notary services.',
    images: ['/assets/hero-bg.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://suntagandtitle.com',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${montserrat.variable} scroll-smooth`}>
      <body>
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '35%',
            height: '100%',
            backgroundImage: "url('/track-bg.jpg')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            backgroundPosition: 'top right',
            opacity: 0.2,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <Navigation />
        {children}
        <Footer />
        <BackToTop />
        {/* Google Ads tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11410639321"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11410639321');
          `}
        </Script>
      </body>
    </html>
  );
}