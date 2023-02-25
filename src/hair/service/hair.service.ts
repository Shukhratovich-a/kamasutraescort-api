import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HairEntity } from '../hair.entity';

import { HairDto } from '../dto/hair.dto';

@Injectable()
export class HairService {
  constructor(
    @InjectRepository(HairEntity)
    private readonly hairRepository: Repository<HairEntity>,
  ) {}

  async findAll() {
    const hairs = await this.hairRepository.find();
    if (!hairs) {
      throw new HttpException('hairs not found', HttpStatus.NOT_FOUND);
    }

    return hairs;
  }

  async create({ nameEn, nameRu }: HairDto) {
    const oldHair = await this.hairRepository.findOne({
      where: [{ nameEn }, { nameRu }],
    });
    if (oldHair) {
      throw new HttpException('this hair name exits', HttpStatus.BAD_REQUEST);
    }

    const hair = await this.hairRepository.save({ nameEn, nameRu });
    if (!hair) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.CREATED,
      message: 'created',
      hair,
    };
  }

  async update(id: number, { nameEn, nameRu }: HairDto) {
    const oldHair = await this.hairRepository.findOne({
      where: { id },
    });
    if (!oldHair) {
      throw new HttpException('hair not found', HttpStatus.BAD_REQUEST);
    }

    const nameCheck = await this.hairRepository.findOne({
      where: [{ nameEn, nameRu }],
    });
    if (nameCheck) {
      throw new HttpException('this hair name exits', HttpStatus.BAD_REQUEST);
    }

    const hair = await this.hairRepository.save({
      ...oldHair,
      ...{
        nameEn: nameEn,
        nameRu: nameRu,
      },
    });
    if (!hair) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'updated',
      hair,
    };
  }

  async delete(id: number) {
    const oldHair = await this.hairRepository.findOne({
      where: { id },
    });
    if (!oldHair) {
      throw new HttpException('hair not found', HttpStatus.BAD_REQUEST);
    }
    const hair = await this.hairRepository.delete(id);
    if (!hair) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.ACCEPTED,
      message: 'deleted',
      hair: oldHair,
    };
  }
}
