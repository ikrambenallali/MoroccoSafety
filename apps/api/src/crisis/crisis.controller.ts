import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CrisisService } from './crisis.service';
import { CreateCrisisDto } from './dto/create-crisis.dto';
import { UpdateCrisisDto } from './dto/update-crisis.dto';

@Controller('crisis')
export class CrisisController {
  constructor(private readonly crisisService: CrisisService) {}

  @Post()
  create(@Body() createCrisisDto: CreateCrisisDto) {
    return this.crisisService.create(createCrisisDto);
  }

  @Get()
  findAll() {
    return this.crisisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crisisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCrisisDto: UpdateCrisisDto) {
    return this.crisisService.update(id, updateCrisisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crisisService.remove(id);
  }
}