'use client';

import React, { useState } from 'react';
import BookingModal from './BookingModal';

interface BookingSectionProps {
  storeName: string;
  storeSlug: string;
}

export default function BookingSection({ storeName, storeSlug }: BookingSectionProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div style={{ textAlign: 'center', margin: '4rem 0' }}>
        <button 
          onClick={() => setIsBookingOpen(true)}
          style={{
            background: 'var(--accent)',
            color: 'white',
            padding: '1.25rem 3rem',
            borderRadius: '1.5rem',
            border: 'none',
            fontWeight: 800,
            fontSize: '1.25rem',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
        >
          Book Appointment
        </button>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        storeName={storeName} 
        storeSlug={storeSlug}
      />
    </>
  );
}
