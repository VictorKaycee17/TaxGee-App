# TAX RULES ENGINE - IMPLEMENTATION & UPDATE GUIDE
**How to Integrate, Maintain, and Update the Tax Engine**  
**Date:** December 25, 2025  
**Version:** 1.0  

---

## TABLE OF CONTENTS

1. [Implementation Architecture](#implementation-architecture)
2. [Database Schema](#database-schema)
3. [API Integration](#api-integration)
4. [Section-by-Section Implementation](#section-by-section-implementation)
5. [Testing & Validation](#testing--validation)
6. [Maintenance & Updates](#maintenance--updates)
7. [Common Scenarios](#common-scenarios)
8. [Troubleshooting](#troubleshooting)

---

## IMPLEMENTATION ARCHITECTURE

### High-Level Integration

```
TaxGee Pro Application
│
├─ Frontend (React/Vue)
│  ├─ Sales Tax Page
│  │  ├─ Check Taxability → Calls Engine Section 1, 5, 6
│  │  ├─ Calculate Tax → Calls Engine Section 1
│  │  └─ Manage Exemptions → Calls Engine Section 5
│  │
│  ├─ Invoicing Page
│  │  ├─ Calculate VAT → Calls Engine Section 1
│  │  ├─ Determine Taxability → Calls Engine Section 1, 5
│  │  └─ Apply Exemptions → Calls Engine Section 5
│  │
│  ├─ Receipts Page
│  │  ├─ Flag for WHT → Calls Engine Section 3
│  │  └─ Calculate Input VAT → Calls Engine Section 1
│  │
│  ├─ Filing Hub
│  │  ├─ Prepare VAT Return → Calls Engine Section 1, 7
│  │  ├─ Prepare CIT Return → Calls Engine Section 2, 7, 8
│  │  ├─ Calculate Penalties → Calls Engine Section 8
│  │  └─ Check Deadlines → Calls Engine Section 7
│  │
│  └─ Settings Page
│     ├─ Configure Tax Rules → Updates Engine Sections
│     └─ Manage Exemptions → Updates Engine Section 5
│
├─ Backend (Node.js/Python)
│  └─ Tax Rules Engine (Microservice)
│     ├─ Engine API Service
│     │  ├─ POST /calculate-vat
│     │  ├─ POST /calculate-cit
│     │  ├─ POST /check-taxability
│     │  ├─ POST /calculate-wht
│     │  ├─ GET /section/{code}
│     │  └─ PUT /section/{code}
│     │
│     ├─ Database Layer
│     │  ├─ tax_rules table (engine rules)
│     │  ├─ tax_rates table (current rates)
│     │  ├─ exemptions table (defined exemptions)
│     │  ├─ tax_calculations table (calculation history)
│     │  └─ tax_compliance table (filing/penalty data)
│     │
│     └─ Rules Engine Logic
│        ├─ Taxability checker
│        ├─ Tax calculator
│        ├─ Exemption applier
│        ├─ Deduction calculator
│        └─ Penalty/Interest calculator
│
└─ Audit & Compliance
   ├─ Version control (tax law changes)
   ├─ Change history (who changed what, when)
   ├─ Compliance reports (audit trail)
   └─ Calculation validation (spot checks)
```

---

## DATABASE SCHEMA

### 1. Tax Rules Table (Core Engine)

```sql
CREATE TABLE tax_rules (
  id VARCHAR(50) PRIMARY KEY,  -- e.g., "VAT-2025-NG"
  section_code VARCHAR(20) NOT NULL,  -- VAT, CIT, WHT, etc.
  rule_name VARCHAR(255) NOT NULL,
  rule_definition JSON NOT NULL,  -- Full rule as JSON
  effective_date DATE NOT NULL,
  expiry_date DATE,
  jurisdiction VARCHAR(50) NOT NULL,  -- "Nigeria (Federal)"
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(100),
  updated_at TIMESTAMP,
  status ENUM('active', 'inactive', 'superseded'),
  reference_document VARCHAR(255),  -- FIRS circular ref
  version INT DEFAULT 1
);

-- Examples:
INSERT INTO tax_rules VALUES 
('VAT-2025-NG', 'VAT', 'Standard VAT Rate', '{"rate": 0.075}', '2025-01-01', NULL, 'Nigeria (Federal)', 'system', NOW(), NULL, NOW(), 'active', 'FIRS 2025', 1),
('CIT-2025-SMALL', 'CIT', 'Small Company Rate', '{"rate": 0.20, "threshold": 25000000}', '2025-01-01', NULL, 'Nigeria (Federal)', 'system', NOW(), NULL, NOW(), 'active', 'CIT Act', 1);
```

### 2. Taxability Rules Table

```sql
CREATE TABLE taxability_rules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supply_type VARCHAR(50) NOT NULL,  -- goods, services, digital
  category VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  taxable BOOLEAN DEFAULT TRUE,
  vat_rate DECIMAL(5,3),
  conditions JSON,
  exceptions JSON,
  effective_date DATE NOT NULL,
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Examples:
INSERT INTO taxability_rules VALUES 
(1, 'goods', 'raw_food', 'Raw food items', FALSE, 0.000, 
 '{"must_be": "unprocessed"}', '[]', '2025-01-01', 'system', NOW()),
(2, 'services', 'professional', 'Professional services', TRUE, 0.075, 
 '{}', '[]', '2025-01-01', 'system', NOW());
```

### 3. Exemptions Table

```sql
CREATE TABLE exemptions (
  id VARCHAR(50) PRIMARY KEY,
  type ENUM('customer', 'item', 'sector', 'temporal') NOT NULL,
  reference_id VARCHAR(100),  -- customer ID, item ID, sector code, etc.
  reference_name VARCHAR(255),
  exemption_reason VARCHAR(255),
  exemption_percent DECIMAL(5,2) DEFAULT 0,
  effective_date DATE NOT NULL,
  expiry_date DATE,
  status ENUM('active', 'expired', 'pending', 'revoked') DEFAULT 'pending',
  documentation_url VARCHAR(500),
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_by VARCHAR(100),
  approved_at TIMESTAMP
);

-- Examples:
INSERT INTO exemptions VALUES 
('EXM-ABC-001', 'customer', 'cust-abc-123', 'ABC Corporation', 'Non-profit organization', 0, 
 '2025-01-01', '2026-12-31', 'active', '/docs/nonprofit-cert.pdf', 'admin', NOW(), 'manager', NOW()),
('EXM-MED-001', 'item', 'item-medic-001', 'Prescription Medicines', 'Healthcare zero-rated', 0, 
 '2025-01-01', NULL, 'active', '/docs/med-list.pdf', 'admin', NOW(), 'manager', NOW());
```

### 4. Tax Calculations History Table

```sql
CREATE TABLE tax_calculations (
  id VARCHAR(100) PRIMARY KEY,
  calculation_type ENUM('vat', 'cit', 'wht', 'penalty', 'interest'),
  entity_type VARCHAR(50),  -- invoice, receipt, return, etc.
  entity_id VARCHAR(100),
  gross_amount DECIMAL(15,2),
  tax_rate DECIMAL(5,3),
  tax_amount DECIMAL(15,2),
  net_amount DECIMAL(15,2),
  applied_exemptions JSON,
  applied_deductions JSON,
  calculation_date TIMESTAMP,
  created_by VARCHAR(100),
  validation_status ENUM('valid', 'needs_review', 'error'),
  audit_trail JSON  -- stores all calculation steps
);
```

### 5. Filing Compliance Table

```sql
CREATE TABLE filing_compliance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fiscal_period VARCHAR(20),  -- "2025-01" for Jan 2025
  tax_type ENUM('vat', 'cit', 'paye', 'wht'),
  entity_id VARCHAR(100),
  due_date DATE NOT NULL,
  filed_date DATE,
  filing_status ENUM('pending', 'filed', 'overdue', 'disputed'),
  filed_amount DECIMAL(15,2),
  paid_amount DECIMAL(15,2),
  payment_date DATE,
  penalty_amount DECIMAL(15,2),
  interest_amount DECIMAL(15,2),
  din VARCHAR(100),  -- Deposit Invoice Number
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Rate History Table (Audit Trail)

```sql
CREATE TABLE rate_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  section_code VARCHAR(20),
  rule_id VARCHAR(50),
  old_value JSON,
  new_value JSON,
  effective_date DATE,
  changed_by VARCHAR(100),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reason VARCHAR(255),
  reference_document VARCHAR(255)
);
```

---

## API INTEGRATION

### Base Endpoint
```
Base URL: https://api.taxgee.ng/v1/tax-engine
```

### 1. VAT Calculation Endpoint

```javascript
/**
 * POST /api/tax-engine/vat/calculate
 * Calculate VAT on a transaction
 */
async calculateVAT({
  grossAmount,
  supplyType,        // 'goods', 'services', 'digital'
  category,          // detailed category
  customerLocation,  // state
  customerExemption, // exemption ID if any
  zeroRated          // boolean
}) {
  return {
    grossAmount: 10000,
    vatRate: 0.075,
    vatAmount: 750,
    netAmount: 10000,
    taxable: true,
    zeroRated: false,
    exempt: false,
    timestamp: "2025-12-25T14:30:00Z"
  }
}

// Example Usage in Frontend:
const result = await fetch('/api/tax-engine/vat/calculate', {
  method: 'POST',
  body: JSON.stringify({
    grossAmount: 10000,
    supplyType: 'services',
    category: 'professional_services',
    customerLocation: 'Lagos',
    customerExemption: null,
    zeroRated: false
  })
});
```

### 2. Taxability Check Endpoint

```javascript
/**
 * POST /api/tax-engine/taxability/check
 * Check if item/service is taxable
 */
async checkTaxability({
  itemId,
  itemCategory,
  location,
  customerExemption,
  customerType
}) {
  return {
    itemId: "svc-prof-001",
    taxable: true,
    taxRate: 0.075,
    taxType: "VAT",
    rulesApplied: [
      "Rule: Services are taxable at standard rate",
      "Rule: No exemption applies for customer type",
      "Rule: Location (Lagos) has standard nexus"
    ],
    checkId: "check-20251225-001",
    checkDate: "2025-12-25T14:30:00Z"
  }
}
```

### 3. CIT Calculation Endpoint

```javascript
/**
 * POST /api/tax-engine/cit/calculate
 * Calculate Company Income Tax
 */
async calculateCIT({
  taxableIncome,
  companyType,        // small_company, large_company
  operatingYears,     // for relief calculation
  carryForwardLosses
}) {
  return {
    taxableIncome: 10000000,
    companyType: "small_company",
    citRate: 0.20,
    baseAmount: 2000000,
    relief: -300000,  // 50% relief for first 3 years
    citAmount: 1700000,
    validFrom: "2025-01-01"
  }
}
```

### 4. WHT Calculation Endpoint

```javascript
/**
 * POST /api/tax-engine/wht/calculate
 * Calculate Withholding Tax
 */
async calculateWHT({
  paymentType,        // contractor, rent, interest, etc.
  grossAmount,
  recipientExemption, // exemption ID if any
  recipientType       // resident, non_resident
}) {
  return {
    paymentType: "contractor_services",
    grossAmount: 50000,
    whtRate: 0.05,
    whtAmount: 2500,
    netAmount: 47500,
    withholdingDate: "2025-12-25",
    remittanceDueDate: "2026-01-15",
    certificateRequired: true
  }
}
```

### 5. Get Rule by Section Endpoint

```javascript
/**
 * GET /api/tax-engine/section/{sectionCode}
 * Retrieve specific section rules
 * 
 * Examples:
 * GET /api/tax-engine/section/VAT-2025-NG
 * GET /api/tax-engine/section/CIT-2025-NG
 * GET /api/tax-engine/section/WHT-2025-NG
 */
async getSection(sectionCode) {
  return {
    id: "VAT-2025-NG",
    section_code: "VAT",
    rule_name: "VAT Rules Engine 2025",
    effective_date: "2025-01-01",
    jurisdiction: "Nigeria (Federal)",
    status: "active",
    rates: {
      standard: 0.075,
      reduced: 0.0,
      exempt: 0.0
    },
    rules: { /* full rules object */ }
  }
}
```

### 6. Update Rule Endpoint

```javascript
/**
 * PUT /api/tax-engine/section/{sectionCode}
 * Update a specific section
 * (Admin-only endpoint)
 */
async updateSection(sectionCode, updates) {
  return {
    success: true,
    message: "Section updated successfully",
    effectiveDate: "2025-01-15",
    previousVersion: 1,
    newVersion: 2,
    changeLog: {
      changedBy: "admin@taxgee.ng",
      changedAt: "2025-12-25T14:30:00Z",
      changes: updates,
      reason: "Tax law update"
    }
  }
}

// Example Usage:
await fetch('/api/tax-engine/section/VAT-2025-NG', {
  method: 'PUT',
  body: JSON.stringify({
    rates: {
      standard: 0.075  // Updated from 0.05
    },
    effectiveDate: '2025-01-15',
    reason: 'FIRS Circular 2025/VAT/001'
  })
});
```

### 7. Calculate Penalties Endpoint

```javascript
/**
 * POST /api/tax-engine/penalties/calculate
 * Calculate late payment penalties and interest
 */
async calculatePenalty({
  taxType,      // 'vat', 'cit', 'paye'
  originalAmount,
  dueDate,
  paymentDate,
  mitigatingFactors // optional
}) {
  return {
    taxType: "vat",
    originalAmount: 500000,
    daysLate: 45,
    penaltyRate: 0.05,
    interestAmount: 3041.67,  // 45 days at 5% p.a.
    minimumPenalty: 5000,
    totalPenalty: 5000,
    totalDue: 505000,
    breakdown: {
      original: 500000,
      interest: 3041.67,
      penalty: 5000
    }
  }
}
```

---

## SECTION-BY-SECTION IMPLEMENTATION

### Phase 1: VAT Engine (Section 1)

```typescript
// Step 1: Implement in Backend
import { VAT_RATES, TaxabilityRule } from '@tax-engine/vat';

class VATEngine {
  async calculateVAT(transaction: Transaction): Promise<VATCalculation> {
    // 1. Determine taxability
    const taxability = await this.determineTaxability(transaction);
    
    // 2. Get applicable rate
    let rate = VAT_RATES.standard;
    if (taxability.zeroRated) rate = 0;
    if (taxability.exempt) rate = 0;
    
    // 3. Calculate VAT
    const vatAmount = transaction.amount * rate;
    
    // 4. Store calculation
    await this.storeCalculation({
      type: 'vat',
      amount: transaction.amount,
      rate: rate,
      vatAmount: vatAmount
    });
    
    return {
      grossAmount: transaction.amount,
      vatRate: rate,
      vatAmount: vatAmount,
      taxable: rate > 0
    };
  }
}

// Step 2: Expose via API
router.post('/tax-engine/vat/calculate', async (req, res) => {
  const engine = new VATEngine();
  const result = await engine.calculateVAT(req.body);
  res.json(result);
});

// Step 3: Use in Frontend
const invoiceVAT = await fetch('/api/tax-engine/vat/calculate', {
  method: 'POST',
  body: JSON.stringify({
    grossAmount: itemAmount,
    supplyType: itemType,
    customerLocation: location
  })
});
```

### Phase 2: CIT Engine (Section 2)

```typescript
class CITEngine {
  async calculateCIT(businessData: BusinessData): Promise<CITCalculation> {
    // 1. Calculate chargeable income
    const chargeableIncome = await this.calculateChargeableIncome(businessData);
    
    // 2. Determine company size
    const size = chargeableIncome > 25000000 ? 'large' : 'small';
    
    // 3. Get CIT rate
    const rate = size === 'small' ? 0.20 : 0.30;
    
    // 4. Apply relief (if applicable)
    const relief = businessData.operatingYears <= 3 && size === 'small' 
      ? chargeableIncome * 0.5 
      : 0;
    
    // 5. Calculate final CIT
    const citAmount = (chargeableIncome - relief) * rate;
    
    return {
      chargeableIncome,
      citRate: rate,
      relief,
      citAmount
    };
  }
  
  private async calculateChargeableIncome(data: BusinessData) {
    let income = data.totalRevenue;
    
    // Deduct COGS
    income -= data.costOfGoodsSold || 0;
    
    // Deduct operating expenses
    income -= data.operatingExpenses || 0;
    
    // Add back restricted items
    income += data.restrictedDeductions || 0;
    
    // Subtract depreciation
    income -= data.depreciation || 0;
    
    // Apply carried forward losses
    income = Math.max(income - (data.carriedForwardLosses || 0), 0);
    
    return income;
  }
}
```

### Phase 3: WHT Engine (Section 3)

```typescript
class WHTEngine {
  async calculateWHT(payment: Payment): Promise<WHTCalculation> {
    // 1. Get WHT rate for payment type
    const rate = this.getWHTRate(payment.type);
    
    // 2. Check exemption
    if (await this.isExempt(payment.recipient)) {
      return {
        whtAmount: 0,
        exemptionApplied: true
      };
    }
    
    // 3. Calculate WHT
    const whtAmount = payment.amount * rate;
    
    // 4. Record for remittance
    await this.recordForRemittance({
      paymentType: payment.type,
      amount: payment.amount,
      whtAmount: whtAmount,
      remittanceDueDate: this.addDays(new Date(), 21)
    });
    
    return {
      whtAmount,
      netPayment: payment.amount - whtAmount,
      remittanceDueDate: this.addDays(new Date(), 21)
    };
  }
}
```

---

## TESTING & VALIDATION

### Unit Tests

```typescript
describe('TAX Rules Engine', () => {
  describe('VAT Calculations', () => {
    it('should calculate standard rate VAT', () => {
      const vat = engine.calculateVAT({
        amount: 10000,
        taxable: true
      });
      expect(vat.vatAmount).toBe(750);
      expect(vat.total).toBe(10750);
    });
    
    it('should apply zero rate to food items', () => {
      const vat = engine.calculateVAT({
        amount: 10000,
        category: 'raw_food'
      });
      expect(vat.vatAmount).toBe(0);
      expect(vat.zeroRated).toBe(true);
    });
    
    it('should apply exemption to healthcare', () => {
      const vat = engine.calculateVAT({
        amount: 10000,
        category: 'healthcare',
        customerExemption: 'EXM-HEALTH-001'
      });
      expect(vat.vatAmount).toBe(0);
      expect(vat.exempt).toBe(true);
    });
  });
  
  describe('CIT Calculations', () => {
    it('should apply 20% rate to small companies', () => {
      const cit = engine.calculateCIT({
        chargeableIncome: 20000000,
        companyType: 'small'
      });
      expect(cit.citRate).toBe(0.20);
      expect(cit.citAmount).toBe(4000000);
    });
    
    it('should apply 50% relief in first 3 years', () => {
      const cit = engine.calculateCIT({
        chargeableIncome: 10000000,
        companyType: 'small',
        operatingYears: 2
      });
      expect(cit.relief).toBe(5000000);
      expect(cit.citAmount).toBe(1000000); // (10M - 5M) * 0.20
    });
  });
  
  describe('WHT Calculations', () => {
    it('should calculate 5% WHT on services', () => {
      const wht = engine.calculateWHT({
        type: 'contractor_services',
        amount: 100000
      });
      expect(wht.whtAmount).toBe(5000);
      expect(wht.netAmount).toBe(95000);
    });
    
    it('should apply exemption for registered users', () => {
      const wht = engine.calculateWHT({
        type: 'contractor_services',
        amount: 100000,
        recipientExemption: 'EXM-REGISTERED-001'
      });
      expect(wht.whtAmount).toBe(0);
      expect(wht.exemptionApplied).toBe(true);
    });
  });
});
```

### Integration Tests

```typescript
describe('Tax Engine Integration', () => {
  it('should calculate full tax flow: Receipt → Invoice → VAT → CIT', async () => {
    // 1. Customer purchases service
    const receipt = await createReceipt({
      amount: 10000,
      type: 'professional_service',
      customer: 'ABC Corp'
    });
    
    // 2. Check VAT applicability
    const vatCalc = await engine.checkTaxability({
      itemId: receipt.itemId,
      category: 'professional'
    });
    expect(vatCalc.taxable).toBe(true);
    expect(vatCalc.vat Rate).toBe(0.075);
    
    // 3. Create invoice with VAT
    const invoice = await createInvoice({
      amount: receipt.amount,
      vat: vatCalc.vatAmount,
      total: receipt.amount + vatCalc.vatAmount
    });
    expect(invoice.total).toBe(10750);
    
    // 4. At year end, include in CIT calculation
    const annualRevenue = await calculateAnnualRevenue();
    const cit = await engine.calculateCIT({
      revenue: annualRevenue
    });
    expect(cit.citAmount).toBeGreaterThan(0);
  });
});
```

### Validation Tests

```typescript
describe('Tax Rules Validation', () => {
  it('should validate against tax law', () => {
    const violations = engine.validate({
      percentage: 7.5,  // VAT rate
      jurisdiction: 'Nigeria'
    });
    expect(violations).toEqual([]);
  });
  
  it('should catch invalid rates', () => {
    const violations = engine.validate({
      percentage: 15,   // Should be 7.5
      jurisdiction: 'Nigeria'
    });
    expect(violations.length).toBeGreaterThan(0);
    expect(violations[0].message).toContain('Invalid VAT rate');
  });
  
  it('should catch missing required fields', () => {
    const violations = engine.validate({
      // missing jurisdiction
      percentage: 7.5
    });
    expect(violations[0].message).toContain('Jurisdiction required');
  });
});
```

---

## MAINTENANCE & UPDATES

### How to Update a Section

**When new tax law takes effect:**

```
1. PREPARE
   ├─ Get official FIRS circular/announcement
   ├─ Identify which sections are affected
   ├─ Determine effective date
   └─ Prepare testing data

2. UPDATE IN DATABASE
   ├─ INSERT new rule into tax_rules table
   ├─ Set effective_date to law change date
   ├─ Mark previous rule as 'superseded'
   └─ Add reference_document (FIRS circular code)

3. CODE CHANGES (if applicable)
   ├─ Update relevant section constants
   ├─ Update validation logic
   ├─ Update calculation formulas
   └─ Add migration if schema changes

4. TESTING
   ├─ Run unit tests for affected section
   ├─ Run integration tests
   ├─ Test backward compatibility
   └─ Spot-check calculations

5. DEPLOYMENT
   ├─ Deploy to staging
   ├─ Notify users of changes
   ├─ Monitor for issues
   └─ Document change in changelog

6. AUDIT
   ├─ Log in rate_history table
   ├─ Store old and new values
   ├─ Record who made change and when
   └─ Keep for 7 years (compliance)
```

### Example: VAT Rate Change from 5% to 7.5%

```sql
-- Step 1: Check current rule
SELECT * FROM tax_rules WHERE id = 'VAT-2025-NG';

-- Step 2: Update status to superseded
UPDATE tax_rules 
SET status = 'superseded' 
WHERE id = 'VAT-2025-NG' AND status = 'active';

-- Step 3: Insert new rule
INSERT INTO tax_rules VALUES 
('VAT-2025-NG-V2', 'VAT', 'Standard VAT Rate (Updated)', 
 '{"rate": 0.075}', '2025-01-15', NULL, 'Nigeria (Federal)', 
 'admin', NOW(), NULL, NOW(), 'active', 'FIRS 2025/VAT/001', 2);

-- Step 4: Record history
INSERT INTO rate_history VALUES 
(NULL, 'VAT', 'VAT-2025-NG', 
 '{"rate": 0.05}', 
 '{"rate": 0.075}', 
 '2025-01-15', 'admin', NOW(), 
 'FIRS rate increase', 'FIRS 2025/VAT/001');

-- Step 5: Verify update
SELECT * FROM tax_rules WHERE section_code = 'VAT' AND status = 'active';
```

---

## COMMON SCENARIOS

### Scenario 1: Calculate VAT on Invoice with Exemption

```
Customer: ABC Non-profit Corp (has exemption)
Amount: ₦50,000
Item: Professional Services

Step 1: Check exemption
  → Customer has exemption for 'professional_services'
  → Exemption ID: EXM-ABC-NONPROFIT-001

Step 2: Calculate VAT
  → Amount: ₦50,000
  → Exemption applies: TRUE
  → VAT Rate: 0% (exempt, not zero-rated)
  → VAT Amount: ₦0
  → Total Invoice: ₦50,000

Result: Invoice issued with NO VAT
```

### Scenario 2: Calculate WHT on Payment to Contractor

```
Contractor: John Doe (TIN: 12345678901)
Service Type: Consulting
Amount: ₦100,000
Payment Date: Dec 25, 2025

Step 1: Check WHT applicability
  → Service payment: YES
  → WHT Rate: 5%
  → Recipient registered: YES

Step 2: Calculate WHT
  → Amount: ₦100,000
  → WHT Rate: 5%
  → WHT Amount: ₦5,000
  → Net Payment: ₦95,000

Step 3: Record for remittance
  → Withholding Date: Dec 25, 2025
  → Remittance Due: Jan 15, 2026
  → WHT Certificate required: YES

Payment Summary:
  Gross: ₦100,000
  WHT: ₦5,000
  Net: ₦95,000
  Remit to FIRS by: Jan 15, 2026
```

### Scenario 3: Annual CIT Calculation

```
Company: TechCorp Nigeria Ltd
Company Type: Small Company (< ₦25M)
Fiscal Year: 2025

Financial Summary:
  Total Revenue: ₦20,000,000
  Cost of Goods Sold: ₦8,000,000
  Operating Expenses: ₦5,000,000
  Depreciation: ₦500,000

Step 1: Calculate Chargeable Income
  Gross Income = ₦20M - ₦8M = ₦12,000,000
  Deductions = ₦5M + ₦500K = ₦5,500,000
  Chargeable = ₦12M - ₦5.5M = ₦6,500,000

Step 2: Determine CIT Rate
  Income: ₦6.5M < ₦25M
  Company Type: Small
  CIT Rate: 20%

Step 3: Apply Relief (if applicable)
  Operating Years: 2 (< 3 years)
  Relief: 50% of income
  Relief Amount: ₦6.5M × 50% = ₦3,250,000

Step 4: Calculate Final CIT
  Taxable Income: ₦6.5M - ₦3.25M = ₦3,250,000
  CIT @ 20%: ₦3.25M × 0.20 = ₦650,000

Step 5: Quarterly Payments Schedule
  Q1 (Apr 21): ₦162,500
  Q2 (Jul 21): ₦162,500
  Q3 (Oct 21): ₦162,500
  Q4 (Jan 21): ₦162,500
  Total: ₦650,000

Annual CIT Due: ₦650,000
Filing Deadline: Apr 30, 2026
```

---

## TROUBLESHOOTING

### Issue 1: Calculation Mismatch

**Problem:** Calculated VAT doesn't match expected amount

```
Solution:
1. Verify rate from database:
   SELECT vat_rate FROM taxability_rules WHERE id = 'rule-id'

2. Check exemption status:
   SELECT * FROM exemptions WHERE reference_id = 'customer-id'

3. Manually calculate:
   Amount: ₦10,000
   Rate: 7.5%
   Expected VAT: ₦750
   
4. If mismatch, check:
   ├─ Is exemption applied when it shouldn't be?
   ├─ Is rate outdated?
   ├─ Is calculation formula correct?
   └─ Log all steps for audit

5. Fix:
   ├─ Update rate in database
   ├─ Clear cache
   └─ Recalculate
```

### Issue 2: Exemption Not Applying

**Problem:** Exemption configured but not applying to transactions

```
Solution:
1. Verify exemption exists and is active:
   SELECT * FROM exemptions 
   WHERE reference_id = 'customer-id' 
   AND status = 'active'
   AND effective_date <= TODAY()
   AND (expiry_date IS NULL OR expiry_date > TODAY())

2. Check exemption type matches:
   ├─ Is it customer exemption?
   ├─ Is it item exemption?
   ├─ Is it sector exemption?

3. Verify exemption is being checked:
   ├─ Is the API call including customer_exemption param?
   ├─ Is the parameter value correct?
   ├─ Is the database query finding the exemption?

4. Fix:
   ├─ Activate exemption if expired
   ├─ Update exemption status in database
   ├─ Restart calculation
   └─ Re-test
```

### Issue 3: Wrong Tax Rate Applied

**Problem:** Transaction calculated with incorrect tax rate

```
Solution:
1. Verify current active rates:
   SELECT * FROM tax_rules 
   WHERE section_code = 'VAT' 
   AND status = 'active'
   AND effective_date <= TODAY()

2. Check for rate overrides:
   SELECT * FROM taxability_rules 
   WHERE category = 'item-category'
   AND effective_date <= TODAY()

3. Verify jurisdictional rules:
   ├─ Is this multi-state transaction?
   ├─ Does customer have nexus in different state?
   ├─ Should different rate apply?

4. Fix:
   ├─ Update tax_rules to mark old rate as superseded
   ├─ Insert new active rule with correct rate
   ├─ Update rate_history for audit
   └─ Clear system cache
   └─ Recalculate affected transactions
```

### Issue 4: Filing Deadline Missed

**Problem:** Tax return deadline has passed

```
Solution:
1. Calculate penalty:
   Days Late: TODAY() - due_date
   Amount: original_tax_amount
   Interest Rate: 5% per annum
   Penalty = Amount × Rate × (Days / 365)

2. Check for relief:
   ├─ Was there force majeure?
   ├─ Was there system failure?
   ├─ Can mitigation be claimed?

3. Prepare amended filing:
   ├─ File return immediately
   ├─ Include penalty amount
   ├─ Attach explanation letter
   ├─ Request penalty reduction if applicable

4. Record in database:
   UPDATE filing_compliance 
   SET filing_status = 'filed',
       filed_date = TODAY(),
       penalty_amount = calculated_penalty
   WHERE fiscal_period = 'period'
```

---

## QUICK REFERENCE: API CALLS BY USE CASE

```typescript
// USE CASE 1: User creates invoice
const vat = await fetch('/api/tax-engine/vat/calculate', {
  method: 'POST',
  body: JSON.stringify({
    grossAmount: itemAmount,
    supplyType: 'services',
    category: 'professional',
    customerExemption: null
  })
});

// USE CASE 2: Manager needs to check VAT due
const vat Return = await fetch('/api/tax-engine/vat/return/calculate', {
  method: 'POST',
  body: JSON.stringify({
    periodStart: '2025-12-01',
    periodEnd: '2025-12-31',
    allTransactions: transactions
  })
});

// USE CASE 3: Admin updates tax rate
const update = await fetch('/api/tax-engine/section/VAT-2025-NG', {
  method: 'PUT',
  body: JSON.stringify({
    rates: { standard: 0.075 },
    effectiveDate: '2025-01-15',
    reason: 'FIRS rate increase'
  })
});

// USE CASE 4: System calculates penalties for overdue payment
const penalty = await fetch('/api/tax-engine/penalties/calculate', {
  method: 'POST',
  body: JSON.stringify({
    taxType: 'vat',
    originalAmount: 500000,
    dueDate: '2025-12-21',
    paymentDate: '2026-01-30'
  })
});
```

---

**END OF IMPLEMENTATION GUIDE**

This guide provides everything needed to implement, maintain, and update the Tax Rules Engine. Use it as a reference during development and as an ongoing maintenance guide.

