import React from 'react';
import { FunnelIcon, CalendarIcon } from '@heroicons/react/24/outline';

const IncomeFilterBar = () => {
    return (
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/50">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-primary transition">
                    <CalendarIcon className="w-4 h-4 text-slate-500" />
                    <span>Period: <strong>YTD</strong></span>
                </button>

                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-primary transition">
                    <FunnelIcon className="w-4 h-4 text-slate-500" />
                    <span>Source: <strong>All</strong></span>
                </button>

                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-primary transition">
                    <span>Month: <strong>All</strong></span>
                </button>

                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

                <button className="text-sm text-primary font-medium hover:underline">
                    Clear
                </button>
            </div>

            {/* View Toggle or Secondary Actions could go here */}
            <div className="text-xs text-slate-400">
                Showing all records
            </div>
        </div>
    );
};

export default IncomeFilterBar;
