import React from 'react';
import { ChartPieIcon } from '@heroicons/react/24/outline';

const SalesByCategory = ({ categories = [], onViewReport }) => {
    // Sort by percentage descending
    const sortedCategories = [...categories].sort((a, b) => b.percentage - a.percentage);

    const colors = ['bg-teal-500', 'bg-indigo-500', 'bg-amber-500', 'bg-rose-500'];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ChartPieIcon className="w-4 h-4 text-teal-500" />
                    Sales by Category
                </h3>
                <button
                    onClick={onViewReport}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                >
                    View Report
                </button>
            </div>

            <div className="space-y-4">
                {sortedCategories.map((cat, index) => (
                    <div key={index} className="space-y-1.5">
                        <div className="flex justify-between items-end text-sm">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                            <div className="text-right">
                                <span className="font-bold text-slate-900 dark:text-white block">₦{cat.amount.toLocaleString()}</span>
                                <span className="text-xs text-slate-500">{cat.percentage}%</span>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${colors[index % colors.length]}`}
                                style={{ width: `${cat.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm">
                <span className="font-bold text-slate-600 dark:text-slate-400">Total</span>
                <span className="font-black text-teal-600">
                    ₦{sortedCategories.reduce((sum, cat) => sum + cat.amount, 0).toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default SalesByCategory;
