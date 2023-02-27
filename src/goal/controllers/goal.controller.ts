import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { GoalDto } from '../dtos/goal.dto';
import { GoalService } from '../services/goal.service';

@Controller('goal')
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Get()
  async findAll() {
    return await this.goalService.findAll();
  }

  @Post()
  async create(@Body() body: GoalDto) {
    return await this.goalService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: GoalDto) {
    return await this.goalService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.goalService.delete(id);
  }
}
