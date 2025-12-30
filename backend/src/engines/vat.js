const TaxRule = require('../models/TaxRule');
const Exemption = require('../models/Exemption');

class VATEngine {
    /**
     * Calculate VAT
     * @param {number} amount - Transaction amount
     * @param {boolean} isInclusive - Whether the amount already includes VAT
     * @param {string} category - Item category for exemption check
     * @returns {object} { tax, total, subtotal, isExempt, rate }
     */
    calculate(amount, isInclusive = false, category = null) {
        // 1. Check Exemptions
        if (category && Exemption.check('VAT', category)) {
            return {
                tax: 0,
                total: amount,
                subtotal: amount,
                isExempt: true,
                rate: 0
            };
        }

        // 2. Get Rate
        const rate = TaxRule.getRate('VAT');

        let tax = 0;
        let subtotal = 0;
        let total = 0;

        if (isInclusive) {
            // Formula: Tax = Amount - (Amount / (1 + Rate))
            subtotal = amount / (1 + rate);
            tax = amount - subtotal;
            total = amount;
        } else {
            // Formula: Tax = Amount * Rate
            subtotal = amount;
            tax = amount * rate;
            total = amount + tax;
        }

        return {
            tax: parseFloat(tax.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
            subtotal: parseFloat(subtotal.toFixed(2)),
            isExempt: false,
            rate: rate
        };
    }
}

module.exports = new VATEngine();
