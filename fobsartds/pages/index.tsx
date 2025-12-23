import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Plans from '@/components/Plans'
import Gallery from '@/components/Gallery'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Fobsart Graphics — Digital Signage Rentals</title>
        <meta name="description" content="Rent LED digital displays for events. Delivery, setup, and custom content." />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <Plans />
        <Gallery />
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="text-2xl font-semibold">Design is our birth mark</h3>
              <p className="mt-2 text-slate-600">
                We enhance your business image with innovative creatives to elevate your brand and event experiences.
              </p>
            </div>
            <a
              href="/book"
              className="px-5 py-3 rounded bg-slate-900 text-white text-center hover:bg-slate-800"
            >
              Book an appointment
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Fobsart Graphics. All rights reserved.
        </div>
      </footer>
    </>
  )
}
