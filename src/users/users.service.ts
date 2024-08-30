import { Injectable } from '@nestjs/common';
import { ObjectId, Model, FilterQuery, isObjectIdOrHexString } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { User } from './schemas/user.schema';
import { UserMethods } from './schemas/methods';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { NotFoundException } from '@nestjs/common';

type Identifier = string | ObjectId;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User, object, UserMethods>) { }
  async getUser(identifier: Identifier) {
    const filter: FilterQuery<User> = {};

    if (isEmail(identifier)) {
      filter.email = identifier;
    } else if (isObjectIdOrHexString(identifier)) {
      filter._id = identifier;
    }
    const user = await this.userModel.findOne(filter).exec();

    return user;
  }

  async getUserOrThrow(identifier: Identifier) {
    const user = await this.getUser(identifier);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async createUser(signUpDto: SignUpDto) {
    const { email, password, name, role } = signUpDto;
    const user = await this.userModel.create({
      email,
      password,
      name,
      role
    });
    return user;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
