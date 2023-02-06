import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DealDocument = Deal & Document;

@Schema()
export class Deal {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
