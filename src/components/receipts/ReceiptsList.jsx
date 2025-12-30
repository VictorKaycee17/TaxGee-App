import React from 'react';
import {
    EyeIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const ReceiptsList = ({ receipts, viewMode, onSelectionChange, onViewReceipt }) => {

    const StatusBadge = ({ status }) => {
        const styles = {
            processed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
            pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            flagged: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
        };
        const icons = {
            processed: <CheckCircleIcon className="w-3 h-3" />,
            pending: <DocumentTextIcon className="w-3 h-3" />,
            flagged: <ExclamationCircleIcon className="w-3 h-3" />
        };

        return (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 w-fit ${styles[status]}`}>
                {icons[status]}
                {status}
            </span>
        );
    };

    if (viewMode === 'grid') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {receipts.map(receipt => (
                    <div
                        key={receipt.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer relative"
                        onClick={() => onViewReceipt(receipt)}
                    >
                        {/* Checkbox overlay */}
                        <div className="absolute top-3 left-3 z-10" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm" />
                        </div>

                        {/* Image Preview Area */}
                        <div className="h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative border-b border-slate-100 dark:border-slate-800">
                            {/* Placeholder for receipt image */}
                            <div className="text-center">
                                <DocumentTextIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                                <span className="text-xs text-slate-400 font-bold uppercase">Receipt Preview</span>
                            </div>

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="bg-white/90 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm backdrop-blur-sm">View Details</button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-xs text-slate-500 font-bold mb-0.5">{receipt.date}</p>
                                    <h3 className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{receipt.vendor}</h3>
                                </div>
                                <StatusBadge status={receipt.status} />
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                    {receipt.category}
                                </span>
                                <span className="font-black text-slate-900 dark:text-white">₦{receipt.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Table Mode
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 font-bold">
                        <th className="p-4 w-12"><input type="checkbox" className="w-4 h-4 rounded" /></th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Vendor</th>
                        <th className="p-4 text-right">Amount</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Tax Type</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 w-16"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {receipts.map(receipt => (
                        <tr key={receipt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => onViewReceipt(receipt)}>
                            <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 border-slate-300" />
                            </td>
                            <td className="p-4 text-sm text-slate-600">{receipt.date}</td>
                            <td className="p-4 text-sm font-bold text-slate-900">{receipt.vendor}</td>
                            <td className="p-4 text-sm font-bold text-slate-900 text-right">₦{receipt.amount.toLocaleString()}</td>
                            <td className="p-4"><span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{receipt.category}</span></td>
                            <td className="p-4 text-sm text-slate-600">{receipt.taxType}</td>
                            <td className="p-4"><StatusBadge status={receipt.status} /></td>
                            <td className="p-4 text-center">
                                <button className="text-slate-400 hover:text-indigo-600">
                                    <EyeIcon className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReceiptsList;
