import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import type { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
@Controller('media')
export class MediaController {

  constructor(private mediaService: MediaService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(process.cwd(), 'uploads'),
      filename: (req, file, cb) => {
        // générer un nom unique + garder l'extension
        const ext = file.originalname.split('.').pop();
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        cb(null, uniqueName);
      }
    })
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log('📤 Fichier uploadé:', {
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
    });

    const media = await this.mediaService.create(file);

    const url = `http://localhost:3000/uploads/${file.filename}`;
    console.log('✅ URL générée:', url);

    return {
      ...media.toObject(),
      url
    };
  }

  @Get()
  async findAll() {
    const medias = await this.mediaService.findAll();
    return medias.map(media => ({
      ...media.toObject(),
      url: `http://localhost:3000/uploads/${media.filename}`
    }));
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const media = await this.mediaService.findById(id);
    if (!media) {
      return { error: 'Media not found' };
    }
    return {
      ...media.toObject(),
      url: `http://localhost:3000/uploads/${media.filename}`
    };
  }

}