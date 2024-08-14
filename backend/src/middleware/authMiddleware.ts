import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { refreshToken } from '../services/authService';

interface AuthenticatedRequest extends Request {
  userId?: string;
}


export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'access_secret') as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {

    if (error instanceof jwt.TokenExpiredError) {
      try {
        // Attempt to refresh the token
        const newToken = await refreshToken(req);

        if (newToken) {
          res.setHeader('Authorization', `Bearer ${newToken}`);
          const decoded = jwt.verify(newToken, 'access_secret') as { userId: string };
          req.userId = decoded.userId;
          return next();
        }
      } catch (err) {
        return res.status(401).json({ message: 'Token refresh failed' });
      }
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
};