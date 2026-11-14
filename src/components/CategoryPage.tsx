import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import products, { BRANDS, CONDITIONS, SIZE_TYPES, type Brand, type Product } from '@/data/products.ts'
import { ProductCard } from '@/components/ProductCard'
import { sizeOrder, sizeShort } from '@/lib/size'
import { useSearchQuery } from '@/lib/search'
import { kindOf, type Kind } from '@/lib/kinds'

const DEPOP_SHOP_URL = 'https://www.depop.com/abc_isfor_xyz/'
const PAGE_SIZE = 24

type Sort = 'featured' | 'just-in' | 'price-asc' | 'price-desc' | 'condition'

const sizeKey = (p: Product) => `${p.sizeType}|${p.size}`

const CATEGORY_LINKS = [
  { href: '/shoes', label: 'Shoes' },
  { href: '/boots', label: 'Boots' },
  { href: '/bags', label: 'Bags' },
  { href: '/clothing', label: 'Clothing' },
  { href: '/accessories', label: 'Accessories & Collectibles' },
]

export function CategoryPage({
  kind,
  heading,
  intro,
  path,
}: {
  kind: Kind
  heading: string
  intro: string
  path: string
}) {
  const [brand, setBrand] = useState<Brand | 'all'>('all')
  const [size, setSize] = useState('all')
  const [sort, setSort] = useState<Sort>('featured')
  const [showSold, setShowSold] = useState(false)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const query = useSearchQuery().trim().toLowerCase()
  // Start from the first batch again whenever a filter changes
  useEffect(() => setLimit(PAGE_SIZE), [brand, size, sort, showSold, query])

  // Everything in this category
  const inKind = useMemo(() => products.filter((p) => kindOf(p) === kind), [kind])
  const forSale = useMemo(() => inKind.filter((p) => !p.sold).length, [inKind])
  const soldCount = inKind.length - forSale

  // Brands that have something in this category
  const brandFilters = useMemo(
    () =>
      BRANDS.map((b) => ({
        id: b as Brand,
        label: b as string,
        count: inKind.filter((p) => p.brand === b && (showSold || !p.sold)).length,
      })).filter((b) => b.count > 0),
    [inKind, showSold],
  )
  // Plain-text brand list shown near the top of the page
  const brandsInStock = useMemo(
    () => [...new Set(inKind.filter((p) => !p.sold).map((p) => p.brand as string))].sort(),
    [inKind],
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
    if (sort === 'just-in') sorted.sort((a, b) => Number(b.tag === 'Just In') - Number(a.tag === 'Just In'))
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'condition')
      sorted.sort((a, b) => CONDITIONS.indexOf(a.condition) - CONDITIONS.indexOf(b.condition))
    // Sold items always go to the end of the list
    return [...sorted.filter((p) => !p.sold), ...sorted.filter((p) => p.sold)]
  }, [inKind, brand, size, sort, showSold, query])

  const selectClass =
    'h-10 rounded-[10px] border border-[#cfcac4] bg-white px-3 text-sm font-medium focus:border-ink focus:outline-none'

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
      <div className="rounded-[20px] bg-cream px-6 py-10 sm:px-12 sm:py-12">
        <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#6b4a1c]">
          <a href="/" className="hover:underline">
            ABC is for XYZ
          </a>{' '}
          / {heading}
        </p>
        <h1 className="font-display mt-3.5 text-[2.75rem] leading-none sm:text-6xl">{heading}</h1>
        <p className="mt-4 max-w-[36rem] text-base leading-relaxed text-[#3b3632] sm:text-lg">{intro}</p>
        {brandsInStock.length > 0 && (
          <p className="mt-4 max-w-[36rem] text-sm text-muted">Brands in stock: {brandsInStock.join(', ')}.</p>
        )}
        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          <a
            href="/#archive"
            className="whitespace-nowrap rounded-full bg-signal px-4 py-3.5 text-[14px] font-bold text-white hover:bg-ink sm:px-6 sm:text-[15px]"
          >
            Browse the full closet
          </a>
          <a
            href={DEPOP_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap rounded-full border-[1.5px] border-ink bg-white px-4 py-3 text-[14px] font-bold hover:bg-ink hover:text-white sm:gap-1.5 sm:px-6 sm:text-[15px]"
          >
            Shop on Depop <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      {/* Other categories */}
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Browse by category">
        {CATEGORY_LINKS.map((c) => (
          <a
            key={c.href}
            href={c.href}
            aria-current={c.href === path ? 'page' : undefined}
            className={`min-h-9 rounded-full px-3.5 py-2 text-[13px] font-medium ${
              c.href === path
                ? 'border-[1.5px] border-ink bg-[#f1ece4]'
                : 'border border-[#cfcac4] bg-white hover:bg-soft'
            }`}
          >
            {c.label}
          </a>
        ))}
      </nav>

      {/* Size + sort, same as the homepage closet */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5">
        <p className="text-sm text-muted">
          {forSale} for sale{soldCount > 0 && ` • ${soldCount} sold`}
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
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
            New finds land every week. Sign up for drop alerts and we'll ping you when something shows up.
          </p>
          <a
            href="/#drops"
            className="mt-6 rounded-full border-[1.5px] border-ink px-5 py-2.5 text-sm font-bold hover:bg-ink hover:text-white"
          >
            Get drop alerts
          </a>
        </div>
      )}

      <div className="mt-9 flex flex-wrap justify-center gap-3 pb-16">
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
  )
}
