import React, { useState } from 'react';
import { XMarkIcon, CreditCardIcon, BuildingLibraryIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const PaymentModal = ({ open, onClose, paymentData = {} }) => {
    const [selectedMethod, setSelectedMethod] = useState('bank_transfer');
    const [processing, setProcessing] = useState(false);

    const {
        vatLiability = 2610000,
        citLiability = 850000,
        penalties = 125000,
        interest = 45000,
        dueDate = 'January 21, 2026'
    } = paymentData;

    const totalDue = vatLiability + citLiability + penalties + interest;

    const paymentMethods = [
        { id: 'bank_transfer', label: 'Bank Transfer', icon: <BuildingLibraryIcon className="w-5 h-5" />, recommended: true },
        { id: 'card', label: 'Debit/Credit Card', icon: <CreditCardIcon className="w-5 h-5" /> },
        { id: 'ussd', label: 'USSD', icon: <DevicePhoneMobileIcon className="w-5 h-5" /> }
    ];

    const handlePayNow = async () => {
        if (!selectedMethod) return;

        setProcessing(true);
        // Simulate payment initiation
        setTimeout(() => {
            console.log('Payment initiated:', { amount: totalDue, method: selectedMethod });
            setProcessing(false);
            alert(`✓ Payment of ₦${totalDue.toLocaleString()} initiated via ${selectedMethod}`);
            onClose();
        }, 1500);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Complete Your Payment</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5">
                    {/* Payment Breakdown */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Payment Breakdown</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">VAT Liability (Q4 2025)</span>
                                <span className="font-medium">₦{vatLiability.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">CIT Liability (2025)</span>
                                <span className="font-medium">₦{citLiability.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Penalties (Late filing)</span>
                                <span className="font-medium text-amber-600">₦{penalties.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Interest</span>
                                <span className="font-medium text-amber-600">₦{interest.toLocaleString()}</span>
                            </div>
                            <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between font-bold">
                                <span className="text-slate-900">TOTAL DUE</span>
                                <span className="text-teal-600 text-lg">₦{totalDue.toLocaleString()}</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Due Date: {dueDate}</p>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Payment Method</h3>
                        <div className="space-y-2">
                            {paymentMethods.map(method => (
                                <label
                                    key={method.id}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedMethod === method.id
                                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.id}
                                        checked={selectedMethod === method.id}
                                        onChange={() => setSelectedMethod(method.id)}
                                        className="sr-only"
                                    />
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedMethod === method.id ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">{method.label}</span>
                                        {method.recommended && <span className="ml-2 text-xs font-bold text-teal-600">(Recommended)</span>}
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-teal-500 bg-teal-500' : 'border-slate-300'
                                        }`}>
                                        {selectedMethod === method.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePayNow}
                        disabled={processing}
                        className="px-6 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
                    >
                        {processing ? 'Processing...' : 'Pay Now →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
