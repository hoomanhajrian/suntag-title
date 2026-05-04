import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { listArchives } from '@/lib/blob';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const archives = await listArchives();
  return NextResponse.json(
    archives.map(({ id, label, startDate, endDate, createdAt }) => ({
      id,
      label,
      startDate,
      endDate,
      createdAt,
    }))
  );
}
