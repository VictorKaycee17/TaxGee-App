import React from 'react';
import {
    EyeIcon,
    EllipsisHorizontalIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const InvoicesTable = ({ invoices, onSelectionChange, onViewInvoice }) => {

    // Status Badge Helper
    const StatusBadge = ({ status }) => {
        const styles = {
            paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
            sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
            overdue: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
        };

        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 w-fit ${styles[status] || styles.draft}`}>
                {status === 'paid' && <CheckCircleIcon className="w-3 h-3" />}
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 font-bold">
                            <th className="p-4 w-12">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            </th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Invoice #</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4 text-right">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Due Date</th>
                            <th className="p-4 w-20 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => onSelectionChange(invoice.id, e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </td>
                                <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{invoice.date}</td>
                                <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{invoice.number}</td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{invoice.customer.name}</span>
                                        <span className="text-xs text-slate-500">{invoice.customer.email}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm font-bold text-slate-900 dark:text-white text-right">
                                    ₦{invoice.amount.toLocaleString()}
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={invoice.status} />
                                </td>
                                <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                                    {invoice.dueDate}
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onViewInvoice(invoice)}
                                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <EyeIcon className="w-5 h-5" />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                            <EllipsisHorizontalIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500">
                <span>Showing 1-10 of {invoices.length} invoices</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
                </div>
            </div>
        </div>
    );
};

export default InvoicesTable;
