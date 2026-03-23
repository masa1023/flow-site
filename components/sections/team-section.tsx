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
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function TeamSection() {
  const t = useTranslations('Team')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const team = [
    {
      name: 'Masanobu Minami (Masa)',
      role: 'CEO & Founder',
      bio: t('members.masa.bio'),
      avatar: '/images/avatar/masa.jpg',
      skills: ['AI Strategy', 'Generative AI', 'Web Development', 'Leadership'],
      social: [
        {
          icon: <FontAwesomeIcon icon={faGithub} />,
          link: 'https://github.com/masa1023',
        },
        {
          icon: <FontAwesomeIcon icon={faXTwitter} />,
          link: 'https://x.com/masaa373',
        },
        {
          icon: <FontAwesomeIcon icon={faLinkedin} />,
          link: 'https://www.linkedin.com/in/masa373/',
        },
      ],
    },
    {
      name: t('hiring'),
      role: 'Senior AI Engineer',
      bio: t('members.engineer.bio'),
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      skills: [
        'LLM Development',
        'Model Tuning',
        'System Architecture',
        'DevOps',
      ],
      social: [],
    },
    {
      name: t('hiring'),
      role: 'Senior AI Consultant',
      bio: t('members.consultant.bio'),
      avatar:
        'https://images.pexels.com/photos/3778958/pexels-photo-3778958.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      skills: ['AI Consulting', 'Business Strategy', 'Change Management'],
      social: [],
    },
  ]

  return (
    <section id="team" ref={ref} className="py-20 bg-muted/30">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-2">
                    {member.social.map((social) => (
                      <Button
                        key={social.link}
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="h-4 w-4">{social.icon}</div>
                        </a>
                      </Button>
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
