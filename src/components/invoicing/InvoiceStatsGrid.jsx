import React from 'react';
import StatCard from './StatCard';
import {
    DocumentTextIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const InvoiceStatsGrid = ({ stats }) => {
    // Default stats if not provided
    const defaultStats = {
        outstandingCount: 12,
        outstandingAmount: '₦2,847,500.00',
        overdueCount: 3,
        overdueAmount: '₦547,350.00',
        paidTodayCount: 4,
        paidTodayAmount: '₦1,234,500.00',
        draftCount: 7
    };

    const data = { ...defaultStats, ...stats };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
                title={
                    <>
                        <ClockIcon className="w-4 h-4" />
                        Outstanding Invoices
                    </>
                }
                count={data.outstandingCount}
                amount={`${data.outstandingAmount} due`}
                secondaryInfo="Oldest: 15 days overdue"
                linkText="View Overdue"
                type="warning"
            />

            <StatCard
                title={
                    <>
                        <ExclamationCircleIcon className="w-4 h-4" />
                        Overdue Invoices
                    </>
                }
                count={data.overdueCount}
                amount={`${data.overdueAmount} overdue`}
                secondaryInfo="⚠️ Action Required"
                linkText="Send Reminders"
                type="danger"
            />

            <StatCard
                title={
                    <>
                        <CheckCircleIcon className="w-4 h-4" />
                        Paid Today
                    </>
                }
                count={data.paidTodayCount}
                amount={`${data.paidTodayAmount} received`}
                secondaryInfo="Updated: 2 hours ago"
                linkText="View Details"
                type="success"
            />

            <StatCard
                title={
                    <>
                        <DocumentTextIcon className="w-4 h-4" />
                        Draft Invoices
                    </>
                }
                count={data.draftCount}
                amount="Ready to send"
                secondaryInfo=""
                linkText="Manage Drafts"
                type="info"
            />
        </div>
    );
};

export default InvoiceStatsGrid;
