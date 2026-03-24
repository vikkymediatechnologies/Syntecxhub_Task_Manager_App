import React from 'react';

const TaskFilter = ({ search, onSearch, sortBy, onSortChange }) => {
  return (
    <div style={{
      display: 'flex', gap: '12px', alignItems: 'center',
      marginBottom: '20px', flexWrap: 'wrap',
    }}>
      <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
        <span style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-muted)', fontSize: '14px', pointerEvents: 'none',
        }}>⌕</span>
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{ paddingLeft: '32px' }}
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        style={{ width: 'auto', minWidth: '140px' }}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority">By Priority</option>
        <option value="dueDate">By Due Date</option>
      </select>
    </div>
  );
};

export default TaskFilter;