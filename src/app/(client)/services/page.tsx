'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle,
  Star
} from 'lucide-react';
import { serviceMegaMenu } from '@/data/navigation';


// Flatten all services from mega menu data
const allServices = serviceMegaMenu.columns.flatMap(column => 
  column.items.map(service => ({
    ...service,
    category: column.title
  }))
);

const featuredServices = allServices.filter(service => service.featured);
const otherServices = allServices.filter(service => !service.featured);

export default function ServicesPage() {
  return (
    <div className="bg-bgLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-bgLight to-accent/5 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight heading-style">
            <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="mt-6 text-xl text-textLight leading-relaxed max-w-3xl mx-auto text-style">
            Comprehensive digital solutions tailored to drive your business growth and success 
            in the modern digital landscape.
          </p>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              Featured Services
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Our most popular services that deliver exceptional results for businesses of all sizes.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-bgLight rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-1 bg-primary text-bgLight px-3 py-1 rounded-full text-sm">
                      <Star className="h-3 w-3" />
                      <span className="text-xs font-medium text-style">Featured</span>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="h-8 w-8 text-primary group-hover:text-bgLight transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-headingLight mb-4 heading-style">
                      {service.title}
                    </h3>
                    <p className="text-textLight leading-relaxed mb-6 text-style">
                      {service.description}
                    </p>

                    {/* Category */}
                    <div className="mb-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-input text-textLight text-style">
                        {service.category}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features?.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-textLight text-sm text-style">
                          <CheckCircle className="h-4 w-4 text-greenType mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <Link
                      href={service.link}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-all duration-200 transform group-hover:-translate-y-0.5 text-style"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-24 bg-gradient-to-br from-input to-bgLight border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-headingLight sm:text-4xl heading-style">
              All Services
            </h2>
            <p className="mt-4 text-lg text-textLight max-w-2xl mx-auto text-style">
              Explore our complete range of digital services designed to meet all your business needs.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {otherServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={service.link}
                  className="group flex items-start space-x-6 p-6 bg-bgLight rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-input rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary group-hover:text-bgLight transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-headingLight group-hover:text-primary transition-colors heading-style">
                          {service.title}
                        </h3>
                        <p className="text-textLight text-sm mt-2 line-clamp-2 text-style">
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-textLight group-hover:text-primary flex-shrink-0 mt-1 ml-4 transition-colors" />
                    </div>
                    <div className="mt-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-input text-textLight text-style">
                        {service.category}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bgDark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-headingDark sm:text-4xl heading-style">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-xl text-textDark max-w-2xl mx-auto text-style">
            Let&apos;s discuss your project requirements and find the perfect solution for your business.
          </p>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-bgLight bg-primary hover:bg-primary-dark rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl text-style"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}