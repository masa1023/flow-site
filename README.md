# Flow Inc. - AI-Native Corporate Website

A modern, responsive corporate website built for Flow Inc., an AI-Native startup specializing in AI development, training, and consulting services.

## 🚀 Project Overview

Flow Inc. is a cutting-edge AI-Native startup that provides comprehensive AI solutions including:

- **AI Development Business**: System development specializing in generative AI (Agents, RAG, MCP, LLM integration)
- **AI Training Business**: Training programs and executive seminars covering AI fundamentals through advanced topics
- **DX & Consulting Business**: Workflow optimization, AI tool implementation, and internal automation

## ✨ Features

### Core Pages

- **Homepage**: Hero section, services, expertise, team, testimonials, and contact form
- **Blog System**: Dynamic blog with Markdoc integration and syntax highlighting
- **Blog Detail Pages**: Individual post pages with author information and social sharing
- **IR Announcements**: Investor relations page with financial reports and corporate updates

### Design & UX

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Modern Animations**: Smooth transitions and hover effects using Framer Motion
- **Accessibility**: WCAG compliant with semantic HTML and proper ARIA labels
- **Performance Optimized**: Lazy loading, optimized images, and efficient bundle sizes

### Technical Features

- **SEO Optimized**: Meta tags, Open Graph, structured data, and XML sitemaps
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Form Validation**: Robust form handling with react-hook-form and Zod validation
- **Component Architecture**: Modular, reusable components with shadcn/ui
- **Syntax Highlighting**: Code blocks with Shiki for technical blog posts

## 🛠 Tech Stack

### Framework & Language

- **Next.js 13**: React framework with App Router and Server Components
- **TypeScript**: Full type safety and better developer experience
- **React 18**: Latest React features including concurrent rendering

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: High-quality React components built on Radix UI
- **Framer Motion**: Production-ready motion library for animations
- **Lucide React**: Beautiful, customizable SVG icons

### Content & Data

- **Markdoc**: Powerful, flexible, Markdown-based authoring framework
- **Shiki**: Syntax highlighter with VS Code themes
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation

### Development & Testing

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting (ready to configure)
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Simple and complete testing utilities

### Deployment & Performance

- **Cloudflare Pages**: Fast, secure, and reliable hosting
- **Static Export**: Optimized static site generation
- **Image Optimization**: Next.js Image component for performance
- **Bundle Analysis**: Webpack bundle analyzer for optimization

## 📦 Installation

### Prerequisites

- Node.js 18+ and pnpm (recommended package manager)
- Git for version control

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd flow-inc-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui
```

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages and dynamic routes
│   ├── ir/                # Investor relations pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── sections/          # Page sections (hero, services, etc.)
│   ├── ui/                # shadcn/ui components
│   ├── navigation.tsx     # Site navigation component
│   └── footer.tsx         # Site footer component
├── lib/                   # Utility functions and configurations
│   └── utils.ts           # Shared utility functions
├── public/                # Static assets (images, icons, etc.)
└── README.md              # Project documentation
```

### Content Management

#### Blog Posts

Blog posts are currently managed as TypeScript objects in the blog pages. For production, consider integrating with:

- **Contentful**: Headless CMS with rich content modeling
- **Sanity**: Real-time collaborative editing
- **Markdown files**: Git-based content workflow

#### Customization

1. **Branding**: Update colors, fonts, and logo in `tailwind.config.ts`
2. **Content**: Modify text content in component files
3. **Images**: Replace placeholder images in the `/public` directory
4. **SEO**: Update metadata in layout and page files

### Deployment

#### Cloudflare Pages (Recommended)

1. Connect your repository to Cloudflare Pages
2. Set build command: `pnpm build`
3. Set output directory: `out`
4. Configure environment variables
5. Deploy automatically on git push

#### Alternative Platforms

- **Vercel**: Seamless Next.js deployment
- **Netlify**: Static site hosting with form handling
- **AWS S3 + CloudFront**: Custom hosting solution

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Flow Inc."

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact Form (optional)
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
```

### Customization Options

#### Colors and Theming

Modify the color palette in `app/globals.css`:

```css
:root {
  --primary: 221 83% 53%; /* Blue primary color */
  --secondary: 210 40% 98%; /* Light secondary */
  --accent: 171 77% 64%; /* Emerald accent */
  /* Add more custom colors */
}
```

#### Typography

Update font configuration in `app/layout.tsx`:

```typescript
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
```

## 📊 Performance & SEO

### Performance Features

- **Static Generation**: Pre-rendered pages for faster loading
- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Automatic bundle splitting by Next.js
- **Prefetching**: Link prefetching for instant navigation

### SEO Implementation

- **Meta Tags**: Comprehensive meta tag management
- **Open Graph**: Social media preview optimization
- **Structured Data**: JSON-LD for rich search results
- **XML Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions

### Analytics Integration

Ready for analytics platforms:

- **Google Analytics 4**: User behavior tracking
- **Hotjar**: User session recordings
- **Mixpanel**: Event tracking and conversion analysis

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interaction and data flow
- **E2E Tests**: Full user journey testing (can be added with Playwright)

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage

# Run tests with UI
pnpm test:ui
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow TypeScript and React best practices
- Use meaningful component and variable names
- Add proper TypeScript types for all functions and components
- Write tests for new features and bug fixes

## 📄 License

This project is proprietary software owned by Flow Inc. All rights reserved.

## 📞 Support

For technical support or questions about the website:

- **Email**: tech@flow-inc.ai
- **Documentation**: [Internal Wiki](link-to-internal-docs)
- **Issues**: Use GitHub Issues for bug reports and feature requests

---

**Built with ❤️ by the Flow Inc. Team**

_Leveraging the power of AI to create exceptional web experiences._
