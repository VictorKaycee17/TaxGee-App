import React, { useState } from 'react';
import {
    XMarkIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    CheckCircleIcon,
    BanknotesIcon,
    CalculatorIcon,
    DocumentChartBarIcon
} from '@heroicons/react/24/outline';

const CreateReturnWizard = ({ open, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State (Mock)
    const [taxType, setTaxType] = useState('');
    const [period, setPeriod] = useState('');

    if (!open) return null;

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert('✓ Return filed successfully! DIN Generated.');
            onClose();
        }, 2000);
    };

    const steps = [
        { id: 1, title: 'Tax Period', icon: CalendarIcon },
        { id: 2, title: 'Data Review', icon: DocumentChartBarIcon },
        { id: 3, title: 'Calculations', icon: CalculatorIcon },
        { id: 4, title: 'File & Pay', icon: BanknotesIcon }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Return</h2>
                        <p className="text-sm text-slate-500">Value Added Tax (VAT) - Monthly Filing</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Steps Indicator */}
                <div className="px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 mt-[-10px]"></div>

                        {steps.map((s, idx) => {
                            const Icon = s.icon;
                            const isActive = step === s.id;
                            const isCompleted = step > s.id;

                            return (
                                <div key={s.id} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-900 px-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110' :
                                            isCompleted ? 'bg-emerald-500 text-white' :
                                                'bg-slate-100 text-slate-400 dark:bg-slate-800'
                                        }`}>
                                        {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-xs font-bold ${isActive ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {s.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    {step === 1 && (
                        <div className="max-w-xl mx-auto space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Select Tax Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setTaxType('vat')}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${taxType === 'vat' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 hover:border-indigo-300'}`}
                                    >
                                        <span className="block font-bold mb-1">Value Added Tax</span>
                                        <span className="text-xs text-slate-500">Monthly Return (Form 002)</span>
                                    </button>
                                    <button
                                        onClick={() => setTaxType('wht')}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${taxType === 'wht' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 hover:border-indigo-300'}`}
                                    >
                                        <span className="block font-bold mb-1">Withholding Tax</span>
                                        <span className="text-xs text-slate-500">Remittance Schedule</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Filing Period</label>
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    <option value="">Select Period...</option>
                                    <option value="dec-2025">December 2025</option>
                                    <option value="nov-2025">November 2025</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Revenue Source */}
                                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <DocumentChartBarIcon className="w-5 h-5 text-indigo-500" />
                                        Revenue Summary (POS)
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Total Sales</span>
                                            <span className="font-bold">₦15,872,000</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Vatable Sales</span>
                                            <span className="font-bold">₦12,500,000</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Zero-rated</span>
                                            <span className="font-bold">₦3,372,000</span>
                                        </div>
                                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-indigo-600">
                                            <span>Est. Output VAT</span>
                                            <span>₦937,500</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expenditure Source */}
                                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <DocumentChartBarIcon className="w-5 h-5 text-rose-500" />
                                        Expenditure (Vendor Bills)
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Total Expenses</span>
                                            <span className="font-bold">₦4,250,000</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Vatable Expenses</span>
                                            <span className="font-bold">₦3,100,000</span>
                                        </div>
                                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-rose-600">
                                            <span>Input VAT Credit</span>
                                            <span>-₦232,500</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                <ExclamationCircleIcon className="w-6 h-6 shrink-0" />
                                <div>
                                    <p className="font-bold text-sm">Unreconciled Transactions Found</p>
                                    <p className="text-xs">There are 3 bank transactions totaling ₦45,000 not yet matched. <button className="underline font-bold">Review Now</button></p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="max-w-2xl mx-auto">
                            <h3 className="text-lg font-bold mb-6">Tax Liability Calculation</h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600">A. Total Output Tax (Sales)</span>
                                    <span className="font-bold text-slate-900">₦937,500.00</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600">B. Less: Input Tax (Purchases)</span>
                                    <span className="font-bold text-rose-600">(₦232,500.00)</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-600">C. Adjustments / Credits</span>
                                    <span className="font-bold text-slate-900">₦0.00</span>
                                </div>

                                <div className="flex justify-between items-center py-4 text-lg">
                                    <span className="font-bold text-slate-900">Net Tax Payable</span>
                                    <span className="font-black text-indigo-700">₦705,000.00</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Adjustments / Notes</label>
                                <textarea rows="3" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter any adjustments or notes for the tax authority..."></textarea>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="max-w-xl mx-auto text-center space-y-6">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BanknotesIcon className="w-10 h-10 text-indigo-600" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">₦705,000.00</h3>
                                <p className="text-slate-500">Total Amount Due for Dec 2025</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-left p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Filing Deadline</p>
                                    <p className="font-bold text-slate-900">Jan 21, 2026</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Payment Method</p>
                                    <p className="font-bold text-slate-900">Paystack Checkout</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-start gap-3 text-left p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                                    <input type="checkbox" className="mt-1 w-4 h-4 text-indigo-600 rounded" />
                                    <span className="text-sm text-slate-600">I declare that the information provided in this return is true and correct to the best of my knowledge.</span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="px-8 py-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                    <div>
                        {step > 1 && (
                            <button onClick={handleBack} disabled={isSubmitting} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 flex items-center gap-2">
                                <ChevronLeftIcon className="w-4 h-4" /> Back
                            </button>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button onClick={onClose} disabled={isSubmitting} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800">
                            Save as Draft
                        </button>
                        <button
                            onClick={step === 4 ? handleSubmit : handleNext}
                            disabled={isSubmitting}
                            className="px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 flex items-center gap-2"
                        >
                            {isSubmitting ? 'Processing...' : step === 4 ? 'File & Pay Now' : 'Continue'}
                            {!isSubmitting && step < 4 && <ChevronRightIcon className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Icon helpers
function CalendarIcon({ className }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0h18M5.25 12h13.5" /></svg> }
function ExclamationCircleIcon({ className }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg> }

export default CreateReturnWizard;
