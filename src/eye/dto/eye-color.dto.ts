import { IsString } from 'class-validator';

export class EyeColorDto {
  @IsString()
  eyeColorNameEn: string;

  @IsString()
  eyeColorNameRu: string;
}
