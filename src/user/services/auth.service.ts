import { BadRequestException, HttpStatus, Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { compare, genSalt, hash } from "bcrypt";

import {
  BAD_REQUEST_ERROR,
  INVALID_TOKEN_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from "../constants/user.constant";

import { UserEntity } from "../user.entity";

import { UserService } from "./user.service";

import { RegisterDto } from "../dtos/auth/register.dto";
import { LoginDto } from "../dtos/auth/login.dto";
import { CheckUserDto } from "../dtos/check-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createUser(body: RegisterDto) {
    await this.userService.checkUserName({ ...body });

    const salt = await genSalt(10);

    const newUser = this.userRepository.create({ ...body, password: await hash(body.password, salt) });

    const user = await this.userRepository.save(newUser);
    if (!user) {
      throw new BadRequestException(WRONG_PASSWORD_ERROR);
    }
    delete user.password;

    const payload = { username: user.username };

    return {
      status: HttpStatus.CREATED,
      message: "ok",
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async validateUser(body: LoginDto): Promise<Pick<UserEntity, "username">> {
    const user = await this.findUser(body.usernameOrEmail, body.usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(body.password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return { username: user.username };
  }

  async login(username: string) {
    const payload = { username };
    const user = await this.findUser(username, username);
    delete user.password;

    return {
      status: HttpStatus.OK,
      message: "ok",
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async checkUser(header: CheckUserDto) {
    try {
      const { username } = await this.jwtService.verifyAsync(JSON.parse(header.authorization));

      const user = await this.findUser(username);
      if (!user) {
        throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
      }
      delete user.password;

      return {
        status: HttpStatus.OK,
        message: "ok",
        accessToken: JSON.parse(header.authorization),
        user,
      };
    } catch {
      throw new BadRequestException(INVALID_TOKEN_ERROR);
    }
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);

    const deleted = await this.userRepository.delete(id);
    if (!deleted) throw new BadRequestException(BAD_REQUEST_ERROR);

    return {
      status: HttpStatus.OK,
      message: "deleted",
    };
  }

  async findUser(username?: string, email?: string) {
    return await this.userRepository.findOne({
      where: [{ username }, { email }],
      relations: ["region", "avatar"],
    });
  }
}
