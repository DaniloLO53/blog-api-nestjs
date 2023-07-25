import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UserSignUp } from './user.dto';
import { EmailAndNickname } from './user.types';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findByEmailOrNickname(
    emailAndNickname: EmailAndNickname,
  ): Promise<User[]> {
    const { email, nickname } = emailAndNickname;

    return await this.prismaService.user.findMany({
      where: {
        OR: [{ email }, { nickname }],
      },
    });
  }

  async create(userData: UserSignUp): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...userData,
        created_at: new Date(),
      },
    });
  }
}
