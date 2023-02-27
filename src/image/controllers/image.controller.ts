import { Controller, Get, Param, Patch, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ImageService } from '../services/image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.imageService.getById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'profileImageFirst', maxCount: 1 },
        { name: 'profileImageSecond', maxCount: 1 },
        { name: 'profileImageThirth', maxCount: 1 },
        { name: 'profileImageFourth', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      },
    ),
  )
  async userImageUpload(
    @Param('id') id: number,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      profileImageFirst?: Express.Multer.File[];
      profileImageSecond?: Express.Multer.File[];
      profileImageThirth?: Express.Multer.File[];
      profileImageFourth?: Express.Multer.File[];
    },
  ) {
    return await this.imageService.imageUpload(id, files);
  }
}
