import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StripeController } from './controllers/stripe.controller';

import { StripeService } from './services/stripe.service';

@Module({
  imports: [ConfigModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
