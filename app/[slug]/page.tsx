import { getStoreBySlug, getStores } from '@/lib/storeService';
import { notFound } from 'next/navigation';
import Hero from '@/components/store/Hero';
import ServiceList from '@/components/store/ServiceList';
import StoreMap from '@/components/store/StoreMap';
import StoreHoursList from '@/components/store/StoreHours';
import BookingSection from '@/components/store/BookingSection';
import Navbar from '@/components/store/Navbar';
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  const allStores = await getStores();

  if (!store) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem', background: '#ffffff' }}>
      <Navbar allStores={allStores} />
      <Hero 
        name={store.name}
        location={store.locationName}
        phone={store.phone}
        address={store.address}
        imageUrl={store.imageUrl}
      />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <ServiceList services={store.services} />
        
        <BookingSection storeName={store.name} storeSlug={store.slug} />

        <div id="contacts" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', margin: '6rem 0', alignItems: 'start' }}>
          <div>
            <StoreHoursList hours={store.hours} accentColor={store.theme.accent} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Location</h2>
            <StoreMap mapUrl={store.mapUrl} address={store.address} />
            
            <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: '#f1f5f9', p: '0.5rem', borderRadius: '0.5rem', display: 'flex', padding: '0.5rem' }}>
                  <MapPin size={20} style={{ color: '#64748b' }} />
                </div>
                <p style={{ color: '#1e293b', fontSize: '1.1rem', margin: 0 }}>{store.address}</p>
              </div>

              <a href={`tel:${store.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <div style={{ background: '#f1f5f9', p: '0.5rem', borderRadius: '0.5rem', display: 'flex', padding: '0.5rem' }}>
                  <Phone size={20} style={{ color: '#3b82f6' }} />
                </div>
                <p style={{ color: '#3b82f6', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{store.phone}</p>
              </a>

              <a href={`mailto:${store.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <div style={{ background: '#f1f5f9', p: '0.5rem', borderRadius: '0.5rem', display: 'flex', padding: '0.5rem' }}>
                  <Mail size={20} style={{ color: '#64748b' }} />
                </div>
                <p style={{ color: '#1e293b', fontSize: '1.1rem', margin: 0 }}>{store.email}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
