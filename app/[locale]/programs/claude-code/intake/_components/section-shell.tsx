'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'

type Props = {
  index: number
  total: number
  title: string
  intro: React.ReactNode
  isFirst: boolean
  isLast: boolean
  isSubmitting?: boolean
  onBack: () => void
  onNext: () => void
  children: React.ReactNode
}

export function SectionShell({
  index,
  total,
  title,
  intro,
  isFirst,
  isLast,
  isSubmitting,
  onBack,
  onNext,
  children,
}: Props) {
  return (
    <motion.section
      key={index}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <header className="mb-6">
        <p className="text-xs font-medium text-primary mb-1">
          Section {index + 1} / {total}
        </p>
        <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{intro}</p>
      </header>

      <div className="space-y-6">{children}</div>

      <footer className="mt-8 pt-6 border-t flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isFirst || isSubmitting}
          className="min-h-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="min-h-12"
        >
          {isLast ? (
            <>
              {isSubmitting ? '送信中...' : '送信する'}
              {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
            </>
          ) : (
            <>
              次へ
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </footer>
    </motion.section>
  )
}
