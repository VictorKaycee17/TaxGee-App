import React from 'react';
import {
    CalendarIcon,
    TagIcon,
    FunnelIcon,
    Squares2X2Icon,
    ListBulletIcon
} from '@heroicons/react/24/outline';

const ReceiptsFilters = ({
    viewMode,
    onToggleView,
    onFilterChange,
    onClearFilters
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 flex flex-col md:flex-row gap-2 mb-6 shadow-sm items-center justify-between">

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-colors">
                        <CalendarIcon className="w-4 h-4 text-slate-500" />
                        <span>Date: Last 30 Days</span>
                    </button>
                </div>

                <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-colors">
                        <TagIcon className="w-4 h-4 text-slate-500" />
                        <span>Category: All</span>
                    </button>
                </div>

                <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-colors">
                        <FunnelIcon className="w-4 h-4 text-slate-500" />
                        <span>Status: All</span>
                    </button>
                </div>

                <button
                    onClick={onClearFilters}
                    className="px-3 py-2 text-sm font-bold text-slate-500 hover:text-rose-600 transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* View Toggle Group */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                    onClick={() => onToggleView('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                    title="Grid View"
                >
                    <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onToggleView('table')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                    title="Table View"
                >
                    <ListBulletIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ReceiptsFilters;
