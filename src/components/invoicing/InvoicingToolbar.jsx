import React, { useState } from 'react';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronDownIcon,
    PlusIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const InvoicingToolbar = ({
    searchQuery,
    onSearchChange,
    onCreateClick,
    onFilterChange
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
                    placeholder="Search invoices by client, number or amount..."
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Actions Group */}
            <div className="flex items-center gap-3">
                {/* Filters Dropdown Trigger */}
                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border ${isFilterOpen ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-slate-300 dark:border-slate-700'} text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm`}
                    >
                        <FunnelIcon className="h-4 w-4" />
                        Filters
                        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Filter Dropdown Panel */}
                    {isFilterOpen && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Date Range</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="date" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg" />
                                        <input type="date" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Tax Type</label>
                                    <div className="space-y-2">
                                        {['VAT (7.5%)', 'WHT (5-10%)', 'DST (0.5%)'].map(type => (
                                            <label key={type} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                                <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                                    <button className="flex-1 py-2 bg-teal-500 text-white text-sm font-bold rounded-lg hover:bg-teal-600">Apply</button>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="px-4 py-2 text-slate-500 text-sm font-bold hover:text-slate-700"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Filter */}
                <div className="relative hidden md:block">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        All Statuses
                        <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    {/* Status dropdown implementation would go here */}
                </div>

                {/* Create Invoice Button (Mobile - sticky bottom usually, but here inline for desktop) */}
                <button
                    onClick={onCreateClick}
                    className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                    <PlusIcon className="h-5 w-5" />
                    Create New Invoice
                </button>
            </div>

            {/* Mobile Create Button (Visible only on mobile) */}
            <button
                onClick={onCreateClick}
                className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-500 active:bg-teal-600 text-white text-sm font-bold rounded-xl shadow-lg"
            >
                <PlusIcon className="h-5 w-5" />
                Create New Invoice
            </button>
        </div>
    );
};

export default InvoicingToolbar;
