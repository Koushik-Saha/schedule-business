'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Store, MapPin } from 'lucide-react';

interface StoreInfo {
  id: string;
  slug: string;
  name: string;
  locationName: string;
}

interface NavbarProps {
  allStores: StoreInfo[];
}

export default function Navbar({ allStores }: NavbarProps) {
  const [isOutletsOpen, setIsOutletsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      padding: '1rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4rem'
      }}>
        {/* Products */}
        <button 
          onClick={() => scrollToSection('products')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#1e293b',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            transition: 'color 0.2s'
          }}
        >
          Products
        </button>

        {/* Outlets Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onMouseEnter={() => setIsOutletsOpen(true)}
            onClick={() => setIsOutletsOpen(!isOutletsOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1e293b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem'
            }}
          >
            Outlets
            <ChevronDown size={20} style={{ transform: isOutletsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          <AnimatePresence>
            {isOutletsOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onMouseLeave={() => setIsOutletsOpen(false)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white',
                  borderRadius: '1.5rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  minWidth: '350px',
                  border: '1px solid #e2e8f0',
                  marginTop: '1rem',
                  display: 'grid',
                  gap: '0.5rem'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em', textAlign: 'center' }}>
                  Our Physical Locations
                </div>
                {allStores.map((store) => (
                  <Link 
                    key={store.id} 
                    href={`/${store.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '1rem',
                      textDecoration: 'none',
                      color: '#1e293b',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Store size={20} color="#3b82f6" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{store.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{store.locationName}</div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contacts */}
        <button 
          onClick={() => scrollToSection('contacts')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#1e293b',
            cursor: 'pointer',
            padding: '0.5rem 1rem'
          }}
        >
          Contacts
        </button>
      </div>
    </nav>
  );
}
