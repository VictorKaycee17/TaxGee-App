import React, { useState } from 'react';
import {
    XMarkIcon,
    UserPlusIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

const CreateInvoiceModal = ({ open, onClose }) => {
    const [step, setStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        client: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        items: [{ id: 1, description: '', quantity: 1, price: 0, taxaable: true }],
        taxType: 'VAT',
        notes: ''
    });

    if (!open) return null;

    // Helpers
    const calculateSubtotal = () => {
        return formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const calculateTax = () => {
        const subtotal = calculateSubtotal();
        const rates = { 'VAT': 0.075, 'WHT': 0.05, 'DST': 0.005, 'None': 0 };
        return subtotal * (rates[formData.taxType] || 0);
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { id: Date.now(), description: '', quantity: 1, price: 0, taxable: true }]
        });
    };

    const removeItem = (id) => {
        setFormData({
            ...formData,
            items: formData.items.filter(item => item.id !== id)
        });
    };

    const updateItem = (id, field, value) => {
        setFormData({
            ...formData,
            items: formData.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Create New Invoice</h2>
                        <div className="flex items-center gap-2 mt-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`h-1.5 w-8 rounded-full ${step >= i ? 'bg-teal-500' : 'bg-slate-300'}`} />
                            ))}
                            <span className="text-xs text-slate-500 ml-2">Step {step} of 4</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8">

                    {/* Step 1: Client Selection */}
                    {step === 1 && (
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h3 className="text-xl font-bold text-slate-800">Who is this invoice for?</h3>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-slate-700">Select Client</label>
                                <div className="relative">
                                    <select
                                        className="block w-full rounded-lg border-slate-300 py-3 px-4 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        value={formData.client}
                                        onChange={e => setFormData({ ...formData, client: e.target.value })}
                                    >
                                        <option value="">Select a client...</option>
                                        <option value="acme">Acme Corp (john@acme.com)</option>
                                        <option value="jane">Jane Doe (jane@email.com)</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-4 my-6">
                                    <div className="h-px bg-slate-200 flex-1"></div>
                                    <span className="text-sm text-slate-400">OR</span>
                                    <div className="h-px bg-slate-200 flex-1"></div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-medium hover:border-teal-500 hover:text-teal-600 transition-colors bg-slate-50 hover:bg-white">
                                    <UserPlusIcon className="w-5 h-5" />
                                    Create New Client
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Invoice Details */}
                    {step === 2 && (
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h3 className="text-xl font-bold text-slate-800">Invoice Details</h3>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Date</label>
                                    <input
                                        type="date"
                                        className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        value={formData.dueDate}
                                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Number (Auto-generated)</label>
                                <input
                                    type="text"
                                    readOnly
                                    value="INV-2025-00248"
                                    className="block w-full rounded-lg bg-slate-100 border-slate-300 text-slate-500 shadow-sm cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Optional Note</label>
                                <textarea
                                    rows={4}
                                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                    placeholder="Add a note for the client..."
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Line Items */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-800">Line Items</h3>
                                <button onClick={addItem} className="text-teal-600 text-sm font-bold flex items-center gap-1 hover:text-teal-700">
                                    <PlusIcon className="w-4 h-4" /> Add Item
                                </button>
                            </div>

                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase w-20">Qty</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase w-32">Price</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase w-32">Amount</th>
                                            <th className="px-4 py-3 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {formData.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        className="w-full border-0 p-1 focus:ring-0 text-sm"
                                                        placeholder="Item description"
                                                        value={item.description}
                                                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        className="w-full border-0 p-1 focus:ring-0 text-sm text-right"
                                                        value={item.quantity}
                                                        onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        className="w-full border-0 p-1 focus:ring-0 text-sm text-right"
                                                        value={item.price}
                                                        onChange={e => updateItem(item.id, 'price', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-right text-sm font-semibold text-slate-700">
                                                    ₦{(item.quantity * item.price).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-500">
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end">
                                <div className="w-64 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span className="font-semibold">₦{calculateSubtotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <select
                                            className="text-xs border-slate-200 rounded p-1 text-slate-600"
                                            value={formData.taxType}
                                            onChange={e => setFormData({ ...formData, taxType: e.target.value })}
                                        >
                                            <option value="VAT">VAT (7.5%)</option>
                                            <option value="WHT">WHT (5%)</option>
                                            <option value="DST">DST (0.5%)</option>
                                            <option value="None">No Tax</option>
                                        </select>
                                        <span className="font-semibold text-red-600">+ ₦{calculateTax().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-base border-t pt-3">
                                        <span className="font-bold text-slate-800">Total</span>
                                        <span className="font-black text-teal-600">₦{(calculateSubtotal() + calculateTax()).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="max-w-3xl mx-auto bg-slate-50 p-8 rounded-xl border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Review Invoice</h3>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Bill To</p>
                                    <p className="font-bold text-slate-900">Acme Corp</p>
                                    <p className="text-sm text-slate-600">john@acme.com</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Invoice Details</p>
                                    <p className="font-bold text-slate-900">#INV-2025-00248</p>
                                    <p className="text-sm text-slate-600">Due: {formData.dueDate || 'Not set'}</p>
                                </div>
                            </div>

                            <table className="w-full mb-8">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Item</th>
                                        <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.items.map(item => (
                                        <tr key={item.id} className="border-b border-slate-100">
                                            <td className="py-2 text-sm text-slate-700">{item.description || 'Item'} x {item.quantity}</td>
                                            <td className="py-2 text-sm font-semibold text-right text-slate-900">₦{(item.quantity * item.price).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-end">
                                <div className="text-right">
                                    <p className="text-sm text-slate-500">Total Due</p>
                                    <p className="text-3xl font-black text-teal-600">₦{(calculateSubtotal() + calculateTax()).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                    <button
                        onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                        className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800"
                    >
                        {step === 1 ? 'Cancel' : 'Back'}
                    </button>

                    <button
                        onClick={() => step < 4 ? setStep(step + 1) : onClose()} // Finish action
                        className="px-6 py-2.5 bg-teal-500 text-white text-sm font-bold rounded-lg hover:bg-teal-600 transition-all shadow-sm"
                    >
                        {step === 4 ? 'Create & Send Invoice' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateInvoiceModal;
