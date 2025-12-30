import React from 'react';
import {
    ClockIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid';

const UpcomingObligations = ({ items, onFileNow, onPrepare, onViewCalendar }) => {
    const statusConfig = {
        overdue: { icon: <ExclamationTriangleIcon />, color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-200', label: 'OVERDUE' },
        approaching: { icon: <ClockIcon />, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', label: 'DUE SOON' },
        scheduled: { icon: <InformationCircleIcon />, color: 'text-slate-500', bgColor: 'bg-slate-50', borderColor: 'border-slate-200', label: 'SCHEDULED' },
        completed: { icon: <CheckCircleIcon />, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', label: 'DONE' },
    };

    const handleActionClick = (item) => {
        if (item.status === 'overdue') {
            onFileNow && onFileNow(item);
        } else {
            onPrepare && onPrepare(item);
        }
    };

    return (
        <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-teal-500" />
                    Upcoming Obligations
                </h3>
                <button
                    onClick={onViewCalendar}
                    className="text-[10px] sm:text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
                >
                    View Full Calendar
                    <ChevronRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
                {items.map((item) => {
                    const cfg = statusConfig[item.status] || statusConfig.scheduled;
                    return (
                        <div
                            key={item.id}
                            className={`p-3 sm:p-4 rounded-xl border-l-[3px] sm:border-l-4 ${cfg.bgColor} dark:bg-slate-800/50 ${cfg.borderColor} border-slate-200/50 border-r border-t border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:shadow-sm transition-all`}
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${cfg.color} ${cfg.bgColor.replace('50', '100')} dark:bg-slate-800 shrink-0`}>
                                    {React.cloneElement(cfg.icon, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">{item.title}</h4>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <span className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded ${cfg.bgColor.replace('50', '200')} ${cfg.color}`}>
                                            {cfg.label}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-slate-500">Due: {item.dueDate.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span>
                                        <span className={`text-[10px] sm:text-xs font-semibold ${cfg.color}`}>• {item.daysRemaining}d</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleActionClick(item)}
                                className={`w-full sm:w-auto px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${item.status === 'overdue'
                                    ? 'bg-rose-500 text-white shadow-sm hover:bg-rose-600'
                                    : 'bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {item.status === 'overdue' ? 'File Now' : 'Prepare'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingObligations;
