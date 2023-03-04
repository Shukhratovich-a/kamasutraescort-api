import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

import { RoleEnum } from 'src/enums/role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(3, 32)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;

  @IsNumber()
  @IsNotEmpty()
  region: number;
}
