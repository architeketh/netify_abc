// The shop's catalog. Purchases happen on Depop, so every listing points there.
// To add a pair: copy an entry, give it a unique `id`, drop a photo in
// public/img/, and paste the item's Depop listing URL into `depopUrl`.

export const DEPOP_SHOP_URL = 'https://www.depop.com/architek/'

// Set each listing's verified brand; use Other for unverified or unlisted brands.
export const BRANDS = ['adidas', 'Nike', 'Converse', 'New Balance', 'Reebok', 'Puma', 'Other'] as const
export type Brand = (typeof BRANDS)[number]
export type Category = 'Basketball' | 'Running' | 'Skate' | 'Court' | 'Trail'

// Condition labels match Depop's. Pick one for each listing.
export const CONDITIONS = ['Brand New', 'Like New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] as const
export type Condition = (typeof CONDITIONS)[number]

export interface Product {
  id: string
  name: string
  colorway: string
  brand: Brand
  year: string
  category: Category
  size: string // US men's
  condition: Condition
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
    id: 'adidas-daily-40-casual-sport-f3d0',
    name: 'Adidas Daily 4.0 Casual sport shoes designed for everyday',
    colorway: '',
    brand: 'adidas',
    year: '1990',
    category: 'Running',
    size: '7',
    condition: 'Brand New',
    price: 26.25,
    image: 'https://media-photos.depop.com/b1/463666447/5060359201_869a95a8588349bb9016807819b471b4/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/arohitek-adidas-daily-40-casual-sport-f3d0/',
    tag: 'Just In',
  },
  {
    id: 'nike-waffle-debut-stadium-green-ed6b',
    name: 'Nike Waffle Debut Stadium Green D931-300 Mens 7.5',
    colorway: '',
    brand: 'Nike',
    year: '1990',
    category: 'Running',
    size: '7.5',
    condition: 'Brand New',
    price: 24.43,
    image: 'https://media-photos.depop.com/b1/463666447/5078522007_f543537d2a3b431d91f9313ee2cad62a/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/arvhitek-nike-waffle-debut-stadium-green-ed6b/',
  },
  {
    id: 'nike-dunk-low-womens-size-cbea',
    name: 'Nike Dunk Low | Women\'s 9',
    colorway: '',
    brand: 'Nike',
    year: '1990',
    category: 'Basketball',
    size: '9',
    condition: 'Brand New',
    price: 69.9,
    image: 'https://media-photos.depop.com/b1/463666447/5060366052_917439ce90d142f381441e96c721f09e/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/archktek-nike-dunk-low-womens-size-cbea/',
    tag: 'Grail',
  },
  {
    id: 'lightweight-athletic-shoes-with-breathable-0d19',
    name: 'Nike Preowned. No box. Lightweight athletic shoes with',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '6.5',
    condition: 'Used - Excellent',
    price: 22.05,
    image: 'https://media-photos.depop.com/b1/463666447/5060341914_b35266006e92408b85f92ae651f762df/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/architjk-lightweight-athletic-shoes-with-breathable-0d19/',
  },
  {
    id: 'puma-suede-xl-in-putty-60a3',
    name: 'Puma Suede XL Putty | Women\'s 8',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '8',
    condition: 'Used - Excellent',
    price: 31.19,
    image: 'https://media-photos.depop.com/b1/463666447/5060419325_767aff57754a430dab6c897a71bc0b5b/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/architei-puma-suede-xl-in-putty-60a3/',
    tag: 'Just In',
  },
  {
    id: 'converse-one-star-ox-ash-f595',
    name: 'Converse One Star Ox Ash Grey Preowned. No box. Mens Size 13',
    colorway: '',
    brand: 'Converse',
    year: '1990',
    category: 'Running',
    size: '13',
    condition: 'Used - Good',
    price: 22.05,
    image: 'https://media-photos.depop.com/b1/463666447/5060345156_52f56a400d2a47c3987a6a7e3c9012bc/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/arczitek-converse-one-star-ox-ash-f595/',
  },
  {
    id: 'converse-bosey-mc-high-top-f882',
    name: 'Converse Bosey MC High Top Olive | Men\'s 7.5',
    colorway: '',
    brand: 'Converse',
    year: '1990',
    category: 'Basketball',
    size: '7.5',
    condition: 'Used - Excellent',
    price: 27.93,
    image: 'https://media-photos.depop.com/b1/463666447/5060372757_c6ea8b37f07340fd82499cc3beb67752/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/auchitek-converse-bosey-mc-high-top-f882/',
  },
  {
    id: 'adidas-superstar-ii-snake-print-03a8',
    name: 'Adidas Superstar II Brown snake print with beige stripes |',
    colorway: '',
    brand: 'adidas',
    year: '1990',
    category: 'Running',
    size: '7',
    condition: 'Brand New',
    price: 49.4,
    image: 'https://media-photos.depop.com/b1/463666447/5060371204_2c875714fba343e29b82506f8fb3c8ba/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/architet-adidas-superstar-ii-snake-print-03a8/',
  },
  {
    id: 'adidas-gazelle-indoor-w-ih6801-4b44',
    name: 'Adidas Gazelle Indoor | Women\'s 7',
    colorway: '',
    brand: 'adidas',
    year: '1990',
    category: 'Court',
    size: '7',
    condition: 'Used - Excellent',
    price: 35.69,
    image: 'https://media-photos.depop.com/b1/463666447/5025175981_0cd8d3d4af2d40a7903f4e8c222ad52d/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/arch3tek-adidas-gazelle-indoor-w-ih6801-4b44/',
    tag: 'Just In',
  },
  {
    id: 'capelli-new-york-rbt-4519-black-c7cc',
    name: 'Capelli New York RBT-4519 Black Matte Chelsea Rain Boots',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '8',
    condition: 'Used - Excellent',
    price: 13.99,
    image: 'https://media-photos.depop.com/b1/463666447/5060411516_34a1eb2b029c40cfb217099a0277b28a/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/architvk-capelli-new-york-rbt-4519-black-c7cc/',
  },
  {
    id: 'hunter-org-kids-first-gl-8d73',
    name: 'Hunter Org Kids First GL Box Boot Size 9',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '9-9.5',
    condition: 'Used - Excellent',
    price: 22.39,
    image: 'https://media-photos.depop.com/b1/463666447/5072859575_dc267667cc744c81a4706f274da67072/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/architfk-hunter-org-kids-first-gl-8d73/',
  },
  {
    id: 'regarde-le-ciel-cristion-01-89f9',
    name: 'Regarde le Ciel Cristion 01 Black | Women\'s 8.5',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '8.5',
    condition: 'Used - Excellent',
    price: 49.5,
    image: 'https://media-photos.depop.com/b1/463666447/5060415115_d53d17bf87844f72887f5bbb2b5d27f3/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/archisek-regarde-le-ciel-cristion-01-89f9/',
  },
  {
    id: 'cougar-cardiff-boots-n-q-black-88f9',
    name: 'Storm by Cougar • Cardiff N-Q •',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '9',
    condition: 'Brand New',
    price: 27.29,
    image: 'https://media-photos.depop.com/b1/463666447/5060398383_aee66213764746048734b0a971ce74d8/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/archgtek-cougar-cardiff-boots-n-q-black-88f9/',
  },
  {
    id: 'easy-spirit-adagio-size-85-b0a6',
    name: 'Easy Spirit Adagio Size 8.5',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '8.5',
    condition: 'Used - Excellent',
    price: 20.99,
    image: 'https://media-photos.depop.com/b1/463666447/5060424313_3ec3928697ae4191baf99eedcc957f50/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/anchitek-easy-spirit-adagio-size-85-b0a6/',
  },
  {
    id: 'cushionaire-hippy-cozy-platform-b303',
    name: 'Cushionaire Hippy Cozy Platform | Women\'s Size 11',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '11',
    condition: 'Used - Excellent',
    price: 34.23,
    image: 'https://media-photos.depop.com/b1/463666447/5060361374_d1abb9f4d1a64670ae667d0afb3bef4b/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/archited-cushionaire-hippy-cozy-platform-b303/',
  },
  {
    id: 'timberland-pro-a91160-sawhorse-work-6d22',
    name: 'Timberland Pro A91160 • Sawhorse Work Boot • Size 7.5',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '7.5',
    condition: 'Used - Excellent',
    price: 34.23,
    image: 'https://media-photos.depop.com/b1/463666447/5060406438_fb85294fc2664834b3be15498edbc313/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/arczitek-timberland-pro-a91160-sawhorse-work-6d22/',
  },
  {
    id: 'ugg-kids-canoe-waterproof-1105181k-49fd',
    name: 'UGG Kids Canoe Waterproof 1105181K Size 6Y',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '6-6.5',
    condition: 'Used - Excellent',
    price: 14.59,
    image: 'https://media-photos.depop.com/b1/463666447/5060382202_20f3a1e05b364646b4efc684cf3c01af/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/archipek-ugg-kids-canoe-waterproof-1105181k-49fd/',
  },
  {
    id: 'native-jefferson-slip-on-womens-7770',
    name: 'Native Jefferson Slip-On Like New Womens Size 8',
    colorway: '',
    brand: 'Other',
    year: '1990',
    category: 'Running',
    size: '8',
    condition: 'Like New',
    price: 14.24,
    image: 'https://media-photos.depop.com/b1/463666447/4896113554_dbcc195713a844b7b242a0983f5d18fc/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/archite9-native-jefferson-slip-on-womens-7770/',
  },
  {
    id: 'reebok-classic-leather-size-12y-6c76',
    name: 'Reebok Classic Leather Size 12Y',
    colorway: '',
    brand: 'Reebok',
    year: '1990',
    category: 'Running',
    size: '12-12.5',
    condition: 'Brand New',
    price: 14,
    image: 'https://media-photos.depop.com/b1/463666447/5060426461_01ff1297c5ef4daa9689eb38e6f4a392/P1.jpg',
    description:
      '',
    details: [],
    depopUrl: 'https://www.depop.com/products/arc5itek-reebok-classic-leather-size-12y-6c76/',
  },
]

export default products