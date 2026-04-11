'use client';

import { createStoreAction } from '@/lib/actions';
import React, { useState } from 'react';
import AddressAutocomplete from '@/components/admin/AddressAutocomplete';

export default function NewStorePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [lat, setLat] = useState<number | string>('');
  const [lng, setLng] = useState<number | string>('');
  const [mapUrl, setMapUrl] = useState('');
  const [address, setAddress] = useState('');

  const handleAddressSelect = (data: { formattedAddress: string, lat: number, lng: number }) => {
    setAddress(data.formattedAddress);
    setLat(data.lat);
    setLng(data.lng);

    // Automatically generate the pinpointed map URL
    const generatedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(data.formattedAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    setMapUrl(generatedMapUrl);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '4rem auto', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Create New Store</h1>
      
      <form action={createStoreAction} style={{ display: 'grid', gap: '2rem', background: '#f8fafc', padding: '3rem', borderRadius: '2rem', border: '1px solid #e2e8f0' }}>
        <section style={{ display: 'grid', gap: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Basic Information</h3>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Business Name</label>
              <input name="name" required placeholder="e.g. Max Phone Repair" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Location Name</label>
              <input name="locationName" required placeholder="e.g. Santa Barbara" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Phone Number</label>
              <input name="phone" required placeholder="(818) 402-4931" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Store Email</label>
              <input name="email" type="email" required placeholder="store@example.com" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Notification Email</label>
              <input name="notificationEmail" type="email" required placeholder="bookings@example.com" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Full Address (Search for exact location)</label>
            <AddressAutocomplete 
              name="address" 
              onAddressSelect={handleAddressSelect} 
              placeholder="Search for an address..."
            />
          </div>
        </section>

        <hr style={{ border: '0', borderTop: '1px solid #e2e8f0' }} />

        <section style={{ display: 'grid', gap: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Media & Location</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Store Image URL</label>
            <input name="imageUrl" placeholder="/images/store-exterior.png" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Google Maps Embed URL (Generated automatically if left blank)</label>
            <input key={mapUrl} name="mapUrl" defaultValue={mapUrl} placeholder="Optional override" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Latitude</label>
              <input key={lat} name="latitude" type="number" step="any" required defaultValue={lat} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Longitude</label>
              <input key={lng} name="longitude" type="number" step="any" required defaultValue={lng} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
            </div>
          </div>
        </section>

        <hr style={{ border: '0', borderTop: '1px solid #e2e8f0' }} />

        <section style={{ display: 'grid', gap: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Operating Hours</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            {days.map(day => (
              <div key={day} style={{ display: 'grid', gap: '0.25rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>{day}</label>
                <input name={day.toLowerCase()} required defaultValue="10:00 a.m. - 8:00 p.m." style={{ padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: '0', borderTop: '1px solid #e2e8f0' }} />

        <section style={{ display: 'grid', gap: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Branding</h3>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Primary</label>
              <input name="primaryColor" type="color" defaultValue="#0f172a" style={{ width: '100%', height: '45px', padding: '0', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Secondary</label>
              <input name="secondaryColor" type="color" defaultValue="#334155" style={{ width: '100%', height: '45px', padding: '0', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Accent</label>
              <input name="accentColor" type="color" defaultValue="#3b82f6" style={{ width: '100%', height: '45px', padding: '0', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Font Family</label>
            <select name="font" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}>
              <option value="Inter">Inter (Clean, Modern)</option>
              <option value="Outfit">Outfit (Premium, Tech)</option>
              <option value="Roboto">Roboto (Classic)</option>
            </select>
          </div>
        </section>

        <button type="submit" style={{
          background: '#0f172a',
          color: 'white',
          padding: '1.25rem',
          borderRadius: '1rem',
          border: 'none',
          fontWeight: 800,
          fontSize: '1.25rem',
          marginTop: '1rem',
          cursor: 'pointer',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
        }}>
          Create Store Website
        </button>
      </form>
    </div>
  );
}
