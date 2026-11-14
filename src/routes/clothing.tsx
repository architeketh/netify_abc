import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'

const TITLE = 'Vintage Clothing for Sale | ABC is for XYZ'
const DESCRIPTION =
  'Shop curated vintage and modern clothing. Every piece is cleaned, graded and honestly described. One of one, ships within 24 hrs from Minnesota.'

export const Route = createFileRoute('/clothing')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: 'https://abcisforxyz.netlify.app/clothing' }],
  }),
  component: () => (
    <CategoryPage
      kind="Clothing"
      path="/clothing"
      heading="Vintage + modern clothing"
      intro="Curated clothing, cleaned, graded and honest about every flaw. Each piece is one of one, so when it's gone, it's gone. Ships within 24 hours from Minnesota."
    />
  ),
})
