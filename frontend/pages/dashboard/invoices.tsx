import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const InvoicesPage: React.FC = () => {
  // Mock data for invoices
  const invoices = [
    {
      id: 1,
      date: '2024-03-01',
      amount: 79.00,
      status: 'paid',
      downloadUrl: '#',
      viewUrl: '#'
    },
    {
      id: 2,
      date: '2024-02-01',
      amount: 79.00,
      status: 'paid',
      downloadUrl: '#',
      viewUrl: '#'
    },
    {
      id: 3,
      date: '2024-01-01',
      amount: 79.00,
      status: 'paid',
      downloadUrl: '#',
      viewUrl: '#'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Invoices
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Billing History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(invoice.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(invoice.downloadUrl, '_blank')}
                        >
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(invoice.viewUrl, '_blank')}
                        >
                          <ExternalLink size={16} className="mr-1" />
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {invoices.length === 0 && (
            <div className="text-center py-6">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No invoices</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You haven't been billed yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoicesPage; 