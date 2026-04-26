'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Mic, Database, Film, GraduationCap, Recycle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ITEM_KEYS = ['voice', 'data', 'video', 'edu', 'ecom'] as const

const ITEM_ICONS: Record<(typeof ITEM_KEYS)[number], typeof Mic> = {
  voice: Mic,
  data: Database,
  video: Film,
  edu: GraduationCap,
  ecom: Recycle,
}

export function SelectedWorkSection() {
  const t = useTranslations('Work')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex w-10 h-10 rounded-lg items-center justify-center bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {t(`items.${key}.industry`)}
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

                    <div className="mt-auto pt-4 border-t space-y-2">
                      <p className="text-xs text-muted-foreground font-mono">
                        {t(`items.${key}.stack`)}
                      </p>
                      <p className="text-xs font-medium text-primary">
                        {t(`items.${key}.status`)}
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
