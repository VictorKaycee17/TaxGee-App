import React from 'react';


const InvoicingHeader = ({ title = "e-Invoicing", breadcrumbs = [], actionButton }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
                <div className="flex items-center text-xs text-slate-500 mb-1">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>e-Invoicing</span>
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <span className="mx-2">/</span>
                            <span className={index === breadcrumbs.length - 1 ? 'font-medium text-slate-700 dark:text-slate-300' : ''}>
                                {crumb.label}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
                <p className="text-sm text-slate-500 mt-1">Manage and track all your invoices in one place</p>
            </div>

            {actionButton && (
                <button
                    onClick={actionButton.onClick}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow active:scale-95"
                >
                    {actionButton.icon}
                    {actionButton.label}
                </button>
            )}
        </div>
    );
};

export default InvoicingHeader;
