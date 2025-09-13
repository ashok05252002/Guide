import { faker } from '@faker-js/faker';

const moduleConfig = {
  'employee-management': {
    title: 'Employee Management',
    stepCount: 12,
    baseSteps: [
      'Setting up employee profiles',
      'Managing employee onboarding',
      'Updating employee information',
      'Setting up organizational structure',
      'Managing employee roles and permissions',
      'Handling employee transfers',
      'Processing employee terminations',
      'Managing employee benefits',
      'Setting up employee emergency contacts',
      'Configuring employee work schedules',
      'Managing employee performance reviews',
      'Generating employee reports'
    ]
  },
  'payroll': {
    title: 'Payroll',
    stepCount: 15,
    baseSteps: [
      'Setting up payroll configuration',
      'Adding salary components',
      'Configuring tax settings',
      'Setting up deduction rules',
      'Processing monthly payroll',
      'Handling overtime calculations',
      'Managing bonus distributions',
      'Processing salary advances',
      'Generating payslips',
      'Managing tax deductions',
      'Processing year-end calculations',
      'Handling payroll adjustments',
      'Setting up bank transfer details',
      'Managing payroll reports',
      'Configuring payroll approvals'
    ]
  },
  'attendance': {
    title: 'Attendance',
    stepCount: 10,
    baseSteps: [
      'Setting up attendance policies',
      'Configuring time tracking',
      'Managing shift schedules',
      'Processing leave requests',
      'Tracking overtime hours',
      'Managing holiday calendars',
      'Setting up attendance devices',
      'Generating attendance reports',
      'Handling attendance exceptions',
      'Configuring attendance notifications'
    ]
  },
  'reports': {
    title: 'Reports',
    stepCount: 8,
    baseSteps: [
      'Understanding report categories',
      'Generating employee reports',
      'Creating payroll analytics',
      'Building attendance summaries',
      'Customizing report templates',
      'Scheduling automated reports',
      'Exporting reports to Excel',
      'Setting up report dashboards'
    ]
  },
  'documents': {
    title: 'Document Management',
    stepCount: 6,
    baseSteps: [
      'Setting up document categories',
      'Uploading employee documents',
      'Managing document versions',
      'Setting document permissions',
      'Creating document templates',
      'Generating document reports'
    ]
  },
  'settings': {
    title: 'System Settings',
    stepCount: 9,
    baseSteps: [
      'Configuring company information',
      'Setting up user roles',
      'Managing system permissions',
      'Configuring email templates',
      'Setting up backup schedules',
      'Managing data security',
      'Configuring system notifications',
      'Setting up integrations',
      'Managing system maintenance'
    ]
  }
};

export const generateStepData = (module, stepNumber = null) => {
  const config = moduleConfig[module];
  if (!config) return null;

  if (stepNumber) {
    // Generate specific step data
    const stepIndex = stepNumber - 1;
    const stepTitle = config.baseSteps[stepIndex] || `Step ${stepNumber}`;
    
    return {
      title: stepTitle,
      description: `In this comprehensive step-by-step guide, you'll learn how to ${stepTitle.toLowerCase()} in Pro-People HRMS. This tutorial covers all the essential features and best practices to help you master this functionality efficiently.`,
      duration: `${faker.number.int({ min: 3, max: 8 })} min`,
      videoUrl: '/placeholder-video.mp4',
      objectives: [
        `Master the ${stepTitle.toLowerCase()} process`,
        'Understand key features and functionalities',
        'Learn best practices and common workflows',
        'Avoid common mistakes and troubleshooting tips'
      ],
      keyPoints: [
        'Always save your changes before moving to the next section',
        'Use the preview feature to verify your settings',
        'Contact support if you encounter any issues',
        'Regular backups are recommended for data safety'
      ]
    };
  } else {
    // Generate all steps for the module
    return {
      title: config.title,
      steps: config.baseSteps.map((title, index) => ({
        title,
        duration: `${faker.number.int({ min: 3, max: 8 })} min`,
        stepNumber: index + 1
      }))
    };
  }
};

export const searchSteps = (query) => {
  if (!query || query.trim() === '') return [];
  
  const results = [];
  const searchTerm = query.toLowerCase();
  
  Object.keys(moduleConfig).forEach(module => {
    const config = moduleConfig[module];
    config.baseSteps.forEach((stepTitle, index) => {
      const stepNumber = index + 1;
      const moduleTitle = config.title;
      
      // Search in step title, module title, and generate description
      if (
        stepTitle.toLowerCase().includes(searchTerm) ||
        moduleTitle.toLowerCase().includes(searchTerm) ||
        module.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          module,
          moduleTitle,
          stepNumber,
          title: stepTitle,
          description: `Learn how to ${stepTitle.toLowerCase()} in the ${moduleTitle} module of Pro-People HRMS.`,
          duration: `${faker.number.int({ min: 3, max: 8 })} min`
        });
      }
    });
  });
  
  return results;
};
