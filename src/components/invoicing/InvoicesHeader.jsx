import React from 'react';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

const InvoicesHeader = ({
    onCreateInvoice,
    onSearch,
    onToggleFilters,
    onViewReports
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 mb-6 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Left: Title & Create */}
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Invoicing</h1>
                        <p className="text-sm text-slate-500">Manage customer invoices & payments</p>
                    </div>
                </div>

                {/* Center: Search */}
                <div className="flex-1 max-w-lg mx-4">
                    <div className="relative group">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search invoices by number, customer, or amount..."
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 rounded-xl text-sm outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onViewReports}
                        className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                        title="Reports"
                    >
                        <ChartBarIcon className="w-5 h-5" />
                    </button>

                    <button
                        onClick={onToggleFilters}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-sm"
                    >
                        <FunnelIcon className="w-4 h-4" />
                        <span>Filters</span>
                    </button>

                    <button
                        onClick={onCreateInvoice}
                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 text-sm"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Create Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoicesHeader;
