'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>Admin Login</h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>FixUp Store Network</p>

        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontWeight: 600, background: '#fef2f2', padding: '0.75rem', borderRadius: '0.5rem' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '1rem' }}
            />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{
            background: '#0f172a',
            color: 'white',
            padding: '1rem',
            borderRadius: '1rem',
            border: 'none',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '0.5rem',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
