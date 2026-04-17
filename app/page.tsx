// src/app/page.tsx
import type { Metadata } from 'next';
import HeroSection from "@/app/components/sections/HeroSection";
import ServicesSection from "@/app/components/sections/ServicesSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ContactSection from "@/app/components/sections/ContactSection";
import PaymentSection from "@/app/components/sections/PaymentSection";
import TrackPageView from "@/app/components/TrackPageView";

export const metadata: Metadata = {
  title: 'Sun Tag & Title | Maryland Tag Agency – Columbia, MD',
  description:
    'Sun Tag & Title in Columbia, MD offers same-day vehicle registration, Maryland title transfers, license plate renewals, 30-day temporary tags, duplicate titles, and notary services. Walk-ins welcome — no appointment needed.',
  alternates: {
    canonical: 'https://suntagandtitle.com',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sun Tag & Title',
  description:
    'Licensed Maryland tag agency offering same-day vehicle registration, title transfers, license plate renewals, temporary tags, and notary services in Columbia, MD.',
  url: 'https://suntagandtitle.com',
  telephone: '+14104178272',
  email: 'amir@suntagandtitle.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10400 Shaker Dr',
    addressLocality: 'Columbia',
    addressRegion: 'MD',
    postalCode: '21046',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.1818566,
    longitude: -76.8453849,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '09:00',
      closes: '19:30',
    },
  ],
  image: 'https://suntagandtitle.com/assets/hero-bg.jpeg',
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/p/SUN-TAG-and-TITLE-61554522663897',
  ],
  areaServed: [
    { '@type': 'City', name: 'Columbia, MD' },
    { '@type': 'City', name: 'Ellicott City, MD' },
    { '@type': 'City', name: 'Laurel, MD' },
    { '@type': 'City', name: 'Fulton, MD' },
    { '@type': 'AdministrativeArea', name: 'Howard County, MD' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vehicle Tag & Title Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maryland Vehicle Title Transfer' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vehicle Registration Renewal' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maryland License Plate Issuance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '30-Day Temporary Tag' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Duplicate Title Application' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Notary Services' } },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="bg-background">
        <TrackPageView />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <PaymentSection />
      </main>
    </>
  );
}