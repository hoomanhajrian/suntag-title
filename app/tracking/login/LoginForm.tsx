'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/tracking');
        router.refresh();
      } else {
        setError('Invalid username or password.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-widest text-text-base/40 mb-2">
          Username
        </label>
        <input
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-background border border-blue-base/30 rounded-sm px-4 py-3 text-text-base text-sm focus:outline-none focus:border-gold-base transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-text-base/40 mb-2">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-background border border-blue-base/30 rounded-sm px-4 py-3 text-text-base text-sm focus:outline-none focus:border-gold-base transition-colors"
        />
      </div>

      {error && (
        <p className="text-red-base text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gold-base text-background font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-gold-light transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
      <Link href="/" className="block text-center text-sm text-text-base/50 hover:text-text-base transition-colors duration-200">
        Back to website
      </Link>
    </form>
  );
}
