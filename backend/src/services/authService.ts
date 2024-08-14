import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const refreshToken = async (req: Request): Promise<string | null> => {
  // Extract refresh token from cookies or request body
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    throw new Error('No refresh token provided');
  }

  try {
    const decoded = jwt.verify(refreshToken, 'refresh_secret') as { userId: string };
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const newAccessToken = jwt.sign({ userId: user._id }, 'access_secret', { expiresIn: '15m' });
    return newAccessToken;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
