import { ConflictException, Injectable } from '@nestjs/common';
import { UserSignUp } from './user.dto';
import { UserRepository } from './user.repository';
import { EmailAndNickname } from './user.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async verifyUserExists({
    email,
    nickname,
  }: EmailAndNickname): Promise<void> {
    const user = await this.userRepository.findByEmailOrNickname({
      email,
      nickname,
    });
    console.log('user', user);
    if (user.length !== 0)
      throw new ConflictException({
        message: 'Email or nickname already registered',
      });
  }

  async createUser(userData: UserSignUp) {
    const { nickname, email, password } = userData;

    await this.verifyUserExists({ nickname, email });
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }
}
