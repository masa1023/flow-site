import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blog - Flow Inc.',
  description:
    'Latest insights, tutorials, and news about AI development, machine learning, and business transformation.',
}

// Mock blog posts data
const blogPosts = [
  {
    id: 'getting-started-with-llm-agents',
    title: 'Getting Started with LLM Agents: A Comprehensive Guide',
    excerpt:
      'Learn how to build and deploy intelligent agents using Large Language Models for business automation.',
    content: 'This is a comprehensive guide to building LLM agents...',
    author: 'Alex Thompson',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['LLM', 'Agents', 'AI Development'],
    featured: true,
  },
  {
    id: 'rag-systems-best-practices',
    title: 'RAG Systems: Best Practices for Enterprise Implementation',
    excerpt:
      'Discover proven strategies for implementing Retrieval-Augmented Generation systems in enterprise environments.',
    content:
      'RAG systems have become essential for enterprise AI applications...',
    author: 'Sarah Martinez',
    date: '2024-01-10',
    readTime: '12 min read',
    tags: ['RAG', 'Enterprise', 'Best Practices'],
    featured: false,
  },
  {
    id: 'ai-training-roi-measurement',
    title: 'Measuring ROI from AI Training Programs',
    excerpt:
      'How to quantify the impact of AI education initiatives and demonstrate value to stakeholders.',
    content:
      'Measuring the ROI of AI training programs requires careful planning...',
    author: 'Rachel Kim',
    date: '2024-01-05',
    readTime: '6 min read',
    tags: ['Training', 'ROI', 'Business Strategy'],
    featured: false,
  },
  {
    id: 'future-of-ai-consulting',
    title: 'The Future of AI Consulting: Trends and Predictions',
    excerpt:
      'Explore the evolving landscape of AI consulting and what businesses should expect in the coming years.',
    content: 'The AI consulting landscape is rapidly evolving...',
    author: 'David Chen',
    date: '2024-01-01',
    readTime: '10 min read',
    tags: ['Consulting', 'Trends', 'Future'],
    featured: false,
  },
]

export default function BlogPage() {
  return notFound()
  // const featuredPost = blogPosts.find((post) => post.featured)
  // const regularPosts = blogPosts.filter((post) => !post.featured)

  // return (
  //   <div className="min-h-screen pt-16">
  //     {/* Header */}
  //     <section className="bg-gradient-to-br from-background via-background to-primary/5 py-16">
  //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="text-center max-w-3xl mx-auto">
  //           <h1 className="text-4xl md:text-5xl font-bold mb-4">
  //             Flow Inc. Blog
  //           </h1>
  //           <p className="text-xl text-muted-foreground">
  //             Insights, tutorials, and the latest news from the world of AI
  //             development and business transformation.
  //           </p>
  //         </div>
  //       </div>
  //     </section>

  //     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
  //       {/* Featured Post */}
  //       {featuredPost && (
  //         <div className="mb-16">
  //           <div className="flex items-center gap-2 mb-6">
  //             <Badge variant="default">Featured Post</Badge>
  //           </div>
  //           <Card className="overflow-hidden hover:shadow-lg transition-shadow">
  //             <div className="md:flex">
  //               <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-emerald-500/10 p-8 flex items-center justify-center">
  //                 <div className="text-center">
  //                   <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
  //                     <span className="text-2xl font-bold text-primary">
  //                       AI
  //                     </span>
  //                   </div>
  //                   <Badge variant="outline">Featured</Badge>
  //                 </div>
  //               </div>
  //               <div className="md:w-2/3">
  //                 <CardHeader>
  //                   <div className="flex flex-wrap gap-2 mb-2">
  //                     {featuredPost.tags.map((tag) => (
  //                       <Badge
  //                         key={tag}
  //                         variant="secondary"
  //                         className="text-xs"
  //                       >
  //                         <Tag className="w-3 h-3 mr-1" />
  //                         {tag}
  //                       </Badge>
  //                     ))}
  //                   </div>
  //                   <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
  //                     <Link href={`/blog/${featuredPost.id}`}>
  //                       {featuredPost.title}
  //                     </Link>
  //                   </h2>
  //                   <p className="text-muted-foreground mb-4">
  //                     {featuredPost.excerpt}
  //                   </p>
  //                 </CardHeader>
  //                 <CardContent>
  //                   <div className="flex items-center justify-between">
  //                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
  //                       <span>{featuredPost.author}</span>
  //                       <div className="flex items-center gap-1">
  //                         <Calendar className="w-4 h-4" />
  //                         {new Date(featuredPost.date).toLocaleDateString()}
  //                       </div>
  //                       <div className="flex items-center gap-1">
  //                         <Clock className="w-4 h-4" />
  //                         {featuredPost.readTime}
  //                       </div>
  //                     </div>
  //                     <Button variant="ghost" asChild>
  //                       <Link href={`/blog/${featuredPost.id}`}>
  //                         Read More
  //                         <ArrowRight className="w-4 h-4 ml-2" />
  //                       </Link>
  //                     </Button>
  //                   </div>
  //                 </CardContent>
  //               </div>
  //             </div>
  //           </Card>
  //         </div>
  //       )}

  //       {/* Regular Posts Grid */}
  //       <div>
  //         <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {regularPosts.map((post) => (
  //             <Card
  //               key={post.id}
  //               className="hover:shadow-lg transition-shadow h-full flex flex-col"
  //             >
  //               <CardHeader>
  //                 <div className="flex flex-wrap gap-2 mb-2">
  //                   {post.tags.slice(0, 2).map((tag) => (
  //                     <Badge key={tag} variant="secondary" className="text-xs">
  //                       <Tag className="w-3 h-3 mr-1" />
  //                       {tag}
  //                     </Badge>
  //                   ))}
  //                   {post.tags.length > 2 && (
  //                     <Badge variant="outline" className="text-xs">
  //                       +{post.tags.length - 2} more
  //                     </Badge>
  //                   )}
  //                 </div>
  //                 <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
  //                   <Link href={`/blog/${post.id}`}>{post.title}</Link>
  //                 </h3>
  //                 <p className="text-muted-foreground text-sm leading-relaxed">
  //                   {post.excerpt}
  //                 </p>
  //               </CardHeader>
  //               <CardContent className="flex-1 flex flex-col justify-between">
  //                 <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
  //                   <span>{post.author}</span>
  //                   <div className="flex items-center gap-1">
  //                     <Clock className="w-4 h-4" />
  //                     {post.readTime}
  //                   </div>
  //                 </div>
  //                 <div className="flex items-center justify-between">
  //                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
  //                     <Calendar className="w-4 h-4" />
  //                     {new Date(post.date).toLocaleDateString()}
  //                   </div>
  //                   <Button variant="ghost" size="sm" asChild>
  //                     <Link href={`/blog/${post.id}`}>
  //                       Read More
  //                       <ArrowRight className="w-4 h-4 ml-2" />
  //                     </Link>
  //                   </Button>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
