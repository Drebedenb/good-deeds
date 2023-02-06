import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  nameTag: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  friends: string[];

  @Prop()
  deeds: [{ type: Types.ObjectId; ref: 'Deal' }];
}

export const UserSchema = SchemaFactory.createForClass(User);
