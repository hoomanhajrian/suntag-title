'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from './TrackPageView';

interface Props {
  serviceId: string;
  serviceTitle: string;
}

/**
 * Renders nothing but watches the parent service card via IntersectionObserver
 * and fires a single `service_view` event the first time ≥50% of the card is visible.
 */
export default function ServiceViewTracker({ serviceId, serviceTitle }: Props) {
  const firedRef = useRef(false);

  useEffect(() => {
    const el = document.getElementById(serviceId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          trackEvent('service_view', serviceTitle, window.location.pathname);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [serviceId, serviceTitle]);

  return null;
}
