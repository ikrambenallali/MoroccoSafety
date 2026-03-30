import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true })
export class Media {

  @Prop({ required: true })
  filename!: string;

  @Prop({ required: true })
  path!: string;

  @Prop()
  mimetype!: string;

}

export const MediaSchema = SchemaFactory.createForClass(Media);