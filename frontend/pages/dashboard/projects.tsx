import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const ProjectsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Projects
        </h1>
        
        {/* Empty state */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Get started by creating your first project.
            </p>
            <button
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage; 