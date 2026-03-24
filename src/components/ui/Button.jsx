import React from 'react';

const Loader = ({ fullscreen = false, size = 32 }) => {
  const style = {
    width: size,
    height: size,
    border: `3px solid rgba(124,106,255,0.2)`,
    borderTop: `3px solid #7c6aff`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  if (fullscreen) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--bg-primary)'
      }}>
        <div style={style} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
      <div style={style} />
    </div>
  );
};

export default Loader;