'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const nextLocale = locale === 'ja' ? 'en' : 'ja'

    // Remove current locale prefix from pathname
    let path = pathname
    for (const loc of routing.locales) {
      if (path.startsWith(`/${loc}/`)) {
        path = path.slice(loc.length + 1)
        break
      }
      if (path === `/${loc}`) {
        path = '/'
        break
      }
    }

    // Add new locale prefix (skip for default locale)
    const newPath =
      nextLocale === routing.defaultLocale ? path : `/${nextLocale}${path}`

    router.push(newPath)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="text-xs font-medium px-2"
    >
      {locale === 'ja' ? 'EN' : 'JA'}
    </Button>
  )
}
