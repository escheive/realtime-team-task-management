import express from 'express';
import { refreshToken, loginUser } from '../controllers/authController';

const router = express.Router();

// Post
router.post('/login', loginUser); // Route for user login
router.post('/auth/refresh-token', refreshToken);

export default router;