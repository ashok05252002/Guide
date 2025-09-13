import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, DollarSign, Clock, BarChart3, FileText, Settings, ArrowRight } from 'lucide-react';

const Homepage = () => {
  const modules = [
    {
      icon: Users,
      title: 'Employee Management',
      description: 'Manage employee profiles, onboarding, and organizational structure',
      steps: 12,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'text-blue-600',
      slug: 'employee-management'
    },
    {
      icon: DollarSign,
      title: 'Payroll',
      description: 'Process payroll, manage salaries, taxes, and deductions',
      steps: 15,
      color: 'bg-green-50 border-green-200 text-green-700',
      iconColor: 'text-green-600',
      slug: 'payroll'
    },
    {
      icon: Clock,
      title: 'Attendance',
      description: 'Track time, manage leaves, and monitor attendance patterns',
      steps: 10,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      iconColor: 'text-purple-600',
      slug: 'attendance'
    },
    {
      icon: BarChart3,
      title: 'Reports',
      description: 'Generate comprehensive HR reports and analytics',
      steps: 8,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      iconColor: 'text-orange-600',
      slug: 'reports'
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Store and manage employee documents and policies',
      steps: 6,
      color: 'bg-red-50 border-red-200 text-red-700',
      iconColor: 'text-red-600',
      slug: 'documents'
    },
    {
      icon: Settings,
      title: 'System Settings',
      description: 'Configure system preferences and security settings',
      steps: 9,
      color: 'bg-gray-50 border-gray-200 text-gray-700',
      iconColor: 'text-gray-600',
      slug: 'settings'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-sf font-light text-gray-900 dark:text-white mb-6">
              Pro-People HRMS
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
              Your Step-by-Step Guide
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Master every feature of Pro-People HRMS with our comprehensive, easy-to-follow guides. 
              From employee management to advanced reporting, we'll help you become an expert.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-pistachio-500 mb-2">60+</div>
              <div className="text-gray-600 dark:text-gray-400">Step-by-Step Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pistachio-500 mb-2">6</div>
              <div className="text-gray-600 dark:text-gray-400">Core Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pistachio-500 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Video Guided</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sf font-light text-gray-900 dark:text-white mb-4">
              Choose Your Module
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Select a module below to start your guided learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <motion.div
                  key={module.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Link
                    to={`/guide/${module.slug}/1`}
                    className="group block"
                  >
                    <div className={`${module.color} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105 bg-white dark:bg-gray-800 dark:border-gray-700`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-white dark:bg-gray-700 ${module.iconColor}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>{module.steps} steps</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <h3 className="text-xl font-sf font-semibold text-gray-900 dark:text-white mb-2">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-sf font-light text-gray-900 dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Choose any module above to begin your step-by-step journey with Pro-People HRMS
            </p>
            <Link
              to="/guide/employee-management/1"
              className="inline-flex items-center px-8 py-3 bg-pistachio-400 hover:bg-pistachio-500 text-white font-medium rounded-xl transition-colors"
            >
              Start with Employee Management
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
