import { useSyncExternalStore } from 'react'

// The search box lives in the header, the results show on the home page,
// so the text they share is kept here.
let query = ''
const listeners = new Set<() => void>()

export const setSearchQuery = (next: string) => {
  query = next
  listeners.forEach((fn) => fn())
}

export const useSearchQuery = () =>
  useSyncExternalStore(
    (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    () => query,
    () => '',
  )
