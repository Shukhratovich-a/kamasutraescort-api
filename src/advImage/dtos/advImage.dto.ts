export class AdvImageDto {
  first: Express.Multer.File[];
  second: Express.Multer.File[];
  third: Express.Multer.File[];
  fourth: Express.Multer.File[];
}

export type ImageType = "first" | "second" | "third" | "fourth";
