// zones.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ZoneDocument = Zone & Document;

@Schema()
export class Zone {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Crisis' })
  crisisId: string;

  // GeoJSON Polygon
  @Prop({
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: {
      type: [[[Number]]], // tableau 3D pour polygon
      required: true,
    },
  })
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);

// Index 2dsphere pour les requêtes géospatiales
ZoneSchema.index({ geometry: '2dsphere' });