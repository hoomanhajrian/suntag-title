'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'page_view',
        details: document.title,
        page: pathname,
      }),
    }).catch(() => {/* silently ignore */});
  }, [pathname]);

  return null;
}

/** Call this from any click handler */
export function trackEvent(event_type: string, details: string, page: string) {
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_type, details, page }),
  }).catch(() => {/* silently ignore */});
}
