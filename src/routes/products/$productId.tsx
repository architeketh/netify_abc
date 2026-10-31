import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import products from '@/data/products.ts'
import { ConditionMeter } from '@/components/ConditionMeter'
import { ProductCard } from '@/components/ProductCard'
import { cdn, srcSet } from '@/lib/img'

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
          { title: `${loaderData.name} — Architek` },
          { name: 'description', content: loaderData.description },
          { property: 'og:image', content: isRemote(loaderData.image) ? loaderData.image : cdn(loaderData.image, 1200) },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <p className="font-display text-8xl">Gone.</p>
      <p className="mt-4 text-lg text-ink/70">
        That pair has already walked off. Plenty more where it came from.
      </p>
      <Link
        to="/"
        hash="archive"
        className="mt-8 inline-block border-2 border-ink bg-ink px-6 py-3 font-bold uppercase text-paper"
      >
        Back to the archive
      </Link>
    </div>
  ),
})

function ProductPage() {
  const product = Route.useLoaderData()
  const index = products.indexOf(product)
  const catalogNo = `ARC-${String(index + 1).padStart(3, '0')}`
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)

  const related = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <Link
        to="/"
        hash="archive"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-signal"
      >
        <ArrowLeft className="size-4" /> Back to the archive
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div
          className="relative aspect-[4/5] cursor-zoom-in overflow-hidden border-2 border-ink bg-paper-deep shadow-[10px_10px_0_var(--color-ink)]"
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
            alt={`${product.name} in ${product.colorway}`}
            className={`h-full w-full object-cover transition-transform duration-200 ${product.sold ? 'grayscale' : ''}`}
            style={
              zoom
                ? { transform: 'scale(1.8)', transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : undefined
            }
          />
          {product.tag && (
            <span className="absolute left-4 top-4 -rotate-3 border-2 border-ink bg-volt px-3 py-1 font-mono text-xs font-bold uppercase">
              {product.tag}
            </span>
          )}
        </div>

        <div className="lg:pt-4">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink/60">
            <span className="tag-hole">{catalogNo}</span>
            <span>
              {product.brand} · {product.category}
            </span>
          </div>
          <h1 className="mt-4 text-lg font-medium leading-snug sm:text-xl">{product.name}</h1>
          <p className="mt-2 text-base text-ink/70">{product.colorway}</p>

          <div className="mt-5 flex items-end gap-4">
            <span className="font-display text-2xl">${formatPrice(product.price)}</span>
            <span className="mb-2 font-mono text-xs uppercase tracking-widest text-ink/60">
              USD · via Depop
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-2 border-2 border-ink">
            {[
                      ['Size', `US ${product.size}`],
              ['Condition', product.condition],
            ].map(([k, v], i) => (
              <div key={k} className={`p-3 ${i > 0 ? 'border-l-2 border-ink' : ''}`}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{k}</dt>
                <dd className="font-display mt-1 text-base">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <ConditionMeter condition={product.condition} showLabel={false} />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink/80">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-center gap-3">
                <Check className="size-4 text-signal" /> {d}
              </li>
            ))}
          </ul>

          {product.sold ? (
            <p className="font-display mt-10 border-2 border-ink p-5 text-center text-2xl">
              Sold — sorry!
            </p>
          ) : (
            <a
              href={product.depopUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex items-center justify-center gap-3 border-2 border-ink bg-signal px-6 py-3 font-display text-lg text-paper shadow-[6px_6px_0_var(--color-ink)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--color-ink)]"
            >
              Cop it on Depop
              <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
            </a>
          )}
          <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-ink/60">
            Secure checkout & buyer protection through Depop
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-3xl">Also in the archive</h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} index={products.indexOf(p)} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}