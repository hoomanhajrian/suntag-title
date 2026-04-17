'use client';

import { useRouter } from 'next/navigation';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';

export default function ReloadButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  function handleReload() {
    setSpinning(true);
    router.refresh();
    // Stop spin after a short delay
    setTimeout(() => setSpinning(false), 800);
  }

  return (
    <button
      onClick={handleReload}
      title="Reload latest data"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-glow border border-blue-base/40 rounded-sm hover:bg-blue-base/10 transition-colors duration-200"
    >
      <RefreshIcon
        fontSize="small"
        style={{
          transition: 'transform 0.8s ease',
          transform: spinning ? 'rotate(360deg)' : 'rotate(0deg)',
        }}
      />
      Refresh
    </button>
  );
}
