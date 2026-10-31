import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/data/products'
import { ConditionMeter } from '@/components/ConditionMeter'
import { cdn, srcSet } from '@/lib/img'

const tilts = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-[0.6deg]', 'rotate-[0.8deg]']

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const catalogNo = `ARC-${String(index + 1).padStart(3, '0')}`

  return (
    <article
      className={`rise group relative ${tilts[index % tilts.length]} transition duration-300 hover:z-10 hover:rotate-0`}
      style={{ animationDelay: `${(index % 4) * 70}ms` }}
    >
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="block border-2 border-ink bg-paper shadow-[6px_6px_0_var(--color-ink)] transition group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0_var(--color-signal)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink bg-paper-deep">
          <img
            src={cdn(product.image, 600)}
            srcSet={srcSet(product.image, [400, 600, 900])}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            alt={`${product.name} in ${product.colorway}`}
            loading="lazy"
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${product.sold ? 'grayscale' : ''}`}
          />
          {product.tag && !product.sold && (
            <span className="absolute left-3 top-3 -rotate-3 border-2 border-ink bg-volt px-2 py-0.5 font-mono text-[11px] font-bold uppercase">
              {product.tag}
            </span>
          )}
          {product.sold && (
            <span className="font-display absolute inset-0 grid place-items-center bg-ink/40 text-6xl text-paper">
              Sold
            </span>
          )}
          <span className="absolute bottom-3 right-3 rounded-full border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[11px] font-bold">
            US {product.size}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink/60">
            <span className="tag-hole">{catalogNo}</span>
            <span>
              {product.year} · {product.category}
            </span>
          </div>
          <h3 className="font-display mt-3 text-3xl">{product.name}</h3>
          <p className="mt-1 text-sm text-ink/70">{product.colorway}</p>
          <ConditionMeter score={product.conditionScore} className="mt-4" />
          <div className="mt-4 flex items-end justify-between">
            <span className="font-display text-4xl">${product.price}</span>
            <span className="flex items-center gap-1 text-xs font-bold uppercase opacity-0 transition group-hover:opacity-100">
              View pair <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
