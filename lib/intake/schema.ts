import * as z from 'zod'

// --- Base object schemas (mergeable) ---

const section1Base = z.object({
  full_name: z.string().min(1, '必須です'),
  company: z.string().min(1, '必須です'),
  role_business: z.string().min(5, '5文字以上で入力してください'),
  email: z.string().email('有効なEmailアドレスを入力してください'),
  preferred_contact: z.enum(['slack', 'line', 'email', 'other']),
  preferred_contact_other: z.string().optional(),
})

const section2Base = z.object({
  goal_3months: z.string().min(50, '50文字以上で書いてください'),
  stance: z.enum(['self', 'deliver', 'both']),
  motivation: z.string().min(10, '10文字以上で入力してください'),
})

const section3Base = z.object({
  busy_tasks: z
    .array(z.string().min(5, '5文字以上で入力してください'))
    .length(3, '3つすべて入力してください'),
  ai_experience: z.string().min(20, '20文字以上で入力してください'),
  ai_success_score: z.number().int().min(1).max(5),
})

const section4Base = z.object({
  ideas: z
    .array(z.string().min(2, '2文字以上で入力してください'))
    .min(3, '3つ以上入力してください')
    .max(10, '最大10個までです'),
  top_idea: z.string().min(1, '1つ選んでください'),
  top_idea_reason: z.string().min(5, '5文字以上で入力してください'),
  outcome_description: z.string().min(50, '50文字以上で書いてください'),
})

const section5Base = z.object({
  programming_level: z.enum(['none', 'html', 'occasional', 'daily']),
  daily_tools: z.array(z.string()).min(1, '1つ以上選択してください'),
  daily_tools_other: z.string().optional(),
  pc_os: z.enum(['mac', 'windows', 'linux', 'other']),
  pc_os_other: z.string().optional(),
  pc_admin: z.enum(['full', 'limited', 'none']),
  pc_spec: z.string().min(3, '3文字以上で入力してください'),
  existing_accounts: z.array(z.string()),
  existing_accounts_other: z.string().optional(),
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
  concerns: z.string().min(20, '20文字以上で入力してください'),
})

// --- Cross-field validators (used by both per-section and whole-form) ---

type Section1Values = z.infer<typeof section1Base>
type Section4Values = z.infer<typeof section4Base>
type Section5Values = z.infer<typeof section5Base>

const refineSection1 = (v: Section1Values, ctx: z.RefinementCtx) => {
  if (
    v.preferred_contact === 'other' &&
    !(v.preferred_contact_other ?? '').trim()
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['preferred_contact_other'],
      message: 'その他の手段を入力してください',
    })
  }
}

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
  if (v.daily_tools.includes('other') && !(v.daily_tools_other ?? '').trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['daily_tools_other'],
      message: 'その他のツールを入力してください',
    })
  }
  if (v.pc_os === 'other' && !(v.pc_os_other ?? '').trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['pc_os_other'],
      message: 'その他のOSを入力してください',
    })
  }
  if (
    v.existing_accounts.includes('other') &&
    !(v.existing_accounts_other ?? '').trim()
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['existing_accounts_other'],
      message: 'その他のアカウントを入力してください',
    })
  }
}

// --- Section schemas (with refinements, used for per-section validation) ---

export const section1Schema = section1Base.superRefine(refineSection1)
export const section2Schema = section2Base
export const section3Schema = section3Base
export const section4Schema = section4Base.superRefine(refineSection4)
export const section5Schema = section5Base.superRefine(refineSection5)
export const section6Schema = section6Base

// --- Whole-form schema (merge bases, then apply all refinements) ---

export const intakeSchema = section1Base
  .merge(section2Base)
  .merge(section3Base)
  .merge(section4Base)
  .merge(section5Base)
  .merge(section6Base)
  .superRefine((v, ctx) => {
    refineSection1(v, ctx)
    refineSection4(v, ctx)
    refineSection5(v, ctx)
  })

// --- Field-name lists per section (for trigger-based per-section validation) ---

export const SECTION_FIELDS = [
  [
    'full_name',
    'company',
    'role_business',
    'email',
    'preferred_contact',
    'preferred_contact_other',
  ],
  ['goal_3months', 'stance', 'motivation'],
  ['busy_tasks', 'ai_experience', 'ai_success_score'],
  ['ideas', 'top_idea', 'top_idea_reason', 'outcome_description'],
  [
    'programming_level',
    'daily_tools',
    'daily_tools_other',
    'pc_os',
    'pc_os_other',
    'pc_admin',
    'pc_spec',
    'existing_accounts',
    'existing_accounts_other',
  ],
  ['weekly_hours', 'monthly_budget', 'concerns'],
] as const
