import { Controller, Get, Patch, Param, Body, Headers } from '@nestjs/common';
import { GenderEnum } from 'src/enums/gender.enum';
import { CheckUserDto } from '../dtos/check-user.dto';
import { UserEditDto } from '../dtos/user/user-edit.dto';

import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('gender/:gender')
  getByGender(@Param('gender') gender: GenderEnum) {
    return this.userService.getByGender(gender);
  }

  @Get('username/:username')
  getByUsername(@Param('username') username: string) {
    return this.userService.getByUsername(username);
  }

  @Patch('edit/:id')
  edit(@Param('id') id: number, @Body() body: UserEditDto, @Headers() headers: CheckUserDto) {
    return this.userService.update(id, body, headers);
  }
}
