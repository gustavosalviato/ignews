import { stripe } from '@/services/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end
  }

  const session = await getSession({ req })

  const stripeCustomer = await stripe.customers.create({
    email: session?.user?.email!,
  })

  const stripeCheckouSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      { price: 'price_1MZeRtAy3ugKHaH2WaijLMR8', quantity: 1 },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,

  })

  return res.status(200).json({ sessionId: stripeCheckouSession.id })
}


