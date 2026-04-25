import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '送信完了 — Claude Code コンサル 事前ヒアリング',
  robots: { index: false, follow: false },
}

export default function IntakeDonePage() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-card border rounded-2xl p-8 md:p-12 text-center">
          <div className="inline-flex w-16 h-16 rounded-full items-center justify-center bg-primary/10 text-primary mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            ご回答ありがとうございました。
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            内容を確認のうえ、初回セッションに向けた叩き台のカリキュラム案と
            <br className="hidden sm:inline" />
            事前準備事項を Email でお送りします（2営業日以内）。
          </p>
          <Button asChild>
            <Link href="/">トップに戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
