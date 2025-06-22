'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: '300%',
    label: 'Average ROI Increase',
    description: 'Our AI solutions deliver measurable business value',
  },
  {
    icon: Users,
    value: '10K+',
    label: 'Professionals Trained',
    description: 'Empowering teams with AI knowledge and skills',
  },
  {
    icon: Award,
    value: '50+',
    label: 'Industry Awards',
    description: 'Recognized for innovation and excellence',
  },
  {
    icon: Zap,
    value: '99.9%',
    label: 'System Uptime',
    description: 'Reliable AI infrastructure you can trust',
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Proven Results That Speak for Themselves
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our track record demonstrates the transformative power of AI-driven solutions 
            across industries and organizations of all sizes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}