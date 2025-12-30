import React, { useState } from 'react';
import {
    XMarkIcon,
    ArrowDownTrayIcon,
    PencilIcon,
    TrashIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

const ReceiptDetailsModal = ({ receipt, onClose }) => {
    const [activeTab, setActiveTab] = useState('details');

    if (!receipt) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{receipt.vendor}</h2>
                        <span className="text-sm text-slate-500">{receipt.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                            <PencilIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors" title="Download">
                            <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-slate-300 mx-2"></div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Image Viewer */}
                    <div className="flex-1 bg-slate-900 flex items-center justify-center relative group">
                        <div className="text-center text-slate-400">
                            <DocumentTextIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
                            <p>Receipt Image Preview</p>
                        </div>
                        {/* Zoom controls could go here */}
                    </div>

                    {/* Right: Data Panel */}
                    <div className="w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col">

                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 dark:border-slate-800">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'details' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                Details
                            </button>
                            <button
                                onClick={() => setActiveTab('audit')}
                                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'audit' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                Audit Trail
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === 'details' ? (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Total Amount</p>
                                        <p className="text-3xl font-black text-slate-900 dark:text-white">₦{receipt.amount.toLocaleString()}</p>
                                    </div>

                                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">Category</span>
                                            <span className="text-sm font-bold">{receipt.category}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">Status</span>
                                            <span className="text-sm font-bold capitalize">{receipt.status}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">Payment</span>
                                            <span className="text-sm font-bold">Card ending 4242</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Tax Breakdown</p>
                                        <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-sm">Subtotal</span>
                                            <span className="font-bold">₦{((receipt.amount || 0) * 0.925).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-sm">VAT Input (7.5%)</span>
                                            <span className="font-bold text-emerald-600">₦{((receipt.amount || 0) * 0.075).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Notes</p>
                                        <p className="text-sm text-slate-600 italic">"Client lunch meeting regarding Q4 project scope."</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white"></div>
                                            <p className="text-xs text-slate-500 mb-0.5">Today, 10:30 AM</p>
                                            <p className="text-sm font-bold text-slate-900">Edited by You</p>
                                            <p className="text-xs text-slate-500">Changed category to 'Meals'</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                                            <p className="text-xs text-slate-500 mb-0.5">Today, 10:28 AM</p>
                                            <p className="text-sm font-bold text-slate-900">Auto-Categorized</p>
                                            <p className="text-xs text-slate-500">System assigned 'Food'</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                                            <p className="text-xs text-slate-500 mb-0.5">Today, 10:28 AM</p>
                                            <p className="text-sm font-bold text-slate-900">Uploaded</p>
                                            <p className="text-xs text-slate-500">Receipt captured via Web</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptDetailsModal;
