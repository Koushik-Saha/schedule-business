'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Store, StoreTheme } from '@/lib/storeService';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  Search, 
  Navigation, 
  Compass, 
  Shield, 
  Calendar, 
  Sparkles,
  Award,
  ChevronRight,
  ExternalLink,
  Mail,
  Wrench,
  ShoppingBag
} from 'lucide-react';

interface StoreListWithLocationProps {
  initialStores: Store[];
}

export default function StoreListWithLocation({ initialStores }: StoreListWithLocationProps) {
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'freedom' | 'fixup' | 'max'>('all');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);
  const [mapTab, setMapTab] = useState<'map' | 'list'>('map');

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('store_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = favorites.includes(slug)
      ? favorites.filter(s => s !== slug)
      : [...favorites, slug];
    setFavorites(updated);
    localStorage.setItem('store_favorites', JSON.stringify(updated));
  };

  // Geolocation trigger
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to retrieve your location. Please search manually or check browser permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Haversine formula to calculate distance in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Process and filter stores
  const processedStores = useMemo(() => {
    let list = initialStores.map(store => {
      let distance = Infinity;
      if (userLocation && store.latitude && store.longitude) {
        distance = calculateDistance(userLocation.lat, userLocation.lng, store.latitude, store.longitude);
      }
      return { ...store, distance };
    });

    // 1. Geolocation sorting if user location is available
    if (userLocation) {
      list.sort((a, b) => a.distance - b.distance);
    }

    // 2. Brand filter
    if (selectedBrand !== 'all') {
      list = list.filter(store => {
        const theme = store.theme as any;
        return theme?.brand === selectedBrand;
      });
    }

    // 3. State filter
    if (selectedState) {
      list = list.filter(store => {
        const stateCode = store.address.includes('NV') ? 'Nevada' : store.address.includes('CA') ? 'California' : '';
        return stateCode.toLowerCase() === selectedState.toLowerCase();
      });
    }

    // 4. City filter
    if (selectedCity) {
      list = list.filter(store => {
        return store.address.toLowerCase().includes(selectedCity.toLowerCase()) || 
               store.locationName.toLowerCase().includes(selectedCity.toLowerCase());
      });
    }

    // 5. Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(store => 
        store.name.toLowerCase().includes(q) ||
        store.locationName.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.phone.toLowerCase().includes(q)
      );
    }

    return list;
  }, [initialStores, searchQuery, selectedBrand, selectedState, selectedCity, userLocation]);

  // Set active store to the first one in the list on filter change
  useEffect(() => {
    if (processedStores.length > 0) {
      setActiveStoreId(processedStores[0].id);
    } else {
      setActiveStoreId(null);
    }
  }, [processedStores]);

  // Find active store object
  const activeStore = useMemo(() => {
    return processedStores.find(s => s.id === activeStoreId) || processedStores[0] || null;
  }, [processedStores, activeStoreId]);

  // Dynamic theme colors depending on selected brand
  const themeAccent = useMemo(() => {
    switch (selectedBrand) {
      case 'freedom':
        return '#3b82f6'; // Indigo/Blue
      case 'fixup':
        return '#10b981'; // Emerald Green
      case 'max':
        return '#3b82f6'; // Red/Blue
      default:
        return '#3b82f6'; // Royal Blue
    }
  }, [selectedBrand]);

  const themeAccentHover = useMemo(() => {
    switch (selectedBrand) {
      case 'freedom':
        return '#1d4ed8';
      case 'fixup':
        return '#047857';
      case 'max':
        return '#1d4ed8';
      default:
        return '#1d4ed8';
    }
  }, [selectedBrand]);

  // Set CSS Custom Variables for dynamic styling
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', themeAccent);
    document.documentElement.style.setProperty('--accent-hover', themeAccentHover);
  }, [themeAccent, themeAccentHover]);

  // Helper: check if store is open
  // For demo purposes, we will return "Open Now" if the current time is between 10 AM and 8 PM, or check the business hours JSON
  const getStoreStatus = (hours: any) => {
    const now = new Date();
    const day = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    const storeHours = hours[day] || hours['monday'] || '10:00 AM - 8:00 PM';
    
    if (storeHours === 'Closed') return { label: 'Closed', color: '#ef4444' };
    
    // Quick parse: assume standard 10 AM - 8 PM format
    const currentHour = now.getHours();
    if (currentHour >= 10 && currentHour < 20) {
      return { label: 'Open Now', color: '#10b981' };
    }
    return { label: 'Closed Now', color: '#64748b' };
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 1. Header (Navbar) */}
      <header style={{
        background: '#0a0e1a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '0 2rem',
      }}>
        <div className="header-nav" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px',
          position: 'relative',
          width: '100%'
        }}>
          {/* Logo container with slanted styling */}
          <div className="header-logo" style={{
            background: 'white',
            padding: '0.8rem 2.5rem 0.8rem 1.5rem',
            marginRight: 'auto',
            clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            height: '80px',
            position: 'absolute',
            left: '-2rem',
            top: 0,
            boxShadow: '4px 0 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              background: '#2563eb',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(37,99,235,0.2)'
            }}>
              <MapPin size={20} color="white" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1 }}>Our Store</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 950, color: '#1e3a8a', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1 }}>Network</span>
            </div>
          </div>

          {/* Spacer to push navbar menu to the right */}
          <div className="header-spacer" style={{ width: '220px' }}></div>

          {/* Brands Selection Tabs */}
          <div className="brands-tabs" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button
              onClick={() => { setSelectedBrand('freedom'); setSelectedState(null); setSelectedCity(null); }}
              style={{
                background: selectedBrand === 'freedom' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: 'none',
                color: selectedBrand === 'freedom' ? '#60a5fa' : '#94a3b8',
                padding: '0.6rem 1.2rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: selectedBrand === 'freedom' ? '2px solid #2563eb' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <ShoppingBag size={18} />
              <span>Freedom Shopping LLC</span>
            </button>

            <button
              onClick={() => { setSelectedBrand('fixup'); setSelectedState(null); setSelectedCity(null); }}
              style={{
                background: selectedBrand === 'fixup' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: 'none',
                color: selectedBrand === 'fixup' ? '#34d399' : '#94a3b8',
                padding: '0.6rem 1.2rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: selectedBrand === 'fixup' ? '2px solid #10b981' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <Wrench size={18} />
              <span>FixUp LLC</span>
            </button>

            <button
              onClick={() => { setSelectedBrand('max'); setSelectedState(null); setSelectedCity(null); }}
              style={{
                background: selectedBrand === 'max' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: 'none',
                color: selectedBrand === 'max' ? '#f43f5e' : '#94a3b8',
                padding: '0.6rem 1.2rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: selectedBrand === 'max' ? '2px solid #ef4444' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#f43f5e' }}>M</div>
              <span>Max Universal Inc.</span>
            </button>

            {selectedBrand !== 'all' && (
              <button 
                onClick={() => { setSelectedBrand('all'); setSelectedState(null); setSelectedCity(null); }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Contact Button */}
          <Link href="#footer" style={{
            background: '#ffffff',
            color: '#0f172a',
            padding: '0.6rem 1.25rem',
            borderRadius: '2rem',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(255,255,255,0.1)',
            transition: 'transform 0.2s'
          }}
            className="btn-hover"
          >
            <Phone size={14} fill="#0f172a" />
            <span>Contact Us</span>
          </Link>
        </div>
      </header>

      {/* 2. Hero Section (Gradient Dark Blue) */}
      <section style={{
        background: 'radial-gradient(ellipse at top, #0f2347 0%, #030712 100%)',
        padding: '5.5rem 2rem 7.5rem 2rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }} className="hero-grid">
        <div className="hero-content-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Hero Left Content */}
          <div style={{ zIndex: 10 }}>
            <h1 style={{
              fontSize: '4.5rem',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              background: 'linear-gradient(to right, #ffffff 60%, #93c5fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Find a Store Near You
            </h1>
            <p style={{
              fontSize: '1.35rem',
              color: '#94a3b8',
              marginBottom: '3rem',
              fontWeight: 450,
              maxWidth: '560px'
            }}>
              Search our locations by ZIP code, city, or area. Get expert repair work, body jewelry, and toys.
            </p>

            {/* Interactive Search Bar */}
            <div className="hero-search-wrapper" style={{
              position: 'relative',
              maxWidth: '620px',
              marginBottom: '2rem',
              width: '100%'
            }}>
              <div className="search-bar-inner" style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                borderRadius: '1.5rem',
                padding: '0.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div className="search-input-wrapper" style={{ display: 'flex', alignItems: 'center', flex: 1, width: '100%' }}>
                  <div style={{ paddingLeft: '1.25rem', display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                    <Search size={22} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter ZIP Code, City, or Area..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      padding: '1rem',
                      fontSize: '1.15rem',
                      fontWeight: 500,
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  />
                </div>
                <button
                  onClick={() => setSearchQuery(searchQuery)}
                  style={{
                    background: 'var(--accent-color)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '1.15rem',
                    padding: '0.9rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.2s'
                  }}
                >
                  <span>Search Stores</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="hero-action-buttons" style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={requestLocation}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '1rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s'
                }}
                className="btn-hover"
              >
                <Compass size={18} />
                <span>Use My Location</span>
              </button>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setSelectedState(null);
                  setSelectedCity(null);
                  setUserLocation(null);
                }}
                style={{
                  background: '#ffffff',
                  border: 'none',
                  color: '#0f172a',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '1rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'all 0.2s'
                }}
                className="btn-hover"
              >
                <MapPin size={18} />
                <span>View All Stores</span>
              </button>
            </div>
          </div>

          {/* Hero Right Image Frame (isometric 3D effect) */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10
          }} className="float-animation hero-image-frame">
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, var(--accent-color) 0%, transparent 100%)',
              opacity: 0.15,
              borderRadius: '2rem',
              filter: 'blur(20px)'
            }}></div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2.5rem',
              padding: '1.25rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              width: '100%',
              maxWidth: '480px',
              aspectRatio: '1.2'
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '1.75rem',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${activeStore?.imageUrl || '/images/max-phone-repair.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5)'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(3,7,18,0.9) 0%, transparent 100%)',
                  padding: '2rem 1.5rem 1.5rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}>
                  <div>
                    <span style={{
                      background: 'var(--accent-color)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.35rem 0.75rem',
                      borderRadius: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'inline-block',
                      marginBottom: '0.5rem'
                    }}>{activeStore ? (activeStore.theme as any).brandName : 'Store Network'}</span>
                    <h4 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                      {activeStore?.name || 'Search Near You'}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
                      {activeStore?.locationName || 'Multiple Locations Available'}
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <MapPin size={22} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Benefit Cards Section (Overlapping Hero) */}
      <section style={{
        maxWidth: '1280px',
        margin: '-45px auto 4rem auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 50
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '2rem',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f1f5f9',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem'
        }}>
          {/* Card 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              background: '#eff6ff',
              borderRadius: '1.25rem',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Shield size={26} color="#2563eb" />
            </div>
            <div>
              <h5 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>Trusted Service</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Professional & Reliable</p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              background: '#ecfdf5',
              borderRadius: '1.25rem',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Clock size={26} color="#10b981" />
            </div>
            <div>
              <h5 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>Same Day Repair</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Most Completed Same Day</p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              background: '#faf5ff',
              borderRadius: '1.25rem',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Award size={26} color="#8b5cf6" />
            </div>
            <div>
              <h5 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>Warranty Included</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>All Services Warranted</p>
            </div>
          </div>

          {/* Card 4 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              background: '#fff7ed',
              borderRadius: '1.25rem',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Calendar size={26} color="#f97316" />
            </div>
            <div>
              <h5 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>Easy & Convenient</h5>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Walk-in or Book Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Section (Nearest Stores + Map Side-by-Side) */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto 5rem auto',
        padding: '0 2rem'
      }}>
        {/* Section title */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={24} color="var(--accent-color)" />
            <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, color: '#0f172a' }}>Nearest Stores</h2>
          </div>
          <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600 }}>
            Showing {processedStores.length} stores
          </span>
        </div>

        {/* Outer side-by-side container */}
        <div className="store-list-container">
          {/* Stores List (60% width) */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {processedStores.length === 0 ? (
              <div style={{
                background: 'white',
                borderRadius: '2rem',
                border: '1px dashed #cbd5e1',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: '#64748b'
              }}>
                <Compass size={48} style={{ margin: '0 auto 1rem auto', color: '#94a3b8' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155' }}>No Stores Found</h3>
                <p style={{ fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                  We couldn't find any stores matching your current search parameters or locations.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrand('all');
                    setSelectedState(null);
                    setSelectedCity(null);
                    setUserLocation(null);
                  }}
                  style={{
                    background: '#0f172a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '1rem',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              processedStores.map((store, index) => {
                const isFavorite = favorites.includes(store.slug);
                const isActive = store.id === activeStoreId;
                const status = getStoreStatus(store.hours);
                const theme = store.theme as any;

                return (
                  <div
                    key={store.id}
                    onClick={() => {
                      setActiveStoreId(store.id);
                      setMapTab('map');
                    }}
                    className="store-card"
                    style={{
                      background: '#ffffff',
                      borderRadius: '2rem',
                      border: isActive ? `2px solid var(--accent-color)` : '1px solid #e2e8f0',
                      boxShadow: isActive ? '0 15px 35px -5px rgba(59, 130, 246, 0.12)' : '0 4px 20px rgba(0,0,0,0.02)',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease-in-out',
                      transform: isActive ? 'scale(1.01)' : 'scale(1)'
                    }}
                  >
                    {/* Thumbnail wrapper with map position number badge */}
                    <div className="store-card-image">
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        color: 'white',
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                      }}>
                        {index + 1}
                      </div>
                      <div style={{
                        backgroundImage: `url(${store.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                      }} />
                    </div>

                    {/* Store Card Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                      <div>
                        {/* Header Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.4rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                              {store.name}
                            </h3>
                            <span style={{
                              fontSize: '0.75rem',
                              color: status.color,
                              fontWeight: 800,
                              background: status.color + '15',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '0.5rem',
                              whiteSpace: 'nowrap'
                            }}>{status.label}</span>
                          </div>

                          {/* Favorite button */}
                          <button
                            onClick={(e) => toggleFavorite(store.slug, e)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: isFavorite ? '#ef4444' : '#94a3b8',
                              cursor: 'pointer',
                              padding: '0.25rem'
                            }}
                          >
                            <Heart size={20} fill={isFavorite ? '#ef4444' : 'transparent'} />
                          </button>
                        </div>

                        {/* Location Subtitle */}
                        <p style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.9rem', margin: '0 0 0.75rem 0' }}>
                          {store.locationName}
                        </p>

                        {/* Details (Address, Phone, Hours) */}
                        <div style={{ display: 'grid', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <MapPin size={16} color="#94a3b8" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                            <span>{store.address}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Phone size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                            <span>{store.phone}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Clock size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                            <span>{store.hours.monday} (Mon - Sat)</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags & Action Buttons Footer */}
                      <div className="store-card-footer" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid #f1f5f9',
                        paddingTop: '0.8rem'
                      }}>
                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '0.35rem', overflow: 'hidden' }}>
                          {store.services.slice(0, 2).map((service: any) => (
                            <span key={service.id} style={{
                              background: '#f8fafc',
                              color: '#475569',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              padding: '0.25rem 0.6rem',
                              borderRadius: '0.5rem',
                              whiteSpace: 'nowrap'
                            }}>{service.name}</span>
                          ))}
                          {store.services.length > 2 && (
                            <span style={{
                              background: '#f8fafc',
                              color: '#64748b',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '0.25rem 0.6rem',
                              borderRadius: '0.5rem'
                            }}>+{store.services.length - 2}</span>
                          )}
                        </div>

                        {/* Card CTA Actions */}
                        <div className="store-card-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          {store.distance !== Infinity && (
                            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                              {store.distance.toFixed(1)} miles away
                            </span>
                          )}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              fontSize: '0.85rem',
                              color: '#64748b',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                          >
                            <span>Directions</span>
                            <ExternalLink size={12} />
                          </a>
                          <Link href={`/${store.slug}`} style={{
                            background: 'var(--accent-color)',
                            color: '#ffffff',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '1rem',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <span>View Store</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sticky Map Container (40% width) */}
          <div style={{
            position: 'sticky',
            top: '100px',
            alignSelf: 'start',
            height: '580px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%'
          }}>
            {/* Map Tabs header */}
            <div style={{
              background: '#f1f5f9',
              borderRadius: '1rem',
              padding: '0.35rem',
              display: 'flex',
              gap: '0.25rem'
            }}>
              <button
                onClick={() => setMapTab('map')}
                style={{
                  flex: 1,
                  background: mapTab === 'map' ? 'var(--accent-color)' : 'transparent',
                  color: mapTab === 'map' ? 'white' : '#64748b',
                  border: 'none',
                  padding: '0.6rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Map View
              </button>
              <button
                onClick={() => setMapTab('list')}
                style={{
                  flex: 1,
                  background: mapTab === 'list' ? 'var(--accent-color)' : 'transparent',
                  color: mapTab === 'list' ? 'white' : '#64748b',
                  border: 'none',
                  padding: '0.6rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                List View (Mini)
              </button>
            </div>

            {/* Map tab viewport */}
            <div style={{
              background: 'white',
              borderRadius: '2rem',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              width: '100%',
              flex: 1,
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
            }}>
              {mapTab === 'map' ? (
                activeStore ? (
                  <iframe
                    src={activeStore.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                    Select a store to view map
                  </div>
                )
              ) : (
                /* Mini list view */
                <div style={{ padding: '1.5rem', height: '100%', overflowY: 'auto' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>All Locations Checklist</h4>
                  <div style={{ display: 'grid', gap: '0.85rem' }}>
                    {processedStores.map((store, i) => (
                      <div
                        key={store.id}
                        onClick={() => {
                          setActiveStoreId(store.id);
                          setMapTab('map');
                        }}
                        style={{
                          background: store.id === activeStoreId ? '#f8fafc' : 'white',
                          border: store.id === activeStoreId ? '1px solid var(--accent-color)' : '1px solid #f1f5f9',
                          borderRadius: '1rem',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: store.id === activeStoreId ? 'var(--accent-color)' : '#f1f5f9',
                            color: store.id === activeStoreId ? 'white' : '#64748b',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>{i + 1}</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{store.name}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 700 }}>
                          {store.locationName.split('–')[1] || store.locationName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Float Map helper popup */}
              {activeStore && mapTab === 'map' && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1.25rem',
                  padding: '0.85rem 1.25rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(226,232,240,0.8)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>{activeStore.name}</h6>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{activeStore.address.substring(0, 42)}...</span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeStore.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'var(--accent-color)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Navigation size={16} fill="white" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Browse by State & Browse by City Section */}
      <section style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        padding: '5rem 2rem',
      }}>
        <div className="browse-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          width: '100%'
        }}>
          {/* Browse by State */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Compass size={22} color="var(--accent-color)" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, color: '#0f172a' }}>Browse by State</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['California', 'Nevada', 'Arizona', 'Texas'].map((state) => {
                const isActive = selectedState === state;
                return (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedState(isActive ? null : state);
                      setSelectedCity(null);
                    }}
                    style={{
                      background: isActive ? 'var(--accent-color)' : '#ffffff',
                      color: isActive ? 'white' : '#475569',
                      border: '1px solid #cbd5e1',
                      borderRadius: '1rem',
                      padding: '0.75rem 1.5rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                      transition: 'all 0.2s'
                    }}
                    className={!isActive ? "btn-hover" : ""}
                  >
                    {state}
                  </button>
                );
              })}
              {selectedState && (
                <button
                  onClick={() => setSelectedState(null)}
                  style={{
                    background: '#f1f5f9',
                    color: '#64748b',
                    border: '1px solid #cbd5e1',
                    borderRadius: '1rem',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View All States
                </button>
              )}
            </div>
          </div>

          {/* Browse by City */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <MapPin size={22} color="var(--accent-color)" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, color: '#0f172a' }}>Browse by City</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['Las Vegas', 'Santa Barbara', 'Lynwood', 'West Covina', 'Ventura'].map((city) => {
                const isActive = selectedCity === city;
                return (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(isActive ? null : city);
                      setSelectedState(null);
                    }}
                    style={{
                      background: isActive ? 'var(--accent-color)' : '#ffffff',
                      color: isActive ? 'white' : '#475569',
                      border: '1px solid #cbd5e1',
                      borderRadius: '1rem',
                      padding: '0.75rem 1.5rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                      transition: 'all 0.2s'
                    }}
                    className={!isActive ? "btn-hover" : ""}
                  >
                    {city}
                  </button>
                );
              })}
              {selectedCity && (
                <button
                  onClick={() => setSelectedCity(null)}
                  style={{
                    background: '#f1f5f9',
                    color: '#64748b',
                    border: '1px solid #cbd5e1',
                    borderRadius: '1rem',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View All Cities
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dark Stats Bar */}
      <section style={{
        background: '#070a13',
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        color: 'white'
      }}>
        <div className="stats-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          textAlign: 'center',
          width: '100%'
        }}>
          <div>
            <h4 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-color)', margin: '0 0 0.25rem 0' }}>100+ Locations</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Across Multiple States</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-color)', margin: '0 0 0.25rem 0' }}>Expert Technicians</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Certified & Trained</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-color)', margin: '0 0 0.25rem 0' }}>Quality Parts</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>High-Quality Replacements</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-color)', margin: '0 0 0.25rem 0' }}>99% Satisfaction</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Our Customer Priority</p>
          </div>
        </div>
      </section>

      {/* 7. Footer (Dark slate) */}
      <footer id="footer" style={{
        background: '#04060c',
        color: '#64748b',
        padding: '5rem 2rem 2rem 2rem',
        fontSize: '0.9rem'
      }}>
        <div className="footer-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '4rem',
          marginBottom: '4rem',
          width: '100%'
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'var(--accent-color)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={16} color="white" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                Store Network
              </span>
            </div>
            <p style={{ lineHeight: 1.6, marginBottom: '2rem', color: '#94a3b8' }}>
              Your leading store network connecting Freedom Shopping LLC, FixUp LLC, and Max Universal Inc. Find location contact information, schedules, and book slots instantly.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{
                background: 'rgba(255,255,255,0.03)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.2s'
              }} className="btn-hover">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" style={{
                background: 'rgba(255,255,255,0.03)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.2s'
              }} className="btn-hover">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="mailto:support@storenetwork.com" style={{
                background: 'rgba(255,255,255,0.03)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.2s'
              }} className="btn-hover"><Mail size={16} /></a>
            </div>
          </div>

          {/* Col 2 (Brands list) */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Brands Group</h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <button onClick={() => { setSelectedBrand('freedom'); setSelectedCity(null); setSelectedState(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>Freedom Shopping LLC</button>
              <button onClick={() => { setSelectedBrand('fixup'); setSelectedCity(null); setSelectedState(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>FixUp LLC</button>
              <button onClick={() => { setSelectedBrand('max'); setSelectedCity(null); setSelectedState(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>Max Universal Inc.</button>
            </div>
          </div>

          {/* Col 3 (Admin links) */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Admin Access</h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <Link href="/admin" style={{ color: '#94a3b8' }}>Admin Dashboard</Link>
              <Link href="/login" style={{ color: '#94a3b8' }}>Staff Login</Link>
            </div>
          </div>

          {/* Col 4 (Popular Cities) */}
          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Top Cities</h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <button onClick={() => { setSelectedCity('Las Vegas'); setSelectedState(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>Las Vegas, NV</button>
              <button onClick={() => { setSelectedCity('Santa Barbara'); setSelectedState(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>Santa Barbara, CA</button>
              <button onClick={() => { setSelectedCity('Lynwood'); setSelectedState(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>Lynwood, CA</button>
              <button onClick={() => { setSelectedCity('Ventura'); setSelectedState(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left' }}>Ventura, CA</button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          width: '100%'
        }}>
          <span>© 2026 Our Store Network. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: '#64748b' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#64748b' }}>Terms of Service</a>
            <a href="#" style={{ color: '#64748b' }}>Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
