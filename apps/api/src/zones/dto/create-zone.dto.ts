// create-zone.dto.ts
import { IsNotEmpty, IsString, IsMongoId, IsObject } from 'class-validator';

export class CreateZoneDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsMongoId()
  crisisId!: string;

  @IsNotEmpty()
  @IsObject()
  geometry!: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  mediaId?: string;
}