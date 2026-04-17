// Uses Web Crypto API — works in both Node.js 18+ and Edge Runtime

// Session duration in seconds — default 7 days, override via TRACKING_SESSION_HOURS
export function sessionMaxAge(): number {
  const hours = parseInt(process.env.TRACKING_SESSION_HOURS ?? '168', 10);
  return (isNaN(hours) || hours < 1 ? 168 : hours) * 3600;
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Token format: "<expiresAtMs>.<hmac(username:expiresAtMs, password)>"
export async function signSession(username: string): Promise<string> {
  const secret   = process.env.TRACKING_PASSWORD ?? '';
  const expiresAt = Date.now() + sessionMaxAge() * 1000;
  const payload  = `${username}:${expiresAt}`;
  const sig      = await hmacHex(payload, secret);
  return `${expiresAt}.${sig}`;
}

export async function verifySession(token: string): Promise<boolean> {
  const username = process.env.TRACKING_USERNAME ?? '';
  const secret   = process.env.TRACKING_PASSWORD ?? '';
  if (!username || !secret || !token) return false;

  const dotIdx = token.indexOf('.');
  if (dotIdx === -1) return false;

  const expiresAt = parseInt(token.slice(0, dotIdx), 10);
  const sig       = token.slice(dotIdx + 1);

  // Check expiry first (fast path)
  if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

  const payload  = `${username}:${expiresAt}`;
  const expected = await hmacHex(payload, secret);

  // Constant-time comparison
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}
