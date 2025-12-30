import React from 'react';
import { SignalIcon, SignalSlashIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const TerminalCardsGrid = ({ terminals = [], onTerminalClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {terminals.map(terminal => (
                <div
                    key={terminal.id}
                    onClick={() => onTerminalClick && onTerminalClick(terminal)}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600 transition-all cursor-pointer group"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${terminal.status === 'online' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                }`}>
                                {terminal.status === 'online' ? <SignalIcon className="w-5 h-5" /> : <SignalSlashIcon className="w-5 h-5" />}
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{terminal.name}</h3>
                                <p className="text-xs text-slate-500">{terminal.id}</p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onTerminalClick && onTerminalClick(terminal);
                            }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Sales</span>
                            <span className="font-bold text-teal-600">₦{terminal.sales.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Transactions</span>
                            <span className="font-medium text-slate-900 dark:text-white">{terminal.transactions}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Avg Ticket</span>
                            <span className="font-medium text-slate-900 dark:text-white">₦{terminal.avgTicket.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Footer - Status */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${terminal.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                                }`}></div>
                            <span className={`text-xs font-bold ${terminal.status === 'online' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600'
                                }`}>
                                {terminal.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                        </div>
                        <span className="text-xs text-slate-400">Last: {terminal.lastSync}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TerminalCardsGrid;
