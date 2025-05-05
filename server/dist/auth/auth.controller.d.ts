import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthenticatedRequest } from './jwt.middleware';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(body: {
        email: string;
        password: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    getProfile(req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    saveDay(req: AuthenticatedRequest, body: {
        calories: number;
        water: number;
        steps: number;
    }): Promise<{
        message: string;
    }>;
    getUserId(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
