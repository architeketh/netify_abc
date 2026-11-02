import { useState, type FormEvent, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { setSearchQuery, useSearchQuery } from '@/lib/search'

const DEPOP_SHOP_URL = 'https://www.depop.com/abc_isfor_xyz/'

const LINKS = [
  { label: 'Closet', id: 'archive' },
  { label: 'Grading', id: 'grading' },
  { label: 'Drop Alerts', id: 'drops' },
]

export function SiteHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const query = useSearchQuery()

  // On the home page, scroll to the top (or to a section) every time, even when the
  // address already ends in that #section. On a pair page, let the link go to the home page.
  const toTop = (e: MouseEvent) => {
    setOpen(false)
    if (!onHome) return
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', '/')
  }
  const toSection = (id: string) => (e: MouseEvent) => {
    setOpen(false)
    if (!onHome) return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', `/#${id}`)
  }
  const search = (e: FormEvent) => {
    e.preventDefault()
    if (onHome) document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' })
    else navigate({ to: '/', hash: 'archive' })
  }

  return (
    <>
      <div className="border-b border-[#eee3c9] bg-cream px-3 py-2 text-center text-[12px] font-medium sm:text-[13px]">
        Clear pricing + quick replies &nbsp;•&nbsp; Ships within 24 hrs from MN
      </div>
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-8">
          <Link to="/" onClick={toTop} className="flex shrink-0 items-center gap-2.5">
            <img src="/img/logo.png" alt="" width={38} height={38} className="size-[38px] rounded-full" />
            <span className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="font-display text-2xl">ABC</span>
              <span className="text-sm font-medium italic">is for</span>
              <span className="font-display text-2xl">XYZ</span>
            </span>
          </Link>

          <form
            role="search"
            onSubmit={search}
            className="relative hidden md:block md:max-w-xl md:flex-1"
          >
            <label className="sr-only" htmlFor="shop-search">
              Search the shop
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sneakers, boots, bags, clothing"
              className="h-11 w-full rounded-full border border-line bg-soft pl-11 pr-4 text-[15px] font-medium focus:border-ink focus:outline-none"
            />
          </form>

          <nav className="ml-auto hidden items-center gap-1 text-[15px] font-medium md:flex lg:gap-3">
            <Link to="/" onClick={toTop} className="whitespace-nowrap rounded-full px-3 py-2 hover:bg-soft">
              Home
            </Link>
            {LINKS.map((l) => (
              <Link
                key={l.id}
                to="/"
                hash={l.id}
                onClick={toSection(l.id)}
                className="whitespace-nowrap rounded-full px-3 py-2 hover:bg-soft"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={DEPOP_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="ml-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white hover:bg-signal"
            >
              Shop on Depop ↗
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <a
              href={DEPOP_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white"
            >
              Shop Depop ↗
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-line"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-line bg-white md:hidden" aria-label="Menu">
            <Link to="/" onClick={toTop} className="block border-b border-line px-6 py-4 text-lg font-bold">
              Home
            </Link>
            {LINKS.map((l) => (
              <Link
                key={l.id}
                to="/"
                hash={l.id}
                onClick={toSection(l.id)}
                className="block border-b border-line px-6 py-4 text-lg font-bold"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={DEPOP_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-ink px-6 py-4 text-lg font-bold text-white"
            >
              Shop on Depop <ArrowUpRight className="size-5" />
            </a>
          </nav>
        )}
      </header>
    </>
  )
}
