import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  findOneBy(arg0: { email: string; }) {
      throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
  

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({_id: id}).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email: email}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User>{
    return this.userModel
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedUser;
  }
}
