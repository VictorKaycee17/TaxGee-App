import React from 'react';
import { XMarkIcon, ChartBarIcon, ArrowTrendingUpIcon, CreditCardIcon, DeviceTabletIcon } from '@heroicons/react/24/outline';

const AnalyticsPanel = ({ open, onClose, data }) => {
    const analyticsData = data || {
        totalSales: 15842500,
        transactionCount: 487,
        avgTransaction: 32539,
        trend: { current: 15842500, previous: 14200000, pctChange: 11.6 },
        byCategory: [
            { name: 'Electronics', amount: 7841250, pct: 49.5 },
            { name: 'Services', amount: 3960625, pct: 25.0 },
            { name: 'Retail', amount: 3168500, pct: 20.0 },
            { name: 'Other', amount: 872125, pct: 5.5 }
        ],
        byPaymentMethod: [
            { method: 'Card', amount: 11089750, pct: 70 },
            { method: 'Cash', amount: 3168500, pct: 20 },
            { method: 'USSD', amount: 1584250, pct: 10 }
        ],
        byTerminal: [
            { terminal: 'POS-001', sales: 6336900, count: 195 },
            { terminal: 'POS-002', sales: 5545075, count: 170 },
            { terminal: 'POS-003', sales: 3960625, count: 122 }
        ],
        hourlyBreakdown: [
            { hour: '09:00', sales: 1200000 },
            { hour: '10:00', sales: 1500000 },
            { hour: '11:00', sales: 1800000 },
            { hour: '12:00', sales: 2400000 },
            { hour: '13:00', sales: 2100000 },
            { hour: '14:00', sales: 1900000 },
            { hour: '15:00', sales: 1700000 },
            { hour: '16:00', sales: 1500000 },
            { hour: '17:00', sales: 1242500 }
        ]
    };

    if (!open) return null;

    const formatCurrency = (value) => `₦${(value / 1000000).toFixed(1)}M`;

    return (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <ChartBarIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">POS Analytics</h2>
                        <p className="text-xs text-slate-500">Last 7 days</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-xl text-white">
                        <p className="text-xs font-medium opacity-80">Total Sales</p>
                        <p className="text-2xl font-black">{formatCurrency(analyticsData.totalSales)}</p>
                        <div className="flex items-center gap-1 mt-1">
                            <ArrowTrendingUpIcon className="w-4 h-4" />
                            <span className="text-xs font-bold">+{analyticsData.trend.pctChange}%</span>
                        </div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                        <p className="text-xs font-medium text-slate-500">Transactions</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{analyticsData.transactionCount}</p>
                        <p className="text-xs text-slate-500 mt-1">Avg: ₦{analyticsData.avgTransaction.toLocaleString()}</p>
                    </div>
                </div>

                {/* Sales by Category */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Sales by Category</h3>
                    <div className="space-y-3">
                        {analyticsData.byCategory.map((cat, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700">{cat.name}</span>
                                    <span className="font-bold text-slate-900">{formatCurrency(cat.amount)}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-teal-500 rounded-full"
                                        style={{ width: `${cat.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Methods */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Payment Methods</h3>
                    <div className="flex gap-2">
                        {analyticsData.byPaymentMethod.map((pm, idx) => (
                            <div key={idx} className="flex-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center">
                                <CreditCardIcon className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                                <p className="text-xs font-bold text-slate-700 dark:text-white">{pm.method}</p>
                                <p className="text-sm font-black text-teal-600">{pm.pct}%</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Terminal Performance */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Terminal Performance</h3>
                    <div className="space-y-2">
                        {analyticsData.byTerminal.map((term, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <DeviceTabletIcon className="w-5 h-5 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-700 dark:text-white">{term.terminal}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(term.sales)}</p>
                                    <p className="text-xs text-slate-500">{term.count} txns</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hourly Breakdown (Simple Bar Chart) */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Hourly Sales</h3>
                    <div className="flex items-end gap-1 h-24">
                        {analyticsData.hourlyBreakdown.map((h, idx) => {
                            const maxSales = Math.max(...analyticsData.hourlyBreakdown.map(x => x.sales));
                            const height = (h.sales / maxSales) * 100;
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-teal-500 rounded-t transition-all hover:bg-teal-600"
                                        style={{ height: `${height}%` }}
                                        title={`${h.hour}: ₦${(h.sales / 1000000).toFixed(1)}M`}
                                    />
                                    <span className="text-[8px] text-slate-400 mt-1">{h.hour.split(':')[0]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 shrink-0">
                <button className="w-full py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all">
                    Export Analytics Report
                </button>
            </div>
        </div>
    );
};

export default AnalyticsPanel;
