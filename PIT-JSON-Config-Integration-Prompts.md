# PIT ENGINE - TAX RULES JSON & DATABASE CONFIG
**For integration into tax_rules table**

---

## 1. TAX RULES ENTRY FOR PIT-2025-NG

Insert this record into your `tax_rules` table to configure the PIT engine:

### SQL INSERT Statement

```sql
INSERT INTO tax_rules (
  section_code,
  section_name,
  effective_date,
  version,
  entity_type,
  rule_type,
  rules_json,
  is_active,
  created_at,
  updated_at
) VALUES (
  'PIT-2025-NG',
  'Personal Income Tax (PAYE) - Nigeria',
  '2025-01-01',
  '1.0',
  'individual',
  'progressive_bands',
  '{
    "code": "PIT-2025-NG",
    "name": "Personal Income Tax (PAYE)",
    "version": "1.0",
    "effectiveDate": "2025-01-01",
    "description": "Personal income tax calculation for individuals (employees, self-employed)",
    "scope": "Individual taxpayers",
    "minTaxableIncome": 800000,
    "maxEffectiveRate": 0.25,
    "rentReliefCap": 500000,
    "bands": [
      {
        "bandNumber": 1,
        "rangeStart": 0,
        "rangeEnd": 800000,
        "rate": 0.00,
        "description": "Tax-free threshold"
      },
      {
        "bandNumber": 2,
        "rangeStart": 800001,
        "rangeEnd": 3000000,
        "rate": 0.15,
        "description": "Lower income band"
      },
      {
        "bandNumber": 3,
        "rangeStart": 3000001,
        "rangeEnd": 12000000,
        "rate": 0.18,
        "description": "Middle income band"
      },
      {
        "bandNumber": 4,
        "rangeStart": 12000001,
        "rangeEnd": 25000000,
        "rate": 0.21,
        "description": "Upper-middle income band"
      },
      {
        "bandNumber": 5,
        "rangeStart": 25000001,
        "rangeEnd": 50000000,
        "rate": 0.23,
        "description": "High income band"
      },
      {
        "bandNumber": 6,
        "rangeStart": 50000001,
        "rangeEnd": 999999999,
        "rate": 0.25,
        "description": "Premium income band"
      }
    ],
    "allowedDeductions": [
      {
        "deductionId": "PEN-001",
        "name": "Pension Contribution",
        "description": "Employee pension contribution (typically 8%)",
        "limit": "unlimited",
        "documentationRequired": ["pension_slip", "contribution_receipt"]
      },
      {
        "deductionId": "RENT-001",
        "name": "Rent Relief",
        "description": "20% of annual rent paid, capped at ₦500,000",
        "formula": "min(annualRent * 0.20, 500000)",
        "limit": 500000,
        "documentationRequired": ["tenancy_agreement", "rent_receipts"]
      },
      {
        "deductionId": "NHIS-001",
        "name": "NHIS / Health Insurance",
        "description": "National Health Insurance Scheme contribution",
        "limit": "unlimited",
        "documentationRequired": ["premium_receipt"]
      },
      {
        "deductionId": "NHF-001",
        "name": "National Housing Fund",
        "description": "NHF contribution (typically ₦25,000 annually)",
        "limit": "unlimited",
        "documentationRequired": ["nhf_receipt"]
      },
      {
        "deductionId": "LIFE-001",
        "name": "Life Insurance Premium",
        "description": "Approved life insurance policy premiums",
        "limit": "unlimited",
        "documentationRequired": ["policy_document", "premium_receipt"]
      },
      {
        "deductionId": "DON-001",
        "name": "Approved Donations",
        "description": "Donations to registered charities/NGOs",
        "limit": "10% of chargeable income",
        "documentationRequired": ["donation_receipt", "org_registration_proof"]
      },
      {
        "deductionId": "LOAN-001",
        "name": "Housing Loan Interest",
        "description": "Interest on qualifying mortgages (owner-occupied)",
        "limit": "unlimited",
        "documentationRequired": ["mortgage_agreement", "payment_proofs"]
      }
    ],
    "filingRequirements": {
      "annualReturn": "FIRS Form IT 2101",
      "deadline": "2025-04-30",
      "minimumIncomeForFiling": 800000,
      "recordRetentionYears": 6,
      "employerPayrollDeduction": "10th of following month"
    },
    "specialCases": {
      "nonResident": {
        "description": "Non-resident individual (taxed on Nigerian-source income only)",
        "allowedDeductions": ["NHIS-001", "PEN-001"]
      },
      "lossCarryForward": {
        "description": "Business loss carry-forward (self-employed)",
        "carryForwardYears": 4
      }
    }
  }',
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
```

