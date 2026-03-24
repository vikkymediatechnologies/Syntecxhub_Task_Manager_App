import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      height: '64px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--accent)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px',
        }}>TF</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>
          TaskFlow
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--bg-hover)', padding: '6px 14px',
          borderRadius: '8px', border: '1px solid var(--border)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700,
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {user?.name || 'User'}
          </span>
        </div>
        <Button variant="secondary" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;