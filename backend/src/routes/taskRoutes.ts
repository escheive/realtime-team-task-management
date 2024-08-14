import express from 'express';
import { 
  getTasks, 
  getIncompleteTaskCount, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Get
router.get('/', authMiddleware, getTasks); // All tasks
router.get('/incomplete/count', authMiddleware, getIncompleteTaskCount) // All incomplete tasks

// Post
router.post('/', authMiddleware, createTask); // Create a task

// Put
router.put('/:id', authMiddleware, updateTask); // Update a task

// Delete
router.delete('/:id', authMiddleware, deleteTask); // Delete a task

export default router;
