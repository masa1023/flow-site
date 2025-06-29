'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
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

const team = [
  {
    name: 'Masa',
    role: 'CEO & Founder',
    bio: 'Former AI Research Director at Google. PhD in Machine Learning from Stanford.',
    avatar: '/images/avatar/masa.jpg',
    skills: ['AI Strategy', 'Machine Learning', 'Leadership'],
    social: {
      github: '#',
      x: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Sarah Martinez',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Senior Engineer at OpenAI. Expert in LLM architectures and deployment.',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    skills: ['LLM Development', 'System Architecture', 'DevOps'],
    social: {
      github: '#',
      x: '#',
      linkedin: '#',
    },
  },
  {
    name: 'David Chen',
    role: 'Head of AI Research',
    bio: 'Published researcher with 50+ papers in top-tier ML conferences.',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    skills: ['Research', 'Deep Learning', 'Computer Vision'],
    social: {
      github: '#',
      x: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Rachel Kim',
    role: 'VP of Business Development',
    bio: 'Former McKinsey consultant specializing in AI transformation strategies.',
    avatar:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    skills: ['Business Strategy', 'Client Relations', 'Market Research'],
    social: {
      github: '#',
      x: '#',
      linkedin: '#',
    },
  },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the Minds Behind the Innovation
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Our diverse team of AI experts, researchers, and business
            strategists brings together decades of experience from leading tech
            companies and research institutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="h-4 w-4">
                          <FontAwesomeIcon icon={faGithub} />
                        </div>
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={member.social.x}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="h-4 w-4">
                          <FontAwesomeIcon icon={faXTwitter} />
                        </div>
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="h-4 w-4">
                          <FontAwesomeIcon icon={faLinkedin} />
                        </div>
                      </a>
                    </Button>
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
