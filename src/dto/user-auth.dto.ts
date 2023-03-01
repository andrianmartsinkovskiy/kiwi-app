import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../types/user-roles.type';

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  role?: UserRole;
}
