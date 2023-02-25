import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

import { INVALID_TOKEN_ERROR, USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../constants/auth.constant';

import { UserEntity } from '../user.entity';

import { RegisterDto } from '../dtos/auth/register.dto';
import { LoginDto } from '../dtos/auth/login.dto';
import { CheckUserDto } from '../dtos/check-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(body: RegisterDto) {
    const salt = await genSalt(10);

    const newUser = this.userRepository.create({
      ...body,
      password: await hash(body.password, salt),
    });

    return {
      status: HttpStatus.CREATED,
      message: 'ok',
      user: await this.userRepository.save(newUser),
    };
  }

  async findUser(username?: string, email?: string) {
    return await this.userRepository.findOne({
      where: [{ username }, { email }],
      relations: ['hairColor', 'eyeColor', 'region', 'goal'],
    });
  }

  async validateUser(body: LoginDto): Promise<Pick<UserEntity, 'username'>> {
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

    return {
      status: HttpStatus.OK,
      message: 'ok',
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

      return {
        status: HttpStatus.OK,
        message: 'ok',
        accessToken: JSON.parse(header.authorization),
        user,
      };
    } catch {
      throw new BadRequestException(INVALID_TOKEN_ERROR);
    }
  }
}
