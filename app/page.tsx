export const dynamic = 'force-dynamic';

import { getStores } from '@/lib/storeService';
import Link from 'next/link';
import React from 'react';
import StoreListWithLocation from '@/components/store/StoreListWithLocation';

export default async function RootPage() {
  const stores = await getStores();

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', fontFamily: 'Inter, sans-serif', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FixUp Store Network
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
            Find your nearest professional repair store and book an appointment in seconds. 
            Premium quality parts and expert technicians at every location.
          </p>
        </header>
        
        <StoreListWithLocation initialStores={stores} />
        
        <footer style={{ marginTop: '6rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b' }}>© 2026 FixUp Group. All rights reserved.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
            <Link href="/admin" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
              Admin Portal
            </Link>
            <Link href="/login" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>
              Admin Login
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
