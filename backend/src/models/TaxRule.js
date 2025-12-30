/**
 * TaxRule Model - Mock Database
 * Stores default rates for various tax types.
 */
class TaxRule {
    constructor() {
        this.rules = [
            { id: 1, type: 'VAT', name: 'Standard Rate', rate: 0.075, description: 'Standard Value Added Tax' },
            { id: 2, type: 'CIT', name: 'Small Company', rate: 0.0, threshold: 50000000, description: '0% for turnover < 50M' },
            { id: 3, type: 'CIT', name: 'Large Company', rate: 0.30, threshold: 50000000, description: '30% for turnover > 50M' },
            { id: 4, type: 'EDT', name: 'Education Tax', rate: 0.025, description: 'Tertiary Education Tax' }, // Updated to correct value if changed, sticking to old 2.5% or new spec
            { id: 5, type: 'DEV', name: 'Development Levy', rate: 0.04, description: 'Levy on Assessable Profits' },
            { id: 6, type: 'DST', name: 'Digital Services Tax', rate: 0.005, description: '0.5% on turnover for digital services' }
        ];
    }

    getAll() {
        return this.rules;
    }

    getByType(type) {
        return this.rules.filter(rule => rule.type === type);
    }

    getRate(type, criteria = {}) {
        // Logic to find specific rate
        const rules = this.getByType(type);
        if (criteria.turnover && type === 'CIT') {
            return rules.find(r => criteria.turnover <= r.threshold)?.rate || rules.find(r => r.name === 'Large Company').rate;
        }
        return rules[0]?.rate || 0;
    }
}

module.exports = new TaxRule();
