import type * as z from 'zod'
import type { intakeSchema } from './schema'

export type IntakeFormValues = z.infer<typeof intakeSchema>

export type SectionIndex = 0 | 1 | 2 | 3 | 4 | 5
