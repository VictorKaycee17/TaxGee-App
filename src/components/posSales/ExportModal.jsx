import React, { useState } from 'react';
import { XMarkIcon, DocumentArrowDownIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const ExportModal = ({ open, onClose }) => {
    const [format, setFormat] = useState('csv');
    const [period, setPeriod] = useState('today');
    const [includeDetails, setIncludeDetails] = useState(true);
    const [includeSummary, setIncludeSummary] = useState(true);
    const [includeTerminals, setIncludeTerminals] = useState(true);
    const [includeReconciliation, setIncludeReconciliation] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [progress, setProgress] = useState(0);

    const formats = [
        { id: 'csv', label: 'CSV', desc: 'Comma-separated values' },
        { id: 'xlsx', label: 'Excel (.xlsx)', desc: 'Microsoft Excel format' },
        { id: 'pdf', label: 'PDF Report', desc: 'Formatted report' }
    ];

    const periods = [
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'custom', label: 'Custom Range' }
    ];

    const handleExport = async () => {
        setExporting(true);
        setProgress(0);

        // Simulate export progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 20;
            });
        }, 300);

        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setExporting(false);

            // Simulate file download
            const filename = `pos-sales-${new Date().toISOString().split('T')[0]}.${format}`;
            alert(`✓ File downloaded: ${filename}`);
            onClose();
        }, 1800);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                            <DocumentArrowDownIcon className="w-5 h-5 text-teal-600" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Export POS Transactions</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
                    {/* Format Selection */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Export Format</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {formats.map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setFormat(f.id)}
                                    className={`p-3 rounded-xl border text-center transition-all ${format === f.id
                                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <span className={`text-sm font-bold ${format === f.id ? 'text-teal-600' : 'text-slate-700'}`}>{f.label}</span>
                                    <p className="text-[10px] text-slate-500 mt-1">{f.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Period Selection */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Time Period</h3>
                        <div className="flex flex-wrap gap-2">
                            {periods.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setPeriod(p.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${period === p.id
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                        {period === 'custom' && (
                            <div className="flex gap-3 mt-3">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-500">Start Date</label>
                                    <input type="date" className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-slate-500">End Date</label>
                                    <input type="date" className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Selection */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Include Content</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" checked={includeDetails} onChange={e => setIncludeDetails(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
                                <div>
                                    <span className="text-sm font-medium text-slate-700">Transaction Details</span>
                                    <p className="text-xs text-slate-500">Individual transaction records</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" checked={includeSummary} onChange={e => setIncludeSummary(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
                                <div>
                                    <span className="text-sm font-medium text-slate-700">Summary Report</span>
                                    <p className="text-xs text-slate-500">Aggregated totals and statistics</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" checked={includeTerminals} onChange={e => setIncludeTerminals(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
                                <div>
                                    <span className="text-sm font-medium text-slate-700">Terminal Breakdown</span>
                                    <p className="text-xs text-slate-500">Sales by terminal</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" checked={includeReconciliation} onChange={e => setIncludeReconciliation(e.target.checked)} className="w-4 h-4 text-teal-600 rounded" />
                                <div>
                                    <span className="text-sm font-medium text-slate-700">Reconciliation Data</span>
                                    <p className="text-xs text-slate-500">Bank matching status</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {exporting && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Generating export...</span>
                                <span className="font-medium text-teal-600">{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="px-6 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
                    >
                        {exporting ? 'Exporting...' : 'Export'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
