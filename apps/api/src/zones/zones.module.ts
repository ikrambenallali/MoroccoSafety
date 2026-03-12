import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';
import { Zone, ZoneSchema } from './schemas/zones.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Zone.name, schema: ZoneSchema }]), // ✅ important
  ],
  controllers: [ZonesController],
  providers: [ZonesService],
})
export class ZonesModule {}