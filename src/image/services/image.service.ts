import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { ImageUploadDto } from '../dtos/image-upload.dto';

import { ImageEntity } from '../image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    private readonly userService: UserService,
  ) {}

  async getById(id: number) {
    try {
      const images = await this.imageRepository.findOne({ where: { user: { id: Number(id) } } });
      if (!images) {
        throw new NotFoundException();
      }

      return images;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async imageUpload(id: number, files: ImageUploadDto) {
    try {
      const oldImages = await this.imageRepository.findOne({
        where: { user: { id: Number(id) } },
        relations: ['user'],
      });

      if (!oldImages) {
        const newImagesTemplate = this.imageRepository.create({
          avatar: files.avatar ? files.avatar[0].filename : null,
          profileImageFirst: files.profileImageFirst ? files.profileImageFirst[0].filename : null,
          profileImageSecond: files.profileImageSecond ? files.profileImageSecond[0].filename : null,
          profileImageThirth: files.profileImageThirth ? files.profileImageThirth[0].filename : null,
          profileImageFourth: files.profileImageFourth ? files.profileImageFourth[0].filename : null,
          user: {
            id: Number(id),
          },
        });

        const newImages = await this.imageRepository.save(newImagesTemplate);

        return {
          status: 200,
          message: 'ok',
          images: newImages,
        };
      }

      const newImages = await this.imageRepository.save({
        ...oldImages,
        avatar: files.avatar ? files.avatar[0].filename : oldImages.avatar,
        profileImageFirst: files.profileImageFirst ? files.profileImageFirst[0].filename : oldImages.profileImageFirst,
        profileImageSecond: files.profileImageSecond
          ? files.profileImageSecond[0].filename
          : oldImages.profileImageSecond,
        profileImageThirth: files.profileImageThirth
          ? files.profileImageThirth[0].filename
          : oldImages.profileImageThirth,
        profileImageFourth: files.profileImageFourth
          ? files.profileImageFourth[0].filename
          : oldImages.profileImageFourth,
      });

      return {
        status: 200,
        message: 'ok',
        images: newImages,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
