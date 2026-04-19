'use client';

import { useEffect } from 'react';

export default function SwRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/tracking-sw.js', { scope: '/tracking/' })
      .catch((err) => console.error('[SW] Registration failed:', err));
  }, []);

  return null;
}
