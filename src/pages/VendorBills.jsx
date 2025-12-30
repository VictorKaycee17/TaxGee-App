import React, { useState, lazy, Suspense, useEffect } from 'react';
import VendorBillsHeader from '../components/vendorBills/VendorBillsHeader';
import VendorBillsFilters from '../components/vendorBills/VendorBillsFilters';
import VendorInvoicesTable from '../components/vendorBills/VendorInvoicesTable';
import WHTEvidenceCard from '../components/vendorBills/WHTEvidenceCard';
import TopVendorsCard from '../components/vendorBills/TopVendorsCard';

// Lazy load modals
const NewInvoiceWizard = lazy(() => import('../components/vendorBills/NewInvoiceWizard'));
const ExportVendorBillsModal = lazy(() => import('../components/vendorBills/ExportVendorBillsModal'));

const VendorBills = ({ onNavigate }) => {
    // Modal States
    const [showNewInvoice, setShowNewInvoice] = useState(false);
    const [newInvoiceMode, setNewInvoiceMode] = useState('manual');
    const [showExportModal, setShowExportModal] = useState(false);

    // Data State (Mock)
    const [invoices, setInvoices] = useState([
        { id: 'inv-001', date: 'Dec 25, 2025', vendor: 'Acme Inc', invoiceNumber: 'INV-2025-001', amount: 500000, vatAmount: 37500, whtAmount: 25000, status: 'matched' },
        { id: 'inv-002', date: 'Dec 24, 2025', vendor: 'Tech Corp', invoiceNumber: 'TC-9982', amount: 250000, vatAmount: 18750, whtAmount: 0, status: 'unmatched' },
        { id: 'inv-003', date: 'Dec 22, 2025', vendor: 'Office Supply Ltd', invoiceNumber: 'OS-4432', amount: 180000, vatAmount: 13500, whtAmount: 9000, status: 'pending' },
        { id: 'inv-004', date: 'Dec 20, 2025', vendor: 'Utilities co', invoiceNumber: 'UTIL-DEC', amount: 45000, vatAmount: 0, whtAmount: 0, status: 'matched' },
        { id: 'inv-005', date: 'Dec 18, 2025', vendor: 'MainOne Services', invoiceNumber: 'MO-8877', amount: 150000, vatAmount: 11250, whtAmount: 15000, status: 'disputed' },
    ]);

    // Handlers
    const handleNewInvoice = (mode) => {
        setNewInvoiceMode(mode);
        setShowNewInvoice(true);
    };

    const handleSearch = (query) => {
        console.log('Searching for:', query);
        // Implement filter logic here
    };

    const handleFilterChange = (filters) => {
        console.log('Filters changed:', filters);
        // Implement filter application here
    };

    const handleClearFilters = () => {
        console.log('Filters cleared');
        // Reset filters
    };

    const handleViewInvoice = (invoice) => {
        console.log('View invoice:', invoice);
        // Open details modal
    };

    const handleSelectionChange = (selectedIds) => {
        console.log('Selection changed:', selectedIds);
    };

    const handleViewWHTSchedule = () => {
        alert('Opening WHT Schedule...');
    };

    const handleViewAllVendors = () => {
        alert('Navigating to Vendor Management...');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header */}
            <VendorBillsHeader
                onNewInvoice={handleNewInvoice}
                onImportCSV={() => handleNewInvoice('csv')}
                onSearch={handleSearch}
                onAnalytics={() => alert('Opening Analytics...')}
                onExport={() => setShowExportModal(true)}
                onSettings={() => alert('Opening Settings...')}
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        {/* Filters */}
                        <VendorBillsFilters
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />

                        {/* Table */}
                        <VendorInvoicesTable
                            invoices={invoices}
                            onViewInvoice={handleViewInvoice}
                            onSelectionChange={handleSelectionChange}
                        />
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full lg:w-80 shrink-0 space-y-6">
                        <WHTEvidenceCard onViewSchedule={handleViewWHTSchedule} />
                        <TopVendorsCard onViewAll={handleViewAllVendors} />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Suspense fallback={<div className="fixed inset-0 bg-black/10 z-50"></div>}>
                {showNewInvoice && (
                    <NewInvoiceWizard
                        open={showNewInvoice}
                        onClose={() => setShowNewInvoice(false)}
                        initialMode={newInvoiceMode}
                    />
                )}
                {showExportModal && (
                    <ExportVendorBillsModal
                        open={showExportModal}
                        onClose={() => setShowExportModal(false)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default VendorBills;
