import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SocialsEntity } from '../socials.entity';

import { SocialsDto } from '../dtos/socials.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class SocialsService {
  constructor(
    @InjectRepository(SocialsEntity)
    private readonly socialsRepository: Repository<SocialsEntity>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
      const socials = await this.socialsRepository.find({ relations: ['user'] });
      if (!socials) {
        throw new NotFoundException();
      }

      return socials;
    } catch {
      throw new BadRequestException();
    }
  }

  async create(id: number, { telegram, whatsapp, instagram, facebook }: SocialsDto) {
    const oldSocials = await this.socialsRepository.findOne({ where: { user: { id } } });
    if (oldSocials) {
      throw new BadRequestException('this user socials exist. please patch it');
    }

    const newSocialsTemplate = this.socialsRepository.create({
      telegram: telegram ? telegram : null,
      whatsapp: whatsapp ? whatsapp : null,
      instagram: instagram ? instagram : null,
      facebook: facebook ? facebook : null,
      user: { id },
    });
    const newSocials = await this.socialsRepository.save(newSocialsTemplate);
    if (!newSocials) {
      throw new BadRequestException();
    }
    const userEdit = await this.userService.updateSocials(id, newSocials.id);
    if (!userEdit) {
      throw new BadRequestException();
    }

    return {
      status: HttpStatus.CREATED,
      message: 'created',
      socials: newSocials,
    };
  }

  async update(id: number, { telegram, whatsapp, instagram, facebook }: SocialsDto) {
    const oldSocials = await this.socialsRepository.findOne({ where: { user: { id } } });
    if (!oldSocials) {
      throw new NotFoundException('this user not found');
    }

    const newSocials = await this.socialsRepository.save({
      ...oldSocials,
      telegram: telegram ? telegram : null,
      whatsapp: whatsapp ? whatsapp : null,
      instagram: instagram ? instagram : null,
      facebook: facebook ? facebook : null,
    });
    if (!newSocials) {
      throw new BadRequestException();
    }

    const userEdit = await this.userService.updateSocials(id, newSocials.id);
    if (!userEdit) {
      throw new BadRequestException();
    }

    return {
      status: HttpStatus.OK,
      message: 'updated',
      socials: newSocials,
    };
  }

  async delete(id: number) {
    const oldSocials = await this.socialsRepository.findOne({ where: { user: { id } } });
    if (!oldSocials) {
      throw new NotFoundException('this user not found');
    }

    const userEdit = await this.userService.updateSocials(id, null);
    if (!userEdit) {
      throw new BadRequestException();
    }

    const deletedSocials = await this.socialsRepository.delete({ user: { id } });
    if (!deletedSocials) {
      throw new BadRequestException();
    }

    return {
      status: HttpStatus.OK,
      message: 'deleted',
      socials: deletedSocials,
    };
  }
}
