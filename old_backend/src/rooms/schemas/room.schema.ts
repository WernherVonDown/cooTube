import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  roomId: string;

  @Prop()
  roomName?: string;

  @Prop()
  password?: string;

  @Prop()
  description?: string;

  @Prop()
  isPublic: boolean;

  @Prop()
  hasPassword: boolean

  @Prop()
  users: any[];

  @Prop()
  createdAt: string; 
}

export const RoomSchema = SchemaFactory.createForClass(Room);