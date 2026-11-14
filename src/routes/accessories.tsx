import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'

const TITLE = 'Vintage Accessories & Collectibles | ABC is for XYZ'
const DESCRIPTION =
  'Shop curated vintage and modern accessories and collectibles. Every piece is cleaned, graded and honestly described. One of one, ships within 24 hrs from Minnesota.'

export const Route = createFileRoute('/accessories')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://abcisforxyz.netlify.app/accessories' }],
  }),
  component: () => (
    <CategoryPage
      kind="Accessories"
      path="/accessories"
      heading="Accessories + collectibles"
      intro="Curated accessories and collectibles, cleaned, graded and honest about every flaw. Each piece is one of one, so when it's gone, it's gone. Ships within 24 hours from Minnesota."
    />
  ),
})
