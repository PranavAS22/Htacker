// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from './jwt.middleware';  // Import the interface

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const { email, password } = body;

    // Calling the service to handle login and return JWT token
    const result = await this.authService.login(email, password);

    const payload = { sub: result.userId };
    const token = this.jwtService.sign(payload, { secret: process.env.SECRET_KEY });

    // Setting the JWT token in cookies
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    return res.json({ message: 'Login successful' });
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }

  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub; // Access the user information from JWT token
    return this.authService.getProfile(userId);
  }

  @Post('save-day')
  async saveDay(@Req() req: AuthenticatedRequest, @Body() body: { calories: number; water: number; steps: number }) {
    const userId = req.user?.sub;
    const { calories, water, steps } = body;
    return this.authService.saveDay(userId, calories, water, steps);
  }

  @Get('get-user-id')
  async getUserId(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const userId = req.user?.sub;
    return res.status(200).json({ userId });
  }
}
