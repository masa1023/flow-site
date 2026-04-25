'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, Sparkles, Smartphone, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const t = useTranslations('Hero')

  const handleScrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToWork = () => {
    const element = document.querySelector('#work')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-primary/10 rounded-full blur-3xl motion-safe:animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-emerald-500/10 rounded-full blur-3xl motion-safe:animate-pulse [animation-delay:1500ms]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight"
          >
            {t('heading')}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              {t('headingHighlight')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{t('pillDev')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-full">
              <Smartphone className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-medium">{t('pillWeb')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-full">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">{t('pillTraining')}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleScrollToContact}
              className="group relative overflow-hidden"
            >
              {t('ctaPrimary')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleScrollToWork}
              className="group"
            >
              {t('ctaSecondary')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
