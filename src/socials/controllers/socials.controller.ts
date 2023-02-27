import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { SocialsDto } from '../dtos/socials.dto';
import { SocialsService } from '../services/socials.service';

@Controller('socials')
export class SocialsController {
  constructor(private socialsService: SocialsService) {}

  @Get()
  async findAll() {
    return await this.socialsService.findAll();
  }

  @Post(':id')
  async create(@Param('id') id: number, @Body() body: SocialsDto) {
    return await this.socialsService.create(id, body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: SocialsDto) {
    return await this.socialsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.socialsService.delete(id);
  }
}
