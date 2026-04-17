'use client';

import React, { useState } from 'react';
import { updateNotificationEmailAction } from '@/lib/actions';
import { Mail, Check, Pencil, X } from 'lucide-react';

interface Props {
  storeSlug: string;
  currentEmail: string;
}

export default function NotificationEmailEditor({ storeSlug, currentEmail }: Props) {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await updateNotificationEmailAction(storeSlug, email);
    setLoading(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setEmail(currentEmail);
    setEditing(false);
  };

  return (
    <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '0.75rem 1rem', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
        <Mail size={13} style={{ color: '#64748b' }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Booking Notifications
        </span>
      </div>

      {editing ? (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              padding: '0.4rem 0.6rem',
              borderRadius: '0.4rem',
              border: '1px solid #93c5fd',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.4rem',
              padding: '0.4rem 0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Check size={14} />
          </button>
          <button
            onClick={handleCancel}
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '0.4rem',
              padding: '0.4rem 0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: email ? '#0f172a' : '#94a3b8', fontWeight: 500 }}>
            {email || 'Not set'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {saved && (
              <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>Saved!</span>
            )}
            <button
              onClick={() => setEditing(true)}
              style={{
                background: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '0.4rem',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                color: '#64748b',
              }}
            >
              <Pencil size={11} />
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
