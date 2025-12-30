/**
 * Exemption Model - Mock Database
 * Stores list of exempt items/categories.
 */
class Exemption {
    constructor() {
        this.exemptions = [
            { id: 1, type: 'VAT', category: 'Medical', items: ['Drugs', 'Pharmaceuticals', 'Medical Equipment'] },
            { id: 2, type: 'VAT', category: 'Food', items: ['Basic Food Items', 'Locally Produced Animal Feed', 'Bread', 'Cereals', 'Cooking Oils', 'Culinary Herbs', 'Fish', 'Flour', 'Fruits', 'Meat', 'Poultry', 'Milk', 'Nuts', 'Roots', 'Salt', 'Tubers', 'Water', 'Vegetables'] },
            { id: 3, type: 'VAT', category: 'Education', items: ['Books', 'Educational Materials'] },
            { id: 4, type: 'VAT', category: 'Baby Products', items: ['Baby Food', 'Sanitary Towels'] },
            { id: 5, type: 'VAT', category: 'Agriculture', items: ['Fertilizer', 'Farming Machinery'] }
        ];
    }

    getAll() {
        return this.exemptions;
    }

    check(type, itemOrCategory) {
        const rules = this.exemptions.filter(e => e.type === type);
        return rules.some(r =>
            r.category.toLowerCase() === itemOrCategory.toLowerCase() ||
            r.items.some(i => i.toLowerCase() === itemOrCategory.toLowerCase())
        );
    }
}

module.exports = new Exemption();
