import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateProfile(
      req.user.id,
      updateUserDto
    );
  }

  @UseGuards(JwtAuthGuard ,RolesGuard)
    @Roles(Role.ADMIN)

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @Put('role')
  updateRole(@Body() body: { userId: string; role: string }) {
    return this.usersService.updateRole(body.userId, body.role);
  }
}