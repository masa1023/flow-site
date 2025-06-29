import { Metadata } from 'next'
import { Calendar, Download, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'IR Announcements - Flow Inc.',
  description:
    'Latest investor relations announcements, financial reports, and corporate updates from Flow Inc.',
}

// Mock IR announcements data
const announcements = [
  {
    id: 1,
    title: 'Flow Inc. Announces Q4 2023 Financial Results',
    date: '2024-01-30',
    type: 'Financial Report',
    summary:
      'Flow Inc. reported strong Q4 2023 results with 150% year-over-year revenue growth, driven by increased demand for AI development services.',
    status: 'Published',
    downloadUrl: '/documents/q4-2023-financial-report.pdf',
  },
  {
    id: 2,
    title: 'Series A Funding Round Completion',
    date: '2024-01-15',
    type: 'Funding',
    summary:
      'Flow Inc. successfully completed its Series A funding round, raising $25M to accelerate product development and market expansion.',
    status: 'Published',
    downloadUrl: '/documents/series-a-announcement.pdf',
  },
  {
    id: 3,
    title: 'Strategic Partnership with TechCorp Inc.',
    date: '2024-01-10',
    type: 'Partnership',
    summary:
      'Flow Inc. announces strategic partnership with TechCorp Inc. to deliver AI solutions to Fortune 500 companies.',
    status: 'Published',
    downloadUrl: '/documents/techcorp-partnership.pdf',
  },
  {
    id: 4,
    title: 'Appointment of New Chief Technology Officer',
    date: '2024-01-05',
    type: 'Leadership',
    summary:
      'Flow Inc. welcomes Dr. Sarah Martinez as Chief Technology Officer, bringing extensive experience in AI research and development.',
    status: 'Published',
    downloadUrl: '/documents/cto-appointment.pdf',
  },
  {
    id: 5,
    title: 'Q3 2023 Financial Results',
    date: '2023-10-30',
    type: 'Financial Report',
    summary:
      'Flow Inc. reported record Q3 2023 results with 120% year-over-year revenue growth and expanded client base.',
    status: 'Published',
    downloadUrl: '/documents/q3-2023-financial-report.pdf',
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Financial Report':
      return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800'
    case 'Funding':
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800'
    case 'Partnership':
      return 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800'
    case 'Leadership':
      return 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-200 dark:border-gray-800'
  }
}

export default function IRAnnouncementPage() {
  return notFound()

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-background via-background to-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Investor Relations
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with Flow Inc.'s latest announcements, financial
              reports, and corporate developments.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">150%</div>
              <div className="text-sm text-muted-foreground">
                YoY Revenue Growth
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-2">
                $25M
              </div>
              <div className="text-sm text-muted-foreground">
                Series A Funding
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Enterprise Clients
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recent Announcements</h2>
            <Badge variant="outline">
              {announcements.length} Total Announcements
            </Badge>
          </div>

          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(announcement.type)}>
                          {announcement.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {announcement.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {announcement.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(announcement.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {announcement.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Investor Relations Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">For Investor Inquiries</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  Email: investors@flow-inc.ai
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone: +1 (555) 123-4567
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Media Inquiries</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  Email: media@flow-inc.ai
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone: +1 (555) 123-4568
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
