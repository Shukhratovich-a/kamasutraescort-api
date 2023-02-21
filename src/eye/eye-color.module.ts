import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EyeColorEntity } from './eye-color.entity';

import { EyeColorController } from './controller/eye-color.controller';

import { EyeColorService } from './service/eye-color.service';

@Module({
  imports: [TypeOrmModule.forFeature([EyeColorEntity])],
  controllers: [EyeColorController],
  providers: [EyeColorService],
})
export class EyeColorModule {}
