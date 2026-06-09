import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ – Maryland Tag & Title Questions Answered',
  description:
    'Frequently asked questions about Maryland title transfers, registration renewals, temporary tags, duplicate titles, and notary services from Sun Tag & Title.',
  alternates: {
    canonical: 'https://www.suntagandtitle.com/faq',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
