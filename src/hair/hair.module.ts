import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HairEntity } from './hair.entity';

import { HairController } from './controllers/hair.controller';

import { HairService } from './services/hair.service';

@Module({
  imports: [TypeOrmModule.forFeature([HairEntity])],
  controllers: [HairController],
  providers: [HairService],
})
export class HairModule {}
