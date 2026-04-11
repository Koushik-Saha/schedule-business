'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface StoreMapProps {
  mapUrl: string;
  address: string;
}

export default function StoreMap({ mapUrl, address }: StoreMapProps) {
  // Convert embed URL to a direct Google Maps link for the "Open in Maps" button
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // Generate a pinpointed embed URL from the address to ensure a red marker appears
  const pinpointedEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '1rem', overflow: 'hidden', height: '450px', margin: '2rem 0' }}>
      <iframe
        src={pinpointedEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <a 
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'white',
          padding: '0.75rem 1.25rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          color: '#3b82f6',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: '0.9rem',
          zIndex: 10
        }}
      >
        <span>Open in Maps</span>
        <ExternalLink size={16} />
      </a>
    </div>
  );
}
