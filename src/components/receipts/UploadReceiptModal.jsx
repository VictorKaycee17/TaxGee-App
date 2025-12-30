import React, { useState, useEffect } from 'react';
import {
    XMarkIcon,
    ArrowUpTrayIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const UploadReceiptModal = ({ open, onClose }) => {
    const [step, setStep] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ocrData, setOcrData] = useState(null);

    // Initial form state (populated after simulate OCR)
    const [formData, setFormData] = useState({
        vendor: '',
        date: '',
        amount: '',
        tax: '',
        category: 'Office Supplies'
    });

    if (!open) return null;

    const handleUpload = () => {
        setProcessing(true);
        // Simulate upload & OCR processing
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setProcessing(false);
                setOcrData({ confidence: 95 });
                setFormData({
                    vendor: 'Acme Supermarket',
                    date: '2025-12-25',
                    amount: '15000',
                    tax: '2700',
                    category: 'Supplies'
                });
                setStep(2);
            }
        }, 300);
    };

    const handleSave = () => {
        // Simulate save
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            onClose();
            alert('Receipt saved successfully!');
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${step === 2 ? 'max-w-4xl' : ''}`}>

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Upload Receipt</h2>
                        <p className="text-xs text-slate-500">Step {step}: {step === 1 ? 'Select File' : 'Review & Categorize'}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {step === 1 && (
                        <div className="text-center space-y-6">
                            {!processing ? (
                                <div
                                    onClick={handleUpload}
                                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group"
                                >
                                    <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <ArrowUpTrayIcon className="w-8 h-8 text-indigo-500" />
                                    </div>
                                    <p className="font-bold text-slate-900 dark:text-white">Drag & Drop Receipt</p>
                                    <p className="text-sm text-slate-500 mb-4">or click to browse</p>
                                    <span className="text-xs text-slate-400 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">JPG, PNG, PDF (Max 10MB)</span>
                                </div>
                            ) : (
                                <div className="h-64 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                                    <p className="font-bold text-slate-900 dark:text-white">Processing Receipt...</p>
                                    <p className="text-sm text-slate-500 mb-2">Analyzing text and extracting data</p>
                                    <div className="w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
                            {/* Preview Panel */}
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                <div className="text-center">
                                    <DocumentTextIcon className="w-20 h-20 text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm font-bold text-slate-400">Receipt Image Preview</p>
                                </div>
                            </div>

                            {/* Form Panel */}
                            <div className="w-full lg:w-96 overflow-y-auto pr-2">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl flex items-start gap-3 mb-6 border border-emerald-100 dark:border-emerald-800/50">
                                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">OCR Success (95%)</p>
                                        <p className="text-xs text-emerald-700 dark:text-emerald-400">We extracted the data below. Please verify.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Vendor</label>
                                        <input
                                            type="text"
                                            value={formData.vendor}
                                            onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount (₦)</label>
                                            <input
                                                type="number"
                                                value={formData.amount}
                                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm"
                                        >
                                            <option>Office Supplies</option>
                                            <option>Travel & Transport</option>
                                            <option>Meals & Entertainment</option>
                                            <option>Utilities</option>
                                        </select>
                                    </div>

                                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-slate-500 uppercase">Tax Details</span>
                                            <span className="text-xs text-indigo-600 cursor-pointer">Edit</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <input type="checkbox" checked readOnly className="rounded text-indigo-600" />
                                            <span className="text-sm">Tax Deductible</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">VAT (7.5%)</span>
                                            <span className="font-bold">₦{Number(formData.tax).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Notes</label>
                                        <textarea rows="3" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 text-sm" placeholder="Add optional notes..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                    <button onClick={onClose} disabled={processing} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800">
                        Cancel
                    </button>
                    {step === 2 && (
                        <button
                            onClick={handleSave}
                            disabled={processing}
                            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 flex items-center gap-2"
                        >
                            {processing ? 'Saving...' : 'Save Receipt'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadReceiptModal;
