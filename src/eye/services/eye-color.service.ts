import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EyeColorEntity } from '../eye-color.entity';

import { EyeColorDto } from '../dtos/eye-color.dto';

@Injectable()
export class EyeColorService {
  constructor(
    @InjectRepository(EyeColorEntity)
    private readonly eyeColorRepository: Repository<EyeColorEntity>,
  ) {}

  async findAll() {
    const eyes = await this.eyeColorRepository.find();
    if (!eyes) {
      throw new HttpException('eyes not found', HttpStatus.NOT_FOUND);
    }

    return eyes;
  }

  async create({ nameEn, nameRu }: EyeColorDto) {
    const oldEye = await this.eyeColorRepository.findOne({
      where: [{ nameEn }, { nameRu }],
    });
    if (oldEye) {
      throw new HttpException('this eye name exits', HttpStatus.BAD_REQUEST);
    }

    const eye = await this.eyeColorRepository.save({
      nameEn,
      nameRu,
    });
    if (!eye) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.CREATED,
      message: 'created',
      eye,
    };
  }

  async update(id: number, { nameEn, nameRu }: EyeColorDto) {
    const oldEye = await this.eyeColorRepository.findOne({
      where: { id },
    });
    if (!oldEye) {
      throw new HttpException('eye not found', HttpStatus.BAD_REQUEST);
    }

    const eyeNameCheck = await this.eyeColorRepository.findOne({
      where: [{ nameEn, nameRu }],
    });
    if (eyeNameCheck) {
      throw new HttpException('this eye name exits', HttpStatus.BAD_REQUEST);
    }

    const eye = await this.eyeColorRepository.save({
      ...oldEye,
      ...{ nameEn, nameRu },
    });
    if (!eye) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.ACCEPTED,
      message: 'updated',
      eye,
    };
  }

  async delete(id: number) {
    const oldEye = await this.eyeColorRepository.findOne({
      where: { id },
    });
    if (!oldEye) {
      throw new HttpException('eye not found', HttpStatus.BAD_REQUEST);
    }
    const eye = await this.eyeColorRepository.delete(id);
    if (!eye) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.ACCEPTED,
      message: 'deleted',
      eye: oldEye,
    };
  }
}
