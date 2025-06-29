'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Waves } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Team', href: '/#team' },
  // { name: 'Blog', href: '/blog' },
  // { name: 'IR', href: '/ir/announcement' },
  { name: 'Contact', href: '/#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-lg border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Waves className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Flow Inc.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }
                }}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault()
                        handleNavClick(item.href)
                      } else {
                        setIsOpen(false)
                      }
                    }}
                    className={cn(
                      'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
