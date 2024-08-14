import express from 'express';
import { 
  getTasks, 
  getTaskStatusCounts, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Get
router.get('/', authMiddleware, getTasks); // All tasks
router.get('/status-counts', authMiddleware, getTaskStatusCounts) // Count for incomplete, in-progress, and unassigned tasks

// Post
router.post('/', authMiddleware, createTask); // Create a task

// Put
router.put('/:id', authMiddleware, updateTask); // Update a task

// Delete
router.delete('/:id', authMiddleware, deleteTask); // Delete a task

export default router;
