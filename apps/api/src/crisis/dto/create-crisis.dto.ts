import { IsNotEmpty, IsEnum, IsObject, IsNumber } from 'class-validator';
import { CrisisStatus } from '../schemas/crisis.schema';

export class CreateCrisisDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(CrisisStatus)
  status: CrisisStatus;

  @IsNotEmpty()
  severity: string;

  @IsObject()
  zone: {
    latitude: number;
    longitude: number;
    radius?: number;
  };
}