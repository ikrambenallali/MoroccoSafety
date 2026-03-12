import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crisis, CrisisDocument } from './schemas/crisis.schema';
import { CreateCrisisDto } from './dto/create-crisis.dto';
import { UpdateCrisisDto } from './dto/update-crisis.dto';

@Injectable()
export class CrisisService {
  constructor(@InjectModel(Crisis.name) private crisisModel: Model<CrisisDocument>) {}

  async create(createCrisisDto: CreateCrisisDto): Promise<Crisis> {
    const crisis = new this.crisisModel(createCrisisDto);
    return crisis.save();
  }

  async findAll(): Promise<Crisis[]> {
    return this.crisisModel.find().exec();
  }

  async findOne(id: string): Promise<Crisis> {
    const crisis = await this.crisisModel.findById(id).exec();
    if (!crisis) throw new NotFoundException('Crisis not found');
    return crisis;
  }

  async update(id: string, updateCrisisDto: UpdateCrisisDto): Promise<Crisis> {
    const crisis = await this.crisisModel.findByIdAndUpdate(id, updateCrisisDto, { new: true });
    if (!crisis) throw new NotFoundException('Crisis not found');
    return crisis;
  }

  async remove(id: string): Promise<void> {
    const result = await this.crisisModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Crisis not found');
  }

  async closeCrisis(id: string) {
  return this.crisisModel.findByIdAndUpdate(
    id,
    { status: 'RESOLUE' },
    { new: true }
  );
}
}