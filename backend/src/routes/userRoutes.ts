import express from 'express';
import { getUsers, updateUser, createUser, deleteUser, loginUser } from '../controllers/userController';

const router = express.Router();

// GET
router.get('/', getUsers); // Route for querying users

// POST
router.post('/', createUser); // Route for creating user
router.post('/login', loginUser); // Route for user login

// PUT
router.put('/:id', updateUser); // Route for updating users

// DELETE
router.delete('/:id', deleteUser); // Route for deleting users


export default router;