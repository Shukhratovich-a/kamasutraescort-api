import { Body, Controller, Post, Headers, Patch, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { RegisterDto } from '../dtos/auth/register.dto';
import { LoginDto } from '../dtos/auth/login.dto';
import { CheckUserDto } from '../dtos/check-user.dto';

import { ALREADY_REGISTERED_ERROR } from '../constants/auth.constant';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const oldUser = await this.authService.findUser(body.username, body.email);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(body);
  }

  @UsePipes(new ValidationPipe())
  @Patch('login')
  async login(@Body() body: LoginDto) {
    const { username } = await this.authService.validateUser(body);

    return this.authService.login(username);
  }

  @Patch('check-user')
  check(@Headers() headers: CheckUserDto) {
    return this.authService.checkUser(headers);
  }
}
