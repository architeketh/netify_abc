import type { Product } from '@/data/products.ts'

const SHORT = { Men: 'M', Women: 'W', Kids: 'Kids' } as const
const LONG = { Men: "Men's", Women: "Women's", Kids: "Kids'" } as const

// Short label for the card badge, like "W 9", "Kids 12" or "M L". Empty when the item has no size (bags).
export const sizeShort = (p: Pick<Product, 'size' | 'sizeType'>) =>
  p.size ? `${SHORT[p.sizeType]} ${p.size}` : ''

// Full label for the detail page, like "Women's 9". Empty when the item has no size.
export const sizeLong = (p: Pick<Product, 'size' | 'sizeType'>) =>
  p.size ? `${LONG[p.sizeType]} ${p.size}` : ''

// Letter sizes sort in this order, numbers sort by value, and they come after the numbers
const LETTERS = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
export const sizeOrder = (size: string) => {
  const n = parseFloat(size)
  if (!Number.isNaN(n)) return n
  const i = LETTERS.indexOf(size.toUpperCase())
  return 1000 + (i < 0 ? 99 : i)
}
