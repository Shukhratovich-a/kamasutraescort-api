import { UnauthorizedException, BadRequestException, NotFoundException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';

import { Repository } from 'typeorm';

import {
  BAD_REQUEST_ERROR,
  INVALID_TOKEN_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from '../constants/user.constant';
import { GenderEnum } from 'src/enums/gender.enum';

import { UserEntity } from '../user.entity';

import { UserEditDto } from '../dtos/user/user-edit.dto';
import { CheckUserDto } from '../dtos/check-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getAll() {
    const users = await this.userRepository.find({
      relations: ['hairColor', 'eyeColor', 'goal', 'region', 'images', 'socials'],
    });
    if (!users) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return users;
  }

  async getByGender(gender: GenderEnum) {
    const options = { where: { gender } };
    const users = await this.userRepository.find({
      ...options,
      relations: ['hairColor', 'eyeColor', 'goal', 'region', 'images', 'socials'],
    });

    return users;
  }

  async getByUsername(username: string) {
    const options = { where: { username } };
    const users = await this.userRepository.findOne({
      ...options,
      relations: ['hairColor', 'eyeColor', 'goal', 'region', 'images', 'socials'],
    });

    return users;
  }

  async update(id: number, body: UserEditDto, headers: CheckUserDto) {
    try {
      const { username } = await this.jwtService.verifyAsync(JSON.parse(headers.authorization));
      if (!username) {
        throw new BadRequestException(INVALID_TOKEN_ERROR);
      }

      const oldUser = await this.userRepository.findOne({ where: { id } });
      if (!oldUser) {
        throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
      }

      const isCorrectPassword = await compare(body.password, oldUser.password);
      if (!isCorrectPassword) {
        throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
      }

      if (oldUser.username !== username) {
        throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
      }
      delete body.password;

      const { username: newUsername, eyeColor, hairColor, weight, height, goal, region, ...keys } = body;

      const user = await this.userRepository.save({
        ...oldUser,
        ...keys,
        username: newUsername.toLowerCase(),
        region: region ? Number(region) : oldUser.region,
        goal: goal ? Number(goal) : null,
        height: height ? Number(height) : null,
        weight: weight ? Number(weight) : null,
        hairColor: hairColor ? Number(hairColor) : null,
        eyeColor: eyeColor ? Number(eyeColor) : null,
      });
      if (!user) {
        throw new BadRequestException(BAD_REQUEST_ERROR);
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: 'ok',
        accessToken: await this.jwtService.signAsync({ newUsername }),
        user,
      };
    } catch (error) {
      console.log(error);

      throw new BadRequestException(BAD_REQUEST_ERROR);
    }
  }

  async updateImage(id: number, imageId: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    const withImages = await this.userRepository.save({
      ...user,
      images: imageId,
    });

    return withImages;
  }

  async updateSocials(id: number | null, socialId: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    const withSocials = await this.userRepository.save({
      ...user,
      socials: socialId,
    });

    return withSocials;
  }
}
