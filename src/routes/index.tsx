import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import products, { BRANDS, CONDITIONS, SIZE_TYPES, type Brand, type Product } from '@/data/products.ts'
import { ProductCard } from '@/components/ProductCard'
import { DropAlertForm } from '@/components/DropAlertForm'
import { sizeOrder, sizeShort } from '@/lib/size'
import { useSearchQuery } from '@/lib/search'

const DEPOP_SHOP_URL = 'https://www.depop.com/abc_isfor_xyz/'

export const Route = createFileRoute('/')({
  component: Home,
})

// What kind of item it is. Shoes use the category set in the manage page; Bags and Clothing have their own.
type Kind = 'Sneakers' | 'Boots' | 'Bags' | 'Clothing'
const KINDS: Array<Kind> = ['Sneakers', 'Boots', 'Bags', 'Clothing']
const LETTER_SIZE = /^(xxs|xs|s|m|l|xl|xxl|xxxl|one size|os|small|medium|large)$/i
const SHOE_WORDS =
  /shoe|sneaker|boot|loafer|sandal|heel|pump|oxford|slide|clog|trainer|cleat|slipper|mule|dunk|jordan|air max|air force|gazelle|samba|chuck taylor|yeezy/
const BAG_WORDS =
  /(?<!dust )(?<!shoe )(?<!shoes )\b(?:bag|purse|handbag|tote|crossbody|cross body|clutch|satchel|backpack|wallet|pouch|duffle|duffel|hobo|baguette|wristlet|messenger|luggage|suitcase|fanny pack|belt bag)\b/
const CLOTHING_WORDS =
  /\b(?:shirt|t-shirt|tee|hoodie|sweatshirt|crewneck|jacket|coat|parka|puffer|bomber|anorak|windbreaker|fleece|pullover|quarter zip|henley|flannel|jeans|pants|trousers|slacks|chinos|cargo|joggers|sweatpants|leggings|tights|shorts|skirt|skort|dress|romper|jumpsuit|overalls|bodysuit|blouse|sweater|cardigan|vest|jersey|tracksuit|sweatsuit|blazer|beanie|scarf|gloves|bra|swimsuit|bikini|pajamas|robe|tank top|crop top)\b/
const kindOf = (p: Product): Kind => {
  const category: string = p.category
  const brand: string = p.brand
  // Bag brands always count as bags, even if the item was left on the default category
  if (brand === 'Coach' || brand === 'Vera Bradley') return 'Bags'
  if (category === 'Boots') return 'Boots'
  if (category === 'Bags') return 'Bags'
  if (category === 'Clothing') return 'Clothing'
  // Items left on a shoe category: clothing and bags are spotted by their size and their name
  if (LETTER_SIZE.test(p.size.trim())) return 'Clothing'
  const name = p.name.toLowerCase()
  if (!SHOE_WORDS.test(name)) {
    if (BAG_WORDS.test(name)) return 'Bags'
    if (CLOTHING_WORDS.test(name)) return 'Clothing'
  }
  return 'Sneakers'
}

type Sort = 'featured' | 'just-in' | 'price-asc' | 'price-desc' | 'condition'

// How many pairs show before the "Show more" button
const PAGE_SIZE = 24

const sizeKey = (p: Product) => `${p.sizeType}|${p.size}`

