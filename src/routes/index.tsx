import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Package, Search, ShieldCheck, Sparkles } from 'lucide-react'
import products, { DEPOP_SHOP_URL, type Era } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { DropAlertForm } from '@/components/DropAlertForm'
import { cdn, srcSet } from '@/lib/img'

export const Route = createFileRoute('/')({
  component: Home,
})

const ERAS: Array<{ id: Era | 'all'; label: string; blurb: string }> = [
  { id: 'all', label: 'All eras', blurb: 'The full archive' },
  { id: '70s', label: '70s', blurb: 'Nylon, suede & waffle soles' },
  { id: '80s', label: '80s', blurb: 'Hardwood high-tops' },
  { id: '90s', label: '90s', blurb: 'Air, neon & skate' },
  { id: 'Y2K', label: 'Y2K', blurb: 'Chunky & pastel' },
]

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'oldest' | 'condition'

const TICKER = [
  'Hand-picked vintage',
  'Cleaned & graded',
  'Ships in 48h',
  '1979 → 1999',
  'One of one',
  'No reprints, no retros',
]

function Home() {
  const [era, setEra] = useState<Era | 'all'>('all')
  const [size, setSize] = useState('all')
  const [sort, setSort] = useState<Sort>('featured')

  const sizes = useMemo(
    () => [...new Set(products.map((p) => p.size))].sort((a, b) => +a - +b),
    [],
  )

  const visible = useMemo(() => {
    const list = products.filter(
      (p) => (era === 'all' || p.era === era) && (size === 'all' || p.size === size),
    )
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'oldest') sorted.sort((a, b) => +a.year - +b.year)
    if (sort === 'condition') sorted.sort((a, b) => b.conditionScore - a.conditionScore)
    return sorted
  }, [era, size, sort])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:pt-16">
          <div className="rise relative z-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
              Est. on Depop · Vintage sneaker archive
            </p>
            <h1 className="font-display mt-5 text-[22vw] sm:text-[9.5rem] lg:text-[10.5rem]">
              Worn-in
              <br />
              <span className="text-outline">history.</span>
              <br />
              <span className="text-signal">Laced</span> for now.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/80">
              Architek digs up the sneakers that defined the 70s, 80s, 90s and Y2K — cleaned,
              graded and honest about every crease. One pair, one owner at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#archive"
                className="flex items-center gap-2 border-2 border-ink bg-ink px-6 py-3 font-bold uppercase text-paper shadow-[4px_4px_0_var(--color-signal)] transition hover:-translate-y-0.5"
              >
                Dig the archive <ArrowDown className="size-4" />
              </a>
              <a
                href={DEPOP_SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border-2 border-ink px-6 py-3 font-bold uppercase transition hover:bg-ink hover:text-paper"
              >
                Shop on Depop <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rotate-2 border-2 border-ink bg-paper p-3 pb-14 shadow-[10px_10px_0_var(--color-ink)]">
              <img
                src={cdn('/img/hero.png', 1000)}
                srcSet={srcSet('/img/hero.png', [600, 1000, 1400])}
                sizes="(min-width: 1024px) 45vw, 100vw"
                alt="A pile of vintage sneakers flipped over to show their worn, yellowed outsoles"
                className="aspect-[4/3] w-full object-cover"
                fetchPriority="high"
              />
              <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-ink/70">
                Fig. 01 — Forty years of soles
              </p>
            </div>
            <div className="spin-slow absolute -left-6 -top-8 grid size-32 place-items-center rounded-full border-2 border-ink bg-volt sm:-left-10 sm:size-36">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
                <defs>
                  <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]">
                  <textPath href="#circle">Authentic vintage · Graded by hand ·</textPath>
                </text>
              </svg>
              <span className="font-display text-3xl">'79</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b-2 border-ink bg-signal py-3 text-paper">
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {TICKER.map((t) => (
                <span key={t} className="font-display flex items-center gap-6 px-6 text-3xl">
                  {t} <Sparkles className="size-5" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Archive */}
      <section id="archive" className="scroll-mt-20 mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
              Current drop · {products.filter((p) => !p.sold).length} pairs
            </p>
            <h2 className="font-display mt-3 text-7xl sm:text-8xl">The Archive</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-sm font-bold uppercase">
              Size
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-transparent font-mono focus:outline-none"
              >
                <option value="all">All</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    US {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-sm font-bold uppercase">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent font-mono focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="oldest">Oldest first</option>
                <option value="condition">Best condition</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </label>
          </div>
        </div>

        {/* Era timeline */}
        <div className="mt-10 grid grid-cols-2 gap-[2px] border-2 border-ink bg-ink sm:grid-cols-5" role="tablist">
          {ERAS.map((e, i) => {
            const active = era === e.id
            const count =
              e.id === 'all' ? products.length : products.filter((p) => p.era === e.id).length
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={active}
                onClick={() => setEra(e.id)}
                className={`group relative flex flex-col items-start gap-1 p-4 text-left transition ${
                  i === 0 ? 'col-span-2 sm:col-span-1' : ''
                } ${active ? 'bg-ink text-paper' : 'bg-paper hover:bg-paper-deep'}`}
              >
                <span className="font-display text-4xl">{e.label}</span>
                <span className={`text-xs ${active ? 'text-paper/70' : 'text-ink/60'}`}>
                  {e.blurb}
                </span>
                <span
                  className={`absolute right-3 top-3 font-mono text-xs ${active ? 'text-volt' : 'text-ink/50'}`}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>

        {visible.length > 0 ? (
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                index={products.indexOf(product)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid place-items-center border-2 border-dashed border-ink/40 px-6 py-20 text-center">
            <Search className="size-8" />
            <p className="font-display mt-4 text-4xl">Nothing in that size — yet.</p>
            <p className="mt-2 max-w-sm text-ink/70">
              New pairs land every week. Sign up for drop alerts and we'll ping you when your size
              shows up.
            </p>
            <a href="#drops" className="mt-6 border-2 border-ink px-5 py-2 font-bold uppercase hover:bg-ink hover:text-paper">
              Get drop alerts
            </a>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <a
            href={DEPOP_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 border-2 border-ink bg-volt px-8 py-4 font-display text-3xl shadow-[6px_6px_0_var(--color-ink)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--color-ink)]"
          >
            See every listing on Depop
            <ArrowUpRight className="size-7 transition group-hover:rotate-45" />
          </a>
        </div>
      </section>

      {/* Second ticker */}
      <div className="mt-24 -rotate-1 overflow-hidden border-y-2 border-ink bg-ink py-3 text-paper">
        <div className="marquee marquee-reverse">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {['Basketball', 'Running', 'Skate', 'Court', 'Trail', 'Basketball', 'Running', 'Skate', 'Court', 'Trail'].map((t, i) => (
                <span key={i} className="font-display px-6 text-5xl">
                  {i % 2 === 0 ? t : <span className="text-outline [-webkit-text-stroke-color:var(--color-paper)]">{t}</span>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Grading */}
      <section id="grading" className="scroll-mt-20 mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
              No surprises
            </p>
            <h2 className="font-display mt-3 text-7xl sm:text-8xl">
              Graded <span className="text-signal">honest.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
              Vintage is never perfect — that's the point. Every pair gets a hands-on inspection
              and a 1–10 condition score, so you know exactly how much life (and story) is left
              in them.
            </p>
          </div>
          <div className="divide-y-2 divide-ink border-2 border-ink">
            {[
              ['9–10', 'Near deadstock', 'Barely worn, minimal creasing. Shelf or rotation — your call.'],
              ['7–8', 'Very good', 'Light wear and natural patina. Clean, sturdy, ready to lace up.'],
              ['5–6', 'Well loved', 'Visible creasing and scuffs. Wearable history at a friendlier price.'],
              ['1–4', 'Project pair', 'For restorers and display. Flaws are always photographed and listed.'],
            ].map(([score, label, copy]) => (
              <div key={score} className="grid grid-cols-[6rem_1fr] items-center gap-4 p-5 transition hover:bg-volt sm:grid-cols-[8rem_1fr]">
                <span className="font-display text-5xl">{score}</span>
                <div>
                  <p className="font-bold uppercase">{label}</p>
                  <p className="mt-1 text-sm text-ink/70">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { icon: Search, title: 'Sourced by hand', copy: 'Thrift bins, estate sales, old stockrooms. We dig so you don’t have to.' },
            { icon: ShieldCheck, title: 'Checked & cleaned', copy: 'Authenticity checks, deep clean, and fresh laces where needed.' },
            { icon: Package, title: 'Bought safely on Depop', copy: 'Checkout through Depop with buyer protection. Ships within 48 hours.' },
          ].map(({ icon: Icon, title, copy }, i) => (
            <div key={title} className="border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)]">
              <div className="flex items-center justify-between">
                <Icon className="size-8" />
                <span className="font-mono text-xs text-ink/50">0{i + 1}</span>
              </div>
              <p className="font-display mt-6 text-3xl">{title}</p>
              <p className="mt-2 text-ink/70">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Drop alerts */}
      <section id="drops" className="scroll-mt-20 mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 border-2 border-ink bg-ink p-6 text-paper sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-volt">Drop alerts</p>
            <h2 className="font-display mt-3 text-7xl sm:text-8xl">
              Your size.
              <br />
              <span className="text-signal">First dibs.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/80">
              The good pairs go fast. Tell us your size and the eras you love, and we'll give you
              a heads up before new finds hit the Depop feed. Got a grail? Tell us — we'll keep an
              eye out.
            </p>
          </div>
          <DropAlertForm />
        </div>
      </section>
    </>
  )
}
