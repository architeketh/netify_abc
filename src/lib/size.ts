import type { Product } from '@/data/products.ts'

const SHORT = { Men: 'M', Women: 'W', Kids: 'Kids' } as const
const LONG = { Men: "Men's", Women: "Women's", Kids: "Kids'" } as const

// Short label for the card badge, like "W 9" or "Kids 12"
export const sizeShort = (p: Pick<Product, 'size' | 'sizeType'>) => `${SHORT[p.sizeType]} ${p.size}`

// Full label for the detail page, like "Women's 9"
export const sizeLong = (p: Pick<Product, 'size' | 'sizeType'>) => `${LONG[p.sizeType]} ${p.size}`
