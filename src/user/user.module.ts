import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { getJwtConfig } from 'src/configs/jwt.config';

import { UserEntity } from './user.entity';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
  exports: [UserService],
})
export class UserModule {}
