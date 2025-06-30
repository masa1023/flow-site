'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Cpu, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const technologies = [
  {
    category: 'AI & Machine Learning',
    icon: Cpu,
    items: [
      'OpenAI GPT',
      'Anthropic Claude',
      'Google Gemini',
      'Eleven Labs',
      'LangChain',
      'PyTorch',
      'TensorFlow',
    ],
    color: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800',
  },
  {
    category: 'Development',
    icon: Code,
    items: [
      'Python',
      'React',
      'Next.js',
      'Node.js',
      'Ruby on Rails',
      'AWS',
      'Google Cloud',
    ],
    color:
      'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800',
  },
  {
    category: 'Integration & Automation',
    icon: Settings,
    items: ['Dify', 'n8n', 'Zapier', 'GAS', 'Webhooks'],
    color:
      'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800',
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
