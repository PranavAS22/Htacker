"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("./user.schema");
let AuthService = class AuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(name, email, password) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ name, email, password: hashedPassword });
        await user.save();
        return { message: 'Registration successful' };
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        return {
            userId: user._id,
        };
    }
    async validateJwt(payload) {
        const user = await this.userModel.findById(payload.sub);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async getProfile(userId) {
        const user = await this.userModel.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async saveDay(userId, calories, water, steps) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const nextDayNumber = (user.day.length || 0) + 1;
        user.day.push({
            day: nextDayNumber,
            calories,
            water,
            steps,
        });
        await user.save();
        return { message: `Day ${nextDayNumber} saved successfully` };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map