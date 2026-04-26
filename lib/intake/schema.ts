import * as z from 'zod'

// --- Base object schemas (mergeable) ---

const section1Base = z.object({
  full_name: z.string().min(1, '必須です'),
  company: z.string().min(1, '必須です'),
  role_business: z.string().min(5, '5文字以上で入力してください'),
  email: z.string().email('有効なEmailアドレスを入力してください'),
})

const section2Base = z.object({
  goal_3months: z.string().min(50, '50文字以上で書いてください'),
  motivation: z.string().min(10, '10文字以上で入力してください'),
})

const section3Base = z.object({
  busy_tasks: z
    .array(z.string().min(5, '5文字以上で入力してください'))
    .length(3, '3つすべて入力してください'),
  ai_experience: z.string().min(20, '20文字以上で入力してください'),
})

const section4Base = z.object({
  ideas: z
    .array(z.string().min(2, '2文字以上で入力してください'))
    .min(3, '3つ以上入力してください')
    .max(10, '最大10個までです'),
  top_idea: z.string().min(1, '1つ選んでください'),
})

const section5Base = z.object({
  programming_level: z.enum(['none', 'html', 'occasional', 'daily']),
  pc_os: z.enum(['mac', 'windows', 'linux', 'other']),
  pc_os_other: z.string().optional(),
})

const section6Base = z.object({
  weekly_hours: z.enum(['lt2', '2to5', '5to10', 'gt10']),
  monthly_budget: z.enum([
    '0',
    'lt5k',
    '5to10k',
    '10to30k',
    'gt30k',
    'unlimited',
  ]),
  concerns: z.string().optional(),
})

// --- Cross-field validators (used by both per-section and whole-form) ---

type Section4Values = z.infer<typeof section4Base>
type Section5Values = z.infer<typeof section5Base>

const refineSection4 = (v: Section4Values, ctx: z.RefinementCtx) => {
  if (v.top_idea && !v.ideas.includes(v.top_idea)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['top_idea'],
      message: 'ideas のいずれかを選んでください',
    })
  }
}

const refineSection5 = (v: Section5Values, ctx: z.RefinementCtx) => {
  if (v.pc_os === 'other' && !(v.pc_os_other ?? '').trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['pc_os_other'],
      message: 'その他のOSを入力してください',
    })
  }
}

// --- Whole-form schema (merge bases, then apply all refinements) ---

export const intakeSchema = section1Base
  .merge(section2Base)
  .merge(section3Base)
  .merge(section4Base)
  .merge(section5Base)
  .merge(section6Base)
  .superRefine((v, ctx) => {
    refineSection4(v, ctx)
    refineSection5(v, ctx)
  })

// --- Field-name lists per section (for trigger-based per-section validation) ---

export const SECTION_FIELDS = [
  ['full_name', 'company', 'role_business', 'email'],
  ['goal_3months', 'motivation'],
  ['busy_tasks', 'ai_experience'],
  ['ideas', 'top_idea'],
  ['programming_level', 'pc_os', 'pc_os_other'],
  ['weekly_hours', 'monthly_budget', 'concerns'],
] as const