---

## 2. PURE JSON (for API configuration or documentation)

```json
{
  "code": "PIT-2025-NG",
  "name": "Personal Income Tax (PAYE)",
  "version": "1.0",
  "effectiveDate": "2025-01-01",
  "description": "Personal income tax calculation for individuals (employees, self-employed)",
  "scope": "Individual taxpayers",
  "minTaxableIncome": 800000,
  "maxEffectiveRate": 0.25,
  "rentReliefCap": 500000,
  "bands": [
    {
      "bandNumber": 1,
      "rangeStart": 0,
      "rangeEnd": 800000,
      "rate": 0.00,
      "description": "Tax-free threshold"
    },
    {
      "bandNumber": 2,
      "rangeStart": 800001,
      "rangeEnd": 3000000,
      "rate": 0.15,
      "description": "Lower income band"
    },
    {
      "bandNumber": 3,
      "rangeStart": 3000001,
      "rangeEnd": 12000000,
      "rate": 0.18,
      "description": "Middle income band"
    },
    {
      "bandNumber": 4,
      "rangeStart": 12000001,
      "rangeEnd": 25000000,
      "rate": 0.21,
      "description": "Upper-middle income band"
    },
    {
      "bandNumber": 5,
      "rangeStart": 25000001,
      "rangeEnd": 50000000,
      "rate": 0.23,
      "description": "High income band"
    },
    {
      "bandNumber": 6,
      "rangeStart": 50000001,
      "rangeEnd": 999999999,
      "rate": 0.25,
      "description": "Premium income band"
    }
  ],
  "allowedDeductions": [
    {
      "deductionId": "PEN-001",
      "name": "Pension Contribution",
      "description": "Employee pension contribution (typically 8% of basic+housing+transport)",
      "limit": "unlimited",
      "documentationRequired": [
        "pension_slip",
        "contribution_receipt"
      ]
    },
    {
      "deductionId": "RENT-001",
      "name": "Rent Relief",
      "description": "20% of annual rent paid, capped at ₦500,000",
      "formula": "min(annualRent * 0.20, 500000)",
      "limit": 500000,
      "documentationRequired": [
        "tenancy_agreement",
        "rent_receipts",
        "landlord_details"
      ]
    },
    {
      "deductionId": "NHIS-001",
      "name": "NHIS / Health Insurance",
      "description": "National Health Insurance Scheme or approved health insurance premiums",
      "limit": "unlimited",
      "documentationRequired": [
        "premium_receipt",
        "policy_document"
      ]
    },
    {
      "deductionId": "NHF-001",
      "name": "National Housing Fund",
      "description": "NHF contribution (typically ₦25,000 annually)",
      "limit": "unlimited",
      "documentationRequired": [
        "nhf_receipt"
      ]
    },
    {
      "deductionId": "LIFE-001",
      "name": "Life Insurance Premium",
      "description": "Approved life insurance policy premiums",
      "limit": "unlimited",
      "documentationRequired": [
        "policy_document",
        "premium_receipt"
      ]
    },
    {
      "deductionId": "DON-001",
      "name": "Approved Donations",
      "description": "Donations to registered charities, NGOs, and educational institutions",
      "limit": "10% of chargeable income",
      "documentationRequired": [
        "donation_receipt",
        "org_registration_proof"
      ]
    },
    {
      "deductionId": "LOAN-001",
      "name": "Housing Loan Interest",
      "description": "Interest paid on qualifying mortgages for owner-occupied property",
      "limit": "unlimited",
      "documentationRequired": [
        "mortgage_agreement",
        "annual_interest_statement",
        "property_ownership_proof"
      ]
    }
  ],
  "filingRequirements": {
    "annualReturn": "FIRS Form IT 2101 (Individual Annual Tax Return)",
    "deadline": "2025-04-30",
    "minimumIncomeForFiling": 800000,
    "recordRetentionYears": 6,
    "employerPayrollDeduction": "10th of following month",
    "filingFrequency": "Annual"
  },
  "specialCases": {
    "nonResident": {
      "description": "Non-resident individual (present <183 days or <3 consecutive years)",
      "scope": "Taxed on Nigerian-source income only",
      "allowedDeductions": [
        "NHIS-001",
        "PEN-001"
      ]
    },
    "lossCarryForward": {
      "description": "Business loss carry-forward for self-employed individuals",
      "carryForwardYears": 4,
      "offset": "Against future years' profit before applying bands"
    },
    "minimumTax": {
      "description": "Minimum tax for self-employed (if applicable)",
      "note": "Confirm current status with FIRS; not universally enforced 2025"
    }
  }
}
```

