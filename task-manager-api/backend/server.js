require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager';

// ==========================================
// 1. Connect to MongoDB Database
// ==========================================
mongoose.connect(MONGO_URI)
  .then(() => console.log(`✅ MongoDB Connected Successfully to: ${MONGO_URI}`))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// 2. Middleware Pipeline Setup
// ==========================================

// Enable CORS Middleware (Allow requests from frontend dashboard)
app.use(cors());

// Body Parser Middleware
app.use(express.json());

// Global Request Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Content-Type Validation Middleware for POST and PUT requests
app.use((req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Content-Type header must be application/json'
      });
    }
  }
  next();
});

// ==========================================
// 3. RESTful API Routes (/tasks) using Mongoose
// ==========================================

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Practical 5: Task Manager RESTful API (MongoDB & Mongoose)',
    database: 'MongoDB',
    endpoints: {
      'GET /tasks': 'Retrieve all tasks from MongoDB',
      'GET /tasks/:id': 'Retrieve a task by MongoDB _id',
      'POST /tasks': 'Create a new task in MongoDB',
      'PUT /tasks/:id': 'Update an existing task by _id',
      'DELETE /tasks/:id': 'Delete a task by _id'
    }
  });
});

// GET /tasks - Fetch all tasks from MongoDB
app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id - Fetch a single task by Mongoose _id (Supplementary Task 3)
app.get('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID '${req.params.id}' not found.`
      });
    }
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// POST /tasks - Create a new task document in MongoDB
app.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    
    // Mongoose handles validation (required title, priority enum check)
    const newTask = await Task.create({
      title,
      description,
      completed: completed || false,
      priority: priority || 'medium'
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully in MongoDB',
      data: newTask
    });
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id - Update an existing task document in MongoDB
app.put('/tasks/:id', async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID '${req.params.id}' not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully in MongoDB',
      data: updatedTask
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id - Delete a task document from MongoDB
app.delete('/tasks/:id', async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID '${req.params.id}' not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully from MongoDB',
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
});

// Simulated 500 Server Error Route for Error Handler Testing
app.get('/error-test', (req, res, next) => {
  const testError = new Error('Simulated internal server failure for testing global error handler');
  next(testError);
});

// ==========================================
// 4. Catch-All 404 Route Handler
// ==========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint does not exist.`
  });
});

// ==========================================
// 5. Centralized Global Error Handler Middleware
// ==========================================
app.use((err, req, res, next) => {
  console.error('[GLOBAL ERROR HANDLER]:', err.stack);

  // Mongoose Validation Error (e.g., missing required field or invalid priority enum)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      messages: errors
    });
  }

  // Mongoose CastError (e.g., invalid MongoDB ObjectId format)
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Invalid ID format: '${err.value}'`
    });
  }

  // Generic 500 Internal Server Error
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the server'
  });
});

// ==========================================
// 6. Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Task Manager API Backend running on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
});
