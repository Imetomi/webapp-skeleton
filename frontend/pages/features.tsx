import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';

const features = [
  {
    title: "Secure Authentication",
    description: "Implement industry-standard authentication with just a few lines of code. Support for multiple authentication methods including email/password, social logins, and multi-factor authentication.",
    image: "/features/auth.png",
    imagePosition: "right"
  },
  {
    title: "User Management",
    description: "Powerful dashboard to manage users, roles, and permissions. Monitor user activity, handle password resets, and manage access control with ease.",
    image: "/features/dashboard.png",
    imagePosition: "left"
  },
  {
    title: "Developer Experience",
    description: "Built with developers in mind. Comprehensive documentation, intuitive APIs, and SDKs for all major programming languages make integration a breeze.",
    image: "/features/developer.png",
    imagePosition: "right"
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security features including encryption at rest, audit logs, and compliance with industry standards. Keep your users' data safe and secure.",
    image: "/features/security.png",
    imagePosition: "left"
  }
];

const FeaturesPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Features | WebApp</title>
        <meta name="description" content="Explore the powerful features that make our authentication platform the choice of developers worldwide." />
      </Head>

      <Layout>
        <Section gradient>
          <SectionHeading
            title="Powerful Features for Modern Apps"
            description="Everything you need to implement secure, scalable authentication in your application."
          />

          {/* Feature Sections */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`flex flex-col ${feature.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
              >
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {feature.title}
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    {feature.description}
                  </p>
                  <Button asChild>
                    <Link href="/auth/signin">
                      Try it now <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </Button>
                </div>

                {/* Image/Screenshot */}
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="aspect-[4/3] relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <p className="text-gray-500 dark:text-gray-400">
                          Feature Screenshot
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center">
            <SectionHeading
              title="Ready to get started?"
              description="Join thousands of developers who are already using our platform."
              size="sm"
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link href="/auth/signin">
                  Start your free trial
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/book-demo">
                  Book a demo
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </Layout>
    </>
  );
};

export default FeaturesPage; 