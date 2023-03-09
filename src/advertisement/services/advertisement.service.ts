import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { TypeEnum } from "src/enums/type.enum";

import { Repository } from "typeorm";

import { AdvertisementEntity } from "../advertisement.entity";

import { AdvertisementDto } from "../dtos/advertisement.dto";

@Injectable()
export class AdvertisementSerivce {
  constructor(
    @InjectRepository(AdvertisementEntity)
    private readonly advertismentRepository: Repository<AdvertisementEntity>,
  ) {}

  async getAll(limit = 10, page = 1) {
    let advertisements = await this.advertismentRepository.find({
      take: limit,
      skip: limit * (page - 1),
      order: { createdAt: "ASC" },
      relations: ["goal", "hairColor", "eyeColor", "user", "images"],
    });
    if (!advertisements) throw new NotFoundException();

    advertisements = advertisements.map((advertisement) => {
      delete advertisement.user.password;

      return advertisement;
    });

    return advertisements;
  }

  async getByUsername(username: string, limit = 10, page = 1) {
    let advertisements = await this.advertismentRepository.find({
      where: { user: { username } },
      take: limit,
      skip: limit * (page - 1),
      order: { createdAt: "ASC" },
      relations: ["goal", "hairColor", "eyeColor", "user", "images"],
    });
    if (!advertisements) throw new NotFoundException();

    advertisements = advertisements.map((advertisement) => {
      delete advertisement.user.password;

      return advertisement;
    });

    return advertisements;
  }

  async getByType(type: TypeEnum, limit = 10, page = 1) {
    let advertisements = await this.advertismentRepository.find({
      where: { type },
      take: limit,
      skip: limit * (page - 1),
      order: { createdAt: "ASC" },
      relations: ["goal", "hairColor", "eyeColor", "user", "images"],
    });
    if (!advertisements) throw new NotFoundException();

    advertisements = advertisements.map((advertisement) => {
      delete advertisement.user.password;

      return advertisement;
    });

    return advertisements;
  }

  async getBySearchName(searchName: string) {
    const advertisement = await this.advertismentRepository.findOne({
      where: { searchName },
      relations: ["goal", "hairColor", "eyeColor", "user", "images"],
    });
    if (!advertisement) throw new NotFoundException();
    delete advertisement.user.password;

    return advertisement;
  }

  async create(id: number, body: AdvertisementDto) {
    const { goal, hairColor, eyeColor, advName, ...keys } = body;
    const searchName = advName + "-" + Date.now() + Math.round(Math.random() * 1e9);

    const advertisementTemp = this.advertismentRepository.create({
      ...keys,
      advName,
      searchName,
      goal: goal ? { id: goal } : null,
      hairColor: hairColor ? { id: hairColor } : null,
      eyeColor: eyeColor ? { id: eyeColor } : null,
      user: { id: id },
    });
    const advertisement = await this.advertismentRepository.save(advertisementTemp);

    if (!advertisement) throw new BadRequestException();

    return advertisement;
  }

  async edit(id: number, body: AdvertisementDto) {
    const { goal, hairColor, eyeColor, advName, ...keys } = body;

    const oldAdvertisement = await this.advertismentRepository.findOne({ where: { id } });
    if (!oldAdvertisement) throw new NotFoundException();

    const newAdvertisement = await this.advertismentRepository.save({
      ...oldAdvertisement,
      ...keys,
      advName,
      goal: goal ? { id: goal } : null,
      hairColor: hairColor ? { id: hairColor } : null,
      eyeColor: eyeColor ? { id: eyeColor } : null,
      user: { id: id },
    });

    return {
      status: 200,
      message: "edited",
      advertisment: newAdvertisement,
    };
  }

  async delete(id: number) {
    const oldAdvertisement = await this.advertismentRepository.findOne({ where: { id } });
    if (!oldAdvertisement) throw new NotFoundException();

    const deleted = await this.advertismentRepository.delete(id);
    if (!deleted) throw new NotFoundException();

    return {
      status: 200,
      message: "deleted",
    };
  }
}
