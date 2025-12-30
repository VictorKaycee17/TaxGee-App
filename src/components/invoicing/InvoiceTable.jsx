import React from 'react';
import {
    EyeIcon,
    PencilIcon,
    EllipsisVerticalIcon,
    TrashIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const InvoiceTable = ({ invoices, selectedIds, onSelect, onSelectAll }) => {

    // Status Badge Helpers
    const getStatusStyle = (status) => {
        const styles = {
            paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
            sent: 'bg-amber-50 text-amber-700 ring-amber-600/20',
            pending: 'bg-orange-50 text-orange-700 ring-orange-600/20',
            overdue: 'bg-rose-50 text-rose-700 ring-rose-600/20',
            draft: 'bg-slate-50 text-slate-600 ring-slate-500/10'
        };
        return styles[status.toLowerCase()] || styles.draft;
    };

    const getStatusIcon = (status) => {
        const icons = {
            paid: '🟢',
            sent: '🟡',
            pending: '🟠',
            overdue: '🔴',
            draft: '⚪'
        };
        return icons[status.toLowerCase()] || '⚪';
    };

    // Tax Badge Helper
    const getTaxStyle = (type) => {
        const styles = {
            VAT: 'bg-teal-50 text-teal-700 border-teal-200',
            WHT: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            DST: 'bg-amber-50 text-amber-700 border-amber-200',
            None: 'bg-slate-50 text-slate-600 border-slate-200'
        };
        return styles[type] || styles.None;
    };

    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto ring-1 ring-slate-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-slate-300">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                <input
                                    type="checkbox"
                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                    checked={selectedIds.length === invoices.length && invoices.length > 0}
                                    onChange={(e) => onSelectAll(e.target.checked)}
                                />
                            </th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Invoice #</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Client</th>
                            <th scope="col" className="px-3 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Amount</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Tax Type</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className={selectedIds.includes(invoice.id) ? 'bg-teal-50' : 'hover:bg-slate-50 transition-colors'}>
                                <td className="relative px-7 sm:w-12 sm:px-6">
                                    {selectedIds.includes(invoice.id) && (
                                        <div className="absolute inset-y-0 left-0 w-0.5 bg-teal-600" />
                                    )}
                                    <input
                                        type="checkbox"
                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                        checked={selectedIds.includes(invoice.id)}
                                        onChange={(e) => onSelect(invoice.id, e.target.checked)}
                                    />
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                    <div className="font-medium text-slate-900">{invoice.date}</div>
                                    <div className="text-xs text-slate-500">{invoice.dateRelative}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-teal-600 hover:text-teal-900 font-medium cursor-pointer underline-offset-2 hover:underline">
                                    {invoice.number}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <div className="font-medium text-slate-900">{invoice.client}</div>
                                    <div className="text-xs text-slate-500">{invoice.clientEmail}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-bold text-slate-900">
                                    {invoice.amount}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ring-1 ring-inset ${getTaxStyle(invoice.taxType.split(' ')[0])}`}>
                                        {invoice.taxType}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusStyle(invoice.status)}`}>
                                        <span className="text-[10px]">{getStatusIcon(invoice.status)}</span>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                                        <EllipsisVerticalIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {invoices.map((invoice) => (
                    <div key={invoice.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-slate-900">{invoice.number}</h3>
                                <p className="text-sm text-slate-500">{invoice.client}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusStyle(invoice.status)}`}>
                                {invoice.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Amount</p>
                                <p className="text-lg font-bold text-slate-900">{invoice.amount}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Due Date</p>
                                <p className="text-sm font-medium text-slate-700">{invoice.dueDate} <span className="text-xs font-normal text-slate-400">({invoice.dueRelative})</span></p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                            <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ring-1 ring-inset ${getTaxStyle(invoice.taxType.split(' ')[0])}`}>
                                {invoice.taxType}
                            </span>
                            <button className="text-slate-400 hover:text-slate-600">
                                <EllipsisVerticalIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default InvoiceTable;
