import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';

import { GenderEnum } from 'src/enums/gender.enum';

export class RegisterDto {
  @IsString()
  @Length(3, 32)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 64)
  password: string;

  @IsString()
  @IsDateString()
  birthDate: Date;

  @IsEnum(GenderEnum)
  gender: GenderEnum;
}
