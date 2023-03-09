import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdvImageEntity } from "./advImage.entity";
import { AdvertisementEntity } from "src/advertisement/advertisement.entity";

import { AdvImageController } from "./controllers/advImage.controller";

import { AdvImageService } from "./services/advImage.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdvImageEntity, AdvertisementEntity]),
    MulterModule.register({ dest: "/uploads" }),
  ],
  controllers: [AdvImageController],
  providers: [AdvImageService],
})
export class AdvImageModule {}
