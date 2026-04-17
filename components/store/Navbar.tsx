'use client';

import React from 'react';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function Navbar() {
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
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      padding: '1rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem'
      }}>
        {/* Products */}
        <button
          onClick={() => scrollToSection('products')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#1e293b',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#3b82f6')}
          onMouseLeave={e => (e.currentTarget.style.color = '#1e293b')}
        >
          Products
        </button>

        {/* Outlets — button navigating to all-stores page */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#0f172a',
            color: 'white',
            padding: '0.55rem 1.25rem',
            borderRadius: '2rem',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1e293b')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0f172a')}
        >
          <Store size={16} />
          All Outlets
        </Link>

        {/* Contacts */}
        <button
          onClick={() => scrollToSection('contacts')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#1e293b',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#3b82f6')}
          onMouseLeave={e => (e.currentTarget.style.color = '#1e293b')}
        >
          Contacts
        </button>
      </div>
    </nav>
  );
}
