import { Dancing_Script, Montserrat } from 'next/font/google';

// Setup for the script font ("Sun")
export const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
});

// Setup for the bold sans-serif font ("TAG AND TITLE")
export const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'], // Include bold weights for the banner text
  variable: '--font-montserrat',
  display: 'swap',
});