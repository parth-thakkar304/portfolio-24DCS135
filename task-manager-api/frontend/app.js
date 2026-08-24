const API_BASE_URL = 'http://localhost:5000';

// DOM Elements
const serverStatus = document.getElementById('server-status');
const taskList = document.getElementById('task-list');
const createTaskForm = document.getElementById('create-task-form');
const jsonInspector = document.getElementById('json-inspector');
const responseStatus = document.getElementById('response-status');
const responseTimestamp = document.getElementById('response-timestamp');

const btnRefresh = document.getElementById('btn-refresh');
const btnTest404 = document.getElementById('btn-test-404');
const btnTest500 = document.getElementById('btn-test-500');
const btnTestBadJson = document.getElementById('btn-test-bad-json');

// Inspector Display Helper
function updateInspector(statusText, jsonPayload) {
  if (responseStatus) responseStatus.textContent = `Status: ${statusText}`;
  if (responseTimestamp) responseTimestamp.textContent = new Date().toLocaleTimeString();
  if (jsonInspector) jsonInspector.textContent = JSON.stringify(jsonPayload, null, 2);
}

// Check Server Status
async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`);
    if (res.ok) {
      serverStatus.innerHTML = '<span class="status-dot online"></span> Connected to MongoDB (Port 5000)';
      return true;
    } else {
      serverStatus.innerHTML = '<span class="status-dot offline"></span> Backend Error';
      return false;
    }
  } catch (err) {
    serverStatus.innerHTML = '<span class="status-dot offline"></span> Server/Database Offline';
    return false;
  }
}

// GET /tasks - Fetch and Render Tasks with Shimmer Loading Effect
async function loadTasks() {
  // Render Shimmer Skeleton Cards while loading
  taskList.innerHTML = `
    <div class="skeleton-card">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
    </div>
    <div class="skeleton-card">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
    </div>
  `;

  try {
    const [res] = await Promise.all([
      fetch(`${API_BASE_URL}/tasks`),
      new Promise(resolve => setTimeout(resolve, 350)) // 350ms shimmer effect buffer
    ]);
    
    const data = await res.json();
    updateInspector(`${res.status} ${res.statusText}`, data);

    if (data.success && Array.isArray(data.data)) {
      renderTasks(data.data);
    } else {
      taskList.innerHTML = `<p style="color: #ef4444">Error: ${data.message || 'Failed to parse tasks'}</p>`;
    }
  } catch (err) {
    updateInspector('Connection Error', { error: 'Failed to connect to backend server on port 5000.' });
    taskList.innerHTML = '<p style="color: #ef4444">Unable to connect to Express backend. Please ensure server is running on port 5000.</p>';
  }
}

// Render Task List DOM
function renderTasks(tasks) {
  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="section-desc">No tasks in MongoDB database. Create one using the form!</p>';
    return;
  }

  taskList.innerHTML = tasks.map(task => {
    const id = task._id || task.id;
    const priority = task.priority || 'medium';
    return `
      <div class="task-item ${task.completed ? 'completed' : ''}" id="task-${id}">
        <div class="task-info">
          <h3 class="task-title">
            ${escapeHtml(task.title)}
            <span class="badge-endpoint" style="margin-left: 6px; text-transform: uppercase;">${priority}</span>
          </h3>
          <p>${escapeHtml(task.description || 'No description')}</p>
          <span style="font-size: 0.725rem; color: var(--text-muted);">ID: ${id}</span>
        </div>
        <div class="task-actions">
          <button class="btn btn-action-sm" onclick="toggleTaskStatus('${id}', ${!task.completed})">
            ${task.completed ? 'Undo' : 'Complete'}
          </button>
          <button class="btn btn-danger-sm" onclick="deleteTask('${id}')">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

// POST /tasks - Create New Task in MongoDB
createTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const prioritySelect = document.getElementById('task-priority');
  const priority = prioritySelect ? prioritySelect.value : 'medium';

  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, priority })
    });

    const data = await res.json();
    updateInspector(`${res.status} ${res.statusText}`, data);

    if (res.status === 201) {
      document.getElementById('task-title').value = '';
      document.getElementById('task-desc').value = '';
      loadTasks();
    }
  } catch (err) {
    updateInspector('POST Error', { error: err.message });
  }
});

// PUT /tasks/:id - Toggle Task Completion in MongoDB
async function toggleTaskStatus(id, completed) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });

    const data = await res.json();
    updateInspector(`${res.status} ${res.statusText}`, data);
    loadTasks();
  } catch (err) {
    updateInspector('PUT Error', { error: err.message });
  }
}

// DELETE /tasks/:id - Delete Task from MongoDB
async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    updateInspector(`${res.status} ${res.statusText}`, data);
    loadTasks();
  } catch (err) {
    updateInspector('DELETE Error', { error: err.message });
  }
}

// Test 404 Route Button
btnTest404.addEventListener('click', async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/999999999999999999999999`);
    const data = await res.json();
    updateInspector(`${res.status} ${res.statusText}`, data);
  } catch (err) {
    updateInspector('404 Test Error', { error: err.message });
  }
});

// Test 500 Error Route Button
btnTest500.addEventListener('click', async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/error-test`);
    const data = await res.json();
    updateInspector(`${res.status} ${res.statusText}`, data);
  } catch (err) {
    updateInspector('500 Test Error', { error: err.message });
  }
});

// Test Bad Content-Type Header Button
btnTestBadJson.addEventListener('click', async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Invalid Text Body'
    });
    const data = await res.json();
    updateInspector(`${res.status} ${res.statusText}`, data);
  } catch (err) {
    updateInspector('Bad Header Test Error', { error: err.message });
  }
});

// Refresh Button
btnRefresh.addEventListener('click', () => {
  checkServerHealth();
  loadTasks();
});

// Helper function to escape HTML string
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Initial Load
checkServerHealth();
loadTasks();
