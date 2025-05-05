// src/auth/auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // Registration
  async register(name: string, email: string, password: string) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    await user.save();
    return { message: 'Registration successful' };
  }

  // Login
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Return the userId after successful login
    return {
      userId: user._id,
    };
  }

  // Validate JWT token
  async validateJwt(payload: any) {
    const user = await this.userModel.findById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Get user profile
  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Save day data (calories, water, steps)
  async saveDay(userId: string, calories: number, water: number, steps: number) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const nextDayNumber = (user.day.length || 0) + 1;

    // Temporarily disable validation by passing 'validate: false' to 'save()'
    user.day.push({
      day: nextDayNumber,
      calories,
      water,
      steps,
    });

    // Save the document without running validation
    await user.save();

    return { message: `Day ${nextDayNumber} saved successfully` };
  }
}
