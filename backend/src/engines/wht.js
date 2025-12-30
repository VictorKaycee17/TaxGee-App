class WHTEngine {
    constructor() {
        // Rates from Section 3 of Spec
        this.rates = {
            'contractor': 0.05,
            'subcontractor_construction': 0.10, // 10%
            'rent': 0.10,
            'transport': 0.03, // Goods
            'agriculture': 0.03,
            'machinery_hire': 0.05,
            'services': 0.05,
            'imported_services': 0.10,
            'interest': 0.10,
            'management_fees': 0.05,
            'commission': 0.05,
            'dividend': 0.10
        };
    }

    /**
     * Calculate Withholding Tax
     * @param {number} amount - Gross Payment Amount
     * @param {string} type - Payment Type (e.g., 'rent', 'services')
     * @returns {object} { whtAmount, netAmount, rate }
     */
    calculate(amount, type) {
        const rate = this.rates[type] || 0.05; // Default 5% for general services if unknown

        const whtAmount = amount * rate;
        const netAmount = amount - whtAmount;

        return {
            grossAmount: amount,
            type,
            rate,
            whtAmount: parseFloat(whtAmount.toFixed(2)),
            netAmount: parseFloat(netAmount.toFixed(2))
        };
    }

    getRates() {
        return this.rates;
    }
}

module.exports = new WHTEngine();
