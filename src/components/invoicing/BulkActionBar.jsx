import React from 'react';
import {
    CheckIcon,
    EnvelopeIcon,
    TrashIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const BulkActionBar = ({ selectedCount, onClearSelection, onMarkPaid, onEmail, onDelete }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-teal-50 border border-teal-200 border-t-2 border-t-teal-500 rounded-lg shadow-xl px-6 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-5 duration-300 w-[90%] md:w-auto max-w-2xl">
            <div className="flex items-center gap-3 pr-6 border-r border-teal-200">
                <div className="bg-teal-100 rounded-md p-1">
                    <CheckIcon className="h-5 w-5 text-teal-700" />
                </div>
                <span className="font-semibold text-slate-900 text-sm whitespace-nowrap">
                    {selectedCount} selected
                </span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onMarkPaid}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold rounded-md transition-colors"
                >
                    <CheckIcon className="w-4 h-4" />
                    Mark Paid
                </button>
                <button
                    onClick={onEmail}
                    className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-700 text-xs font-bold rounded-md transition-colors"
                >
                    <EnvelopeIcon className="w-4 h-4" />
                    Email
                </button>
                <button
                    onClick={onDelete}
                    className="flex items-center gap-2 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-md transition-colors"
                >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                </button>
            </div>

            <button
                onClick={onClearSelection}
                className="ml-auto text-slate-400 hover:text-slate-600"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default BulkActionBar;
