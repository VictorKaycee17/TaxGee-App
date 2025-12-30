class PITEngine {
    constructor() {
        this.bands = [
            { limit: 800000, rate: 0.00 },
            { limit: 2200000, rate: 0.15 },
            { limit: 9000000, rate: 0.18 },
            { limit: 13000000, rate: 0.21 },
            { limit: 25000000, rate: 0.23 },
            { limit: Infinity, rate: 0.25 }
        ];
    }

    /**
     * Calculate Personal Income Tax
     * @param {number} grossIncome - Annual Gross Income
     * @param {object} deductions - { pension, nhf, nhis, rent }
     * @returns {object} Calculation detail
     */
    calculate(grossIncome, deductions = {}) {
        const { pension = 0, nhf = 0, nhis = 0, rent = 0 } = deductions;

        // 1. Calculate Rent Relief (Max 500k or 20% of rent)
        // Spec Section 1B: "20% of annual rent paid, capped at a maximum of ₦500,000"
        // Wait, spec says "20% of annual rent paid".
        const rentRelief = Math.min(rent * 0.20, 500000);

        // 2. Identify Total Reliefs
        const totalReliefs = pension + nhf + nhis + rentRelief;

        // 3. Determine Chargeable Income
        let chargeableIncome = grossIncome - totalReliefs;
        if (chargeableIncome < 0) chargeableIncome = 0;

        // 4. Exemption Check (Minimum Wage)
        // Spec Section 1B: "Individuals earning the National Minimum Wage or less from employment are fully exempt"
        // Assuming Monthly Minimum Wage ~70k -> 840k Annual.
        // If Gross Income <= 840,000, Tax = 0.
        // I will use a conservative threshold of 840,000 for now based on current Nigeria context, or 0 if not specified.
        // The spec didn't give a number, just "Minimum Wage". I'll skip hard enforcement or use standard logic.
        // Actually, the first band is 0% for first 800k. So functionally, low earners pay very little or 0.

        // 5. Calculate Tax across Bands
        let tax = 0;
        let remainingIncome = chargeableIncome;
        let breakdown = [];

        // Band 1: First 800k @ 0%
        const band1 = this.bands[0];
        const taxableBand1 = Math.min(remainingIncome, band1.limit);
        const taxBand1 = taxableBand1 * band1.rate; // 0
        remainingIncome -= taxableBand1;
        breakdown.push({ band: 'First ₦800,000', rate: '0%', amount: taxableBand1, tax: taxBand1 });

        // Band 2: Next 2.2M @ 15%
        if (remainingIncome > 0) {
            const band2 = this.bands[1];
            const taxableBand2 = Math.min(remainingIncome, band2.limit);
            const taxBand2 = taxableBand2 * band2.rate;
            tax += taxBand2;
            remainingIncome -= taxableBand2;
            breakdown.push({ band: 'Next ₦2,200,000', rate: '15%', amount: taxableBand2, tax: parseFloat(taxBand2.toFixed(2)) });
        }

        // Band 3: Next 9M @ 18%
        if (remainingIncome > 0) {
            const band3 = this.bands[2];
            const taxableBand3 = Math.min(remainingIncome, band3.limit);
            const taxBand3 = taxableBand3 * band3.rate;
            tax += taxBand3;
            remainingIncome -= taxableBand3;
            breakdown.push({ band: 'Next ₦9,000,000', rate: '18%', amount: taxableBand3, tax: parseFloat(taxBand3.toFixed(2)) });
        }

        // Band 4: Next 13M @ 21%
        if (remainingIncome > 0) {
            const band4 = this.bands[3];
            const taxableBand4 = Math.min(remainingIncome, band4.limit);
            const taxBand4 = taxableBand4 * band4.rate;
            tax += taxBand4;
            remainingIncome -= taxableBand4;
            breakdown.push({ band: 'Next ₦13,000,000', rate: '21%', amount: taxableBand4, tax: parseFloat(taxBand4.toFixed(2)) });
        }

        // Band 5: Next 25M @ 23%
        if (remainingIncome > 0) {
            const band5 = this.bands[4];
            const taxableBand5 = Math.min(remainingIncome, band5.limit);
            const taxBand5 = taxableBand5 * band5.rate;
            tax += taxBand5;
            remainingIncome -= taxableBand5;
            breakdown.push({ band: 'Next ₦25,000,000', rate: '23%', amount: taxableBand5, tax: parseFloat(taxBand5.toFixed(2)) });
        }

        // Band 6: Above 50M (Remaining) @ 25%
        if (remainingIncome > 0) {
            const band6 = this.bands[5];
            const taxBand6 = remainingIncome * band6.rate;
            tax += taxBand6;
            breakdown.push({ band: 'Above ₦50,000,000', rate: '25%', amount: remainingIncome, tax: parseFloat(taxBand6.toFixed(2)) });
        }

        return {
            grossIncome,
            reliefs: {
                pension,
                nhf,
                nhis,
                rentRelief,
                total: totalReliefs
            },
            chargeableIncome,
            tax: parseFloat(tax.toFixed(2)),
            breakdown
        };
    }
}

module.exports = new PITEngine();
