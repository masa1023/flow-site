'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

import { intakeSchema, SECTION_FIELDS } from '@/lib/intake/schema'
import type { IntakeFormValues } from '@/lib/intake/types'
import {
  TOTAL_SECTIONS,
  SECTION_TITLES,
  SECTION_INTROS,
} from '@/lib/intake/options'
import { saveDraft, loadDraft, clearDraft } from '@/lib/intake/draft-storage'

import { IntakeProgressBar } from './progress-bar'
import { SectionShell } from './section-shell'
import { Section1Basic } from './section-1-basic'
import { Section2Goal } from './section-2-goal'
import { Section3Tasks } from './section-3-tasks'
import { Section4Ideas } from './section-4-ideas'
import { Section5Skills } from './section-5-skills'
import { Section6Constraints } from './section-6-constraints'

const DEFAULT_VALUES: Partial<IntakeFormValues> = {
  full_name: '',
  company: '',
  role_business: '',
  email: '',

  goal_3months: '',
  motivation: '',

  busy_tasks: ['', '', ''],
  ai_experience: '',

  ideas: ['', '', ''],
  top_idea: '',

  programming_level: undefined,
  pc_os: undefined,
  pc_os_other: '',

  weekly_hours: undefined,
  monthly_budget: undefined,
  concerns: '',
}

const SECTION_COMPONENTS = [
  Section1Basic,
  Section2Goal,
  Section3Tasks,
  Section4Ideas,
  Section5Skills,
  Section6Constraints,
]

export function IntakeForm() {
  const router = useRouter()
  const [section, setSection] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const restoredRef = useRef(false)

  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: DEFAULT_VALUES as IntakeFormValues,
    mode: 'onTouched',
  })

  const { handleSubmit, trigger, getValues, reset, setFocus } = methods

  // Restore draft on mount
  useEffect(() => {
    if (restoredRef.current) return
    restoredRef.current = true

    const draft = loadDraft()
    if (draft && Object.keys(draft).length > 0) {
      reset({ ...DEFAULT_VALUES, ...draft } as IntakeFormValues)
      toast.info('下書きから再開しました', {
        description: '前回の入力内容を復元しました。続きから入力できます。',
      })
    }
  }, [reset])

  const handleNext = async () => {
    const fields = SECTION_FIELDS[
      section
    ] as readonly (keyof IntakeFormValues)[]
    const ok = await trigger(fields as Parameters<typeof trigger>[0], {
      shouldFocus: true,
    })

    if (!ok) {
      toast.error('入力に不備があります', {
        description: 'エラー箇所をご確認ください。',
      })
      return
    }

    saveDraft(getValues())

    if (section < TOTAL_SECTIONS - 1) {
      setSection((s) => s + 1)
      // scroll to top of form area
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Last section: full submit
      handleSubmit(onSubmit, onInvalid)()
    }
  }

  const handleBack = () => {
    if (section > 0) {
      saveDraft(getValues())
      setSection((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (data: IntakeFormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      clearDraft()
      router.push('/programs/claude-code/intake/done')
    } catch (err) {
      console.error(err)
      toast.error('送信に失敗しました', {
        description: 'しばらく経ってから再度お試しください。',
      })
      setSubmitting(false)
    }
  }

  const onInvalid: Parameters<typeof handleSubmit>[1] = (errors) => {
    const firstField = Object.keys(errors)[0] as
      | keyof IntakeFormValues
      | undefined
    if (firstField) {
      try {
        setFocus(firstField)
      } catch {
        // ignore
      }
    }
    toast.error('入力に不備があります', {
      description: 'エラー箇所をご確認ください。',
    })
  }

  const SectionComponent = SECTION_COMPONENTS[section]
  const isLast = section === TOTAL_SECTIONS - 1
  const isFirst = section === 0

  return (
    <FormProvider {...methods}>
      <IntakeProgressBar current={section} total={TOTAL_SECTIONS} />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleNext()
        }}
        noValidate
      >
        <AnimatePresence mode="wait">
          <SectionShell
            key={section}
            index={section}
            total={TOTAL_SECTIONS}
            title={SECTION_TITLES[section]}
            intro={SECTION_INTROS[section]}
            isFirst={isFirst}
            isLast={isLast}
            isSubmitting={submitting}
            onBack={handleBack}
            onNext={handleNext}
          >
            <SectionComponent />
          </SectionShell>
        </AnimatePresence>
      </form>
    </FormProvider>
  )
}
