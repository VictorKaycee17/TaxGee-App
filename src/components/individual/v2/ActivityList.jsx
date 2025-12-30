import React from 'react';
import { ArrowUpRightIcon, ArrowDownLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const ActivityList = () => {
    const activities = [
        { id: 1, type: 'income', title: 'Salary Synced', time: '2h ago', amount: '₦2.0M', icon: ArrowDownLeftIcon, color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
        { id: 2, type: 'wht', title: 'WHT Recorded', time: '5 Dec', amount: '₦50k', icon: ArrowUpRightIcon, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' },
        { id: 3, type: 'system', title: 'Profile Verified', time: '3 Dec', amount: null, icon: CheckBadgeIcon, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
    ];

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Recent Activity</h3>
                <button className="text-xs font-semibold text-primary hover:text-primary-dark">View All</button>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
                {activities.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${item.color}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                <p className="text-xs text-slate-500">{item.time}</p>
                            </div>
                        </div>
                        {item.amount && (
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.amount}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityList;
