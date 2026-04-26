import type * as z from 'zod'
import type { intakeSchema } from './schema'

export type IntakeFormValues = z.infer<typeof intakeSchema>
