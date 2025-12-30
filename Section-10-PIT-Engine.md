# SECTION 10: PERSONAL INCOME TAX (PIT) ENGINE
**Individual Salary & Self-Employed Tax Calculation**

---

## 📋 SECTION 10 OVERVIEW

**Code:** `PIT-2025-NG`  
**Effective Date:** January 1, 2025  
**Version:** 1.0  
**Scope:** Individual taxpayers (employees, self-employed, contractors, freelancers)  
**Applies To:** Annual income ≤ ₦800,000 (0% tax) up to ₦50,000,000+ (25%)  

### Key Purpose

Personal Income Tax (PIT / PAYE) calculates the annual tax liability for **individuals** based on:
- Gross income (salary + side income).
- Statutory deductions (pension, rent relief, health, donations).
- Progressive tax bands (0%–25%).

This section ensures individuals can calculate **how much tax they owe** annually and what their **monthly PAYE** deduction should be.

---

## 🎯 QUICK FACTS

- **Minimum taxable income:** ₦800,000 (first band is exempt).
- **Max effective rate:** 25% (on income above ₦50M).
- **Monthly PAYE:** Annual tax ÷ 12.
- **Rent relief:** 20% of annual rent, capped at ₦500,000.
- **Filing:** Annual (FIRS Form IT 2101).
- **Deadline:** April 30 (or Q3 2025 for amended returns).

---

## 📊 PIT BANDS & RATES (NTA 2025+)

Progressive tax bands applied to **chargeable income**:

| Band | Range | Rate | Cumulative Tax (at max) |
|------|-------|------|------------------------|
| 1 | ₦0 – ₦800,000 | 0% | ₦0 |
| 2 | ₦800,001 – ₦3,000,000 | 15% | ₦330,000 |
| 3 | ₦3,000,001 – ₦12,000,000 | 18% | ₦2,052,000 |
| 4 | ₦12,000,001 – ₦25,000,000 | 21% | ₦4,785,000 |
| 5 | ₦25,000,001 – ₦50,000,000 | 23% | ₦10,530,000 |
| 6 | ₦50,000,001+ | 25% | Cumulative |

---

## 💰 DEDUCTIONS & RELIEFS

### Allowable Deductions (Subtracted from Gross Income)

All amounts must be documented and claimed with evidence:

1. **Pension Contribution** (Mandatory for employees)
   - Typical: 8% of (Basic + Housing + Transport).
   - Limit: No cap; fully deductible.
   - Evidence: Pension slip / contribution receipt.

2. **Rent Relief** (Major deduction)
   - Formula: `20% of annual rent paid`
   - **Cap: ₦500,000 maximum**
   - Example: Annual rent ₦3M → Relief = min(₦600k, ₦500k) = ₦500k
   - Evidence: Tenancy agreement + rent receipts.

3. **National Health Insurance Scheme (NHIS) / Health Insurance**
   - Limit: Fully deductible.
   - Evidence: Premium receipts.

4. **National Housing Fund (NHF) Contribution**
   - Typical: ₦25,000 annually.
   - Limit: Fully deductible.
   - Evidence: NHF receipts.

5. **Life Insurance Premiums** (Approved policies)
   - Limit: Fully deductible (reasonable premiums).
   - Evidence: Policy document + premium receipts.

6. **Approved Donations** (Registered NGOs, charities)
   - Limit: Up to 10% of chargeable income (before application).
   - Evidence: Donation receipt from registered organization.

7. **Housing Loan Interest** (Qualifying mortgages)
   - Limit: Fully deductible for owner-occupied property.
   - Evidence: Mortgage agreement + payment proofs.

### Total Deductions Formula

```
Total Deductions = Pension + Rent Relief + NHIS + NHF + Life Insurance 
                   + Approved Donations + Housing Loan Interest
```

### Chargeable Income

```
Chargeable Income = Gross Income - Total Deductions
```

---

