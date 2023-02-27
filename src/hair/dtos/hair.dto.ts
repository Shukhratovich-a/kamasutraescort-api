import { IsString } from 'class-validator';

export class HairDto {
  @IsString()
  nameEn: string;

  @IsString()
  nameRu: string;
}
