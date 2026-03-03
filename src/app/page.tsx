"use client";

import dynamic from 'next/dynamic';

// Import komponen GrowtopiaLogin dengan SSR dimatikan
const GrowtopiaLogin = dynamic(
  () => import('@/app/player/login/dashboard/home/GrowtopiaLogin'),
  { 
    ssr: false, // <-- INI PENTING! Matiin server-side rendering
    loading: () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          padding: '20px 40px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          color: '#333',
          fontSize: '18px',
          fontWeight: '500'
        }}>
          Loading...
        </div>
      </div>
    )
  }
);

export default function HomePage() {
  return <GrowtopiaLogin />;
}
