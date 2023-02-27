import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { EyeColorDto } from '../dtos/eye-color.dto';
import { EyeColorService } from '../services/eye-color.service';

@Controller('eye-color')
export class EyeColorController {
  constructor(private eyeColorService: EyeColorService) {}

  @Get()
  async findAll() {
    return await this.eyeColorService.findAll();
  }

  @Post()
  async create(@Body() body: EyeColorDto) {
    return await this.eyeColorService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: EyeColorDto) {
    return await this.eyeColorService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.eyeColorService.delete(id);
  }
}
