import { Controller, Delete, Param, Patch, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";

import { AdvImageDto, ImageType } from "../dtos/advImage.dto";

import { AdvImageService } from "../services/advImage.service";

@Controller("image")
export class AdvImageController {
  constructor(private readonly advImageService: AdvImageService) {}

  @Patch(":id")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "first", maxCount: 1 },
        { name: "second", maxCount: 1 },
        { name: "third", maxCount: 1 },
        { name: "fourth", maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: join(process.cwd(), "files", "images"),
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      },
    ),
  )
  async uploadImages(
    @Param("id") id: number,
    @UploadedFiles()
    files: AdvImageDto,
  ) {
    return this.advImageService.uploadImages(id, files);
  }

  @Delete(":id")
  async deleteImages(@Param("id") id: number, @Query("type") type: ImageType) {
    return await this.advImageService.deleteImages(id, type);
  }
}
