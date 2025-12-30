import React from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const PrimaryCard = ({ amount, status, dueDate, daysLeft }) => {
    // Status Logic
    const isRed = status === 'danger';
    const isYellow = status === 'warning';

    // Gradient & Borders
    const bgClass = isRed
        ? 'bg-gradient-to-br from-red-600 to-rose-700 shadow-red-500/20'
        : isYellow
            ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-orange-500/20'
            : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-teal-500/20';

    return (
        <div className={`rounded-xl p-6 text-white shadow-xl ${bgClass} relative overflow-hidden group hover:scale-[1.02] transition-transform duration-200 cursor-pointer`}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black/10 blur-xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                        Tax Balance Due
                    </span>
                    {isRed && <ExclamationTriangleIcon className="w-5 h-5 animate-pulse" />}
                    {!isRed && !isYellow && <CheckCircleIcon className="w-5 h-5" />}
                </div>

                <h2 className="text-3xl font-bold mb-1 tracking-tight">₦{amount}</h2>

                <div className="flex flex-col gap-0.5 mt-4">
                    <span className="text-sm font-medium opacity-90">Due by {dueDate}</span>
                    <span className="text-xs opacity-75 font-medium flex items-center gap-1">
                        {isRed ? '⚠️ Action Required' : '⏱️ Keeping Track'}
                        <span>•</span>
                        <span>{daysLeft} days remaining</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PrimaryCard;