---

## 3. DATABASE TABLE INSERTIONS

After creating the PIT tables, seed with sample data:

### Sample Individual Profile

```sql
INSERT INTO individual_profiles (tin, nin, full_name, residency_state, is_resident, employment_status)
VALUES ('12345678901', '01234567890', 'John Okafor', 'Lagos', TRUE, 'employed');
```

### Sample Income Record (Year 2025)

```sql
INSERT INTO individual_income (individual_id, year, salary_income, business_income, rental_income, other_income)
SELECT id, 2025, 5000000, 0, 0, 0 FROM individual_profiles WHERE tin = '12345678901';
```

### Sample Deductions (Year 2025)

```sql
INSERT INTO individual_deductions (individual_id, year, pension_contribution, rent_relief, nhis_or_health, approved_donations)
SELECT id, 2025, 400000, 500000, 0, 100000 FROM individual_profiles WHERE tin = '12345678901';
```

---

## 4. ANTIGRAVITY INTEGRATION PROMPTS

### Prompt 1: Create Individual Tax Dashboard

**Prompt for Antigravity:**

```
Create a new Individual Tax Dashboard page in TaxGee Pro using Antigravity.

The dashboard should:

1. HEADER SECTION:
   - Display: "Individual Income Tax Calculator"
   - Show: Current year (2025), individual name, TIN

2. INPUT FORM:
   - Fields:
     * Gross Annual Income (₦ input, required)
     * Pension Contribution (₦ input, optional, default 0)
     * Annual Rent Paid (₦ input, optional)
     * NHIS / Health Insurance (₦ input, optional)
     * NHF Contribution (₦ input, optional)
     * Life Insurance Premium (₦ input, optional)
     * Approved Donations (₦ input, optional)
     * Housing Loan Interest (₦ input, optional)
     * Other Deductions (₦ input, optional)
   
   - Button: "Calculate My Tax" (primary, calls /api/tax-engine/pit/calculate-annual)

3. RESULTS SECTION (shown after calculation):
   - Display in cards:
     * Gross Income: {value}
     * Total Deductions: {value} (breakdown link)
     * Chargeable Income: {value} (highlighted)
     * Annual Tax Due: {value} (large, bold)
     * Monthly PAYE: {value} (secondary highlight)
     * Effective Tax Rate: {percentage}% (info card)
   
4. TAX BANDS BREAKDOWN:
   - Table showing:
     * Band number
     * Income range
     * Rate
     * Amount taxed in this band
     * Tax contribution from this band

5. HELPFUL INFO:
   - Accordion: "How This Calculation Works"
     * Explain rent relief cap
     * Explain deduction requirements
     * Provide FAQ
   
6. ACTIONS:
   - Button: "Save Calculation" (optional, stores in DB)
   - Button: "Print / Download as PDF"
   - Button: "File with FIRS" (guides to form IT 2101)
   - Link: "Download Supporting Documents Checklist"

7. STYLING:
   - Color scheme: Individual product (distinct from Company Tax)
   - Use TaxGee design system
   - Responsive (mobile-first)
   - Dark/Light mode support

Data Model:
- Fetch PIT bands from GET /api/tax-engine/section/PIT-2025-NG
- POST calculation results to /api/tax-engine/pit/calculate-annual
- Store in pit_calculations table
```

---

### Prompt 2: Add PIT to TaxGee AI Assistant

**Prompt for TaxGee AI Integration:**

```
Update TaxGee AI Assistant to support Personal Income Tax queries.

Add Intent Recognition for:
- "How much tax will I pay on ₦X income?"
- "What is my annual tax?"
- "How much PAYE should be deducted?"
- "Can I deduct my rent?"
- "What is rent relief cap?"
- "Am I supposed to pay tax on ₦Y salary?"

For each PIT query:
1. Extract key values: gross income, deductions if mentioned
2. Call POST /api/tax-engine/pit/calculate-annual
3. Format response in user's language (English, Pidgin, Yoruba, Igbo, Hausa)

Example Response (English):
"On your annual income of ₦5,000,000 with ₦1,000,000 in deductions (pension ₦400k + rent ₦500k + donations ₦100k), 
your chargeable income is ₦4,000,000. Your annual tax is ₦510,000, which is about ₦42,500 per month in PAYE. 
Your effective tax rate is 10.2%."

Example Response (Pidgin):
"For your money wey you dey earn per year na ₦5M, minus your pension (₦400k), house rent relief (₦500k) and donations (₦100k), 
you go pay tax on ₦4M. Government go collect about ₦510k from you every year for tax. 
If we break am down by month, na around ₦42.5k every month. That na about 10.2% of your money."

Supported Deduction Types (recognize in chat):
- "I pay ₦X rent" → Apply rent relief (capped ₦500k)
- "My pension is ₦X" → Apply pension deduction
- "I donate ₦X to charity" → Apply (capped 10% of chargeable income)
- "I have health insurance of ₦X" → Apply NHIS
- "I pay ₦X mortgage interest" → Apply housing loan interest

Always:
- Calculate correctly using PIT bands
- Mention rent relief cap (₦500k)
- Provide monthly PAYE breakdown
- Suggest user file Form IT 2101 by April 30
- Offer to explain any part in detail
```

