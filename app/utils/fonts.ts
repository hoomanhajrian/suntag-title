// src/app/fonts.ts (or fonts.js)
import { Oswald, Merriweather } from 'next/font/google';

export const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald', // Custom CSS variable name
});

export const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather', // Custom CSS variable name
});