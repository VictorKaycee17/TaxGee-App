const vatEngine = require('../engines/vat');
const citEngine = require('../engines/cit');
const pitEngine = require('../engines/pit');
const whtEngine = require('../engines/wht');
const penaltyEngine = require('../engines/penalties');
const TaxRule = require('../models/TaxRule');
const Exemption = require('../models/Exemption');

exports.calculateVAT = (req, res) => {
    try {
        const { amount, isInclusive, category } = req.body;
        const result = vatEngine.calculate(amount, isInclusive, category);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.calculateCIT = (req, res) => {
    try {
        const { turnover, profit, companyType } = req.body;
        const result = citEngine.calculate(turnover, profit, companyType);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.calculatePIT = (req, res) => {
    try {
        const { grossIncome, deductions } = req.body;
        const result = pitEngine.calculate(grossIncome, deductions);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.calculateWHT = (req, res) => {
    try {
        const { amount, type } = req.body;
        const result = whtEngine.calculate(amount, type);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.calculatePenalties = (req, res) => {
    try {
        const { type, taxDue, timeLate, mode } = req.body;
        // mode: 'payment' or 'filing'

        if (mode === 'payment') {
            // timeLate is days
            const result = penaltyEngine.calculateLatePaymentInterest(taxDue, timeLate);
            res.json(result);
        } else {
            // mode === 'filing', timeLate is months
            const result = penaltyEngine.calculateLateFilingPenalty(type, timeLate);
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkTaxability = (req, res) => {
    try {
        const { type, category } = req.body;
        const result = Exemption.check(type, category);
        res.json({ type, category, isExempt: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSection = (req, res) => {
    try {
        const { code } = req.params;
        // Mock returning specific section rule
        if (code === 'rates') {
            return res.json(TaxRule.getAll());
        }
        res.json({ message: `Section ${code} details` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
