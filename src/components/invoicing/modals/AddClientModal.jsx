import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AddClientModal = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-lg border border-slate-200">
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Add New Client</h3>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Client Name *</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g. Acme Corp" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email Address *</label>
                        <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g. contact@acme.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone Number</label>
                        <input type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500" placeholder="+234..." />
                    </div>
                </div>

                <div className="px-5 py-4 bg-slate-50 rounded-b-lg flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 font-medium hover:text-slate-800">Cancel</button>
                    <button onClick={onClose} className="px-4 py-2 bg-teal-500 text-white text-sm font-bold rounded-lg hover:bg-teal-600 shadow-sm">Save Client</button>
                </div>
            </div>
        </div>
    );
};

export default AddClientModal;
