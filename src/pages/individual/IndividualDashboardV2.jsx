import React, { useState } from 'react';
import IndividualLayout from '../../layouts/IndividualLayout'; // Import Layout
import PrimaryCard from '../../components/individual/v2/PrimaryCard';
import QuickGrid from '../../components/individual/v2/QuickGrid';
import ActivityList from '../../components/individual/v2/ActivityList';

const IndividualDashboardV2 = () => {
    // These states will eventually come from the parent or context (to manage navigation)
    // For now, we are building the Dashboard page content.

    // Mock Data
    const taxData = {
        amount: "1,623,000",
        dueDate: "31 Mar 2026",
        daysLeft: 92,
        status: "danger" // 'danger', 'warning', 'success'
    };

    return (
        <div className="px-5 py-6">
            {/* Greetings */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hi, John 👋</h1>
                <p className="text-sm text-slate-500 font-medium">TIN: 2339-4402-1201</p>
            </div>

            {/* Main Balance Card */}
            <PrimaryCard
                amount={taxData.amount}
                status={taxData.status}
                dueDate={taxData.dueDate}
                daysLeft={taxData.daysLeft}
            />

            {/* Quick Status Chips */}
            <div className="flex gap-3 overflow-x-auto py-4 -mx-5 px-5 no-scrollbar">
                <div className="flex-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 shadow-sm min-w-[120px]">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Income</p>
                    <p className="text-sm font-bold mt-0.5">₦31.0M</p>
                </div>
                <div className="flex-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 shadow-sm min-w-[120px]">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Tax Owed</p>
                    <p className="text-sm font-bold mt-0.5">₦5.5M</p>
                </div>
                <div className="flex-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 shadow-sm min-w-[120px]">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">WHT Paid</p>
                    <p className="text-sm font-bold mt-0.5">₦2.5M</p>
                </div>
            </div>

            {/* Action Grid */}
            <QuickGrid
                onFile={() => console.log('Go to File')}
                onPay={() => console.log('Go to Pay')}
                onViewDetails={() => console.log('Go to Details')}
                onAddIncome={() => console.log('Go to Add Income')}
            />

            {/* Activity List */}
            <ActivityList />
        </div>
    );
};

export default IndividualDashboardV2;
