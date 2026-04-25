'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Sparkles, Briefcase } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ITEM_KEYS = ['compare', 'ops'] as const

const ITEM_ICONS: Record<(typeof ITEM_KEYS)[number], typeof Sparkles> = {
  compare: Sparkles,
  ops: Briefcase,
}

export function ProductsSection() {
  const t = useTranslations('Products')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="products" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <Badge variant="outline" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ITEM_KEYS.map((key, index) => {
            const Icon = ITEM_ICONS[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex w-10 h-10 rounded-lg items-center justify-center bg-sky-500/10 text-sky-600 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {t(`items.${key}.category`)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg leading-snug">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`items.${key}.description`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
