'use client';

import React from 'react';
import { StoreHours } from '@/lib/storeService';

interface StoreHoursProps {
  hours: StoreHours;
  accentColor: string;
}

export default function StoreHoursList({ hours, accentColor }: StoreHoursProps) {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const currentDayKey = days[(currentDayIndex + 6) % 7].key; // Adjust so 0 is Monday... wait

  // simpler way:
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = dayNames[currentDayIndex];

  return (
    <div className="hours-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#171717' }}>Hours</h2>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {days.map((day) => {
          const isToday = day.key === todayKey;
          return (
            <div 
              key={day.key} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '1.25rem',
                color: isToday ? '#ef4444' : '#171717',
                fontWeight: isToday ? 600 : 400
              }}
            >
              <span>{day.label}</span>
              <span>{hours[day.key as keyof StoreHours]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
