export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
};

export const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date();
};

export const getPriorityWeight = (priority) => {
  return { high: 0, medium: 1, low: 2 }[priority] ?? 3;
};

export const truncate = (str, max = 80) => {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '...' : str;
};
