import type { Metadata } from 'next'
import { IntakeForm } from './_components/intake-form'

export const metadata: Metadata = {
  title: 'Claude Code コンサル — 事前ヒアリング',
  description:
    '受講者の現状とゴールに合わせて初回セッションを設計するための、事前ヒアリングフォームです。',
  robots: { index: false, follow: false },
}

export default function IntakePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <header className="mb-10 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Claude Code コンサルティング
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            事前ヒアリングフォーム
          </h1>
          <div className="text-left text-sm text-muted-foreground space-y-1 max-w-prose mx-auto bg-card border rounded-lg p-4">
            <p>
              ご回答ありがとうございます。このフォームは、初回セッションをあなたの現状とゴールに合わせて設計し、3ヶ月の学習効果を最大化するためのものです。
            </p>
            <ul className="list-disc list-inside pt-2 space-y-1">
              <li>所要時間: 約12〜15分</li>
              <li>途中保存: 可能(同じブラウザで再開できます)</li>
              <li>
                回答のコツ:
                一緒に整理していくので、思いつくままに書いてみてください。
              </li>
            </ul>
          </div>
        </header>

        <IntakeForm />
      </div>
    </div>
  )
}
