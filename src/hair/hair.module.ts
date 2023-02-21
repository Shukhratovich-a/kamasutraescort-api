import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HairEntity } from './hair.entity';

import { HairController } from './controller/hair.controller';

import { HairService } from './service/hair.service';

@Module({
  imports: [TypeOrmModule.forFeature([HairEntity])],
  controllers: [HairController],
  providers: [HairService],
})
export class HairModule {}
