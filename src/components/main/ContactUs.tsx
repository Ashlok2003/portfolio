'use client'

import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'
import { FC, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export const ContactUs: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('MESSAGE_DELIVERED')
        toast.success('Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('ERROR_FAILED_TO_SEND')
        toast.error('Failed to send message.')
      }
    } catch {
      setStatus('ERROR_CONNECTION_REFUSED')
      toast.error('An error occurred.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const inputClasses = "w-full px-3.5 py-2.5 bg-transparent border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand-blue/60 focus:ring-1 focus:ring-brand-blue/15 transition-all duration-200"

  return (
    <section id="contact" className="relative w-full bg-background transition-colors">
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        {/* Left Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Cell */}
        <div className="relative border-x border-border min-[880px]:border-x-0 px-6 py-12">
          {/* Section Header on Border Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background px-4 whitespace-nowrap">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              DISPATCH MESSAGE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 items-start">

            {/* Left Side */}
            <div className="flex flex-col justify-between h-full gap-8">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                  Let&apos;s Build<br />Something Together
                </h3>
                <p className="text-[13px] text-muted-foreground/70 leading-relaxed">
                  Whether you have a project in mind, a technical challenge, or just want to connect — I&apos;d love to hear from you.
                </p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:chaudharyashlok@gmail.com"
                  className="group flex items-start gap-3 hover:translate-x-0.5 transition-transform duration-200"
                >
                  <div className="shrink-0 mt-0.5 text-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground/90 group-hover:text-brand-blue transition-colors">
                      chaudharyashlok@gmail.com
                    </span>
                    <span className="block text-[11px] text-muted-foreground/70 mt-0.5">Preferred for project inquiries</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+917767012860"
                  className="group flex items-start gap-3 hover:translate-x-0.5 transition-transform duration-200"
                >
                  <div className="shrink-0 mt-0.5 text-foreground">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground/90 group-hover:text-brand-blue transition-colors">
                      +91 77670 12860
                    </span>
                    <span className="block text-[11px] text-muted-foreground/70 mt-0.5">Available Mon–Sat, 10am–7pm IST</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 text-foreground">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground/90">
                      Mumbai, India
                    </span>
                    <span className="block text-[11px] text-muted-foreground/70 mt-0.5">Open to remote & hybrid roles</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground/80">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>Currently available for new opportunities</span>
              </div>
            </div>

            {/* Right Side: Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-muted-foreground text-[9px] font-mono uppercase tracking-widest block">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-muted-foreground text-[9px] font-mono uppercase tracking-widest block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-muted-foreground text-[9px] font-mono uppercase tracking-widest block">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project collaboration, technical inquiry..."
                  required
                  className={inputClasses}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-muted-foreground text-[9px] font-mono uppercase tracking-widest block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={6}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-foreground hover:bg-foreground/90 text-background rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-black/10"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status && (
                <div className={`p-3 rounded text-center text-xs font-medium ${
                  status.includes('DELIVERED')
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-destructive/10 border border-destructive/20 text-destructive'
                }`}>
                  {status.includes('DELIVERED') ? '✓ Message sent successfully' : 'Failed to send — please try again'}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>
    </section>
  )
}

export default ContactUs
