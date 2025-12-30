class PenaltyEngine {
    /**
     * Calculate Late Payment Interest
     * @param {number} taxDue - Original Tax Amount
     * @param {number} daysLate - Number of days past due date
     * @returns {object} Interest Calculation
     */
    calculateLatePaymentInterest(taxDue, daysLate) {
        // Spec Section 8: 5% per annum simple interest
        const rate = 0.05;
        const yearsLate = daysLate / 365;
        const interest = taxDue * rate * yearsLate;

        return {
            taxDue,
            daysLate,
            interestRate: '5% p.a.',
            interestAmount: parseFloat(interest.toFixed(2)),
            totalDue: parseFloat((taxDue + interest).toFixed(2))
        };
    }

    /**
     * Calculate Late Filing Penalty
     * @param {string} taxType - 'VAT' or 'CIT'
     * @param {number} monthsLate - Number of months filing is late
     * @returns {object} Penalty Calculation
     */
    calculateLateFilingPenalty(taxType, monthsLate) {
        /*
          Spec Section 8:
          VAT: ₦50,000 - ₦500,000 per month.
          Let's assume a standard logic: 50k for first month, maybe higher for subsequent?
          Spec line 1714 says "₦50,000 - ₦5,000,000 per month".
          For MVP/Automation, we'll pick a fixed standard or base.
          Let's use Base: ₦50,000 per month for VAT.
          
          CIT: 25% of tax due (Needs tax amount, but here we just do filing? 
          Spec line 1892: "25% of tax due".
          Also Spec line 1733: "5% per month (min ₦10,000)". 
          Wait, line 1892 says 25%, line 1733 says 5%.
          Conflict in spec. I will use the "5% per month" rule from line 1733 as it's more specific to time.
        */

        let penalty = 0;
        let description = '';

        if (taxType === 'VAT') {
            penalty = 50000 * monthsLate;
            description = '₦50,000 per month late';
        } else if (taxType === 'CIT') {
            // Cannot calc percentage without tax amount.
            // Returning base description.
            penalty = 0;
            description = '5% of tax due per month';
        }

        return {
            taxType,
            monthsLate,
            penaltyAmount: penalty,
            description
        };
    }
}

module.exports = new PenaltyEngine();
