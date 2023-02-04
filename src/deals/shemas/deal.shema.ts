import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose"

export type DealDocument = Deal & Document;

@Schema()
export class Deal {
    @Prop()
    title: string
    
    @Prop()
    description: string
}

export const DealSchema = SchemaFactory.createForClass(Deal);