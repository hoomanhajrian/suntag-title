import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { readArchiveById, deleteArchiveById } from '@/lib/blob';

type Context = { params: Promise<{ id: string }> };

async function authenticate(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('tracking_session')?.value ?? '';
  return verifySession(token);
}

// GET /api/analytics/reports/[id] — download the archived CSV
export async function GET(_req: NextRequest, { params }: Context) {
  if (!(await authenticate())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const content = await readArchiveById(id);
  if (content === null) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="ST&T_REPORT_${id}.csv"`,
    },
  });
}

// DELETE /api/analytics/reports/[id] — delete an archived report
export async function DELETE(_req: NextRequest, { params }: Context) {
  if (!(await authenticate())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteArchiveById(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
