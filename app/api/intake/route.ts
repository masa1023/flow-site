import { NextRequest, NextResponse } from 'next/server'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { intakeSchema } from '@/lib/intake/schema'
import { getServiceRoleClient } from '@/lib/supabase'
import {
  buildIntakeEmailHtml,
  buildIntakeEmailSubject,
} from '@/lib/intake/notify'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = intakeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 }
    )
  }
  const data = parsed.data

  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
  const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !NOTIFICATION_EMAIL) {
    console.error('Missing Mailgun env vars')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  let supabase
  try {
    supabase = getServiceRoleClient()
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const { error: insertError } = await supabase
    .from('intake_submissions')
    .insert({
      full_name: data.full_name,
      company: data.company,
      role_business: data.role_business,
      email: data.email,

      goal_3months: data.goal_3months,
      motivation: data.motivation,

      busy_tasks: data.busy_tasks,
      ai_experience: data.ai_experience,

      ideas: data.ideas,
      top_idea: data.top_idea,

      programming_level: data.programming_level,
      pc_os: data.pc_os,
      pc_os_other: data.pc_os_other ?? null,

      weekly_hours: data.weekly_hours,
      monthly_budget: data.monthly_budget,
      concerns: data.concerns?.trim() ? data.concerns : null,
    })

  if (insertError) {
    console.error('Supabase insert error:', insertError)
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    )
  }

  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY })

  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Flow Intake Form <noreply@${MAILGUN_DOMAIN}>`,
      to: NOTIFICATION_EMAIL,
      'h:Reply-To': data.email,
      subject: buildIntakeEmailSubject(data),
      html: buildIntakeEmailHtml(data),
    })
  } catch (error) {
    console.error('Mailgun send error:', error)
    // データは保存済みなので、メール失敗はログに残しつつ 200 返却
    // (Masa は Supabase ダッシュボードから回答を確認可能)
    return NextResponse.json(
      { warning: 'Saved but email notification failed' },
      { status: 200 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
