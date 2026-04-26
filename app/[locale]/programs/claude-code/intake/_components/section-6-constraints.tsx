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
import {
  WEEKLY_HOURS_OPTIONS,
  MONTHLY_BUDGET_OPTIONS,
} from '@/lib/intake/options'
import type { IntakeFormValues } from '@/lib/intake/types'

export function Section6Constraints() {
  const form = useFormContext<IntakeFormValues>()

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="weekly_hours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>週あたりの学習時間</FormLabel>
            <FormDescription>セッション1.5h以外</FormDescription>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
              >
                {WEEKLY_HOURS_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`wh-${opt.value}`}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem value={opt.value} id={`wh-${opt.value}`} />
                    <span className="text-sm">{opt.label}</span>
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
        name="monthly_budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ツール / API にかけられる月額予算</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2"
              >
                {MONTHLY_BUDGET_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`mb-${opt.value}`}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem value={opt.value} id={`mb-${opt.value}`} />
                    <span className="text-sm">{opt.label}</span>
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
        name="concerns"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              最も不安なこと、事前に共有しておきたい制約{' '}
              <span className="text-muted-foreground font-normal">(任意)</span>
            </FormLabel>
            <FormDescription>
              継続できるか、時間が確保できるか、扱えないデータ、社内IT統制の制約、出張予定...など何でも
            </FormDescription>
            <FormControl>
              <Textarea
                {...field}
                rows={5}
                placeholder="顧客情報を含むデータは社外のAIサービスに送れないため、ローカルで動かす仕組みが必要になるかもしれない。期間中の6月に出張が続くので、その時期の時間確保が不安。"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
