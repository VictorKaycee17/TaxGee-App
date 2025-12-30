import React from 'react';
import {
    XMarkIcon,
    PrinterIcon,
    ArrowDownTrayIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';

const InvoiceDetailsModal = ({ invoice, onClose }) => {
    if (!invoice) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">{invoice.number}</h2>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">
                            {invoice.status}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors" title="Print">
                            <PrinterIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors" title="Download">
                            <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors" title="Email">
                            <EnvelopeIcon className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-slate-300 mx-2"></div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Invoice Preview */}
                    <div className="flex-1 bg-slate-100 p-8 overflow-y-auto">
                        <div className="bg-white shadow-lg p-10 min-h-[800px] w-full max-w-3xl mx-auto rounded-sm">
                            {/* Invoice Paper UI - Simplified */}
                            <div className="flex justify-between mb-10">
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900 mb-2">INVOICE</h1>
                                    <p className="text-slate-500">#{invoice.number}</p>
                                </div>
                                <div className="text-right">
                                    <h3 className="font-bold text-slate-900">TaxGee Inc.</h3>
                                    <p className="text-sm text-slate-500">123 Business Road</p>
                                    <p className="text-sm text-slate-500">Lagos, Nigeria</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Bill To</p>
                                    <h4 className="font-bold text-slate-900">{invoice.customer.name}</h4>
                                    <p className="text-sm text-slate-600">{invoice.customer.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Date</p>
                                    <p className="font-bold text-slate-900 mb-2">{invoice.date}</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Due Date</p>
                                    <p className="font-bold text-slate-900">{invoice.dueDate}</p>
                                </div>
                            </div>

                            <table className="w-full mb-10">
                                <thead className="border-b-2 border-slate-900">
                                    <tr>
                                        <th className="text-left py-3 font-bold">Description</th>
                                        <th className="text-center py-3 font-bold w-20">Qty</th>
                                        <th className="text-right py-3 font-bold w-32">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4">Professional Services</td>
                                        <td className="text-center py-4">1</td>
                                        <td className="text-right py-4">₦{invoice.amount.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="flex justify-end">
                                <div className="w-64 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Subtotal</span>
                                        <span className="font-bold">₦{invoice.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">VAT (7.5%)</span>
                                        <span className="font-bold">₦{(invoice.amount * 0.075).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-slate-900 pt-2 text-slate-900">
                                        <span>Total</span>
                                        <span>₦{(invoice.amount * 1.075).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar Actions */}
                    <div className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 overflow-y-auto">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Actions</h3>

                        <div className="space-y-3">
                            <button className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                                Record Payment
                            </button>
                            <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600">
                                Send Reminder
                            </button>
                            <button className="w-full py-2.5 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600">
                                Duplicate
                            </button>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">History</h3>
                            <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                                    <p className="text-xs text-slate-500 mb-0.5">Today, 10:30 AM</p>
                                    <p className="text-sm font-bold text-slate-900">Invoice Viewed</p>
                                    <p className="text-xs text-slate-500">Client viewed invoice</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                                    <p className="text-xs text-slate-500 mb-0.5">Yesterday, 4:15 PM</p>
                                    <p className="text-sm font-bold text-slate-900">Invoice Sent</p>
                                    <p className="text-xs text-slate-500">Sent to client@email.com</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                                    <p className="text-xs text-slate-500 mb-0.5">Yesterday, 4:10 PM</p>
                                    <p className="text-sm font-bold text-slate-900">Created</p>
                                    <p className="text-xs text-slate-500">Draft created by You</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailsModal;
