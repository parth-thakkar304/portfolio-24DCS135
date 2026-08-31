const BASE_URL = 'http://localhost:5000';

// Fetch all tasks from Express/MongoDB Backend
export const fetchTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks (Status: ${response.status})`);
  }
  return await response.json();
};

// Fetch single task by ID
export const fetchTaskById = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error(`Task with ID ${id} not found`);
  }
  return await response.json();
};

// Create a new task document in MongoDB
export const createTask = async (taskData) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
    headers: {
      'Content-Type': 'application/json'
    },
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
    method: 'DELETE'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete task');
  }

  return data;
};
