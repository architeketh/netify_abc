// The shop's catalog. Purchases happen on Depop, so every listing points there.
// To add a pair: copy an entry, give it a unique `id`, drop a photo in
// public/img/, and paste the item's Depop listing URL into `depopUrl`.

export const DEPOP_SHOP_URL = 'https://www.depop.com/architek/'

// Set each listing's verified brand; use Other for unverified or unlisted brands.
export const BRANDS = ['adidas', 'Nike', 'Converse', 'New Balance', 'Reebok', 'Other'] as const
export type Brand = (typeof BRANDS)[number]
export type Category = 'Basketball' | 'Running' | 'Skate' | 'Court' | 'Trail'

export interface Product {
  id: string
  name: string
  colorway: string
  brand: Brand
  year: string
  category: Category
  size: string // US men's
  condition: string
  conditionScore: number // out of 10
  price: number // USD
  image: string
  description: string
  details: Array<string>
  depopUrl: string
  sold?: boolean
  tag?: string
}

const products: Array<Product> = [
  {
    id: 'court-king-hi',
    name: 'Court King Hi',
    colorway: 'White / Royal',
    brand: 'Other',
    year: '1986',
    category: 'Basketball',
    size: '10',
    condition: 'Light wear, yellowed midsole',
    conditionScore: 8,
    price: 245,
    image: '/img/s1.png',
    description:
      'Full-grain leather high-top straight out of the mid-80s hardwood era. The midsole has taken on that honey patina collectors chase, and the leather is still soft with crisp perforations.',
    details: ['Original laces', 'No box', 'Ankle strap intact', 'Sole grip 80%'],
    depopUrl: DEPOP_SHOP_URL,
    tag: 'Grail',
  },
  {
    id: 'volt-runner-97',
    name: 'Volt Runner',
    colorway: 'Graphite / Neon',
    brand: 'Other',
    year: '1997',
    category: 'Running',
    size: '9.5',
    condition: 'Worn, cleaned & restored',
    conditionScore: 7,
    price: 180,
    image: '/img/s2.png',
    description:
      'Layered suede and mesh with that unmistakable late-90s neon pop. Deep cleaned, re-laced, and ready for rotation — not a shelf piece, a wear piece.',
    details: ['Visible air unit holds pressure', 'Re-laced', 'Light toe-box crease'],
    depopUrl: DEPOP_SHOP_URL,
    tag: 'Hot',
  },
  {
    id: 'burnt-sienna-skate',
    name: 'Sienna Skate Low',
    colorway: 'Burnt Orange / Gum',
    brand: 'Other',
    year: '1994',
    category: 'Skate',
    size: '9',
    condition: 'Broken in, honest wear',
    conditionScore: 6,
    price: 95,
    image: '/img/s3.png',
    description:
      'Chunky-tongue skate low from the golden era of curb sessions. Suede has lived a life, the gum sole is still grippy. Patina for days.',
    details: ['Gum outsole', 'Padded tongue', 'Minor ollie wear on left toe'],
    depopUrl: DEPOP_SHOP_URL,
  },
  {
    id: 'ridge-trail-88',
    name: 'Ridge Trail',
    colorway: 'Olive / Plum / Bark',
    brand: 'Other',
    year: '1988',
    category: 'Trail',
    size: '11',
    condition: 'Very good',
    conditionScore: 8,
    price: 160,
    image: '/img/s4.png',
    description:
      'Before gorpcore had a name, there was this. Late-80s trail runner in an earthy colorway with a lugged outsole that still bites.',
    details: ['Lugged rubber outsole', 'Suede overlays', 'No sole separation'],
    depopUrl: DEPOP_SHOP_URL,
    tag: 'Rare',
  },
  {
    id: 'bred-hi-85',
    name: 'Hardwood Hi',
    colorway: 'Black / Varsity Red',
    brand: 'Other',
    year: '1985',
    category: 'Basketball',
    size: '10.5',
    condition: 'Well worn, wearable',
    conditionScore: 5,
    price: 320,
    image: '/img/s5.png',
    description:
      'The colorway that started arguments in school hallways. Scuffed, creased and full of story — priced for someone who wants to actually lace up a piece of history.',
    details: ['Original insoles', 'Heel drag on right', 'Leather conditioned'],
    depopUrl: DEPOP_SHOP_URL,
    tag: 'Grail',
  },
  {
    id: 'sky-racer-79',
    name: 'Sky Racer',
    colorway: 'Sky Blue / White',
    brand: 'Other',
    year: '1979',
    category: 'Running',
    size: '8.5',
    condition: 'Good, light fading',
    conditionScore: 7,
    price: 140,
    image: '/img/s6.png',
    description:
      'Featherweight nylon racer with a waffle outsole — pure late-70s track energy. Slim silhouette that sits perfectly under a straight-leg denim.',
    details: ['Waffle outsole', 'Nylon upper', 'Slight sun fade on heel'],
    depopUrl: DEPOP_SHOP_URL,
  },
  {
    id: 'clay-court-classic',
    name: 'Clay Court Classic',
    colorway: 'Chalk / Forest',
    brand: 'Other',
    year: '1983',
    category: 'Court',
    size: '9',
    condition: 'Good, vintage creasing',
    conditionScore: 7,
    price: 85,
    image: '/img/s7.png',
    description:
      'Clean canvas tennis low with a forest-green heel tab. The kind of everyday pair that makes any fit look considered.',
    details: ['Canvas upper', 'Vulcanised sole', 'Freshly washed'],
    depopUrl: DEPOP_SHOP_URL,
  },
  {
    id: 'pastel-dad-99',
    name: 'Sorbet Dad',
    colorway: 'Lilac / Mint / Cream',
    brand: 'Other',
    year: '1999',
    category: 'Running',
    size: '7.5',
    condition: 'Excellent, near deadstock',
    conditionScore: 9,
    price: 210,
    image: '/img/s8.png',
    description:
      'Turn-of-the-millennium chunky runner in the softest pastel blocking. Barely worn — the kind of find that never sits on the rack for long.',
    details: ['Near deadstock', 'Original tags', 'Chunky layered midsole'],
    depopUrl: DEPOP_SHOP_URL,
    tag: 'Just In',
  },
]

export default products
