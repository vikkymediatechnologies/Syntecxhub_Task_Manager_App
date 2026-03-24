import React, { useState, useEffect, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import TaskList from '../components/tasks/TaskList';
import TaskFilter from '../components/tasks/TaskFilter';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

const DashboardPage = () => {
  const { tasks, loading, fetchTasks } = useTasks();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    let list = [...tasks];

    if (activeFilter === 'active')    list = list.filter((t) => !t.completed);
    if (activeFilter === 'completed') list = list.filter((t) => t.completed);
    if (activeFilter === 'high')      list = list.filter((t) => t.priority === 'high');

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'newest')   list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === 'oldest')   list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      list.sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
    }
    if (sortBy === 'dueDate')  list.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));

    return list;
  }, [tasks, activeFilter, search, sortBy]);

  const counts = {
    all:       tasks.length,
    active:    tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
    high:      tasks.filter((t) => t.priority === 'high').length,
  };

  const handleEdit = (task) => { setEditTask(task); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setEditTask(null); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} counts={counts} />

        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {/* Stats Bar */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '14px', marginBottom: '28px',
          }}>
            {[
              { label: 'Total',     value: counts.all,       color: 'var(--accent)' },
              { label: 'Active',    value: counts.active,    color: 'var(--warning)' },
              { label: 'Done',      value: counts.completed, color: 'var(--success)' },
              { label: 'High Prio', value: counts.high,      color: 'var(--danger)' },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '16px 20px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800,
                  color: stat.color,
                }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700 }}>
              {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Tasks
            </h1>
            <Button onClick={() => setModalOpen(true)}>+ New Task</Button>
          </div>

          <TaskFilter
            search={search} onSearch={setSearch}
            sortBy={sortBy} onSortChange={setSortBy}
          />

          <TaskList tasks={filteredTasks} loading={loading} onEdit={handleEdit} />
        </main>
      </div>

      <Modal isOpen={modalOpen} onClose={handleClose} title={editTask ? 'Edit Task' : 'New Task'}>
        <TaskForm editTask={editTask} onClose={handleClose} />
      </Modal>
    </div>
  );
};

export default DashboardPage;