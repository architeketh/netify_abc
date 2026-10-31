import { CONDITIONS, type Condition } from '@/data/products.ts'

// 5 steps: Brand New fills all five, Used - Fair fills one.
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
      <div className="flex gap-0.5">
        {CONDITIONS.map((c, i) => (
          <span
            key={c}
            className={`h-2 flex-1 border border-ink ${i < level ? 'bg-ink' : 'bg-transparent'}`}
          />
        ))}
      </div>
      {showLabel && (
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/60">{condition}</p>
      )}
    </div>
  )
}
