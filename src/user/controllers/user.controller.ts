import { Controller, Get, Patch, Body, Param, Query } from '@nestjs/common';

import { UserService } from '../services/user.service';

import { RoleEnum } from 'src/enums/role.enum';

import { UserUpdateDto } from '../dtos/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.userService.getAll(limit, page);
  }

  @Get('role/:role')
  getByRole(@Param('role') role: RoleEnum, @Query('limit') limit: number, @Query('page') page: number) {
    return this.userService.getByRole(role, limit, page);
  }

  @Get('username/:username')
  getByUsername(@Param('username') username: string) {
    return this.userService.getByUsername(username);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() body: UserUpdateDto) {
    return this.userService.updateUser(id, body);
  }
}
