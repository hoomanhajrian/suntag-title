// src/app/layout.tsx (or layout.js)
import type { Metadata } from 'next';
import './globals.css';
// Import the configured fonts
import { dancingScript, montserrat } from './utils/fonts';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

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
    <html lang="en" className={`${dancingScript.variable} ${montserrat.variable}`}>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}