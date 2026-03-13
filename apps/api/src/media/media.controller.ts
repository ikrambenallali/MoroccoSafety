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
@Controller('media')
export class MediaController {

  constructor(private mediaService: MediaService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        // générer un nom unique + garder l'extension
        const ext = file.originalname.split('.').pop();
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        cb(null, uniqueName);
      }
    })
  }))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.mediaService.create(file);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.mediaService.findById(id);
  }

}