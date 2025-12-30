import React from 'react';
import { EyeIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const TransactionsTable = ({ transactions = [], onViewAll, onViewTransaction }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Recent Transactions ({transactions.length})
                </h3>
                {onViewAll && (
                    <button
                        onClick={onViewAll}
                        className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                    >
                        View All
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Time</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Terminal</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Method</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Category</th>
                            <th className="px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-5 py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {transactions.map(txn => (
                            <tr
                                key={txn.id}
                                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                onClick={() => onViewTransaction && onViewTransaction(txn)}
                            >
                                <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">{txn.time}</td>
                                <td className="px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">{txn.terminal}</td>
                                <td className="px-5 py-3 text-sm font-bold text-slate-900 dark:text-white">₦{txn.amount.toLocaleString()}</td>
                                <td className="px-5 py-3">
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium capitalize">
                                        {txn.method === 'card' && '💳'}
                                        {txn.method === 'cash' && '💵'}
                                        {txn.method === 'wallet' && '📱'}
                                        {txn.method}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{txn.category}</td>
                                <td className="px-5 py-3">
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                        ✓ Matched
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onViewTransaction && onViewTransaction(txn);
                                        }}
                                        className="text-slate-400 hover:text-teal-600 transition-colors p-1.5 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Showing 1-{transactions.length} of {transactions.length}</span>
                <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors disabled:opacity-50" disabled>
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button className="px-2.5 py-1 text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/30 rounded">1</button>
                    <button className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors">2</button>
                    <button className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors">3</button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionsTable;
