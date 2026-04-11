// src/app/layout.tsx (or layout.js)
import type { Metadata } from 'next';
import './globals.css';
// Import the configured fonts
import { oswald, merriweather } from './utils/fonts';

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
    <html lang="en">
      {/* Apply both CSS variables to the <html> tag.
        This allows you to reference them in your CSS. 
      */}
      <body className={`${oswald.variable} ${merriweather.variable}`}>
        {children}
      </body>
    </html>
  );
}