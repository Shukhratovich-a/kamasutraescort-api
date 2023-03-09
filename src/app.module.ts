import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
// import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";

// import { AllExceptionsFilter } from "./core/all-exceptions.filter";
import { getPostgresConfig } from "./configs/postgres.config";

import { UserModule } from "./user/user.module";
import { RegionModule } from "./region/region.module";
import { HairModule } from "./hair/hair.module";
import { EyeColorModule } from "./eye/eye-color.module";
import { GoalModule } from "./goal/goal.module";
import { AvatarModule } from "./avatar/avatar.module";
import { SocialsModule } from "./socials/socials.module";
import { AdvertisementModule } from "./advertisement/advertisement.module";
import { AdvImageModule } from "./advImage/advImage.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.dev" }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "files"),
    }),
    UserModule,
    RegionModule,
    HairModule,
    EyeColorModule,
    GoalModule,
    AvatarModule,
    SocialsModule,
    AdvertisementModule,
    AdvImageModule,
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: AllExceptionsFilter,
  //   },
  // ],
})
export class AppModule {}
