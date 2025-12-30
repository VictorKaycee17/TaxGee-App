import React, { useState } from 'react';
import {
    CalendarIcon,
    CurrencyDollarIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
    DocumentDuplicateIcon,
    ArchiveBoxIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

const ReturnCard = ({ data, onContinue, onFileNow, onView, onAction }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'filed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'overdue': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'draft': return <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>;
            case 'pending': return <ClockIcon className="w-4 h-4 mr-1" />;
            case 'filed': return <CheckCircleIcon className="w-4 h-4 mr-1" />;
            case 'overdue': return <ExclamationCircleIcon className="w-4 h-4 mr-1" />;
            default: return null;
        }
    };

    return (
        <div
            onClick={() => data.status === 'filed' ? onView(data) : onContinue(data)}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer flex flex-col justify-between min-h-[220px]"
        >
            {/* Top Row: Type & Menu */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wide mb-2">
                        {data.taxType}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                        {data.periodLabel}
                    </h3>
                    <p className="text-sm text-slate-500">{data.periodDates}</p>
                </div>

                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <EllipsisHorizontalIcon className="w-6 h-6" />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <button onClick={(e) => { e.stopPropagation(); onAction('duplicate', data); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-600">
                                <DocumentDuplicateIcon className="w-4 h-4" /> Duplicate
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onAction('archive', data); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-600">
                                <ArchiveBoxIcon className="w-4 h-4" /> Archive
                            </button>
                            {data.status === 'draft' && (
                                <button onClick={(e) => { e.stopPropagation(); onAction('delete', data); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 text-rose-600">
                                    <TrashIcon className="w-4 h-4" /> Delete
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Middle: Amount & Status */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(data.status)}`}>
                        {getStatusIcon(data.status)}
                        {data.status}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                        {data.status === 'filed' ? 'Filed on' : 'Due'} {data.dueDate}
                    </span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">₦{data.amount.toLocaleString()}</span>
                    <span className="text-xs font-medium text-slate-500 uppercase">Liability</span>
                </div>
            </div>

            {/* Bottom: Actions */}
            <div className="mt-auto">
                {data.status === 'filed' ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); onView(data); }}
                        className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        View Details
                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); onContinue(data); }}
                            className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Continue
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onFileNow(data); }}
                            className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-colors"
                        >
                            File Now
                        </button>
                    </div>
                )}
            </div>

            {/* Click overlay for menu close */}
            {isMenuOpen && <div className="fixed inset-0 z-0" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} />}
        </div>
    );
};

export default ReturnCard;
