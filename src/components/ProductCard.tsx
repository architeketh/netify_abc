import { Link } from '@tanstack/react-router'
import type { Product } from '@/data/products.ts'
import { cdn, srcSet } from '@/lib/img'
import { sizeShort } from '@/lib/size'

// Whole dollars show as $95, cents show as $69.90
const formatPrice = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2))

const isRemote = (u: string) => /^https?:\/\//i.test(u)

export function ProductCard({ product }: { product: Product; index?: number }) {
  // Photos hosted on Depop load directly; local /img/ photos still use the Netlify image CDN
  const remote = isRemote(product.image)
  const size = sizeShort(product)
  const brand = product.brand === 'Other' ? '' : product.brand

  return (
    <article className="group">
      <Link to="/products/$productId" params={{ productId: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-soft">
          <img
            src={remote ? product.image : cdn(product.image, 600)}
            srcSet={remote ? undefined : srcSet(product.image, [400, 600, 900])}
            referrerPolicy="no-referrer"
            sizes="(min-width: 1024px) 20vw, 50vw"
            alt={product.colorway ? `${product.name} in ${product.colorway}` : product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          {product.tag && product.tag !== 'Hero' && !product.sold && (
            <span className="absolute left-2.5 top-2.5 rounded-md bg-ink px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {product.tag}
            </span>
          )}
          {product.sold && (
            <span className="absolute inset-0 grid place-items-center bg-white/60">
              <span className="rounded-full bg-ink px-4 py-1.5 text-[13px] font-bold uppercase tracking-wider text-white">
                Sold
              </span>
            </span>
          )}
        </div>

        <div className="px-0.5 pt-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[15px] font-bold">${formatPrice(product.price)}</span>
            {size && <span className="whitespace-nowrap text-[13px] text-muted">{size}</span>}
          </div>
          {brand && <p className="mt-0.5 text-[13px] font-bold">{brand}</p>}
          <h3 className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-muted">{product.name}</h3>
          <p className="mt-1 text-xs text-muted">{product.condition}</p>
        </div>
      </Link>
    </article>
  )
}
