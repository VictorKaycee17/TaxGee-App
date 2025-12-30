import React, { useState } from 'react';
import {
    XMarkIcon,
    UserPlusIcon,
    TrashIcon,
    PlusIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const CreateInvoiceWizard = ({ open, onClose }) => {
    const [step, setStep] = useState(1);
    const [lineItems, setLineItems] = useState([
        { id: 1, description: 'Consulting Services', qty: 10, rate: 50000, tax: true }
    ]);

    if (!open) return null;

    const addLineItem = () => {
        setLineItems([...lineItems, { id: Date.now(), description: '', qty: 1, rate: 0, tax: true }]);
    };

    const removeLineItem = (id) => {
        setLineItems(lineItems.filter(item => item.id !== id));
    };

    const calculateTotals = () => {
        const subtotal = lineItems.reduce((sum, item) => sum + (item.qty * item.rate), 0);
        const vat = subtotal * 0.075; // 7.5% VAT
        return { subtotal, vat, total: subtotal + vat };
    };

    const totals = calculateTotals();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Invoice</h2>
                        <p className="text-xs text-slate-500">INV-2025-004</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Steps */}
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                    {['Select Customer', 'Invoice Details', 'Review & Send'].map((s, idx) => (
                        <div
                            key={idx}
                            className={`flex-1 py-3 text-center text-sm font-bold border-b-2 transition-colors ${step === idx + 1 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
                        >
                            <span className="mr-2 opacity-50">{idx + 1}.</span>
                            {s}
                        </div>
                    ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {step === 1 && (
                        <div className="max-w-xl mx-auto space-y-6">
                            <div className="text-center mb-8">
                                <h3 className="text-lg font-bold">Who is this invoice for?</h3>
                                <p className="text-slate-500">Select an existing customer or add a new one.</p>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs font-bold text-slate-500 uppercase">Recent Customers</p>
                                {['Acme Corp', 'Tech Services Ltd', 'Global Ventures'].map(c => (
                                    <div key={c} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-slate-50 cursor-pointer transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center">
                                                {c.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{c}</p>
                                                <p className="text-xs text-slate-500">contact@{c.toLowerCase().replace(/\s/g, '')}.com</p>
                                            </div>
                                        </div>
                                        <div className="w-4 h-4 rounded-full border border-slate-300 group-hover:bg-indigo-600 group-hover:border-indigo-600"></div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                                <UserPlusIcon className="w-5 h-5" />
                                Create New Customer
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Invoice Date</label>
                                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg" defaultValue="2025-12-25" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Due Date</label>
                                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg" defaultValue="2026-01-24" />
                                </div>
                            </div>

                            <table className="w-full text-left">
                                <thead className="text-xs text-slate-500 uppercase border-b border-slate-200">
                                    <tr>
                                        <th className="py-2 w-1/2">Description</th>
                                        <th className="py-2 w-20">Qty</th>
                                        <th className="py-2 w-32">Rate (₦)</th>
                                        <th className="py-2 w-32 text-right">Amount</th>
                                        <th className="py-2 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {lineItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-3 pr-2">
                                                <input
                                                    type="text"
                                                    className="w-full px-2 py-1 border border-slate-200 rounded focus:border-indigo-500 outline-none"
                                                    defaultValue={item.description}
                                                    placeholder="Item description"
                                                />
                                            </td>
                                            <td className="py-3 pr-2">
                                                <input
                                                    type="number"
                                                    className="w-full px-2 py-1 border border-slate-200 rounded focus:border-indigo-500 outline-none"
                                                    defaultValue={item.qty}
                                                />
                                            </td>
                                            <td className="py-3 pr-2">
                                                <input
                                                    type="number"
                                                    className="w-full px-2 py-1 border border-slate-200 rounded focus:border-indigo-500 outline-none"
                                                    defaultValue={item.rate}
                                                />
                                            </td>
                                            <td className="py-3 text-right font-bold text-slate-700">
                                                {(item.qty * item.rate).toLocaleString()}
                                            </td>
                                            <td className="py-3 text-right">
                                                <button onClick={() => removeLineItem(item.id)} className="text-slate-400 hover:text-rose-500">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button onClick={addLineItem} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                <PlusIcon className="w-4 h-4" /> Add Line Item
                            </button>

                            <div className="flex justify-end mt-4">
                                <div className="w-64 space-y-2 text-sm">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span>₦{totals.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>VAT (7.5%)</span>
                                        <span>₦{totals.vat.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg text-slate-900 border-t border-slate-200 pt-2">
                                        <span>Total</span>
                                        <span>₦{totals.total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col h-full items-center justify-center text-center space-y-6">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                <PaperAirplaneIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Ready to Send?</h3>
                                <p className="text-slate-500 max-w-sm mx-auto">
                                    We'll send this invoice to <span className="font-bold">contact@acmecorp.com</span> and enable payment tracking.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full max-w-sm text-left">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-500 text-sm">Invoice Amount</span>
                                    <span className="font-bold text-slate-900">₦{totals.total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-500 text-sm">Due Date</span>
                                    <span className="font-bold text-slate-900">Jan 24, 2026</span>
                                </div>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                                    <span className="text-sm text-slate-600">Attach PDF to email</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
                    <div>
                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800">
                                Back
                            </button>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800">
                            Save as Draft
                        </button>
                        <button
                            onClick={() => step < 3 ? setStep(step + 1) : onClose()}
                            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                        >
                            {step === 3 ? 'Send Invoice' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateInvoiceWizard;
