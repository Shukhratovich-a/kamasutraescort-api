import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getJwtConfig } from "src/configs/jwt.config";
import { UserService } from "src/user/services/user.service";
import { UserEntity } from "src/user/user.entity";

import { AvatarEntity } from "./avatar.entity";

import { AvatarController } from "./controllers/avatar.controller";

import { AvatarService } from "./services/avatar.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AvatarEntity, UserEntity]),
    MulterModule.register({ dest: "/uploads" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AvatarController],
  providers: [AvatarService, UserService],
})
export class AvatarModule {}
