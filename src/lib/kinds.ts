import type { Product } from '@/data/products.ts'

// Shared "what kind of item is this" logic, used by the category pages.
// (Same rules as the homepage closet filter.)
export type Kind = 'Sneakers' | 'Boots' | 'Bags' | 'Clothing' | 'Accessories'

const LETTER_SIZE = /^(xxs|xs|s|m|l|xl|xxl|xxxl|one size|os|small|medium|large)$/i
const SHOE_WORDS =
  /shoe|sneaker|boot|loafer|sandal|heel|pump|oxford|slide|clog|trainer|cleat|slipper|mule|dunk|jordan|air max|air force|gazelle|samba|chuck taylor|yeezy/
const BAG_WORDS =
  /(?<!dust )(?<!shoe )(?<!shoes )\b(?:bag|purse|handbag|tote|crossbody|cross body|clutch|satchel|backpack|wallet|pouch|duffle|duffel|hobo|baguette|wristlet|messenger|luggage|suitcase|fanny pack|belt bag)\b/
const ACCESSORY_WORDS =
  /\b(?:jewel(?:ry|lery)|necklaces?|bracelets?|earrings?|pendants?|brooch(?:es)?|anklets?|charms?|rings?|watch(?:es)?|hats?|caps?(?! toe)|beanies?|visors?|scarf|scarves|bandanas?|gloves?|mittens?|belts?|sunglasses|glasses|keychains?|key chains?|lanyards?|statues?|figurines?|figures?|sculptures?|collectibles?|collectables?|ornaments?|decor|vases?|mugs?|candles?|posters?|paintings?|plush|toys?|dolls?|snow globes?|trinkets?|magnets?|stickers?|patch(?:es)?|pins?)\b/
const CLOTHING_WORDS =
  /\b(?:shirt|t-shirt|tee|hoodie|sweatshirt|crewneck|jacket|coat|parka|puffer|bomber|anorak|windbreaker|fleece|pullover|quarter zip|henley|flannel|jeans|pants|trousers|slacks|chinos|cargo|joggers|sweatpants|leggings|tights|shorts|skirt|skort|dress|romper|jumpsuit|overalls|bodysuit|blouse|sweater|cardigan|vest|jersey|tracksuit|sweatsuit|blazer|beanie|scarf|gloves|bra|swimsuit|bikini|pajamas|robe|tank top|crop top)\b/

export const kindOf = (p: Product): Kind => {
  const category: string = p.category
  const brand: string = p.brand
  if (brand === 'Coach' || brand === 'Vera Bradley') return 'Bags'
  if (category === 'Boots') return 'Boots'
  if (category === 'Bags') return 'Bags'
  if (category === 'Clothing') return 'Clothing'
  if (category === 'Accessories') return 'Accessories'
  const name = p.name.toLowerCase()
  const notShoe = !SHOE_WORDS.test(name)
  if (notShoe && BAG_WORDS.test(name)) return 'Bags'
  if (notShoe && ACCESSORY_WORDS.test(name)) return 'Accessories'
  if (LETTER_SIZE.test(p.size.trim())) return 'Clothing'
  if (notShoe && CLOTHING_WORDS.test(name)) return 'Clothing'
  return 'Sneakers'
}
