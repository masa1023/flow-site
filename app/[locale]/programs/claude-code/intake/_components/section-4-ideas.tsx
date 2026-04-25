'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { IntakeFormValues } from '@/lib/intake/types'

const PLACEHOLDERS = [
  '問い合わせ管理ダッシュボード',
  '見積書自動作成ツール',
  '社内FAQチャットボット',
]

export function Section4Ideas() {
  const form = useFormContext<IntakeFormValues>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ideas' as never,
  })
  const ideas = form.watch('ideas')

  const radioOptions = ideas
    .map((v, i) => ({ value: v, index: i }))
    .filter((o) => o.value && o.value.trim().length >= 2)

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="ideas"
        render={() => (
          <FormItem>
            <FormLabel>作りたい / 自動化したいもの(ブレスト)</FormLabel>
            <FormDescription>
              思いつくものをすべて。現実味・難易度・実現可能性は一切考慮せず、「あったら嬉しい」だけで選んでOKです。3個以上、最大10個まで。
            </FormDescription>
            <div className="space-y-2">
              {fields.map((f, i) => (
                <FormField
                  key={f.id}
                  control={form.control}
                  name={`ideas.${i}` as const}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-muted-foreground pt-3 w-6 text-right tabular-nums">
                          {i + 1}.
                        </span>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={PLACEHOLDERS[i] ?? '例: 〇〇の自動化'}
                          />
                        </FormControl>
                        {fields.length > 3 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(i)}
                            aria-label={`${i + 1}番目を削除`}
                            className="shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {fields.length < 10 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append('')}
                className="mt-3"
              >
                <Plus className="w-4 h-4 mr-1" />
                追加
              </Button>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="top_idea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>この中で「最も作ってみたい1つ」は?</FormLabel>
            <FormControl>
              {radioOptions.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  まず上のリストに案を入力してください。
                </p>
              ) : (
                <RadioGroup
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  className="space-y-2"
                >
                  {radioOptions.map((opt) => (
                    <Label
                      key={`${opt.index}-${opt.value}`}
                      htmlFor={`top-${opt.index}`}
                      className="flex items-start gap-3 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem
                        value={opt.value}
                        id={`top-${opt.index}`}
                        className="mt-0.5"
                      />
                      <span className="text-sm leading-relaxed">
                        {opt.value}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="top_idea_reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>その1つを選んだ理由を一言</FormLabel>
            <FormControl>
              <Input {...field} placeholder="一番時間が削れそうだから" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="outcome_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              それが完成したら「誰」が「何」をできるようになりますか?
            </FormLabel>
            <FormDescription>
              使うユーザー像と、その人の行動が具体的に変わるポイントを書いてください
            </FormDescription>
            <FormControl>
              <Textarea
                {...field}
                rows={5}
                placeholder="営業担当(自分+パート1名)が、問い合わせメールが来た瞬間にステータス・優先度・回答テンプレが並んだダッシュボードを見て、返信まで3分で済む。メール振り分けに使っていた1日30分がゼロになる。"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
