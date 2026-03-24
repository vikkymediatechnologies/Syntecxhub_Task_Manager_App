import React from 'react';
import TaskCard from './TaskCard';
import Loader from '../ui/Loader';

const TaskList = ({ tasks, loading, onEdit }) => {
  if (loading) return <Loader />;

  if (!tasks.length) {
    return (
      <div style={{
        textAlign: 'center', padding: '64px 24px',
        color: 'var(--text-muted)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>◎</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '8px' }}>
          No tasks here
        </p>
        <p style={{ fontSize: '14px' }}>Create a new task to get started</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;