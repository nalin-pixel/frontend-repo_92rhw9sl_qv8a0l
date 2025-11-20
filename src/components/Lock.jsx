import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || '';

export default function Lock({ t, onUnlock }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (!res.ok) throw new Error('invalid');
      const data = await res.json();
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authRole', data.role);
      onUnlock?.(data);
    } catch (e) {
      setError(t('invalidPassword'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0e] text-[#e9e5f2] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_-10%,rgba(122,78,203,0.25),transparent),radial-gradient(800px_400px_at_30%_110%,rgba(208,179,111,0.18),transparent)]" />
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-[#d0b36f] uppercase tracking-[0.35em] text-xs mb-2">{t('brand')}</div>
            <h1 className="text-2xl font-[Marcellus]">{t('lockTitle')}</h1>
            <p className="text-white/70 mt-1">{t('lockSubtitle')}</p>
          </div>
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              required
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button disabled={loading} className="w-full px-4 py-2 rounded-lg bg-[#7a4ecb] hover:bg-[#6a41b5] disabled:opacity-60">
              {loading ? t('loading') : t('unlock')}
            </button>
          </form>
        </div>
        <p className="text-center text-white/40 text-xs mt-6">© 2026 M&M</p>
      </div>
    </div>
  );
}
