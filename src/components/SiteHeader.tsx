import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { DEPOP_SHOP_URL } from '@/data/products'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-3xl">Architek</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/60 sm:inline">
            Vintage sneaker archive
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-bold uppercase sm:gap-2">
          <Link
            to="/"
            hash="archive"
            className="hidden rounded-full px-3 py-2 hover:bg-ink hover:text-paper sm:block"
          >
            The Archive
          </Link>
          <Link
            to="/"
            hash="grading"
            className="hidden rounded-full px-3 py-2 hover:bg-ink hover:text-paper md:block"
          >
            Grading
          </Link>
          <Link
            to="/"
            hash="drops"
            className="hidden rounded-full px-3 py-2 hover:bg-ink hover:text-paper md:block"
          >
            Drop Alerts
          </Link>
          <a
            href={DEPOP_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-full border-2 border-ink bg-signal px-4 py-2 text-paper shadow-[3px_3px_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)]"
          >
            Shop Depop <ArrowUpRight className="size-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
