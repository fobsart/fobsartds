import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()
  const { plan, days } = router.query

  return (
    <>
      <Head>
        <title>Booking confirmed — Fobsart Graphics</title>
      </Head>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold">Thank you!</h1>
        <p className="mt-2 text-slate-700">
          Your payment is complete. We’ve emailed your receipt and booking details.
        </p>
        <div className="mt-6 rounded border p-6 text-left">
          <p><span className="font-semibold">Plan:</span> {plan}</p>
          <p><span className="font-semibold">Days:</span> {days}</p>
          <p className="mt-2 text-slate-600">
            Our team will reach out shortly with delivery and setup information.
          </p>
        </div>
        <a href="/" className="mt-8 inline-block px-5 py-3 rounded bg-slate-900 text-white hover:bg-slate-800">
          Back to home
        </a>
      </main>
    </>
  )
}
