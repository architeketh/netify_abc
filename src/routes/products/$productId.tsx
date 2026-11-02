import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import products from '@/data/products.ts'
import { ConditionMeter } from '@/components/ConditionMeter'
import { ProductCard } from '@/components/ProductCard'
import { cdn, srcSet } from '@/lib/img'
import { sizeLong } from '@/lib/size'

const isRemote = (u: string) => /^https?:\/\//i.test(u)
// Whole dollars show as $95, cents show as $69.90
const formatPrice = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2))

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ABC is for XYZ` },
          { name: 'description', content: loaderData.description },
          { property: 'og:image', content: isRemote(loaderData.image) ? loaderData.image : cdn(loaderData.image, 1200) },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <p className="font-display text-7xl">Gone.</p>
      <p className="mt-4 text-lg text-muted">
        That one has already walked off. Plenty more where it came from.
      </p>
      <Link
        to="/"
        hash="archive"
        className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-signal"
      >
        Back to the closet
      </Link>
    </div>
  ),
})

function ProductPage() {
  const product = Route.useLoaderData()
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)

  const related = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4)

  const size = sizeLong(product)
  const brand = product.brand === 'Other' ? '' : product.brand

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
      <Link
        to="/"
        hash="archive"
        className="inline-flex items-center gap-2 text-sm font-bold hover:text-signal"
      >
        <ArrowLeft className="size-4" /> Back to the closet
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div
          className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-2xl bg-soft"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
          }}
          onMouseLeave={() => setZoom(null)}
        >
          <img
            src={isRemote(product.image) ? product.image : cdn(product.image, 1100)}
            srcSet={isRemote(product.image) ? undefined : srcSet(product.image, [600, 900, 1400])}
            referrerPolicy="no-referrer"
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={product.colorway ? `${product.name} in ${product.colorway}` : product.name}
            className="h-full w-full object-cover transition-transform duration-200"
            style={
              zoom
                ? { transform: 'scale(1.8)', transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : undefined
            }
          />
          {product.tag && product.tag !== 'Hero' && !product.sold && (
            <span className="absolute left-4 top-4 rounded-md bg-ink px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {product.tag}
            </span>
          )}
          {product.sold && (
            <span className="absolute inset-0 grid place-items-center bg-white/60">
              <span className="rounded-full bg-ink px-6 py-2 text-sm font-bold uppercase tracking-wider text-white">
                Sold
              </span>
            </span>
          )}
        </div>

        <div className="lg:pt-2">
          <p className="text-sm text-muted">
            {[brand, product.category].filter(Boolean).join(' · ')}
          </p>
          <h1 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">{product.name}</h1>
          {product.colorway && <p className="mt-1.5 text-base text-muted">{product.colorway}</p>}

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold">${formatPrice(product.price)}</span>
            <span className="text-sm text-muted">USD · via Depop</span>
          </div>

          <dl className={`mt-6 grid overflow-hidden rounded-xl border border-line ${size ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {[
              ['Size', size],
              ['Condition', product.condition],
            ]
              .filter(([, v]) => v)
              .map(([k, v], i) => (
                <div key={k} className={`p-4 ${i > 0 ? 'border-l border-line' : ''}`}>
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-1 text-base font-bold">{v}</dd>
                </div>
              ))}
          </dl>

          <div className="mt-5">
            <ConditionMeter condition={product.condition} showLabel={false} />
          </div>

          {product.description && (
            <p className="mt-6 text-sm leading-relaxed text-[#3b3632]">{product.description}</p>
          )}

          {product.details.length > 0 && (
            <ul className="mt-5 space-y-2 text-sm">
              {product.details.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <Check className="size-4 text-signal" /> {d}
                </li>
              ))}
            </ul>
          )}

          {product.sold ? (
            <p className="mt-8 rounded-full border-[1.5px] border-ink px-6 py-3.5 text-center text-base font-bold">
              Sold — sorry!
            </p>
          ) : (
            <a
              href={product.depopUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-4 text-base font-bold text-white transition hover:bg-ink"
            >
              Buy it on Depop
              <ArrowUpRight className="size-5" />
            </a>
          )}
          <p className="mt-3 text-center text-xs text-muted">
            Secure checkout & buyer protection through Depop
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl">Also in the closet</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
