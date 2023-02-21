import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { RegionDto } from '../dto/region.dto';
import { RegionService } from '../service/region.service';

@Controller('regions')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get()
  async findAll() {
    return await this.regionService.findAll();
  }

  @Post()
  async create(@Body() body: RegionDto) {
    return await this.regionService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: RegionDto) {
    return await this.regionService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.regionService.delete(id);
  }
}
