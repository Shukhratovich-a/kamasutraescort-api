import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { HairDto } from '../dtos/hair.dto';
import { HairService } from '../services/hair.service';

@Controller('hairs')
export class HairController {
  constructor(private regionService: HairService) {}

  @Get()
  async findAll() {
    return await this.regionService.findAll();
  }

  @Post()
  async create(@Body() body: HairDto) {
    return await this.regionService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: HairDto) {
    return await this.regionService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.regionService.delete(id);
  }
}
