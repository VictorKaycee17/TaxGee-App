import React, { useState } from 'react';
import Card from './Card';
import IncomeInput from './IncomeInput';
import DeductionsForm from './DeductionsForm';
import RentReliefInput from './RentReliefInput';
import CompanyTaxInput from './CompanyTaxInput';
import TaxResults from './TaxResults';
import TaxForecast from './TaxForecast';
import { calculateTax } from '../utils/taxCalculator';
import { trackEvent } from '../utils/analytics';

/**
 * Main Tax Calculator Component
 * Handles state management for both individual and company tax calculations
 */
const TaxCalculator = () => {
    // User type selection
    const [userType, setUserType] = useState('individual');

    // Individual tax states
    const [grossIncome, setGrossIncome] = useState(0);
    const [incomePeriod, setIncomePeriod] = useState('monthly'); // Added: 'monthly' | 'annual'

    const [deductions, setDeductions] = useState({
        pension: 0,
        nhf: 0,
        nhis: 0,
    });
    const [annualRent, setAnnualRent] = useState(0);

    // Company tax states
    const [annualTurnover, setAnnualTurnover] = useState(0);
    const [turnoverPeriod, setTurnoverPeriod] = useState('monthly'); // Added: 'monthly' | 'annual'

    // Results
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);

    // Helper: Toggle Period and Auto-convert
    const handlePeriodToggle = (currentPeriod, setPeriod, currentValue, setValue) => {
        const newPeriod = currentPeriod === 'monthly' ? 'annual' : 'monthly';
        setPeriod(newPeriod);

        if (currentValue > 0) {
            // Convert value smartly
            const newValue = newPeriod === 'annual'
                ? currentValue * 12
                : currentValue / 12;

            // Round to 2 decimals to avoid weird floats
            setValue(Math.round(newValue * 100) / 100);
        }
    };

    const handleCalculate = (e) => {
        e.preventDefault();

        // Convert to Annual for Calculation Engine
        const annualizedIncome = incomePeriod === 'monthly' ? grossIncome * 12 : grossIncome;
        const annualizedTurnover = turnoverPeriod === 'monthly' ? annualTurnover * 12 : annualTurnover;

        // Validate inputs based on user type
        if (userType === 'individual' && annualizedIncome <= 0) {
            alert('Please enter a valid gross income');
            trackEvent('tax_calculation_error', { userType, error: 'invalid_gross_income' });
            return;
        }

        if (userType === 'company' && annualizedTurnover <= 0) {
            alert('Please enter a valid turnover');
            trackEvent('tax_calculation_error', { userType, error: 'invalid_turnover' });
            return;
        }

        // Calculate tax based on user type (Always use ANNUALIZED figures)
        const taxResults = calculateTax({
            userType,
            // Individual fields
            grossIncome: annualizedIncome,
            pension: deductions.pension,
            nhf: deductions.nhf,
            nhis: deductions.nhis,
            annualRent,
            // Company fields
            annualTurnover: annualizedTurnover,
        });

        // Track successful tax calculation
        trackEvent('tax_calculated', {
            userType,
            grossIncome: userType === 'individual' ? annualizedIncome : null,
            turnover: userType === 'company' ? annualizedTurnover : null,
            totalTax: taxResults.tax?.total || taxResults.totalTax || 0,
            hasDeductions: userType === 'individual' ? (deductions.pension > 0 || deductions.nhf > 0 || deductions.nhis > 0) : null,
            hasRentRelief: userType === 'individual' ? annualRent > 0 : null
        });

        setResults(taxResults);
        setShowResults(true);

        // Smooth scroll to results
        setTimeout(() => {
            document.getElementById('results')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const handleReset = () => {
        trackEvent('form_reset', { userType });
        setGrossIncome(0);
        setDeductions({ pension: 0, nhf: 0, nhis: 0 });
        setAnnualRent(0);
        setAnnualTurnover(0);
        // Reset periods to default
        setIncomePeriod('monthly');
        setTurnoverPeriod('monthly');

        setResults(null);
        setShowResults(false);
    };

    const handleQuickFill = () => {
        trackEvent('quick_fill_used', { userType });
        if (userType === 'individual') {
            // Base Annual Figures
            const baseAnnualIncome = 6000000; // 500k monthly

            // Adjust for current period
            if (incomePeriod === 'monthly') {
                setGrossIncome(baseAnnualIncome / 12);
            } else {
                setGrossIncome(baseAnnualIncome);
            }

            setDeductions({
                pension: 480000,  // 8% of gross
                nhf: 15000,       // Sample
                nhis: 60000,
            });
            setAnnualRent(2000000);
        } else {
            // Base Annual Turnover
            const baseAnnualTurnover = 120000000; // 10M monthly

            // Adjust for current period
            if (turnoverPeriod === 'monthly') {
                setAnnualTurnover(baseAnnualTurnover / 12);
            } else {
                setAnnualTurnover(baseAnnualTurnover);
            }
        }
    };

    const handleUserTypeChange = (newType) => {
        trackEvent('user_type_changed', { fromType: userType, toType: newType });
        setUserType(newType);
        setResults(null);
        setShowResults(false);
    };

    return (
        <div className="space-y-6">
            {/* Input Form */}
            <Card
                title="Tax Calculator"
                subtitle="Nigeria Tax Act 2025 (Effective 2026)"
            >
                <form onSubmit={handleCalculate}>
                    {/* User Type Selector */}
                    <div className="mb-6">
                        <label className="label-text mb-3">I am a/an:</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => handleUserTypeChange('individual')}
                                className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200 ${userType === 'individual'
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-text border-gray-300 hover:border-primary'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Individual
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleUserTypeChange('company')}
                                className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200 ${userType === 'company'
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-text border-gray-300 hover:border-primary'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                    </svg>
                                    Company
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="my-6 border-t border-gray-200"></div>

                    {/* Individual Tax Inputs */}
                    {userType === 'individual' && (
                        <>
                            <IncomeInput
                                value={grossIncome}
                                onChange={setGrossIncome}
                                period={incomePeriod}
                                onPeriodToggle={() => handlePeriodToggle(incomePeriod, setIncomePeriod, grossIncome, setGrossIncome)}
                            />

                            <DeductionsForm
                                deductions={deductions}
                                onChange={setDeductions}
                            />

                            <div className="my-6 border-t border-gray-200"></div>

                            <RentReliefInput
                                value={annualRent}
                                onChange={setAnnualRent}
                            />
                        </>
                    )}

                    {/* Company Tax Inputs */}
                    {userType === 'company' && (
                        <CompanyTaxInput
                            turnover={annualTurnover}
                            onChange={setAnnualTurnover}
                            period={turnoverPeriod}
                            onPeriodToggle={() => handlePeriodToggle(turnoverPeriod, setTurnoverPeriod, annualTurnover, setAnnualTurnover)}
                        />
                    )}

                    {/* Privacy Notice */}
                    <div className="mt-8 mb-4 p-3 bg-green-50 rounded-lg border border-green-100 flex items-center justify-center gap-2 text-xs text-gray-600 text-center">
                        <span className="text-base">🔒</span>
                        <span className="font-medium">Privacy Guaranteed: Data stays on this device. We do not store or report your income.</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button
                            type="submit"
                            className="btn-primary flex-1"
                        >
                            Calculate Tax
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg 
                       hover:bg-primary hover:text-white transition-all duration-200"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={handleQuickFill}
                            className="px-6 py-3 text-text-light border-2 border-gray-300 font-semibold rounded-lg 
                       hover:border-primary hover:text-primary transition-all duration-200 text-sm"
                        >
                            Quick Fill
                        </button>
                    </div>
                </form>
            </Card>

            {/* Results */}
            {showResults && (
                <div id="results" className="space-y-6">
                    <TaxResults results={results} />

                    {/* Tax Forecast & Planner */}
                    {results && results.tax && (
                        <TaxForecast
                            annualTax={results.tax.total || results.totalTax || 0}
                            userType={results.userType}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TaxCalculator;
