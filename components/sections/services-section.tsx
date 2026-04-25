'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  Code2,
  GraduationCap,
  Compass,
  Cpu,
  Mic,
  Smartphone,
  Bot,
  Wrench,
  Users,
  Map,
  GitBranch,
  Building2,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ServicesSection() {
  const t = useTranslations('Capabilities')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      icon: Code2,
      title: t('engineering.title'),
      description: t('engineering.description'),
      features: [
        { icon: Cpu, text: t('engineering.feature1') },
        { icon: Mic, text: t('engineering.feature2') },
        { icon: Smartphone, text: t('engineering.feature3') },
      ],
      color:
        'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800',
      badge: t('engineering.badge'),
    },
    {
      icon: GraduationCap,
      title: t('training.title'),
      description: t('training.description'),
      features: [
        { icon: Bot, text: t('training.feature1') },
        { icon: Wrench, text: t('training.feature2') },
        { icon: Users, text: t('training.feature3') },
      ],
      color:
        'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800',
      badge: t('training.badge'),
    },
    {
      icon: Compass,
      title: t('advisory.title'),
      description: t('advisory.description'),
      features: [
        { icon: Map, text: t('advisory.feature1') },
        { icon: GitBranch, text: t('advisory.feature2') },
        { icon: Building2, text: t('advisory.feature3') },
      ],
      color: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800',
      badge: t('advisory.badge'),
    },
  ]

  return (
    <section id="services" ref={ref} className="py-20">
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
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                {service.badge && (
                  <div className="absolute top-6 right-6 z-10">
                    <Badge variant="secondary" className="text-xs">
                      {service.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="space-y-4">
                  <div
                    className={`inline-flex w-12 h-12 rounded-lg items-center justify-center ${service.color} group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
