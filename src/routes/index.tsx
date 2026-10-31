import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Package, Search, ShieldCheck, Sparkles } from 'lucide-react'
import products, { BRANDS, CONDITIONS, DEPOP_SHOP_URL, SIZE_TYPES, type Brand, type Product } from '@/data/products.ts'
import { ProductCard } from '@/components/ProductCard'
import { DropAlertForm } from '@/components/DropAlertForm'
import { sizeShort } from '@/lib/size'

export const Route = createFileRoute('/')({
  component: Home,
})

const BRAND_FILTERS: Array<{ id: Brand | 'all'; label: string }> = [
  { id: 'all', label: 'All brands' },
  ...BRANDS.map((brand) => ({ id: brand, label: brand })),
]

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'condition'

const TICKER = [
  'Hand-picked vintage',
  'Cleaned & graded',
  'Ships in 24h',
  'Vintage + new',
  'One of one',
  'Honest condition labels',
]

const sizeKey = (p: Product) => `${p.sizeType}|${p.size}`

function Home() {
  // Main photo: the first pair for sale. To use your own photo instead, replace this with '/img/hero.png'.
  const heroImage = (products.find((p) => !p.sold) ?? products[0])?.image ?? '/img/hero.png'
  const [brand, setBrand] = useState<Brand | 'all'>('all')
  const [size, setSize] = useState('all')
  const [sort, setSort] = useState<Sort>('featured')

  // One entry per size and who it is for, e.g. M 9, W 9, Kids 12
  const sizes = useMemo(() => {
    const seen = new Map<string, Product>()
    products.forEach((p) => {
      const key = sizeKey(p)
      if (!seen.has(key)) seen.set(key, p)
    })
    return [...seen.entries()]
      .sort(
        ([, a], [, b]) =>
          SIZE_TYPES.indexOf(a.sizeType) - SIZE_TYPES.indexOf(b.sizeType) ||
          (parseFloat(a.size) || 0) - (parseFloat(b.size) || 0),
      )
      .map(([key, p]) => ({ key, label: sizeShort(p) }))
  }, [])

  const visible = useMemo(() => {
    const list = products.filter(
      (p) => (brand === 'all' || p.brand === brand) && (size === 'all' || sizeKey(p) === size),
    )
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'condition')
      sorted.sort((a, b) => CONDITIONS.indexOf(a.condition) - CONDITIONS.indexOf(b.condition))
    return sorted
  }, [brand, size, sort])

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
              Vintage and new sneakers from adidas, Nike, Converse, New Balance, Reebok and Puma —
              cleaned, graded and honest about every crease. One pair, one owner at a time.
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
                src={heroImage}
                referrerPolicy="no-referrer"
                alt="Sneakers from the Architek archive"
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
                  <textPath href="#circle" textLength="232" lengthAdjust="spacing">
                    Inspected by Architek ·
                  </textPath>
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
                  <option key={s.key} value={s.key}>
                    {s.label}
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
                <option value="condition">Best condition</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </label>
          </div>
        </div>

        {/* Brand filters */}
        <div className="mt-10 grid grid-cols-2 gap-[2px] border-2 border-ink bg-ink sm:grid-cols-5" role="group" aria-label="Filter by brand">
          {BRAND_FILTERS.map((e) => {
            const active = brand === e.id
            const count =
              e.id === 'all' ? products.length : products.filter((p) => p.brand === e.id).length
            return (
              <button
                key={e.id}
                type="button"
                aria-pressed={active}
                onClick={() => setBrand(e.id)}
                className={`group relative flex flex-col items-start gap-1 p-4 pt-8 text-left transition ${
                  active ? 'bg-ink text-paper' : 'bg-paper hover:bg-paper-deep'
                }`}
              >
                <span className="font-display text-3xl">{e.label}</span>
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
            <p className="font-display mt-4 text-4xl">No pairs match — yet.</p>
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
              {['Basketball', 'Running', 'Skate', 'Court', 'Trail', 'Street', 'Boots', 'Basketball', 'Running', 'Skate', 'Court', 'Trail', 'Street', 'Boots'].map((t, i) => (
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
              and a condition label that matches Depop's, so you know exactly how much life (and
              story) is left in them.
            </p>
          </div>
          <div className="divide-y-2 divide-ink border-2 border-ink">
            {[
              ['Brand New', 'Never worn. May have tags or the original box.'],
              ['Like New', 'Worn once or twice at most. No visible wear.'],
              ['Used - Excellent', 'Light wear and natural patina. Clean, sturdy, ready to lace up.'],
              ['Used - Good', 'Visible creasing and scuffs. Wearable history at a friendlier price.'],
              ['Used - Fair', 'Heavy wear or flaws. Always photographed and listed.'],
            ].map(([label, copy]) => (
              <div key={label} className="grid grid-cols-[9rem_1fr] items-center gap-4 p-5 transition hover:bg-volt sm:grid-cols-[12rem_1fr]">
                <span className="font-display text-2xl">{label}</span>
                <p className="text-sm text-ink/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { icon: Search, title: 'Sourced by hand', copy: 'Thrift bins, estate sales, old stockrooms. We dig so you don’t have to.' },
            { icon: ShieldCheck, title: 'Checked & cleaned', copy: 'Authenticity checks, deep clean, and fresh laces where needed.' },
            { icon: Package, title: 'Bought safely on Depop', copy: 'Checkout through Depop with buyer protection. Ships within 24 hours.' },
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
              The good pairs go fast. Tell us your size and the brands you love, and we'll give you
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
