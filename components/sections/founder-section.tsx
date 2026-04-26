'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function FounderSection() {
  const t = useTranslations('Founder')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const principles = [
    t('principle1'),
    t('principle2'),
    t('principle3'),
    t('principle4'),
  ]

  const social = [
    {
      icon: <FontAwesomeIcon icon={faGithub} />,
      link: 'https://github.com/masa1023',
      label: 'GitHub',
    },
    {
      icon: <FontAwesomeIcon icon={faXTwitter} />,
      link: 'https://x.com/masaa373',
      label: 'X / Twitter',
    },
    {
      icon: <FontAwesomeIcon icon={faLinkedin} />,
      link: 'https://www.linkedin.com/in/masa373/',
      label: 'LinkedIn',
    },
  ]

  return (
    <section id="team" ref={ref} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto"
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

        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[260px_1fr]">
                {/* Founder identity panel */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-muted/40 p-8 md:p-10 flex flex-col items-center md:items-start gap-4 border-b md:border-b-0 md:border-r"
                >
                  <Avatar className="w-28 h-28 ring-2 ring-primary/20">
                    <AvatarImage
                      src="/images/avatar/masa.jpg"
                      alt={t('name')}
                    />
                    <AvatarFallback className="text-2xl">MM</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl">{t('name')}</h3>
                    <p className="text-sm text-muted-foreground">
                      ({t('alias')})
                    </p>
                    <p className="text-primary text-sm font-medium mt-2">
                      {t('role')}
                    </p>
                  </div>

                  <div className="w-full pt-4 mt-2 border-t md:border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3">
                      {t('linksLabel')}
                    </p>
                    <div className="flex justify-center md:justify-start gap-1">
                      {social.map((s) => (
                        <Button
                          key={s.link}
                          variant="ghost"
                          size="sm"
                          asChild
                          aria-label={s.label}
                        >
                          <a
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="h-4 w-4">{s.icon}</div>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Bio + principles */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="p-8 md:p-10 space-y-6"
                >
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {t('bio')}
                  </p>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-base mb-4">
                      {t('principlesTitle')}
                    </h4>
                    <ul className="space-y-3">
                      {principles.map((p, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
