'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart, Area,
  BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';

interface Event {
  timestamp: string;
  event_type: string;
  details: string;
  page: string;
}

interface Props {
  events: Event[];
}

const EVENT_KEYS = ['page_view', 'call_click', 'sms_click', 'directions_click', 'service_view'] as const;
const EVENT_LABELS: Record<string, string> = {
  page_view: 'Page Views',
  call_click: 'Call Clicks',
  sms_click: 'SMS Clicks',
  directions_click: 'Directions',
  service_view: 'Service Views',
};
const EVENT_COLORS: Record<string, string> = {
  page_view:        '#1E90FF',
  call_click:       '#FFC040',
  sms_click:        '#22c55e',
  directions_click: '#DC143C',
  service_view:     '#94a3b8',
};

const TIMEFRAMES = [
  { label: '7D',  days: 7  },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: 'All', days: 0  },
] as const;

function startOfDay(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function labelDay(iso: string): string {
  const [, month, day] = iso.split('-');
  return `${parseInt(month)}/${parseInt(day)}`;
}

export default function AnalyticsCharts({ events }: Props) {
  const [timeframeDays, setTimeframeDays] = useState<number>(30);

  // Filter events to the chosen timeframe
  const filtered = useMemo(() => {
    if (timeframeDays === 0) return events;
    const cutoff = Date.now() - timeframeDays * 24 * 60 * 60 * 1000;
    return events.filter((e) => new Date(e.timestamp).getTime() >= cutoff);
  }, [events, timeframeDays]);

  // Build daily time-series data
  const timeSeriesData = useMemo(() => {
    // Determine date range
    const days: string[] = [];
    const total = timeframeDays === 0 ? 90 : timeframeDays; // cap "All" display at 90 buckets max for readability
    for (let i = total - 1; i >= 0; i--) {
      days.push(startOfDay(new Date(Date.now() - i * 24 * 60 * 60 * 1000)));
    }

    const map: Record<string, Record<string, number>> = {};
    for (const day of days) {
      map[day] = { page_view: 0, call_click: 0, sms_click: 0, directions_click: 0, service_view: 0 };
    }
    for (const e of filtered) {
      const day = startOfDay(new Date(e.timestamp));
      if (map[day]) {
        map[day][e.event_type] = (map[day][e.event_type] ?? 0) + 1;
      }
    }
    return days.map((day) => ({ day: labelDay(day), ...map[day] }));
  }, [filtered, timeframeDays]);

  // Build bar chart totals
  const barData = useMemo(() => {
    return EVENT_KEYS.map((key) => ({
      name: EVENT_LABELS[key],
      count: filtered.filter((e) => e.event_type === key).length,
      fill: EVENT_COLORS[key],
    }));
  }, [filtered]);

  const hasData = filtered.length > 0;

  return (
    <div className="space-y-8">

      {/* Timeframe selector */}
      <div className="flex items-center gap-2">
        <span className="text-text-base/40 text-xs uppercase tracking-widest mr-2">Timeframe</span>
        {TIMEFRAMES.map(({ label, days }) => (
          <button
            key={label}
            onClick={() => setTimeframeDays(days)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm border transition-colors duration-150 ${
              timeframeDays === days
                ? 'bg-gold-base border-gold-base text-background'
                : 'border-blue-base/30 text-text-base/50 hover:border-gold-base/50 hover:text-gold-base'
            }`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-text-base/30 text-xs">
          {filtered.length} event{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {!hasData ? (
        <div className="border border-blue-base/20 rounded-sm py-16 text-center text-text-base/30 text-sm italic">
          No events in this timeframe.
        </div>
      ) : (
        <>
          {/* Area chart – events over time */}
          <div className="border border-blue-base/20 rounded-sm p-5 bg-background">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-base/40 mb-5">
              Events Over Time
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={timeSeriesData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  {EVENT_KEYS.map((key) => (
                    <linearGradient key={key} id={`grad_${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={EVENT_COLORS[key]} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={EVENT_COLORS[key]} stopOpacity={0}    />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a14',
                    border: '1px solid rgba(30,144,255,0.3)',
                    borderRadius: '2px',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
                  formatter={(value) => EVENT_LABELS[value] ?? value}
                />
                {EVENT_KEYS.map((key) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={EVENT_COLORS[key]}
                    strokeWidth={2}
                    fill={`url(#grad_${key})`}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart – totals by event type */}
          <div className="border border-blue-base/20 rounded-sm p-5 bg-background">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-base/40 mb-5">
              Event Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a14',
                    border: '1px solid rgba(30,144,255,0.3)',
                    borderRadius: '2px',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {barData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
