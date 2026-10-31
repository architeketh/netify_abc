import type { MouseEvent } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { DEPOP_SHOP_URL } from '@/data/products.ts'

// Small round mark in the colors of the ABC is for XYZ logo
function LogoMark() {
  return (
    <svg viewBox="0 0 100 100" className="size-9 shrink-0" aria-hidden="true">
      <defs>
        <clipPath id="logo-circle">
          <circle cx="50" cy="50" r="49" />
        </clipPath>
      </defs>
      <g clipPath="url(#logo-circle)">
        <rect x="0" y="0" width="27" height="40" fill="#8f4f1d" />
        <rect x="27" y="0" width="24" height="40" fill="#ffd95a" />
        <rect x="51" y="0" width="22" height="40" fill="#08bfe0" />
        <rect x="73" y="0" width="27" height="40" fill="#476614" />
        <rect x="0" y="60" width="27" height="40" fill="#08bfe0" />
        <rect x="27" y="60" width="24" height="40" fill="#be8ae8" />
        <rect x="51" y="60" width="22" height="40" fill="#e1502f" />
        <rect x="73" y="60" width="27" height="40" fill="#8f4f1d" />
        <rect x="0" y="40" width="100" height="20" fill="#fffaf0" />
      </g>
      <circle cx="50" cy="50" r="49" fill="none" stroke="#140d08" strokeWidth="2" />
    </svg>
  )
}

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
        <Link to="/" onClick={toTop} className="group flex items-center gap-3">
          <LogoMark />
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl sm:text-3xl">ABC</span>
            <span className="text-xs font-medium italic sm:text-sm">is for</span>
            <span className="font-display text-2xl sm:text-3xl">XYZ</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/60 xl:inline">
            A–Z curated vintage + modern finds • Built for repeat buyers
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
