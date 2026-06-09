import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
// Import the configured fonts
import { dancingScript, montserrat } from './utils/fonts';
import SiteShell from './components/SiteShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.suntagandtitle.com'),
  title: {
    default: 'Sun Tag & Title | Maryland Tag Agency – Columbia, MD',
    template: '%s | Sun Tag & Title – Columbia, MD',
  },
  description:
    'Licensed Maryland tag agency in Columbia, MD offering same-day vehicle registration, title transfers, renewals, temporary tags, and notary services.',
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
    url: 'https://www.suntagandtitle.com',
    siteName: 'Sun Tag & Title',
    title: 'Sun Tag & Title | Maryland Tag Agency – Columbia, MD',
    description:
      'Licensed Maryland tag agency in Columbia, MD. Same-day vehicle registration, title transfers, license plate renewals, temporary tags, and notary services.',
    images: [
      {
        url: '/suntag-logo-ads.png',
        width: 1200,
        height: 1200,
        alt: 'Sun Tag & Title – Maryland Tag Agency in Columbia, MD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sun Tag & Title | Maryland Tag Agency – Columbia, MD',
    description:
      'Licensed Maryland tag agency in Columbia, MD. Same-day vehicle registration, title transfers, license plate renewals, and notary services.',
    images: ['/suntag-logo-ads.png'],
  },
  alternates: {
    canonical: 'https://www.suntagandtitle.com',
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
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        {/* Organization structured data for Google Ads logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Sun Tag & Title',
              url: 'https://www.suntagandtitle.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.suntagandtitle.com/suntag-logo-ads.png',
                width: 1200,
                height: 1200,
              },
              image: 'https://www.suntagandtitle.com/suntag-logo-ads.png',
              description:
                'Licensed Maryland tag agency in Columbia, MD. Same-day vehicle registration, title transfers, license plate renewals, temporary tags, and notary services.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Columbia',
                addressRegion: 'MD',
                addressCountry: 'US',
              },
            }),
          }}
        />
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T8ST2J2G');`}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="beforeInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x44t529xcp");`}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T8ST2J2G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
        <SiteShell>
          {children}
        </SiteShell>
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
        <SpeedInsights />
      </body>
    </html>
  );
}