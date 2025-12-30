import React, { useState } from 'react';
import {
    XMarkIcon,
    DocumentTextIcon,
    ArrowUpTrayIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

const NewInvoiceWizard = ({ open, onClose, initialMode = 'manual' }) => {
    const [step, setStep] = useState(1);
    const [mode, setMode] = useState(initialMode); // 'manual' or 'upload' or 'csv'
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form data (simplified for UI demonstration)
    const [formData, setFormData] = useState({
        vendor: '',
        invoiceNo: '',
        date: '',
        amount: '',
        vatAmount: '',
        whtAmount: ''
    });

    if (!open) return null;

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert('✓ Invoice created successfully!');
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">New Vendor Invoice</h2>
                        <p className="text-xs text-slate-500">Step {step} of 3: {step === 1 ? 'Entry Method' : step === 2 ? 'Invoice Details' : 'Review & Save'}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {step === 1 && (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => { setMode('manual'); handleNext(); }}
                                className={`p-6 rounded-xl border-2 text-left transition-all group ${mode === 'manual' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                            >
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                                    <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Manual Entry</h3>
                                <p className="text-xs text-slate-500">Type in invoice details manually</p>
                            </button>
                            <button
                                onClick={() => { setMode('upload'); handleNext(); }}
                                className={`p-6 rounded-xl border-2 text-left transition-all group ${mode === 'upload' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
                            >
                                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                                    <ArrowUpTrayIcon className="w-6 h-6 text-teal-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Upload File</h3>
                                <p className="text-xs text-slate-500">Auto-extract from PDF/Image</p>
                            </button>
                        </div>
                    )}

                    {step === 2 && mode === 'manual' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Vendor</label>
                                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option>Select Vendor...</option>
                                        <option>Acme Inc</option>
                                        <option>Tech Corp</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Number</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="INV-001" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                    <div className="relative">
                                        <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount (₦)</label>
                                    <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-bold" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Tax Breakdown</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">VAT (7.5%)</label>
                                        <input type="number" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">WHT (5% / 10%)</label>
                                        <input type="number" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && mode === 'upload' && (
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50 hover:bg-white transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ArrowUpTrayIcon className="w-8 h-8 text-indigo-500" />
                            </div>
                            <p className="font-bold text-slate-900">Drag & Drop Invoice Here</p>
                            <p className="text-sm text-slate-500 mt-1">or click to browse</p>
                            <p className="text-xs text-slate-400 mt-4">Supports PDF, JPG, PNG (Max 10MB)</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
                                <CheckCircleIcon className="w-6 h-6 shrink-0" />
                                <div>
                                    <p className="font-bold">Ready to Save</p>
                                    <p className="text-sm">Please review the details below before creating the invoice.</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Method</span>
                                    <span className="font-medium capitalize">{mode === 'manual' ? 'Manual Entry' : 'File Upload'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Vendor</span>
                                    <span className="font-bold text-slate-900">Acme Inc</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Amount</span>
                                    <span className="font-bold text-slate-900">₦500,000</span>
                                </div>
                                <div className="pt-2 border-t border-slate-200 flex justify-between">
                                    <span className="text-slate-500">Tax Impact</span>
                                    <span className="text-slate-900">VAT Deductible, WHT Applicable</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                    {step > 1 && (
                        <button onClick={handleBack} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800">
                            Back
                        </button>
                    )}
                    <button
                        onClick={step === 3 ? handleSubmit : handleNext}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 flex items-center gap-2"
                    >
                        {isSubmitting ? 'Saving...' : step === 3 ? 'Save Invoice' : 'Continue'}
                        {!isSubmitting && step < 3 && <ChevronRightIcon className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Start Icon helper
function ChevronRightIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    )
}

export default NewInvoiceWizard;
