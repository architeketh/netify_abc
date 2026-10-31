import type { MouseEvent } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { DEPOP_SHOP_URL } from '@/data/products.ts'

export function SiteHeader() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // On the home page, scroll to the top (or to a section) every time, even when the
  // address already ends in that #section. On a shoe page, let the link go to the home page.
  const toTop = (e: MouseEvent) => {
    if (!onHome) return
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', '/')
  }
  const toSection = (id: string) => (e: MouseEvent) => {
    if (!onHome) return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', `/#${id}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" onClick={toTop} className="group flex items-baseline gap-2">
          <span className="font-display text-3xl">Architek</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/60 sm:inline">
            Vintage sneaker archive
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-bold uppercase sm:gap-2">
          <Link
            to="/"
            onClick={toTop}
            className="hidden rounded-full px-3 py-2 hover:bg-ink hover:text-paper sm:block"
          >
            Home
          </Link>
          <Link
            to="/"
            hash="archive"
            onClick={toSection('archive')}
            className="hidden rounded-full px-3 py-2 hover:bg-ink hover:text-paper sm:block"
          >
            The Archive
          </Link>
          <Link
            to="/"
            hash="grading"
            onClick={toSection('grading')}
            className="hidden rounded-full px-3 py-2 hover:bg-ink hover:text-paper md:block"
          >
            Grading
          </Link>
          <Link
            to="/"
            hash="drops"
            onClick={toSection('drops')}
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
