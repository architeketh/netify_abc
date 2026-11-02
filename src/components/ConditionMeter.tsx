import { CONDITIONS, type Condition } from '@/data/products.ts'

// Five steps: Brand New fills all five, Used - Fair fills one.
export function ConditionMeter({
  condition,
  className = '',
  showLabel = true,
}: {
  condition: Condition
  className?: string
  showLabel?: boolean
}) {
  const level = CONDITIONS.length - Math.max(0, CONDITIONS.indexOf(condition))
  return (
    <div className={className} role="img" aria-label={`Condition: ${condition}`}>
      <div className="flex gap-1">
        {CONDITIONS.map((c, i) => (
          <span key={c} className={`h-1.5 flex-1 rounded-full ${i < level ? 'bg-ink' : 'bg-line'}`} />
        ))}
      </div>
      {showLabel && <p className="mt-1.5 text-xs text-muted">{condition}</p>}
    </div>
  )
}
