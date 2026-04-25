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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { STANCE_OPTIONS } from '@/lib/intake/options'
import type { IntakeFormValues } from '@/lib/intake/types'

export function Section2Goal() {
  const form = useFormContext<IntakeFormValues>()

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="goal_3months"
        render={({ field }) => (
          <FormItem>
            <FormLabel>3ヶ月後、どうなっていたいですか?</FormLabel>
            <FormDescription>
              200字目安。「こういう業務が回っている」「こんなものを作り終えている」「社内でこういう立ち位置になっている」など、ありありとイメージが湧くように書いてください。
            </FormDescription>
            <FormControl>
              <Textarea
                {...field}
                rows={6}
                placeholder="見積書作成と問い合わせ返信が半自動化されていて、自分の手を離れている。加えて、顧客向け問い合わせダッシュボードのβ版が動いていて、チームで使い始めている状態。"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>講座へのスタンス</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="space-y-2"
              >
                {STANCE_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`stance-${opt.value}`}
                    className="flex items-start gap-3 border rounded-md px-3 py-3 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem
                      value={opt.value}
                      id={`stance-${opt.value}`}
                      className="mt-0.5"
                    />
                    <span className="text-sm leading-relaxed">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="motivation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>受講のきっかけ</FormLabel>
            <FormDescription>
              何を見て、誰から聞いて、なぜ「今」申し込もうと思ったかを教えてください
            </FormDescription>
            <FormControl>
              <Textarea
                {...field}
                rows={3}
                placeholder="◯◯さんからの紹介で知り、直近でAI活用の必要性を強く感じていたタイミングと重なった。"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
