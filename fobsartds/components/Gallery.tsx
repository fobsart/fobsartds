const items = [
  {
    title: 'Wedding Welcome Board',
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f3900f6be?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Corporate Launch',
    img: 'https://images.unsplash.com/photo-1556767576-5ec54b21ce2d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Retail Promo Wall',
    img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Our works</h2>
          <p className="mt-2 text-slate-600">
            Unique graphics and signages tailored to your story and brand.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <figure key={it.title} className="rounded-xl overflow-hidden border bg-white">
              <img src={it.img} alt={it.title} className="w-full h-56 object-cover" />
              <figcaption className="p-4 text-sm text-slate-700">{it.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
