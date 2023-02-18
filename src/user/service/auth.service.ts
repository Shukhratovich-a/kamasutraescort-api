import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { UserEntity } from '../user.entity';

import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { CheckUserDto } from '../dto/check-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    const username = await this.findOneByUsername(body.username);
    if (username) {
      throw new HttpException('such a username exists', HttpStatus.BAD_REQUEST);
    }

    const email = await this.findOneByEmail(body.email);
    if (email) {
      throw new HttpException('such a email exists', HttpStatus.BAD_REQUEST);
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    body.password = salt + '.' + hash.toString('hex');

    const user = this.userRepository.create(body);
    await this.userRepository.save(user);
    delete user.password;
    return {
      status: HttpStatus.CREATED,
      message: 'ok',
      accessToken: this.jwtService.sign({ user }),
      user,
    };
  }

  async login(body: LoginDto) {
    const user = await this.findOne(body.usernameOrEmail, body.usernameOrEmail);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
    }

    const [salt, hashed] = user.password.split('.');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    if (hashed !== hash.toString('hex')) {
      throw new HttpException('bad password', HttpStatus.BAD_REQUEST);
    }
    delete user.password;
    return {
      status: HttpStatus.OK,
      message: 'ok',
      accessToken: this.jwtService.sign({ user }),
      user,
    };
  }

  async checkUser(header: CheckUserDto) {
    try {
      const { user } = this.jwtService.verify(header.authorization);
      console.log(user);

      const data = await this.findOne(user.username, user.email);
      if (!data) {
        throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
      }

      return {
        status: HttpStatus.OK,
        message: 'ok',
        accessToken: header.authorization,
        user,
      };
    } catch {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async findOne(username?: string, email?: string) {
    const [user] = await this.userRepository
      .createQueryBuilder()
      .select('*')
      .where('username = :username or email = :email', {
        username: username,
        email: email,
      })
      .getRawMany();
    return user;
  }

  async findOneByUsername(username: string) {
    const [user] = await this.userRepository
      .createQueryBuilder()
      .select('*')
      .where('username = :username', {
        username: username,
      })
      .getRawMany();
    return user;
  }

  async findOneByEmail(email: string) {
    const [user] = await this.userRepository
      .createQueryBuilder()
      .select('*')
      .where('email = :email', {
        email: email,
      })
      .getRawMany();
    return user;
  }
}
