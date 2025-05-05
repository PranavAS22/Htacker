import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(name: string, email: string, password: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        userId: unknown;
    }>;
    validateJwt(payload: any): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    saveDay(userId: string, calories: number, water: number, steps: number): Promise<{
        message: string;
    }>;
}
