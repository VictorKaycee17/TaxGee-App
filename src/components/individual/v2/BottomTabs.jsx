import React from 'react';
import { HomeIcon, DocumentCheckIcon, CreditCardIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolid, DocumentCheckIcon as DocSolid, CreditCardIcon as CardSolid, Cog6ToothIcon as CogSolid } from '@heroicons/react/24/solid';

const BottomTabs = ({ activeTab, onSwitch }) => {
    const tabs = [
        { id: 'dashboard', label: 'Home', icon: HomeIcon, activeIcon: HomeSolid },
        { id: 'filing', label: 'Filing', icon: DocumentCheckIcon, activeIcon: DocSolid },
        { id: 'payment', label: 'Payment', icon: CreditCardIcon, activeIcon: CardSolid },
        { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, activeIcon: CogSolid },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
            <div className="flex justify-between items-center max-w-lg mx-auto">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = isActive ? tab.activeIcon : tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onSwitch(tab.id)}
                            className={`flex flex-col items-center gap-1 p-2 transition-all duration-200 ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                        >
                            <Icon className={`w-6 h-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
                            <span className="text-[10px] font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomTabs;