## 🧮 CALCULATION ALGORITHM

### Step 1: Aggregate Gross Income

Sum all income sources:

```
Gross Income = Salary Income 
               + Business / Freelance Income (net of business expenses)
               + Rental Income (net of allowable expenses)
               + Investment Income (non-final-tax)
               + Other Income
```

**Rules:**
- Salary: Basic + Housing + Transport + Other allowances.
- Freelance / Self-employed: Revenue minus business expenses (documented).
- Rental: Annual rent received minus maintenance (if claimed separately).
- Investment: Dividend, interest (not subject to final tax elsewhere).

### Step 2: Subtract Allowable Deductions

```
Total Deductions = Pension + Rent Relief + NHIS + NHF + Life Insurance 
                   + Approved Donations + Housing Loan Interest
```

**Validation:**
- Rent relief cannot exceed ₦500,000.
- Donations capped at 10% of chargeable income.
- All deductions must be documented.

### Step 3: Compute Chargeable Income

```
Chargeable Income = max(0, Gross Income - Total Deductions)
```

### Step 4: Apply PIT Bands

**Pseudocode:**

```
annual_tax = 0
remaining_income = chargeable_income

FOR EACH band IN PIT_BANDS (ordered by range):
  band_floor = band.range_start
  band_ceiling = band.range_end
  band_rate = band.rate
  
  IF remaining_income <= 0:
    BREAK
  
  taxable_in_band = min(remaining_income, band_ceiling - band_floor)
  tax_in_band = taxable_in_band * band_rate
  annual_tax += tax_in_band
  remaining_income -= taxable_in_band

RETURN annual_tax
```

**Example Calculation:**

```
Gross Income: ₦5,000,000
Pension: ₦400,000 (8% of salary)
Rent Relief: ₦500,000 (capped; paid ₦1.5M rent)
NHIS: ₦0
Donations: ₦100,000
Other: ₦0
─────────────────
Total Deductions: ₦1,000,000
Chargeable Income: ₦4,000,000

Apply bands:
- Band 1 (₦0–₦800k @ 0%): taxable = ₦800k, tax = ₦0
- Band 2 (₦800k–₦3M @ 15%): taxable = ₦2.2M, tax = ₦330k
- Band 3 (₦3M–₦12M @ 18%): taxable = ₦1M, tax = ₦180k
─────────────────
Annual Tax: ₦510,000
Monthly PAYE: ₦42,500
Effective Rate: 10.2%
```

### Step 5: Convert to Monthly PAYE

For **employees**, divide annual tax by 12:

```
Monthly PAYE = Annual Tax / 12
```

For **self-employed**, this is annual liability (typically paid quarterly or annually to FIRS).

### Step 6: Compute Effective Rate

```
Effective Tax Rate = Annual Tax / Gross Income  (if Gross > 0)
```

---

## 🔐 TAX RELIEF & SPECIAL CASES

### Resident vs Non-Resident

**Resident Individual** (Nigeria resident for 3+ years or physically present ≥183 days):
- Taxed on worldwide income (salary, business, investment).
- Eligible for all deductions and reliefs above.

**Non-Resident Individual**:
- Taxed only on Nigerian-sourced income.
- Limited deductions (typically pension + NHIS only).

### Loss Carry-Forward (for self-employed)

If chargeable income is negative (business loss):
- Loss can be carried forward up to **4 years**.
- Offset against future years' profit before applying bands.
- Documented in annual return filed with FIRS.

### Minimum Tax (if applicable)

Some jurisdictions may impose minimum tax for self-employed / business owners. Confirm with FIRS guidelines; not universally enforced in 2025.

---

## 📝 DOCUMENTATION REQUIREMENTS

For each deduction claimed, individual must maintain:

1. **Pension Contributions:**
   - Pension slip (monthly).
   - Annual statement from pension administrator.

2. **Rent Relief:**
   - Tenancy agreement (original or certified).
   - Rent receipts (monthly or annual) for past 12 months.
   - Landlord's name and address.

