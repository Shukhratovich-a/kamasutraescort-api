import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalEntity } from './goal.entity';

import { GoalController } from './controllers/goal.controller';

import { GoalService } from './services/goal.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
