import React from 'react';
import { BanknotesIcon, ArrowTrendingUpIcon, WalletIcon, ScaleIcon } from '@heroicons/react/24/outline';

const IncomeStatsGrid = () => {
    // Mock Data - In future, pass as props or fetch
    const stats = [
        {
            label: 'YTD Income',
            value: '₦6,240,000',
            subtext: '+7.6% vs last year',
            icon: <BanknotesIcon className="w-6 h-6 text-green-600" />,
            bg: 'bg-green-50 dark:bg-green-900/20',
            text: 'text-green-600 dark:text-green-400'
        },
        {
            label: 'Monthly Average',
            value: '₦520,000',
            subtext: 'Based on 12 months',
            icon: <ArrowTrendingUpIcon className="w-6 h-6 text-blue-600" />,
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400'
        },
        {
            label: 'Tax Paid (PAYE)',
            value: '₦936,000',
            subtext: '78% of estimated liability',
            icon: <ScaleIcon className="w-6 h-6 text-purple-600" />,
            bg: 'bg-purple-50 dark:bg-purple-900/20',
            text: 'text-purple-600 dark:text-purple-400'
        },
        {
            label: 'Net Income',
            value: '₦5,304,000',
            subtext: 'Disposable income',
            icon: <WalletIcon className="w-6 h-6 text-orange-600" />,
            bg: 'bg-orange-50 dark:bg-orange-900/20',
            text: 'text-orange-600 dark:text-orange-400'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 pb-0">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.text}`}>
                            {stat.icon}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                        <span className="text-slate-400 dark:text-slate-500">{stat.subtext}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IncomeStatsGrid;
