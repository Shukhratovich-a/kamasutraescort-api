import { GenderEnum } from './gender.enum';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  gender?: GenderEnum;
}
