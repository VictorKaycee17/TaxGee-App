import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const IncomeTable = () => {
    // Mock Data
    const incomeData = [
        { id: 1, date: '2025-10-25', source: 'ABC Company', type: 'Salary', description: 'October Salary', gross: 520000, tax: 78000, net: 442000 },
        { id: 2, date: '2025-10-15', source: 'Client X', type: 'Freelance', description: 'Web Dev Project', gross: 250000, tax: 12500, net: 237500 },
        { id: 3, date: '2025-09-25', source: 'ABC Company', type: 'Salary', description: 'September Salary', gross: 520000, tax: 78000, net: 442000 },
        { id: 4, date: '2025-09-10', source: 'Tenant A', type: 'Rental', description: 'Apartment Rent', gross: 150000, tax: 0, net: 150000 },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 shadow-sm rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden mx-6 mb-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tax Paid</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Net Detail</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                        {incomeData.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                                    {item.source}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === 'Salary' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                            item.type === 'Freelance' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                                                'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                        }`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-900 dark:text-white">
                                    ₦{item.gross.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-500 dark:text-red-400">
                                    {item.tax > 0 ? `-₦${item.tax.toLocaleString()}` : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-600 dark:text-green-400">
                                    ₦{item.net.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-dark p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                    Showing 1 to 4 of 12 entries
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800">
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncomeTable;
