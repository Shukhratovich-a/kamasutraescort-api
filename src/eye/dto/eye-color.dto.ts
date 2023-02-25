import { IsString } from 'class-validator';

export class EyeColorDto {
  @IsString()
  nameEn: string;

  @IsString()
  nameRu: string;
}
