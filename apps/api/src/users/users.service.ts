import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async create(userData: any) {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }
  async getProfile(userId: string) {
    console.log("Fetching profile for user ID:", userId);
    return this.userModel.findById(userId).select('-password');
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true }
    ).select('-password');
  }
}