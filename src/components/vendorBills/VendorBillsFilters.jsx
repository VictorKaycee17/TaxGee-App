import React, { useState } from 'react';
import {
    CalendarDaysIcon,
    FunnelIcon,
    XMarkIcon,
    UserIcon,
    TagIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const VendorBillsFilters = ({ onFilterChange, onClearFilters }) => {
    // State for filters
    const [dateRange, setDateRange] = useState('30days');
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [status, setStatus] = useState('all');
    const [taxType, setTaxType] = useState('all');

    // UI state for dropdowns
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleApply = () => {
        onFilterChange({
            dateRange,
            vendors: selectedVendors,
            status,
            taxType
        });
        setOpenDropdown(null);
    };

    const handleClear = () => {
        setDateRange('30days');
        setSelectedVendors([]);
        setStatus('all');
        setTaxType('all');
        onFilterChange({}); // Notify parent of reset
        onClearFilters && onClearFilters();
    };

    const hasActiveFilters = dateRange !== '30days' || selectedVendors.length > 0 || status !== 'all' || taxType !== 'all';

    // Mock Options
    const vendorOptions = [
        { id: 1, name: 'Acme Inc' },
        { id: 2, name: 'Tech Corp' },
        { id: 3, name: 'Office Supplies Ltd' },
        { id: 4, name: 'Utilities co' },
        { id: 5, name: 'MainOne Services' }
    ];

    return (
        <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
            {/* Date Filter */}
            <div className="relative">
                <button
                    onClick={() => toggleDropdown('date')}
                    className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl text-sm font-medium transition-all ${dateRange !== '30days' ? 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                >
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>
                        {dateRange === 'today' && 'Today'}
                        {dateRange === '7days' && 'Last 7 Days'}
                        {dateRange === '30days' && 'Last 30 Days'}
                        {dateRange === '90days' && 'Last 90 Days'}
                        {dateRange === 'custom' && 'Custom Range'}
                    </span>
                    <span className="text-[10px] opacity-60">▼</span>
                </button>

                {openDropdown === 'date' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {['today', '7days', '30days', '90days', 'custom'].map(opt => (
                            <button
                                key={opt}
                                onClick={() => { setDateRange(opt); handleApply(); }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${dateRange === opt ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                {opt === '30days' ? 'Last 30 Days' : opt.replace(/(\d+)/, 'Last $1 ').replace('s', 's').replace(/^\w/, c => c.toUpperCase())}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Vendor Filter (Multi-select) */}
            <div className="relative">
                <button
                    onClick={() => toggleDropdown('vendor')}
                    className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl text-sm font-medium transition-all ${selectedVendors.length > 0 ? 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                >
                    <UserIcon className="w-4 h-4" />
                    <span>Vendor {selectedVendors.length > 0 ? `(${selectedVendors.length})` : 'All'}</span>
                    <span className="text-[10px] opacity-60">▼</span>
                </button>

                {openDropdown === 'vendor' && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-2">
                        <input type="text" placeholder="Search vendors..." className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <div className="max-h-48 overflow-y-auto space-y-1">
                            {vendorOptions.map(vendor => (
                                <label key={vendor.id} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedVendors.includes(vendor.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedVendors([...selectedVendors, vendor.id]);
                                            else setSelectedVendors(selectedVendors.filter(id => id !== vendor.id));
                                        }}
                                        className="rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">{vendor.name}</span>
                                </label>
                            ))}
                        </div>
                        <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
                            <button onClick={() => setSelectedVendors([])} className="text-xs text-slate-500 hover:text-slate-800">Clear</button>
                            <button onClick={handleApply} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded font-bold hover:bg-indigo-700">Apply</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Filter */}
            <div className="relative">
                <button
                    onClick={() => toggleDropdown('status')}
                    className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl text-sm font-medium transition-all ${status !== 'all' ? 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                >
                    <TagIcon className="w-4 h-4" />
                    <span className="capitalize">{status === 'all' ? 'Status: All' : status}</span>
                    <span className="text-[10px] opacity-60">▼</span>
                </button>

                {openDropdown === 'status' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {['all', 'matched', 'unmatched', 'disputed', 'pending'].map(opt => (
                            <button
                                key={opt}
                                onClick={() => { setStatus(opt); handleApply(); }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 capitalize ${status === opt ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Tax Type Filter */}
            <div className="relative">
                <button
                    onClick={() => toggleDropdown('tax')}
                    className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl text-sm font-medium transition-all ${taxType !== 'all' ? 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                >
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span className="capitalize">{taxType === 'all' ? 'Tax Type: All' : taxType.replace('-', ' ')}</span>
                    <span className="text-[10px] opacity-60">▼</span>
                </button>

                {openDropdown === 'tax' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {[
                            { id: 'all', label: 'All Types' },
                            { id: 'vat-only', label: 'VAT Only' },
                            { id: 'wht-only', label: 'WHT Only' },
                            { id: 'vat-wht', label: 'VAT & WHT' },
                            { id: 'none', label: 'Non-Taxable' }
                        ].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => { setTaxType(opt.id); handleApply(); }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${taxType === opt.id ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Apply & Clear Buttons */}
            <div className="flex items-center gap-2 ml-auto">
                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="text-sm text-slate-500 hover:text-rose-600 font-medium px-3 py-2 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                        Clear Filters
                    </button>
                )}
                <button
                    onClick={handleApply}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95"
                >
                    <FunnelIcon className="w-4 h-4" />
                    Apply
                </button>
            </div>

            {/* Close dropdowns when clicking outside overlay */}
            {openDropdown && (
                <div className="fixed inset-0 z-0" onClick={() => setOpenDropdown(null)} />
            )}
        </div>
    );
};

export default VendorBillsFilters;
