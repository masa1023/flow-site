'use client'

import { Progress } from '@/components/ui/progress'

export function IntakeProgressBar({
  current,
  total,
}: {
  current: number
  total: number
}) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>
          セクション {current + 1} / {total}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <Progress value={pct} className="h-2" />
    </div>
  )
}
