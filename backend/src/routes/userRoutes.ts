import express from 'express';
import { getUsers, updateUser, createUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// GET
router.get('/', getUsers); // Route for querying users

// POST
router.post('/', createUser); // Route for creating user

// PUT
router.put('/:id', updateUser); // Route for updating users

// DELETE
router.delete('/:id', deleteUser); // Route for deleting users


export default router;