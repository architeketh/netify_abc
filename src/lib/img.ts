// Serve local images through the Netlify Image CDN so pages never ship the
// full-resolution originals.
export function cdn(src: string, width: number, quality = 75) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality}&fm=webp`
}

export function srcSet(src: string, widths: Array<number>) {
  return widths.map((w) => `${cdn(src, w)} ${w}w`).join(', ')
}
