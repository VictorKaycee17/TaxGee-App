import React from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from '../utils/analytics';

/**
 * Income Input Component
 * Input field for gross annual income
 */
const IncomeInput = ({ value, onChange, period, onPeriodToggle }) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="grossIncome" className="label-text mb-0">
                    Gross Income
                </label>

                {/* Period Toggle */}
                <div className="bg-slate-100 p-1 rounded-lg inline-flex items-center">
                    <button
                        type="button"
                        onClick={() => period !== 'monthly' && onPeriodToggle('monthly')}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${period === 'monthly' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        type="button"
                        onClick={() => period !== 'annual' && onPeriodToggle('annual')}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${period === 'annual' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Annual
                    </button>
                </div>
            </div>

            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light font-semibold">
                    ₦
                </span>
                <input
                    id="grossIncome"
                    type="number"
                    min="0"
                    step="1000"
                    value={value || ''}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    onBlur={() => {
                        if (value > 0) {
                            trackEvent('income_entered', { value_range: value < 1000000 ? 'low' : value < 10000000 ? 'mid' : 'high' });
                        }
                    }}
                    placeholder={period === 'monthly' ? "416,666" : "5,000,000"}
                    className="currency-input"
                />
            </div>
            <p className="text-xs text-text-light mt-1">
                Enter your total {period} gross income
            </p>
        </div>
    );
};

IncomeInput.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    period: PropTypes.oneOf(['monthly', 'annual']).isRequired,
    onPeriodToggle: PropTypes.func.isRequired,
};

export default IncomeInput;
