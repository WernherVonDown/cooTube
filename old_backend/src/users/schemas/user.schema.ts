import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  password: string;

  @Prop()
  userName: string;

  @Prop()
  email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);