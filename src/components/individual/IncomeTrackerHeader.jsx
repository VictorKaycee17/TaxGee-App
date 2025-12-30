import React from 'react';
import { PlusIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const IncomeTrackerHeader = ({ onAddIncome, onImport, onSearch }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Title & Description */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/10 text-primary p-1 rounded">
                            <ChartBarIcon className="w-5 h-5" />
                        </span>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Income Tracker</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Track all income sources, manage reliefs, and monitor tax liability.
                    </p>
                </div>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search income..."
                            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none w-48 md:w-64"
                        />
                    </div>

                    {/* Import CSV */}
                    <button
                        onClick={onImport}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Import CSV
                    </button>

                    {/* Add Income (Primary) */}
                    <button
                        onClick={onAddIncome}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm hover:shadow transition"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Income
                    </button>

                    {/* Analytics / Settings (Icons) */}
                    <button className="p-2 text-slate-400 hover:text-primary transition">
                        <ChartBarIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary transition">
                        <Cog6ToothIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncomeTrackerHeader;
