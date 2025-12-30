import React from 'react';
import { UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const TopVendorsCard = ({ onViewAll }) => {
    const vendors = [
        { name: 'Acme Inc', amount: 285000, invoices: 12 },
        { name: 'Tech Corp', amount: 210000, invoices: 8 },
        { name: 'Office Supply', amount: 180000, invoices: 6 }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 dark:text-white">Top Vendors</h3>
                </div>
                <button
                    onClick={onViewAll}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {vendors.map((vendor, idx) => (
                    <div key={idx} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                {idx + 1}
                            </span>
                            <div>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">{vendor.name}</p>
                                <p className="text-xs text-slate-500">{vendor.invoices} invoices</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">₦{vendor.amount.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onViewAll}
                className="w-full mt-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
                Start Vendor Review
            </button>
        </div>
    );
};

export default TopVendorsCard;
