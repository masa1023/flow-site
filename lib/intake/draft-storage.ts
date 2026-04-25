import type { IntakeFormValues } from './types'

const KEY = 'flow_intake_draft_v1'

type DraftEnvelope = {
  data: Partial<IntakeFormValues>
  savedAt: number
}

export function saveDraft(data: Partial<IntakeFormValues>) {
  if (typeof window === 'undefined') return
  try {
    const envelope: DraftEnvelope = { data, savedAt: Date.now() }
    window.localStorage.setItem(KEY, JSON.stringify(envelope))
  } catch {
    // ignore quota or serialization errors
  }
}

export function loadDraft(): Partial<IntakeFormValues> | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DraftEnvelope
    if (!parsed || typeof parsed !== 'object' || !parsed.data) return null
    return parsed.data
  } catch {
    return null
  }
}

export function clearDraft() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
