import { Body, Controller, Headers, Patch, Param } from '@nestjs/common';
import { CheckUserDto } from '../dtos/check-user.dto';
import { UserEditDto } from '../dtos/user/user-edit.dto';

import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('edit/:id')
  edit(@Param('id') id: number, @Body() body: UserEditDto, @Headers() headers: CheckUserDto) {
    return this.userService.update(id, body, headers);
  }
}
