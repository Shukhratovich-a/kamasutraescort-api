import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllExceptionsFilter } from './core/all-exceptions.filter';
import { getPostgresConfig } from './configs/postgres.config';

import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { HairModule } from './hair/hair.module';
import { EyeColorModule } from './eye/eye-color.module';
import { GoalModule } from './goal/goal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    UserModule,
    RegionModule,
    HairModule,
    EyeColorModule,
    GoalModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
