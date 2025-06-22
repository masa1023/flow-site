import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Flow Inc - AI-Native Solutions for Business Transformation',
    template: '%s | Flow Inc'
  },
  description: 'Leading AI-Native startup providing cutting-edge AI development, training, and consulting services to transform businesses through intelligent automation and optimization.',
  keywords: ['AI development', 'machine learning', 'business automation', 'AI training', 'consulting', 'digital transformation'],
  authors: [{ name: 'Flow Inc' }],
  creator: 'Flow Inc',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flow-inc.com',
    siteName: 'Flow Inc',
    title: 'Flow Inc - AI-Native Solutions for Business Transformation',
    description: 'Leading AI-Native startup providing cutting-edge AI development, training, and consulting services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Flow Inc - AI-Native Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flow Inc - AI-Native Solutions for Business Transformation',
    description: 'Leading AI-Native startup providing cutting-edge AI development, training, and consulting services.',
    images: ['/og-image.jpg'],
    creator: '@flowinc'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token_here',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}