'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  name: string;
  location: string;
  phone: string;
  address: string;
  imageUrl: string;
}

export default function Hero({ name, location, phone, address, imageUrl }: HeroProps) {
  return (
    <div 
      className="hero-container" 
      style={{
        padding: '6rem 2rem',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        borderRadius: '0 0 3rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>{name}</h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: '2.5rem', fontWeight: 500 }}>{location}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={24} />
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{phone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={24} />
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={24} />
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Open: 10 AM - 8 PM</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
