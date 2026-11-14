import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'

const TITLE = 'Vintage Sneakers & Shoes for Sale | ABC is for XYZ'
const DESCRIPTION =
  'Shop curated vintage and modern sneakers and shoes. Every pair is cleaned, graded and honestly described. One of one, ships within 24 hrs from Minnesota.'

export const Route = createFileRoute('/shoes')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://abcisforxyz.netlify.app/shoes' }],
  }),
  component: () => (
    <CategoryPage
      kind="Sneakers"
      path="/shoes"
      heading="Vintage + modern shoes"
      intro="Curated sneakers and shoes, cleaned, graded and honest about every crease. Each pair is one of one, so when it's gone, it's gone. Ships within 24 hours from Minnesota."
    />
  ),
})
