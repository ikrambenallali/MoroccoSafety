import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { use } from 'passport';
import { AuthGuard } from '@nestjs/passport';

@Controller('reports')
export class ReportsController {

  constructor(private readonly reportsService: ReportsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateReportDto, @Req() req) {
    const userId = req.user.id; 
    return this.reportsService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Patch(':id/validate')
  validate(@Param('id') id: string) {
    return this.reportsService.validateReport(id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.reportsService.rejectReport(id);
  }

}