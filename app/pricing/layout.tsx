import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Fees & Pricing | Sun Tag & Title – Columbia, MD',
  description:
    'Transparent fees for Maryland title transfers, plate issuance and renewals, temporary tags, duplicate titles, and plate surrender at Sun Tag & Title.',
  alternates: {
    canonical: 'https://www.suntagandtitle.com/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
