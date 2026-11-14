import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import products from '@/data/products.ts'
import { ProductCard } from '@/components/ProductCard'
import { kindOf, type Kind } from '@/lib/kinds'

const DEPOP_SHOP_URL = 'https://www.depop.com/abc_isfor_xyz/'
const PAGE_SIZE = 24

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
  const [limit, setLimit] = useState(PAGE_SIZE)

  // Only items still for sale in this category
  const items = useMemo(() => products.filter((p) => kindOf(p) === kind && !p.sold), [kind])
  const brands = useMemo(() => [...new Set(items.map((p) => p.brand as string))].sort(), [items])

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
        {brands.length > 0 && (
          <p className="mt-4 max-w-[36rem] text-sm text-muted">Brands in stock: {brands.join(', ')}.</p>
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

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Browse by category">
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
      </div>

      {items.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-4 xl:grid-cols-5">
          {items.slice(0, limit).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid place-items-center rounded-2xl border border-dashed border-[#cfcac4] px-6 py-16 text-center">
          <p className="font-display text-3xl">Nothing here right now.</p>
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
        {items.length > limit && (
          <button
            type="button"
            onClick={() => setLimit((n) => n + PAGE_SIZE)}
            className="min-h-12 rounded-full border-[1.5px] border-ink bg-white px-8 text-[15px] font-bold hover:bg-ink hover:text-white"
          >
            Show more ({items.length - limit} left)
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
