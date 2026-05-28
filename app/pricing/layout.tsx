import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Fees & Pricing | Sun Tag & Title – Columbia, MD',
  description:
    'Transparent pricing for Maryland title transfers, new plate issuance, plate renewals, temporary tags, duplicate titles, and plate surrender at Sun Tag & Title in Columbia, MD. Private MVA-authorized agent — service fees are separate from Maryland MVA state fees.',
  alternates: {
    canonical: 'https://suntagandtitle.com/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
