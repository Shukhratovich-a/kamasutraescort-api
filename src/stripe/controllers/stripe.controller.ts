import { Controller, Post } from '@nestjs/common';

import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  async createPayment() {
    const session = await this.stripeService.createPayment();

    return session;
  }
}
