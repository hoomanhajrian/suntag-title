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
      }),
    }).catch(() => {/* silently ignore */});
  }, [pathname]);

  return null;
}

/** Call this from any click handler — uses sendBeacon so it survives link navigation */
export function trackEvent(event_type: string, details: string) {
  const body = JSON.stringify({ event_type, details });
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }).catch(() => {/* silently ignore */});
    }
  } catch {/* silently ignore */}
}
