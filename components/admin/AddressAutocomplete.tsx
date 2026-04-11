'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface AddressAutocompleteProps {
  onAddressSelect: (addressData: {
    formattedAddress: string;
    lat: number;
    lng: number;
  }) => void;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
}

export default function AddressAutocomplete({ 
  onAddressSelect, 
  defaultValue = '', 
  placeholder = 'Search for a location...', 
  name = 'address' 
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // Using Nominatim (OpenStreetMap) - Free and no API key required
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'FixUp-Store-Network'
          }
        });
        const data = await response.json();
        setResults(data);
        setShowDropdown(data.length > 0);
      } catch (error) {
        console.error('Geocoding error:', error);
      } finally {
        setLoading(false);
      }
    }, 600); // 600ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: any) => {
    const data = {
      formattedAddress: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    };
    setQuery(item.display_name);
    setResults([]);
    setShowDropdown(false);
    onAddressSelect(data);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
      <div style={{ position: 'relative' }}>
        <input
          name={name}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && results.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          required
          style={{ 
            padding: '0.75rem 1rem 0.75rem 2.8rem', 
            borderRadius: '0.5rem', 
            border: '1px solid #cbd5e1',
            width: '100%',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          autoComplete="off"
        />
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
        </div>
      </div>

      {showDropdown && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          marginTop: '0.5rem',
          background: 'white', 
          borderRadius: '0.75rem', 
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          zIndex: 50,
          overflow: 'hidden'
        }}>
          {results.map((item, index) => (
            <div
              key={item.place_id || index}
              onClick={() => handleSelect(item)}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                gap: '1rem',
                alignItems: 'start',
                transition: 'background 0.2s',
                borderBottom: index === results.length - 1 ? 'none' : '1px solid #f1f5f9'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
            >
              <div style={{ marginTop: '0.2rem', color: '#94a3b8' }}>
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.2rem' }}>
                  {item.display_name.split(',')[0]}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {item.display_name.split(',').slice(1).join(',')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
