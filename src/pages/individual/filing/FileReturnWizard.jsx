import React, { useState } from 'react';
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const FileReturnWizard = ({ onBack }) => {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState(null);

    // Step 1: Return Type Selection
    const renderStep1 = () => (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-2">Which return are you filing?</h2>
            <p className="text-slate-500 text-sm mb-6">Select the category that best describes your income source this year.</p>

            <div className="space-y-4">
                {[
                    { id: 'paye', title: 'PAYE Return', desc: 'Employer files for you (Form A)', icon: '⭕' },
                    { id: 'da', title: 'Direct Assessment', desc: 'You file personally (Self-employed)', icon: '💼' },
                    { id: 'combined', title: 'Combined Return', desc: 'Both salary + business income', icon: '🔄' },
                ].map((option) => (
                    <button
                        key={option.id}
                        onClick={() => setSelectedType(option.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4
                            ${selectedType === option.id
                                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                : 'border-slate-200 dark:border-slate-800 hover:border-primary/50 bg-white dark:bg-slate-900'
                            }`}
                    >
                        <div className="text-2xl mt-1">{option.icon}</div>
                        <div>
                            <h3 className={`font-bold ${selectedType === option.id ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                {option.title}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">{option.desc}</p>
                        </div>
                        {selectedType === option.id && (
                            <CheckBadgeIcon className="w-6 h-6 text-primary ml-auto" />
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-8 flex gap-3">
                <button className="flex-1 py-3.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
                    Save & Exit
                </button>
                <button
                    disabled={!selectedType}
                    onClick={() => setStep(2)}
                    className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition shadow-lg shadow-primary/30"
                >
                    Continue
                </button>
            </div>
        </div>
    );

    // Step 2: Income Declaration
    const [incomeTab, setIncomeTab] = useState('employment');
    const [incomeDetails, setIncomeDetails] = useState({
        employer: 'ABC Corp Ltd',
        salary: 2000000,
        allowances: 0,
        bonus: 0
    });

    const annualEmploymentIncome = (incomeDetails.salary * 12) + incomeDetails.allowances + incomeDetails.bonus;

    const renderStep2 = () => (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Income Declaration</h2>
                <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase">Total Annual</p>
                    <p className="text-lg font-bold text-primary">₦{(annualEmploymentIncome).toLocaleString()}</p>
                </div>
            </div>

            {/* Income Type Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
                {['employment', 'business', 'investment'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setIncomeTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${incomeTab === tab
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {incomeTab === 'employment' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Employer / Payer</label>
                        <input
                            type="text"
                            value={incomeDetails.employer}
                            onChange={(e) => setIncomeDetails({ ...incomeDetails, employer: e.target.value })}
                            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Monthly Basic Salary</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                            <input
                                type="number"
                                value={incomeDetails.salary}
                                onChange={(e) => setIncomeDetails({ ...incomeDetails, salary: parseInt(e.target.value) || 0 })}
                                className="w-full p-4 pl-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-lg"
                            />
                        </div>
                        <p className="text-xs text-slate-400 mt-1"> Annualized: ₦{(incomeDetails.salary * 12).toLocaleString()}</p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <button className="flex items-center gap-2 text-sm font-semibold text-primary w-full">
                            <span>+ Add Allowances / Benefits</span>
                        </button>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <button className="flex items-center gap-2 text-sm font-semibold text-primary w-full">
                            <span>+ Add Bonuses</span>
                        </button>
                    </div>
                </div>
            )}

            {incomeTab !== 'employment' && (
                <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    <p>Form for {incomeTab} income coming soon.</p>
                </div>
            )}

            <div className="mt-8 flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
                    Back
                </button>
                <button
                    onClick={() => setStep(3)} // Proceed to Step 3
                    className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-primary hover:bg-primary-dark transition shadow-lg shadow-primary/30"
                >
                    Continue
                </button>
            </div>
        </div>
    );

    return (
        <div className="px-5 py-6">
            {/* Wizard Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        File Return • {step} of 5
                    </h1>
                    <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${(step / 5) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
        </div>
    );
};

export default FileReturnWizard;
