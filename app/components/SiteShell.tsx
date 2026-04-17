'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import BackToTop from './BackToTop';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/tracking');

  return (
    <>
      {!isAdmin && <Navigation />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
    </>
  );
}
