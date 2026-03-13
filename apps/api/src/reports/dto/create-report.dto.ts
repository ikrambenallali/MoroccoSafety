import { IsNotEmpty, IsString, IsArray, IsObject } from 'class-validator';

export class CreateReportDto {

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsObject()
  location: {
    type: 'Point';
    coordinates: number[];
  };

  @IsArray()
  mediaIds?: string[];
}