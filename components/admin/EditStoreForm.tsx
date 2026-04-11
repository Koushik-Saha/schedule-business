'use client';

import React from 'react';
import { updateStoreAction } from '@/lib/actions';
import { Store } from '@/lib/storeService';
import AddressAutocomplete from './AddressAutocomplete';

interface EditStoreFormProps {
  store: Store;
}

export default function EditStoreForm({ store }: EditStoreFormProps) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [lat, setLat] = React.useState<number | string>(store.latitude || '');
  const [lng, setLng] = React.useState<number | string>(store.longitude || '');
  const [mapUrl, setMapUrl] = React.useState(store.mapUrl);
  const [address, setAddress] = React.useState(store.address);

  const handleAddressSelect = (data: { formattedAddress: string, lat: number, lng: number }) => {
    setAddress(data.formattedAddress);
    setLat(data.lat);
    setLng(data.lng);
    
    // Automatically generate the pinpointed map URL
    const generatedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(data.formattedAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    setMapUrl(generatedMapUrl);
  };

  const handleSubmit = async (formData: FormData) => {
    await updateStoreAction(formData, store.slug);
  };

  return (
    <form action={handleSubmit} style={{ display: 'grid', gap: '2rem', background: '#f8fafc', padding: '3rem', borderRadius: '2rem', border: '1px solid #e2e8f0' }}>
      <section style={{ display: 'grid', gap: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Basic Information</h3>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Business Name</label>
            <input name="name" required defaultValue={store.name} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Location Name</label>
            <input name="locationName" required defaultValue={store.locationName} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Phone Number</label>
            <input name="phone" required defaultValue={store.phone} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Store Email</label>
            <input name="email" type="email" required defaultValue={store.email} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Notification Email</label>
            <input name="notificationEmail" type="email" required defaultValue={store.notificationEmail || ''} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600 }}>Full Address (Search for exact location)</label>
          <AddressAutocomplete 
            name="address" 
            defaultValue={address} 
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
          <input name="imageUrl" defaultValue={store.imageUrl} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
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
              <input name={day.toLowerCase()} required defaultValue={(store.hours as any)[day.toLowerCase()]} style={{ padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
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
            <input name="primaryColor" type="color" defaultValue={store.theme.primary} style={{ width: '100%', height: '45px', padding: '0', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Secondary</label>
            <input name="secondaryColor" type="color" defaultValue={store.theme.secondary} style={{ width: '100%', height: '45px', padding: '0', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Accent</label>
            <input name="accentColor" type="color" defaultValue={store.theme.accent} style={{ width: '100%', height: '45px', padding: '0', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600 }}>Font Family</label>
          <select name="font" defaultValue={store.theme.font} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}>
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
        Save Changes
      </button>
    </form>
  );
}
