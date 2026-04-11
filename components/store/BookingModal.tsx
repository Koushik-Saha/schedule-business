'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

import { bookAppointmentAction } from '@/lib/actions';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  storeSlug: string;
}

export default function BookingModal({ isOpen, onClose, storeName, storeSlug }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await bookAppointmentAction(formData, storeSlug);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(5px)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              background: 'white',
              width: '90%',
              maxWidth: '500px',
              padding: '2.5rem',
              borderRadius: '2rem',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
          >
            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <X size={24} color="#64748b" />
            </button>

            {!isSubmitted ? (
              <>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Book Appointment</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>at {storeName}</p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'grid', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Name</label>
                      <input name="name" required placeholder="Full name" style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} />
                    </div>
                    <div style={{ display: 'grid', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Phone</label>
                      <input name="phone" required placeholder="Phone number" style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'grid', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                      <input name="email" type="email" required placeholder="Your email" style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} />
                    </div>
                    <div style={{ display: 'grid', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Phone Model</label>
                      <input name="phoneModel" required placeholder="e.g. iPhone 15 Pro" style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'grid', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Date</label>
                      <input name="date" type="date" required style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} />
                    </div>
                    <div style={{ display: 'grid', gap: '0.4rem' }}>
                      <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Time</label>
                      <input name="time" type="time" required style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '0.4rem' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Issue</label>
                    <textarea name="issue" required placeholder="Briefly describe the issue" style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', minHeight: '80px' }} />
                  </div>
                  <button type="submit" style={{
                    background: 'var(--accent)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '1rem',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}>
                    Confirm Appointment
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={80} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Sent Successfully!</h2>
                <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>
                  We've received your request. One of our technicians will contact you shortly to confirm the time.
                </p>
                <button 
                  onClick={onClose}
                  style={{
                    background: '#0f172a',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
