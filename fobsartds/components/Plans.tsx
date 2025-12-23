type Plan = {
  id: 'basic' | 'standard' | 'premium'
  name: string
  pricePerDay: number
  headline: string
  features: string[]
  image: string
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    pricePerDay: 99,
    headline: 'Small display, perfect for intimate events',
    features: [
      '1-day rental',
      'Delivery & assembly',
      'Content template selection',
      'Remote content updates',
    ],
    image: 'https://images.unsplash.com/photo-1550745165-9f2a0e0b6d73?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'standard',
    name: 'Standard',
    pricePerDay: 249,
    headline: 'Medium display with support',
    features: [
      'Up to 3-day rental',
      'Delivery, assembly & on-site support',
      'Custom content design',
      'Remote & local management',
    ],
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'premium',
    name: 'Premium',
    pricePerDay: 499,
    headline: 'Large display + full customization',
    features: [
      'Up to 7-day rental',
      'Full support & priority service',
      'Advanced animations & branding',
      'Pre-event content rehearsal',
    ],
    image: 'https://images.unsplash.com/photo-1529338296731-c24a1b66ffcd?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function Plans() {
  return (
    <section id="plans" className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Choose your plan</h2>
        <p className="mt-2 text-slate-600">Transparent rates, professional setup, and beautiful visuals.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white">
            <div className="aspect-video">
              <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <span className="text-rose-600 font-bold">${plan.pricePerDay}/day</span>
              </div>
              <p className="mt-2 text-slate-600">{plan.headline}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-rose-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href={`/book?plan=${plan.id}`}
                  className="w-full inline-block text-center px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700"
                >
                  Book {plan.name}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
