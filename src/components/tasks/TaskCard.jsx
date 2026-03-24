import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import Button from '../ui/Button';

const priorityConfig = {
  high:   { color: '#ff5c5c', bg: 'rgba(255,92,92,0.1)',   label: 'High' },
  medium: { color: '#f5a623', bg: 'rgba(245,166,35,0.1)',  label: 'Medium' },
  low:    { color: '#22d3a0', bg: 'rgba(34,211,160,0.1)',  label: 'Low' },
};

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask, toggleComplete } = useTasks();
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  const priority = priorityConfig[task.priority] || priorityConfig.low;

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteTask(task._id); } finally { setDeleting(false); }
  };

  const handleToggle = async () => {
    setToggling(true);
    try { await toggleComplete(task._id, !task.completed); } finally { setToggling(false); }
  };

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div
      className="fade-in"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${task.completed ? 'var(--border)' : 'var(--border)'}`,
        borderLeft: `3px solid ${task.completed ? 'var(--text-muted)' : priority.color}`,
        borderRadius: 'var(--radius)',
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: '10px',
        opacity: task.completed ? 0.65 : 1,
        transition: 'all 0.2s',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <button
          onClick={handleToggle}
          disabled={toggling}
          style={{
            width: 20, height: 20, marginTop: '2px',
            borderRadius: '6px',
            border: `2px solid ${task.completed ? 'var(--success)' : 'var(--text-muted)'}`,
            background: task.completed ? 'var(--success)' : 'transparent',
            cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '11px',
            transition: 'all 0.2s',
          }}
        >
          {task.completed ? '✓' : ''}
        </button>

        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
            marginBottom: '4px',
          }}>{task.title}</h3>

          {task.description && (
            <p style={{
              fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5,
            }}>{task.description}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, padding: '3px 9px',
            borderRadius: '20px',
            background: priority.bg, color: priority.color,
          }}>{priority.label}</span>

          {task.dueDate && (
            <span style={{
              fontSize: '11px', color: isOverdue ? 'var(--danger)' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              {isOverdue ? '⚠ ' : '📅 '}
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}

          {task.category && (
            <span style={{
              fontSize: '11px', padding: '3px 9px', borderRadius: '20px',
              background: 'var(--bg-hover)', color: 'var(--text-muted)',
            }}>{task.category}</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>✎</Button>
          <Button variant="danger" size="sm" onClick={handleDelete} loading={deleting}>✕</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;