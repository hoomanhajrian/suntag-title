'use client';

import { useRouter } from 'next/navigation';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DashboardActions() {
  const router = useRouter();

  function handleDownload() {
    // Trigger browser file download
    const a = document.createElement('a');
    a.href = '/api/analytics/download';
    a.download = 'events.csv';
    a.click();
  }

  async function handleReset() {
    const confirmed = window.confirm(
      'Are you sure you want to reset all analytics data?\nThis cannot be undone.'
    );
    if (!confirmed) return;

    const res = await fetch('/api/analytics/reset', { method: 'POST' });
    if (res.ok) {
      router.refresh();
    } else {
      let detail = `${res.status} ${res.statusText}`;
      try {
        const body = await res.json();
        if (body?.error) detail = body.error;
      } catch { /* ignore parse error */ }
      alert(`Reset failed: ${detail}`);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold uppercase tracking-wider text-gold-base border border-gold-base/40 rounded-sm hover:bg-gold-base/10 transition-colors duration-200"
      >
        <DownloadIcon fontSize="small" />
        <span className="hidden sm:inline">Download CSV</span>
      </button>
      <button
        onClick={handleReset}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold uppercase tracking-wider text-red-base border border-red-base/40 rounded-sm hover:bg-red-base/10 transition-colors duration-200"
      >
        <DeleteForeverIcon fontSize="small" />
        <span className="hidden sm:inline">Reset Data</span>
      </button>
    </div>
  );
}
