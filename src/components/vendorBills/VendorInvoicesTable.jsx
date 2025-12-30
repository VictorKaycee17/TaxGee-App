import React, { useState } from 'react';
import {
    EyeIcon,
    EllipsisHorizontalIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

const VendorInvoicesTable = ({ invoices = [], onViewInvoice, onSelectionChange }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = invoices.map(i => i.id);
            setSelectedRows(allIds);
            onSelectionChange && onSelectionChange(allIds);
        } else {
            setSelectedRows([]);
            onSelectionChange && onSelectionChange([]);
        }
    };

    const handleSelectRow = (id) => {
        let newSelection = [];
        if (selectedRows.includes(id)) {
            newSelection = selectedRows.filter(rowId => rowId !== id);
        } else {
            newSelection = [...selectedRows, id];
        }
        setSelectedRows(newSelection);
        onSelectionChange && onSelectionChange(newSelection);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'matched':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"><CheckCircleIcon className="w-3.5 h-3.5" /> Matched</span>;
            case 'unmatched':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"><ClockIcon className="w-3.5 h-3.5" /> Unmatched</span>;
            case 'disputed':
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"><ExclamationTriangleIcon className="w-3.5 h-3.5" /> Disputed</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">Pending</span>;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            {/* Bulk Actions Header (visible when selection > 0) */}
            {selectedRows.length > 0 && (
                <div className="bg-indigo-50 dark:bg-indigo-900/30 px-6 py-3 border-b border-indigo-100 dark:border-indigo-800 flex justify-between items-center animate-in slide-in-from-top-2">
                    <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{selectedRows.length} invoices selected</span>
                    <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-colors">Delete Selected</button>
                        <button className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm">Bulk Link</button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 w-12">
                                <input
                                    type="checkbox"
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                                    checked={selectedRows.length === invoices.length && invoices.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">VAT (Input)</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">WHT</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 w-16"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                            <ExclamationTriangleIcon className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <p>No invoices found matching your filters.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            invoices.map((invoice, idx) => (
                                <tr
                                    key={invoice.id}
                                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${selectedRows.includes(invoice.id) ? 'bg-indigo-50/30' : ''}`}
                                    onClick={() => handleSelectRow(invoice.id)}
                                >
                                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                                            checked={selectedRows.includes(invoice.id)}
                                            onChange={() => handleSelectRow(invoice.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">{invoice.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{invoice.vendor}</span>
                                            <span className="text-xs text-slate-500">{invoice.invoiceNumber}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">₦{invoice.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                        {invoice.vatAmount > 0 ? `₦${invoice.vatAmount.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                        {invoice.whtAmount > 0 ? `₦${invoice.whtAmount.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewInvoice && onViewInvoice(invoice);
                                            }}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-all"
                                        >
                                            <EyeIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
                <span className="text-xs text-slate-500">Showing {Math.min(invoices.length, (page - 1) * itemsPerPage + 1)} to {Math.min(invoices.length, page * itemsPerPage)} of {invoices.length} invoices</span>

                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronLeftIcon className="w-4 h-4 text-slate-500" />
                    </button>
                    {[1, 2, 3].map(p => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${page === p ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(page + 1)}
                        className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronRightIcon className="w-4 h-4 text-slate-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorInvoicesTable;
