import { GenderEnum } from 'src/enums/gender.enum';

export class UserEditDto {
  username?: string;

  email?: string;

  password?: string;

  region?: number;

  gender?: GenderEnum;

  birthDate?: Date;

  fullname?: string;

  height?: number;

  weight?: number;

  about?: string;

  goal?: number;

  hairColor?: number;

  eyeColor?: number;

  images?: number;
}
