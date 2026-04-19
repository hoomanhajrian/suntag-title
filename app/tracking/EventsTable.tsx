'use client';

import { useState } from 'react';

interface Event {
  timestamp: string;
  event_type: string;
  details: string;
  page: string;
}

interface Props {
  events: Event[];
}

const PAGE_SIZE = 25;

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

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    });
  } catch { return iso; }
}

export default function EventsTable({ events }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const slice = events.slice(start, start + PAGE_SIZE);

  return (
    <div className="border border-blue-base/20 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-blue-base/20 bg-background flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/70">
          Recent Events
        </h2>
        {events.length > 0 && (
          <span className="text-xs text-white/40">
            {start + 1}–{Math.min(start + PAGE_SIZE, events.length)} of {events.length}
          </span>
        )}
      </div>

      {events.length === 0 ? (
        <div className="px-5 py-10 text-center text-white/50 text-sm italic">
          No events recorded yet. Start exploring the site to generate data.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-base/10 text-white/60 text-xs uppercase tracking-widest">
                  <th className="text-left px-5 py-3">Time</th>
                  <th className="text-left px-5 py-3">Event</th>
                  <th className="text-left px-5 py-3">Details</th>
                  <th className="text-left px-5 py-3">Page</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((e, i) => (
                  <tr
                    key={start + i}
                    className="border-b border-blue-base/10 last:border-0 hover:bg-blue-base/5 transition-colors"
                  >
                    <td className="px-5 py-3 text-white/65 whitespace-nowrap">
                      {formatDate(e.timestamp)}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-sm text-xs font-semibold ${EVENT_COLORS[e.event_type] ?? 'text-text-base/60 bg-text-base/5'}`}>
                        {EVENT_LABELS[e.event_type] ?? e.event_type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-white/80">{e.details || '—'}</td>
                    <td className="px-5 py-3 text-white/60">{e.page || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-blue-base/20 flex items-center justify-between gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-blue-base/30 rounded-sm text-blue-glow hover:bg-blue-base/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 text-xs font-semibold rounded-sm transition-colors ${
                      p === page
                        ? 'bg-blue-base/20 text-blue-glow border border-blue-base/50'
                        : 'text-white/50 hover:bg-blue-base/10 hover:text-white/80'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-blue-base/30 rounded-sm text-blue-glow hover:bg-blue-base/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
