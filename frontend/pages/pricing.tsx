import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import PricingCard from '../components/pricing/PricingCard';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for small projects and startups',
    features: [
      { text: 'Up to 1,000 active users' },
      { text: 'Social login providers' },
      { text: 'Basic analytics' },
      { text: 'Email support' },
    ],
    ctaText: 'Start free trial',
    ctaLink: '/auth/signin',
  },
  {
    name: 'Pro',
    price: '$79',
    description: 'For growing businesses and applications',
    features: [
      { text: 'Up to 10,000 active users' },
      { text: 'All social login providers' },
      { text: 'Advanced analytics' },
      { text: 'Priority email support' },
      { text: 'Custom branding' },
    ],
    popular: true,
    ctaText: 'Start free trial',
    ctaLink: '/auth/signin',
  },
  {
    name: 'Enterprise',
    price: '$199',
    description: 'For large-scale applications and businesses',
    features: [
      { text: 'Unlimited active users' },
      { text: 'All social login providers' },
      { text: 'Enterprise analytics' },
      { text: '24/7 phone & email support' },
      { text: 'Custom branding' },
      { text: 'Dedicated account manager' },
    ],
    ctaText: 'Contact sales',
    ctaLink: '/book-demo',
  },
];

const faqs = [
  {
    question: "Can I cancel at any time?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
  },
  {
    question: "How does the free trial work?",
    answer: "All plans come with a 14-day free trial. No credit card required to start. You can upgrade to a paid plan at any time."
  }
];

const PricingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pricing | WebApp</title>
        <meta name="description" content="Choose the right plan for your authentication needs" />
      </Head>

      <Layout>
        <Section gradient>
          <SectionHeading
            title="Simple, transparent pricing"
            description="Choose the plan that's right for your business. All plans include a 14-day free trial."
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <SectionHeading
              title="Frequently asked questions"
              size="sm"
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <div key={index} className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </Layout>
    </>
  );
};

export default PricingPage; 