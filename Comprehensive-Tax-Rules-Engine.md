# COMPREHENSIVE TAX RULES ENGINE
**TaxGee Pro - Complete Tax Calculation & Compliance System**  
**Date:** December 25, 2025  
**Jurisdiction:** Nigeria (Federal)  
**Version:** 1.0  

---

## TABLE OF CONTENTS

1. [SECTION 1: VALUE ADDED TAX (VAT) ENGINE](#section-1-value-added-tax-vat-engine)
2. [SECTION 2: COMPANY INCOME TAX (CIT) ENGINE](#section-2-company-income-tax-cit-engine)
3. [SECTION 3: WITHHOLDING TAX (WHT) ENGINE](#section-3-withholding-tax-wht-engine)
4. [SECTION 4: ALLOWABLE DEDUCTIONS ENGINE](#section-4-allowable-deductions-engine)
5. [SECTION 5: EXEMPTIONS & RELIEF ENGINE](#section-5-exemptions--relief-engine)
6. [SECTION 6: NEXUS & JURISDICTION ENGINE](#section-6-nexus--jurisdiction-engine)
7. [SECTION 7: FILING & COMPLIANCE ENGINE](#section-7-filing--compliance-engine)
8. [SECTION 8: PENALTIES & INTEREST ENGINE](#section-8-penalties--interest-engine)
9. [SECTION 9: BUSINESS SEGMENT ENGINE](#section-9-business-segment-engine)

---

# SECTION 1: VALUE ADDED TAX (VAT) ENGINE

**Code:** `VAT-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 1.1 Overview

Value Added Tax (VAT) is a consumption tax applied to taxable supplies in Nigeria. It is collected at each stage of the supply chain, with input tax recoverable to create a net tax on consumption.

## 1.2 Key Rates

```
Standard Rate:              7.5%
Zero Rate:                  0.0%
Exempt Rate:                0.0%
Applicable Territory:       Mainland Nigeria
Effective from:             Jan 1, 2025 (increased from 5%)
```

## 1.3 Taxability Matrix

### Goods (Standard/Zero-Rated)

| Category | Item Type | Rate | Conditions |
|----------|-----------|------|-----------|
| **Food & Agriculture** | Raw, unprocessed agricultural products | 0% | Must be in raw state; no processing |
| **Food & Agriculture** | Processed food items (local production) | 7.5% | Local manufactured only |
| **Food & Agriculture** | Imported processed food | 7.5% | Subject to standard VAT |
| **Healthcare** | Medicines (on approved list) | 0% | Prescription-only, approved by NAFDAC |
| **Healthcare** | Medical devices (approved) | 0% | Healthcare delivery purposes |
| **Healthcare** | Vitamins & supplements | 7.5% | Not on healthcare list |
| **Education** | Textbooks & educational materials | 0% | School curriculum related |
| **Education** | School uniforms & materials | 7.5% | Not textbooks |
| **Utilities** | Water & sewerage | 0% | Public utility supply |
| **Utilities** | Electricity | 0% | Distribution to end users |
| **Transport** | Public transport | 0% | Passenger transport only |
| **Transport** | Freight services | 7.5% | Goods movement |
| **Exports** | Exported goods | 0% | Must meet export criteria |
| **Other** | All other goods | 7.5% | Default is standard rate |

### Services (Exempt)

| Category | Service Type | Rate | Conditions |
|----------|--------------|------|-----------|
| **Financial** | Banking services | 0% | Except safe keeping, trading |
| **Financial** | Interest on loans | 0% | Exempt supply |
| **Financial** | Insurance services | 0% | Insurance-related activities |
| **Healthcare** | Medical services | 0% | By registered healthcare provider |
| **Healthcare** | Hospital services | 0% | Medical treatment only |
| **Education** | School tuition | 0% | From accredited educational institution |
| **Education** | Training services | 0% | If accredited; otherwise 7.5% |
| **Government** | Government services | 0% | Services by government bodies |
| **Government** | Public administration | 0% | Essential government functions |
| **Religious** | Religious services | 0% | By registered religious body |
| **Professional** | Legal services | 7.5% | Standard rate applies |
| **Professional** | Accounting/audit | 7.5% | Standard rate applies |
| **Professional** | Engineering services | 7.5% | Standard rate applies |
| **Professional** | Consulting | 7.5% | Standard rate applies |
| **Business** | IT/Tech services | 7.5% | Digital delivery subject to VAT |
| **Business** | Advertising | 7.5% | Standard rate applies |
| **Business** | Management services | 7.5% | Standard rate applies |
| **Other** | All other services | 7.5% | Default is standard rate |

## 1.4 VAT Calculation Algorithm

```
ALGORITHM: CalculateVAT(transaction)
INPUT: transaction {amount, type, category, exemption}
OUTPUT: vat {grossAmount, vatRate, vatAmount, total, taxable, zeroRated, exempt}

BEGIN
  1. SET taxable = FALSE, zeroRated = FALSE, exempt = FALSE
  2. SET vatRate = 7.5% (default standard rate)
  
  3. CHECK supply type:
     IF (type = "goods"):
       → LOOKUP in Goods Taxability Matrix
     ELSE IF (type = "services"):
       → LOOKUP in Services Taxability Matrix
     
  4. DETERMINE rate from matrix:
     IF (rate = 0% AND zeroRated = TRUE):
       → zeroRated = TRUE, vatRate = 0%
     ELSE IF (rate = 0% AND exempt = TRUE):
       → exempt = TRUE, vatRate = 0%
     ELSE:
       → taxable = TRUE, vatRate = 7.5%
  
  5. CHECK exemption status:
     IF (customer has active exemption):
       → vatRate = 0%, exempt = TRUE
     ELSE IF (item has active exemption):
       → vatRate = 0%, exempt = TRUE
  
  6. CALCULATE VAT:
     vatAmount = amount × vatRate
     total = amount + vatAmount
  
  7. RETURN {amount, vatRate, vatAmount, total, taxable, zeroRated, exempt}
END
```

## 1.5 Input VAT Recovery

**Rules:**
- Input tax (VAT paid on purchases) is recoverable if:
  - Purchase is for business purposes
  - Supplier is registered VAT vendor
  - Invoice shows VAT amount separately
  - Used to make taxable supplies

**Not Recoverable:**
- VAT on personal expenses
- VAT on exempt supplies
- VAT on capital goods (15% disallowed in year 1)
- VAT from unregistered vendors

**Calculation:**
```
Output VAT = VAT collected from customers
Input VAT = VAT paid on business purchases
VAT Due = Output VAT - Input VAT

If Input VAT > Output VAT:
  → Claim refund or carry forward to next period
```

## 1.6 Special Transactions

### Imports
```
Rule: VAT applies on imported goods
Calculation: VAT on CIF value + customs duty
Due: At customs clearance
Payment: Via customs broker
```

### Exports
```
Rule: Exports zero-rated
Calculation: VAT = 0%
Recovery: Input VAT on exports can be claimed
Input Tax: Full claim allowed
```

### Intra-Community Trade
```
Rule: Not applicable (Nigeria domestic only)
```

### Second-Hand Goods
```
Rule: VAT on margin only (if applicable)
Calculation: VAT = Margin × Rate
Documentation: Must show original cost
```

## 1.7 Implementation Code

```python
class VATEngine:
    
    RATES = {
        'standard': 0.075,
        'zero': 0.0,
        'exempt': 0.0
    }
    
    TAXABILITY_GOODS = {
        'raw_food': {'rate': 'zero', 'zeroRated': True},
        'processed_food_local': {'rate': 'standard', 'zeroRated': False},
        'medicines': {'rate': 'zero', 'zeroRated': True},
        'textbooks': {'rate': 'zero', 'zeroRated': True},
        # ... more mappings
    }
    
    TAXABILITY_SERVICES = {
        'banking': {'rate': 'exempt', 'exempt': True},
        'healthcare': {'rate': 'exempt', 'exempt': True},
        'education': {'rate': 'exempt', 'exempt': True},
        'professional': {'rate': 'standard', 'taxable': True},
        # ... more mappings
    }
    
    def calculate_vat(self, transaction):
        """
        Calculate VAT on transaction
        """
        amount = transaction['amount']
        supply_type = transaction['type']
        category = transaction['category']
        exemption = transaction.get('exemption')
        
        # Default
        rate = 0.075
        taxable = False
        zero_rated = False
        exempt = False
        
        # Lookup in matrix
        if supply_type == 'goods':
            rules = self.TAXABILITY_GOODS.get(category, {'rate': 'standard'})
        else:
            rules = self.TAXABILITY_SERVICES.get(category, {'rate': 'standard'})
        
        # Get rate
        rate_key = rules.get('rate', 'standard')
        rate = self.RATES[rate_key]
        
        # Set flags
        if rate == 0.0 and rules.get('zero_rated'):
            zero_rated = True
        elif rate == 0.0 and rules.get('exempt'):
            exempt = True
        else:
            taxable = True
        
        # Check exemption
        if exemption and self.is_exemption_active(exemption):
            rate = 0.0
            exempt = True
            taxable = False
        
        # Calculate
        vat_amount = amount * rate
        total = amount + vat_amount
        
        return {
            'gross_amount': amount,
            'vat_rate': rate,
            'vat_amount': vat_amount,
            'total': total,
            'taxable': taxable,
            'zero_rated': zero_rated,
            'exempt': exempt
        }
```

---

# SECTION 2: COMPANY INCOME TAX (CIT) ENGINE

**Code:** `CIT-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 2.1 Overview

Company Income Tax (CIT) is levied on the chargeable income of companies operating in Nigeria. Rates and relief depend on company size, operating history, and business structure.

## 2.2 Key Rates

```
Small Company Rate:         20%  (Chargeable income ≤ ₦25M)
Large Company Rate:         30%  (Chargeable income > ₦25M)
Partnership Rate:           20%  (On partnership income)
Cooperative Rate:           10%  (Incentive rate)
Tertiary Education Tax:     2-3% (On employees)
```

## 2.3 Company Classification

| Classification | Criteria | CIT Rate | Relief Eligible | Notes |
|---|---|---|---|---|
| **Small Company** | Annual turnover ≤ ₦25M | 20% | YES (50% for 3 yrs) | New businesses qualify |
| **Large Company** | Annual turnover > ₦25M | 30% | NO | Standard rate applies |
| **Startup Company** | < 3 years operation | 20% | YES (50% relief) | Qualifies for small co. rate |
| **Cooperative** | Registered cooperative | 10% | YES | Agricultural focus preferred |
| **Partnership** | Unincorporated partnership | 20% | NO | Flow-through to partners |
| **Non-Profit** | Charitable/religious | 0% | N/A | If registered & eligible |

## 2.4 Chargeable Income Calculation

```
ALGORITHM: CalculateChargeableIncome(businessData)
INPUT: businessData {revenue, expenses, depreciation, losses}
OUTPUT: chargeableIncome

BEGIN
  1. GROSS PROFIT = Total Revenue - Cost of Goods Sold
  
  2. OPERATING INCOME = Gross Profit - Operating Expenses
     (Includes: Staff, rent, utilities, professional fees, etc.)
  
  3. ADD BACK restricted deductions:
     - Excessive entertainment (> allowed%)
     - Excessive vehicle costs
     - Donations (> 5% limit)
     - Any disallowed items per law
  
  4. LESS allowable deductions:
     - Depreciation (per approved schedule)
     - Interest on business borrowing
     - Bad debts provision
     - Donations (up to limit)
  
  5. LESS carryforward losses:
     - Losses from prior years
     - Can carry forward 4 years max
  
  6. LESS investment allowances:
     - Capital expenditure reliefs
     - Pioneer industry relief
     - Export promotion relief
  
  7. CHARGEABLE INCOME = Result of steps 1-6
     (Must be ≥ ₦0, cannot be negative)
  
  8. RETURN chargeableIncome
END
```

## 2.5 CIT Calculation Algorithm

```
ALGORITHM: CalculateCIT(chargeableIncome, companyData)
INPUT: chargeableIncome, companyData {size, operatingYears, losses}
OUTPUT: cit {citAmount, rate, relief, quarterly}

BEGIN
  1. DETERMINE company size:
     IF (chargeableIncome ≤ ₦25M):
       → size = "small", baseCITRate = 20%
     ELSE:
       → size = "large", baseCITRate = 30%
  
  2. DETERMINE relief (if applicable):
     IF (size = "small" AND operatingYears ≤ 3):
       → relief = chargeableIncome × 50%
     ELSE:
       → relief = ₦0
  
  3. CALCULATE taxable income:
     taxableIncome = chargeableIncome - relief
  
  4. CALCULATE CIT:
     citAmount = taxableIncome × citRate
  
  5. CALCULATE quarterly advance:
     quarterlyAdvance = citAmount ÷ 4
     dueDate = 21st of Apr, Jul, Oct, Jan
  
  6. RETURN {
       citAmount, 
       rate: citRate, 
       relief,
       taxableIncome,
       quarterly: {Q1, Q2, Q3, Q4},
       filingDue: "3 months after year end"
     }
END
```

## 2.6 Allowable Deductions (Detailed)

### Unlimited Deductions (With Documentation)
```
✓ Staff costs (salaries, benefits, pension)
✓ Rent & lease payments
✓ Utilities (electricity, water, gas)
✓ Professional fees (legal, accounting, audit)
✓ Business insurance premiums
✓ Travel & transportation (business only)
✓ Communication (phone, internet)
✓ Office supplies & materials
✓ Interest on business loans (within limits)
✓ Bad debts (proven & written off)
✓ Depreciation (per approved schedule)
```

### Restricted Deductions
```
⊘ Entertainment: Max 50% of actual cost
⊘ Vehicles: Max 50% of cost (acquisition & running)
⊘ Donations: Max 5% of chargeable profit
⊘ Medical expense: Only if provided to all staff
⊘ Repair/maintenance: Must not exceed capital cost
```

### Not Allowed
```
✗ Personal/family expenses
✗ Penalties & fines (tax or legal)
✗ VAT paid (recoverable separately)
✗ Uncapped entertainment & vehicles
✗ Loan principal repayment
✗ Dividend payments
✗ Income tax & CIT payments
✗ Capital expenditure (claim depreciation instead)
✗ Losses from prior years (use carried forward losses)
```

## 2.7 Depreciation Schedule

| Asset Class | Rate | Method | Notes |
|---|---|---|---|
| Buildings | 5% | Straight line | Industrial buildings: special rate |
| Plant & Machinery | 15% | Straight line | Initial allowance available |
| Vehicles | 20% | Straight line | 50% use restriction if mixed |
| Furniture & Fixtures | 10% | Straight line | Office equipment |
| Computer Equipment | 40% | Straight line | Technology depreciation |
| Goodwill | 5% | Straight line | Business acquisition |

**Calculation:**
```
Annual Depreciation = Cost × Rate
Book Value Year N = Cost - (Annual Depreciation × N years)
```

## 2.8 Quarterly Advance Payment Schedule

```
Due Date         Amount              Min Payment    Method
─────────────────────────────────────────────────────────
April 21         25% of estimated    ₦100,000      Bank/FIRS
July 21          25% of estimated    ₦100,000      Bank/FIRS
October 21       25% of estimated    ₦100,000      Bank/FIRS
January 21       25% of estimated    ₦100,000      Bank/FIRS

Annual Filing    Final CIT           Within 3 mths   FIRS Online
                 adjustment          after year end
```

## 2.9 Implementation Code

```python
class CITEngine:
    
    RATES = {
        'small': 0.20,
        'large': 0.30,
        'cooperative': 0.10,
        'partnership': 0.20,
        'non_profit': 0.0
    }
    
    SIZE_THRESHOLD = 25000000  # ₦25M
    RELIEF_PERCENT = 0.50      # 50% for 3 years
    RELIEF_YEARS = 3
    
    def calculate_chargeable_income(self, business_data):
        """
        Calculate chargeable income
        """
        # Start with gross profit
        gross_profit = (business_data['total_revenue'] - 
                       business_data['cogs'])
        
        # Deduct operating expenses
        operating_expenses = sum([
            business_data.get('staff_costs', 0),
            business_data.get('rent', 0),
            business_data.get('utilities', 0),
            business_data.get('professional_fees', 0),
            business_data.get('insurance', 0),
            business_data.get('travel', 0),
            # ... more expenses
        ])
        
        operating_income = gross_profit - operating_expenses
        
        # Add back restricted deductions
        add_back = 0
        if business_data.get('entertainment', 0) > 0:
            # Only 50% allowed
            add_back += business_data['entertainment'] * 0.5
        
        operating_income += add_back
        
        # Deduct allowed deductions
        deductions = (business_data.get('depreciation', 0) +
                     business_data.get('interest', 0) +
                     business_data.get('bad_debts', 0))
        
        operating_income -= deductions
        
        # Deduct carried forward losses
        losses = business_data.get('carried_losses', 0)
        chargeable_income = max(operating_income - losses, 0)
        
        return chargeable_income
    
    def calculate_cit(self, chargeable_income, company_data):
        """
        Calculate CIT
        """
        # Determine size
        if chargeable_income <= self.SIZE_THRESHOLD:
            size = 'small'
            cit_rate = self.RATES['small']
        else:
            size = 'large'
            cit_rate = self.RATES['large']
        
        # Calculate relief
        relief = 0
        if (size == 'small' and 
            company_data.get('operating_years', 0) <= self.RELIEF_YEARS):
            relief = chargeable_income * self.RELIEF_PERCENT
        
        # Calculate taxable income
        taxable_income = chargeable_income - relief
        
        # Calculate CIT
        cit_amount = taxable_income * cit_rate
        
        # Quarterly advance
        quarterly = cit_amount / 4
        
        return {
            'chargeable_income': chargeable_income,
            'cit_rate': cit_rate,
            'relief': relief,
            'taxable_income': taxable_income,
            'cit_amount': cit_amount,
            'quarterly_advance': quarterly,
            'company_size': size
        }
```

---

# SECTION 3: WITHHOLDING TAX (WHT) ENGINE

**Code:** `WHT-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 3.1 Overview

Withholding Tax (WHT) is tax withheld at the source of payment for specified types of payments (mainly services, rent, interest). The payer is responsible for withholding and remitting to FIRS within 21 days.

## 3.2 WHT Rates by Payment Type

| Payment Type | Rate | Resident | Non-Resident | Notes |
|---|---|---|---|---|
| **Professional Services** | 5-10% | 5% | 10% | Depends on service type |
| **Contractor Services** | 10% | 10% | 10% | Construction, etc. |
| **Rent (Commercial)** | 10% | 10% | 10% | On rent payments |
| **Rent (Residential)** | 5% | 5% | 5% | If applicable |
| **Interest** | 10% | 10% | 10% | Bank interest |
| **Dividend** | 10% | 10% | 10% | If applicable |
| **Transport Services** | 3% | 3% | 3% | Freight, logistics |
| **Sub-contractor** | 10% | 10% | 10% | Construction industry |
| **Consultancy** | 5% | 5% | 10% | Professional consulting |
| **Agricultural** | 3% | 3% | 3% | Agricultural produce purchase |

## 3.3 WHT Exemptions

**Exempt from WHT:**
```
• Government agencies (on official payments)
• Registered exporters (on export transactions)
• Registered educational institutions
• Registered healthcare facilities
• Registered non-profit organizations
• Transactions where recipient has exemption certificate
```

**Conditions:**
```
• Exemption must be current & valid
• Certificate must be provided before payment
• Exemption applies to specific transactions only
• Documentation must be maintained
```

## 3.4 WHT Calculation Algorithm

```
ALGORITHM: CalculateWHT(payment)
INPUT: payment {amount, type, recipient, recipientType}
OUTPUT: wht {whtAmount, netAmount, remittanceDue}

BEGIN
  1. GET WHT rate for payment type:
     → Look up in WHT Rates table
  
  2. CHECK exemption status:
     IF (recipient has valid exemption):
       → whtRate = 0%
       → exempt = TRUE
     ELSE:
       → exempt = FALSE
  
  3. APPLY exemption if eligible:
     IF (recipient is government/charity):
       → whtRate = 0%
  
  4. CALCULATE WHT:
     whtAmount = paymentAmount × whtRate
     netAmount = paymentAmount - whtAmount
  
  5. CALCULATE remittance:
     remittanceDueDate = paymentDate + 21 days
  
  6. RECORD for reporting:
     Store in WHT register
     For monthly/annual reporting
  
  7. RETURN {
       paymentAmount,
       whtRate,
       whtAmount,
       netAmount,
       exemptionApplied,
       remittanceDueDate,
       certificateRequired
     }
END
```

## 3.5 Monthly Remittance

**Due Date:** Within 21 days of withholding  
**Method:** FIRS Online Platform or Bank  
**Required Documents:**
```
• WHT Return form (Form A - Monthly)
• Schedule of withheld amounts
• Copy of payment evidence
• WHT Certificate for recipient (if issued)
```

## 3.6 Annual WHT Return

**Due Date:** 3 months after year end  
**Form:** Annual WHT Return  
**Contains:**
```
• Summary of all WHT withheld during year
• By payment type
• By recipient
• Paid vs pending
```

## 3.7 WHT Certificate

**Issue to Recipient:**
```
• When: At withholding or on request
• Form: WHT Certificate (Form C)
• Contains:
  - Payer details
  - Recipient details
  - Payment amount
  - WHT rate
  - WHT amount
  - Date withheld
  - Payer's BRN
  - Recipient's TIN
```

**Use by Recipient:**
```
• Claim as tax credit on income tax return
• Offset against tax liability
• Support for relief/exemption claims
```

## 3.8 Implementation Code

```python
class WHTEngine:
    
    RATES = {
        'professional_services': 0.05,
        'contractor_services': 0.10,
        'rent_commercial': 0.10,
        'rent_residential': 0.05,
        'interest': 0.10,
        'dividend': 0.10,
        'transport': 0.03,
        'sub_contractor': 0.10,
        'consultancy': 0.05,
        'agricultural': 0.03
    }
    
    REMITTANCE_DAYS = 21
    
    def calculate_wht(self, payment):
        """
        Calculate WHT
        """
        amount = payment['amount']
        payment_type = payment['type']
        recipient_exempt = payment.get('recipient_exempt', False)
        recipient_type = payment.get('recipient_type', 'normal')
        
        # Get WHT rate
        wht_rate = self.RATES.get(payment_type, 0)
        
        # Check exemption
        if recipient_exempt or self.is_exempt_recipient(recipient_type):
            wht_rate = 0
            exempt = True
        else:
            exempt = False
        
        # Calculate WHT
        wht_amount = amount * wht_rate
        net_amount = amount - wht_amount
        
        # Calculate remittance due date
        from datetime import datetime, timedelta
        remittance_due = datetime.now() + timedelta(days=self.REMITTANCE_DAYS)
        
        return {
            'payment_amount': amount,
            'wht_rate': wht_rate,
            'wht_amount': wht_amount,
            'net_amount': net_amount,
            'exemption_applied': exempt,
            'remittance_due_date': remittance_due,
            'certificate_required': not exempt
        }
    
    def is_exempt_recipient(self, recipient_type):
        """
        Check if recipient type is exempt
        """
        exempt_types = [
            'government_agency',
            'educational_institution',
            'healthcare_facility',
            'non_profit_org',
            'export_company'
        ]
        return recipient_type in exempt_types
```

---

# SECTION 4: ALLOWABLE DEDUCTIONS ENGINE

**Code:** `DED-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 4.1 Overview

Deductions are business expenses that reduce chargeable income. They must be incurred wholly and exclusively in the production of income and supported by documentation.

## 4.2 Fully Allowable Deductions

```
CATEGORY: PERSONNEL & BENEFITS
├─ Salaries & wages        [Unlimited with payroll]
├─ Pension contributions   [Up to 8% of salaries]
├─ National Insurance      [Contribution portion]
├─ Staff insurance         [Medical, life, etc.]
├─ Staff training          [Professional development]
└─ Staff housing/meals     [If provided to all]

CATEGORY: OCCUPANCY COSTS
├─ Rent/lease             [Actual paid]
├─ Rates & taxes          [Municipal, property]
├─ Maintenance            [Repairs & upkeep]
├─ Utilities              [Electricity, water, gas]
├─ Cleaning & waste      [Facility management]
└─ Security services     [Building security]

CATEGORY: PROFESSIONAL SERVICES
├─ Legal fees            [Court, contracts, etc.]
├─ Accounting/audit      [Annual audit & accounting]
├─ Tax consulting        [Tax advice & planning]
├─ Engineering services  [Technical expertise]
├─ Architectural services [Design & planning]
├─ Consulting fees       [Industry specific]
└─ Professional insurance [Professional liability]

CATEGORY: COMMUNICATION & OFFICE
├─ Telephone/mobile      [Business lines]
├─ Internet/ISP         [Business connectivity]
├─ Postal & courier     [Mail delivery services]
├─ Office supplies      [Stationery, printer ink]
├─ Office equipment     [Computers, furniture - depreciate]
├─ Subscriptions        [Industry publications]
└─ Software licenses    [Business software]

CATEGORY: FINANCING COSTS
├─ Interest expense     [On business loans only]
├─ Bank charges        [Transaction fees]
├─ Loan insurance      [If applicable]
└─ Currency losses     [If hedged]

CATEGORY: OPERATIONAL COSTS
├─ Raw materials       [COGS - usually excluded]
├─ Packaging materials [Part of COGS]
├─ Inventory write-off [Obsolete stock]
├─ Bad debts          [Proven & written off]
├─ Provision for doubtful debts [Up to 5%]
├─ Stock losses       [Theft, damage]
└─ Waste management   [Disposal costs]

CATEGORY: TRAVEL & TRANSPORT
├─ Business travel    [Hotels, flights - local business]
├─ Vehicle maintenance [All business vehicles]
├─ Vehicle fuel       [For business use]
├─ Vehicle insurance  [Business vehicles only]
├─ Parking & tolls    [Business travel only]
├─ Public transport   [Business use tickets]
└─ Courier/delivery   [Business shipments]

CATEGORY: DEPRECIATION
├─ Buildings          [5% per year]
├─ Plant & machinery  [15% per year]
├─ Vehicles          [20% per year]
├─ Furniture         [10% per year]
├─ Computer equipment [40% per year]
└─ Goodwill          [5% per year]
```

## 4.3 Restricted Deductions

| Category | Limit | Documentation | Notes |
|---|---|---|---|
| **Entertainment** | 50% of actual | Invoices required | Over limit disallowed |
| **Vehicle Costs** | 50% of cost | Maintenance records | Mixed business/personal use |
| **Donations** | 5% of profit | Charity cert. | Discretionary limit |
| **Medical** | 100% if for all | Payroll records | Only if provided to all staff |
| **Repair/Maintenance** | Cost amount | Invoice + receipt | Cannot exceed original cost |
| **Bad Debts** | Proven write-off | Court order/judgment | Must be fully uncollectable |
| **Provisions** | 5% of debtors | Detailed analysis | For doubtful debts only |

## 4.4 Non-Deductible Expenses

```
✗ Personal/family expenses     - Not business related
✗ Income tax payments          - Deduct against gross income
✗ CIT payments                 - Already deducted in calculation
✗ Penalties & fines            - Non-deductible per law
✗ Loan principal               - Capital transaction
✗ Dividend payments            - Distribution of profit
✗ Uncapped entertainment       - Restricted to 50%
✗ Uncapped vehicle costs       - Restricted to 50%
✗ Donations over 5%            - Restricted to 5% of profit
✗ Expenses without evidence    - Must have proof
✗ Private use expenses         - Not business related
✗ Apportioned rent             - Unless clear business use
✗ Apportioned utilities        - Unless clearly separated
✗ Capital expenditure          - Claim depreciation instead
✗ Losses from prior years      - Carry forward separately
```

## 4.5 Documentation Requirements

**For All Deductions:**
```
✓ Original invoices          - From supplier
✓ Payment evidence           - Check, bank transfer, cash receipt
✓ Proof of business purpose  - Email, memo, contract
✓ Approval signature         - Manager/director approval
✓ Supplier details           - Name, address, tax ID
✓ Date of transaction        - When incurred
✓ Amount (VAT separate)      - Gross and VAT details
```

**Specific Requirements:**
```
Staff Costs:
├─ Payroll records
├─ Employment contracts
└─ Proof of payment (bank statements)

Travel:
├─ Flight tickets
├─ Hotel receipts
├─ Meeting notes/agenda
└─ Business purpose memo

Professional Fees:
├─ Fee agreement
├─ Invoice/bill
├─ Scope of work
└─ Proof of payment

Depreciation:
├─ Asset register
├─ Purchase invoice
├─ Depreciation schedule
└─ Useful life documentation
```

## 4.6 Implementation Code

```python
class DeductionEngine:
    
    FULLY_ALLOWABLE = {
        'salaries': {'limit': None, 'restriction': None},
        'pension': {'limit': 0.08, 'of': 'salaries'},
        'legal_fees': {'limit': None, 'restriction': None},
        'audit_fees': {'limit': None, 'restriction': None},
        'rent': {'limit': None, 'restriction': None},
        'utilities': {'limit': None, 'restriction': None},
        'depreciation': {'limit': None, 'by_schedule': True},
        'interest': {'limit': None, 'restriction': 'business_loans'},
        # ... more
    }
    
    RESTRICTED = {
        'entertainment': {'limit': 0.50, 'applies_to': 'actual'},
        'vehicles': {'limit': 0.50, 'applies_to': 'actual'},
        'donations': {'limit': 0.05, 'applies_to': 'profit'},
        # ... more
    }
    
    NON_DEDUCTIBLE = [
        'personal_expenses',
        'income_tax',
        'cit_payment',
        'penalties',
        'loan_principal',
        'dividend_payments',
        # ... more
    ]
    
    def calculate_allowable_deductions(self, expenses):
        """
        Calculate total allowable deductions
        """
        total_allowed = 0
        total_disallowed = 0
        details = []
        
        for expense_type, amount in expenses.items():
            if expense_type in self.NON_DEDUCTIBLE:
                # Non-deductible
                total_disallowed += amount
                details.append({
                    'type': expense_type,
                    'amount': amount,
                    'allowed': 0,
                    'reason': 'Non-deductible'
                })
            
            elif expense_type in self.RESTRICTED:
                # Apply restriction
                restriction = self.RESTRICTED[expense_type]
                allowed = amount * restriction['limit']
                disallowed = amount - allowed
                total_allowed += allowed
                total_disallowed += disallowed
                details.append({
                    'type': expense_type,
                    'amount': amount,
                    'allowed': allowed,
                    'restriction': f"{int(restriction['limit']*100)}%"
                })
            
            elif expense_type in self.FULLY_ALLOWABLE:
                # Fully allowed
                total_allowed += amount
                details.append({
                    'type': expense_type,
                    'amount': amount,
                    'allowed': amount,
                    'restriction': None
                })
        
        return {
            'total_allowed': total_allowed,
            'total_disallowed': total_disallowed,
            'details': details
        }
```

---

# SECTION 5: EXEMPTIONS & RELIEF ENGINE

**Code:** `EXE-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 5.1 Overview

Tax exemptions and reliefs reduce or eliminate tax on specified transactions, entities, or income. They are provided by law to achieve policy objectives.

## 5.2 VAT Exemptions

### Exempt Supplies (No VAT)

```
FINANCIAL SERVICES
├─ Banking services (deposits, transfers, etc.)
├─ Insurance & insurance agency
├─ Broking & investment services
├─ Stock exchange operations
├─ Money lending & leasing
└─ Fund management

HEALTHCARE SERVICES
├─ Medical & healthcare services
├─ Hospital inpatient/outpatient
├─ Healthcare provider services
├─ Medical consultation
├─ Prescription medicines (NAFDAC approved)
└─ Medical devices (healthcare use)

EDUCATION
├─ Education provision (school, college)
├─ School tuition & fees
├─ Educational materials (textbooks)
├─ Student accommodation
├─ Education research
└─ Training (registered institutions)

RELIGIOUS & GOVERNMENT
├─ Religious services
├─ Government administration
├─ Government services
├─ Public utility supply (water, sewerage)
├─ Essential services
└─ Public transport

AGRICULTURAL
├─ Raw, unprocessed agricultural products
├─ Agricultural produce (in raw form)
├─ Farm inputs (seeds, fertilizer)
└─ Agricultural extension services

EXPORT-RELATED
├─ Exported goods (0% VAT)
├─ Export services
├─ International shipping
├─ Export facilitation services
└─ Foreign travel services
```

### Exemption Documentation

**Required for VAT Exemption:**
```
1. Registration Certificate
   └─ Educational license, healthcare registration, etc.

2. Exemption Certificate
   └─ Issued by FIRS confirming exemption status

3. Invoice Marking
   └─ "Exempt Supply" marked on invoice
   └─ No VAT shown separately

4. Record Keeping
   └─ Maintain documentation for 5 years
   └─ Available for audit

5. Exemption Register
   └─ Record all exempt transactions
   └─ By exemption type
   └─ Monthly reporting
```

## 5.3 CIT Reliefs

### Small Company Relief

```
Eligibility:
├─ Chargeable income ≤ ₦25,000,000
├─ Operating ≤ 3 years
└─ Meet all tax compliance requirements

Relief Amount:
├─ 50% of chargeable income
└─ Applied in first 3 years only

Effect on CIT:
├─ Normal: 20% × Income
└─ With Relief: 20% × (50% of Income)

Example:
├─ Chargeable Income: ₦10,000,000
├─ Relief: ₦5,000,000
├─ Taxable: ₦5,000,000
├─ CIT @ 20%: ₦1,000,000
└─ Savings: ₦1,000,000 (vs ₦2,000,000 without relief)
```

### Cooperative Relief

```
Eligibility:
├─ Registered cooperative
├─ Agricultural focus preferred
└─ Meet legal requirements

Rate:
└─ 10% CIT rate (vs 20% for small co. or 30% large)

Additional Incentives:
├─ Access to government programs
├─ Preferential lending
├─ Tax holidays possible
└─ Export promotion benefits
```

### Investment Allowance

```
Eligibility:
├─ Capital investment in machinery
├─ Initial plant & equipment
└─ Manufacturing operations

Allowance:
├─ First year: 50% of capital expenditure
├─ Plus depreciation in subsequent years
└─ Accelerated deduction benefit

Example:
├─ Machine cost: ₦10,000,000
├─ Year 1 allowance: ₦5,000,000
├─ Year 2 depreciation: ₦1,500,000 (15%)
└─ Continued depreciation as normal
```

### Pioneer Industry Relief

```
Eligibility:
├─ Pioneer industry status granted by government
├─ Priority sectors (tech, manufacturing, etc.)
└─ Meeting investment thresholds

Benefits:
├─ Tax holiday: 3-5 years (no CIT)
├─ Accelerated depreciation
├─ Import duty exemptions
├─ Industrial training allowances
└─ Export promotion incentives

Duration:
├─ Initial: 3 years
├─ Possible extension: 2 additional years
└─ Total max: 5 years
```

## 5.4 CIT Loss Relief

### Carry-Forward of Losses

```
Rule:
├─ Losses in current year
├─ Can be carried forward to future years
├─ Set against future profits

Conditions:
├─ Maximum carry-forward period: 4 years
├─ Must be substantiated
├─ No change of ownership allowed
└─ Continuous operation required

Example:
├─ Year 1: Loss of ₦2,000,000
├─ Year 2: Profit of ₦3,000,000
├─ Net Taxable Income Year 2: ₦1,000,000 (3M - 2M)
├─ CIT @ 20%: ₦200,000
└─ Loss fully utilized in Year 2

Carry-Forward Schedule:
├─ Incurred Year 1: Can use in Years 2, 3, 4, 5
├─ Expires end of Year 5 if not used
├─ First in, first out (FIFO) matching
└─ Losses older than 4 years expire
```

## 5.5 Exemption Application Process

```
STEP 1: IDENTIFY EXEMPTION
├─ Determine exemption type (VAT, CIT, sector, etc.)
├─ Verify eligibility criteria
└─ Gather documentation

STEP 2: APPLY TO FIRS
├─ Submit exemption application
├─ Include supporting documents
├─ Provide business details
└─ Wait for approval (30-60 days)

STEP 3: RECEIVE CERTIFICATE
├─ FIRS issues exemption certificate
├─ Certificate valid for defined period
├─ Conditions of exemption listed
└─ Renewal requirements noted

STEP 4: IMPLEMENT SYSTEM
├─ Enter exemption in TaxGee system
├─ Flag relevant transactions
├─ Ensure VAT/tax not charged
└─ Document all exemptions

STEP 5: MAINTAIN COMPLIANCE
├─ Keep certificate current
├─ Renew before expiry
├─ Maintain documentation
├─ Report on tax return
└─ Audit compliance
```

## 5.6 Implementation Code

```python
class ExemptionEngine:
    
    VAT_EXEMPT = [
        'healthcare_services',
        'educational_services',
        'financial_services',
        'religious_services',
        'government_services',
        'raw_agricultural'
    ]
    
    VAT_ZERO_RATED = [
        'exports',
        'international_services',
        'raw_unprocessed_food',
        'medicines',
        'textbooks'
    ]
    
    CIT_RELIEFS = {
        'small_company': {
            'rate': 0.20,
            'relief_percent': 0.50,
            'relief_years': 3,
            'income_threshold': 25000000
        },
        'cooperative': {
            'rate': 0.10,
            'relief_percent': 0,
            'relief_years': 0,
            'income_threshold': None
        },
        'pioneer_industry': {
            'rate': 0,
            'tax_holiday_years': [3, 5],
            'requires_approval': True
        }
    }
    
    def check_vat_exemption(self, transaction):
        """
        Check if transaction is VAT exempt
        """
        supply_type = transaction['type']
        
        if supply_type in self.VAT_EXEMPT:
            return {
                'exempt': True,
                'rate': 0,
                'reason': 'Exempt supply'
            }
        elif supply_type in self.VAT_ZERO_RATED:
            return {
                'zero_rated': True,
                'rate': 0,
                'reason': 'Zero-rated supply'
            }
        else:
            return {
                'exempt': False,
                'rate': 0.075,
                'reason': 'Standard rated'
            }
    
    def apply_exemption(self, customer_id, exemption_type):
        """
        Apply exemption to customer
        """
        # Check if exemption is active
        exemption = self.get_exemption(customer_id)
        
        if exemption and exemption['status'] == 'active':
            return {
                'exemption_applied': True,
                'exemption_id': exemption['id'],
                'valid_from': exemption['effective_date'],
                'valid_to': exemption['expiry_date']
            }
        else:
            return {
                'exemption_applied': False,
                'reason': 'No active exemption found'
            }
    
    def calculate_loss_carry_forward(self, current_loss, prior_losses):
        """
        Calculate loss carry-forward
        """
        # Maximum 4 years carry-forward
        max_carry_forward_years = 4
        
        # Combine and sort losses
        all_losses = [(year, loss) for year, loss in prior_losses.items()]
        all_losses.sort()
        
        # Filter losses within carry-forward window
        valid_losses = []
        for year, loss in all_losses:
            years_old = 2025 - year  # Current year
            if years_old <= max_carry_forward_years:
                valid_losses.append((year, loss))
        
        # Total available loss
        total_available = current_loss + sum([loss for _, loss in valid_losses])
        
        return {
            'current_loss': current_loss,
            'carried_forward_losses': [loss for _, loss in valid_losses],
            'total_available_loss': total_available,
            'losses_expiring': [loss for year, loss in all_losses 
                               if (2025 - year) > max_carry_forward_years]
        }
```

---

# SECTION 6: NEXUS & JURISDICTION ENGINE

**Code:** `NEX-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 6.1 Overview

Nexus determines tax jurisdiction and filing obligations. A business has nexus in a state if it has physical presence, employees, property, or meets economic thresholds.

## 6.2 Nexus Establishment Criteria

### Physical Presence Nexus

```
Business has nexus if:
├─ Has office, branch, or facility in state
├─ Has warehouse or storage facility
├─ Has manufacturing plant
├─ Has registered agent in state
├─ Has employees working in state
└─ Owns or leases property
```

### Economic Nexus

```
Business has nexus if:
├─ Annual sales ≥ ₦25,000,000 (VAT threshold)
├─ Annual revenue ≥ ₦100,000,000 (CIT mandatory)
├─ Has significant customer base in state
├─ Makes regular shipments to state
└─ Has ongoing solicitation of orders
```

### Employee Nexus

```
Has nexus if:
├─ Any employees work in state
├─ Remote workers working from state
├─ Travel to state regularly for business
├─ Contractor/agent in state
└─ Even one employee establishes nexus
```

## 6.3 Filing Obligations by Nexus

```
IF (has nexus in state):
  ├─ File VAT returns monthly (if ≥ ₦25M)
  ├─ File CIT return annually
  ├─ File PAYE monthly (if has employees)
  ├─ File WHT monthly (if makes relevant payments)
  ├─ Maintain records in state
  └─ May need local tax registration

IF (no nexus in state):
  ├─ No state-level VAT filing
  ├─ Still file federal returns
  ├─ Report all sales/revenue
  ├─ No withholding tax obligation
  └─ No local registration required
```

## 6.4 Multi-State Operations

```
If business operates in multiple states:

FEDERAL LEVEL:
├─ One CIT return filed with FIRS
├─ Consolidated return
├─ Single TIN
└─ Central PAYE administration

STATE LEVEL:
├─ VAT return per state (if nexus)
├─ Local registration per state
├─ VAT remittance to state
├─ State-specific documents
└─ Nexus confirmation per state

CONSOLIDATED REPORTING:
├─ All sales consolidated
├─ All expenses consolidated
├─ Apportionment by state if needed
└─ Detailed records per location
```

## 6.5 Nexus Registration Process

```
STEP 1: EVALUATE NEXUS
├─ Physical presence?
├─ Employees in state?
├─ Economic threshold met?
└─ Document facts

STEP 2: REGISTER IF REQUIRED
├─ Apply to state tax authority
├─ Provide business registration
├─ Pay registration fee
├─ Get state tax ID

STEP 3: START FILING
├─ File first return within deadline
├─ Monthly VAT (if applicable)
├─ Annual CIT (if applicable)
├─ PAYE (if has employees)

STEP 4: MAINTAIN RECORDS
├─ Document nexus facts
├─ Keep transaction records
├─ Maintain employee records
└─ Support audit claims

STEP 5: CONTINUOUS COMPLIANCE
├─ File on time each period
├─ Pay taxes when due
├─ Renew registration annually
└─ Report changes in status
```

## 6.6 Implementation Code

```python
class NexusEngine:
    
    FEDERAL_JURISDICTION = 'FIRS'
    
    # States in Nigeria
    STATES = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra',
        'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo',
        'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
        'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
        'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun',
        'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
        'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ]
    
    VAT_THRESHOLD = 25000000
    MANDATORY_REG_THRESHOLD = 100000000
    
    def determine_nexus(self, business_data):
        """
        Determine nexus in each state
        """
        nexus_states = []
        
        # Check physical presence
        if business_data.get('locations'):
            nexus_states.extend(business_data['locations'])
        
        # Check employee locations
        if business_data.get('employees'):
            for employee in business_data['employees']:
                state = employee.get('work_state')
                if state and state not in nexus_states:
                    nexus_states.append(state)
        
        # Check economic threshold
        if business_data.get('revenue', 0) >= self.MANDATORY_REG_THRESHOLD:
            # Economic nexus established in all states
            # where significant sales occur
            if business_data.get('sales_by_state'):
                for state, sales in business_data['sales_by_state'].items():
                    if sales >= self.VAT_THRESHOLD and state not in nexus_states:
                        nexus_states.append(state)
        
        return {
            'nexus_states': nexus_states,
            'filing_obligations': self.get_filing_obligations(
                business_data, nexus_states
            )
        }
    
    def get_filing_obligations(self, business_data, nexus_states):
        """
        Get filing obligations based on nexus
        """
        obligations = {
            'federal': ['CIT Annual'],
            'states': {}
        }
        
        # Add PAYE if has employees
        if business_data.get('employees'):
            obligations['federal'].append('PAYE Monthly')
        
        # Add WHT if makes eligible payments
        if business_data.get('makes_payments'):
            obligations['federal'].append('WHT Monthly')
        
        # Add VAT if registered or threshold met
        if business_data.get('revenue', 0) >= self.VAT_THRESHOLD:
            obligations['federal'].append('VAT Monthly')
        
        # Add state-level obligations
        for state in nexus_states:
            obligations['states'][state] = []
            
            # VAT at state level
            if business_data.get('revenue', 0) >= self.VAT_THRESHOLD:
                obligations['states'][state].append('VAT Monthly')
            
            # State-specific taxes (if any)
            obligations['states'][state].append('State Registration')
        
        return obligations
```

---

# SECTION 7: FILING & COMPLIANCE ENGINE

**Code:** `FIL-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 7.1 Overview

Filing and compliance obligations include submission of returns, payment of taxes, and maintaining records for audit purposes.

## 7.2 VAT Filing Requirements

```
Filing Frequency: Monthly
Due Date: 21st of following month
Period: 1st to 30th of month

Filing Method:
├─ FIRS Online Portal (e-filing)
├─ OR Bank deposit (if payment-only)
└─ Preferred: Electronic filing

Required Documents:
├─ VAT Return Form (FIRS Form)
├─ Schedule of transactions
├─ Invoice copies (sample or all)
├─ Input tax documents
└─ Exemption certificates (if claimed)

Returns Submission Schedule:
├─ January return: Due Feb 21
├─ February return: Due Mar 21
├─ ... continuing monthly
├─ December return: Due Jan 21 (next year)
└─ Late filing: Penalty applies
```

## 7.3 CIT Filing Requirements

```
Filing Frequency: Annual
Due Date: 3 months after fiscal year end
Period: January 1 - December 31 (or FY end date)

Filing Method:
├─ FIRS Online Portal (e-filing)
├─ Supporting documents attached
└─ Electronic signatures required

Required Documents:
├─ CIT Return form
├─ Financial statements
│  ├─ Income statement
│  ├─ Balance sheet
│  ├─ Cash flow statement
│  └─ Notes to accounts
├─ Tax computation schedule
├─ Asset register
├─ Depreciation schedule
├─ Deduction details
├─ Carried forward losses (if any)
├─ Auditor's report (if large company)
└─ Management letter (if audited)

Deadline:
├─ Calendar year: Returns due April 30
├─ April fiscal year: Returns due July 31
├─ Other FY: 3 months after year end
└─ Late filing: Penalty applies
```

## 7.4 PAYE (Pay As You Earn) Filing

```
Filing Frequency: Monthly
Due Date: 10th of following month

Who Should File:
├─ Any business with employees
├─ Employee tax deducted at source
├─ Employer submits monthly

Required:
├─ PAYE Schedule
├─ Employee list
├─ Gross salaries
├─ Tax deducted
└─ Proof of payment

Filing Method:
├─ FIRS Online (Preferr ed)
├─ Bank deposit
└─ Physical office (not preferred)

Deduction:
├─ Employer deducts monthly
├─ Remits to FIRS
├─ Employees claim credit on personal tax
└─ CTC – Certificated of Tax Compliance
```

## 7.5 Critical Filing Dates (2025)

```
JANUARY
├─ 15: WHT remittance (Dec withholdings)
├─ 21: Q4 CIT advance payment (due)
├─ 31: VAT return (Dec period) due

APRIL
├─ 21: Q1 CIT advance payment
├─ 30: 2024 Annual CIT return due
└─ 30: 2024 Annual financial statements

JULY
├─ 21: Q2 CIT advance payment
├─ 31: VAT consolidated (Jan-Jun)

OCTOBER
├─ 21: Q3 CIT advance payment

DECEMBER
├─ 31: Tax year ends
```

## 7.6 Record Keeping Requirements

```
Documents to Keep (5-7 Years):

FINANCIAL RECORDS:
├─ General ledger
├─ Journal entries
├─ Bank statements
├─ Reconciliations
├─ Invoices (sales & purchases)
├─ Receipt books
├─ Expense receipts
└─ Payroll records

TAX RECORDS:
├─ Tax returns (filed)
├─ Payment proof (receipts)
├─ Correspondence with FIRS
├─ Exemption certificates
├─ WHT certificates
└─ Tax computation workings

SUPPORT DOCUMENTATION:
├─ Contracts (with customers & vendors)
├─ Employee files
├─ Vehicle registrations
├─ Property documents
├─ Asset purchase receipts
└─ Depreciation schedules

Storage:
├─ Original documents preferred
├─ Electronic copies acceptable (with proof)
├─ Backup copies recommended
├─ Secure storage required
└─ Available for audit on request
```

## 7.7 Implementation Code

```python
class FilingEngine:
    
    FILING_REQUIREMENTS = {
        'vat': {
            'frequency': 'monthly',
            'due_day': 21,
            'form': 'FIRS VAT Return',
            'documents': ['invoices', 'input_tax_docs', 'exemptions']
        },
        'cit': {
            'frequency': 'annual',
            'due_months': 3,  # 3 months after year end
            'form': 'CIT Return',
            'documents': ['financial_statements', 'asset_register', 'depreciation']
        },
        'paye': {
            'frequency': 'monthly',
            'due_day': 10,
            'form': 'PAYE Schedule',
            'documents': ['employee_list', 'salary_sheets']
        },
        'wht': {
            'frequency': 'monthly',
            'due_days': 21,  # Within 21 days of withholding
            'form': 'WHT Return',
            'documents': ['payment_schedule', 'recipient_list']
        }
    }
    
    def calculate_filing_deadline(self, tax_type, period_end):
        """
        Calculate filing deadline
        """
        from datetime import datetime, timedelta
        
        requirement = self.FILING_REQUIREMENTS.get(tax_type)
        
        if requirement['frequency'] == 'monthly':
            due_day = requirement['due_day']
            # Next month, specific day
            next_month = period_end.replace(day=1) + timedelta(days=32)
            deadline = next_month.replace(day=min(due_day, 28))
        
        elif requirement['frequency'] == 'annual':
            due_months = requirement['due_months']
            deadline = period_end + timedelta(days=due_months * 30)
        
        return deadline
    
    def check_filing_status(self, business, tax_type, period):
        """
        Check if filing is due and status
        """
        deadline = self.calculate_filing_deadline(tax_type, period)
        today = datetime.now().date()
        
        status = 'on_time'
        if today > deadline:
            status = 'overdue'
        elif today > deadline - timedelta(days=7):
            status = 'due_soon'
        
        return {
            'tax_type': tax_type,
            'period': period,
            'deadline': deadline,
            'status': status,
            'days_remaining': (deadline - today).days
        }
    
    def generate_filing_checklist(self, business_data):
        """
        Generate filing checklist
        """
        checklist = {
            'vat': {
                'required': business_data['annual_revenue'] >= 25000000,
                'documents': [
                    '□ Monthly invoices compiled',
                    '□ Input tax documents collected',
                    '□ Exemption certificates attached',
                    '□ Return form completed',
                    '□ Calculations verified'
                ]
            },
            'cit': {
                'required': True,
                'documents': [
                    '□ Financial statements prepared',
                    '□ Asset register updated',
                    '□ Depreciation schedule completed',
                    '□ Deductions documented',
                    '□ Carried forward losses calculated',
                    '□ Tax computation reviewed'
                ]
            },
            'paye': {
                'required': business_data['employees'] > 0,
                'documents': [
                    '□ Employee list current',
                    '□ Payroll records complete',
                    '□ Tax deductions verified',
                    '□ Payment proofs collected'
                ]
            }
        }
        
        return checklist
```

---

# SECTION 8: PENALTIES & INTEREST ENGINE

**Code:** `PEN-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 8.1 Overview

Penalties and interest are imposed for non-compliance with tax laws. Interest accrues daily on late payments. Penalties apply to various violations.

## 8.2 Late Payment Interest

```
Interest Rate:              5% per annum (simple interest)
Calculated:                Daily from due date to payment date
Applied To:                All overdue tax amounts
Accrual Method:            Simple interest (not compound)
Formula:                   Amount × 5% × (Days / 365)

Example:
├─ Tax Due: ₦500,000
├─ Due Date: December 21, 2025
├─ Payment Date: January 30, 2026
├─ Days Late: 40 days
├─ Interest = 500,000 × 0.05 × (40/365) = ₦2,739.73
└─ Total Due: ₦502,739.73

Accrual Schedule:
├─ First 30 days: ₦4,109.59
├─ Next 10 days: ₦1,369.86
└─ Total: ₦2,739.73 (approx)
```

## 8.3 Filing Penalties

| Violation | Amount | Notes |
|---|---|---|
| **Late CIT Filing** | 25% of tax or ₦10K min | Whichever is greater |
| **Late VAT Filing** | ₦50K - ₦5M | Escalating with days late |
| **Non-filing CIT** | ₦500K - ₦10M | Serious violation |
| **Non-filing VAT** | ₦500K - ₦5M | Serious violation |
| **Wrong Info on Return** | ₦250K - ₦1M | If material misstatement |
| **Failure to Register** | ₦100K - ₦500K | If obligated to register |

## 8.4 Payment Penalties

| Violation | Amount | Notes |
|---|---|---|
| **Late CIT Payment** | Interest @ 5% p.a. | Daily accrual |
| **Late VAT Payment** | Interest @ 5% p.a. | Daily accrual |
| **Insufficient Payment** | Interest + ₦50K | On shortfall amount |
| **Fraudulent Payment** | Up to 200% of tax | Criminal penalty |
| **Bad Check** | Penalty + interest | Plus handling charges |

## 8.5 Misconduct Penalties

```
DEFAULT (Failure to Comply)
├─ First instance: ₦10,000 - ₦50,000
├─ Second instance: ₦50,000 - ₦500,000
├─ Repeat offender: ₦500,000 - ₦5,000,000
└─ Director personal liability

EVASION (Intentional Avoidance)
├─ Amount: 150% - 300% of tax evaded
├─ Criminal prosecution possible
├─ Director/officer personal liability
├─ Imprisonment (up to 5 years possible)
└─ Asset seizure possible

FALSE STATEMENT
├─ Amount: 50% - 300% of tax
├─ Based on severity
├─ Criminal liability possible
└─ Professional credential loss possible
```

## 8.6 Penalty Calculation Algorithm

```
ALGORITHM: CalculatePenalties(violation, amount, days_late)
INPUT: violation type, tax amount, days late
OUTPUT: penalty amount

BEGIN
  1. IDENTIFY violation type:
     IF (late payment):
       → interest = amount × 0.05 × (days / 365)
       → penalty = max(interest, minimum_penalty)
     
     ELSE IF (late filing):
       → penalty = max(0.25 × amount, ₦10,000)
     
     ELSE IF (non-filing):
       → penalty = ₦500,000 - ₦10,000,000 (graduated)
     
     ELSE IF (evasion):
       → penalty = 1.50 × amount to 3.00 × amount
     
     ELSE:
       → penalty = as per violation schedule
  
  2. APPLY minimum penalties:
     IF (calculated penalty < minimum):
       → penalty = minimum
  
  3. APPLY escalation (if applicable):
     IF (days_late > 90):
       → multiply by 2x
     IF (days_late > 180):
       → multiply by 3x
  
  4. CHECK mitigation:
     IF (voluntary disclosure):
       → reduce by 50%
     IF (first time offender):
       → reduce by 25%
  
  5. RETURN penalty amount
END
```

## 8.7 Penalty Mitigation

```
VOLUNTARY DISCLOSURE
├─ Applicant voluntarily discloses
├─ Before FIRS assessment/audit
├─ Pays 50% of penalty + full tax
├─ FIRS issues relief
└─ Available once per year

REASONABLE CAUSE
├─ Good faith error
├─ Documented excuse (flood, illness, etc.)
├─ First-time violation
├─ Immediate correction
└─ 25% - 50% reduction possible

REQUEST FOR RELIEF
├─ Written request to FIRS
├─ Explain circumstances
├─ Provide supporting documents
├─ Attach evidence of good faith
└─ Submit within 30 days of penalty notice

APPEAL PROCESS
├─ File within 30 days
├─ FIRS reviews
├─ Can present evidence
├─ Possible partial/full reversal
└─ Takes 6-12 months
```

## 8.8 Implementation Code

```python
class PenaltyEngine:
    
    INTEREST_RATE = 0.05  # 5% per annum
    MIN_LATE_PAYMENT_PENALTY = 0  # Interest is penalty
    MIN_LATE_FILING_CIT = 10000
    MIN_LATE_FILING_VAT = 50000
    
    FILING_PENALTIES = {
        'late_cit': {
            'rate': 0.25,
            'minimum': 10000,
            'maximum': None
        },
        'late_vat': {
            'rate': 0.20,  # Graduated
            'minimum': 50000,
            'maximum': 5000000
        },
        'non_filing_cit': {
            'minimum': 500000,
            'maximum': 10000000
        },
        'non_filing_vat': {
            'minimum': 500000,
            'maximum': 5000000
        }
    }
    
    def calculate_interest(self, amount, days_late):
        """
        Calculate late payment interest
        """
        interest = amount * self.INTEREST_RATE * (days_late / 365)
        return round(interest, 2)
    
    def calculate_filing_penalty(self, tax_type, amount, days_late):
        """
        Calculate filing penalty
        """
        penalty_config = self.FILING_PENALTIES.get(f'late_{tax_type}')
        
        if not penalty_config:
            return 0
        
        # Calculate based on days late
        if days_late <= 30:
            penalty = amount * penalty_config['rate']
        elif days_late <= 90:
            penalty = amount * penalty_config['rate'] * 1.5
        else:
            penalty = amount * penalty_config['rate'] * 2.0
        
        # Apply minimum
        penalty = max(penalty, penalty_config['minimum'])
        
        # Apply maximum if exists
        if penalty_config.get('maximum'):
            penalty = min(penalty, penalty_config['maximum'])
        
        return round(penalty, 2)
    
    def calculate_total_due(self, original_amount, days_late, tax_type):
        """
        Calculate total amount due (principal + interest + penalty)
        """
        interest = self.calculate_interest(original_amount, days_late)
        penalty = self.calculate_filing_penalty(tax_type, original_amount, days_late)
        
        total_due = original_amount + interest + penalty
        
        return {
            'original_amount': original_amount,
            'interest': interest,
            'penalty': penalty,
            'total_due': round(total_due, 2),
            'breakdown': {
                'principal': original_amount,
                'interest': interest,
                'penalty': penalty
            }
        }
```

---

# SECTION 9: BUSINESS SEGMENT ENGINE

**Code:** `SEG-2025-NG`  
**Effective Date:** January 1, 2025  
**Last Updated:** December 25, 2025  
**Status:** Active  
**Version:** 1.0  

## 9.1 Overview

Different business types face different tax treatment. This section defines tax rules by business structure.

## 9.2 Business Types & Tax Treatment

### Sole Proprietor

```
Structure:
├─ Self-employed individual
├─ Unincorporated business
├─ No separate legal entity
└─ Owner personally liable

Tax Treatment:
├─ Income Tax: Progressive rates (varies by income)
├─ VAT: Optional if < ₦25M (elected if > ₦25M)
├─ CIT: NOT applicable (sole proprietor pays income tax)
├─ Deductions: Same as individuals
├─ No quarterly CIT advance
└─ Annual return due: April 30 + 2 months

Advantages:
├─ Simple registration
├─ Lower compliance burden
├─ Flexible accounting
└─ No corporate formalities

Disadvantages:
├─ Personal liability
├─ Limited to individual income tax rates
├─ Less credibility with large clients
└─ Harder to raise capital
```

### Small Company (≤ ₦25M)

```
Structure:
├─ Incorporated company
├─ Limited liability
├─ Separate legal entity
└─ Registered with CAC

Tax Treatment:
├─ CIT: 20% (small company rate)
├─ VAT: If > ₦25M (optional below)
├─ Relief: 50% for first 3 years
├─ Quarterly advance: 25% of estimate each quarter
├─ Annual return due: April 30
└─ Input VAT recoverable

Advantages:
├─ Lower CIT rate (20% vs 30%)
├─ Relief available (50% for 3 years)
├─ Limited liability
├─ Separate legal entity
├─ Credible with clients
└─ Can attract investment

Disadvantages:
├─ More compliance (filings, returns)
├─ Corporate tax returns more complex
├─ Need director approval
└─ Statutory meetings required
```

### Large Company (> ₦25M)

```
Structure:
├─ Incorporated company
├─ Significant annual turnover
├─ Multiple shareholders likely
├─ Mandatory public/private company

Tax Treatment:
├─ CIT: 30% (standard rate)
├─ VAT: Mandatory (if > ₦25M)
├─ NO relief (doesn't apply)
├─ Tertiary Education Tax: 2-3%
├─ Quarterly advance: 25% each quarter
├─ Annual return due: April 30
├─ Audited financial statements required
└─ Input VAT recoverable

Advantages:
├─ Large capital available
├─ Credible with large clients
├─ Public investment possible
├─ Can attract multinational partners
└─ Professional structure

Disadvantages:
├─ Higher CIT rate (30%)
├─ No small company relief
├─ Complex compliance
├─ Quarterly CIT advance mandatory
├─ Audit requirements
└─ Directors' personal guarantee often required
```

### Partnership

```
Structure:
├─ 2+ persons
├─ Unincorporated (unless registered as corporation)
├─ Joint liability or LLP
└─ Each partner self-employed

Tax Treatment:
├─ CIT: 20% on partnership income
├─ Plus: Personal income tax on partner share
├─ VAT: If partnership > ₦25M
├─ Flow-through entity (income flows to partners)
├─ One tax return (partnership)
├─ Partners claim their share on personal return
└─ Input VAT recoverable if registered

Tax Calculation:
├─ Partnership income: ₦10,000,000
├─ Less: Deductions
├─ = Chargeable Income: ₦6,000,000
├─ Partnership CIT @ 20%: ₦1,200,000
├─ Remaining after CIT: ₦4,800,000
├─ Each partner pays income tax on their share
└─ CIT is paid at partnership level

Advantages:
├─ Shared liability (in LLP)
├─ Shared resources
├─ Multiple skills combined
└─ Flexible structure

Disadvantages:
├─ Joint & several liability (in general partnership)
├─ Partner disputes possible
├─ Succession issues
└─ More complex accounting
```

### Cooperative

```
Structure:
├─ Registered cooperative
├─ Member-owned
├─ Democratic governance
├─ Agricultural focus typical

Tax Treatment:
├─ CIT: 10% (incentive rate)
├─ VAT: If > ₦25M
├─ Special reliefs: Available
├─ Quarterly advance: 25% each quarter
├─ Annual return: April 30
└─ Input VAT recoverable

Incentives:
├─ Reduced CIT rate (10% vs 20-30%)
├─ Access to government programs
├─ Preferential lending rates
├─ Tax holidays possible
├─ Export promotion benefits
└─ Agricultural input tax relief

Advantages:
├─ Lowest CIT rate available
├─ Government incentives
├─ Cost sharing among members
├─ Democratic structure
└─ Social benefits

Disadvantages:
├─ Limited to eligible activities
├─ Require CAC registration
├─ Governance requirements
└─ Reporting obligations
```

### Non-Profit Organization

```
Structure:
├─ Registered charity/NGO
├─ Not-for-profit objectives
├─ Reinvest surplus in mission
└─ CAC registration

Tax Treatment:
├─ CIT: 0% (fully exempt)
├─ VAT: Exempt on eligible supplies
├─ Income tax: Exempt on mission-related income
├─ Filing: Still required (compliance)
├─ Deductions: Enhanced (donations, missions)
└─ Input VAT not recoverable

Eligibility Requirements:
├─ Registered as charity
├─ Genuine charitable/religious/education purpose
├─ Not for private profit
├─ Reinvest surplus
├─ Submit annual accounts
└─ Demonstrate charitable work

Advantages:
├─ Zero CIT liability
├─ Enhanced deductions
├─ VAT exemptions
├─ Tax-deductible donations
├─ Public credibility
└─ Foundation support available

Disadvantages:
├─ Strict compliance
├─ Public accountability
├─ Donor reporting
├─ Activities restricted to mission
└─ Tax loss of deductions if profit-making
```

### Foreign Company (Branch)

```
Structure:
├─ Nigeria branch of foreign company
├─ Separate branch TIN required
├─ Foreign parent holds assets
└─ Subsidiary is separate entity

Tax Treatment:
├─ CIT: 30% on branch profits
├─ VAT: If > ₦25M
├─ Withholding on dividends: 10%
├─ Interest withholding: 10%
├─ Filing: Annual return required
├─ Deductions: Limited to branch operations
└─ Transfer pricing rules apply

Special Considerations:
├─ Double taxation avoidance agreement
├─ Transfer pricing documentation
├─ Permanent establishment status
├─ Profit repatriation limitations
├─ Advance pricing agreement available
└─ Thin capitalization rules (interest deductibility)

Advantages:
├─ Can operate in Nigeria
├─ Limited liability (parent not liable)
├─ Tax treaty benefits possible
├─ Single profit pool
└─ International experience

Disadvantages:
├─ Higher CIT (30%)
├─ Profit repatriation tax (10% WHT)
├─ Complex transfer pricing rules
├─ More regulatory oversight
└─ Thin cap restrictions
```

## 9.3 Tax Rate Comparison

```
╔═══════════════════════════════════════════════════════════╗
║            TAX RATES BY BUSINESS TYPE                      ║
╠════════════════════════╦════════════════════════════════╣
║ Business Type          ║ Income Tax / CIT Rate         ║
╠════════════════════════╬════════════════════════════════╣
║ Sole Proprietor        ║ 1-24% (progressive)          ║
║ Small Company (1-3yr)  ║ 20% (with 50% relief)        ║
║ Small Company (3+ yr)  ║ 20%                          ║
║ Large Company          ║ 30%                          ║
║ Partnership            ║ 20% (partnership level)      ║
║ Cooperative            ║ 10%                          ║
║ Non-Profit            ║ 0% (fully exempt)            ║
║ Foreign Branch         ║ 30%                          ║
╚════════════════════════╩════════════════════════════════╝
```

## 9.4 Implementation Code

```python
class SegmentEngine:
    
    BUSINESS_TYPES = {
        'sole_proprietor': {
            'incorporated': False,
            'cit_rate': 0,  # Uses income tax instead
            'income_tax': 'progressive',
            'vat_optional': True,
            'vat_threshold': 25000000
        },
        'small_company': {
            'incorporated': True,
            'cit_rate': 0.20,
            'relief': 0.50,
            'relief_years': 3,
            'income_threshold': 25000000,
            'quarterly_advance': True
        },
        'large_company': {
            'incorporated': True,
            'cit_rate': 0.30,
            'relief': 0,
            'vat_mandatory': True,
            'quarterly_advance': True,
            'audit_required': True
        },
        'partnership': {
            'incorporated': False,
            'cit_rate': 0.20,
            'flow_through': True,
            'partners_pay_income_tax': True
        },
        'cooperative': {
            'incorporated': True,
            'cit_rate': 0.10,
            'special_incentives': True,
            'quarterly_advance': True
        },
        'non_profit': {
            'incorporated': True,
            'cit_rate': 0,
            'exempt_supplies': True,
            'enhanced_deductions': True
        },
        'foreign_branch': {
            'incorporated': False,  # Branch, not entity
            'cit_rate': 0.30,
            'withholding_dividend': 0.10,
            'withholding_interest': 0.10,
            'transfer_pricing': True
        }
    }
    
    def get_applicable_rate(self, business_type, business_data):
        """
        Get applicable CIT/income tax rate
        """
        config = self.BUSINESS_TYPES.get(business_type)
        
        if not config:
            return None
        
        # Determine rate based on configuration
        rate = config['cit_rate']
        
        # Apply relief if applicable
        if config.get('relief') and business_data.get('operating_years', 0) <= config['relief_years']:
            rate = rate * (1 - config['relief'])
        
        return rate
    
    def get_vat_requirement(self, business_type, revenue):
        """
        Determine VAT requirement for business type
        """
        config = self.BUSINESS_TYPES.get(business_type)
        
        if config.get('vat_mandatory'):
            return {'vat_required': True, 'optional': False}
        elif config.get('vat_optional'):
            if revenue >= config['vat_threshold']:
                return {
                    'vat_required': True,
                    'optional': True,
                    'reason': f"Revenue exceeds ₦{config['vat_threshold']:,}"
                }
            else:
                return {
                    'vat_required': False,
                    'optional': True,
                    'reason': f"Can elect VAT if > ₦{config['vat_threshold']:,}"
                }
        else:
            return {'vat_required': False, 'optional': False}
    
    def get_filing_requirements(self, business_type, business_data):
        """
        Get filing requirements by business type
        """
        config = self.BUSINESS_TYPES.get(business_type)
        
        requirements = {
            'cit': {
                'required': True,
                'frequency': 'annual',
                'due_date': 'April 30'
            },
            'quarterly_advance': {
                'required': config.get('quarterly_advance', False),
                'frequency': 'quarterly',
                'due_dates': ['April 21', 'July 21', 'October 21', 'January 21']
            },
            'vat': {
                'required': self.get_vat_requirement(business_type, business_data.get('revenue', 0))['vat_required'],
                'frequency': 'monthly',
                'due_date': '21st of following month'
            },
            'audit': {
                'required': config.get('audit_required', False)
            }
        }
        
        return requirements
```

---

## REFERENCE & SUPPORT

### Getting Help

```
For Tax Rules Questions:
└─ Email: tax-engine@taxgee.ng
└─ Reference specific section (e.g., "Section 1: VAT Engine")

For Implementation Issues:
└─ Email: engineering@taxgee.ng
└─ Include error logs & data samples

For Tax Law Questions:
└─ Contact: Compliance Officer
└─ Email: compliance@taxgee.ng
└─ Have documentation ready
```

### Updates & Changes

This engine reflects tax laws as of **December 25, 2025**.

**Updates occur when:**
- FIRS issues new circular
- Tax law amendments passed
- Court decisions affect interpretation
- Rate changes announced

**Next Review Date:** June 30, 2026

---

**END OF COMPREHENSIVE TAX RULES ENGINE**

**All 9 sections are now documented and ready for implementation.**