3. **NHIS / Health Insurance:**
   - Policy document.
   - Annual premium receipt.

4. **Life Insurance:**
   - Policy document.
   - Annual premium receipts.

5. **Donations:**
   - Receipt from registered charity / NGO.
   - Proof of organization's registration with FIRS.

6. **Housing Loan Interest:**
   - Mortgage agreement.
   - Annual statement from lender showing interest paid.
   - Property ownership document.

**Retention:** Keep all receipts and documents for **6 years** (audit trail).

---

## 📋 FILING REQUIREMENTS & SCHEDULE

### Filing Obligation

**Annual Form IT 2101** (Individual Annual Tax Return)

**Who must file:**
- Individuals with chargeable income > ₦800,000 / year.
- Self-employed (turnover > ₦25M).
- Directors or officers.
- Optional: Individuals wanting refund (overpayment of PAYE).

**Deadline:** April 30 of following year (or extended by FIRS).

### Information to Include

- Personal details (TIN, NIN, name, address).
- Income breakdown (salary, business, rental, investment).
- Deductions claimed (pension, rent, donations, etc.).
- Calculated chargeable income.
- PIT due.
- PAYE already paid (via employer).
- Balance due or refund claimed.

### Employer's Role (PAYE)

Employers must:
- Deduct monthly PAYE based on employee salary.
- Remit to FIRS by 10th of following month.
- Issue PAYE certificate at year-end.

Employees should request PAYE certificate to validate employer's deduction.

---

## 🧮 IMPLEMENTATION PSEUDOCODE (Python-style)

```python
class PITEngine:
    """Personal Income Tax Engine for individuals."""
    
    def __init__(self, year: int, pit_bands: List[Dict]):
        self.year = year
        self.pit_bands = pit_bands  # Ordered list of band dicts
    
    def calculate_annual(self, payload: Dict) -> Dict:
        """
        Calculate annual PIT for an individual.
        
        Args:
            payload: {
                'gross_income': float,
                'pension': float,
                'annual_rent': float,
                'nhis_or_health': float,
                'nhf': float,
                'life_insurance': float,
                'approved_donations': float,
                'housing_loan_interest': float,
                'other_deductions': float
            }
        
        Returns:
            {
                'gross_income': float,
                'total_deductions': float,
                'chargeable_income': float,
                'annual_tax': float,
                'monthly_paye': float,
                'effective_rate': float,
                'bands_breakdown': [
                    {
                        'band': int,
                        'range': str,
                        'rate': float,
                        'amount_taxed': float,
                        'tax': float
                    },
                    ...
                ]
            }
        """
        gross = payload.get('gross_income', 0)
        
        # Calculate rent relief (capped at 500k)
        annual_rent = payload.get('annual_rent', 0)
        rent_relief = min(annual_rent * 0.20, 500000)
        
        # Total deductions
        total_ded = (
            payload.get('pension', 0) +
            rent_relief +
            payload.get('nhis_or_health', 0) +
            payload.get('nhf', 0) +
            payload.get('life_insurance', 0) +
            payload.get('approved_donations', 0) +
            payload.get('housing_loan_interest', 0) +
            payload.get('other_deductions', 0)
        )
        
        # Chargeable income
        chargeable = max(0, gross - total_ded)
        
        # Apply bands
        annual_tax = 0
        remaining = chargeable
        bands_breakdown = []
        
        for band in self.pit_bands:
            if remaining <= 0:
                break
            
            band_start = band['range_start']
            band_end = band['range_end']
            rate = band['rate']
            
            # Calculate taxable amount in this band
            taxable_in_band = min(remaining, band_end - band_start)
            tax_in_band = taxable_in_band * rate
            
            annual_tax += tax_in_band
            remaining -= taxable_in_band
            
            bands_breakdown.append({
                'band': band['band_number'],
                'range': f"₦{band_start:,} – ₦{band_end:,}",
                'rate': rate,
                'amount_taxed': taxable_in_band,
                'tax': tax_in_band
            })
        
        # Monthly PAYE
        monthly_paye = annual_tax / 12
        
        # Effective rate
        effective_rate = annual_tax / gross if gross > 0 else 0
        
        return {
            'gross_income': gross,
            'total_deductions': total_ded,
            'chargeable_income': chargeable,
            'annual_tax': round(annual_tax, 2),
            'monthly_paye': round(monthly_paye, 2),
            'effective_rate': round(effective_rate, 4),
            'bands_breakdown': bands_breakdown
        }
    
    def calculate_monthly(self, payload: Dict) -> Dict:
        """Wrapper for monthly calculation."""
        annual_result = self.calculate_annual(payload)
        return {
            **annual_result,
            'period': 'Monthly',
            'monthly_paye': annual_result['monthly_paye']
        }
```

