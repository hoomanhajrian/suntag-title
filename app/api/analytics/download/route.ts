import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const CSV_PATH = '/tmp/events.csv';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!existsSync(CSV_PATH)) {
    return new NextResponse('timestamp,event_type,details,page\n', {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="events.csv"',
      },
    });
  }

  const content = readFileSync(CSV_PATH, 'utf8');
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="events.csv"',
    },
  });
}
