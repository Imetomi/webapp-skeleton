import React from 'react';
import { Shield, Zap, Lock, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield size={24} />,
      title: 'Secure Authentication',
      description: "Industry-standard security protocols to keep your users' data safe and protected.",
    },
    {
      icon: <Zap size={24} />,
      title: 'Fast Integration',
      description: 'Implement authentication in minutes with our easy-to-use API and comprehensive documentation.',
    },
    {
      icon: <Lock size={24} />,
      title: 'Multi-factor Authentication',
      description: 'Add an extra layer of security with SMS, email, or app-based verification.',
    },
    {
      icon: <Users size={24} />,
      title: 'User Management',
      description: 'Easily manage users, roles, and permissions with our intuitive dashboard.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need for Authentication
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our platform provides all the tools you need to implement secure, scalable authentication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 