import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { SocialsEntity } from "../socials.entity";

import { SocialsDto } from "../dtos/socials.dto";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class SocialsSerivce {
  constructor(
    @InjectRepository(SocialsEntity)
    private readonly socialsRepository: Repository<SocialsEntity>,
    private readonly userService: UserService,
  ) {}

  async getAll(limit = 10, page = 1) {
    const socials = this.socialsRepository.find({
      take: limit,
      skip: limit * (page - 1),
      order: { createdAt: "ASC" },
      relations: ["user"],
    });
    if (!socials) throw new NotFoundException();

    return socials;
  }

  async getById(id: number) {
    const social = this.socialsRepository.findOne({ where: { id }, relations: ["user"] });
    if (!social) throw new NotFoundException();

    return social;
  }

  async updateSocials(id: number, body: SocialsDto) {
    await this.userService.getById(id);

    const oldSocials = await this.socialsRepository.findOne({ where: { user: { id } }, relations: ["user"] });
    const newSocials = await this.socialsRepository.save({ ...oldSocials, ...body, user: { id } });

    if (!oldSocials) {
      const user = await this.userService.updateForeignRow(id, newSocials.id, "socails");
      delete user.password;
      newSocials.user = user;
    } else {
      newSocials.user = oldSocials.user;
      delete newSocials.user.password;
    }

    return {
      status: HttpStatus.OK,
      message: "ok",
      avatar: newSocials,
    };
  }

  async deleteSocials(id: number) {
    const oldSocials = await this.socialsRepository.findOne({ where: { user: { id } } });
    if (!oldSocials) throw new NotFoundException();

    const user = await this.userService.updateForeignRow(id, null, "socails");
    if (!user) throw new BadRequestException();

    const deleted = await this.socialsRepository.delete(oldSocials.id);
    if (!deleted) throw new BadRequestException();
    console.log(deleted);

    return {
      status: HttpStatus.OK,
      message: "deleted",
    };
  }
}
