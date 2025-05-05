// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profileImage: string;

  // Define day as an array of objects where each object represents a daily record
  @Prop({
    type: [
      {
        day: { type: Number, required: true }, // Use day number (Day 1, Day 2, etc.)
        calories: { type: Number, required: true },
        water: { type: Number, required: true },
        steps: { type: Number, required: true },
      },
    ],
    default: [],
  })
  day: {
    day: number; // Day number
    calories: number;
    water: number;
    steps: number;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
