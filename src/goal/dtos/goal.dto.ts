import { IsNotEmpty, IsString } from 'class-validator';

export class GoalDto {
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  nameRu: string;
}
