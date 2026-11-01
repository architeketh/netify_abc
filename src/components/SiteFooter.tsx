import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const DEPOP_SHOP_URL = 'https://www.depop.com/abc_isfor_xyz/'

// Visitor counter: a free outside counting service (abacus.jasoncameron.dev) keeps the number.
// The number shown is START_AT + the service's count. A visit is counted once per browser per day.
const START_AT = 500
const COUNTER_URL = 'https://abacus.jasoncameron.dev'
const COUNTER_NAME = 'abcisforxyz.netlify.app/visits'

function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    let countedToday = false
    try {
      countedToday = window.localStorage.getItem('abc-visit-day') === today
    } catch {
      // storage can be blocked; then every load counts
    }
    fetch(`${COUNTER_URL}/${countedToday ? 'get' : 'hit'}/${COUNTER_NAME}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { value?: number }) => {
        if (typeof d.value === 'number') setCount(START_AT + d.value)
        try {
          window.localStorage.setItem('abc-visit-day', today)
        } catch {
          // ignore
        }
      })
      .catch(() => {
        // if the counter is down, just don't show it
      })
  }, [])
  return count
}

export function SiteFooter() {
  const visitors = useVisitorCount()
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
          <p>
            © {new Date().getFullYear()} ABC is for XYZ — A–Z curated vintage + modern finds.
            {visitors !== null && (
              <span className="ml-3 whitespace-nowrap text-paper/40">
                · {visitors.toLocaleString('en-US')} visits
              </span>
            )}
          </p>
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
