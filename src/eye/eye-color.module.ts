import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EyeColorEntity } from './eye-color.entity';

import { EyeColorController } from './controllers/eye-color.controller';

import { EyeColorService } from './services/eye-color.service';

@Module({
  imports: [TypeOrmModule.forFeature([EyeColorEntity])],
  controllers: [EyeColorController],
  providers: [EyeColorService],
})
export class EyeColorModule {}
