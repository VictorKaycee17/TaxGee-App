# TAX RULES ENGINE - QUICK REFERENCE CARD
**Fast lookup for tax rates, rules, and calculations**  
**Date:** December 25, 2025  
**Version:** 1.0  

---

## SECTION CODES & REFERENCES

| Section | Code | Purpose | Current Version |
|---------|------|---------|-----------------|
| VAT | VAT-2025-NG | Value Added Tax | 1.0 |
| CIT | CIT-2025-NG | Company Income Tax | 1.0 |
| WHT | WHT-2025-NG | Withholding Tax | 1.0 |
| Deductions | DED-2025-NG | Allowable Deductions | 1.0 |
| Exemptions | EXE-2025-NG | Tax Exemptions | 1.0 |
| Nexus | NEX-2025-NG | Jurisdiction Rules | 1.0 |
| Filing | FIL-2025-NG | Filing Requirements | 1.0 |
| Penalties | PEN-2025-NG | Penalties & Interest | 1.0 |
| Segments | SEG-2025-NG | Business Types | 1.0 |

---

## QUICK TAX RATES

### VAT Rates
```
Standard Rate:        7.5%
Zero Rate (Exports):  0%
Exempt Supplies:      0%
Apply to:             All taxable supplies
Filing:               Monthly (due 21st)
```

### CIT Rates
```
Small Company:        20%  (turnover ≤ ₦25M)
Large Company:        30%  (turnover > ₦25M)
Partnership:          20%  (on partnership income)
Cooperative:          10%  (incentive rate)
Small Co Relief:      50%  (first 3 years)
Quarterly Advance:    Due 21st Apr/Jul/Oct/Jan
```

### WHT Rates
```
Services/Rent:        5-10%  (depends on type)
Interest:             10%
Transport:            3%
Sub-contractor:       10%
Agricultural:         3%
Remittance:           Within 21 days
```

### Deductions
```
Staff Costs:          Unlimited (with docs)
Operating Expenses:   Unlimited (with docs)
Entertainment:        50% of amount
Vehicles:             50% of amount
Donations:            5% of profit max
Depreciation:         Per approved schedule
```

### Penalties
```
Late Payment:         5% per annum (simple interest)
Late Filing CIT:      25% of tax due (minimum ₦10,000)
Late Filing VAT:      ₦50,000 - ₦5,000,000
Non-filing CIT:       ₦500,000 - ₦10,000,000
Non-filing VAT:       ₦500,000 - ₦5,000,000
```

---

## TAXABILITY DECISION TREE

```
Is this a supply of goods or services?

├─ GOODS
│  ├─ Raw food items?              → 0% (zero-rated)
│  ├─ Medicines/Medical?           → 0% (zero-rated)
│  ├─ Educational materials?       → 0% (zero-rated)
│  ├─ Export goods?                → 0% (zero-rated)
│  └─ Other goods?                 → 7.5% (standard)

├─ SERVICES
│  ├─ Financial services?          → 0% (exempt)
│  ├─ Healthcare services?         → 0% (exempt)
│  ├─ Educational services?        → 0% (exempt)
│  ├─ Public utilities?            → 0% (exempt)
│  ├─ Professional services?       → 7.5% (standard)
│  ├─ Business services?           → 7.5% (standard)
│  ├─ IT/Technology services?      → 7.5% (standard)
│  └─ Other services?              → 7.5% (standard)

└─ EXEMPTIONS?
   ├─ Customer exempt?             → 0% (no VAT)
   ├─ Item exempt?                 → 0% (no VAT)
   └─ Sector exempt?               → 0% (no VAT)
```

---

## FILING DEADLINES

### Monthly Returns

| Tax Type | Period | Due Date | Method |
|----------|--------|----------|--------|
| VAT | Monthly (1st-30th) | 21st of following month | FIRS Online |
| PAYE | Monthly | 10th of following month | FIRS Online |
| WHT | Monthly | 21 days from withholding | Bank/FIRS |

