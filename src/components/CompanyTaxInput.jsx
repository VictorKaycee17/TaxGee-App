import React from 'react';
import PropTypes from 'prop-types';

/**
 * Company Tax Input Component
 * Input field for annual turnover with tax rate display
 */
const CompanyTaxInput = ({ turnover, onChange, period, onPeriodToggle }) => {
    // Determine applicable rate
    const threshold = 50000000;
    const isSmall = turnover <= threshold;
    const applicableRate = isSmall ? '0%' : '30%';
    const companyType = isSmall ? 'Small Company' : 'Medium/Large Company';

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="annualTurnover" className="label-text mb-0">
                    Turnover
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
                    id="annualTurnover"
                    type="number"
                    min="0"
                    step="1000000"
                    value={turnover || ''}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    placeholder={period === 'monthly' ? "8,333,333" : "100,000,000"}
                    className="currency-input"
                />
            </div>

            {/* Tax Rate Display */}
            {turnover > 0 && (
                <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-text-light">{companyType}</p>
                            <p className="text-sm font-semibold text-text">
                                Applicable Tax Rate: <span className="text-primary">{applicableRate}</span>
                            </p>
                        </div>
                        {isSmall && (
                            <div className="bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                                TAX EXEMPT
                            </div>
                        )}
                    </div>
                </div>
            )}

            <p className="text-xs text-text-light mt-2">
                • Turnover ≤ ₦50M: <strong>0% tax</strong> (Small Company)
                <br />
                • Turnover &gt; ₦50M: <strong>30% tax</strong> (Medium/Large Company)
            </p>
        </div>
    );
};

CompanyTaxInput.propTypes = {
    turnover: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    period: PropTypes.oneOf(['monthly', 'annual']).isRequired,
    onPeriodToggle: PropTypes.func.isRequired,
};

export default CompanyTaxInput;
