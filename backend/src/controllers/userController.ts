import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken'; 

interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Extract the userId from the request parameter
    const userId = req.params.id || req.userId;

    if (!userId) {
      return res.sendStatus(401); // Unauthorized
    }
    
    const user = await User.findById(userId).select('-password'); // Exclude sensitive fields

    if (!user) {
      return res.sendStatus(404) // User not found
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving me user:', error);
    res.status(500).json({ message: 'Error retrieving me user' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user by id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};