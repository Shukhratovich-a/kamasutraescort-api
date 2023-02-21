import { IsNotEmpty, IsString } from 'class-validator';

export class RegionDto {
  @IsString()
  @IsNotEmpty()
  regionName: string;
}
