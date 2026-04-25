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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { PREFERRED_CONTACT_OPTIONS } from '@/lib/intake/options'
import type { IntakeFormValues } from '@/lib/intake/types'

export function Section1Basic() {
  const form = useFormContext<IntakeFormValues>()
  const preferredContact = form.watch('preferred_contact')

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

      <FormField
        control={form.control}
        name="preferred_contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>希望連絡手段</FormLabel>
            <FormDescription>
              セッション外でのチャットサポートに使います
            </FormDescription>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {PREFERRED_CONTACT_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`pc-${opt.value}`}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem value={opt.value} id={`pc-${opt.value}`} />
                    <span className="text-sm">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {preferredContact === 'other' && (
        <FormField
          control={form.control}
          name="preferred_contact_other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他の連絡手段</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Discord, WhatsApp など" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </Form>
  )
}
