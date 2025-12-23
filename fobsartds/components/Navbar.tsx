import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-wide text-xl">
          FOBSART GRAPHICS
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/#plans" className="hover:text-rose-600 transition">Plans</Link>
          <Link href="/#gallery" className="hover:text-rose-600 transition">Gallery</Link>
          <Link href="/book" className="px-3 py-1.5 rounded bg-rose-600 text-white hover:bg-rose-700 transition">
            Book & Pay
          </Link>
        </nav>
      </div>
    </header>
  )
}
