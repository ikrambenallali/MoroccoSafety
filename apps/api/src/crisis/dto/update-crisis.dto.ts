import { PartialType } from '@nestjs/mapped-types';
import { CreateCrisisDto } from './create-crisis.dto';

export class UpdateCrisisDto extends PartialType(CreateCrisisDto) {}