import { IsNotEmpty, IsString } from 'class-validator';

export class RegionDto {
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  nameRu: string;
}
