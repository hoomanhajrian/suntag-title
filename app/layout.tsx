// src/app/layout.tsx (or layout.js)
import type { Metadata } from 'next';
import './globals.css';
// Import the configured fonts
import { dancingScript, montserrat } from './utils/fonts';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export const metadata: Metadata = {
  title: 'Sun Tag And Title',
  description: 'Your Vehicle Service Partner',
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
      </body>
    </html>
  );
}