import React from 'react';
import { DocumentPlusIcon, BanknotesIcon, ChartBarIcon, PlusIcon } from '@heroicons/react/24/outline';

const QuickGrid = ({ onFile, onPay, onViewDetails, onAddIncome }) => {
    const actions = [
        { label: 'File Return', icon: DocumentPlusIcon, action: onFile, primary: true, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Pay Tax', icon: BanknotesIcon, action: onPay, primary: true, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
        { label: 'View Details', icon: ChartBarIcon, action: onViewDetails, color: 'text-slate-600 bg-slate-50 dark:text-slate-300 dark:bg-slate-800' },
        { label: 'Add Income', icon: PlusIcon, action: onAddIncome, color: 'text-slate-600 bg-slate-50 dark:text-slate-300 dark:bg-slate-800' },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 mt-6">
            {actions.map((item, idx) => (
                <button
                    key={idx}
                    onClick={item.action}
                    className={`
                        flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-transparent
                        transition-all duration-200 active:scale-95
                        ${item.color}
                        ${item.primary ? 'hover:shadow-md border-opacity-50' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}
                    `}
                >
                    <item.icon className={`w-7 h-7 ${item.primary ? '' : 'opacity-80'}`} />
                    <span className="text-sm font-semibold">{item.label}</span>
                </button>
            ))}
        </div>
    );
};

export default QuickGrid;
