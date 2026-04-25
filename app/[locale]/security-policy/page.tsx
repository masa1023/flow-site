import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'SecurityPolicy' })
  return {
    title: t('title'),
    description: t('intro'),
  }
}

export default async function SecurityPolicyPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'SecurityPolicy' })

  const sections = [
    { title: t('section1.title'), body: t('section1.body') },
    { title: t('section2.title'), body: t('section2.body') },
    { title: t('section3.title'), body: t('section3.body'), items: t.raw('section3.items') as string[] },
    { title: t('section4.title'), body: t('section4.body') },
    { title: t('section5.title'), body: t('section5.body') },
    { title: t('section6.title'), body: t('section6.body') },
    { title: t('section7.title'), body: t('section7.body') },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('title')}</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">{t('intro')}</p>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold mb-3">
                {i + 1}. {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
              {section.items && (
                <ol className="list-decimal list-inside mt-3 space-y-2 text-muted-foreground">
                  {section.items.map((item, j) => (
                    <li key={j} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
          <p>{t('enactedOn')}</p>
          <p className="mt-1">{t('company')}</p>
          <p>{t('representative')}</p>
        </div>
      </div>
    </div>
  )
}
