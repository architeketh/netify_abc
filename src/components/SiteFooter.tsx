import { useEffect, useState } from 'react'

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
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-8 text-sm text-muted sm:px-8">
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="" width={30} height={30} className="size-[30px] rounded-full" />
          <p>
            © {new Date().getFullYear()} ABC is for XYZ — A–Z curated vintage + modern finds.
            {visitors !== null && (
              <span className="ml-2 whitespace-nowrap text-muted/70">
                · {visitors.toLocaleString('en-US')} visits
              </span>
            )}
          </p>
        </div>
        <a
          href={DEPOP_SHOP_URL}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-ink hover:text-signal"
        >
          depop.com/abc_isfor_xyz ↗
        </a>
      </div>
    </footer>
  )
}