---

### Prompt 3: Create PIT Deduction Checklist Page

**Prompt for Antigravity:**

```
Create a "Deduction Eligibility Checker" page for Individual Tax.

Purpose: Help individuals determine which deductions they can claim and what documents to gather.

1. PAGE TITLE & INTRO:
   - "What Can You Deduct?"
   - Subtitle: "Check which deductions you're eligible for and gather required documents"

2. DEDUCTION CARDS (one per deduction type):
   Each card shows:
   - Deduction name (e.g., "Pension Contribution")
   - Brief description
   - Annual limit (if any, e.g., "₦500,000 rent relief cap")
   - Required documentation (as checklist):
     * ☐ Document 1
     * ☐ Document 2
     * ☐ Document 3
   - Example: "If you paid ₦1.5M rent, your relief is ₦500k (20% × ₦1.5M, capped)"
   - Button: "Learn More" (expands details)

3. DEDUCTIONS TO INCLUDE:
   1. Pension Contribution
      - Limit: Unlimited
      - Required: Pension slip, contribution receipt
   
   2. Rent Relief
      - Limit: ₦500,000 (20% of annual rent)
      - Required: Tenancy agreement, rent receipts (12 months)
   
   3. NHIS / Health Insurance
      - Limit: Unlimited
      - Required: Premium receipt, policy document
   
   4. National Housing Fund (NHF)
      - Limit: Unlimited (typically ₦25k/year)
      - Required: NHF receipt
   
   5. Life Insurance Premium
      - Limit: Unlimited
      - Required: Policy document, premium receipt
   
   6. Approved Donations
      - Limit: 10% of chargeable income
      - Required: Donation receipt, charity registration proof
   
   7. Housing Loan Interest
      - Limit: Unlimited (owner-occupied only)
      - Required: Mortgage agreement, interest statement

4. INTERACTIVE CALCULATOR:
   - "I want to estimate my deductions"
   - Checkboxes for each deduction type
   - Input fields for amounts
   - Auto-shows: "Total Deductions: ₦X"
   - Button: "Use These in Tax Calculation"

5. DOCUMENTATION GUIDE:
   - Accordion: "How to Gather Documents"
   - Checklist PDF download: "6-Year Record Retention Guide"
   - Note: "FIRS may audit; keep all receipts for 6 years"

6. FAQ SECTION:
   - "Can I claim all deductions at once?"
   - "What if I don't have rent receipt?"
   - "What counts as 'approved donation'?"
   - "Can I claim more than one deduction?"
   - "What is rent relief cap?"
   - "Can self-employed claim same deductions?"

7. STYLING:
   - Use neutral/info colors (not alarm red)
   - Cards layout (responsive grid)
   - Icons for each deduction type
   - Dark/light mode support
```

---

### Prompt 4: API Endpoint Setup

**Prompt for Backend Team:**

```
Set up PIT Engine API endpoints using the specifications below.

Endpoints to Create:
1. POST /api/tax-engine/pit/calculate-annual
2. POST /api/tax-engine/pit/calculate-monthly
3. GET /api/tax-engine/pit/history?individualId=...&year=2025
4. GET /api/tax-engine/section/PIT-2025-NG

Database Tables to Create:
- individual_profiles
- individual_income
- individual_deductions
- pit_calculations

Configuration:
- Service: PITEngine (separate from CITEngine, VATEngine, etc.)
- Rules Source: tax_rules table (PIT-2025-NG entry)
- Response Format: JSON with detailed band breakdown
- Error Handling: Return clear error messages for invalid inputs
- Logging: Log all calculations to audit trail

Authentication:
- Require user authentication for /pit/ endpoints
- Individual can only access their own data (individual_id)
- Admin/Compliance can access all individual data

Rate Limiting:
- 100 requests per hour per user
- 1000 requests per hour per IP

Testing:
- Unit tests for each band calculation
- Integration tests: full workflow (income → deductions → tax)
- Test data: use examples from Section 10 spec

Documentation:
- OpenAPI/Swagger spec
- Example request/response payloads
- Error codes and meanings
- Rate limit headers
```

