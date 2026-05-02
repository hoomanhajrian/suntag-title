'use client';

import { useRouter } from 'next/navigation';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect, useCallback } from 'react';

const POLL_INTERVAL_MS = 30_000; // auto-refresh every 30 seconds

export default function ReloadButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  const doRefresh = useCallback(() => {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 800);
  }, [router]);

  // Auto-poll: refresh data every 30 s so stats stay current
  useEffect(() => {
    const id = setInterval(doRefresh, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [doRefresh]);

  return (
    <button
      onClick={doRefresh}
      title="Reload latest data"
      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-glow border border-blue-base/40 rounded-sm hover:bg-blue-base/10 transition-colors duration-200"
    >
      <RefreshIcon
        fontSize="small"
        style={{
          transition: 'transform 0.8s ease',
          transform: spinning ? 'rotate(360deg)' : 'rotate(0deg)',
        }}
      />
      <span className="hidden sm:inline">Refresh</span>
    </button>
  );
}
