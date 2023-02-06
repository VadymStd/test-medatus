import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../../constants/password';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  password: string;
}
