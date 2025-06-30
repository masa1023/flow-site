'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  GraduationCap,
  Cpu,
  Brain,
  Workflow,
  Users,
  BarChart3,
  Zap,
  Settings,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    icon: Zap,
    title: 'AI Development Business',
    description: 'Cutting-edge AI solutions tailored to your business needs',
    features: [
      { icon: Cpu, text: 'Generative AI Integration (LLM, Agents, RAG, MCP)' },
      { icon: Brain, text: 'Custom LLM & Fine-tuning' },
      {
        icon: Settings,
        text: 'ML/DL Model Development',
      },
    ],
    color:
      'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800',
    badge: 'Most Popular',
  },
  {
    icon: Settings,
    title: 'DX & Consulting Business',
    description: 'Digital transformation through intelligent automation',
    features: [
      { icon: Workflow, text: 'Workflow Optimization' },
      { icon: Zap, text: 'AI Tool Implementation' },
      { icon: BarChart3, text: 'Internal Process Automation' },
    ],
    color:
      'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800',
    badge: 'Enterprise Ready',
  },
  {
    icon: GraduationCap,
    title: 'AI Training Business',
    description: 'Comprehensive education programs for AI transformation',
    features: [
      { icon: GraduationCap, text: 'Employee Training Programs' },
      { icon: BarChart3, text: 'Executive AI Strategy Seminars' },
      { icon: Users, text: 'Hands-on Workshop Sessions' },
    ],
    color: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800',
    badge: 'Growing Fast',
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive AI Solutions for Every Business Need
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            From development to deployment, training to transformation, we
            provide end-to-end AI services that drive real business results.
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
