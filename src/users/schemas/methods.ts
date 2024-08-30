import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

type VerifyPassword = (this: UserDocument, password: string) => Promise<void>;


export interface UserMethods {
  verifyPassword: VerifyPassword;
}

const verifyPassword: VerifyPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  if (!isValid) {
    throw new UnauthorizedException('Password is incorrect!');
  }
};



export const userMethods = [verifyPassword];