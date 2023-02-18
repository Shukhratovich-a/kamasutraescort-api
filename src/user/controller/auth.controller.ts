import { Body, Controller, Post, Headers } from '@nestjs/common';

import { AuthService } from '../service/auth.service';

import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { CheckUserDto } from '../dto/check-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('register')
  create(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @Post('login')
  find(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('check-user')
  check(@Headers() headers: CheckUserDto) {
    return this.userService.checkUser(headers);
  }
}
