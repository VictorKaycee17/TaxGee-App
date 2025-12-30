import React, { useState } from 'react';
import {
    PlusIcon,
    ArrowDownTrayIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ArrowUpTrayIcon,
    TableCellsIcon
} from '@heroicons/react/24/outline';

const VendorBillsHeader = ({
    onNewInvoice,
    onImportCSV,
    onSearch,
    onAnalytics,
    onExport,
    onSettings
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch && onSearch(query);
    };

    return (
        <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-6 mb-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-slate-500 mb-2 font-medium">
                    Home &gt; Expenditure &gt; Vendor Bills
                </div>

                {/* Title & Description */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Vendor Bills & Expenditure
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                            Manage purchase invoices, track VAT input deductibles, and monitor withholding tax compliance.
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by vendor, invoice #..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow shadow-sm"
                        />
                    </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* New Invoice Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            <PlusIcon className="w-5 h-5" />
                            New Invoice
                            <span className="text-xs ml-1 opacity-70">▼</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={() => onNewInvoice && onNewInvoice('manual')}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                        <DocumentTextIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Manual Entry</p>
                                        <p className="text-xs text-slate-500">Type invoice details</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => onNewInvoice && onNewInvoice('upload')}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors group border-t border-slate-50 dark:border-slate-700/50"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                                        <ArrowUpTrayIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Upload File</p>
                                        <p className="text-xs text-slate-500">PDF or Image Scan</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => onNewInvoice && onNewInvoice('csv')}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors group border-t border-slate-50 dark:border-slate-700/50"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                        <TableCellsIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">CSV Import</p>
                                        <p className="text-xs text-slate-500">Bulk upload data</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Import CSV Button */}
                    <button
                        onClick={onImportCSV}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                    >
                        <TableCellsIcon className="w-5 h-5 text-slate-500" />
                        Import CSV
                    </button>

                    <div className="flex-1"></div>

                    {/* Analytics Button */}
                    <button
                        onClick={onAnalytics}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all font-medium"
                    >
                        <ChartBarIcon className="w-5 h-5" />
                        <span>Analytics</span>
                    </button>

                    {/* Export Button */}
                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-all font-medium"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        <span>Export</span>
                    </button>

                    {/* Settings Button */}
                    <button
                        onClick={onSettings}
                        className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                        title="Settings"
                    >
                        <Cog6ToothIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorBillsHeader;
