import express from 'express';
import { getUsers, getUserById, updateUser, createUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// GET
router.get('/', authMiddleware, getUsers); // Route for querying users
router.get('/me', authMiddleware, getUserById); // Get signed in user info
router.get('/:id', authMiddleware, getUserById); // Get specificed users info

// POST
router.post('/', authMiddleware, createUser); // Route for creating user

// PUT
router.put('/:id', authMiddleware, updateUser); // Route for updating users

// DELETE
router.delete('/:id', authMiddleware, deleteUser); // Route for deleting users


export default router;