---

## 📊 TEST CASES & EXAMPLES

### Test Case 1: Below Tax Threshold

**Input:**
- Gross: ₦700,000
- Pension: ₦0
- Rent: ₦0
- Other deductions: ₦0

**Expected Output:**
- Chargeable Income: ₦700,000
- Annual Tax: ₦0 (below ₦800k threshold)
- Monthly PAYE: ₦0
- Effective Rate: 0%

---

### Test Case 2: Mid-Range Earner with Deductions

**Input:**
- Gross: ₦5,000,000
- Pension: ₦400,000 (8% of salary)
- Annual Rent: ₦1,500,000
- NHIS: ₦0
- Donations: ₦100,000
- Other: ₦0

**Expected Output:**
- Total Deductions: ₦1,000,000
  - Rent relief: ₦500,000 (capped)
  - Pension: ₦400,000
  - Donations: ₦100,000
- Chargeable Income: ₦4,000,000
- Tax Bands Applied:
  - Band 1: ₦0 (0% on ₦800k)
  - Band 2: ₦330,000 (15% on ₦2.2M)
  - Band 3: ₦180,000 (18% on ₦1M)
- Annual Tax: ₦510,000
- Monthly PAYE: ₦42,500
- Effective Rate: 10.2%

---

### Test Case 3: High Earner (Multiple Bands)

**Input:**
- Gross: ₦30,000,000
- Pension: ₦2,000,000
- Rent: ₦2,000,000 (paid annually)
- NHIS: ₦100,000
- Donations: ₦500,000
- Loan Interest: ₦300,000

**Expected Output:**
- Total Deductions: ₦5,400,000
  - Rent relief: ₦400,000 (20% × ₦2M = ₦400k, under cap)
  - Others as input
- Chargeable Income: ₦24,600,000
- Tax Bands Applied:
  - Band 1: ₦0 (0% on ₦800k)
  - Band 2: ₦330,000 (15% on ₦2.2M)
  - Band 3: ₦1,620,000 (18% on ₦9M)
  - Band 4: ₦2,940,000 (21% on ₦14M, but only ₦12.6M available)
- Annual Tax: ₦4,890,000
- Monthly PAYE: ₦407,500
- Effective Rate: 16.3%

---

### Test Case 4: Self-Employed with Loss Carryforward

**Input (Year 2025):**
- Business Revenue: ₦8,000,000
- Business Expenses (documented): ₦10,000,000
- Net Business Income: -₦2,000,000 (loss)
- Other Income: ₦500,000

**Expected Output:**
- Gross Income: ₦500,000
- Chargeable Income: ₦500,000
- Annual Tax: ₦0 (below ₦800k)
- Loss Carryforward: ₦2,000,000 (to offset future profits)

---

## 🔗 API ENDPOINTS (PIT Section)

### POST /api/tax-engine/pit/calculate-annual

Calculate annual PIT for an individual.

