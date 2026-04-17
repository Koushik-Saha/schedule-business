'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';

const products = [
  {
    id: 'p1',
    name: 'Tempered Glass Screen Protector',
    category: 'Protection',
    price: '$9.99',
    originalPrice: '$19.99',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    badgeColor: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80',
    description: 'Ultra-clear 9H hardness. Fits iPhone & Samsung.',
  },
  {
    id: 'p2',
    name: 'MagSafe Wireless Charger 15W',
    category: 'Charging',
    price: '$24.99',
    originalPrice: '$39.99',
    rating: 4.7,
    reviews: 89,
    badge: 'Sale',
    badgeColor: '#ef4444',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80',
    description: '15W fast wireless charging pad for all Qi devices.',
  },
  {
    id: 'p3',
    name: 'Heavy Duty Phone Case',
    category: 'Cases',
    price: '$14.99',
    originalPrice: null,
    rating: 4.9,
    reviews: 210,
    badge: 'Top Rated',
    badgeColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&q=80',
    description: 'Military-grade drop protection. Available for all models.',
  },
  {
    id: 'p4',
    name: 'USB-C Fast Charging Cable 6ft',
    category: 'Cables',
    price: '$7.99',
    originalPrice: '$12.99',
    rating: 4.6,
    reviews: 178,
    badge: null,
    badgeColor: '',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80',
    description: '60W braided nylon USB-C to USB-C, 6ft length.',
  },
  {
    id: 'p5',
    name: 'Portable Power Bank 20,000mAh',
    category: 'Power',
    price: '$34.99',
    originalPrice: '$59.99',
    rating: 4.8,
    reviews: 95,
    badge: 'Popular',
    badgeColor: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80',
    description: 'Charge 3 devices simultaneously. Compact & lightweight.',
  },
  {
    id: 'p6',
    name: 'Lightning to USB-C Adapter',
    category: 'Adapters',
    price: '$5.99',
    originalPrice: null,
    rating: 4.5,
    reviews: 67,
    badge: null,
    badgeColor: '',
    image: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=400&q=80',
    description: 'Seamlessly connect Lightning accessories to USB-C ports.',
  },
];

export default function ProductsSection() {
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (id: string) => {
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>
          Shop Accessories
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          Premium phone accessories available in-store. Pick up same day.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            style={{
              background: 'white',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default',
              position: 'relative',
            }}
            whileHover={{
              y: -4,
              boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)',
            }}
          >
            {/* Badge */}
            {product.badge && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: product.badgeColor,
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.3rem 0.75rem',
                borderRadius: '2rem',
                zIndex: 10,
                letterSpacing: '0.03em',
              }}>
                {product.badge}
              </div>
            )}

            {/* Image */}
            <div style={{
              height: '200px',
              background: '#f8fafc',
              overflow: 'hidden',
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                {product.category}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                {product.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem', lineHeight: 1.5 }}>
                {product.description}
              </p>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                      style={{ color: '#f59e0b' }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price + Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>{product.price}</span>
                  {product.originalPrice && (
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={() => handleAdd(product.id)}
                  style={{
                    background: added === product.id ? '#10b981' : 'var(--accent, #3b82f6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    padding: '0.6rem 1rem',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'background 0.2s',
                  }}
                >
                  <ShoppingCart size={15} />
                  {added === product.id ? 'Added!' : 'Add'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
        Visit us in-store for full inventory and pricing. All accessories come with a 30-day warranty.
      </p>
    </div>
  );
}
