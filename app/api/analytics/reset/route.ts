import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { writeFileSync } from 'fs';
import { revalidatePath } from 'next/cache';
import path from 'path';

const CSV_PATH = '/tmp/events.csv';
const CSV_HEADER = 'timestamp,event_type,details,page\n';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    writeFileSync(CSV_PATH, CSV_HEADER, 'utf8');
    revalidatePath('/tracking');
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
