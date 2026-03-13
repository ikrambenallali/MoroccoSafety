import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from './schemas/media.schema';
import type { Express } from 'express';
@Injectable()
export class MediaService {

  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}

  async create(file: Express.Multer.File) {
    const media = new this.mediaModel({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
    });
    return media.save();
  }

  async findById(id: string) {
    return this.mediaModel.findById(id);
  }

}