import React, { useState } from 'react';
import { XMarkIcon, PaperAirplaneIcon, PrinterIcon } from '@heroicons/react/24/outline';

const InvoiceDetailModal = ({ open, onClose, invoice }) => {
    const [activeTab, setActiveTab] = useState('details');

    if (!open) return null;

    // Mock Invoice Data if none passed
    const data = invoice || {
        number: 'INV-2025-00248',
        client: 'Acme Corp',
        amount: '₦537,500.00',
        status: 'pending',
        date: 'Dec 20, 2025',
        dueDate: 'Jan 20, 2026',
        items: [
            { desc: 'Consulting Services', qty: 10, price: 50000, total: 500000 }
        ]
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Invoice {data.number}</h2>
                        <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/10 mt-1">Pending Payment</span>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-200 px-6 flex gap-6">
                    {['Details', 'Payment History', 'Activity'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.toLowerCase() ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    {activeTab === 'details' && (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-3xl mx-auto">
                            {/* Invoice Preview */}
                            <div className="flex justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">INVOICE</h3>
                                    <p className="text-slate-500 text-sm"># {data.number}</p>
                                </div>
                                <div className="text-right">
                                    <h4 className="font-bold text-slate-900">TaxPadi Inc.</h4>
                                    <p className="text-sm text-slate-500">123 Tech Street, Lagos</p>
                                </div>
                            </div>

                            <div className="flex justify-between mb-8">
                                <div>
                                    <p className="text-xs uppercase text-slate-400 font-semibold mb-1">Bill To</p>
                                    <p className="font-bold text-slate-900">{data.client}</p>
                                    <p className="text-sm text-slate-500">Lagos, Nigeria</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase text-slate-400 font-semibold mb-1">Dates</p>
                                    <p className="text-sm text-slate-700"><span className="text-slate-400">Issued:</span> {data.date}</p>
                                    <p className="text-sm text-slate-700"><span className="text-slate-400">Due:</span> {data.dueDate}</p>
                                </div>
                            </div>

                            <table className="w-full mb-8">
                                <thead>
                                    <tr className="border-b-2 border-slate-100">
                                        <th className="text-left py-2 text-xs font-bold text-slate-500 uppercase">Description</th>
                                        <th className="text-right py-2 text-xs font-bold text-slate-500 uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map((item, i) => (
                                        <tr key={i} className="border-b border-slate-50">
                                            <td className="py-4 text-sm text-slate-700">
                                                <p className="font-medium text-slate-900">{item.desc}</p>
                                                <p className="text-xs text-slate-400">Qty: {item.qty} x {item.price}</p>
                                            </td>
                                            <td className="py-4 text-right text-sm font-bold text-slate-900">₦{item.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="border-t-2 border-slate-100 pt-4 flex justify-end">
                                <div className="w-1/2">
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span className="font-medium">₦500,000</span>
                                    </div>
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="text-slate-500">VAT (7.5%)</span>
                                        <span className="font-medium">₦37,500</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-slate-200 pt-2">
                                        <span className="text-slate-900">Total</span>
                                        <span className="text-teal-600">{data.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="max-w-2xl mx-auto">
                            <ul role="list" className="space-y-6">
                                <li className="relative flex gap-x-4">
                                    <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                        <div className="w-px bg-slate-200"></div>
                                    </div>
                                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        <div className="h-1.5 w-1.5 rounded-full bg-slate-100 ring-1 ring-slate-300"></div>
                                    </div>
                                    <p className="flex-auto py-0.5 text-xs leading-5 text-slate-500"><span className="font-medium text-slate-900">Invoice Created</span> by You - 2 days ago</p>
                                </li>
                                <li className="relative flex gap-x-4">
                                    <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                        <div className="w-px bg-slate-200"></div>
                                    </div>
                                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        <div className="h-1.5 w-1.5 rounded-full bg-slate-100 ring-1 ring-slate-300"></div>
                                    </div>
                                    <p className="flex-auto py-0.5 text-xs leading-5 text-slate-500"><span className="font-medium text-slate-900">Email Sent</span> to john@acme.com - 2 days ago</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-3 justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-all">
                        <PrinterIcon className="w-4 h-4" /> Print / PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-bold shadow-sm transition-all">
                        <PaperAirplaneIcon className="w-4 h-4" /> Resend Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailModal;
