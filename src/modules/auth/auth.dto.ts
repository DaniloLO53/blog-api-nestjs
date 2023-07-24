import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLogin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
