import type { NextApiRequest, NextApiResponse } from 'next'
import { getBookingsBetween } from '@/lib/db'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start, end } = req.query as { start?:string; end?:string }
  if (!start || !end) return res.status(400).json({ error: 'start and end required' })
  const bookings = getBookingsBetween(start, end)
  // Example rule: max 3 concurrent rentals per day
  const maxConcurrent = 3
  // Build per-day counts
  const counts: Record<string, number> = {}
  const s = new Date(start)
  const e = new Date(end)
  for (let d = new Date(s); d <= e; d.setDate(d.getDate()+1)) {
    counts[d.toISOString().slice(0,10)] = 0
  }
  bookings.forEach(b => {
    const bs = new Date(b.start_date)
    const be = new Date(b.end_date)
    for (let d = new Date(bs); d <= be; d.setDate(d.getDate()+1)) {
      const key = d.toISOString().slice(0,10)
      if (counts[key] !== undefined) counts[key]++
    }
  })
  const availability = Object.entries(counts).map(([date, count]) => ({
    date, available: count < maxConcurrent, booked: count
  }))
  res.status(200).json({ availability })
}
