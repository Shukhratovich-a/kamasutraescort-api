import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdvertisementEntity } from "./advertisement.entity";

import { AdvertisementController } from "./controllers/advertisement.controller";

import { AdvertisementSerivce } from "./services/advertisement.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementEntity])],
  controllers: [AdvertisementController],
  providers: [AdvertisementSerivce],
})
export class AdvertisementModule {}
