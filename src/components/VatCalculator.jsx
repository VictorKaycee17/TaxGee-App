import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/taxCalculator';

/**
 * VAT Calculator Component
 * Allows users to calculate VAT (Add or Extract) at 7.5%
 */
const VatCalculator = () => {
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState('add'); // 'add' or 'extract'
    const [results, setResults] = useState(null);

    const VAT_RATE = 0.075;

    // Calculate whenever inputs change
    useEffect(() => {
        const numAmount = parseFloat(amount);

        if (!amount || isNaN(numAmount) || numAmount <= 0) {
            setResults(null);
            return;
        }

        let vatAmount, originalAmount, totalAmount;

        if (mode === 'add') {
            // Add VAT: Original + (Original * 0.075) = Total
            originalAmount = numAmount;
            vatAmount = numAmount * VAT_RATE;
            totalAmount = numAmount + vatAmount;
        } else {
            // Extract VAT: Total / 1.075 = Original
            totalAmount = numAmount;
            originalAmount = numAmount / (1 + VAT_RATE);
            vatAmount = totalAmount - originalAmount;
        }

        setResults({
            original: originalAmount,
            vat: vatAmount,
            total: totalAmount
        });

    }, [amount, mode]);

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up mb-12 border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span>🛍️</span> VAT Calculator
                </h2>
                <p className="text-white/80 text-sm mt-1">Nigeria Value Added Tax (7.5%)</p>
            </div>

            <div className="p-6">
                {/* Mode Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        onClick={() => setMode('add')}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${mode === 'add'
                                ? 'bg-white text-purple-600 shadow-md'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Success Input (Add VAT)
                    </button>
                    <button
                        onClick={() => setMode('extract')}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${mode === 'extract'
                                ? 'bg-white text-purple-600 shadow-md'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Extract VAT
                    </button>
                </div>

                {/* Input */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {mode === 'add' ? 'Enter Amount (Exclusive of VAT)' : 'Enter Amount (Inclusive of VAT)'}
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₦</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-4 text-xl font-bold rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder-gray-300"
                        />
                    </div>
                </div>

                {/* Results */}
                {results ? (
                    <div className="space-y-4 mb-8">
                        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 text-sm">Original Amount</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(results.original)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 text-sm">VAT (7.5%)</span>
                                <span className="font-semibold text-purple-600">+{formatCurrency(results.vat)}</span>
                            </div>
                            <div className="h-px bg-purple-200 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Total Amount</span>
                                <span className="font-bold text-2xl text-purple-700">{formatCurrency(results.total)}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl mb-8">
                        Enter an amount to see the breakdown
                    </div>
                )}

                {/* Exempt Items Tips */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        VAT Exempt Items
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                            🍎 Basic Food Items
                        </span>
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                            💊 Medical Products
                        </span>
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                            📚 Books & Educational
                        </span>
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                            👶 Baby Products
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VatCalculator;
