import React, { useState, lazy, Suspense } from 'react';
import ReceiptsHeader from '../components/receipts/ReceiptsHeader';
import ReceiptsFilters from '../components/receipts/ReceiptsFilters';
import ReceiptsList from '../components/receipts/ReceiptsList';

const UploadReceiptModal = lazy(() => import('../components/receipts/UploadReceiptModal'));
const ReceiptDetailsModal = lazy(() => import('../components/receipts/ReceiptDetailsModal'));

const Receipts = () => {
    // State
    const [viewMode, setViewMode] = useState('grid');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    // Mock Data
    const [receipts, setReceipts] = useState([
        { id: 1, vendor: 'Acme Supermarket', date: '2025-12-25', amount: 15000, category: 'Supplies', taxType: 'VAT', status: 'processed' },
        { id: 2, vendor: 'Uber Ride', date: '2025-12-24', amount: 4500, category: 'Transport', taxType: 'None', status: 'processed' },
        { id: 3, vendor: 'Chicken Republic', date: '2025-12-23', amount: 8200, category: 'Meals', taxType: 'VAT', status: 'flagged' },
        { id: 4, vendor: 'Fuel Station', date: '2025-12-22', amount: 25000, category: 'Transport', taxType: 'None', status: 'pending' },
        { id: 5, vendor: 'Eko Hotels', date: '2025-12-20', amount: 150000, category: 'Travel', taxType: 'VAT', status: 'processed' },
    ]);

    // Handlers
    const handleSearch = (query) => {
        console.log('Search:', query);
    };

    const handleFilterChange = (filters) => {
        console.log('Filters:', filters);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <ReceiptsHeader
                onUploadReceipt={() => setShowUploadModal(true)}
                onSearch={handleSearch}
                onViewReports={() => alert('Reports coming soon')}
                onSettings={() => alert('Settings coming soon')}
            />

            <div className="max-w-[1400px] mx-auto px-6">

                {/* Stats Widget (Optional) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-500 uppercase font-bold">Total Spent (Dec)</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">₦202,700</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-500 uppercase font-bold">VAT Deductible</p>
                        <p className="text-xl font-black text-emerald-600">₦15,200</p>
                    </div>
                </div>

                <ReceiptsFilters
                    viewMode={viewMode}
                    onToggleView={setViewMode}
                    onFilterChange={handleFilterChange}
                    onClearFilters={() => console.log('Clear')}
                />

                <ReceiptsList
                    receipts={receipts}
                    viewMode={viewMode}
                    onSelectionChange={() => { }}
                    onViewReceipt={setSelectedReceipt}
                />
            </div>

            {/* Modals */}
            <Suspense fallback={null}>
                {showUploadModal && (
                    <UploadReceiptModal
                        open={showUploadModal}
                        onClose={() => setShowUploadModal(false)}
                    />
                )}
                {selectedReceipt && (
                    <ReceiptDetailsModal
                        receipt={selectedReceipt}
                        onClose={() => setSelectedReceipt(null)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default Receipts;
