const BASE_URL = 'http://localhost:5000';

// Auth Token Helpers (localStorage)
export const getAuthToken = () => localStorage.getItem('jwt_token');
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('jwt_token', token);
  } else {
    localStorage.removeItem('jwt_token');
  }
};
export const removeAuthToken = () => localStorage.removeItem('jwt_token');

// Helper to construct request headers with Authorization
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// ==========================================
// Authentication Services (Practical 7)
// ==========================================

// Register a new user
export const registerUser = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data.messages ? data.messages.join(', ') : (data.message || 'Registration failed');
    throw new Error(errorMsg);
  }

  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

// Login user
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data.messages ? data.messages.join(', ') : (data.message || 'Login failed');
    throw new Error(errorMsg);
  }

  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

// Fetch currently authenticated user profile
export const fetchCurrentUser = async () => {
  const token = getAuthToken();
  if (!token) return null;

  const response = await fetch(`${BASE_URL}/me`, {
    headers: getHeaders(true)
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      return null;
    }
    throw new Error(`Failed to fetch user profile (Status: ${response.status})`);
  }

  return await response.json();
};

// ==========================================
// Task Management Services (Practicals 5 & 6)
// ==========================================

// Fetch all tasks from Express/MongoDB Backend
export const fetchTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: getHeaders(true)
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks (Status: ${response.status})`);
  }
  return await response.json();
};

// Fetch single task by ID
export const fetchTaskById = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    headers: getHeaders(true)
  });
  if (!response.ok) {
    throw new Error(`Task with ID ${id} not found`);
  }
  return await response.json();
};

// Create a new task document in MongoDB
export const createTask = async (taskData) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(taskData)
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.messages ? data.messages.join(', ') : (data.message || 'Failed to create task');
    throw new Error(errorMsg);
  }

  return data;
};

// Update an existing task document in MongoDB
export const updateTask = async (id, updateData) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(updateData)
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.messages ? data.messages.join(', ') : (data.message || 'Failed to update task');
    throw new Error(errorMsg);
  }

  return data;
};

// Delete a task document from MongoDB
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete task');
  }

  return data;
};
