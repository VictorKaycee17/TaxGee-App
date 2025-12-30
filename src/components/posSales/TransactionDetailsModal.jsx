import React from 'react';
import { XMarkIcon, PrinterIcon, EnvelopeIcon, ExclamationTriangleIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const TransactionDetailsModal = ({ open, onClose, transaction, onPrevious, onNext }) => {
    if (!open || !transaction) return null;

    const txnDetails = {
        ...transaction,
        transactionId: `TXN-${new Date().getFullYear()}${String(transaction.id).padStart(6, '0')}`,
        status: 'Completed',
        dateTime: `Dec 25, 2025 | ${transaction.time}`,
        terminalName: transaction.terminal,
        paymentDetails: {
            method: transaction.method,
            cardLast4: transaction.method === 'card' ? '4242' : null,
            cardholder: transaction.method === 'card' ? 'Jane Doe' : null,
            authCode: 'AUTH-12345678',
            merchantRef: `TXN-${String(transaction.id).padStart(3, '0')}`,
            receiptNumber: `RCP-2025-${String(transaction.id).padStart(3, '0')}`
        },
        lineItems: [
            { name: 'Product Item 1', qty: 1, price: transaction.amount * 0.6 },
            { name: 'Product Item 2', qty: 1, price: transaction.amount * 0.4 }
        ],
        reconciliation: {
            bankReconciled: true,
            bankSettlement: transaction.amount * 0.98,
            matched: true,
            settlementDate: 'Dec 27, 2025'
        },
        taxInfo: {
            category: transaction.category,
            classification: 'Taxable (7.5% VAT)',
            vatApplied: transaction.amount * 0.075,
            deductible: true
        }
    };

    const handlePrint = () => {
        alert('🖨️ Printing receipt...');
    };

    const handleEmail = () => {
        alert('📧 Email receipt sent!');
    };

    const handleDispute = () => {
        alert('⚠️ Opening dispute form...');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden animate-fade-in flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Transaction Details</h2>
                        <p className="text-xs text-slate-500">{txnDetails.transactionId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {onPrevious && (
                            <button onClick={onPrevious} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronLeftIcon className="w-5 h-5 text-slate-500" />
                            </button>
                        )}
                        {onNext && (
                            <button onClick={onNext} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronRightIcon className="w-5 h-5 text-slate-500" />
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    {/* Status Banner */}
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <div className="flex items-center gap-2">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm font-bold text-emerald-700">{txnDetails.status}</span>
                        </div>
                        <span className="text-xs text-slate-500">{txnDetails.dateTime}</span>
                    </div>

                    {/* Amount */}
                    <div className="text-center py-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <p className="text-xs text-slate-500 mb-1">Amount</p>
                        <p className="text-3xl font-black text-slate-900 dark:text-white">₦{transaction.amount.toLocaleString()}</p>
                        <p className="text-sm text-slate-500 mt-1">{txnDetails.terminalName}</p>
                    </div>

                    {/* Payment Details */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Payment Details</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Method</span>
                                <span className="font-medium capitalize">{txnDetails.paymentDetails.method}</span>
                            </div>
                            {txnDetails.paymentDetails.cardLast4 && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Card</span>
                                        <span className="font-medium">•••• {txnDetails.paymentDetails.cardLast4}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Cardholder</span>
                                        <span className="font-medium">{txnDetails.paymentDetails.cardholder}</span>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between">
                                <span className="text-slate-500">Auth Code</span>
                                <span className="font-medium font-mono">{txnDetails.paymentDetails.authCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Receipt #</span>
                                <span className="font-medium">{txnDetails.paymentDetails.receiptNumber}</span>
                            </div>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Line Items</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2 text-sm">
                            {txnDetails.lineItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <span className="text-slate-600">{item.name} x{item.qty}</span>
                                    <span className="font-medium">₦{item.price.toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between font-bold">
                                <span>Total</span>
                                <span className="text-teal-600">₦{transaction.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Reconciliation Status */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Reconciliation</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Bank Reconciled</span>
                                <span className="font-medium text-emerald-600">✓ Yes</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Settlement Amount</span>
                                <span className="font-medium">₦{txnDetails.reconciliation.bankSettlement.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Settlement Date</span>
                                <span className="font-medium">{txnDetails.reconciliation.settlementDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tax Info */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tax Information</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Category</span>
                                <span className="font-medium">{txnDetails.taxInfo.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Classification</span>
                                <span className="font-medium">{txnDetails.taxInfo.classification}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">VAT Applied</span>
                                <span className="font-medium">₦{txnDetails.taxInfo.vatApplied.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 shrink-0">
                    <div className="flex gap-2">
                        <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all">
                            <PrinterIcon className="w-4 h-4" />
                            Print
                        </button>
                        <button onClick={handleEmail} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all">
                            <EnvelopeIcon className="w-4 h-4" />
                            Email
                        </button>
                        <button onClick={handleDispute} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-100 text-amber-700 text-sm font-bold rounded-xl hover:bg-amber-200 transition-all">
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            Dispute
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsModal;
