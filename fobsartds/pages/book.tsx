import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { format, addDays } from 'date-fns'

type FormValues = {
  name: string
  email: string
  phone?: string
  plan: 'basic' | 'standard' | 'premium'
  startDate: string
  days: number
  notes?: string
}

const planInfo = {
  basic: { label: 'Basic', pricePerDay: 99 },
  standard: { label: 'Standard', pricePerDay: 249 },
  premium: { label: 'Premium', pricePerDay: 499 },
}

export default function Book() {
  const router = useRouter()
  const initialPlan = (router.query.plan as FormValues['plan']) || 'standard'

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      plan: initialPlan,
      startDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      days: 1,
    },
  })

  const plan = watch('plan')
  const days = watch('days')
  const startDate = watch('startDate')

  useEffect(() => {
    if (router.query.plan) setValue('plan', router.query.plan as FormValues['plan'])
  }, [router.query.plan, setValue])

  const total = useMemo(() => planInfo[plan].pricePerDay * (Number(days) || 1), [plan, days])

  const onSubmit = async (data: FormValues) => {
    const payload = {
      plan: data.plan,
      days: Number(data.days),
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventDate: data.startDate,
        notes: data.notes,
      },
    }

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await res.json()
    if (json.url) window.location.href = json.url
  }

  return (
    <>
      <Head>
        <title>Book an appointment — Fobsart Graphics</title>
      </Head>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8">
        <section>
          <h1 className="text-3xl font-bold">Book your rental</h1>
          <p className="mt-2 text-slate-600">
            Select your plan, choose dates, and complete payment securely. We’ll confirm your booking by email.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-sm font-medium">Full name</span>
                <input
                  {...register('name', { required: true })}
                  className="mt-1 w-full rounded border px-3 py-2"
                  placeholder="Ben Opare"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="mt-1 w-full rounded border px-3 py-2"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Phone</span>
                <input
                  type="tel"
                  {...register('phone')}
                  className="mt-1 w-full rounded border px-3 py-2"
                  placeholder="(555) 000-0000"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {(['basic', 'standard', 'premium'] as const).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setValue('plan', p)}
                  className={`rounded border px-3 py-2 text-left ${
                    plan === p ? 'bg-rose-600 text-white border-rose-700' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold">{planInfo[p].label}</div>
                  <div className="text-sm">${planInfo[p].pricePerDay}/day</div>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <label className="block">
                <span className="text-sm font-medium">Start date</span>
                <input
                  type="date"
                  {...register('startDate', { required: true })}
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Days</span>
                <input
                  type="number"
                  min={1}
                  max={14}
                  {...register('days', { required: true, valueAsNumber: true })}
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </label>

              <div className="flex items-end">
                <div className="w-full rounded border px-3 py-2 bg-slate-50">
                  <span className="text-sm text-slate-600">Total</span>
                  <div className="text-xl font-bold">${total}</div>
                </div>
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-medium">Notes</span>
              <textarea
                {...register('notes')}
                className="mt-1 w-full rounded border px-3 py-2"
                placeholder="Venue, display size preference, content style, etc."
              />
            </label>

            <button
              type="submit"
              className="w-full rounded bg-slate-900 text-white px-4 py-3 font-semibold hover:bg-slate-800"
            >
              Continue to payment
            </button>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded border p-4">
            <h2 className="text-xl font-semibold">Availability calendar</h2>
            <p className="mt-1 text-sm text-slate-600">
              Select your preferred date above. For real-time availability, integrate your scheduling tool.
            </p>
            {/* Inline booking widget placeholder: replace with Calendly embed if desired */}
            <div className="mt-4 aspect-video rounded bg-slate-100 grid place-items-center text-slate-500">
              Calendar widget placeholder
            </div>
          </div>

          <div className="rounded border p-4">
            <h3 className="font-semibold">What’s included</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              <li>• Delivery and assembly</li>
              <li>• Content design support</li>
              <li>• Remote and local content management</li>
              <li>• Email confirmation and invoice</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  )
}
