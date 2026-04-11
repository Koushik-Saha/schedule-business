'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h1>
        
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} 
            />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} 
            />
          </div>
          <button type="submit" style={{
            background: '#0f172a',
            color: 'white',
            padding: '1rem',
            borderRadius: '1rem',
            border: 'none',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', color: '#64748b', marginTop: '2rem', fontSize: '0.9rem' }}>
          Default logic: admin / admin123
        </p>
      </div>
    </div>
  );
}
