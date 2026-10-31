export function ConditionMeter({
  score,
  className = '',
}: {
  score: number
  className?: string
}) {
  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`Condition ${score} out of 10`}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className={`h-2 flex-1 border border-ink ${i < score ? 'bg-ink' : 'bg-transparent'}`}
        />
      ))}
    </div>
  )
}
