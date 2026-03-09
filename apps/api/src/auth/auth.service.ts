import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await this.usersService.create({
    ...data,
    password: hashedPassword,
  });

  const payload = {
    sub: user._id,
    email: user.email,
    role: user.role,
  };

  const token = this.jwtService.sign(payload);

  return {
    user,
    access_token: token,
  };
}
async login(data: any) {

  const user = await this.usersService.findByEmail(data.email);

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
    sub: user._id,
    email: user.email,
    role: user.role,
  };

  const token = this.jwtService.sign(payload);

  return {
    access_token: token,
  };
}
}