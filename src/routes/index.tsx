import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Package, Search, ShieldCheck, Sparkles } from 'lucide-react'
import products, { BRANDS, CONDITIONS, SIZE_TYPES, type Brand, type Product } from '@/data/products.ts'
import { ProductCard } from '@/components/ProductCard'
import { DropAlertForm } from '@/components/DropAlertForm'
import { sizeOrder, sizeShort } from '@/lib/size'

const DEPOP_SHOP_URL = 'https://www.depop.com/abc_isfor_xyz/'

export const Route = createFileRoute('/')({
  component: Home,
})

// What kind of item it is. Shoes use the category set in the manage page; Bags and Clothing have their own.
type Kind = 'Sneakers' | 'Boots' | 'Bags' | 'Clothing'
const KINDS: Array<{ id: Kind; color: string }> = [
  { id: 'Sneakers', color: 'bg-volt text-ink' },
  { id: 'Boots', color: 'bg-clay text-paper' },
  { id: 'Bags', color: 'bg-lilac text-ink' },
  { id: 'Clothing', color: 'bg-sole text-ink' },
]
const kindOf = (p: Product): Kind => {
  const category: string = p.category
  const brand: string = p.brand
  // Bag brands always count as bags, even if the item was left on the default category
  if (brand === 'Coach' || brand === 'Vera Bradley') return 'Bags'
  return category === 'Boots' ? 'Boots' : category === 'Bags' ? 'Bags' : category === 'Clothing' ? 'Clothing' : 'Sneakers'
}

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'condition'

const TICKER = [
  'Hand-picked vintage',
  'Cleaned & graded',
  'Clear pricing + quick replies',
  'Ships within 24 hrs from MN',
  'Vintage + new',
  'One of one',
  'Honest condition labels',
]

// How many pairs show before the "Show more" button
const PAGE_SIZE = 24

const sizeKey = (p: Product) => `${p.sizeType}|${p.size}`