### Quarterly Returns

| Tax Type | Period | Due Date | Method |
|----------|--------|----------|--------|
| CIT Advance | Q1 (Jan-Mar) | 21 April | Bank |
| CIT Advance | Q2 (Apr-Jun) | 21 July | Bank |
| CIT Advance | Q3 (Jul-Sep) | 21 October | Bank |
| CIT Advance | Q4 (Oct-Dec) | 21 January | Bank |

### Annual Returns

| Tax Type | Period | Due Date | Method |
|----------|--------|----------|--------|
| CIT Annual | Calendar Year | 3 months after year end | FIRS Online |
| Financial Statements | Calendar Year | 3 months after year end | FIRS Online |

---

## FORMULA QUICK REFERENCE

### VAT Calculation
```
VAT Amount = Gross Amount × 7.5%
Invoice Total = Gross Amount + VAT Amount

Example (Taxable):
Gross: ₦10,000
VAT (7.5%): ₦750
Total: ₦10,750

Example (Exempt):
Gross: ₦10,000
VAT (0%): ₦0
Total: ₦10,000
```

### CIT Calculation
```
Chargeable Income = Gross Income - Allowable Deductions
Taxable Income = Chargeable Income - Carried Forward Losses
CIT = Taxable Income × Rate

Example (Small Company):
Revenue: ₦20,000,000
- COGS: ₦8,000,000
- Expenses: ₦5,000,000
- Depreciation: ₦500,000
= Chargeable Income: ₦6,500,000
- Losses CF: ₦0
= Taxable Income: ₦6,500,000
× Rate: 20%
= CIT Due: ₦1,300,000
```

### WHT Calculation
```
WHT Amount = Payment Amount × WHT Rate
Net Payment = Payment Amount - WHT Amount
Remittance = Within 21 days

Example:
Service payment: ₦100,000
WHT Rate: 5%
WHT Amount: ₦5,000
Net Paid: ₦95,000
Remit to FIRS: ₦5,000 by Day 21
```

### Penalty Calculation
```
Interest = Principal × Rate × (Days / 365)
Penalty = Greater of (Interest, Minimum Penalty)
Total Due = Principal + Penalty + Interest

Example (Late VAT Payment):
Amount Due: ₦500,000
Days Late: 45
Rate: 5% p.a.
Interest: 500,000 × 0.05 × (45/365) = ₦3,041.67
Minimum: ₦5,000
Penalty: ₦5,000 (greater amount)
Total Due: ₦505,000
```

### Depreciation Calculation
```
Annual Depreciation = Cost × Depreciation Rate
Book Value = Cost - Accumulated Depreciation

Example:
Cost: ₦1,000,000
Rate: 20% (machinery)
Annual: ₦200,000
After 3 years:
Accumulated: ₦600,000
Book Value: ₦400,000
```

---

## EXEMPTION ELIGIBILITY

### Who Is Exempt from VAT?

```
ENTITIES (Full Exemption):
├─ Government agencies & ministries
├─ Registered educational institutions
├─ Registered healthcare providers
├─ Registered non-profit organizations
├─ Financial institutions (on certain services)
└─ Utilities providers (on supply services)

TRANSACTIONS (Zero-Rated or Exempt):
├─ Exports of goods & services
├─ Raw agricultural products
├─ Medicines & medical devices
├─ Textbooks & educational materials
├─ Public transportation
└─ Water & sewerage services
```

### How to Claim Exemption

```
1. REGISTER EXEMPTION
   └─ Submit exemption certificate to TaxGee
   
2. PROVIDE DOCUMENTATION
   └─ Educational license, healthcare registration, etc.
   
3. SYSTEM APPLIES EXEMPTION
   └─ Transactions marked as exempt
   └─ VAT not charged
   
4. MAINTAIN RECORDS
   └─ Keep all exemption evidence for 5 years
   └─ Available for tax audit
```

