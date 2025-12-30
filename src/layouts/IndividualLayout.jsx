import React from 'react';
import BottomTabs from '../components/individual/v2/BottomTabs';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const IndividualLayout = ({ children, activePage, onNavigate }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 font-inter text-slate-900 dark:text-white">
            {/* Minimal Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm shadow-sm">
                        T
                    </span>
                    <span className="font-bold text-lg tracking-tight">TaxGee</span>
                </div>
                <button
                    onClick={() => onNavigate('profile')}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                    <UserCircleIcon className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-lg mx-auto animate-fade-in">
                {children}
            </main>

            {/* Bottom Navigation */}
            <BottomTabs activeTab={activePage} onSwitch={onNavigate} />
        </div>
    );
};

export default IndividualLayout;
