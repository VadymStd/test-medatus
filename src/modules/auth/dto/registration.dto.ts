import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_EMAIL_LENGTH } from '../../../constants/email';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../../constants/password';

export class RegistrationDto {
  @IsString()
  @IsEmail()
  @MaxLength(MAX_EMAIL_LENGTH)
  email: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  password: string;
}