---

## KEY DATES TO REMEMBER (2025)

```
January 1:      VAT rate becomes 7.5% (from 5%)
                New fiscal year begins

April 21:       Q1 CIT Advance Payment Due
April 30:       Deadline for 2024 Annual CIT Return

July 21:        Q2 CIT Advance Payment Due
July 31:        Monthly VAT returns due (Jan-Jun closing)

October 21:     Q3 CIT Advance Payment Due
October 31:     Monthly VAT returns due (Jul-Sep closing)

December 31:    Tax year ends

January 15:     Deadline for WHT remittance (Dec withholdings)
January 21:     Q4 CIT Advance Payment Due
January 31:     Monthly VAT returns due (Oct-Dec closing)
                Tax clearance deadline for new registrations
```

---

## COMMONLY MISSED EXEMPTIONS

```
These often get MISSED but should be claimed:

❌ Raw materials from farmer BEFORE processing
   → Should be 0% (zero-rated)

❌ Medical supplies to hospital
   → Should be 0% (zero-rated) if medicines

❌ School tuition
   → Should be 0% (exempt if accredited)

❌ Bank interest received
   → Should be 0% (exempt)

❌ Export transaction
   → Should be 0% (zero-rated)

❌ Services to government agency
   → May be 0% (exempt) depending on service

How to avoid:
├─ Check taxability at invoice creation
├─ Verify customer exemption status
├─ Apply zero-rated correctly
└─ Document all exemptions
```

---

## API ENDPOINTS QUICK LOOKUP

```
Calculate VAT:
POST /api/tax-engine/vat/calculate
Body: {grossAmount, supplyType, category, customerExemption}

Check Taxability:
POST /api/tax-engine/taxability/check
Body: {itemId, itemCategory, location, customerType}

Calculate CIT:
POST /api/tax-engine/cit/calculate
Body: {taxableIncome, companyType, operatingYears}

Calculate WHT:
POST /api/tax-engine/wht/calculate
Body: {paymentType, grossAmount, recipientExemption}

Get Tax Section:
GET /api/tax-engine/section/{sectionCode}
Returns: Complete section rules and rates

Update Tax Rules:
PUT /api/tax-engine/section/{sectionCode}
Body: {rules, effectiveDate, reason}
Note: Admin-only endpoint
```

---

## QUICK TROUBLESHOOTING

| Issue | Quick Check | Fix |
|-------|------------|-----|
| VAT calculated incorrectly | Verify rate in database (should be 7.5%) | Update tax_rules table, mark old as superseded |
| Exemption not applying | Check exemption is active & not expired | Activate exemption in database |
| Wrong due date | Check filing_schedule table | Verify jurisdiction & tax type |
| Penalty calculated incorrectly | Manual calculation: amount × 0.05 × (days/365) | Verify rate (5% p.a.) and day count |
| WHT not recorded | Check WHT was flagged at payment | Mark payment for WHT, recalculate |

---

## 5-MINUTE SETUP CHECKLIST

```
☐ Database: Create all tax_rules tables
☐ Rates: Insert current rates (VAT 7.5%, CIT 20/30%, etc.)
☐ API: Deploy endpoints (/calculate-vat, /calculate-cit, etc.)
☐ Frontend: Connect to API endpoints
☐ Testing: Run sample calculations (verify accuracy)
☐ Exemptions: Load standard exemption list
☐ Validation: Test edge cases (zero-rated, exempt, etc.)
☐ Documentation: Ensure team reads guide
☐ Monitoring: Set up error logging
☐ Backup: Daily backup of tax_rules tables
```

---

## WHEN LAW CHANGES

