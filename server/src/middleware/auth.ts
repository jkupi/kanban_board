import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'no token found' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token' });
    }

    if (decoded) {
      req.user = decoded as JwtPayload;
      return next();
    }

    return res.status(500).json({ message: 'you are a failure' });
  });
  return;
};