**Request:**
```json
{
  "year": 2025,
  "grossIncome": 5000000,
  "pension": 400000,
  "annualRent": 1500000,
  "nhisOrHealth": 0,
  "nhf": 0,
  "lifeInsurance": 0,
  "approvedDonations": 100000,
  "housingLoanInterest": 0,
  "otherApprovedDeductions": 0
}
```

**Response:**
```json
{
  "grossIncome": 5000000,
  "totalDeductions": 1000000,
  "chargeableIncome": 4000000,
  "annualTax": 510000,
  "monthlyPAYE": 42500,
  "effectiveRate": 0.102,
  "bandsBreakdown": [
    {
      "band": 1,
      "range": "₦0 – ₦800,000",
      "rate": 0,
      "amountTaxed": 800000,
      "tax": 0
    },
    {
      "band": 2,
      "range": "₦800,001 – ₦3,000,000",
      "rate": 0.15,
      "amountTaxed": 2200000,
      "tax": 330000
    },
    {
      "band": 3,
      "range": "₦3,000,001 – ₦12,000,000",
      "rate": 0.18,
      "amountTaxed": 1000000,
      "tax": 180000
    }
  ]
}
```

---

### POST /api/tax-engine/pit/calculate-monthly

Calculate monthly PAYE (wrapper around annual calculation).

**Request:** Same as annual.

**Response:** Same as annual + `"period": "Monthly"`.

---

### GET /api/tax-engine/pit/history

Retrieve calculation history for an individual.

**Query Parameters:**
- `individualId` (required)
- `year` (optional; defaults to current year)

**Response:**
```json
{
  "individualId": "IND-12345",
  "year": 2025,
  "calculations": [
    {
      "calculationId": "CALC-001",
      "createdAt": "2025-01-15T10:30:00Z",
      "grossIncome": 5000000,
      "annualTax": 510000,
      "monthlyPAYE": 42500
    }
  ]
}
```

---

### GET /api/tax-engine/section/PIT-2025-NG

Retrieve current PIT rules and bands for the year.

**Response:**
```json
{
  "code": "PIT-2025-NG",
  "name": "Personal Income Tax (PAYE)",
  "version": "1.0",
  "effectiveDate": "2025-01-01",
  "bands": [
    { "band": 1, "range_start": 0, "range_end": 800000, "rate": 0 },
    { "band": 2, "range_start": 800001, "range_end": 3000000, "rate": 0.15 },
    { "band": 3, "range_start": 3000001, "range_end": 12000000, "rate": 0.18 },
    { "band": 4, "range_start": 12000001, "range_end": 25000000, "rate": 0.21 },
    { "band": 5, "range_start": 25000001, "range_end": 50000000, "rate": 0.23 },
    { "band": 6, "range_start": 50000001, "range_end": 999999999, "rate": 0.25 }
  ]
}
```

---

## 📦 DATABASE SCHEMA (PIT TABLES)

### Table: individual_profiles

Store individual taxpayer information.

