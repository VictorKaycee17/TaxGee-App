const TaxRule = require('../models/TaxRule');

class CITEngine {
    /**
     * Calculate CIT and Tertiary Education Tax
     * @param {number} turnover - Annual Turnover
     * @param {number} assessableProfit - Assessable Profit (Adjusted Profit)
     * @param {string} companyType - Optional override (Small/Medium/Large)
     * @returns {object} Calculation result
     */
    calculate(turnover, assessableProfit, companyType = null) {
        if (!assessableProfit) assessableProfit = 0; // Fallback

        // 1. Determine CIT Rate
        let citRate = 0;
        let category = 'Small Company';

        if (turnover <= 50000000) { // <= 50M
            citRate = 0; // 0%
            category = 'Small Company';
        } else { // > 50M
            citRate = 0.30; // 30%
            category = 'Medium/Large Company';
        }

        const citAmount = assessableProfit * citRate;

        // 2. Tertiary Education Tax (EDT) - 2.5% (or 3% per latest, stick to 2.5% from spec/model)
        // Note: Spec says Development Levy 4% but usually EDT is separate. Assuming spec meant Dev Levy replaces or is in addition.
        // Tax_Rules_Spec.md Section 2B says "Development Levy of 4% on assessable profits" (but check if this is accurate to Nigeria 2025 spec or user custom spec. STICK TO USER SPEC).

        // Spec: "All companies (except Small Companies) must pay a Development Levy of 4% on assessable profits."
        let devLevyRate = 0;
        if (category !== 'Small Company') {
            devLevyRate = 0.04;
        }

        const devLevyAmount = assessableProfit * devLevyRate;

        // 3. Minimum Tax Check (Ignored for MVP/Basic as per spec note)

        return {
            category,
            turnover,
            assessableProfit,
            cit: {
                rate: citRate,
                amount: parseFloat(citAmount.toFixed(2))
            },
            devLevy: {
                rate: devLevyRate,
                amount: parseFloat(devLevyAmount.toFixed(2))
            },
            totalTax: parseFloat((citAmount + devLevyAmount).toFixed(2))
        };
    }
}

module.exports = new CITEngine();
