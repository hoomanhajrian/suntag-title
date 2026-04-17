import { NextRequest, NextResponse } from 'next/server';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const CSV_DIR = path.join(process.cwd(), 'analytics');
const CSV_PATH = path.join(CSV_DIR, 'events.csv');
const CSV_HEADER = 'timestamp,event_type,details,page\n';

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

    if (!existsSync(CSV_DIR)) mkdirSync(CSV_DIR, { recursive: true });
    if (!existsSync(CSV_PATH)) appendFileSync(CSV_PATH, CSV_HEADER, 'utf8');

    const timestamp = new Date().toISOString();
    const row = `${timestamp},${escape(event_type)},${escape(details)},${escape(page)}\n`;
    appendFileSync(CSV_PATH, row, 'utf8');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
