import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum CrisisStatus {
  SIGNALEE = 'SIGNALEE',
  VALIDEE = 'VALIDEE',
  EN_COURS = 'EN_COURS',
  RESOLUE = 'RESOLUE',
}

export type CrisisDocument = Crisis & Document;

@Schema({ timestamps: true })
export class Crisis {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: CrisisStatus, default: CrisisStatus.SIGNALEE })
  status: CrisisStatus;

  @Prop({ required: true })
  severity: string; // tu peux mettre enum aussi

  @Prop({ type: Object })
  zone: { 
    latitude: number;
    longitude: number;
    radius?: number; // optionnel
  };
}

export const CrisisSchema = SchemaFactory.createForClass(Crisis);