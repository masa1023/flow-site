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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { IntakeFormValues } from '@/lib/intake/types'

export function Section1Basic() {
  const form = useFormContext<IntakeFormValues>()

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>お名前</FormLabel>
            <FormControl>
              <Input {...field} autoComplete="name" placeholder="山田 太郎" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>会社名・屋号</FormLabel>
            <FormDescription>
              個人事業主の方は屋号、なければ「個人」でOK
            </FormDescription>
            <FormControl>
              <Input {...field} autoComplete="organization" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="role_business"
        render={({ field }) => (
          <FormItem>
            <FormLabel>役職・事業内容</FormLabel>
            <FormDescription>1〜2行で</FormDescription>
            <FormControl>
              <Textarea
                {...field}
                rows={2}
                placeholder="代表取締役。中小企業向けバックオフィス代行サービスを運営。社員8名。"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
