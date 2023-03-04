import { Injectable, NotFoundException, BadRequestException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import {
  USER_NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  WRONG_USERNAME_ERROR,
  WRONG_EMAIL_ERROR,
} from "../constants/user.constant";

import { UserEntity } from "../user.entity";

import { RoleEnum } from "src/enums/role.enum";

import { UserUpdateDto } from "../dtos/user/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getAll(limit = 10, page = 1) {
    const users = await this.userRepository.find({
      take: limit,
      skip: limit * (page - 1),
      order: { createdAt: "ASC" },
      select: ["id", "username", "email", "role", "birthDate", "region", "avatar", "createdAt", "updatedAt"],
      relations: ["avatar", "region"],
    });
    if (!users) {
      throw new NotFoundException();
    }

    return users;
  }

  async getByRole(role: RoleEnum, limit = 10, page = 1) {
    const users = await this.userRepository.find({
      where: { role },
      take: limit,
      skip: limit * (page - 1),
      order: { createdAt: "ASC" },
      select: ["id", "username", "email", "role", "birthDate", "region", "avatar", "createdAt", "updatedAt"],
      relations: ["region", "avatar"],
    });
    if (!users) {
      throw new NotFoundException();
    }

    return users;
  }

  async getByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ["id", "username", "email", "role", "birthDate", "region", "avatar", "createdAt", "updatedAt"],
      relations: ["region", "avatar"],
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["id", "username", "email", "role", "birthDate", "region", "avatar", "createdAt", "updatedAt"],
      relations: ["region", "avatar"],
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return user;
  }

  async updateUser(id: number, body: UserUpdateDto) {
    await this.checkUserName({ id, ...body });

    const oldUser = await this.userRepository.findOne({ where: { id } });
    if (!oldUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    const newUser = await this.userRepository.save({ ...oldUser, ...body }, {});
    if (!newUser) {
      throw new BadRequestException(BAD_REQUEST_ERROR);
    }

    delete newUser.password;

    return {
      status: HttpStatus.OK,
      message: "edited",
      user: newUser,
    };
  }

  async updateForeignRow(id: number, rowId: number, row: "avatar" | "socails") {
    const oldUser = await this.userRepository.findOne({ where: { id } });
    if (!oldUser) throw new NotFoundException(USER_NOT_FOUND_ERROR);

    const newUser = await this.userRepository.save({
      ...oldUser,
      [row]: rowId ? { id: rowId } : null,
    });
    delete newUser.password;
    delete newUser[row];

    return newUser;
  }

  async checkUserName({ id, username, email }: { id?: number; username?: string; email?: string }) {
    if (username) {
      const checkedUser = await this.userRepository.findOne({ where: { username } });
      if (checkedUser && checkedUser.id != id) throw new BadRequestException(WRONG_USERNAME_ERROR);
    }

    if (email) {
      const checkedUser = await this.userRepository.findOne({ where: { email } });
      if (checkedUser && checkedUser.id != id) throw new BadRequestException(WRONG_EMAIL_ERROR);
    }
  }
}
