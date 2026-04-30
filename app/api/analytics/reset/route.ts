import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { writeCSV, CSV_HEADER } from '@/lib/blob';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await writeCSV(CSV_HEADER);
    revalidatePath('/tracking');
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
