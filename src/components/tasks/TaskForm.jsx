import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import Button from '../ui/Button';

const defaultForm = {
  title: '', description: '', priority: 'medium',
  category: '', dueDate: '',
};

const TaskForm = ({ editTask, onClose }) => {
  const { createTask, updateTask } = useTasks();
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setForm({
        title:       editTask.title || '',
        description: editTask.description || '',
        priority:    editTask.priority || 'medium',
        category:    editTask.category || '',
        dueDate:     editTask.dueDate ? editTask.dueDate.slice(0, 10) : '',
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    setLoading(true);
    setError('');
    try {
      if (editTask) {
        await updateTask(editTask._id, form);
      } else {
        await createTask(form);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: 'var(--text-secondary)', marginBottom: '6px',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  };

  const fieldStyle = { marginBottom: '16px' };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          background: 'rgba(255,92,92,0.1)', border: '1px solid rgba(255,92,92,0.3)',
          color: 'var(--danger)', padding: '10px 14px', borderRadius: '8px',
          fontSize: '13px', marginBottom: '16px',
        }}>{error}</div>
      )}

      <div style={fieldStyle}>
        <label style={labelStyle}>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Task title..." />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          name="description" value={form.description} onChange={handleChange}
          placeholder="Optional description..."
          style={{ resize: 'vertical', minHeight: '80px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', ...fieldStyle }}>
        <div>
          <label style={labelStyle}>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Due Date</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Category</label>
        <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Work, Personal..." />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" loading={loading}>
          {editTask ? 'Save Changes' : '+ Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;