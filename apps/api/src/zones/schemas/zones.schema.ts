import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type ZoneDocument = Zone & Document;

@Schema()
export class Zone {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: Types.ObjectId, ref: 'Crisis' })
  crisisId! : string;

  @Prop({
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: {
      type: [[[Number]]], 
      required: true,
    },
  })
  geometry!: {
    type: string;
    coordinates: number[][][];
  };
  mediaId!: { type: ObjectId, ref: 'Media' }
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);

ZoneSchema.index({ geometry: '2dsphere' });