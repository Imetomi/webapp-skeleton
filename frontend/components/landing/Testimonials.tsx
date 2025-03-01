import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, avatarUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <svg className="h-8 w-8 text-accent-500" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{quote}</p>
        
        <div className="flex items-center">
          <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <Avatar.Image
              className="h-full w-full object-cover"
              src={avatarUrl || ''}
              alt={author}
            />
            <Avatar.Fallback className="text-accent-500 dark:text-accent-400 font-medium text-sm leading-none" delayMs={600}>
              {author.split(' ').map(n => n[0]).join('')}
            </Avatar.Fallback>
          </Avatar.Root>
          
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{author}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{role}, {company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Implementing authentication used to take weeks. With this platform, we were up and running in a single day. The Firebase integration is seamless.",
      author: "Alex Johnson",
      role: "CTO",
      company: "TechStart Inc.",
    },
    {
      quote: "The user management dashboard is intuitive and powerful. We've been able to scale our user base without any authentication headaches.",
      author: "Sarah Chen",
      role: "Lead Developer",
      company: "GrowthApp",
    },
    {
      quote: "Security is our top priority, and this platform exceeds all our requirements. The multi-factor authentication was easy to implement and our users love it.",
      author: "Michael Rodriguez",
      role: "Security Engineer",
      company: "SecureData",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Developers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See what others are saying about our authentication platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 