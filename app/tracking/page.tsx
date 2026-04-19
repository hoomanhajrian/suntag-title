import { readFileSync, existsSync } from 'fs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
import { verifySession } from '@/lib/auth';
import LogoutButton from './LogoutButton';
import DashboardActions from './DashboardActions';
import AnalyticsCharts from './AnalyticsCharts';
import ReloadButton from './ReloadButton';
import EventsTable from './EventsTable';

const CSV_PATH = '/tmp/events.csv';

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
    { key: 'page_view',       label: 'Page Views',  color: 'border-blue-base  text-blue-glow'  },
    { key: 'call_click',      label: 'Call Clicks', color: 'border-gold-base  text-gold-base'  },
    { key: 'sms_click',       label: 'SMS Clicks',  color: 'border-green-500  text-green-400'  },
    { key: 'directions_click',label: 'Directions',  color: 'border-red-base   text-red-base'   },
  ];


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
            <p className="text-white/70 text-sm mt-1">
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
              <p className="text-xs uppercase tracking-widest text-white/70 mb-1">{label}</p>
              <p className={`text-3xl font-bold ${color.split(' ')[1]}`}>
                {counts[key] ?? 0}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <AnalyticsCharts events={events} />

        {/* Events Table */}
        <EventsTable events={events} />

      </div>
    </div>
  );
}