function Home() {
  const [kind, setKind] = useState<Kind | 'all'>('all')
  const [brand, setBrand] = useState<Brand | 'all'>('all')
  const [size, setSize] = useState('all')
  const [sort, setSort] = useState<Sort>('featured')
  const [showSold, setShowSold] = useState(true)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const query = useSearchQuery().trim().toLowerCase()
  // Start from the first batch again whenever a filter changes
  useEffect(() => setLimit(PAGE_SIZE), [kind, brand, size, sort, showSold, query])

  const inKind = useMemo(
    () => products.filter((p) => kind === 'all' || kindOf(p) === kind),
    [kind],
  )
  const kindCounts = useMemo(
    () =>
      KINDS.map((k) => ({
        id: k,
        count: products.filter((p) => kindOf(p) === k && (showSold || !p.sold)).length,
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
      })).filter((b) => b.count > 0 && !(kind === 'Sneakers' && b.id === 'Other')),
    [inKind, showSold, kind],
  )
  // One entry per size and who it is for, e.g. M 9, W 9, Kids 12
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
    const words = query.split(/\s+/).filter(Boolean)
    const list = inKind.filter(
      (p) =>
        (brand === 'all' || p.brand === brand) &&
        (size === 'all' || sizeKey(p) === size) &&
        (showSold || !p.sold) &&
        words.every((w) => `${p.name} ${p.brand} ${p.colorway} ${p.condition}`.toLowerCase().includes(w)),
    )
    const sorted = [...list]
    // pairs tagged "Just In" in the manage page come first; everything else keeps its list order
    if (sort === 'just-in') sorted.sort((a, b) => Number(b.tag === 'Just In') - Number(a.tag === 'Just In'))
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'condition')
      sorted.sort((a, b) => CONDITIONS.indexOf(a.condition) - CONDITIONS.indexOf(b.condition))
    // Sold pairs always go to the end of the list
    return [...sorted.filter((p) => !p.sold), ...sorted.filter((p) => p.sold)]
  }, [inKind, brand, size, sort, showSold, query])

  const forSale = products.filter((p) => !p.sold).length
  const soldCount = products.length - forSale

  const selectClass =
    'h-10 rounded-[10px] border border-[#cfcac4] bg-white px-3 text-sm font-medium focus:border-ink focus:outline-none'
  const chip = (active: boolean) =>
    `flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-ink px-4 text-sm font-bold transition ${
      active ? 'bg-ink text-white' : 'bg-white hover:bg-soft'
    }`

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-8 rounded-[20px] bg-cream px-6 py-10 sm:px-12 sm:py-12">
          <div className="min-w-0 flex-1 basis-[22rem]">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#6b4a1c]">
              A–Z curated vintage + modern finds • Built for repeat buyers
            </p>
            <h1 className="font-display mt-3.5 text-[2.75rem] leading-none sm:text-6xl lg:text-[4rem]">
              Vintage + modern,
              <br />
              A to Z.
            </h1>
            <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-[#3b3632] sm:text-lg">
              Sneakers, boots, bags and clothing — cleaned, graded and honest about every crease.
              One of one, so when it's gone, it's gone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#archive"
                className="rounded-full bg-signal px-6 py-3.5 text-[15px] font-bold text-white hover:bg-ink"
              >
                Browse Urban Closet
              </a>
              <a
                href={DEPOP_SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-white px-6 py-3 text-[15px] font-bold hover:bg-ink hover:text-white"
              >
                Shop on Depop <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="hidden flex-1 basis-48 justify-center md:flex">
            <img
              src="/img/logo.png"
              alt="ABC is for XYZ logo"
              width={480}
              height={480}
              className="spin-slow size-60 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Urban Closet (the shop list) */}
      <section id="archive" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-10 sm:px-8 sm:pt-12">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 className="font-display text-4xl sm:text-[2.5rem]" aria-label="Urban Closet">
            <span aria-hidden="true">Urban </span>
            <span aria-hidden="true">
              {[
                ['C', 'text-clay'],
                ['L', 'text-[#b8920a]'],
                ['O', 'text-[#0a8fa8]'],
                ['S', 'text-olive'],
                ['E', 'text-[#8a55c0]'],
                ['T', 'text-signal'],
              ].map(([letter, color]) => (
                <span key={letter} className={color}>
                  {letter}
                </span>
              ))}
            </span>
          </h2>
          <p className="text-sm text-muted">
            {forSale} for sale{soldCount > 0 && ` • ${soldCount} sold`}
          </p>
        </div>

        {/* What are you looking for + size and sort */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by type">
            {[
              { id: 'all' as const, label: 'Everything', count: kindCounts.reduce((n, k) => n + k.count, 0) },
              ...kindCounts.map((k) => ({ id: k.id, label: k.id as string, count: k.count })),
            ].map((k) => (
              <button
                key={k.id}
                type="button"
                aria-pressed={kind === k.id}
                onClick={() => {
                  setKind(k.id)
                  setBrand('all')
                  setSize('all')
                }}
                className={chip(kind === k.id)}
              >
                {k.label} <span className="font-medium opacity-70">{k.count}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2.5 md:ml-auto">
            <label className="flex items-center gap-2 text-sm font-medium">
              Size
              <select value={size} onChange={(e) => setSize(e.target.value)} className={selectClass}>
                <option value="all">All</option>
                {sizes.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={selectClass}>
                <option value="featured">Featured</option>
                <option value="just-in">Just in</option>
                <option value="condition">Best condition</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </label>
          </div>
        </div>

        {/* Brand chips */}
        <div className="mt-3.5 flex flex-wrap gap-2" role="group" aria-label="Filter by brand">
          {[{ id: 'all' as const, label: 'All brands' }, ...brandFilters].map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={brand === b.id}
              onClick={() => setBrand(b.id)}
              className={`min-h-9 rounded-full px-3.5 text-[13px] font-medium transition ${
                brand === b.id
                  ? 'border-[1.5px] border-ink bg-[#f1ece4]'
                  : 'border border-[#cfcac4] bg-white hover:bg-soft'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
        <label className="mt-3.5 flex cursor-pointer items-center gap-2 text-[13px] text-muted">
          <input
            type="checkbox"
            checked={showSold}
            onChange={(e) => setShowSold(e.target.checked)}
            className="size-4 accent-ink"
          />
          Show sold
        </label>

        {query && (
          <p className="mt-4 text-sm text-muted">
            {visible.length} result{visible.length === 1 ? '' : 's'} for “{query}”
          </p>
        )}

        {visible.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-4 xl:grid-cols-5">
            {visible.slice(0, limit).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid place-items-center rounded-2xl border border-dashed border-[#cfcac4] px-6 py-16 text-center">
            <p className="font-display text-3xl">Nothing matches — yet.</p>
            <p className="mt-2 max-w-sm text-muted">
              New finds land every week. Sign up for drop alerts and we'll ping you when your size
              shows up.
            </p>
            <a
              href="#drops"
              className="mt-6 rounded-full border-[1.5px] border-ink px-5 py-2.5 text-sm font-bold hover:bg-ink hover:text-white"
            >
              Get drop alerts
            </a>
          </div>
        )}

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {visible.length > limit && (
            <button
              type="button"
              onClick={() => setLimit((n) => n + PAGE_SIZE)}
              className="min-h-12 rounded-full border-[1.5px] border-ink bg-white px-8 text-[15px] font-bold hover:bg-ink hover:text-white"
            >
              Show more ({visible.length - limit} left)
            </button>
          )}
          <a
            href={DEPOP_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-12 items-center gap-1.5 rounded-full bg-ink px-8 text-[15px] font-bold text-white hover:bg-signal"
          >
            See every listing on Depop <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      {/* Grading */}
      <section id="grading" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-20 sm:px-8">
        <h2 className="font-display text-4xl sm:text-[2.5rem]">Honest condition labels</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3b3632]">
          Vintage is never perfect — that's the point. Every pair gets a hands-on inspection and a
          condition label that matches Depop's, so you know exactly how much life (and story) is
          left in them.
        </p>
        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(11.5rem,1fr))] gap-3.5">
          {[
            ['Brand New', 'Never worn. May have tags or the original box.'],
            ['Like New', 'Worn once or twice at most. No visible wear.'],
            ['Used - Excellent', 'Light wear and natural patina. Clean, sturdy, ready to go.'],
            ['Used - Good', 'Visible creasing and scuffs. Wearable history at a friendlier price.'],
            ['Used - Fair', 'Heavy wear or flaws. Always photographed and listed.'],
          ].map(([label, copy], i) => {
            const level = 5 - i
            const color = ['bg-clay', 'bg-[#d9b200]', 'bg-sole', 'bg-olive', 'bg-lilac'][i]
            return (
              <div key={label} className="rounded-[14px] border border-line p-5">
                <div className="mb-3.5 flex gap-1" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <span key={n} className={`h-1.5 flex-1 rounded-full ${n < level ? color : 'bg-line'}`} />
                  ))}
                </div>
                <p className="text-base font-bold">{label}</p>
                <p className="mt-1.5 text-sm leading-snug text-muted">{copy}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Drop alerts */}
      <section id="drops" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-14 sm:px-8">
        <div className="grid gap-8 rounded-[20px] bg-ink p-6 text-white sm:p-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-4xl sm:text-[2.5rem]">Get first dibs.</h2>
            <p className="mt-3.5 max-w-md text-base leading-relaxed text-[#e6e0d8]">
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
