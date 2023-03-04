import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { getJwtConfig } from "src/configs/jwt.config";

import { SocialsEntity } from "./socials.entity";
import { UserEntity } from "src/user/user.entity";

import { SocialsController } from "./controllers/socials.controller";

import { SocialsSerivce } from "./service/socials.service";
import { UserService } from "src/user/services/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialsEntity, UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [SocialsController],
  providers: [SocialsSerivce, UserService],
})
export class SocialsModule {}
