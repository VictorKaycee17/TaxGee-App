import React, { useState } from 'react';
import {
    XMarkIcon,
    DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

const ExportVendorBillsModal = ({ open, onClose }) => {
    const [format, setFormat] = useState('csv');
    const [period, setPeriod] = useState('current');
    const [exporting, setExporting] = useState(false);
    const [progress, setProgress] = useState(0);

    // Initial checkbox state - use an object to track multiple checkboxes
    const [includedContent, setIncludedContent] = useState({
        invoices: true,
        vatSchedule: true,
        whtSchedule: true,
        vendorSummary: true,
        bankStatus: false
    });

    const handleContentChange = (key) => {
        setIncludedContent(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleExport = () => {
        setExporting(true);
        // Simulate export
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setExporting(false);
            alert('✓ Vendor bills exported successfully!');
            onClose();
        }, 2500);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <DocumentArrowDownIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Export Vendor Bills</h2>
                            <p className="text-xs text-slate-500">Download data for reporting or backup</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-6 max-h-[60vh] overflow-y-auto">
                    {/* Format */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Export Format</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {['csv', 'xlsx', 'pdf'].map(fmt => (
                                <button
                                    key={fmt}
                                    onClick={() => setFormat(fmt)}
                                    className={`p-3 rounded-xl border text-center transition-all ${format === fmt
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 font-bold'
                                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="uppercase">{fmt}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Period */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Time Period</h3>
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="current">Current Filters (Last 30 Days)</option>
                            <option value="90days">Last 90 Days</option>
                            <option value="year">This Year (YTD)</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Include Content</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                <input
                                    type="checkbox"
                                    checked={includedContent.invoices}
                                    onChange={() => handleContentChange('invoices')}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium">Invoice List & Details</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                <input
                                    type="checkbox"
                                    checked={includedContent.vatSchedule}
                                    onChange={() => handleContentChange('vatSchedule')}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium">VAT Input Schedule</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                <input
                                    type="checkbox"
                                    checked={includedContent.whtSchedule}
                                    onChange={() => handleContentChange('whtSchedule')}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium">WHT Evidence Schedule</span>
                            </label>
                        </div>
                    </div>

                    {/* Progress */}
                    {exporting && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Generating Report...</span>
                                <span className="font-bold text-indigo-600">{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
                    <button onClick={onClose} disabled={exporting} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 disabled:opacity-50">
                        Cancel
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {exporting ? 'Exporting...' : 'Export Data'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportVendorBillsModal;
