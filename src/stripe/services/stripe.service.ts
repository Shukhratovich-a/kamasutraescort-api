import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(private configService: ConfigService) {}

  async createPayment() {
    const stripe = new Stripe(this.configService.get('STRIPE_KEY'), { apiVersion: '2022-11-15' });

    try {
      const session = stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
      return session;
    } catch (error) {
      console.log(error);
    }
  }
}
