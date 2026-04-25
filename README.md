# Flow Inc. - AI-Native Corporate Website

A modern, responsive corporate website built for Flow Inc., an AI-Native startup specializing in AI development, training, and consulting services.

## ✨ Features

### Core Pages

- **Homepage**: Hero section, services, expertise, team, testimonials, and contact form
- **IR Announcements**: Investor relations page with financial reports and corporate updates
- **Internationalization**: Japanese (default) and English locales powered by next-intl

### Design & UX

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Modern Animations**: Smooth transitions and hover effects using Framer Motion
- **Accessibility**: WCAG compliant with semantic HTML and proper ARIA labels
- **Performance Optimized**: Code splitting, link prefetching, and efficient bundle sizes

### Technical Features

- **SEO Optimized**: Meta tags and Open Graph
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Form Validation**: Robust form handling with react-hook-form and Zod validation
- **Component Architecture**: Modular, reusable components with shadcn/ui

## 🛠 Tech Stack

### Framework & Language

- **Next.js 16**: React framework with App Router and Server Components
- **TypeScript**: Full type safety and better developer experience
- **React 19**: Latest React features including concurrent rendering

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: High-quality React components built on Radix UI
- **Framer Motion**: Production-ready motion library for animations
- **Lucide React**: Beautiful, customizable SVG icons

### Content & Data

- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation
- **next-intl**: Type-safe i18n with locale-aware routing

### Development

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting

## 📦 Installation

### Prerequisites

- Node.js 20+ and pnpm (recommended package manager)
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

# Run linter (auto-fix)
pnpm lint

# Run linter (check only)
pnpm lint:check

# Format files
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm type-check
```

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Locale-scoped routes (ja, en)
│   │   ├── ir/           # Investor relations pages
│   │   ├── layout.tsx    # Locale layout
│   │   └── page.tsx      # Homepage
│   ├── api/               # API route handlers
│   ├── globals.css        # Global styles and CSS variables
│   └── favicon.ico
├── components/            # Reusable React components
│   ├── sections/          # Page sections (hero, services, etc.)
│   ├── ui/                # shadcn/ui components
│   ├── navigation.tsx     # Site navigation component
│   ├── footer.tsx         # Site footer component
│   └── language-switcher.tsx  # Locale switcher
├── i18n/                  # next-intl configuration (routing, navigation)
├── messages/              # Locale message catalogs (ja.json, en.json)
├── lib/                   # Utility functions and configurations
│   └── utils.ts           # Shared utility functions
├── public/                # Static assets (images, icons, etc.)
├── proxy.ts               # next-intl request proxy (locale negotiation)
├── next.config.ts         # Next.js configuration
└── README.md              # Project documentation
```

### Customization

1. **Branding**: Update colors, fonts, and logo in `tailwind.config.ts`
2. **Content**: Modify text content in component files
3. **Images**: Replace placeholder images in the `/public` directory
4. **SEO**: Update metadata in layout and page files

### Deployment

The app uses Next.js server-side features (next-intl request proxy, dynamic locale routing), so static export is not supported. Deploy to a platform that runs the Next.js Node.js server.

- **Vercel** (recommended): Seamless Next.js deployment
- **Cloudflare Workers / Pages with `@opennextjs/cloudflare`**
- **Self-hosted Node.js**: `pnpm build && pnpm start`

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development. See `.env.example` for the current set of variables (e.g., Mailgun credentials for the contact form API route).

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

Update font configuration in `app/[locale]/layout.tsx`. The current setup uses Inter from `next/font/google`; add or replace fonts there as needed.

## 📊 Performance & SEO

### Performance Features

- **Code Splitting**: Automatic bundle splitting by Next.js
- **Prefetching**: Link prefetching for instant navigation

> Note: `images.unoptimized` is enabled in `next.config.ts`, so Next.js image optimization is currently bypassed.

### SEO Implementation

- **Meta Tags**: Comprehensive meta tag management
- **Open Graph**: Social media preview optimization

### Analytics

- **Vercel Analytics**: First-party page view and visitor tracking via `@vercel/analytics`

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

## 📄 License

This project is proprietary software owned by Flow Inc. All rights reserved.
