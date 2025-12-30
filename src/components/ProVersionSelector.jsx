import React from 'react';
import { UserIcon, BuildingOffice2Icon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ProVersionSelector = ({ onSelect }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Choose Your TaxGee Pro Experience
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Select the version that best fits your tax needs. You can switch between them later.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
                {/* Individual Pro Card */}
                <div
                    onClick={() => onSelect('individual')}
                    className="group relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-8 cursor-pointer hover:border-primary dark:hover:border-primary hover:shadow-xl transition-all duration-300"
                >
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <UserIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Individual Pro</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">For employees, freelancers, and personal income tax management.</p>

                    <ul className="space-y-3 mb-8">
                        <FeatureItem text="Track Personal Income (Salary, Rent, etc.)" />
                        <FeatureItem text="Manage Personal Expenses & Reliefs" />
                        <FeatureItem text="Calculate PIT & File Returns" />
                        <FeatureItem text="Personal Receipts Wallet" />
                    </ul>

                    <button className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold group-hover:bg-primary group-hover:text-white transition-all">
                        Select Individual
                    </button>
                </div>

                {/* Company Pro Card */}
                <div
                    onClick={() => onSelect('company')}
                    className="group relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-8 cursor-pointer hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-xl transition-all duration-300"
                >
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <BuildingOffice2Icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Company Pro</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">For business owners, SMEs, and corporate tax compliance.</p>

                    <ul className="space-y-3 mb-8">
                        <FeatureItem text="Manage Invoices & Vendor Bills" />
                        <FeatureItem text="Calculate CIT & VAT" />
                        <FeatureItem text="Payroll & WHT Compliance" />
                        <FeatureItem text="POS Sales & Inventory" />
                    </ul>

                    <button className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold group-hover:bg-teal-500 group-hover:text-white transition-all">
                        Select Company
                    </button>
                </div>
            </div>

            <p className="mt-12 text-sm text-slate-400">
                Not sure? Don't worry, you can access both dashboards with your Pro subscription.
            </p>
        </div>
    );
};

const FeatureItem = ({ text }) => (
    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
        <span>{text}</span>
    </li>
);

export default ProVersionSelector;
