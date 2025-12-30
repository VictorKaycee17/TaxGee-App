import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';

const StatCard = ({ title, count, amount, secondaryInfo, linkText, linkAction, type = 'default' }) => {

    const styles = {
        warning: {
            borderLeft: 'border-amber-500',
            link: 'text-amber-600 hover:text-amber-700'
        },
        danger: {
            borderLeft: 'border-rose-500',
            link: 'text-rose-600 hover:text-rose-700'
        },
        success: {
            borderLeft: 'border-emerald-500',
            link: 'text-emerald-600 hover:text-emerald-700'
        },
        info: {
            borderLeft: 'border-slate-400',
            link: 'text-slate-600 hover:text-slate-800'
        },
        default: {
            borderLeft: 'border-slate-200',
            link: 'text-teal-600 hover:text-teal-700'
        }
    };

    const currentStyle = styles[type] || styles.default;

    return (
        <div className={`bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 ${currentStyle.borderLeft}`}>
            <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                {title}
            </h3>

            <div className="space-y-1 mb-4">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {typeof count === 'number' ? count : 0} <span className="text-sm font-normal text-slate-500">invoices</span>
                </p>
                {amount && (
                    <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                        {amount}
                    </p>
                )}
            </div>

            <div className="flex items-end justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                    {secondaryInfo}
                </p>
                {linkText && (
                    <button
                        onClick={linkAction}
                        className={`text-xs font-semibold inline-flex items-center gap-1 ${currentStyle.link} transition-colors`}
                    >
                        {linkText}
                        <ArrowLongRightIcon className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default StatCard;
