import express from 'express';
import { refreshToken, loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

// Post
router.post('/login', loginUser); // Route for user login
router.post('/register', registerUser); // Route for registering a user

router.post('/refresh-token', refreshToken); // Route for refreshing access tokens


export default router;