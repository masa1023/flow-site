import type { IntakeFormValues } from './types'
import {
  MONTHLY_BUDGET_OPTIONS,
  PC_OS_OPTIONS,
  PROGRAMMING_LEVEL_OPTIONS,
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
  const programmingLevel = labelOf(
    PROGRAMMING_LEVEL_OPTIONS,
    data.programming_level
  )
  const pcOs = labelOf(PC_OS_OPTIONS, data.pc_os)
  const pcOsOther =
    data.pc_os === 'other' && data.pc_os_other
      ? `(${nl2br(data.pc_os_other)})`
      : ''

  const weeklyHours = labelOf(WEEKLY_HOURS_OPTIONS, data.weekly_hours)
  const monthlyBudget = labelOf(MONTHLY_BUDGET_OPTIONS, data.monthly_budget)
  const concerns = data.concerns?.trim() ? nl2br(data.concerns) : '(なし)'

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
  </table>

  ${sectionHeader(2, 'ゴール・動機')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row('3ヶ月後の状態', nl2br(data.goal_3months))}
    ${row('受講のきっかけ', nl2br(data.motivation))}
  </table>

  ${sectionHeader(3, '業務・課題')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row(
      '時間がかかっている業務',
      data.busy_tasks.map((t, i) => `${i + 1}. ${nl2br(t)}`).join('<br>')
    )}
    ${row('AI/自動化の経験', nl2br(data.ai_experience))}
  </table>

  ${sectionHeader(4, '作りたいもの')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row(
      '作りたい/自動化したいもの',
      data.ideas.map((t, i) => `${i + 1}. ${nl2br(t)}`).join('<br>')
    )}
    ${row('最も作ってみたい1つ', nl2br(data.top_idea))}
  </table>

  ${sectionHeader(5, '現状スキル・環境')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row('プログラミング経験', escapeHtml(programmingLevel))}
    ${row('PC: OS', `${escapeHtml(pcOs)} ${pcOsOther}`)}
  </table>

  ${sectionHeader(6, '制約・不安')}
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${row('週あたりの学習時間', escapeHtml(weeklyHours))}
    ${row('月額予算', escapeHtml(monthlyBudget))}
    ${row('不安・制約 (任意)', concerns)}
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
