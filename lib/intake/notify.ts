import type { IntakeFormValues } from './types'
import {
  AI_SUCCESS_SCORE_OPTIONS,
  DAILY_TOOLS_OPTIONS,
  EXISTING_ACCOUNTS_OPTIONS,
  MONTHLY_BUDGET_OPTIONS,
  PC_ADMIN_OPTIONS,
  PC_OS_OPTIONS,
  PREFERRED_CONTACT_OPTIONS,
  PROGRAMMING_LEVEL_OPTIONS,
  STANCE_OPTIONS,
  WEEKLY_HOURS_OPTIONS,
  type Option,
} from './options'

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const nl2br = (s: string) => escapeHtml(s).replace(/\n/g, '<br>')

const labelOf = (opts: readonly Option[], value: string | undefined) => {
  if (!value) return ''
  return opts.find((o) => o.value === value)?.label ?? value
}

const labelsOf = (opts: readonly Option[], values: readonly string[]) =>
  values.map((v) => labelOf(opts, v)).join('、')

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap;">${escapeHtml(
      label
    )}</td>
    <td style="padding:6px 0;">${value}</td>
  </tr>
`

const sectionHeader = (n: number, title: string) => `
  <h3 style="margin:24px 0 8px;padding-bottom:4px;border-bottom:2px solid #0f766e;font-size:15px;">
    Section ${n}. ${escapeHtml(title)}
  </h3>
`

export function buildIntakeEmailHtml(data: IntakeFormValues): string {
  const preferredContact = labelOf(
    PREFERRED_CONTACT_OPTIONS,
    data.preferred_contact
  )
  const preferredOther =
    data.preferred_contact === 'other' && data.preferred_contact_other
      ? `(${nl2br(data.preferred_contact_other)})`
      : ''

  const stance = labelOf(STANCE_OPTIONS, data.stance)
  const aiScore = labelOf(
    AI_SUCCESS_SCORE_OPTIONS,
    String(data.ai_success_score)
  )

  const programmingLevel = labelOf(
    PROGRAMMING_LEVEL_OPTIONS,
    data.programming_level
  )
  const dailyTools = labelsOf(DAILY_TOOLS_OPTIONS, data.daily_tools)
  const dailyToolsOther =
    data.daily_tools.includes('other') && data.daily_tools_other
      ? `(その他: ${nl2br(data.daily_tools_other)})`
      : ''
  const pcOs = labelOf(PC_OS_OPTIONS, data.pc_os)
  const pcOsOther =
    data.pc_os === 'other' && data.pc_os_other
      ? `(${nl2br(data.pc_os_other)})`
      : ''
  const pcAdmin = labelOf(PC_ADMIN_OPTIONS, data.pc_admin)
  const existingAccounts =
    data.existing_accounts.length > 0
      ? labelsOf(EXISTING_ACCOUNTS_OPTIONS, data.existing_accounts)
      : '(なし)'
  const existingAccountsOther =
    data.existing_accounts.includes('other') && data.existing_accounts_other
      ? `(その他: ${nl2br(data.existing_accounts_other)})`
      : ''

  const weeklyHours = labelOf(WEEKLY_HOURS_OPTIONS, data.weekly_hours)
  const monthlyBudget = labelOf(MONTHLY_BUDGET_OPTIONS, data.monthly_budget)

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#222;max-width:720px;">
  <h2 style="margin-bottom:8px;">Claude Code コンサル — 事前ヒアリング回答</h2>
  <p style="color:#666;margin-top:0;font-size:13px;">
    回答者: <strong>${escapeHtml(data.full_name)}</strong> / ${escapeHtml(data.email)}
  </p>

  ${sectionHeader(1, '基本情報')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row('お名前', escapeHtml(data.full_name))}
    ${row('会社名・屋号', escapeHtml(data.company))}
    ${row('役職・事業内容', nl2br(data.role_business))}
    ${row('Email', escapeHtml(data.email))}
    ${row('希望連絡手段', `${escapeHtml(preferredContact)} ${preferredOther}`)}
  </table>

  ${sectionHeader(2, 'ゴール・動機')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row('3ヶ月後の状態', nl2br(data.goal_3months))}
    ${row('スタンス', escapeHtml(stance))}
    ${row('受講のきっかけ', nl2br(data.motivation))}
  </table>

  ${sectionHeader(3, '業務・課題')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row(
      '時間がかかっている業務',
      data.busy_tasks.map((t, i) => `${i + 1}. ${nl2br(t)}`).join('<br>')
    )}
    ${row('AI/自動化の経験', nl2br(data.ai_experience))}
    ${row('うまくいった度合い', `${escapeHtml(aiScore)} / 5`)}
  </table>

  ${sectionHeader(4, '作りたいもの')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row(
      '作りたい/自動化したいもの',
      data.ideas.map((t, i) => `${i + 1}. ${nl2br(t)}`).join('<br>')
    )}
    ${row('最も作ってみたい1つ', nl2br(data.top_idea))}
    ${row('選んだ理由', nl2br(data.top_idea_reason))}
    ${row('完成後のユーザー体験', nl2br(data.outcome_description))}
  </table>

  ${sectionHeader(5, '現状スキル・環境')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row('プログラミング経験', escapeHtml(programmingLevel))}
    ${row('普段使うツール', `${escapeHtml(dailyTools)} ${dailyToolsOther}`)}
    ${row('PC: OS', `${escapeHtml(pcOs)} ${pcOsOther}`)}
    ${row('PC: 管理者権限', escapeHtml(pcAdmin))}
    ${row('PCスペック', escapeHtml(data.pc_spec))}
    ${row(
      '既存アカウント',
      `${escapeHtml(existingAccounts)} ${existingAccountsOther}`
    )}
  </table>

  ${sectionHeader(6, '制約・不安')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row('週あたりの学習時間', escapeHtml(weeklyHours))}
    ${row('月額予算', escapeHtml(monthlyBudget))}
    ${row('不安・制約', nl2br(data.concerns))}
  </table>

  <hr style="margin-top:32px;border:none;border-top:1px solid #ddd;">
  <p style="color:#888;font-size:12px;">
    Flow Inc. Claude Code Consulting Intake Form
  </p>
</div>
`.trim()
}

export function buildIntakeEmailSubject(data: IntakeFormValues): string {
  return `[Intake] ${data.full_name} / ${data.company}`
}
