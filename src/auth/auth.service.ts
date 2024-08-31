import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.getUserOrThrow(email);
    if (user.isBanned) throw new BadRequestException("Account has been banned due to breach of security policy. Kindly contact support if you feel this was a mistake. Thank you.")
    await user.verifyPassword(password);

    const token = this.jwtService.sign({ sub: user.id, role: user.role });

    return { token };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;

    if (await this.userService.getUser(email)) {
      throw new BadRequestException('Email already exists!');
    }

    const user = await this.userService.createUser(signUpDto);

    const token = this.jwtService.sign({ sub: user.id, role: user.role });
    return { token };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
