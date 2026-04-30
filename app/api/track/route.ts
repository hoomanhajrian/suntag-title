import { NextRequest, NextResponse } from 'next/server';
import { appendCSVRow } from '@/lib/blob';

function escape(val: string): string {
  return '"' + val.replace(/"/g, '""') + '"';
}

function getLocation(req: NextRequest): string {
  const code = req.headers.get('x-vercel-ip-country');
  if (!code) return 'Unknown';
  try {
    const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code;
    const flag = code
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)));
    return `${flag} ${name}`;
  } catch {
    return code;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event_type: string = body.event_type ?? '';
    const details: string = body.details ?? '';

    if (!event_type) {
      return NextResponse.json({ error: 'Missing event_type' }, { status: 400 });
    }

    const location = getLocation(req);
    const timestamp = new Date().toISOString();
    const row = `${timestamp},${escape(event_type)},${escape(details)},${escape(location)}\n`;
    await appendCSVRow(row);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
