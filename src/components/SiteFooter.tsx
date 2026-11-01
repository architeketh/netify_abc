import { ArrowUpRight } from 'lucide-react'

const DEPOP_SHOP_URL = 'https://www.depop.com/abc_isfor_xyz/'

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <a
          href={DEPOP_SHOP_URL}
          target="_blank"
          rel="noreferrer"
          className="group block"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
            Every find lives on Depop →
          </p>
          <p className="font-display mt-3 text-[7vw] transition group-hover:text-signal sm:text-7xl lg:text-8xl">
            @abc_isfor_xyz
          </p>
        </a>
        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-paper/20 pt-6 font-mono text-xs uppercase tracking-widest text-paper/60 sm:flex-row">
          <p>© {new Date().getFullYear()} ABC is for XYZ — A–Z curated vintage + modern finds.</p>
          <a
            href={DEPOP_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-signal"
          >
            depop.com/abc_isfor_xyz <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}
