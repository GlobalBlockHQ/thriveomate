// /pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const pricingMap: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_PRO || '',
  elite: process.env.STRIPE_PRICE_ELITE || '',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { plan } = req.body;

  if (!plan || !pricingMap[plan]) {
    return res.status(400).json({ error: 'Invalid plan selected.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: pricingMap[plan],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.BASE_URL}/dashboard?status=success`,
      cancel_url: `${process.env.BASE_URL}/dashboard?status=cancel`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout error' });
  }
}
