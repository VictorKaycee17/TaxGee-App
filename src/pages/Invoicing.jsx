import React, { useState, lazy, Suspense } from 'react';
import InvoicingHeader from '../components/invoicing/InvoicingHeader';
import InvoiceStatsGrid from '../components/invoicing/InvoiceStatsGrid';
import InvoicingToolbar from '../components/invoicing/InvoicingToolbar';
import InvoiceTable from '../components/invoicing/InvoiceTable';
import TablePagination from '../components/invoicing/TablePagination';
import BulkActionBar from '../components/invoicing/BulkActionBar';
import { PlusIcon } from '@heroicons/react/24/outline';

const CreateInvoiceModal = lazy(() => import('../components/invoicing/modals/CreateInvoiceModal'));
const InvoiceDetailModal = lazy(() => import('../components/invoicing/modals/InvoiceDetailModal'));
const AddClientModal = lazy(() => import('../components/invoicing/modals/AddClientModal'));

const Invoicing = () => {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Mock Data
    const invoices = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        date: 'Dec 20, 2025',
        dateRelative: `${Math.floor(Math.random() * 30)} days ago`,
        number: `INV-2025-${String(i + 1).padStart(5, '0')}`,
        client: i % 2 === 0 ? 'Acme Corp' : 'Jane Doe',
        clientEmail: i % 2 === 0 ? 'john@acme.com' : 'jane@email.com',
        amount: `₦${(Math.random() * 500000 + 50000).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        taxType: i % 3 === 0 ? 'VAT (7.5%)' : (i % 3 === 1 ? 'WHT (5%)' : 'None'),
        status: ['Paid', 'Pending', 'Overdue', 'Draft', 'Sent'][Math.floor(Math.random() * 5)],
        dueDate: 'Jan 20, 2026',
        dueRelative: 'in 20 days'
    }));

    // Selection Handlers
    const handleSelect = (id, checked) => {
        if (checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter(i => i !== id));
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(invoices.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Header */}
                <InvoicingHeader
                    actionButton={{
                        label: 'Create Invoice',
                        icon: <PlusIcon className="w-5 h-5 mr-2" />,
                        onClick: () => setShowCreateModal(true)
                    }}
                />

                {/* Stats */}
                <InvoiceStatsGrid />

                {/* Toolbar */}
                <InvoicingToolbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onCreateClick={() => setShowCreateModal(true)}
                />

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <InvoiceTable
                        invoices={invoices.slice(0, itemsPerPage)}
                        selectedIds={selectedIds}
                        onSelect={handleSelect}
                        onSelectAll={handleSelectAll}
                        onView={(inv) => {
                            setSelectedInvoice(inv);
                            setShowDetailModal(true);
                        }}
                    />
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={5}
                        totalItems={50}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                    />
                </div>
            </div>

            {/* Sticky Bulk Action Bar */}
            <BulkActionBar
                selectedCount={selectedIds.length}
                onClearSelection={() => setSelectedIds([])}
                onMarkPaid={() => alert('Marking paid...')}
                onEmail={() => alert('Sending emails...')}
                onDelete={() => alert('Deleting...')}
            />

            {/* Modals */}
            <Suspense fallback={null}>
                {showCreateModal && (
                    <CreateInvoiceModal
                        open={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                    />
                )}
                {showDetailModal && (
                    <InvoiceDetailModal
                        open={showDetailModal}
                        invoice={selectedInvoice}
                        onClose={() => setShowDetailModal(false)}
                    />
                )}
                {showClientModal && (
                    <AddClientModal
                        open={showClientModal}
                        onClose={() => setShowClientModal(false)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default Invoicing;
