import { IsDateString, IsEnum, IsNumber, IsString, ValidateIf } from "class-validator";

import { TypeEnum } from "src/enums/type.enum";

export class AdvertisementDto {
  @IsString()
  advName: string;

  @IsDateString()
  birthDate: Date;

  @IsEnum(TypeEnum)
  type: TypeEnum;

  @ValidateIf((o) => o.fullname)
  @IsString()
  fullname: string;

  @ValidateIf((o) => o.height)
  @IsNumber()
  height: number;

  @ValidateIf((o) => o.weight)
  @IsNumber()
  weight: number;

  @ValidateIf((o) => o.about)
  @IsString()
  about: string;

  @ValidateIf((o) => o.goal)
  @IsNumber()
  goal: number;

  @ValidateIf((o) => o.hairColor)
  @IsNumber()
  hairColor: number;

  @ValidateIf((o) => o.eyeColor)
  @IsNumber()
  eyeColor: number;
}