function Home() {
  // Main photo: the first pair for sale. To use your own photo instead, replace this with '/img/hero.png'.
  const heroImage = (products.find((p) => !p.sold) ?? products[0])?.image ?? '/img/hero.png'
  const [kind, setKind] = useState<Kind | 'all'>('all')
  const [brand, setBrand] = useState<Brand | 'all'>('all')
  const [size, setSize] = useState('all')
  const [sort, setSort] = useState<Sort>('featured')
  const [showSold, setShowSold] = useState(true)
  const [limit, setLimit] = useState(PAGE_SIZE)
  // Start from the first batch again whenever a filter changes
  useEffect(() => setLimit(PAGE_SIZE), [kind, brand, size, sort, showSold])

  // One entry per size and who it is for, e.g. M 9, W 9, Kids 12
  const inKind = useMemo(
    () => products.filter((p) => kind === 'all' || kindOf(p) === kind),
    [kind],
  )
  const kindCounts = useMemo(
    () =>
      KINDS.map((k) => ({
        ...k,
        count: products.filter((p) => kindOf(p) === k.id && (showSold || !p.sold)).length,
      })).filter((k) => k.count > 0),
    [showSold],
  )
  // Only brands that have something in the chosen kind
  const brandFilters = useMemo(
    () =>
      BRANDS.map((b) => ({
        id: b as Brand,
        label: b as string,
        count: inKind.filter((p) => p.brand === b && (showSold || !p.sold)).length,
      })).filter((b) => b.count > 0),
    [inKind, showSold],
  )
  const sizes = useMemo(() => {
    const seen = new Map<string, Product>()
    inKind.forEach((p) => {
      if (!p.size) return
      const key = sizeKey(p)
      if (!seen.has(key)) seen.set(key, p)
    })
    return [...seen.entries()]
      .sort(
        ([, a], [, b]) =>
          SIZE_TYPES.indexOf(a.sizeType) - SIZE_TYPES.indexOf(b.sizeType) ||
          sizeOrder(a.size) - sizeOrder(b.size),
      )
      .map(([key, p]) => ({ key, label: sizeShort(p) }))
  }, [inKind])

  const visible = useMemo(() => {
    const list = inKind.filter(
      (p) => (brand === 'all' || p.brand === brand) &&
        (size === 'all' || sizeKey(p) === size) &&
        (showSold || !p.sold),
    )
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'condition')
      sorted.sort((a, b) => CONDITIONS.indexOf(a.condition) - CONDITIONS.indexOf(b.condition))
    // Sold pairs always go to the end of the list
    return [...sorted.filter((p) => !p.sold), ...sorted.filter((p) => p.sold)]
  }, [inKind, brand, size, sort, showSold])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:pt-16">
          <div className="rise relative z-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
              A–Z curated vintage + modern finds • Built for repeat buyers
            </p>
            <h1 className="font-display mt-5 text-[13vw] sm:text-6xl lg:text-8xl">
              Vintage
              <br />
              <span className="text-outline">+ modern</span>
              <br />
              <span className="text-signal">A to Z.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:mt-8 sm:text-lg">
              Vintage and modern sneakers, boots, bags and clothing — cleaned, graded and honest
              about every crease. One of one, so when it's gone, it's gone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#archive"
                className="flex items-center gap-2 border-2 border-ink bg-ink px-6 py-3 font-bold uppercase text-paper shadow-[4px_4px_0_var(--color-signal)] transition hover:-translate-y-0.5"
              >
                Urban Ledger <ArrowDown className="size-4" />
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
                alt="Sneakers from ABC is for XYZ"
                className="aspect-[4/3] w-full object-cover"
                fetchPriority="high"
              />
              <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-ink/70">
                Fig. 01 — Curated A to Z
              </p>
            </div>
            <img
              src="/img/logo.png"
              alt="ABC is for XYZ logo"
              width={480}
              height={480}
              className="spin-slow absolute -left-6 -top-8 size-32 rounded-full sm:-left-10 sm:size-36"
            />
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b-2 border-ink bg-signal py-3 text-paper">
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {TICKER.map((t) => (
                <span key={t} className="font-display flex items-center gap-4 px-4 text-xl sm:gap-6 sm:px-6 sm:text-3xl">
                  {t} <Sparkles className="size-5" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Urban Ledger (the shop list) */}
      <section id="archive" className="scroll-mt-20 mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
              Current drop · {products.filter((p) => !p.sold).length} for sale
              {products.some((p) => p.sold) && ` · ${products.filter((p) => p.sold).length} sold`}
            </p>
            <h2 className="font-display mt-3 text-4xl sm:text-6xl">Urban Ledger</h2>
          </div>
          <div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <label className="flex min-h-11 items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-sm font-bold uppercase">
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
            <label className="flex min-h-11 items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-sm font-bold uppercase">
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
          <label className="mt-3 flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink/60">
            <input
              type="checkbox"
              checked={showSold}
              onChange={(e) => setShowSold(e.target.checked)}
              className="size-3.5 accent-ink"
            />
            Show sold
          </label>
          </div>
        </div>

        {/* What are you looking for */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by type">
          {[{ id: 'all' as const, label: 'Everything', color: 'bg-ink text-paper', count: kindCounts.reduce((n, k) => n + k.count, 0) },
            ...kindCounts.map((k) => ({ id: k.id, label: k.id as string, color: k.color, count: k.count }))].map((k) => {
            const active = kind === k.id
            return (
              <button
                key={k.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setKind(k.id)
                  setBrand('all')
                  setSize('all')
                }}
                className={`font-display flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 border-ink px-3.5 py-1.5 text-base transition sm:px-5 sm:py-2 sm:text-xl ${
                  active ? `${k.color} shadow-[3px_3px_0_var(--color-ink)]` : 'bg-paper hover:bg-paper-deep'
                }`}
              >
                {k.label}
                <span className="font-mono text-xs opacity-70">{k.count}</span>
              </button>
            )
          })}
        </div>

        {/* Brand filters */}
        <div className="mt-4 flex gap-[2px] overflow-x-auto border-2 border-ink bg-ink sm:mt-4 sm:grid sm:grid-cols-5 sm:overflow-visible" role="group" aria-label="Filter by brand">
          {[{ id: 'all' as const, label: 'All brands', count: inKind.filter((p) => showSold || !p.sold).length }, ...brandFilters].map((e) => {
            const active = brand === e.id
            const count = e.count
            return (
              <button
                key={e.id}
                type="button"
                aria-pressed={active}
                onClick={() => setBrand(e.id)}
                className={`group relative flex min-w-[6rem] shrink-0 flex-col items-start gap-1 p-3 pt-7 text-left sm:p-4 sm:pt-8 transition sm:min-w-0 ${
                  active ? 'bg-ink text-paper' : 'bg-paper hover:bg-paper-deep'
                }`}
              >
                <span className="font-display text-xl leading-tight sm:text-3xl">{e.label}</span>
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
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-12 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
            {visible.slice(0, limit).map((product) => (
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
            <p className="font-display mt-4 text-3xl sm:text-4xl">Nothing matches — yet.</p>
            <p className="mt-2 max-w-sm text-ink/70">
              New finds land every week. Sign up for drop alerts and we'll ping you when your size
              shows up.
            </p>
            <a href="#drops" className="mt-6 border-2 border-ink px-5 py-2 font-bold uppercase hover:bg-ink hover:text-paper">
              Get drop alerts
            </a>
          </div>
        )}

        {visible.length > limit && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((n) => n + PAGE_SIZE)}
              className="min-h-12 border-2 border-ink bg-paper px-6 py-3 font-display text-xl sm:px-8 sm:text-2xl shadow-[4px_4px_0_var(--color-ink)] active:translate-y-0.5"
            >
              Show more ({visible.length - limit} left)
            </button>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <a
            href={DEPOP_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 border-2 border-ink bg-volt px-5 py-3 font-display text-xl sm:px-8 sm:py-4 sm:text-3xl shadow-[6px_6px_0_var(--color-ink)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--color-ink)]"
          >
            See every listing on Depop
            <ArrowUpRight className="size-5 transition sm:size-7 group-hover:rotate-45" />
          </a>
        </div>
      </section>

      {/* Second ticker */}
      <div className="mt-24 -rotate-1 overflow-hidden border-y-2 border-ink bg-ink py-3 text-paper">
        <div className="marquee marquee-reverse">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {['Sneakers', 'Boots', 'Bags', 'Clothing', 'Sneakers', 'Boots', 'Bags', 'Clothing'].map((t, i) => (
                <span key={i} className="font-display px-4 text-3xl sm:px-6 sm:text-5xl">
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
            <h2 className="font-display mt-3 text-4xl sm:text-6xl">
              Graded <span className="text-signal">honest.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
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
            { icon: Package, title: 'Bought safely on Depop', copy: 'Checkout through Depop with buyer protection. Ships within 24 hours from MN.' },
          ].map(({ icon: Icon, title, copy }, i) => (
            <div key={title} className="border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)]">
              <div className="flex items-center justify-between">
                <Icon className="size-8" />
                <span className="font-mono text-xs text-ink/50">0{i + 1}</span>
              </div>
              <p className="font-display mt-6 text-2xl sm:text-3xl">{title}</p>
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
            <h2 className="font-display mt-3 text-4xl sm:text-6xl">
              Your size.
              <br />
              <span className="text-signal">First dibs.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/80 sm:text-lg">
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
