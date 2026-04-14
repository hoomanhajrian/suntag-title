import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ – Maryland Tag & Title Questions Answered',
  description:
    'Frequently asked questions about Maryland vehicle title transfers, registration renewals, temporary tags, duplicate titles, and notary services at Sun Tag & Title in Columbia, MD.',
  alternates: {
    canonical: 'https://suntagandtitle.com/faq',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
