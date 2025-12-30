import React, { useState } from 'react';
import {
    PlusIcon,
    ArrowPathIcon,
    Cog6ToothIcon,
    ListBulletIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const FilingHubHeader = ({
    onViewAllReturns,
    onCreateReturn,
    onSyncData,
    onSettings
}) => {
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        if (onSyncData) {
            setIsSyncing(true);
            try {
                await onSyncData();
            } finally {
                setTimeout(() => setIsSyncing(false), 2000); // Simulate min delay
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-6 mb-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-slate-500 mb-2 font-medium">
                    Home &gt; Compliance &gt; Filing Hub
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Filing Hub & Compliance
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                            Manage your tax obligations, calculate liabilities, and file returns directly to FIRS and other authorities.
                        </p>
                    </div>

                    {/* Quick Stats Widget placed in header for visibility */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 flex gap-6 shadow-sm">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Returns (YTD)</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">4 Filed</p>
                        </div>
                        <div className="w-px bg-slate-200 dark:bg-slate-700 h-10"></div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Next Deadline</p>
                            <p className="text-lg font-bold text-amber-600">20 Jan</p>
                        </div>
                        <div className="w-px bg-slate-200 dark:bg-slate-700 h-10"></div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Pending Due</p>
                            <p className="text-lg font-bold text-rose-600">₦1.2M</p>
                        </div>
                    </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={onCreateReturn}
                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Create Return
                    </button>

                    <button
                        onClick={onViewAllReturns}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                    >
                        <ListBulletIcon className="w-5 h-5 text-slate-500" />
                        View All Returns
                    </button>

                    <div className="flex-1"></div>

                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all font-medium disabled:opacity-70"
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync Data'}</span>
                    </button>

                    <button
                        onClick={onSettings}
                        className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                        title="Filing Settings"
                    >
                        <Cog6ToothIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilingHubHeader;
