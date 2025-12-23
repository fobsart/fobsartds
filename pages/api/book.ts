import type { NextApiRequest, NextApiResponse } from 'next'
import { addBooking } from '@/lib/db'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const payload = req.body
  // Validate payload minimally
  const { name, email, plan, start_date, days, delivery, deposit_only, stripe_session_id } = payload
  if (!name || !email || !plan || !start_date || !days) return res.status(400).json({ error: 'missing' })
  const start = new Date(start_date)
  const end = new Date(start)
  end.setDate(end.getDate() + Number(days) - 1)
  const id = addBooking({
    name, email, phone: payload.phone || '', plan,
    start_date: start.toISOString().slice(0,10),
    end_date: end.toISOString().slice(0,10),
    days: Number(days),
    delivery: delivery || 'dfw',
    deposit_only: deposit_only ? 1 : 0,
    stripe_session_id: stripe_session_id || ''
  })
  res.status(200).json({ id })
}
