import React from 'react';
import { CreditCardIcon, ArrowUpTrayIcon, SparklesIcon } from '@heroicons/react/24/outline';

const QuickActions = ({ onPayNow, onUpload, onAskAI }) => {
    const actions = [
        {
            title: 'Pay Now',
            description: 'Pay tax liability directly',
            icon: <CreditCardIcon className="w-6 h-6" />,
            bgColor: 'bg-teal-500',
            textColor: 'text-white',
            hoverColor: 'hover:bg-teal-600',
            btnLabel: 'Pay Now',
            onClick: onPayNow
        },
        {
            title: 'Upload Receipt',
            description: 'Submit expense receipts',
            icon: <ArrowUpTrayIcon className="w-6 h-6" />,
            bgColor: 'bg-slate-100 dark:bg-slate-800',
            textColor: 'text-slate-700 dark:text-slate-200',
            hoverColor: 'hover:bg-slate-200 dark:hover:bg-slate-700',
            btnLabel: 'Upload',
            borderColor: 'border-slate-200 dark:border-slate-700',
            onClick: onUpload
        },
        {
            title: 'Ask Gee-AI',
            description: 'Get quick tax advice',
            icon: <SparklesIcon className="w-6 h-6" />,
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
            textColor: 'text-indigo-700 dark:text-indigo-300',
            hoverColor: 'hover:bg-indigo-200 dark:hover:bg-indigo-900/60',
            btnLabel: 'Ask AI',
            borderColor: 'border-indigo-200 dark:border-indigo-800 border-dashed',
            onClick: onAskAI
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {actions.map((action, idx) => (
                <div
                    key={idx}
                    className={`p-6 rounded-2xl flex flex-col items-center text-center transition-all ${action.bgColor} ${action.borderColor ? `border ${action.borderColor}` : ''} group cursor-pointer hover:shadow-xl sm:hover:-translate-y-1`}
                    onClick={action.onClick}
                >
                    <div className={`p-4 rounded-xl mb-4 bg-white/20 backdrop-blur-sm shadow-sm sm:group-hover:scale-110 transition-transform`}>
                        {action.icon}
                    </div>
                    <h4 className={`font-bold mb-1 ${action.textColor}`}>{action.title}</h4>
                    <p className={`text-xs opacity-70 mb-6 ${action.textColor}`}>{action.description}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            action.onClick && action.onClick();
                        }}
                        className={`mt-auto w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${action.bgColor === 'bg-teal-500'
                            ? 'bg-white text-teal-600 hover:bg-teal-50'
                            : 'bg-primary text-white hover:opacity-90'
                            }`}
                    >
                        {action.btnLabel}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default QuickActions;
