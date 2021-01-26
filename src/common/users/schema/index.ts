import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';

export type UsersDoc = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  birthday: Date;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  interest: [string];

  @Prop({ enum: ['admin', 'user'] })
  roles: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
