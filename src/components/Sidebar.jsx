import React from 'react';
import {
    HomeIcon,
    DocumentTextIcon,
    ReceiptPercentIcon,
    BookOpenIcon,
    CalendarDaysIcon,
    UsersIcon,
    ShieldCheckIcon,
    ReceiptRefundIcon,
    DocumentCheckIcon,
    BanknotesIcon,
    ClipboardDocumentCheckIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ activePage, onNavigate, isOpen, onClose, mode = 'company' }) => {
    // Company Menu Structure (Existing)
    const companyMenu = [
        {
            type: 'link',
            id: 'dashboard',
            label: 'Dashboard',
            icon: <HomeIcon className="w-5 h-5" />
        },
        {
            type: 'section',
            label: 'REVENUE',
            items: [
                { id: 'posSales', label: 'POS Sales', icon: <BanknotesIcon className="w-5 h-5" /> },
                { id: 'invoicing', label: 'e-Invoicing', icon: <DocumentTextIcon className="w-5 h-5" /> },
                { id: 'salestax', label: 'Sales Tax', icon: <ReceiptPercentIcon className="w-5 h-5" /> },
            ]
        },
        {
            type: 'section',
            label: 'EXPENDITURE',
            items: [
                { id: 'receipts', label: 'Receipts', icon: <ReceiptRefundIcon className="w-5 h-5" /> },
                { id: 'vendorBills', label: 'Vendor Bills', icon: <ClipboardDocumentCheckIcon className="w-5 h-5" /> },
                { id: 'payroll', label: 'Payroll', icon: <UsersIcon className="w-5 h-5" /> },
            ]
        },
        {
            type: 'section',
            label: 'COMPLIANCE',
            items: [
                { id: 'filingHub', label: 'Filing Hub', icon: <DocumentCheckIcon className="w-5 h-5" /> },
                { id: 'calendar', label: 'Compliance Calendar', icon: <CalendarDaysIcon className="w-5 h-5" /> },
                { id: 'policy', label: 'Policy Engine', icon: <BookOpenIcon className="w-5 h-5" /> },
            ]
        },
        {
            type: 'link',
            id: 'audit',
            label: 'Audits',
            icon: <ShieldCheckIcon className="w-5 h-5" />
        },
        {
            type: 'link',
            id: 'settings',
            label: 'Settings',
            icon: <Cog6ToothIcon className="w-5 h-5" />
        }
    ];

    // Individual Menu Structure (New)
    const individualMenu = [
        {
            type: 'link',
            id: 'dashboard',
            label: 'Dashboard', // Maps to Income Tracker Part A primarily or Overview
            icon: <HomeIcon className="w-5 h-5" />
        },
        {
            type: 'section',
            label: 'PERSONAL FINANCE',
            items: [
                { id: 'income', label: 'Income Tracker', icon: <BanknotesIcon className="w-5 h-5" /> },
                { id: 'expenses', label: 'Expenses & Reliefs', icon: <ReceiptRefundIcon className="w-5 h-5" /> },
            ]
        },
        {
            type: 'section',
            label: 'TAX MANAGEMENT',
            items: [
                { id: 'taxPosition', label: 'Tax Position', icon: <ReceiptPercentIcon className="w-5 h-5" /> },
                { id: 'filing', label: 'Filing & Returns', icon: <DocumentCheckIcon className="w-5 h-5" /> },
            ]
        },
        {
            type: 'link',
            id: 'settings',
            label: 'Settings',
            icon: <Cog6ToothIcon className="w-5 h-5" />
        }
    ];

    const menuStructure = mode === 'individual' ? individualMenu : companyMenu;

    const MenuLink = ({ item }) => (
        <button
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group
            ${activePage === item.id
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
        >
            <div className={`transition-transform duration-200 ${activePage === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
            </div>
            <span className="font-medium text-sm">{item.label}</span>
        </button>
    );

    return (
        <aside className={`
            w-[260px] bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-30 transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            {/* Logo Area */}
            <div className="p-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center text-white text-lg font-black">T</span>
                    TAXGEE
                </h1>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 text-slate-400 hover:text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Navigation Menus */}
            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
                {menuStructure.map((section, index) => {
                    if (section.type === 'link') {
                        return <MenuLink key={section.id} item={section} />;
                    }

                    if (section.type === 'section') {
                        return (
                            <div key={index} className="space-y-1">
                                <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-2">
                                    {section.label}
                                </h3>
                                {section.items.map(item => (
                                    <MenuLink key={item.id} item={item} />
                                ))}
                            </div>
                        );
                    }
                    return null;
                })}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-slate-800">
                <div
                    onClick={() => onNavigate('profile')}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors group"
                >
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border-2 border-teal-500/20 group-hover:border-teal-500 transition-colors">
                        JO
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-teal-400 transition-colors">Jane Obi</p>
                        <p className="text-xs text-slate-500 truncate">jane@acme.ng</p>
                    </div>
                    {/* Add visual cue for clickability */}
                    <div className="text-slate-600 group-hover:text-teal-500 transition-colors">•</div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
