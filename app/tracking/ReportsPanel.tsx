'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

interface ReportMeta {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

interface EventRow {
  timestamp: string;
  event_type: string;
  details: string;
  page: string;
}

const EVENT_LABELS: Record<string, string> = {
  page_view:        'Page View',
  call_click:       'Call Click',
  sms_click:        'SMS Click',
  directions_click: 'Directions Click',
};

const EVENT_COLORS: Record<string, string> = {
  page_view:        'text-blue-glow bg-blue-base/10',
  call_click:       'text-gold-base bg-gold-base/10',
  sms_click:        'text-green-400 bg-green-400/10',
  directions_click: 'text-red-base bg-red-base/10',
};

function parseCSV(raw: string): EventRow[] {
  const lines = raw.trim().split('\n').slice(1);
  return lines.filter(Boolean).map((line) => {
    const cols: string[] = [];
    let inQuote = false;
    let cur = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) {
        cols.push(cur); cur = '';
      } else {
        cur += ch;
      }
    }
    cols.push(cur);
    return {
      timestamp: cols[0] ?? '',
      event_type: cols[1] ?? '',
      details: cols[2] ?? '',
      page: cols[3] ?? '',
    };
  });
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    });
  } catch { return iso; }
}

// ─── Event rows modal ─────────────────────────────────────────────────────────

function ReportModal({ report, onClose }: { report: ReportMeta; onClose: () => void }) {
  const [rows, setRows] = useState<EventRow[] | null>(null);
  const [error, setError] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/analytics/reports/${encodeURIComponent(report.id)}`)
      .then((r) => r.text())
      .then((csv) => setRows(parseCSV(csv)))
      .catch(() => setError('Failed to load report.'));
  }, [report.id]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const counts: Record<string, number> = {};
  for (const row of rows ?? []) {
    counts[row.event_type] = (counts[row.event_type] ?? 0) + 1;
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-3xl max-h-[85vh] flex flex-col bg-background border border-blue-base/30 rounded-sm shadow-xl overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-base/20 shrink-0">
          <div>
            <p className="text-gold-base text-xs font-semibold uppercase tracking-widest">
              Archived Report
            </p>
            <h2 className="text-lg font-bold text-text-base mt-0.5">{report.label}</h2>
            {report.startDate && (
              <p className="text-white/50 text-xs mt-0.5">
                {report.startDate} → {report.endDate}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Summary strip */}
        {rows && rows.length > 0 && (
          <div className="flex gap-4 px-5 py-3 border-b border-blue-base/20 bg-blue-base/5 shrink-0 flex-wrap">
            {Object.entries(EVENT_LABELS).map(([key, label]) => (
              <div key={key} className="text-center min-w-[60px]">
                <p className="text-xs text-white/50 uppercase tracking-widest">{label}</p>
                <p className={`text-xl font-bold ${(EVENT_COLORS[key] ?? '').split(' ')[0]}`}>
                  {counts[key] ?? 0}
                </p>
              </div>
            ))}
            <div className="text-center min-w-[60px]">
              <p className="text-xs text-white/50 uppercase tracking-widest">Total</p>
              <p className="text-xl font-bold text-text-base">{rows.length}</p>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-y-auto flex-1">
          {error && (
            <p className="text-red-base px-5 py-8 text-sm">{error}</p>
          )}
          {!rows && !error && (
            <p className="text-white/40 px-5 py-8 text-sm">Loading…</p>
          )}
          {rows && rows.length === 0 && (
            <p className="text-white/40 px-5 py-8 text-sm">No events in this report.</p>
          )}
          {rows && rows.length > 0 && (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background border-b border-blue-base/20">
                <tr>
                  {['Time', 'Event', 'Details', 'Page'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-xs uppercase tracking-widest text-white/40 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-blue-base/10 hover:bg-blue-base/5 transition-colors">
                    <td className="px-4 py-2 text-white/50 text-xs whitespace-nowrap">
                      {formatDate(row.timestamp)}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${EVENT_COLORS[row.event_type] ?? 'text-white/60 bg-white/5'}`}>
                        {EVENT_LABELS[row.event_type] ?? row.event_type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-white/70 max-w-[180px] truncate">{row.details}</td>
                    <td className="px-4 py-2 text-white/40 text-xs max-w-[120px] truncate">{row.page}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────

export default function ReportsPanel() {
  const [reports, setReports] = useState<ReportMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewReport, setViewReport] = useState<ReportMeta | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadReports = useCallback(() => {
    setLoading(true);
    fetch('/api/analytics/reports')
      .then((r) => r.json())
      .then((data: ReportMeta[]) => { setReports(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { loadReports(); }, [loadReports]);

  function handleDownload(report: ReportMeta) {
    const a = document.createElement('a');
    a.href = `/api/analytics/reports/${encodeURIComponent(report.id)}`;
    a.download = `${report.label}.csv`;
    a.click();
  }

  async function handleDelete(report: ReportMeta) {
    const confirmed = window.confirm(`Delete "${report.label}"?\nThis cannot be undone.`);
    if (!confirmed) return;
    setDeletingId(report.id);
    const res = await fetch(`/api/analytics/reports/${encodeURIComponent(report.id)}`, {
      method: 'DELETE',
    });
    setDeletingId(null);
    if (res.ok) {
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } else {
      alert('Failed to delete report.');
    }
  }

  return (
    <>
      {viewReport && (
        <ReportModal report={viewReport} onClose={() => setViewReport(null)} />
      )}

      <div className="border border-blue-base/20 rounded-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-blue-base/20 bg-background flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpenIcon fontSize="small" className="text-gold-base" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Archived Reports
            </h2>
          </div>
          <span className="text-xs text-white/40">
            {reports.length} report{reports.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Body */}
        {loading && (
          <p className="px-5 py-6 text-sm text-white/40">Loading…</p>
        )}
        {!loading && reports.length === 0 && (
          <p className="px-5 py-6 text-sm text-white/40">
            No archived reports yet. Reset the current data to create one.
          </p>
        )}
        {!loading && reports.length > 0 && (
          <ul className="divide-y divide-blue-base/10">
            {reports.map((report) => (
              <li
                key={report.id}
                className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-blue-base/5 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-base truncate">
                    {report.label}
                  </p>
                  {report.startDate && (
                    <p className="text-xs text-white/40 mt-0.5">
                      {report.startDate} → {report.endDate}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setViewReport(report)}
                    title="View"
                    className="p-1.5 text-blue-glow hover:bg-blue-base/10 rounded-sm transition-colors"
                  >
                    <VisibilityIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDownload(report)}
                    title="Download CSV"
                    className="p-1.5 text-gold-base hover:bg-gold-base/10 rounded-sm transition-colors"
                  >
                    <DownloadIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDelete(report)}
                    disabled={deletingId === report.id}
                    title="Delete"
                    className="p-1.5 text-red-base hover:bg-red-base/10 rounded-sm transition-colors disabled:opacity-50"
                  >
                    <DeleteForeverIcon fontSize="small" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
