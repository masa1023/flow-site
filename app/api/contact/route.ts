import { NextRequest, NextResponse } from 'next/server'
import formData from 'form-data'
import Mailgun from 'mailgun.js'

const mailgun = new Mailgun(formData)

interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}

export async function POST(request: NextRequest) {
  const body: ContactFormData = await request.json()

  const { name, email, company, message } = body

  if (!name || !email || !company || !message) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    )
  }

  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
  const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !NOTIFICATION_EMAIL) {
    console.error('Missing required environment variables')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const mg = mailgun.client({
    username: 'api',
    key: MAILGUN_API_KEY,
  })

  const emailData = {
    from: `Flow Inc Contact Form <noreply@${MAILGUN_DOMAIN}>`,
    to: NOTIFICATION_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from the Flow Inc website contact form.</em></p>
      `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company}
Message: ${message}

This message was sent from the Flow Inc website contact form.
      `.trim(),
  }

  try {
    await mg.messages.create(MAILGUN_DOMAIN, emailData)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
