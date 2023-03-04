import { HttpStatus, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { AvatarEntity } from "../avatar.entity";

import { UserService } from "src/user/services/user.service";

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(AvatarEntity) private readonly avatarRepository: Repository<AvatarEntity>,
    private readonly userService: UserService,
  ) {}

  async uploadAvatar(id: number, avatar: Express.Multer.File) {
    if (!avatar) throw new BadRequestException();
    await this.userService.getById(id);

    const oldAvatar = await this.avatarRepository.findOne({ where: { user: { id } }, relations: ["user"] });
    const newAvatar = await this.avatarRepository.save({ ...oldAvatar, filename: avatar.filename, user: { id } });

    if (!oldAvatar) {
      const user = await this.userService.updateForeignRow(id, newAvatar.id, "avatar");
      delete user.password;

      newAvatar.user = user;
    } else {
      newAvatar.user = oldAvatar.user;
      delete newAvatar.user.password;
    }

    return {
      status: HttpStatus.OK,
      message: "ok",
      avatar: newAvatar,
    };
  }

  async deleteAvatar(id: number) {
    const oldAvatar = await this.avatarRepository.findOne({ where: { user: { id } } });
    if (!oldAvatar) throw new NotFoundException();

    const user = await this.userService.updateForeignRow(id, null, "avatar");
    if (!user) throw new BadRequestException();

    const deteledAvatar = await this.avatarRepository.delete(oldAvatar.id);
    if (!deteledAvatar) throw new BadRequestException();

    return {
      status: HttpStatus.OK,
      message: "deleted",
    };
  }
}
