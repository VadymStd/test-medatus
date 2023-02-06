import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ name: 'username', unique: true, nullable: false })
  username: string;

  @Prop({ name: 'password', unique: false, nullable: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
