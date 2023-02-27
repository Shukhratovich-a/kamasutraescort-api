import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegionEntity } from './region.entity';

import { RegionController } from './controllers/region.controller';

import { RegionService } from './services/region.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
