'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const nextLocale = locale === 'ja' ? 'en' : 'ja'

  // Strip current locale prefix from pathname
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

  // Build target path
  const href =
    nextLocale === routing.defaultLocale
      ? basePath
      : `/${nextLocale}${basePath}`

  const handleClick = () => {
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;SameSite=Lax`
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="text-xs font-medium px-2"
    >
      <a href={href} onClick={handleClick}>
        {locale === 'ja' ? 'EN' : 'JA'}
      </a>
    </Button>
  )
}
