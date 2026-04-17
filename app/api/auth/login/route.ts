import { NextRequest, NextResponse } from 'next/server';
import { signSession, sessionMaxAge } from '@/lib/auth';

function safeEqual(a: string, b: string): boolean {
  // Constant-time compare via HMAC of both strings
  // Same length buffers always — pad to max length first
  const maxLen = Math.max(a.length, b.length);
  let diff = a.length !== b.length ? 1 : 0;
  for (let i = 0; i < maxLen; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const envUser = process.env.TRACKING_USERNAME ?? '';
    const envPass = process.env.TRACKING_PASSWORD ?? '';

    if (
      !envUser ||
      !envPass ||
      !safeEqual(username ?? '', envUser) ||
      !safeEqual(password ?? '', envPass)
    ) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signSession(username);
    const response = NextResponse.json({ ok: true });
    response.cookies.set('tracking_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: sessionMaxAge(),
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
