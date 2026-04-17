import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const CSV_DIR = path.join(process.cwd(), 'analytics');
const CSV_PATH = path.join(CSV_DIR, 'events.csv');
const CSV_HEADER = 'timestamp,event_type,details,page\n';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!existsSync(CSV_DIR)) mkdirSync(CSV_DIR, { recursive: true });
  writeFileSync(CSV_PATH, CSV_HEADER, 'utf8');

  return NextResponse.json({ ok: true });
}
