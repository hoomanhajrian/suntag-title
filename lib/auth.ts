// Uses Web Crypto API — works in both Node.js 18+ and Edge Runtime

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

export async function signSession(username: string): Promise<string> {
  const secret = process.env.TRACKING_PASSWORD ?? '';
  return hmacHex(username, secret);
}

export async function verifySession(token: string): Promise<boolean> {
  const username = process.env.TRACKING_USERNAME ?? '';
  if (!username || !token) return false;
  const expected = await signSession(username);
  // Constant-time comparison (same length guaranteed — hex of SHA-256 is always 64 chars)
  if (expected.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return diff === 0;
}
