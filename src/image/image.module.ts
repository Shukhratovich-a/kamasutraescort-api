import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { UserEntity } from 'src/user/user.entity';
import { ImageController } from './controllers/image.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';

import { ImageEntity } from './image.entity';
import { ImageService } from './services/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),
    MulterModule.register({ dest: './uploads' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],
  controllers: [ImageController],
  providers: [ImageService, UserService],
})
export class ImageModule {}
