import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', textAlign: 'center', padding: '24px',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '100px', fontWeight: 800,
        color: 'var(--accent)', opacity: 0.3, lineHeight: 1,
      }}>404</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', marginBottom: '12px' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
    </div>
  );
};

export default NotFoundPage;