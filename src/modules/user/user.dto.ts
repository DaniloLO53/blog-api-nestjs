import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignUp {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickname: string;
}
