import { getStoreBySlug } from '@/lib/storeService';
import { notFound } from 'next/navigation';
import EditStoreForm from '@/components/admin/EditStoreForm';
import React from 'react';

export default async function EditStorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '900px', margin: '4rem auto', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Edit Store: {store.name}</h1>
      <EditStoreForm store={store} />
    </div>
  );
}
