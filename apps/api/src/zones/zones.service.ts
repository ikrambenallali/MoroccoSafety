// zones.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Zone, ZoneDocument } from './schemas/zones.schema';
import { CreateZoneDto } from './dto/create-zone.dto';

@Injectable()
export class ZonesService {
  constructor(
    @InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>
) {}

  async create(createZoneDto: CreateZoneDto) {
    const zone = new this.zoneModel(createZoneDto);
    return zone.save();
  }

  async findAll() {
    return this.zoneModel.find().populate('crisisId').exec();
  }

  async findOne(id: string) {
    const zone = await this.zoneModel.findById(id).populate('crisisId').exec();
    if (!zone) throw new NotFoundException('Zone not found');
    return zone;
  }
}