---

### Prompt 5: Create Annual Filing Workflow

**Prompt for Antigravity:**

```
Create "Annual PIT Filing Workflow" page to guide individuals through April 30 deadline.

1. PROGRESS TRACKER:
   Step 1: Gather Documents (checklist)
   Step 2: Calculate Your Tax (link to calculator)
   Step 3: Review Calculation (review page)
   Step 4: Download Form IT 2101 (auto-fill form)
   Step 5: Submit to FIRS (instructions + portal link)
   Step 6: Track Submission Status (confirmation tracker)

2. STEP 1: GATHER DOCUMENTS
   - Checklist of required documents:
     ☐ Salary slip / employment letter
     ☐ Pension contribution statement
     ☐ Rent agreement + receipts
     ☐ NHIS / Health receipts
     ☐ NHF receipts
     ☐ Donation receipts
     ☐ Mortgage / loan documents
   
   - Button: "I Have All Documents" → move to Step 2

3. STEP 2: CALCULATE TAX
   - Link to Individual Tax Calculator
   - Pre-fill income if data available
   - Button: "My Calculation is Complete" → move to Step 3

4. STEP 3: REVIEW CALCULATION
   - Show summary: Income, Deductions, Chargeable Income, Annual Tax
   - Allow editing individual fields
   - Show "Effective Rate" and "Monthly PAYE"
   - Warning: "Ensure all deductions are documented"
   - Button: "Calculation is Correct" → move to Step 4

5. STEP 4: DOWNLOAD FORM IT 2101
   - Auto-fill form with:
     * Individual details (TIN, name, address)
     * Income breakdown
     * Deductions claimed
     * Calculated tax
   - Download as PDF / Word
   - Button: "I Have Downloaded Form" → move to Step 5

6. STEP 5: SUBMIT TO FIRS
   - Instructions:
     "1. Visit FIRS portal (firs.gov.ng)
      2. Log in with your TIN
      3. Submit Form IT 2101 + supporting docs
      4. Keep submission receipt"
   - Button: "I Have Submitted" → move to Step 6

7. STEP 6: TRACK STATUS
   - Submission date tracker
   - Expected FIRS response date
   - Checkbox: "I Received FIRS Assessment Notice"
   - If balance due: link to payment instructions
   - If refund due: tracking for refund status

8. DEADLINE ALERT:
   - Show days remaining until April 30 (red if <7 days)
   - Option to set reminder notification

9. HELP & SUPPORT:
   - FAQ: "What if I miss the deadline?"
   - Link: "Contact Support / Tax Advisor"
   - Link: "FIRS Help Center"

10. STYLING:
    - Clear step-by-step layout
    - Progress bar at top
    - Green checkmark for completed steps
    - Warnings/alerts for upcoming deadlines
```

---

## 5. QUICK IMPLEMENTATION CHECKLIST

### Backend Setup
- [ ] Create `individual_profiles` table
- [ ] Create `individual_income` table
- [ ] Create `individual_deductions` table
- [ ] Create `pit_calculations` table
- [ ] Insert PIT-2025-NG entry into `tax_rules`
- [ ] Implement PITEngine class with calculateAnnual() and calculateMonthly()
- [ ] Create /pit/ API endpoints (4 main endpoints)
- [ ] Add unit tests for PIT band calculations
- [ ] Add integration tests for full workflow
- [ ] Document API in Swagger/OpenAPI

### Frontend Setup
- [ ] Build Individual Tax Dashboard (Antigravity)
- [ ] Build Deduction Checklist page
- [ ] Build Annual Filing Workflow page
- [ ] Add PIT intent recognition to TaxGee AI
- [ ] Add multilingual responses (English, Pidgin, Yoruba, Igbo, Hausa)
- [ ] Create PDF export for Form IT 2101
- [ ] Add reminder notifications for April 30

### Testing & Validation
- [ ] Test threshold cases (income ≤ ₦800k → 0% tax)
- [ ] Test mid-range earner (Section 10, Test Case 2)
- [ ] Test high earner with multiple bands
- [ ] Test self-employed with loss carry-forward
- [ ] Validate against official FIRS calculations
- [ ] Test deduction documentation validation
- [ ] Test rent relief cap (₦500k max)

### Documentation
- [ ] Add Section 10 to Comprehensive Tax Rules Engine
- [ ] Update Quick Reference Card (add PIT rates)
- [ ] Update Master Index (add PIT section mapping)
- [ ] Create user guide for individuals
- [ ] Create admin guide for monitoring PIT returns

---

**End of PIT Engine Integration Guide**

