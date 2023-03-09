import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { AdvImageEntity } from "../advImage.entity";
import { AdvertisementEntity } from "src/advertisement/advertisement.entity";

import { AdvImageDto, ImageType } from "../dtos/advImage.dto";

@Injectable()
export class AdvImageService {
  constructor(
    @InjectRepository(AdvImageEntity)
    private readonly imageRepository: Repository<AdvImageEntity>,
    @InjectRepository(AdvertisementEntity)
    private readonly advertisementRepository: Repository<AdvertisementEntity>,
  ) {}

  async uploadImages(id: number, files: AdvImageDto) {
    if (!files) throw new BadRequestException();

    const oldAdvertisement = await this.advertisementRepository.findOne({ where: { id } });
    if (!oldAdvertisement) throw new NotFoundException();

    const imagesArr = Object.values(files);
    const oldImages = await this.imageRepository.findOne({
      where: { advertisement: { id } },
      relations: ["advertisement"],
    });

    if (!oldImages) {
      const imagesTemp = this.imageRepository.create({
        first: imagesArr[0] ? imagesArr[0][0].filename : null,
        second: imagesArr[1] ? imagesArr[1][0].filename : null,
        third: imagesArr[2] ? imagesArr[2][0].filename : null,
        fourth: imagesArr[3] ? imagesArr[3][0].filename : null,
        advertisement: { id },
      });
      const images = await this.imageRepository.save(imagesTemp);
      if (!images) throw new BadRequestException();

      const advertisement = await this.advertisementRepository.save({
        ...oldAdvertisement,
        images: { id: images.id },
      });
      if (!images) throw new BadRequestException();

      images.advertisement = advertisement;

      return {
        status: 200,
        message: "ok",
        images,
      };
    }

    const images = await this.imageRepository.save({
      ...oldImages,
      first: files.first ? files.first[0].filename : oldImages.first,
      second: files.second ? files.second[0].filename : oldImages.second,
      third: files.third ? files.third[0].filename : oldImages.third,
      fourth: files.fourth ? files.fourth[0].filename : oldImages.fourth,
    });
    if (!images) throw new BadRequestException();

    return {
      status: 200,
      message: "ok",
      images,
    };
  }

  async deleteImages(id: number, type: ImageType) {
    if (!type) throw new BadRequestException();

    const oldImages = await this.imageRepository.findOne({
      where: { advertisement: { id } },
      relations: ["advertisement"],
    });
    if (!oldImages) throw new NotFoundException();

    const newImages = {
      first: oldImages.first,
      second: oldImages.second,
      third: oldImages.third,
      fourth: oldImages.fourth,
    };
    newImages[type] = null;
    const imagesArr = Object.values(newImages).filter((image) => image);

    const deletedImages = await this.imageRepository.save({
      ...oldImages,
      first: imagesArr[0] ? imagesArr[0] : null,
      second: imagesArr[1] ? imagesArr[1] : null,
      third: imagesArr[2] ? imagesArr[2] : null,
      fourth: imagesArr[3] ? imagesArr[3] : null,
    });
    if (!deletedImages) throw new BadRequestException();

    return deletedImages;
  }
}
