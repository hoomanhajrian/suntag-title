import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import LogoutButton from './LogoutButton';
import DashboardActions from './DashboardActions';
import AnalyticsCharts from './AnalyticsCharts';
import ReloadButton from './ReloadButton';

const CSV_PATH = path.join(process.cwd(), 'analytics', 'events.csv');

interface Event {
  timestamp: string;
  event_type: string;
  details: string;
  page: string;
}

function parseCSV(raw: string): Event[] {
  const lines = raw.trim().split('\n').slice(1); // skip header
  return lines
    .filter(Boolean)
    .map((line) => {
      // Simple CSV parse for our known format: timestamp,"type","details","page"
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
    })
    .reverse(); // newest first
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    });
  } catch { return iso; }
}

const EVENT_LABELS: Record<string, string> = {
  page_view: 'Page View',
  call_click: 'Call Click',
  sms_click: 'SMS Click',
  directions_click: 'Directions Click',
  service_view: 'Service View',
};

const EVENT_COLORS: Record<string, string> = {
  page_view: 'text-blue-glow bg-blue-base/10',
  call_click: 'text-gold-base bg-gold-base/10',
  sms_click: 'text-green-400 bg-green-400/10',
  directions_click: 'text-red-base bg-red-base/10',
  service_view: 'text-text-base/60 bg-text-base/5',
};

export default async function TrackingPage() {
  // Auth check (middleware handles redirect, but double-check server-side)
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  if (!(await verifySession(token))) {
    redirect('/tracking/login');
  }

  const events: Event[] = existsSync(CSV_PATH)
    ? parseCSV(readFileSync(CSV_PATH, 'utf8'))
    : [];

  const counts: Record<string, number> = {};
  for (const e of events) {
    counts[e.event_type] = (counts[e.event_type] ?? 0) + 1;
  }

  const summaryCards = [
    { key: 'page_view',       label: 'Page Views',      color: 'border-blue-base  text-blue-glow'  },
    { key: 'call_click',      label: 'Call Clicks',     color: 'border-gold-base  text-gold-base'  },
    { key: 'sms_click',       label: 'SMS Clicks',      color: 'border-green-500  text-green-400'  },
    { key: 'directions_click',label: 'Directions',      color: 'border-red-base   text-red-base'   },
    { key: 'service_view',    label: 'Service Views',   color: 'border-text-base/20 text-text-base/60' },
  ];

  const recent = events.slice(0, 200);

  return (
    <div className="min-h-screen bg-background px-6 pt-10 pb-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gold-base text-xs font-semibold uppercase tracking-widest">
              Analytics
            </span>
            <h1 className="text-3xl font-bold text-text-base mt-1">Tracking Dashboard</h1>
            <p className="text-text-base/40 text-sm mt-1">
              {events.length} total event{events.length !== 1 ? 's' : ''} recorded
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ReloadButton />
            <DashboardActions />
            <LogoutButton />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {summaryCards.map(({ key, label, color }) => (
            <div
              key={key}
              className={`border ${color} rounded-sm p-4 bg-background`}
            >
              <p className="text-xs uppercase tracking-widest text-text-base/40 mb-1">{label}</p>
              <p className={`text-3xl font-bold ${color.split(' ')[1]}`}>
                {counts[key] ?? 0}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <AnalyticsCharts events={events} />

        {/* Events Table */}
        <div className="border border-blue-base/20 rounded-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-blue-base/20 bg-background">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-text-base/50">
              Recent Events {recent.length < events.length ? `(showing last ${recent.length})` : ''}
            </h2>
          </div>

          {recent.length === 0 ? (
            <div className="px-5 py-10 text-center text-text-base/30 text-sm italic">
              No events recorded yet. Start exploring the site to generate data.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-base/10 text-text-base/30 text-xs uppercase tracking-widest">
                    <th className="text-left px-5 py-3">Time</th>
                    <th className="text-left px-5 py-3">Event</th>
                    <th className="text-left px-5 py-3">Details</th>
                    <th className="text-left px-5 py-3">Page</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((e, i) => (
                    <tr
                      key={i}
                      className="border-b border-blue-base/10 last:border-0 hover:bg-blue-base/5 transition-colors"
                    >
                      <td className="px-5 py-3 text-text-base/50 whitespace-nowrap">
                        {formatDate(e.timestamp)}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-sm text-xs font-semibold ${EVENT_COLORS[e.event_type] ?? 'text-text-base/60 bg-text-base/5'}`}>
                          {EVENT_LABELS[e.event_type] ?? e.event_type}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-text-base/70">{e.details || '—'}</td>
                      <td className="px-5 py-3 text-text-base/40">{e.page || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
