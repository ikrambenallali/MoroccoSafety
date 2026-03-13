import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReportDocument = Report & Document;

export enum ReportStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Report {

  @Prop({ required: true })
  description: string;

  @Prop({
    type: String,
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  status: ReportStatus;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: [String] })
  mediaIds: string[];
}

export const ReportSchema = SchemaFactory.createForClass(Report);
ReportSchema.index({ location: '2dsphere' });