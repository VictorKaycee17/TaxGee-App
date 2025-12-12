import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/taxCalculator';
import { trackEvent } from '../utils/analytics';

/**
 * Capital Gains Tax Calculator Component
 * Calculates Chargeable Gain based on 2025 Tax Act rules
 */
const CapitalGainsCalculator = () => {
    const [inputs, setInputs] = useState({
        sellingPrice: '',
        originalCost: '',
        expenses: '',
        assetType: 'Property' // Default
    });

    const [result, setResult] = useState(null);

    const ASSET_TYPES = [
        'Property',
        'Shares',
        'Car',
        'Digital Assets',
        'Other'
    ];

    useEffect(() => {
        calculateGain();
    }, [inputs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateGain = () => {
        const sellingPrice = parseFloat(inputs.sellingPrice) || 0;
        const originalCost = parseFloat(inputs.originalCost) || 0;
        const expenses = parseFloat(inputs.expenses) || 0;

        if (sellingPrice <= 0 && originalCost <= 0) {
            setResult(null);
            return;
        }

        // Check for Exemptions first
        let isExempt = false;
        let exemptionReason = '';

        if (inputs.assetType === 'Shares' && sellingPrice < 150000000) {
            isExempt = true;
            exemptionReason = 'Exempt (Disposal proceeds < ₦150m)';
        } else if (inputs.assetType === 'Car' && sellingPrice < 5000000) {
            isExempt = true;
            exemptionReason = 'Exempt (Private vehicle < ₦5m)';
        }

        const profit = sellingPrice - originalCost - expenses;
        const chargeableGain = Math.max(0, profit);

        setResult({
            profit,
            chargeableGain: isExempt ? 0 : chargeableGain,
            isExempt,
            exemptionReason
        });
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up mb-12 border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span>📈</span> Capital Gains
                </h2>
                <p className="text-white/80 text-sm mt-1">Asset Disposal Calculator</p>
            </div>

            <div className="p-6">
                {/* Inputs */}
                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Asset Type
                        </label>
                        <select
                            name="assetType"
                            value={inputs.assetType}
                            onChange={(e) => {
                                handleInputChange(e);
                                trackEvent('cgt_asset_type_changed', { type: e.target.value });
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white"
                        >
                            {ASSET_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Selling Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₦</span>
                            <input
                                type="number"
                                name="sellingPrice"
                                value={inputs.sellingPrice}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Original Cost
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">₦</span>
                                <input
                                    type="number"
                                    name="originalCost"
                                    value={inputs.originalCost}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-3 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expenses
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">₦</span>
                                <input
                                    type="number"
                                    name="expenses"
                                    value={inputs.expenses}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-3 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {result && (
                    <div className="animate-fade-in">
                        <div className={`rounded-xl p-6 border-2 mb-6 ${result.isExempt
                                ? 'bg-green-50 border-green-200'
                                : result.profit > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-200'
                            }`}>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 font-medium">Net Profit / (Loss)</span>
                                <span className={`font-bold ${result.profit >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
                                    {formatCurrency(result.profit)}
                                </span>
                            </div>

                            <div className="h-px bg-black/5 my-2"></div>

                            <div className="flex justify-between items-end mt-2">
                                <span className="text-gray-800 font-bold text-lg">Chargeable Gain</span>
                                <div className="text-right">
                                    <span className="block text-3xl font-bold text-emerald-700">
                                        {formatCurrency(result.chargeableGain)}
                                    </span>
                                    {result.isExempt && (
                                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block mt-1">
                                            {result.exemptionReason}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Critical Warning Notice */}
                        {!result.isExempt && result.chargeableGain > 0 && (
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">⚠️</span>
                                    <div>
                                        <h4 className="font-bold text-orange-800 text-sm uppercase tracking-wide mb-1">
                                            2025 Tax Act Change
                                        </h4>
                                        <p className="text-orange-900 text-sm leading-relaxed">
                                            Under the 2025 Act, this gain is added to your total annual income and taxed at your
                                            marginal rate (0% - 25%). It is no longer a taxed at a flat 10%.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CapitalGainsCalculator;
