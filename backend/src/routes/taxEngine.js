const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');

// VAT
router.post('/vat/calculate', taxController.calculateVAT);

// CIT
router.post('/cit/calculate', taxController.calculateCIT);

// PIT (Individual)
router.post('/pit/calculate', taxController.calculatePIT);

// WHT (Withholding)
router.post('/wht/calculate', taxController.calculateWHT);

// Penalties
router.post('/penalties/calculate', taxController.calculatePenalties);

// Taxability Check
router.post('/taxability/check', taxController.checkTaxability);

// Sections / Rules
router.get('/section/:code', taxController.getSection);

module.exports = router;
