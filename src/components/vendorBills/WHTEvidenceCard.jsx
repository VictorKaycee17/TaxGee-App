import React from 'react';
import { ChartBarIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const WHTEvidenceCard = ({ onViewSchedule }) => {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">WHT Evidence</h3>
                    <p className="text-xs text-indigo-200">Withholding Tax Credit Notes</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                <div>
                    <p className="text-xs text-indigo-200 mb-1">Total WHT</p>
                    <p className="text-xl font-black">₦125,000</p>
                </div>
                <div>
                    <p className="text-xs text-indigo-200 mb-1">Pending Proof</p>
                    <p className="text-xl font-black text-amber-300">2 Items</p>
                </div>
            </div>

            <button
                onClick={onViewSchedule}
                className="w-full py-2.5 bg-white text-indigo-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors relative z-10"
            >
                View WHT Schedule
                <ArrowRightIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

export default WHTEvidenceCard;
