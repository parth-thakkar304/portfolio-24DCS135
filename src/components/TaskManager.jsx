import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';
import Toast from './Toast';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal & Toast states
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch tasks from Express/MongoDB Backend
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTasks();
      if (response.success && Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        throw new Error('Invalid data format received from backend server');
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to Express backend server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Handle Form Submit (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await createTask({ title, description, priority });
      if (response.success) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        showToast('Task saved to MongoDB database successfully!', 'success');
        loadTasks();
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Toggle Completion (PUT)
  const handleToggleComplete = async (task) => {
    const id = task._id || task.id;
    try {
      const response = await updateTask(id, { completed: !task.completed });
      if (response.success) {
        showToast(`Task "${task.title}" updated!`, 'success');
        loadTasks();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Confirm Delete (DELETE)
  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      const response = await deleteTask(deleteConfirmId);
      if (response.success) {
        showToast('Task permanently deleted from MongoDB!', 'success');
        setDeleteConfirmId(null);
        loadTasks();
      }
    } catch (err) {
      showToast(err.message, 'error');
      setDeleteConfirmId(null);
    }
  };

  // Filter tasks by title or priority
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (task.priority && task.priority.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="task-manager-container page-transition">
      {/* Toast Notification Banner */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to permanently delete this task from MongoDB?</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirmId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      <header className="page-header">
        <h1>Full-Stack Task Manager</h1>
        <p>Practical 6: End-to-End React + Node/Express + MongoDB Integration</p>
      </header>

      <div className="fullstack-grid">
        {/* Left Column: Create Task Form */}
        <div className="card-panel">
          <h2>Add New Task (POST /tasks)</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="task-title">Task Title *</label>
              <input 
                type="text" 
                id="task-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., Deploy Full-Stack App to Production" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-desc">Description</label>
              <textarea 
                id="task-desc" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Details about task..." 
                rows="3" 
              />
            </div>

            <div className="form-group" style={{ marginBottom: '22px' }}>
              <label htmlFor="task-priority">Priority Level</label>
              <select 
                id="task-priority" 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="select-input"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving to Database...' : 'Add Task to MongoDB'}
            </button>
          </form>
        </div>

        {/* Right Column: Live MongoDB Task List */}
        <div className="card-panel">
          <div className="panel-header">
            <h2>MongoDB Database Records</h2>
            <button className="btn btn-sm btn-outline" onClick={loadTasks}>Refresh List</button>
          </div>

          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by title, description, or priority..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching live documents from MongoDB...</p>
            </div>
          )}

          {error && !loading && (
            <div className="error-card">
              <p>⚠️ Backend Error: {error}</p>
              <p className="sub-error">Ensure Express server is running on port 5000 and MongoDB is active.</p>
              <button className="btn btn-sm btn-primary" onClick={loadTasks}>Retry Connection</button>
            </div>
          )}

          {!loading && !error && filteredTasks.length === 0 && (
            <p className="empty-text">No tasks found in database. Create one using the form!</p>
          )}

          {!loading && !error && filteredTasks.length > 0 && (
            <div className="task-list">
              {filteredTasks.map(task => {
                const id = task._id || task.id;
                const p = task.priority || 'medium';
                return (
                  <div key={id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <div className="task-body">
                      <div className="task-header-row">
                        <h3>{task.title}</h3>
                        <span className={`priority-badge priority-${p}`}>Priority: {p.toUpperCase()}</span>
                      </div>
                      <p className="task-description">{task.description || 'No description provided.'}</p>
                      <span className="task-id">ID: {id}</span>
                    </div>

                    <div className="task-actions">
                      <button 
                        className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-primary'}`} 
                        onClick={() => handleToggleComplete(task)}
                      >
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>

                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => setDeleteConfirmId(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
