import { Body, Param, Controller, Post, Headers, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { RegisterDto } from '../dtos/auth/register.dto';
import { LoginDto } from '../dtos/auth/login.dto';
import { CheckUserDto } from '../dtos/check-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.createUser(body);
  }

  @UsePipes(new ValidationPipe())
  @Patch('login')
  async login(@Body() body: LoginDto) {
    const { username } = await this.authService.validateUser(body);

    return await this.authService.login(username);
  }

  @Patch('check-user')
  async check(@Headers() headers: CheckUserDto) {
    return await this.authService.checkUser(headers);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.authService.delete(id);
  }
}
