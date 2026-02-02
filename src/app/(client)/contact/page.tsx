'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { submitContactForm } from '@/actions/contact';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'We\'ll respond quickly',
    details: 'info@gocloudex.com',
    link: 'mailto:info@gocloudex.com'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon to Fri, 9am to 6pm',
    details: '+1 (311) 049-455',
    link: 'tel:+1311049455'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come say hello at our office',
    details: '123 Trishal-2220, Mymensingh, Bangladesh',
    link: 'https://maps.app.goo.gl/pm7A5FgYj7vfNtQU8'
  },
  {
    icon: Clock,
    title: 'Response Time',
    description: 'We value your time',
    details: 'Typically within 24 hours',
  }
];

const contactMessage = {}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setIsSubmitted(true);
        reset();
      } else {
        toast.error(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {

    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-greenType/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-greenType" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-headingLight mb-4 heading-style">
            Message Sent!
          </h1>
          <p className="text-textLight text-lg mb-8 text-style">
            Thank you for reaching out. We've received your message and will get back to you soon.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-colors text-style"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-bgLight to-accent/5 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
            <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="mt-6 text-xl text-textLight leading-relaxed max-w-3xl mx-auto text-style">
            Have a project in mind or want to discuss how we can help your business?
            We'd love to hear from you. Send us a message and we'll respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-headingLight mb-8 heading-style">
                Let's Talk
              </h2>
              <p className="text-textLight mb-8 text-style">
                Whether you're ready to start a project or just want to learn more
                about our services, we're here to help. Choose the most convenient
                way to reach out.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-headingLight mb-1 heading-style">
                          {item.title}
                        </h3>
                        <p className="text-textLight text-sm mb-2 text-style">
                          {item.description}
                        </p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-primary hover:text-hoverLinkLight transition-colors text-style"
                          >
                            {item.details}
                          </a>
                        ) : (
                          <p className="text-textLight text-style whitespace-pre-line">
                            {item.details}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-bgLight border border-border rounded-2xl shadow-sm p-3 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-headingLight heading-style">
                    Send us a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-headingLight mb-2 text-style">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style ${errors.name
                          ? 'border-redType focus:border-redType'
                          : 'border-border focus:border-ring'
                          }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <div className="flex items-center space-x-1 mt-2 text-redType text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.name.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-headingLight mb-2 text-style">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style ${errors.email
                          ? 'border-redType focus:border-redType'
                          : 'border-border focus:border-ring'
                          }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-center space-x-1 mt-2 text-redType text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.email.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-headingLight mb-2 text-style">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style ${errors.subject
                        ? 'border-redType focus:border-redType'
                        : 'border-border focus:border-ring'
                        }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <div className="flex items-center space-x-1 mt-2 text-redType text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.subject.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-headingLight mb-2 text-style">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-style ${errors.message
                        ? 'border-redType focus:border-redType'
                        : 'border-border focus:border-ring'
                        }`}
                      placeholder="Tell us about your project, questions, or how we can help you..."
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 mt-2 text-redType text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.message.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary text-bgLight rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 text-lg font-semibold text-style"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-textLight text-sm text-style">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-headingLight mb-4 heading-style">
            Frequently Asked Questions
          </h2>
          <p className="text-textLight text-lg mb-8 text-style">
            Quick answers to common questions about working with us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-headingLight mb-2 heading-style">
                  How soon will you respond?
                </h3>
                <p className="text-textLight text-style">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-headingLight mb-2 heading-style">
                  Do you work with international clients?
                </h3>
                <p className="text-textLight text-style">
                  Yes! We work with clients from all around the world and can accommodate different time zones.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-headingLight mb-2 heading-style">
                  What information should I include?
                </h3>
                <p className="text-textLight text-style">
                  Please include your project requirements, timeline, and budget for a more accurate response.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-headingLight mb-2 heading-style">
                  Do you offer free consultations?
                </h3>
                <p className="text-textLight text-style">
                  Absolutely! We offer free initial consultations to discuss your project needs and requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}