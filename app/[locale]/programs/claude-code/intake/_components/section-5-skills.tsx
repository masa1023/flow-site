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
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  PROGRAMMING_LEVEL_OPTIONS,
  DAILY_TOOLS_OPTIONS,
  PC_OS_OPTIONS,
  PC_ADMIN_OPTIONS,
  EXISTING_ACCOUNTS_OPTIONS,
} from '@/lib/intake/options'
import type { IntakeFormValues } from '@/lib/intake/types'

export function Section5Skills() {
  const form = useFormContext<IntakeFormValues>()
  const dailyTools = form.watch('daily_tools') ?? []
  const pcOs = form.watch('pc_os')
  const existingAccounts = form.watch('existing_accounts') ?? []

  const toggleArrayValue = (
    current: string[],
    value: string,
    checked: boolean
  ) => {
    if (checked) return Array.from(new Set([...current, value]))
    return current.filter((v) => v !== value)
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="programming_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>プログラミング経験</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="space-y-2"
              >
                {PROGRAMMING_LEVEL_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`pl-${opt.value}`}
                    className="flex items-start gap-3 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem
                      value={opt.value}
                      id={`pl-${opt.value}`}
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
        name="daily_tools"
        render={({ field }) => (
          <FormItem>
            <FormLabel>普段お使いのツール</FormLabel>
            <FormDescription>
              該当するものをすべて選択してください
            </FormDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DAILY_TOOLS_OPTIONS.map((opt) => {
                const checked = (field.value ?? []).includes(opt.value)
                return (
                  <Label
                    key={opt.value}
                    htmlFor={`dt-${opt.value}`}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[[aria-checked='true']]:border-primary has-[[aria-checked='true']]:bg-primary/5"
                  >
                    <Checkbox
                      id={`dt-${opt.value}`}
                      checked={checked}
                      onCheckedChange={(c) =>
                        field.onChange(
                          toggleArrayValue(field.value ?? [], opt.value, !!c)
                        )
                      }
                    />
                    <span className="text-sm">{opt.label}</span>
                  </Label>
                )
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {dailyTools.includes('other') && (
        <FormField
          control={form.control}
          name="daily_tools_other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他のツール</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="pc_os"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PC: OS</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
              >
                {PC_OS_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`os-${opt.value}`}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem value={opt.value} id={`os-${opt.value}`} />
                    <span className="text-sm">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {pcOs === 'other' && (
        <FormField
          control={form.control}
          name="pc_os_other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他のOS</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="pc_admin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>管理者権限</FormLabel>
            <FormDescription>
              ツールを自由にインストールできるかどうか
            </FormDescription>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="space-y-2"
              >
                {PC_ADMIN_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`pa-${opt.value}`}
                    className="flex items-center gap-3 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem value={opt.value} id={`pa-${opt.value}`} />
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
        name="pc_spec"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PCスペック</FormLabel>
            <FormDescription>
              機種名・メモリ容量・ストレージ空き容量がわかれば書いてください。不明な方のために、確認方法はセッション開始前にご案内します。
            </FormDescription>
            <FormControl>
              <Input
                {...field}
                placeholder="MacBook Pro M2(2023)、メモリ16GB、空き容量約120GB"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="existing_accounts"
        render={({ field }) => (
          <FormItem>
            <FormLabel>既存アカウント</FormLabel>
            <FormDescription>
              現在お持ちのアカウントをすべて選択してください
            </FormDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXISTING_ACCOUNTS_OPTIONS.map((opt) => {
                const checked = (field.value ?? []).includes(opt.value)
                return (
                  <Label
                    key={opt.value}
                    htmlFor={`ea-${opt.value}`}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-accent has-[[aria-checked='true']]:border-primary has-[[aria-checked='true']]:bg-primary/5"
                  >
                    <Checkbox
                      id={`ea-${opt.value}`}
                      checked={checked}
                      onCheckedChange={(c) =>
                        field.onChange(
                          toggleArrayValue(field.value ?? [], opt.value, !!c)
                        )
                      }
                    />
                    <span className="text-sm">{opt.label}</span>
                  </Label>
                )
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {existingAccounts.includes('other') && (
        <FormField
          control={form.control}
          name="existing_accounts_other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他のアカウント</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </Form>
  )
}
