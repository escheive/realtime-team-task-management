import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

// Generate accessToken and refreshToken with jwt
const generateTokens = (user: any) => {
  const accessToken = jwt.sign({ userId: user._id }, 'access_secret', { expiresIn: '1hr' });
  const refreshToken = jwt.sign({ userId: user._id }, 'refresh_secret', { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Login user endpoint
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Validate user login
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT accessToken and refreshToken
    const { accessToken, refreshToken } = generateTokens(user);

    // Store refresh token securely in http cookie
    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};

// Refresh token endpoint
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  // Check for refresh token
  if (!refreshToken) {
    return res.status(401).send('No refresh token');
  }

  // Validate refresh token
  jwt.verify(refreshToken, 'refresh_secret', (error: any, user: any) => {
    if (error) {
      return res.status(403).send('Invalid refresh token');
    }

    // Generate new access token for user
    const { accessToken } = generateTokens(user);

    res.json({ accessToken });
  });
};