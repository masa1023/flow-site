'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { routing } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LOCALE_LABELS: Record<string, string> = {
  ja: '日本語',
  en: 'English',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return

    let basePath = pathname
    for (const loc of routing.locales) {
      if (basePath.startsWith(`/${loc}/`)) {
        basePath = basePath.slice(loc.length + 1)
        break
      }
      if (basePath === `/${loc}`) {
        basePath = '/'
        break
      }
    }

    const href =
      nextLocale === routing.defaultLocale
        ? basePath
        : `/${nextLocale}${basePath}`

    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;SameSite=Lax`
    router.push(href)
  }

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger
        aria-label="Change language"
        className="h-9 w-auto gap-2 px-3 text-sm font-medium"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc} className="text-sm">
            {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
