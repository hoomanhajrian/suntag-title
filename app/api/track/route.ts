import { NextRequest, NextResponse } from 'next/server';
import { appendCSVRow } from '@/lib/blob';

function escape(val: string): string {
  return '"' + val.replace(/"/g, '""') + '"';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event_type: string = body.event_type ?? '';
    const details: string = body.details ?? '';
    const page: string = body.page ?? '';

    if (!event_type) {
      return NextResponse.json({ error: 'Missing event_type' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const row = `${timestamp},${escape(event_type)},${escape(details)},${escape(page)}\n`;
    await appendCSVRow(row);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
