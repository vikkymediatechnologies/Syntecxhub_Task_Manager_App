import React from 'react';

const filters = [
  { label: 'All Tasks',   value: 'all',       icon: '◈' },
  { label: 'Active',      value: 'active',    icon: '◉' },
  { label: 'Completed',   value: 'completed', icon: '✓' },
  { label: 'High Priority', value: 'high',    icon: '⬆' },
];

const Sidebar = ({ activeFilter, onFilterChange, counts = {} }) => {
  return (
    <aside style={{
      width: '220px', flexShrink: 0,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      padding: '24px 16px',
      display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <p style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
        color: 'var(--text-muted)', textTransform: 'uppercase',
        padding: '0 8px', marginBottom: '8px',
      }}>Views</p>

      {filters.map((f) => {
        const isActive = activeFilter === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: isActive ? 'var(--accent-soft)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
              transition: 'all 0.2s',
              borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px' }}>{f.icon}</span>
              {f.label}
            </span>
            {counts[f.value] !== undefined && (
              <span style={{
                fontSize: '11px', fontWeight: 700,
                background: isActive ? 'var(--accent)' : 'var(--bg-hover)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                padding: '2px 7px', borderRadius: '20px',
              }}>{counts[f.value]}</span>
            )}
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;