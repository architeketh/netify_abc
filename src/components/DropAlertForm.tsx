import { useState, type FormEvent } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { BRANDS, type Brand } from '@/data/products.ts'

type State = 'idle' | 'pending' | 'success' | 'error'

const SIZES = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13']

export function DropAlertForm() {
  const [state, setState] = useState<State>('idle')
  const [brands, setBrands] = useState<Array<Brand>>([])

  function toggleBrand(brand: Brand) {
    setBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    if (state !== 'pending') setState('idle')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/drop-alerts-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const isUnprocessedRegistration = /\bdata-netlify\s*=/i.test(await response.text())
      if (isUnprocessedRegistration) throw new Error('Form handling is unavailable')
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl bg-volt p-8 text-ink" role="status">
        <Check className="size-10" />
        <p className="font-display mt-4 text-4xl">You're on the list.</p>
        <p className="mt-3 max-w-md">
          We'll give you a heads up when fresh pairs in your size land — before they hit the
          Depop feed.
        </p>
      </div>
    )
  }

  const input =
    'w-full h-12 rounded-xl border border-[#6f6a64] bg-[#1f1b18] px-4 text-[15px] font-medium text-white placeholder:text-white/40 focus:border-white focus:outline-none'

  return (
    <form
      name="drop-alerts"
      method="POST"
      action="/drop-alerts-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state !== 'pending') setState('idle')
      }}
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="drop-alerts" />
      <input type="hidden" name="eras" value={brands.join(', ')} />
      <p hidden>
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-[1fr_9rem]">
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#e6e0d8]">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@example.com"
              className={input}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-[#e6e0d8]">
              US size
            </span>
            <select name="size" defaultValue="" required className={`${input} appearance-none`}>
              <option value="" disabled className="text-ink">
                Pick
              </option>
              {SIZES.map((s) => (
                <option key={s} value={s} className="text-ink">
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <span className="mb-2 block text-[13px] font-bold text-[#e6e0d8]">
            Brands you're hunting
          </span>
          <div className="flex flex-wrap gap-2">
            {BRANDS.map((brand) => {
              const on = brands.includes(brand)
              return (
                <button
                  key={brand}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleBrand(brand)}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                    on ? 'border-white bg-white text-ink' : 'border-[#6f6a64] text-white hover:border-white'
                  }`}
                >
                  {brand}
                </button>
              )
            })}
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-[13px] font-bold text-[#e6e0d8]">
            Your grail (optional)
          </span>
          <textarea
            name="grail"
            rows={3}
            maxLength={1000}
            placeholder="That one pair you had in '96 and never stopped thinking about…"
            className={`${input} !h-auto py-3`}
          />
        </label>

        <button
          type="submit"
          className="flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-signal px-6 text-base font-bold text-white transition hover:bg-white hover:text-ink disabled:cursor-wait"
        >
          {state === 'pending' ? (
            <>
              <Loader2 className="size-5 animate-spin" /> Sending…
            </>
          ) : (
            'Get drop alerts'
          )}
        </button>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="rounded-xl border border-signal p-3 text-sm">
          That didn't go through — your details are still here, so give it another try in a
          moment.
        </p>
      )}
    </form>
  )
}
