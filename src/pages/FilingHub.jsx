import React, { useState, lazy, Suspense } from 'react';
import FilingHubHeader from '../components/filingHub/FilingHubHeader';
import ReturnCard from '../components/filingHub/ReturnCard';

// Lazy load wizard
const CreateReturnWizard = lazy(() => import('../components/filingHub/CreateReturnWizard'));

const FilingHub = () => {
    // State
    const [showCreateWizard, setShowCreateWizard] = useState(false);

    // Mock Data
    const [returns, setReturns] = useState([
        {
            id: 'ret-001',
            taxType: 'vat',
            periodLabel: 'Dec 2025 VAT Return',
            periodDates: 'Dec 1 - Dec 31, 2025',
            status: 'draft',
            amount: 1245000,
            dueDate: 'Jan 21, 2026'
        },
        {
            id: 'ret-002',
            taxType: 'cit',
            periodLabel: 'Q4 2025 CIT',
            periodDates: 'Oct 1 - Dec 31, 2025',
            status: 'pending',
            amount: 850000,
            dueDate: 'Jan 31, 2026'
        },
        {
            id: 'ret-003',
            taxType: 'vat',
            periodLabel: 'Nov 2025 VAT Return',
            periodDates: 'Nov 1 - Nov 30, 2025',
            status: 'filed',
            amount: 1120000,
            dueDate: 'Dec 21, 2025'
        },
        {
            id: 'ret-004',
            taxType: 'wht',
            periodLabel: 'Nov 2025 WHT',
            periodDates: 'Nov 1 - Nov 30, 2025',
            status: 'overdue',
            amount: 125000,
            dueDate: 'Dec 21, 2025'
        }
    ]);

    // Handlers
    const handleCreateReturn = () => {
        setShowCreateWizard(true);
    };

    const handleSyncData = async () => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    };

    const handleContinueReturn = (ret) => {
        // Logic to open editor
        setShowCreateWizard(true); // Reusing wizard for demo
    };

    const handleFileNow = (ret) => {
        // Logic to jump to filing step
        setShowCreateWizard(true);
    };

    const handleViewReturn = (ret) => {
        alert('Opening read-only view of return ' + ret.id);
    };

    const handleAction = (action, ret) => {
        console.log(`Action ${action} on return ${ret.id}`);
        if (action === 'delete') {
            if (confirm('Are you sure you want to delete this draft?')) {
                setReturns(returns.filter(r => r.id !== ret.id));
            }
        }
    };

    // Derived Lists
    const activeReturns = returns.filter(r => r.status !== 'filed');
    const filedReturns = returns.filter(r => r.status === 'filed');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <FilingHubHeader
                onCreateReturn={handleCreateReturn}
                onViewAllReturns={() => alert('View list view...')}
                onSyncData={handleSyncData}
                onSettings={() => alert('Settings...')}
            />

            <div className="max-w-[1400px] mx-auto px-6">

                {/* Active Returns Section */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Active Returns (Action Required)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {activeReturns.map(ret => (
                            <ReturnCard
                                key={ret.id}
                                data={ret}
                                onContinue={handleContinueReturn}
                                onFileNow={handleFileNow}
                                onAction={handleAction}
                            />
                        ))}

                        {/* New Return Card Prompt */}
                        <button
                            onClick={handleCreateReturn}
                            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all min-h-[220px] group"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-2xl font-light">+</span>
                            </div>
                            <span className="font-bold">Start New Return</span>
                        </button>
                    </div>
                </div>

                {/* Recent History Section */}
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Filings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                        {filedReturns.map(ret => (
                            <ReturnCard
                                key={ret.id}
                                data={ret}
                                onView={handleViewReturn}
                                onAction={handleAction}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Suspense fallback={null}>
                {showCreateWizard && (
                    <CreateReturnWizard
                        open={showCreateWizard}
                        onClose={() => setShowCreateWizard(false)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default FilingHub;
