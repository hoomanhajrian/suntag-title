'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/tracking/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-text-base/60 border border-text-base/20 rounded-sm hover:border-red-base hover:text-red-base transition-colors duration-200"
    >
      Sign Out
    </button>
  );
}
