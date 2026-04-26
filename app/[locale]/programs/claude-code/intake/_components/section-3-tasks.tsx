'use client'

import { useFormContext } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import type { IntakeFormValues } from '@/lib/intake/types'

const PLACEHOLDERS = [
  '見積書作成(月20件・1件あたり20-30分)',
  '問い合わせ返信メール(毎日・合計1時間)',
  '週次レポート作成(毎週金曜・2時間)',
]

export function Section3Tasks() {
  const form = useFormContext<IntakeFormValues>()

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="busy_tasks"
        render={() => (
          <FormItem>
            <FormLabel>
              時間がかかっている / 繰り返し発生している業務を3つ
            </FormLabel>
            <FormDescription>ボリューム・頻度も添えてください</FormDescription>
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <FormField
                  key={i}
                  control={form.control}
                  name={`busy_tasks.${i}` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={2}
                          placeholder={`${i + 1}. ${PLACEHOLDERS[i]}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ai_experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>AI / 自動化を試した経験とその結果</FormLabel>
            <FormDescription>
              ChatGPT, Claude, スプレッドシートマクロ, Zapier,
              社内自作ツール等、何でも
            </FormDescription>
            <FormControl>
              <Textarea
                {...field}
                rows={4}
                placeholder="ChatGPTで議事録要約を試した。精度は悪くないが、毎回プロンプトをコピペするのが面倒で続かなかった。"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