```
1. ANNOUNCED:
   └─ FIRS issues circular (e.g., VAT rate change)

2. IDENTIFY SECTION:
   └─ Which section affected? (VAT-2025-NG, CIT-2025-NG, etc.)

3. PREPARE:
   └─ Get official circular number & effective date

4. UPDATE:
   └─ Insert new rule in database with new version
   └─ Mark old as 'superseded'

5. TEST:
   └─ Run calculation tests
   └─ Spot-check with sample data

6. DEPLOY:
   └─ Deploy to staging first
   └─ Verify with sample transactions
   └─ Deploy to production

7. DOCUMENT:
   └─ Add entry to rate_history table
   └─ Notify users of change
   └─ Keep for audit (7 years)
```

---

## BUSINESS SEGMENT TAX RATES

```
SOLE PROPRIETOR:
├─ Income tax: Progressive rates (1-24%)
├─ VAT: Optional if > ₦25M turnover
└─ CIT: N/A (income tax instead)

SMALL COMPANY (≤ ₦25M):
├─ CIT: 20%
├─ VAT: If > ₦25M (optional) or elected
├─ Relief: 50% (first 3 years)
└─ Quarterly Advance: Required

LARGE COMPANY (> ₦25M):
├─ CIT: 30%
├─ VAT: Mandatory
├─ TET: 2-3% (Tertiary Education Tax)
└─ Quarterly Advance: Required

PARTNERSHIP:
├─ CIT: 20% (on partnership)
├─ + Personal income tax (on partner share)
├─ VAT: If > ₦25M
└─ Flow-through entity

COOPERATIVE:
├─ CIT: 10% (incentive rate)
├─ VAT: If > ₦25M
├─ Exemptions: On certain income
└─ Benefits: Lower rate & incentives
```

---

## CONTACT & ESCALATION

```
FOR TAX RULES QUESTIONS:
└─ Contact: Tax Compliance Team
└─ Email: tax-support@taxgee.ng
└─ Escalate to: CFO if FIRS circular conflict

FOR SYSTEM IMPLEMENTATION:
└─ Contact: Engineering Team
└─ Email: engineering@taxgee.ng
└─ Escalate to: CTO for architecture issues

FOR AUDIT/COMPLIANCE:
└─ Contact: Compliance Officer
└─ Email: compliance@taxgee.ng
└─ Escalate to: Legal if FIRS dispute

FOR RATE CHANGES:
└─ Contact: Tax Rules Team
└─ Email: tax-rules@taxgee.ng
└─ Process: Follow "When Law Changes" above
```

---

## IMPORTANT NOTES

```
⚠️ ALWAYS:
├─ Verify current rates before calculation
├─ Check exemptions are active
├─ Document all calculations
├─ Keep audit trail (5 years minimum)
├─ Test after any law change
└─ Maintain backup of rules

⚠️ NEVER:
├─ Hardcode rates in application
├─ Skip exemption checking
├─ Ignore filing deadlines
├─ Charge VAT on VAT
├─ Assume customer exemption
└─ Delete rate history records

✓ BEST PRACTICE:
├─ Use database for all rules
├─ Version control all changes
├─ Test thoroughly before deploy
├─ Audit calculations monthly
├─ Keep FIRS circulars on file
└─ Train team on new changes
```

---

## KEY REFERENCES

```
Section 1 (VAT Rules):
└─ VAT Act Cap V1, LFN 2004 (as amended 2025)
└─ FIRS Circular 2025/VAT/001

Section 2 (CIT Rules):
└─ Companies Income Tax Act (CITA)
└─ FIRS Guidance on CIT 2025

Section 3 (WHT Rules):
└─ Personal Income Tax Act (PITA)
└─ FIRS WHT Guidelines 2025

Section 4 (Deductions):
└─ CITA Schedule 1 (Deductions)
└─ FIRS Deduction Guidelines

Section 8 (Penalties):
└─ TPA (Tax Administration Act) 2013
└─ FIRS Penalty Schedule 2025
```

---

**END OF QUICK REFERENCE CARD**

Print this page and post in office. Use for quick lookups. For detailed explanations, refer to main engine documentation.

