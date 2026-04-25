import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Waves, Mail, MapPin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { LanguageSwitcher } from '@/components/language-switcher'

export async function Footer() {
  const t = await getTranslations('Footer')

  const footerLinks = {
    [t('services')]: [
      { name: t('aiDevelopment'), href: '#services' },
      { name: t('dxConsulting'), href: '#services' },
      { name: t('aiTraining'), href: '#services' },
      { name: t('customSolutions'), href: '#contact' },
    ],
    [t('company')]: [
      { name: t('aboutUs'), href: '#about' },
      { name: t('ourTeam'), href: '#team' },
    ],
    [t('resources')]: [
      { name: t('founderBlog'), href: 'https://masa373.work/' },
      { name: t('support'), href: '#contact' },
    ],
    [t('legal')]: [
      { name: t('securityPolicy'), href: '/security-policy' },
    ],
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-3">
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <Waves className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Flow Inc.
                </span>
              </Link>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Tokyo, Japan</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>hello@flow-inc.ai</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={
                          link.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          link.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="mt-2 sm:mt-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
