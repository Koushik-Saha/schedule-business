export const dynamic = 'force-dynamic';

import { getStores } from '@/lib/storeService';
import Link from 'next/link';
import React from 'react';
import { Plus, ExternalLink, Edit } from 'lucide-react';
import NotificationEmailEditor from '@/components/admin/NotificationEmailEditor';

export default async function AdminDashboard() {
  const stores = await getStores();

  return (
    <div style={{ maxWidth: '1100px', margin: '4rem auto', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Store Management</h1>
          <p style={{ color: '#64748b' }}>Managing {stores.length} store websites</p>
        </div>
        <Link href="/admin/new" style={{
          background: '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}>
          <Plus size={20} />
          <span>Add New Store</span>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {stores.map((store) => (
          <div key={store.id} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{store.name}</h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{store.locationName}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: store.theme.primary, border: '2px solid #e2e8f0' }} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', color: '#475569' }}>
                  /{store.slug}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#475569', display: 'grid', gap: '0.25rem' }}>
              <p style={{ margin: 0 }}><strong>Phone:</strong> {store.phone || <span style={{ color: '#94a3b8' }}>Not set</span>}</p>
              <p style={{ margin: 0 }}><strong>Store email:</strong> {store.email}</p>
            </div>

            <NotificationEmailEditor storeSlug={store.slug} currentEmail={store.notificationEmail || ''} />

            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
              <Link href={`/${store.slug}`} target="_blank" style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.6rem',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                color: '#0f172a',
              }}>
                <ExternalLink size={14} />
                <span>Visit</span>
              </Link>
              <Link href={`/admin/edit/${store.slug}`} style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.6rem',
                borderRadius: '0.5rem',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: '#0f172a',
                textDecoration: 'none',
              }}>
                <Edit size={14} />
                <span>Full Edit</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
