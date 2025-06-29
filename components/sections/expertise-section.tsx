'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Globe,
  Cpu,
  BarChart3,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const technologies = [
  {
    category: 'AI & Machine Learning',
    icon: Cpu,
    items: [
      'TensorFlow',
      'PyTorch',
      'OpenAI GPT',
      'Anthropic Claude',
      'Hugging Face',
      'LangChain',
    ],
    color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800',
  },
  {
    category: 'Development',
    icon: Code,
    items: ['Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'FastAPI'],
    color:
      'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800',
  },
  {
    category: 'Data & Analytics',
    icon: BarChart3,
    items: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Apache Spark',
      'Elasticsearch',
      'BigQuery',
    ],
    color:
      'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800',
  },
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    items: [
      'AWS',
      'Google Cloud',
      'Azure',
      'Docker',
      'Kubernetes',
      'Terraform',
    ],
    color:
      'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800',
  },
  {
    category: 'Security & Compliance',
    icon: Shield,
    items: [
      'OAuth 2.0',
      'JWT',
      'GDPR',
      'SOC 2',
      'ISO 27001',
      'End-to-end encryption',
    ],
    color: 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-800',
  },
  {
    category: 'Integration & Automation',
    icon: Globe,
    items: ['Zapier', 'Dify', 'REST APIs', 'GraphQL', 'Webhooks', 'RPA'],
    color: 'bg-teal-500/10 text-teal-600 border-teal-200 dark:border-teal-800',
  },
]

export function ExpertiseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="expertise" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Our Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge Technologies We Master
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Our team stays at the forefront of technology, working with the
            latest tools and frameworks to deliver state-of-the-art AI
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`inline-flex w-10 h-10 rounded-lg items-center justify-center ${tech.color} group-hover:scale-110 transition-transform`}
                >
                  <tech.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{tech.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, itemIndex) => (
                  <Badge
                    key={itemIndex}
                    variant="secondary"
                    className="text-xs px-2 py-1 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
