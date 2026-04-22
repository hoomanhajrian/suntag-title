import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Fees & Pricing | Sun Tag & Title – Columbia, MD',
  description:
    'Transparent pricing for Maryland vehicle title transfers, registration renewals, temporary tags, duplicate titles, and tag returns at Sun Tag & Title in Columbia, MD. Our service fees are separate from Maryland MVA fees.',
  alternates: {
    canonical: 'https://suntagandtitle.com/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
