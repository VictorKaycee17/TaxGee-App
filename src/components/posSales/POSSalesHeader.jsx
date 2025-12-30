import React from 'react';
import {
    ArrowPathIcon,
    ChartBarIcon,
    ArrowDownTrayIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const POSSalesHeader = ({ onSync, onAnalytics, onExport, onSettings, syncing = false }) => {
    return (
        <div className="bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-6 mb-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-slate-500 mb-2 font-medium">
                    Home &gt; Revenue &gt; POS Sales & Transactions
                </div>

                {/* Title & Subtitle */}
                <div className="mb-5">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        POS Sales & Revenue
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Real-time point-of-sale transactions and analytics.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={onSync}
                        disabled={syncing}
                        className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-70"
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
                        {syncing ? 'Syncing...' : 'Sync Terminals'}
                    </button>
                    <button
                        onClick={onAnalytics}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                    >
                        <ChartBarIcon className="w-5 h-5" />
                        Analytics
                    </button>
                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Export Data
                    </button>
                    <button
                        onClick={onSettings}
                        className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                    >
                        <Cog6ToothIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default POSSalesHeader;
