'use client';

import React, { useState, useEffect } from 'react';
import { Store } from '@/lib/storeService';
import Link from 'next/link';
import { MapPin, Phone, ExternalLink, Navigation } from 'lucide-react';

interface StoreListWithLocationProps {
  initialStores: Store[];
}

export default function StoreListWithLocation({ initialStores }: StoreListWithLocationProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [sortedStores, setSortedStores] = useState<Store[]>(initialStores);
  const [distances, setDistances] = useState<Record<string, string>>({});

  // Haversine formula to calculate distance in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Calculate distances and sort
          const storesWithDistance = initialStores.map(store => {
            if (store.latitude && store.longitude) {
              const distance = calculateDistance(latitude, longitude, store.latitude, store.longitude);
              return { ...store, distance };
            }
            return { ...store, distance: Infinity };
          });

          // Sort by distance
          const sorted = [...storesWithDistance].sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          // Map distance strings
          const distanceMap: Record<string, string> = {};
          storesWithDistance.forEach(s => {
            if (s.distance !== Infinity) {
              distanceMap[s.id] = s.distance!.toFixed(1) + ' miles';
            }
          });

          setSortedStores(sorted);
          setDistances(distanceMap);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, [initialStores]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
      {sortedStores.map((store, index) => (
        <div key={store.id} style={{ 
          background: 'white', 
          borderRadius: '2rem', 
          overflow: 'hidden', 
          boxShadow: index === 0 && userLocation ? '0 20px 40px -5px rgba(59, 130, 246, 0.15)' : '0 10px 30px -5px rgba(0,0,0,0.05)',
          border: index === 0 && userLocation ? '2px solid #3b82f6' : '1px solid #e2e8f0',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          position: 'relative'
        }}>
          {index === 0 && userLocation && store.latitude && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: '#3b82f6',
              color: 'white',
              padding: '0.4rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              zIndex: 10
            }}>
              <Navigation size={14} fill="white" />
              Nearest to you
            </div>
          )}

          <div style={{ height: '200px', background: `url(${store.imageUrl}) center/cover` }} />
          <div style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{store.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <p style={{ color: '#3b82f6', fontWeight: 700 }}>{store.locationName}</p>
              {distances[store.id] && (
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{distances[store.id]} away</span>
              )}
            </div>
            
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b' }}>
                <MapPin size={18} />
                <span style={{ fontSize: '0.95rem' }}>{store.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b' }}>
                <Phone size={18} />
                <span style={{ fontSize: '0.95rem' }}>{store.phone}</span>
              </div>
            </div>

            <Link href={`/${store.slug}`} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: index === 0 && userLocation ? '#3b82f6' : '#0f172a',
              color: 'white',
              padding: '1rem',
              borderRadius: '1rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}>
              <span>Book at this Location</span>
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
