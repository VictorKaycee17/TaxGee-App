import React, { useState } from 'react';
import { XMarkIcon, DeviceTabletIcon, SignalIcon, ArrowPathIcon, Cog6ToothIcon, PlayIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const TerminalDetailsModal = ({ open, onClose, terminal }) => {
    const [testingConnection, setTestingConnection] = useState(false);

    if (!open || !terminal) return null;

    const terminalData = {
        ...terminal,
        type: 'Fixed',
        provider: 'Paystack',
        serialNumber: 'PSK-12345',
        connectionStatus: terminal.status === 'online' ? 'Connected' : 'Disconnected',
        health: terminal.status === 'online' ? 98 : 0,
        todaySummary: {
            totalSales: terminal.sales || 125000,
            transactions: terminal.transactions || 35,
            avgTransaction: terminal.avgTicket || 3571,
            byMethod: [
                { method: 'Card', amount: (terminal.sales || 125000) * 0.7, pct: 70 },
                { method: 'Cash', amount: (terminal.sales || 125000) * 0.2, pct: 20 },
                { method: 'USSD', amount: (terminal.sales || 125000) * 0.1, pct: 10 }
            ]
        },
        recentTransactions: [
            { time: '2:45 PM', amount: 15000, method: 'Card', category: 'Electronics' },
            { time: '2:30 PM', amount: 8500, method: 'Cash', category: 'Services' },
            { time: '2:15 PM', amount: 6200, method: 'Card', category: 'Retail' },
            { time: '2:00 PM', amount: 3450, method: 'USSD', category: 'Services' },
            { time: '1:45 PM', amount: 12500, method: 'Card', category: 'Electronics' }
        ]
    };

    const handleTestConnection = () => {
        setTestingConnection(true);
        setTimeout(() => {
            setTestingConnection(false);
            alert('✓ Connection test successful!');
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${terminal.status === 'online' ? 'bg-emerald-100' : 'bg-rose-100'
                            }`}>
                            <DeviceTabletIcon className={`w-6 h-6 ${terminal.status === 'online' ? 'text-emerald-600' : 'text-rose-600'
                                }`} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{terminal.name}</h2>
                            <p className="text-xs text-slate-500">{terminal.id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    {/* Status Banner */}
                    <div className={`p-4 rounded-xl flex items-center justify-between ${terminal.status === 'online'
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-rose-50 border border-rose-200'
                        }`}>
                        <div className="flex items-center gap-3">
                            {terminal.status === 'online'
                                ? <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                                : <ExclamationCircleIcon className="w-6 h-6 text-rose-500" />
                            }
                            <div>
                                <p className={`text-sm font-bold ${terminal.status === 'online' ? 'text-emerald-700' : 'text-rose-700'
                                    }`}>
                                    {terminal.status === 'online' ? 'Terminal Active' : 'Terminal Offline'}
                                </p>
                                <p className="text-xs text-slate-500">Last sync: {terminal.lastSync}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <SignalIcon className={`w-5 h-5 ${terminal.status === 'online' ? 'text-emerald-500' : 'text-rose-500'
                                }`} />
                            <span className="text-sm font-bold">{terminalData.health}%</span>
                        </div>
                    </div>

                    {/* Terminal Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Terminal Info</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Type</span>
                                    <span className="font-medium">{terminalData.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Provider</span>
                                    <span className="font-medium">{terminalData.provider}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Serial</span>
                                    <span className="font-medium">{terminalData.serialNumber}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Today's Summary</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Sales</span>
                                    <span className="font-bold text-teal-600">₦{terminalData.todaySummary.totalSales.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Transactions</span>
                                    <span className="font-medium">{terminalData.todaySummary.transactions}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Avg Ticket</span>
                                    <span className="font-medium">₦{terminalData.todaySummary.avgTransaction.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase mb-3">Sales by Payment Method</p>
                        <div className="flex gap-2">
                            {terminalData.todaySummary.byMethod.map((pm, idx) => (
                                <div key={idx} className="flex-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center">
                                    <p className="text-xs font-bold text-slate-700">{pm.method}</p>
                                    <p className="text-lg font-black text-teal-600">{pm.pct}%</p>
                                    <p className="text-xs text-slate-500">₦{(pm.amount / 1000).toFixed(0)}K</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Transactions</p>
                        <div className="space-y-2">
                            {terminalData.recentTransactions.map((txn, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-slate-500">{txn.time}</span>
                                        <span className="text-sm font-medium text-slate-700">{txn.category}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs px-2 py-0.5 bg-slate-200 rounded">{txn.method}</span>
                                        <span className="text-sm font-bold text-slate-900">₦{txn.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 shrink-0">
                    <div className="flex gap-2">
                        <button
                            onClick={handleTestConnection}
                            disabled={testingConnection}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all disabled:opacity-50"
                        >
                            <PlayIcon className={`w-4 h-4 ${testingConnection ? 'animate-pulse' : ''}`} />
                            {testingConnection ? 'Testing...' : 'Test Connection'}
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all">
                            <ArrowPathIcon className="w-4 h-4" />
                            Reconcile
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-all">
                            <Cog6ToothIcon className="w-4 h-4" />
                            Configure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalDetailsModal;
