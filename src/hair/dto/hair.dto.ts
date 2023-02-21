import { IsString } from 'class-validator';

export class HairDto {
  @IsString()
  hairNameEn: string;

  @IsString()
  hairNameRu: string;
}
