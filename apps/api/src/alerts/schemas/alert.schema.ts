import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlertDocument = Alert & Document;

@Schema({ timestamps: true })
export class Alert {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Types.ObjectId, ref: 'Crisis' })
  crisisId: string;

  @Prop()
  zone: string; // ex: "Oujda", "Rabat"

  @Prop({ default: false })
  sent: boolean;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);