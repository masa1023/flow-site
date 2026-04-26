'use client'

import { useFormContext } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { PROGRAMMING_LEVEL_OPTIONS, PC_OS_OPTIONS } from '@/lib/intake/options'
import type { IntakeFormValues } from '@/lib/intake/types'

export function Section5Skills() {
  const form = useFormContext<IntakeFormValues>()
  const pcOs = form.watch('pc_os')

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
    </Form>
  )
}
