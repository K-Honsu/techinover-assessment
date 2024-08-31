import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId, Model, FilterQuery, isObjectIdOrHexString, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { Role, User } from './schemas/user.schema';
import { UserMethods } from './schemas/methods';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { NotFoundException } from '@nestjs/common';
import { ToggleUserBanDto } from './dto/toggle-user-ban.dto';

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

  async getUsers() {

    const users = await this.userModel
      .find()
      .sort({ createdAt: 1 })
      .select(["-password", "-updatedAt"])
      .limit(50)
      .lean()
      .exec();

    return users;
  }

  async toggleUserBanStatus(toggleUserBanDto: ToggleUserBanDto) {
    const { userId } = toggleUserBanDto
    const user = await this.getUserOrThrow(userId)

    if (user.isBanned === true) {
      user.isBanned = false
    } else {
      user.isBanned = true
    }

    await user.save()

    return { message: "Updated User Status successfully." }

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
