// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt';

const secret = process.env.JWT_SECRET;
// console.log('JWT_SECRET in authMiddleware:', secret);

if (!secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Token missing');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    // Приведение типа для decoded
    req.user = decoded as JwtPayload;
    next();
  });
};
