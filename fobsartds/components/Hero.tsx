export default function Hero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Rent LED Digital Displays for Unforgettable Events
          </h1>
          <p className="mt-4 text-slate-300">
            Vibrant, customizable signage for weddings, corporate events, and retail activations. Delivery, assembly,
            content design, and remote or local content management included.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#plans" className="px-5 py-3 rounded bg-white text-slate-900 font-semibold hover:bg-slate-100">
              Explore Plans
            </a>
            <a href="/book" className="px-5 py-3 rounded border border-white/30 hover:bg-white/10">
              Book Now
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[3/5] rounded-xl overflow-hidden ring-1 ring-white/20">
            <img
              src="https://images.unsplash.com/photo-1529338296731-c24a1b66ffcd?q=80&w=1200&auto=format&fit=crop"
              alt="Vertical LED display at wedding"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-rose-600 text-white px-4 py-2 rounded shadow">
            Stunning visuals, seamless setup
          </div>
        </div>
      </div>
    </section>
  )
}
