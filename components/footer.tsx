import Link from 'next/link';
import { Sparkles, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/flowinc', icon: '𝕏' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/flow-inc', icon: 'in' },
  { name: 'Instagram', href: 'https://instagram.com/flowinc', icon: '📷' },
];

const footerLinks = {
  Services: [
    { name: 'AI Development', href: '#services' },
    { name: 'AI Training', href: '#services' },
    { name: 'DX Consulting', href: '#services' },
    { name: 'Custom Solutions', href: '#contact' },
  ],
  Company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#team' },
    { name: 'Careers', href: '#contact' },
    { name: 'Blog', href: '/blog' },
  ],
  Resources: [
    { name: 'Case Studies', href: '/blog' },
    { name: 'White Papers', href: '/blog' },
    { name: 'Documentation', href: '/blog' },
    { name: 'Support', href: '#contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'IR Information', href: '/ir/announcement' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <Sparkles className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Flow Inc
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Transforming businesses through AI-native solutions. We empower organizations 
                with cutting-edge artificial intelligence to drive innovation and growth.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>hello@flow-inc.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-9 h-9 p-0"
                  >
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <span className="text-sm font-medium">{social.icon}</span>
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Flow Inc. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Built with ❤️ using Next.js and AI
          </p>
        </div>
      </div>
    </footer>
  );
}