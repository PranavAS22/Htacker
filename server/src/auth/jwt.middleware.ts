// src/auth/jwt.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies['access_token'];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  }
}
