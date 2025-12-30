# TAX RULES ENGINE FOR TAXGEE PRO
**Complete Tax Calculation & Compliance Framework**  
**Date:** December 25, 2025  
**Version:** 1.0  
**Jurisdiction:** Nigeria (Federal)  

---

## TABLE OF CONTENTS

1. [Engine Overview](#engine-overview)
2. [Section 1: VAT Rules Engine](#section-1-vat-rules-engine)
3. [Section 2: CIT Rules Engine](#section-2-cit-rules-engine)
4. [Section 3: WHT Rules Engine](#section-3-wht-rules-engine)
5. [Section 4: Deduction Rules Engine](#section-4-deduction-rules-engine)
6. [Section 5: Exemption Rules Engine](#section-5-exemption-rules-engine)
7. [Section 6: Nexus Rules Engine](#section-6-nexus-rules-engine)
8. [Section 7: Filing Rules Engine](#section-7-filing-rules-engine)
9. [Section 8: Penalty & Interest Engine](#section-8-penalty--interest-engine)
10. [Section 9: Business Segment Rules](#section-9-business-segment-rules)
11. [Tax Calculation Workflow](#tax-calculation-workflow)

---

## ENGINE OVERVIEW

### Purpose
The Tax Rules Engine provides a comprehensive, modular system for calculating taxes in Nigeria based on current legislation. Each section is independently referenceable and updateable.

### Architecture

```
Tax Rules Engine
├─ Section 1: VAT (Value Added Tax)
│  ├─ Rate calculations
│  ├─ Taxability rules
│  ├─ Invoice management
│  └─ Return requirements
│
├─ Section 2: CIT (Company Income Tax)
│  ├─ Rate calculations
│  ├─ Chargeable income determination
│  ├─ Loss carryover
│  └─ Quarterly advance payments
│
├─ Section 3: WHT (Withholding Tax)
│  ├─ Rate calculations per payment type
│  ├─ Timing rules
│  ├─ Exemption rules
│  └─ Credit mechanisms
│
├─ Section 4: Deductions
│  ├─ Allowable deductions
│  ├─ Restricted deductions
│  ├─ Depreciation schedules
│  └─ Limitation rules
│
├─ Section 5: Exemptions
│  ├─ Customer exemptions
│  ├─ Item exemptions
│  ├─ Sector exemptions
│  └─ Temporal exemptions
│
├─ Section 6: Nexus
│  ├─ Jurisdiction presence rules
│  ├─ State-level tax rates
│  ├─ Multi-jurisdiction calculations
│  └─ Aggregation rules
│
├─ Section 7: Filing
│  ├─ Return filing periods
│  ├─ Deadline calculations
│  ├─ Electronic filing rules
│  └─ Extension procedures
│
├─ Section 8: Penalties & Interest
│  ├─ Late payment penalties
│  ├─ Non-filing penalties
│  ├─ Interest calculations
│  └─ Mitigating circumstances
│
└─ Section 9: Business Segments
   ├─ Individual businesses
   ├─ Partnership rules
   ├─ Corporate entities
   └─ Cooperative societies
```

---

## SECTION 1: VAT RULES ENGINE

**Reference Code:** VAT-2025-NG  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  

### 1.1 Standard VAT Rate

```typescript
interface VATRate {
  standard: number;      // 7.5% (effective from Jan 2025)
  reduced: number;       // 0% (zero-rated supplies)
  exempt: number;        // 0% (exempt supplies)
  description: string;
  effectiveDate: Date;
  jurisdiction: string;
  reference: string;     // FIRS guideline reference
}

const VAT_RATES = {
  standard: 0.075,
  reduced: 0.00,
  exempt: 0.00,
  description: "Standard VAT rate in Nigeria (2025)",
  effectiveDate: new Date("2025-01-01"),
  jurisdiction: "Nigeria (Federal)",
  reference: "VAT Act Cap V1, LFN 2004 (as amended 2024)"
};
```

**Rules:**
```
✓ Standard rate: 7.5% on all taxable supplies (2025)
✓ Zero-rated rate: 0% on qualifying exports and international supplies
✓ Exempt supplies: 0% on exempt goods (financial services, healthcare, education)
✓ No compound VAT: VAT is not charged on VAT
✓ Effective from: January 1, 2025 (updated from 5%)
✓ Applies to: All registrable businesses
```

---

### 1.2 Taxability Rules

```typescript
interface TaxabilityRule {
  id: string;
  category: string;
  description: string;
  taxable: boolean;
  rate: number;
  conditions: TaxabilityCondition[];
  exceptions: string[];
  reference: string;
}

interface TaxabilityCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
  value: any;
}

enum SupplyType {
  GOODS = "goods",
  SERVICES = "services",
  DIGITAL = "digital_services",
  FINANCIAL = "financial_services",
  HEALTHCARE = "healthcare",
  EDUCATION = "education",
  FOOD = "food",
  AGRICULTURAL = "agricultural",
  EXPORT = "export",
  IMPORT = "import"
}
```

#### 1.2.1 Goods Taxability

```
TAXABLE GOODS:
├─ Manufactured goods: 7.5% VAT
├─ Imported goods: 7.5% VAT (on landed cost)
├─ Packaging materials: 7.5% VAT
├─ Electronics: 7.5% VAT
├─ Clothing & Textiles: 7.5% VAT
├─ Motor vehicles: 7.5% VAT
│
ZERO-RATED GOODS (0% VAT):
├─ Raw food items:
│  ├─ Flour (wheat, corn, cassava)
│  ├─ Rice (local, parboiled)
│  ├─ Fresh fruits & vegetables
│  ├─ Fresh meat & poultry
│  ├─ Fresh fish & seafood
│  └─ Unprocessed agricultural products
│
├─ Medicines & Medical supplies:
│  ├─ Prescription drugs
│  ├─ Vaccines
│  ├─ Medical devices
│  └─ Diagnostic equipment
│
├─ Educational materials:
│  ├─ Textbooks
│  ├─ Educational equipment
│  └─ Educational materials for schools
│
├─ International supplies:
│  ├─ Exports of goods
│  ├─ International services
│  └─ Cross-border transactions
│
EXEMPT SUPPLIES (0% VAT):
├─ Financial services:
│  ├─ Banking services
│  ├─ Insurance
│  ├─ Investment management
│  └─ Money lending
│
├─ Healthcare:
│  ├─ Medical consultations
│  ├─ Hospital services
│  ├─ Laboratory tests
│  └─ Health insurance
│
├─ Education:
│  ├─ School fees
│  ├─ University tuition
│  ├─ Training courses (accredited)
│  └─ Educational grants
│
├─ Utilities:
│  ├─ Water supply
│  ├─ Sewerage services
│  └─ Waste disposal
│
├─ Public transport:
│  ├─ Bus services
│  ├─ Train services
│  └─ Taxi services
```

#### 1.2.2 Services Taxability

```
TAXABLE SERVICES (7.5% VAT):
├─ Professional services:
│  ├─ Accounting: 7.5%
│  ├─ Legal: 7.5%
│  ├─ Consulting: 7.5%
│  ├─ Engineering: 7.5%
│  └─ Architectural: 7.5%
│
├─ Technology services:
│  ├─ Software development: 7.5%
│  ├─ IT consulting: 7.5%
│  ├─ Tech support: 7.5%
│  ├─ Cloud services: 7.5%
│  └─ Data services: 7.5%
│
├─ Business services:
│  ├─ Cleaning services: 7.5%
│  ├─ Security services: 7.5%
│  ├─ Recruitment: 7.5%
│  ├─ Advertising: 7.5%
│  ├─ Marketing: 7.5%
│  └─ Management services: 7.5%
│
├─ Transportation & Logistics:
│  ├─ Freight: 7.5%
│  ├─ Courier: 7.5%
│  ├─ Warehousing: 7.5%
│  └─ Logistics: 7.5%
│
├─ Hospitality:
│  ├─ Hotel accommodation: 7.5%
│  ├─ Restaurant meals: 7.5%
│  ├─ Catering: 7.5%
│  ├─ Entertainment: 7.5%
│  └─ Tourism: 7.5%
│
├─ Maintenance & Repair:
│  ├─ Vehicle repair: 7.5%
│  ├─ Equipment maintenance: 7.5%
│  ├─ Building maintenance: 7.5%
│  └─ Plant repair: 7.5%
│
ZERO-RATED SERVICES (0%):
├─ International services:
│  ├─ Cross-border IT services
│  ├─ International consulting
│  └─ Exported services
│
├─ Export-related:
│  ├─ Packaging for export: 0%
│  ├─ Freight (international): 0%
│  └─ Export documentation: 0%
│
EXEMPT SERVICES (0%):
├─ Financial services:
│  ├─ Loan origination: 0%
│  ├─ Investment advisory: 0%
│  ├─ Insurance: 0%
│  └─ Fund management: 0%
│
├─ Healthcare services:
│  ├─ Medical treatment: 0%
│  ├─ Hospital services: 0%
│  ├─ Laboratory tests: 0%
│  └─ Health insurance: 0%
│
├─ Education services:
│  ├─ School tuition: 0%
│  ├─ Training (accredited): 0%
│  ├─ Courses: 0%
│  └─ Educational services: 0%
│
├─ Public utilities:
│  ├─ Water supply: 0%
│  ├─ Sewerage: 0%
│  └─ Waste disposal: 0%
```

#### 1.2.3 Digital Services Taxability

```
DIGITAL GOODS & SERVICES (7.5% VAT):

✓ Software & Applications:
├─ SaaS (Software-as-a-Service)
├─ Cloud computing
├─ Mobile applications
├─ Desktop applications
└─ Plugins & extensions

✓ Digital Content:
├─ E-books & e-magazines
├─ Digital music & audio
├─ Digital video & streaming
├─ Photography & images
└─ Graphic designs

✓ Digital Services:
├─ Online advertising
├─ Digital marketing
├─ Web design & development
├─ App development
├─ Technical support (online)
└─ Consulting (online)

✓ Online Marketplace:
├─ Commission on e-commerce sales
├─ Platform fees
├─ Listing fees
└─ Transaction fees

LOCATION RULE FOR DIGITAL SERVICES:
├─ If customer has nexus in Nigeria: 7.5% VAT applies
├─ If customer is outside Nigeria: May be exempt (export)
├─ If customer location unclear: Apply 7.5% as default
└─ Document customer location for compliance
```

---

### 1.3 VAT Calculation

```typescript
interface VATCalculation {
  grossAmount: number;
  vatRate: number;
  vatAmount: number;
  netAmount: number;
  taxable: boolean;
  zeroRated: boolean;
  exempt: boolean;
  timestamp: Date;
}

function calculateVAT(params: {
  grossAmount: number;
  supplyType: SupplyType;
  customerLocation?: string;
  exemptionApplied?: boolean;
  zeroRated?: boolean;
}): VATCalculation {
  const { grossAmount, supplyType, exemptionApplied, zeroRated } = params;
  
  // Determine tax rate
  let vatRate = VAT_RATES.standard;
  
  if (zeroRated || isZeroRatedSupply(supplyType)) {
    vatRate = 0;
  } else if (exemptionApplied || isExemptSupply(supplyType)) {
    vatRate = 0;
  }
  
  // Calculate VAT
  const vatAmount = grossAmount * vatRate;
  const netAmount = grossAmount; // Net = Gross (VAT separate)
  
  return {
    grossAmount,
    vatRate,
    vatAmount: Math.round(vatAmount * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    taxable: vatRate > 0,
    zeroRated: vatRate === 0 && isZeroRatedSupply(supplyType),
    exempt: vatRate === 0 && isExemptSupply(supplyType),
    timestamp: new Date()
  };
}
```

**Calculation Formula:**
```
VAT Amount = Gross Amount × VAT Rate
Total Invoice = Gross Amount + VAT Amount (if taxable)

Example 1 - Taxable Supply:
Gross: ₦10,000
Rate: 7.5%
VAT: ₦750
Total: ₦10,750

Example 2 - Zero-Rated Supply:
Gross: ₦10,000
Rate: 0%
VAT: ₦0
Total: ₦10,000

Example 3 - Exempt Supply:
Gross: ₦10,000
Rate: 0% (exempt)
VAT: ₦0
Total: ₦10,000
```

---

### 1.4 Invoice Requirements

```typescript
interface VATInvoice {
  id: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  supplier: {
    name: string;
    tinNumber: string;
    vatRegNumber: string;
    address: string;
    phone: string;
    email: string;
  };
  customer: {
    name: string;
    tinNumber?: string;
    vatRegNumber?: string;
    address: string;
    exemptionStatus?: 'none' | 'customer_exempt' | 'item_exempt';
  };
  items: InvoiceLineItem[];
  summary: {
    subtotal: number;
    vatAmount: number;
    total: number;
  };
  paymentTerms: string;
  notes?: string;
}

interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  vatRate: number;
  vatAmount: number;
  zeroRated: boolean;
  exempt: boolean;
}
```

**Mandatory Fields on Invoice:**
```
✓ Supplier information:
  - Business name
  - TIN (Tax Identification Number)
  - VAT registration number
  - Full address
  - Contact details

✓ Customer information:
  - Name/Business name
  - Address
  - TIN (if available)
  - VAT reg (if registered)

✓ Invoice details:
  - Sequential invoice number
  - Issue date
  - Due date
  - Payment terms

✓ Line items:
  - Item description
  - Quantity
  - Unit price
  - Line total
  - VAT rate applied
  - VAT amount

✓ Totals:
  - Subtotal (before VAT)
  - VAT amount
  - Grand total

✓ Other:
  - Terms of payment
  - Any discounts (separate line)
  - Notes/Special instructions
```

---

### 1.5 VAT Return Requirements

```typescript
interface VATReturn {
  periodStart: Date;
  periodEnd: Date;
  returnDueDate: Date;
  taxableSupplies: number;
  zeroRatedSupplies: number;
  exemptSupplies: number;
  totalOutputVAT: number;
  inputVAT: {
    goodsAndServices: number;
    importedGoods: number;
    otherInputs: number;
    totalInputVAT: number;
  };
  netVATPayable: number;
  status: 'draft' | 'submitted' | 'approved' | 'under_review';
  din?: string; // Deposit Invoice Number
}

const VAT_FILING_SCHEDULE = {
  filingPeriod: "Monthly",
  dueDate: "21st of following month",
  filingMethod: "Electronic (FIRS Online)",
  penalties: {
    lateFiling: "₦50,000 - ₦5,000,000 per month",
    nonFiling: "₦500,000 - ₦5,000,000"
  }
};
```

**VAT Return Calculation:**
```
Output VAT = VAT on all taxable supplies

Input VAT = VAT paid on:
  ├─ Goods and services purchased
  ├─ Imported goods (on landing cost)
  ├─ Fuel and utilities (50% claimable)
  ├─ Vehicle costs (limited 50%)
  └─ Capital equipment (100% claimable)

Net VAT Payable = Output VAT - Input VAT

If Net VAT Payable > 0: Pay to government
If Net VAT Payable < 0: Carry forward or claim refund

VAT Returns filed: Monthly (by 21st of following month)
```

---

### 1.6 VAT Compliance Rules

```
REGISTRATION REQUIREMENTS:
✓ Annual turnover > ₦25,000,000: Mandatory registration
✓ Annual turnover < ₦25,000,000: Optional registration
✓ All importers: Must register
✓ Foreign companies supplying Nigeria: Must register

INVOICING RULES:
✓ Must issue invoice on all taxable supplies
✓ Consecutive numbering required
✓ All mandatory fields must be present
✓ Original + 2 copies kept
✓ Electronically signed invoices accepted

RECORD KEEPING:
✓ Keep all invoices (issued & received) for 5 years
✓ Keep VAT returns & supporting documents for 5 years
✓ Keep purchase receipts & invoices for 5 years
✓ Electronic records acceptable with audit trail

PAYMENT RULES:
✓ VAT payable by 21st of following month
✓ Payment via bank transfer (FIRS account)
✓ DIN (Deposit Invoice Number) required as proof
✓ Late payment incurs interest (5% p.a.)

AUDIT RULES:
✓ FIRS can conduct VAT audits at any time
✓ Taxpayers must provide all documents within 30 days
✓ Appeals must be filed within 30 days of assessment
✓ Overpayment refunded or carried forward
```

---

## SECTION 2: CIT RULES ENGINE

**Reference Code:** CIT-2025-NG  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  

### 2.1 CIT Rate Structure

```typescript
interface CITRate {
  category: 'small_company' | 'large_company' | 'partnership' | 'cooperative';
  rate: number;
  annualIncome: {
    min: number;
    max: number;
  };
  description: string;
  effectiveDate: Date;
}

const CIT_RATES = [
  {
    category: 'small_company',
    rate: 0.20, // 20% for SMEs
    annualIncome: { min: 0, max: 25000000 },
    description: "Small company (annual income ≤ ₦25M)"
  },
  {
    category: 'large_company',
    rate: 0.30, // 30% for large companies
    annualIncome: { min: 25000001, max: Infinity },
    description: "Large company (annual income > ₦25M)"
  },
  {
    category: 'partnership',
    rate: 0.20, // 20% on partnership income
    annualIncome: { min: 0, max: Infinity },
    description: "Partnership entities"
  },
  {
    category: 'cooperative',
    rate: 0.10, // 10% on cooperative income
    annualIncome: { min: 0, max: Infinity },
    description: "Cooperative societies"
  }
];
```

**CIT Rate Rules:**
```
SMALL COMPANIES (Annual Income ≤ ₦25,000,000):
├─ CIT Rate: 20%
├─ Applies to: Companies with turnover up to ₦25M
├─ Relief: 50% relief in first 3 years of operation
├─ Conditions:
│  ├─ Must be Nigerian resident
│  ├─ Must file annual returns
│  ├─ Must keep proper records
│  └─ Must pay PAYE correctly

LARGE COMPANIES (Annual Income > ₦25,000,000):
├─ CIT Rate: 30%
├─ Applies to: Companies with turnover above ₦25M
├─ Additional: 2-3% Tertiary Education Tax (TET)
├─ Conditions:
│  ├─ Must file quarterly advance payments
│  ├─ Must file monthly PAYE
│  ├─ Must maintain detailed records
│  └─ Subject to annual audit requirement

PARTNERSHIPS:
├─ CIT Rate: 20% on partnership income
├─ Plus: Individual partner income tax
├─ Treatment: Income flows through to partners
└─ Filing: Joint partnership return + individual returns

COOPERATIVES:
├─ CIT Rate: 10% (incentive rate)
├─ Requirements:
│  ├─ Must be registered cooperative
│  ├─ Must have minimum members (varies by state)
│  └─ Must operate under cooperative principles
└─ Benefits: Lower rate + exemption on certain income
```

---

### 2.2 Chargeable Income Determination

```typescript
interface ChargeableIncome {
  grossIncome: number;
  allowableDeductions: number;
  restrictedDeductions: number;
  depreciation: number;
  carryForwardLosses: number;
  chargeableIncome: number;
  taxableIncome: number;
}

function calculateChargeableIncome(params: {
  totalRevenue: number;
  costOfGoodsSold?: number;
  operatingExpenses?: number;
  depreciation?: number;
  carryForwardLosses?: number;
}): ChargeableIncome {
  const grossIncome = params.totalRevenue - (params.costOfGoodsSold || 0);
  let allowableDeductions = params.operatingExpenses || 0;
  
  // Add depreciation
  const depreciation = params.depreciation || 0;
  allowableDeductions += depreciation;
  
  // Calculate chargeable income
  let chargeableIncome = grossIncome - allowableDeductions;
  
  // Apply carried forward losses
  const carriedLosses = params.carryForwardLosses || 0;
  let taxableIncome = Math.max(chargeableIncome - carriedLosses, 0);
  
  return {
    grossIncome,
    allowableDeductions,
    restrictedDeductions: 0,
    depreciation,
    carryForwardLosses: carriedLosses,
    chargeableIncome,
    taxableIncome
  };
}
```

**Chargeable Income Formula:**
```
Gross Income = Total Revenue - Cost of Goods Sold

Allowable Deductions:
├─ Staff salaries
├─ Rent for business premises
├─ Utilities (electricity, water, gas)
├─ Depreciation (per approved schedule)
├─ Interest on loans
├─ Insurance premiums
├─ Professional fees (accountant, lawyer)
├─ Advertising & marketing
├─ Vehicle running costs
├─ Materials & supplies
├─ Repairs & maintenance (business)
└─ Bad debts written off

Restricted Deductions (Only partially allowed):
├─ Entertainment (50% allowable)
├─ Vehicles (50% allowable on costs)
├─ Fuel (50% allowable)
├─ Telephone (business portion only)
├─ Management fees (within limits)
└─ Donations (5% of profit limit)

NOT ALLOWED:
├─ Personal expenses
├─ Tax payments
├─ Drawings by proprietor
├─ Capital expenditure
├─ Depreciation (use approved rates)
├─ Bribes & corruption
├─ Penalties & fines
└─ Political donations

CALCULATION:
Chargeable Income = Gross Income - Allowable Deductions

Taxable Income = Chargeable Income - Carried Forward Losses

CIT Amount = Taxable Income × CIT Rate
```

---

### 2.3 Allowable Deductions

```typescript
interface AllowableDeduction {
  id: string;
  category: string;
  description: string;
  limitType: 'unlimited' | 'percentage' | 'fixed_amount';
  limit?: number;
  supporting_documents: string[];
  approval_required: boolean;
}

const ALLOWABLE_DEDUCTIONS = {
  staffCosts: {
    salaries: { unlimited: true, docs: ["payroll register", "PAYE records"] },
    benefits: { unlimited: true, docs: ["benefit policy", "payment records"] },
    pension: { unlimited: true, docs: ["pension scheme details", "remittance proof"] },
    training: { unlimited: true, docs: ["training certificate", "invoice"] }
  },
  
  operatingExpenses: {
    rent: { unlimited: true, docs: ["lease agreement", "payment proof"] },
    utilities: { unlimited: true, docs: ["receipts", "bills"] },
    insurance: { unlimited: true, docs: ["policy", "premium receipts"] },
    professionalFees: { unlimited: true, docs: ["invoice", "service agreement"] },
    repairs: { unlimited: true, docs: ["invoice", "work order"] },
    supplies: { unlimited: true, docs: ["receipts"] }
  },
  
  restricted: {
    entertainment: { limit: "50%", docs: ["receipts", "business purpose memo"] },
    vehicles: { limit: "50%", docs: ["registration", "expense receipts"] },
    fuel: { limit: "50%", docs: ["receipts", "log book"] },
    telephone: { limit: "business%", docs: ["bill", "business allocation"] },
    donations: { limit: "5% of profit", docs: ["receipt", "approval"] }
  },
  
  notAllowed: [
    "Personal expenses",
    "Entertainment over limit",
    "Tax penalties",
    "Income tax payments",
    "Draws/Proprietor's income",
    "Bribes and corruption",
    "Fines and penalties",
    "Political donations"
  ]
};
```

---

### 2.4 Depreciation Schedule

```typescript
interface DepreciationSchedule {
  assetCategory: string;
  initialCost: number;
  depreciationRate: number;
  usefulLife: number;
  salvageValue: number;
  depreciationPerYear: number;
  accumulatedDepreciation: number;
  bookValue: number;
}

const APPROVED_DEPRECIATION_RATES = {
  industrial: {
    machinery: 0.20, // 20% per year
    equipment: 0.15, // 15% per year
    vehicles: 0.20,  // 20% per year
    tools: 0.25      // 25% per year
  },
  
  commercial: {
    fixtures: 0.10, // 10% per year
    fittings: 0.15, // 15% per year
    vehicles: 0.20, // 20% per year
    computers: 0.40 // 40% per year
  },
  
  buildings: {
    industrial: 0.05,    // 5% per year
    commercial: 0.05,    // 5% per year
    residential: 0.05,   // 5% per year
    agricultural: 0.10   // 10% per year
  },
  
  it: {
    computers: 0.40,    // 40% per year
    software: 0.50,     // 50% per year
    servers: 0.33,      // 33% per year
    networking: 0.25    // 25% per year
  }
};

function calculateDepreciation(params: {
  assetCategory: string;
  initialCost: number;
  acquisitionDate: Date;
  years: number;
}): DepreciationSchedule {
  const rate = APPROVED_DEPRECIATION_RATES[params.assetCategory] || 0.15;
  const depreciation = params.initialCost * rate * params.years;
  
  return {
    assetCategory: params.assetCategory,
    initialCost: params.initialCost,
    depreciationRate: rate,
    usefulLife: Math.ceil(1 / rate),
    salvageValue: Math.max(params.initialCost - depreciation, 0),
    depreciationPerYear: params.initialCost * rate,
    accumulatedDepreciation: depreciation,
    bookValue: params.initialCost - depreciation
  };
}
```

**Depreciation Rates by Asset Type:**
```
INDUSTRIAL ASSETS:
├─ Machinery & Equipment: 20% per year
├─ Motor Vehicles: 20% per year
├─ Tools & Implements: 25% per year
└─ Furniture & Fittings: 15% per year

COMMERCIAL ASSETS:
├─ Shop Fixtures: 10% per year
├─ Office Equipment: 15% per year
├─ Vehicles: 20% per year
└─ Computers & IT: 40% per year

BUILDINGS:
├─ Industrial Buildings: 5% per year
├─ Commercial Buildings: 5% per year
├─ Residential: 5% per year
└─ Agricultural: 10% per year

IT ASSETS:
├─ Computers: 40% per year
├─ Software: 50% per year
├─ Servers: 33% per year
└─ Networking Equipment: 25% per year

CALCULATION METHOD:
Annual Depreciation = Cost × Depreciation Rate
Book Value = Cost - Accumulated Depreciation
```

---

### 2.5 Quarterly Advance Payments

```typescript
interface QuarterlyAdvancePayment {
  year: number;
  quarter: number;
  estimatedProfit: number;
  previousYearProfit: number;
  citRate: number;
  calculatedPayment: number;
  dueDate: Date;
  paymentStatus: 'pending' | 'paid' | 'overdue';
  penaltyIfLate: number;
}

const QUARTERLY_PAYMENT_SCHEDULE = {
  q1: { month: "April", dueDate: "21st" },
  q2: { month: "July", dueDate: "21st" },
  q3: { month: "October", dueDate: "21st" },
  q4: { month: "January (next year)", dueDate: "21st" }
};

function calculateQuarterlyPayment(params: {
  estimatedAnnualProfit: number;
  previousYearProfit: number;
  citRate: number;
}): number {
  // Use either 50% of estimated profit or 100% of previous year
  const paymentBase = Math.min(
    params.estimatedAnnualProfit * 0.5,
    params.previousYearProfit * 1.0
  );
  
  return Math.round((paymentBase / 4) * params.citRate * 100) / 100;
}
```

**Quarterly Payment Rules:**
```
PAYMENT SCHEDULE:
├─ Q1 (Jan-Mar):  Due 21st April
├─ Q2 (Apr-Jun):  Due 21st July
├─ Q3 (Jul-Sep):  Due 21st October
└─ Q4 (Oct-Dec):  Due 21st January (next year)

CALCULATION METHOD:
Use the GREATER of:
  ├─ 50% of estimated annual profit for current year
  └─ 100% of previous year's profit

Annual total = Q1 + Q2 + Q3 + Q4 payments
Final settlement: After filing annual return

LATE PAYMENT PENALTY:
├─ Interest rate: 5% per annum
├─ Minimum: ₦5,000 per late quarter
├─ Calculated from due date
└─ Applies daily until payment

OVERPAYMENT CREDIT:
├─ Excess quarterly payments credited to annual CIT
├─ Or refunded if no annual CIT due
├─ Can be applied to next year's payments
└─ Interest on refund: 3% per annum
```

---

### 2.6 Loss Carryover

```typescript
interface LossCarryover {
  lossYear: number;
  lossAmount: number;
  carryOverYears: number;
  currentYear: number;
  yearsRemaining: number;
  utilizableAmount: number;
  unutilizedLoss: number;
}

const LOSS_CARRYOVER_RULES = {
  carryoverPeriod: 4, // 4 years
  utilizationLimit: 0.80, // Can use max 80% of profit
  restrictions: [
    "Losses from investment income cannot offset trading losses",
    "Losses from one source cannot offset another source",
    "Carried losses must be used in order (FIFO)"
  ]
};

function applyLossCarryover(params: {
  currentYearProfit: number;
  carryoverLosses: {
    year: number;
    amount: number;
  }[];
}): number {
  let availableProfit = params.currentYearProfit;
  let utilizableAmount = 0;
  
  // Apply carried losses in chronological order (oldest first)
  for (const loss of params.carryoverLosses.sort((a, b) => a.year - b.year)) {
    const canUse = Math.min(loss.amount, availableProfit);
    utilizableAmount += canUse;
    availableProfit -= canUse;
    
    if (availableProfit <= 0) break;
  }
  
  return Math.max(params.currentYearProfit - utilizableAmount, 0);
}
```

**Loss Carryover Rules:**
```
CARRYING FORWARD LOSSES:
├─ Losses from trading can be carried forward
├─ Period: Up to 4 years from loss year
├─ Method: First-in-first-out (FIFO)
├─ Conditions:
│  ├─ Must be trading losses (not capital losses)
│  ├─ Must file return within required period
│  ├─ Must claim carryover in relevant year
│  └─ Must maintain detailed records

LOSS UTILIZATION:
├─ Can offset against profits of same business
├─ Cannot offset against investment income (separate source)
├─ Cannot offset against interest income
├─ Can only use available portion
├─ Unused losses expire after 4 years

DOCUMENTATION:
├─ Loss computation schedule
├─ Supporting documents
├─ Carryover schedule (in tax return)
├─ Reconciliation of utilization
└─ Remaining loss balance
```

---

## SECTION 3: WHT RULES ENGINE

**Reference Code:** WHT-2025-NG  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  

### 3.1 WHT Rates by Payment Type

```typescript
interface WHTRate {
  paymentType: string;
  rate: number;
  applicableEntity: string;
  conditions: string[];
  reference: string;
}

const WHT_RATES = {
  // Contractor/Professional Services
  contractorServices: {
    rate: 0.05, // 5%
    applies: "Individual contractors, professionals",
    examples: ["Consultants", "Engineers", "Architects", "Accountants"]
  },
  
  // Sub-contractor (Construction)
  subContracting: {
    rate: 0.10, // 10%
    applies: "Sub-contractors in construction",
    conditions: ["Must have evidence of work done", "Principal contractor liable"]
  },
  
  // Transport Service
  transport: {
    rate: 0.03, // 3%
    applies: "Road transport of goods",
    conditions: ["Only on freight charges", "Not on passenger transport"]
  },
  
  // Rent
  rent: {
    rate: 0.10, // 10%
    applies: "Rent on buildings, land, fixtures",
    conditions: ["Rental income above ₦100,000 per month", "Landlord may be exempt if registered"]
  },
  
  // Agricultural Produce
  agriculturalProduce: {
    rate: 0.03, // 3%
    applies: "Purchases of agricultural produce",
    conditions: ["Raw agricultural products only", "Not processed goods"]
  },
  
  // Plant & Machinery Hire
  machineryHire: {
    rate: 0.05, // 5%
    applies: "Hire of plant and machinery",
    conditions: ["Leasing charges", "Rental fees"]
  },
  
  // Service
  services: {
    rate: 0.05, // 5%
    applies: "General services not listed above",
    examples: ["Advertising", "Marketing", "IT services", "Cleaning services"]
  },
  
  // Imported Services
  importedServices: {
    rate: 0.10, // 10%
    applies: "Services imported from abroad",
    conditions: ["Payment to foreign supplier", "Non-resident provider"]
  },
  
  // Interest (on Loans)
  interest: {
    rate: 0.10, // 10%
    applies: "Interest payments on loans",
    conditions: ["Bank interest", "Loan interest", "Credit facility"]
  },
  
  // Management Fees
  managementFees: {
    rate: 0.05, // 5%
    applies: "Management fees and charges",
    conditions: ["Professional management fees"]
  },
  
  // Commission
  commission: {
    rate: 0.05, // 5%
    applies: "Commission payments",
    conditions: ["Agent commission", "Broker commission", "Reseller commission"]
  },
  
  // Dividend
  dividend: {
    rate: 0.10, // 10%
    applies: "Dividend payments to shareholders",
    conditions: ["Distribution of profits"]
  }
};
```

---

### 3.2 WHT Calculation & Timing

```typescript
interface WHTCalculation {
  paymentType: string;
  grossPayment: number;
  whtRate: number;
  whtAmount: number;
  netPayment: number;
  withholdingDate: Date;
  paymentDate: Date;
  remittanceDate: Date;
}

function calculateWHT(params: {
  paymentType: string;
  grossPayment: number;
  exemptionApplied?: boolean;
}): WHTCalculation {
  const rate = WHT_RATES[params.paymentType]?.rate || 0.05;
  const whtRate = params.exemptionApplied ? 0 : rate;
  const whtAmount = grossPayment * whtRate;
  const netPayment = grossPayment - whtAmount;
  
  return {
    paymentType: params.paymentType,
    grossPayment: params.grossPayment,
    whtRate,
    whtAmount: Math.round(whtAmount * 100) / 100,
    netPayment: Math.round(netPayment * 100) / 100,
    withholdingDate: new Date(),
    paymentDate: new Date(), // Add 3 days
    remittanceDate: new Date() // Add 21 days
  };
}
```

**WHT Timing Rules:**
```
TIMING FOR REMITTANCE:

Contractual (Services, Rent, etc.):
├─ Withhold at payment/receipt
├─ Remit to tax authority: Within 21 days
├─ Document: Withholding receipt
└─ Late penalty: 5% p.a. interest

Construction/Sub-contracting:
├─ Withhold at each payment
├─ Remit: Before releasing balance
├─ Document: Proof of withholding
└─ Penalty: Non-remittance = 50% of WHT amount

Payments to Residents:
├─ Can be credited against income tax
├─ Must provide proof (WHT certificate)
├─ Reconcile in annual return
└─ Request refund if over-withheld

THRESHOLDS:
├─ Services under ₦10,000: No WHT
├─ Services ₦10,000+: Apply full WHT rate
├─ Rent: Applies on amount above ₦100,000/month
└─ Agricultural: Applies on all amounts
```

---

### 3.3 WHT Exemptions

```typescript
const WHT_EXEMPTIONS = {
  // Resident Tax Payers
  residentTaxpayers: {
    condition: "Individual with valid TIN",
    applies: ["Contractors", "Professionals", "Service providers"],
    documentation: ["TIN certificate", "Tax clearance"]
  },
  
  // Government Transactions
  government: {
    entities: ["FGN Ministries", "State governments", "Local governments", "Government agencies"],
    applies: "All payments to government"
  },
  
  // Export Services
  exportServices: {
    condition: "Service exported outside Nigeria",
    applies: ["International services", "Consulting to foreigners"],
    documentation: ["Export evidence", "Customer location proof"]
  },
  
  // Small Businesses
  smallBusiness: {
    condition: "Annual turnover < ₦25,000,000",
    applies: "May claim exemption",
    documentation: ["Turnover proof", "Business registration"]
  },
  
  // Pensioners
  pensioners: {
    condition: "Pension income recipient",
    applies: "Pension payments",
    documentation: ["Pension payment proof", "Pension account"]
  },
  
  // Financial Institutions
  financialInstitutions: {
    entities: ["Banks", "Insurance companies", "NBFIs"],
    on: ["Interbank transactions", "Investment income"],
    documentation: ["FI registration"]
  }
};
```

---

## SECTION 4: DEDUCTION RULES ENGINE

**Reference Code:** DED-2025-NG  
**Effective Date:** January 1, 2025  

### 4.1 Deduction Categories

```typescript
interface DeductionCategory {
  id: string;
  name: string;
  allowanceType: 'unlimited' | 'limited' | 'restricted';
  limit?: number | string;
  requiresApproval: boolean;
  documentationRequired: string[];
  frequency: 'recurring' | 'one_time' | 'periodic';
}

const DEDUCTION_CATEGORIES = {
  // UNLIMITED DEDUCTIONS
  staffCosts: {
    type: "unlimited",
    items: [
      { name: "Salaries & wages", doc: ["Payroll register"] },
      { name: "Employee benefits", doc: ["Benefits policy"] },
      { name: "Pension contributions", doc: ["Pension scheme details"] },
      { name: "Training & development", doc: ["Training documents"] }
    ]
  },
  
  // OPERATING EXPENSES
  operatingExpenses: {
    type: "unlimited",
    items: [
      { name: "Rent", doc: ["Lease agreement", "Receipts"] },
      { name: "Utilities", doc: ["Bills", "Receipts"] },
      { name: "Insurance", doc: ["Policy", "Receipts"] },
      { name: "Professional services", doc: ["Invoice", "Agreement"] },
      { name: "Maintenance & repairs", doc: ["Invoice", "Work order"] },
      { name: "Office supplies", doc: ["Receipts"] }
    ]
  },
  
  // RESTRICTED DEDUCTIONS
  restrictedItems: {
    type: "limited",
    items: [
      { 
        name: "Entertainment", 
        limit: "50% of amount", 
        doc: ["Receipt", "Business purpose"] 
      },
      { 
        name: "Vehicle costs", 
        limit: "50% of amount", 
        doc: ["Receipt", "Business allocation"] 
      },
      { 
        name: "Fuel", 
        limit: "50% of amount", 
        doc: ["Receipt", "Logbook"] 
      },
      { 
        name: "Donations", 
        limit: "5% of profit", 
        doc: ["Receipt", "Registered charity"] 
      },
      { 
        name: "Telephone", 
        limit: "Business portion only", 
        doc: ["Bill", "Allocation schedule"] 
      }
    ]
  }
};
```

---

### 4.2 Depreciation Allowance

```
CAPITAL ALLOWANCES:
├─ Machinery & Equipment: 20% per year
├─ Motor vehicles: 20% per year
├─ Industrial buildings: 5% per year
├─ Commercial buildings: 5% per year
├─ Computers & IT: 40% per year
└─ Other equipment: 15% per year

METHOD: Straight-line depreciation
FORMULA: Annual depreciation = Cost × Rate

INITIAL ALLOWANCE:
Some assets qualify for initial allowance in year 1:
├─ Agricultural equipment: 40% initial allowance
├─ Industrial equipment: 15-40% (varies)
└─ Other: Per specific rules
```

---

## SECTION 5: EXEMPTION RULES ENGINE

**Reference Code:** EXE-2025-NG  
**Effective Date:** January 1, 2025  

### 5.1 Customer Exemption Types

```typescript
interface CustomerExemption {
  exemptionId: string;
  customerId: string;
  exemptionType: 'full' | 'partial' | 'sector_based';
  reason: string;
  exemptionPercentage: number;
  effectiveDate: Date;
  expiryDate?: Date;
  status: 'active' | 'expired' | 'pending' | 'revoked';
  documentationAttached: boolean;
}

const CUSTOMER_EXEMPTION_TYPES = {
  // SECTOR-BASED EXEMPTIONS
  education: {
    applies: ["Schools", "Universities", "Training institutions"],
    vat: "Exempt on education services",
    cit: "Exempt on education income",
    documentation: ["Educational registration", "License"]
  },
  
  healthcare: {
    applies: ["Hospitals", "Clinics", "Healthcare facilities"],
    vat: "Exempt on medical services",
    cit: "Exempt on healthcare income",
    documentation: ["Medical registration", "Healthcare license"]
  },
  
  nonprofit: {
    applies: ["NGOs", "Charities", "Humanitarian organizations"],
    vat: "Exempt on activities",
    cit: "Exempt if registered nonprofit",
    documentation: ["NGO registration", "Nonprofit status"]
  },
  
  government: {
    applies: ["Government agencies", "Public institutions"],
    vat: "Exempt on government purchases",
    cit: "N/A (government entities)",
    documentation: ["Government entity proof"]
  },
  
  agriculture: {
    applies: ["Farmers", "Agricultural cooperatives", "Food producers"],
    vat: "Exempt on raw agricultural products",
    cit: "50% relief on agricultural income (first 3 years)",
    documentation: ["Farming registration", "Cooperative certificate"]
  },
  
  export: {
    applies: ["Export companies", "International traders"],
    vat: "Zero-rated (0%) on exports",
    cit: "Standard rate applies",
    documentation: ["Export evidence", "Shipping documents"]
  },
  
  manufacturing: {
    applies: ["Manufacturers", "Processing facilities"],
    vat: "Standard rate on sales",
    cit: "Possible incentive for new industries",
    documentation: ["Manufacturing license", "Factory registration"]
  }
};
```

---

### 5.2 Item Exemption Rules

```typescript
interface ItemExemption {
  itemId: string;
  itemName: string;
  exemptionType: 'zero_rated' | 'exempt' | 'conditional';
  vat_treatment: 'taxable' | 'zero_rated' | 'exempt';
  cit_treatment: 'normal' | 'relief' | 'exempt';
  conditions?: string[];
}

const ITEM_EXEMPTION_RULES = {
  foodItems: {
    zeroRated: [
      "Raw food (flour, rice, grain)",
      "Fresh fruits & vegetables",
      "Fresh meat & poultry",
      "Fresh fish & seafood"
    ],
    conditions: "Must be raw/unprocessed"
  },
  
  medicinesMedicalDevices: {
    zeroRated: [
      "Prescription drugs",
      "Vaccines",
      "Medical equipment",
      "Diagnostic tools"
    ],
    conditions: "Must be legitimate medical items"
  },
  
  educationalMaterials: {
    zeroRated: [
      "Textbooks",
      "Educational equipment",
      "Learning materials"
    ],
    conditions: "For accredited educational institutions"
  },
  
  utilities: {
    exempt: [
      "Water supply",
      "Sewerage services",
      "Waste disposal",
      "Public transport"
    ],
    conditions: "Government or approved provider"
  },
  
  financialServices: {
    exempt: [
      "Banking services",
      "Insurance",
      "Investment management",
      "Loan services"
    ],
    conditions: "Licensed financial institution"
  }
};
```

---

## SECTION 6: NEXUS RULES ENGINE

**Reference Code:** NEX-2025-NG  
**Effective Date:** January 1, 2025  

### 6.1 Nexus Determination

```typescript
interface NexusPresence {
  stateId: string;
  stateName: string;
  hasNexus: boolean;
  nexusType: 'physical' | 'sales' | 'employees' | 'inventory' | 'combination';
  nexusDate: Date;
  status: 'active' | 'inactive';
  taxJurisdiction: {
    vat_applicable: boolean;
    cit_applicable: boolean;
    state_tax_applicable: boolean;
    local_tax_applicable: boolean;
  };
}

const NEXUS_RULES = {
  physical_presence: {
    triggers: [
      "Office location",
      "Warehouse",
      "Factory",
      "Store/Shop",
      "Service center"
    ],
    nexus_created: "Yes",
    requirements: "Address registration in state"
  },
  
  employees: {
    triggers: [
      "One or more employees",
      "Contractor relationships",
      "Regular representatives"
    ],
    nexus_created: "Yes",
    requirements: "Employee records, PAYE registration"
  },
  
  inventory: {
    triggers: [
      "Goods stored in state",
      "Distribution center",
      "Stock holding"
    ],
    nexus_created: "Yes",
    requirements: "Warehouse registration"
  },
  
  sales_threshold: {
    triggers: [
      "Annual sales > ₦25,000,000 in state",
      "Substantial economic presence",
      "Regular business transactions"
    ],
    nexus_created: "Yes",
    requirements: "Sales records, transaction documentation"
  },
  
  affiliate_presence: {
    triggers: [
      "Related company operating in state",
      "Sister company",
      "Subsidiary operations"
    ],
    nexus_created: "Possible",
    requirements: "Relationship documentation, control assessment"
  }
};
```

---

### 6.2 Multi-State Tax Calculation

```typescript
interface MultiStateCalculation {
  transaction_id: string;
  customer_state: string;
  supplier_states: string[];
  sales_by_state: {
    [state: string]: number;
  };
  vat_by_state: {
    [state: string]: number;
  };
  total_vat: number;
  apportionment_method: 'destination' | 'origin' | 'combined';
}

function calculateMultiStateTax(params: {
  saleAmount: number;
  customerState: string;
  supplierState: string;
  isExport: boolean;
}): MultiStateCalculation {
  let vat_rate = 0.075;
  let applicable_state = "";
  
  // DESTINATION principle (most common)
  if (params.saleAmount > 0 && !params.isExport) {
    applicable_state = params.customerState;
    // VAT applies in customer's state
  }
  
  const vat_amount = params.saleAmount * vat_rate;
  
  return {
    transaction_id: generateId(),
    customer_state: params.customerState,
    supplier_states: [params.supplierState],
    sales_by_state: {
      [applicable_state]: params.saleAmount
    },
    vat_by_state: {
      [applicable_state]: vat_amount
    },
    total_vat: vat_amount,
    apportionment_method: 'destination'
  };
}
```

---

## SECTION 7: FILING RULES ENGINE

**Reference Code:** FIL-2025-NG  
**Effective Date:** January 1, 2025  

### 7.1 Filing Requirements & Deadlines

```typescript
interface FilingRequirement {
  taxType: string;
  filingPeriod: string;
  dueDate: string;
  entityType: string;
  requirements: string[];
  penalties: {
    late_filing: string;
    non_filing: string;
  };
}

const FILING_REQUIREMENTS = {
  // VAT RETURNS
  vat_return: {
    filingPeriod: "Monthly",
    dueDate: "21st of following month",
    method: "Electronic (FIRS Online)",
    documentsRequired: [
      "Invoices issued (copy)",
      "Invoices received (copy)",
      "VAT calculation",
      "Bank proof of payment"
    ],
    penalties: {
      late: "₦50,000 - ₦5,000,000 per month",
      nonFiling: "₦500,000 - ₦5,000,000"
    }
  },
  
  // CIT RETURNS (Annual)
  cit_annual_return: {
    filingPeriod: "Annually",
    dueDate: "3 months after tax year end",
    method: "Electronic (FIRS Online)",
    documentsRequired: [
      "Financial statements",
      "Auditor's report (if required)",
      "Tax computation schedule",
      "Depreciation schedule",
      "Bank reconciliation",
      "Tax clearance (if over 10 years old)"
    ],
    penalties: {
      late: "5% per month (min ₦10,000)",
      nonFiling: "25% of tax due + interest"
    }
  },
  
  // QUARTERLY ADVANCE PAYMENTS (CIT)
  quarterly_advance_payment: {
    filingPeriod: "Quarterly",
    dueDate: [
      "21st April (Q1)",
      "21st July (Q2)",
      "21st October (Q3)",
      "21st January (Q4 - next year)"
    ],
    method: "Bank transfer",
    penalties: {
      late: "5% p.a. interest on unpaid amount"
    }
  },
  
  // MONTHLY PAYE/TAX
  paye_monthly: {
    filingPeriod: "Monthly",
    dueDate: "10th of following month",
    method: "Electronic (FIRS Online)",
    documentsRequired: [
      "Payroll register",
      "Employee records",
      "Proof of payment"
    ],
    penalties: {
      late: "5% p.a. interest",
      nonFiling: "Prosecution possible"
    }
  },
  
  // WHT RETURNS
  wht_return: {
    filingPeriod: "Monthly/Quarterly",
    dueDate: "21 days after withholding",
    method: "Electronic or bank",
    documentsRequired: [
      "WHT schedule",
      "Invoices",
      "Proof of withholding",
      "Proof of remittance"
    ],
    penalties: {
      late: "5% p.a. interest",
      nonRemittance: "50% of WHT amount"
    }
  }
};
```

---

### 7.2 Return Filing Deadlines

```typescript
interface FilingDeadline {
  returnType: string;
  taxYear: number;
  filingDeadline: Date;
  graceExtension: number; // days
  extensionRequired: boolean;
  penalties: {
    perDay: number;
    maximum: number;
  };
}

const STANDARD_DEADLINES = {
  // BEFORE: Tax year ends 31 Dec
  vat: {
    frequency: "Monthly",
    dueDateFormula: "21st of following month",
    example: "Jan 31-Feb 20, File by Feb 21"
  },
  
  annual_cit: {
    dueDate: "3 months after year end",
    example: "Year end Dec 31 → Due Apr 30",
    extension: "Can request 30-day extension if conditions met"
  },
  
  quarterly_advance: {
    q1_due: "21 April",
    q2_due: "21 July",
    q3_due: "21 October",
    q4_due: "21 January (next year)"
  },
  
  annual_returns: {
    smallCompany: "3 months after year end",
    largeCompany: "3 months after year end",
    partnership: "4 months after year end",
    cooperative: "3 months after year end"
  }
};

function calculateFilingDeadline(params: {
  returnType: string;
  periodEndDate: Date;
  filingMonths?: number;
}): Date {
  const deadline = new Date(params.periodEndDate);
  deadline.setMonth(deadline.getMonth() + (params.filingMonths || 3));
  return deadline;
}
```

---

## SECTION 8: PENALTY & INTEREST ENGINE

**Reference Code:** PEN-2025-NG  
**Effective Date:** January 1, 2025  

### 8.1 Late Payment Penalties

```typescript
interface PenaltyCalculation {
  penaltyType: string;
  originalAmount: number;
  daysLate: number;
  penaltyRate: number;
  totalPenalty: number;
  interestAmount: number;
  totalDue: number;
}

const PENALTY_STRUCTURE = {
  // LATE PAYMENT
  latePaymentPenalty: {
    vat: {
      rate: "5% per annum",
      minimum: "₦5,000 per month late",
      calculation: "Simple interest method"
    },
    cit: {
      rate: "5% per annum",
      minimum: "₦5,000",
      calculation: "Charged from due date"
    },
    paye: {
      rate: "10% minimum or 5% p.a.",
      whichever: "greater",
      calculation: "From due date"
    }
  },
  
  // LATE FILING
  lateFilingPenalty: {
    vat: {
      amount: "₦50,000 - ₦5,000,000",
      perMonth: "₦50,000 - ₦500,000 per month"
    },
    cit: {
      amount: "25% of tax due",
      minimum: "₦10,000"
    },
    paye: {
      amount: "₦50,000 - ₦500,000"
    }
  },
  
  // NON-FILING
  nonFilingPenalty: {
    vat: "₦500,000 - ₦5,000,000",
    cit: "₦500,000 - ₦10,000,000",
    paye: "₦500,000 prosecution"
  },
  
  // UNDERSTATEMENT
  understatementPenalty: {
    vat: "100% of underpaid amount",
    cit: "100% of underpaid amount",
    condition: "If fraudulent"
  },
  
  // INTEREST
  interest: {
    rate: "5% per annum",
    calculationMethod: "Simple interest",
    accrualDate: "From original due date",
    compounding: "None (simple interest)"
  }
};

function calculatePenalty(params: {
  penaltyType: string;
  originalAmount: number;
  daysLate: number;
}): PenaltyCalculation {
  const rate = 0.05; // 5% p.a.
  const yearsLate = params.daysLate / 365;
  const interestAmount = params.originalAmount * rate * yearsLate;
  
  const minimumPenalty = 5000; // ₦5,000
  const totalPenalty = Math.max(interestAmount, minimumPenalty);
  
  return {
    penaltyType: params.penaltyType,
    originalAmount: params.originalAmount,
    daysLate: params.daysLate,
    penaltyRate: rate,
    totalPenalty: Math.round(totalPenalty * 100) / 100,
    interestAmount: Math.round(interestAmount * 100) / 100,
    totalDue: Math.round((params.originalAmount + totalPenalty) * 100) / 100
  };
}
```

---

### 8.2 Mitigating Circumstances

```typescript
const MITIGATION_RULES = {
  extenuatingCircumstances: [
    "Death in immediate family",
    "Serious illness (with medical proof)",
    "Natural disaster/Force majeure",
    "System failure (documented)",
    "Bank error (with proof)",
    "Unexpected business closure"
  ],
  
  waiverEligibility: {
    firstTimeOffenders: "100% waiver possible",
    goodHistory: "50% reduction possible",
    lateFilers: "Extension possible (30 days)",
    requirements: [
      "Written appeal with supporting docs",
      "Evidence of circumstances",
      "Proof of payment ability",
      "File within 30 days of assessment"
    ]
  },
  
  installmentPlans: {
    eligibility: "Tax debt > ₦1,000,000",
    periods: ["3 months", "6 months", "12 months"],
    interest: "Charged on outstanding balance",
    requirements: ["Written request", "Payment plan", "Guarantor (if required)"]
  }
};
```

---

## SECTION 9: BUSINESS SEGMENT RULES

**Reference Code:** SEG-2025-NG  
**Effective Date:** January 1, 2025  

### 9.1 Individual Business Rules

```typescript
interface IndividualBusinessRules {
  businessType: 'sole_proprietor' | 'individual_contractor';
  taxAbility: {
    incomeIncluded: true;
    vat_registration: "Optional if turnover > ₦25M",
    cit: "Taxed as part of personal income",
    paye: "Must register and file monthly"
  };
  filingRequirements: {
    vat: "If registered",
    income_tax: "Annual return (3 months after year end)",
    paye: "Monthly (on employee salaries if applicable)"
  };
  deductions: {
    personal: "NOT allowed",
    business_only: "Allowed with documentation"
  };
}

const INDIVIDUAL_BUSINESS_RULES = {
  sole_proprietor: {
    registration: "BN number from CAC optional",
    vat_threshold: "> ₦25,000,000 annual turnover",
    taxTreatment: "Income tax on net profit",
    rate: "Standard income tax rates (1-24%)",
    fillingPeriod: "Annually",
    exemptions: "May claim personal relief"
  },
  
  contractor: {
    wht_treatment: "Subject to WHT on payments",
    rate: "5% on service payments",
    vat: "Can register if choose to",
    cit: "Income tax on net profit",
    expense_deduction: "Business expenses allowed"
  }
};
```

---

### 9.2 Partnership Rules

```typescript
const PARTNERSHIP_RULES = {
  registration: "Must register with CAC",
  taxTreatment: "Flow-through entity (transparent)",
  
  filingRequirements: {
    partnership_return: "Submitted by partnership",
    partner_returns: "Each partner files personal return",
    vat: "If turnover > ₦25M",
    paye: "On employee salaries"
  },
  
  taxCalculation: {
    partnership_level: "Calculate partnership income",
    allocation: "Allocate to partners per agreement",
    partner_tax: "Partner pays personal income tax",
    method: "Flow-through taxation"
  },
  
  deductions: {
    partnership: "Allowed at partnership level",
    personal: "NOT allowed (no personal items)"
  }
};
```

---

### 9.3 Corporate Entity Rules

```typescript
const CORPORATE_RULES = {
  taxTreatment: "Separate tax entity",
  
  rates: {
    smallCompany: {
      threshold: "Annual profit ≤ ₦25,000,000",
      rate: "20%",
      relief: "50% relief (first 3 years)"
    },
    largeCompany: {
      threshold: "Annual profit > ₦25,000,000",
      rate: "30%",
      addons: "2-3% TET (Tertiary Education Tax)"
    }
  },
  
  filingRequirements: {
    annual_return: "Within 3 months of year end",
    auditor_report: "If > ₦500M turnover or required",
    quarterly_payments: "Advance CIT payments",
    vat: "If > ₦25M turnover",
    paye: "Monthly on all employees"
  },
  
  deductions: {
    businessExpenses: "Fully allowed",
    depreciation: "Approved rates",
    dividends: "NOT deductible (paid from profit after tax)"
  }
};
```

---

### 9.4 Cooperative Societies Rules

```typescript
const COOPERATIVE_RULES = {
  registration: "Must be registered cooperative",
  benefits: {
    cit_rate: "10% (preferential)",
    exemptions: "On certain income",
    relief: "Tax incentives for primary activities"
  },
  
  requirements: {
    members: "Minimum members (varies by state)",
    governance: "Follow cooperative principles",
    operations: "Democratic decision making"
  },
  
  filingRequirements: {
    annual_return: "3 months after year end",
    vat: "If > ₦25M turnover",
    paye: "If employees"
  }
};
```

---

## TAX CALCULATION WORKFLOW

### Complete Flow: Receipt → Invoice → Tax → Filing

```
STEP 1: RECEIPT CAPTURED
├─ Amount: ₦10,000
├─ Category: Professional Services
├─ Customer: ABC Corp (has VAT exemption)
├─ Date: Dec 20, 2025
└─ Check: Is customer exempt? YES

STEP 2: CALCULATE VAT (NOT Applied - Exempt)
├─ Gross: ₦10,000
├─ VAT Rate: 0% (exempt)
├─ VAT Amount: ₦0
├─ Total: ₦10,000
└─ Status: EXEMPT SUPPLY

STEP 3: INVOICE CREATED
├─ Invoice #: INV-2025-1234
├─ Issue Date: Dec 20, 2025
├─ Customer: ABC Corp
├─ Amount: ₦10,000
├─ VAT: ₦0 (Exempt)
├─ Total: ₦10,000
└─ Status: ISSUED

STEP 4: VAT ACCOUNTING
├─ December VAT Return:
│  ├─ Total Exempt Supplies: ₦10,000
│  ├─ Output VAT: ₦0
│  └─ Input VAT: (Various)
│
├─ Net VAT: To be calculated
└─ Due: 21st January

STEP 5: ANNUAL CIT ACCOUNTING
├─ Revenue: ₦10,000 (and others)
├─ Less: Deductions
├─ Chargeable Income: X
├─ CIT @ 20%: Y
├─ Due: By April 30 (3 months after year end)
└─ Status: INCLUDED IN ANNUAL RETURN

STEP 6: WHT (If Applicable)
├─ Check: Is this a payment type subject to WHT?
├─ If YES:
│  ├─ Service payment? Apply 5% WHT
│  ├─ Withhold: ₦500
│  ├─ Net Payment: ₦9,500
│  ├─ Remit: Within 21 days
│  └─ File: WHT return
│
└─ If NO: No WHT applies

STEP 7: RECORD & RECONCILE
├─ File in:
│  ├─ Monthly VAT return (if registered)
│  ├─ Annual CIT return
│  ├─ Annual financial statements
│  └─ Tax records (5-year retention)
│
└─ Status: COMPLETE & AUDITABLE
```

---

## IMPLEMENTATION GUIDANCE

### How to Use This Engine

**1. For System Implementation:**
```
├─ Import Section 1 (VAT) for invoice tax calculation
├─ Import Section 2 (CIT) for annual tax calculation
├─ Import Section 3 (WHT) for withholding logic
├─ Import Sections 4-9 for compliance checking
└─ Use workflow section for process flow
```

**2. For Database Schema:**
```
├─ Create tables per section
├─ Use IDs (VAT-2025-NG, CIT-2025-NG) for versioning
├─ Track effective dates for historical data
├─ Implement audit trail for changes
└─ Create views for calculations
```

**3. For API Endpoints:**
```
POST /api/tax-engine/calculate-vat
POST /api/tax-engine/calculate-cit
POST /api/tax-engine/calculate-wht
POST /api/tax-engine/calculate-penalties
GET /api/tax-engine/section/{sectionCode}
GET /api/tax-engine/rates/{taxType}
```

**4. For Updates:**
```
When tax law changes:
├─ Update relevant section only (isolated change)
├─ Update effective date
├─ Update reference numbers
├─ Maintain version history
├─ Notify dependent systems
└─ Test thoroughly before implementation
```

---

## APPENDIX: QUICK REFERENCE RATES

### VAT Rates (as of Jan 1, 2025)
- Standard Rate: 7.5%
- Zero Rate: 0% (exports, raw food, medicines)
- Exempt: 0% (financial, healthcare, education)

### CIT Rates
- Small Companies (≤ ₦25M): 20%
- Large Companies (> ₦25M): 30%
- Partnerships: 20%
- Cooperatives: 10%

### WHT Rates
- Services: 5%
- Rent: 10%
- Interest: 10%
- Transport: 3%
- Construction: 10%

### Penalty Interest Rates
- Late Payment: 5% per annum
- Late Filing (CIT): 25% of tax due
- Late Filing (VAT): ₦50,000-₦5,000,000

### Filing Deadlines
- VAT: Monthly (21st of following month)
- CIT Annual: 3 months after year end
- Quarterly Advance: 21st of Apr/Jul/Oct/Jan
- PAYE: Monthly (10th of following month)

---

**END OF TAX RULES ENGINE**

This engine is comprehensive, modular, and maintainable. Each section can be updated independently without affecting others.

