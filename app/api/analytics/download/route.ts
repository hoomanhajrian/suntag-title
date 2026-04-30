import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { readCSV } from '@/lib/blob';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const content = await readCSV();
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="events.csv"',
    },
  });
}
