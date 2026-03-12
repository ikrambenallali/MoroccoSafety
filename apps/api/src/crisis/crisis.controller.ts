import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Patch } from '@nestjs/common';
import { CrisisService } from './crisis.service';
import { CreateCrisisDto } from './dto/create-crisis.dto';
import { UpdateCrisisDto } from './dto/update-crisis.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/role.enum';

@Controller('crisis')
export class CrisisController {
  constructor(private readonly crisisService: CrisisService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.AUTHORITY)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crisisService.remove(id);
  }

  @Patch(':id/close')
  closeCrisis(@Param('id') id: string) {
    return this.crisisService.closeCrisis(id);
  }
}