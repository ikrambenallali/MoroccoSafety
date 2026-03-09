import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrisisService } from './crisis.service';
import { CrisisController } from './crisis.controller';
import { Crisis, CrisisSchema } from './schemas/crisis.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Crisis.name, schema: CrisisSchema }])],
  controllers: [CrisisController],
  providers: [CrisisService],
})
export class CrisisModule {}