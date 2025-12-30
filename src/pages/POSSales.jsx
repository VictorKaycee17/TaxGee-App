import React, { useState, lazy, Suspense } from 'react';
import POSSalesHeader from '../components/posSales/POSSalesHeader';
import DailySalesSummary from '../components/posSales/DailySalesSummary';
import TerminalCardsGrid from '../components/posSales/TerminalCardsGrid';
import SalesByCategory from '../components/posSales/SalesByCategory';
import TransactionsTable from '../components/posSales/TransactionsTable';
import { CalendarDaysIcon, FunnelIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Lazy load modals
const ExportModal = lazy(() => import('../components/posSales/ExportModal'));
const AnalyticsPanel = lazy(() => import('../components/posSales/AnalyticsPanel'));
const TerminalDetailsModal = lazy(() => import('../components/posSales/TerminalDetailsModal'));
const TransactionDetailsModal = lazy(() => import('../components/posSales/TransactionDetailsModal'));

const POSSales = ({ onNavigate }) => {
    // Modal/Panel States
    const [showExportModal, setShowExportModal] = useState(false);
    const [showAnalyticsPanel, setShowAnalyticsPanel] = useState(false);
    const [showTerminalModal, setShowTerminalModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [selectedTerminal, setSelectedTerminal] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Sync State
    const [syncing, setSyncing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState('12:45 PM');

    // Filter State
    const [dateRange, setDateRange] = useState('today');
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Mock Data
    const summaryData = {
        totalSales: 485230,
        transactionCount: 156,
        avgTransaction: 3110,
        growth: 12,
        activeTerminals: 3,
        outputVat: 87340,
        paymentMethods: {
            cash: 194000,
            card: 266405,
            wallet: 24825
        }
    };

    const terminalsData = [
        { id: 'Pos-01', name: 'Terminal 1', sales: 125000, transactions: 35, avgTicket: 3571, status: 'online', lastSync: lastSyncTime },
        { id: 'Pos-02', name: 'Terminal 2', sales: 185400, transactions: 48, avgTicket: 3863, status: 'online', lastSync: lastSyncTime },
        { id: 'Pos-03', name: 'Terminal 3', sales: 174830, transactions: 40, avgTicket: 4371, status: 'offline', lastSync: '12:20 PM' }
    ];

    const categoriesData = [
        { name: 'Retail', amount: 245000, percentage: 50.5 },
        { name: 'Food & Beverage', amount: 156700, percentage: 32.3 },
        { name: 'Services', amount: 58400, percentage: 12.0 },
        { name: 'Other', amount: 25130, percentage: 5.2 }
    ];

    const transactionsData = [
        { id: 1, time: '14:45', terminal: 'Pos-01', amount: 5200, method: 'card', category: 'Retail', status: 'completed' },
        { id: 2, time: '14:42', terminal: 'Pos-02', amount: 8300, method: 'cash', category: 'F&B', status: 'completed' },
        { id: 3, time: '14:40', terminal: 'Pos-03', amount: 2100, method: 'card', category: 'Retail', status: 'completed' },
        { id: 4, time: '14:38', terminal: 'Pos-01', amount: 3450, method: 'wallet', category: 'Services', status: 'completed' },
        { id: 5, time: '14:35', terminal: 'Pos-02', amount: 12500, method: 'card', category: 'Retail', status: 'completed' },
        { id: 6, time: '14:30', terminal: 'Pos-03', amount: 4500, method: 'cash', category: 'F&B', status: 'completed' }
    ];

    // Handlers
    const handleSyncTerminals = async () => {
        setSyncing(true);
        // Simulate sync
        setTimeout(() => {
            setSyncing(false);
            const now = new Date();
            setLastSyncTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
            alert('✓ Synced 3 terminals successfully');
        }, 2000);
    };

    const handleAnalytics = () => {
        setShowAnalyticsPanel(true);
    };

    const handleExport = () => {
        setShowExportModal(true);
    };

    const handleSettings = () => {
        onNavigate && onNavigate('settings');
    };

    const handleTerminalClick = (terminal) => {
        setSelectedTerminal(terminal);
        setShowTerminalModal(true);
    };

    const handleTransactionView = (transaction) => {
        setSelectedTransaction(transaction);
        setShowTransactionModal(true);
    };

    const handleViewCategoryReport = () => {
        alert('📊 Opening category report...');
    };

    const handleResolveDiscrepancy = () => {
        alert('🔧 Opening reconciliation wizard...');
    };

    const dateRangeOptions = [
        { id: 'today', label: 'Today' },
        { id: 'yesterday', label: 'Yesterday' },
        { id: 'week', label: 'Last 7 Days' },
        { id: 'month', label: 'This Month' },
        { id: 'custom', label: 'Custom Range' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <POSSalesHeader
                onSync={handleSyncTerminals}
                onAnalytics={handleAnalytics}
                onExport={handleExport}
                onSettings={handleSettings}
                syncing={syncing}
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Filters Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="relative">
                        <button
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm"
                        >
                            <CalendarDaysIcon className="w-5 h-5 text-teal-500" />
                            <span className="text-sm font-bold text-slate-700">
                                {dateRangeOptions.find(d => d.id === dateRange)?.label || 'Today'}
                            </span>
                        </button>

                        {showDatePicker && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20 min-w-[180px]">
                                {dateRangeOptions.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => { setDateRange(opt.id); setShowDatePicker(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${dateRange === opt.id ? 'font-bold text-teal-600 bg-teal-50' : 'text-slate-700'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {syncing && (
                            <div className="flex items-center gap-2 text-sm text-teal-600">
                                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                <span className="font-medium">Syncing...</span>
                            </div>
                        )}
                        <span className="text-xs text-slate-500">Last sync: {lastSyncTime}</span>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 shadow-sm">
                            <FunnelIcon className="w-4 h-4 text-slate-500" />
                            Filter
                        </button>
                    </div>
                </div>

                <DailySalesSummary {...summaryData} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <TerminalCardsGrid
                            terminals={terminalsData}
                            onTerminalClick={handleTerminalClick}
                        />
                        <TransactionsTable
                            transactions={transactionsData}
                            onViewAll={() => console.log('View all txns')}
                            onViewTransaction={handleTransactionView}
                        />
                    </div>
                    <div className="space-y-6">
                        <SalesByCategory
                            categories={categoriesData}
                            onViewReport={handleViewCategoryReport}
                        />

                        {/* Enhanced Reconciliation Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                                Reconciliation Status
                                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">2 Issues</span>
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">POS Total</span>
                                    <span className="font-bold text-slate-900">₦485,230</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Bank Deposits</span>
                                    <span className="font-bold text-slate-900">₦483,500</span>
                                </div>
                                <div className="pt-2 border-t border-slate-100 flex justify-between text-amber-600 font-bold">
                                    <span>Discrepancy</span>
                                    <span>-₦1,730</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button
                                        onClick={handleResolveDiscrepancy}
                                        className="py-2.5 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-all"
                                    >
                                        Resolve
                                    </button>
                                    <button className="py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Suspense fallback={null}>
                {showExportModal && (
                    <ExportModal
                        open={showExportModal}
                        onClose={() => setShowExportModal(false)}
                    />
                )}
                {showAnalyticsPanel && (
                    <AnalyticsPanel
                        open={showAnalyticsPanel}
                        onClose={() => setShowAnalyticsPanel(false)}
                    />
                )}
                {showTerminalModal && selectedTerminal && (
                    <TerminalDetailsModal
                        open={showTerminalModal}
                        onClose={() => setShowTerminalModal(false)}
                        terminal={selectedTerminal}
                    />
                )}
                {showTransactionModal && selectedTransaction && (
                    <TransactionDetailsModal
                        open={showTransactionModal}
                        onClose={() => setShowTransactionModal(false)}
                        transaction={selectedTransaction}
                    />
                )}
            </Suspense>

            {/* Overlay for date picker */}
            {showDatePicker && (
                <div className="fixed inset-0 z-10" onClick={() => setShowDatePicker(false)} />
            )}
        </div>
    );
};

export default POSSales;
