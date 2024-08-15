import express from 'express';
import * as taskController from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Get
router.get('/', authMiddleware, taskController.getTasks); // All tasks
router.get('/status-counts', authMiddleware, taskController.getTaskStatusCounts) // Count for incomplete, in-progress, and unassigned tasks
router.get('/query', authMiddleware, taskController.queryTasks) // Tasks based on params

// Post
router.post('/', authMiddleware, taskController.createTask); // Create a task

// Put
router.put('/:id', authMiddleware, taskController.updateTask); // Update a task

// Delete
router.delete('/:id', authMiddleware, taskController.deleteTask); // Delete a task

export default router;