```sql
CREATE TABLE individual_profiles (
  id SERIAL PRIMARY KEY,
  tin VARCHAR(20) UNIQUE,
  nin VARCHAR(20) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  residency_state VARCHAR(100),
  is_resident BOOLEAN DEFAULT TRUE,
  dob DATE,
  email VARCHAR(255),
  phone VARCHAR(20),
  employer_name VARCHAR(255),
  employment_status ENUM('employed', 'self_employed', 'both'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table: individual_income

Record income sources per year.

```sql
CREATE TABLE individual_income (
  id SERIAL PRIMARY KEY,
  individual_id INT REFERENCES individual_profiles(id),
  year INT NOT NULL,
  salary_income DECIMAL(15, 2) DEFAULT 0,
  business_income DECIMAL(15, 2) DEFAULT 0,
  rental_income DECIMAL(15, 2) DEFAULT 0,
  investment_income DECIMAL(15, 2) DEFAULT 0,
  other_income DECIMAL(15, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(individual_id, year)
);
```

### Table: individual_deductions

Record deductions claimed per year.

```sql
CREATE TABLE individual_deductions (
  id SERIAL PRIMARY KEY,
  individual_id INT REFERENCES individual_profiles(id),
  year INT NOT NULL,
  pension_contribution DECIMAL(12, 2) DEFAULT 0,
  rent_relief DECIMAL(12, 2) DEFAULT 0,
  nhis_or_health DECIMAL(12, 2) DEFAULT 0,
  nhf DECIMAL(12, 2) DEFAULT 0,
  life_insurance_premium DECIMAL(12, 2) DEFAULT 0,
  approved_donations DECIMAL(12, 2) DEFAULT 0,
  housing_loan_interest DECIMAL(12, 2) DEFAULT 0,
  other_approved_deductions DECIMAL(12, 2) DEFAULT 0,
  total_deductions DECIMAL(12, 2) GENERATED ALWAYS AS 
    (pension_contribution + rent_relief + nhis_or_health + nhf + 
     life_insurance_premium + approved_donations + housing_loan_interest + 
     other_approved_deductions) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(individual_id, year)
);
```

### Table: pit_calculations

Store calculation results and history.

```sql
CREATE TABLE pit_calculations (
  id SERIAL PRIMARY KEY,
  individual_id INT REFERENCES individual_profiles(id),
  year INT NOT NULL,
  gross_income DECIMAL(15, 2),
  total_deductions DECIMAL(12, 2),
  chargeable_income DECIMAL(15, 2),
  annual_tax DECIMAL(15, 2),
  monthly_paye DECIMAL(12, 2),
  effective_rate DECIMAL(5, 4),
  bands_breakdown JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ✅ VALIDATION RULES

- **Gross income:** Must be ≥ 0.
- **Pension:** Should not exceed 30% of salary (reasonable check).
- **Rent relief:** Auto-capped at ₦500,000 by engine.
- **Donations:** Cannot exceed 10% of chargeable income.
- **Annual rent:** Must be ≥ 0 if rent relief claimed.
- **Year:** Must be valid tax year (2020–2030 range).
- **Deductions:** All must have supporting documentation.

---

## 🔄 ANNUAL FILING WORKFLOW

1. **January–March:** Individual collects income & deduction documents.
2. **End of March:** Individual (or employer) compiles income + deductions.
3. **Early April:** Calls `/pit/calculate-annual` to determine tax liability.
4. **By April 30:** Individual files Form IT 2101 with FIRS + supporting docs.
5. **FIRS Assessment:** FIRS validates return; issues notice if overpayment (refund) or underpayment (demand).
6. **Payment / Refund:** Individual settles demand or receives refund within 30 days.

---

## 📞 COMMON QUESTIONS & ANSWERS

**Q: What if my income is exactly ₦800,000?**  
A: Tax is ₦0 (first band is exempt up to ₦800k).

**Q: Can I claim rent relief without a tenancy agreement?**  
A: No; FIRS audit requires tenancy agreement + rent receipts (6-year retention).

**Q: What if I am self-employed and made a loss?**  
A: Loss carries forward up to 4 years; can offset future profits before applying bands.

**Q: When should I file if my employer deducted PAYE?**  
A: By April 30, even if taxes were deducted; allows for deduction of all eligible reliefs & possible refund.

**Q: What is "final tax" on investments?**  
A: Some investment income (e.g., certain dividends) is taxed once at source; not included in PIT calculation.

---

## 🚀 INTEGRATION NOTES

- Section 10 is **independent** of Sections 1–9 (company taxes).
- Uses separate tables (`individual_*`, `pit_*`).
- API endpoints prefixed `/pit/` (distinct from `/cit/`, `/vat/`, etc.).
- Data isolation ensures individuals and companies are never mixed.
- Same modular update process: if FIRS changes bands, update `tax_rules` entry for `PIT-2025-NG` + re-run tests.

---

**End of Section 10: Personal Income Tax (PIT) Engine**

