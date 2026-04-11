'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  name: string;
  price: string;
}

interface ServiceListProps {
  services: Service[];
}

export default function ServiceList({ services }: ServiceListProps) {
  return (
    <div id="products" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>
        Our Services
      </h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              background: '#f8fafc',
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            whileHover={{ 
              backgroundColor: '#f1f5f9',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
              borderColor: 'var(--accent)'
            }}
          >
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{service.name}</span>
            <span style={{ 
              background: 'var(--accent)', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '2rem',
              fontWeight: 700
            }}>
              {service.price}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
