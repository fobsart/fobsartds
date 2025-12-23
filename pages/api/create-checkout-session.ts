import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20' })

const PRODUCTS: Record<string, {name:string, pricePerDay:number}> = {
  basic: { name: 'Basic LED Display', pricePerDay: 9900 },
  standard: { name: 'Standard LED Display', pricePerDay: 24900 },
  premium: { name: 'Premium LED Display', pricePerDay: 49900 },
}
const DELIVERY_FEE = 15000

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { plan, days, customer, delivery, depositOnly } = req.body
  if (!plan || !days || !customer?.email) return res.status(400).json({ error: 'invalid' })
  const product = PRODUCTS[plan]
  let amount = product.pricePerDay * Number(days)
  if (delivery === 'outside') amount += DELIVERY_FEE
  if (depositOnly) amount = Math.round(amount * 0.3)
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customer.email,
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: { name: `${product.name} (${days} day${days>1?'s':''})` }
        },
        quantity: 1
      }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book`,
      metadata: {
        plan, days: String(days), depositOnly: depositOnly ? '1' : '0',
        name: customer.name || '', phone: customer.phone || '', delivery: delivery || 'dfw'
      }
    })
    res.status(200).json({ url: session.url, id: session.id })
  } catch (err:any) {
    console.error(err)
    res.status(500).json({ error: 'stripe error' })
  }
}
