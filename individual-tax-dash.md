# INDIVIDUAL TAX DASHBOARD - BUTTON FLOWS & INTERCONNECTIONS

**Version:** 1.0  
**Product:** TaxGee Pro  
**Pages:** Dashboard > Individual Tax  
**Date:** December 30, 2025  
**Status:** Implementation Guide  

---

## TABLE OF CONTENTS

### PART A: INDIVIDUAL TAX DASHBOARD
1. [Page Overview](#part-a-page-overview)
2. [Header Action Buttons](#part-a-header-buttons)
3. [Tax Overview Cards](#part-a-overview-cards)
4. [Income Summary Section](#part-a-income-section)
5. [Deductions & Relief Section](#part-a-deductions-section)
6. [Tax Liability Section](#part-a-liability-section)
7. [Filing & Compliance Section](#part-a-filing-section)
8. [Side Panels & Quick Actions](#part-a-side-panels)

### PART B: INTEGRATION
9. [Data Flow from Other Modules](#part-b-data-flow)
10. [Page Interconnections](#part-b-interconnections)
11. [State Management](#part-b-state-management)
12. [API Endpoints](#part-b-api-endpoints)
13. [Error Handling](#part-b-error-handling)
14. [Implementation Checklist](#part-b-checklist)

---

---

# PART A: INDIVIDUAL TAX DASHBOARD

---

## PART A: PAGE OVERVIEW

### Purpose

The **Individual Tax Dashboard** is the personal tax hub where individuals can:
- Track personal income from employment and self-employment
- Manage tax reliefs and allowances (CRA1, CRA2, pension contributions)
- Monitor tax liability in real-time
- File personal income tax returns (PAYE or Direct Assessment)
- Track FIRS filing status and Tax Identification Number (TIN)
- Plan ahead with tax estimates and payment schedules

### Key Features

- Real-time tax liability calculation (Personal Income Tax Act compliant)
- PAYE and Direct Assessment return filing
- Income source tracking (salary, business, investment, rental)
- Consolidated Relief Allowance (CRA) calculation and optimization
- Tax withholding tracker (WHT on salary, investments, rentals)
- Progressive tax band application (7% to 24%)
- FIRS TaxPro Max integration for return submission
- Tax payment scheduling and reminders
- Historical filing records and tax clearance tracking
- Scenario modeling (tax estimates for planning)

### Page Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] TaxGee    [Search]  [🔔 Notify]  [Gee-AI]  [👤 Profile] │ ← Top Bar
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ┌──── Dashboard Header ──────────────────────────────────────┐ │
│ │ Individual Tax Dashboard                                   │ │
│ │ Manage your personal income tax & compliance               │ │
│ │                                                            │ │
│ │ [View Tax Summary] [File Return] [Pay Tax] [📈 Estimate]  │ │
│ │ [Settings] [Help]                                         │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Tax Overview Cards ────────────────────────────────────┐ │
│ │                                                            │ │
│ │ ┌─────────────────┐  ┌─────────────────┐                 │ │
│ │ │ Total Income    │  │ Tax Liability   │                 │ │
│ │ │ ₦24,500,000    │  │ ₦4,123,000      │                 │ │
│ │ │ YTD (2025)      │  │ Est. for Year   │                 │ │
│ │ └─────────────────┘  └─────────────────┘                 │ │
│ │                                                            │ │
│ │ ┌─────────────────┐  ┌─────────────────┐                 │ │
│ │ │ Tax Paid/WHT    │  │ Tax Balance Due │                 │ │
│ │ │ ₦2,500,000      │  │ ₦1,623,000      │                 │ │
│ │ │ From Salary     │  │ Due by 31 Mar   │                 │ │
│ │ └─────────────────┘  └─────────────────┘                 │ │
│ │                                                            │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Income Summary ────────────────────────────────────────┐ │
│ │ Employment Income:      ₦18,000,000                        │ │
│ │ Self-Employment Income: ₦5,200,000                         │ │
│ │ Investment Income:      ₦1,300,000                         │ │
│ │ [View Detail Breakdown]                                   │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Deductions & Relief ────────────────────────────────────┐ │
│ │ Consolidated Relief (CRA): ₦4,350,000                      │ │
│ │ Pension Contributions:     ₦2,160,000                      │ │
│ │ Personal Exemptions:       ₦200,000 (Base Relief)          │ │
│ │ [View Calculation] [Optimize]                              │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Tax Calculation Breakdown ─────────────────────────────┐ │
│ │ Gross Income:            ₦24,500,000                       │ │
│ │ Less: CRA & Relief:      -₦4,350,000                       │ │
│ │ Taxable Income:          ₦20,150,000                       │ │
│ │ Tax @ Progressive Rates: ₦4,123,000 (16.9% eff. rate)     │ │
│ │ Less: WHT Already Paid:  -₦2,500,000                       │ │
│ │ ═════════════════════════════════════════════════════════│ │
│ │ BALANCE DUE (by 31 Mar): ₦1,623,000                       │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Filing & Compliance ────────────────────────────────────┐ │
│ │ Status: ⚠️ Due Soon                                        │ │
│ │ Filing Deadline: 31 March 2026                             │ │
│ │ Days Remaining: 92                                         │ │
│ │ Return Type: Direct Assessment (Self-Employed)            │ │
│ │                                                            │ │
│ │ [Start Filing] [View Instructions] [Get Help]             │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌────────────────────┐  ┌───────────────────────────────────┐ │
│ │ TIN & Profile      │  │ Recent Actions                    │ │
│ │ TIN: [TIN-XXXXX]   │  │ • Income synced: 2h ago          │ │
│ │ Name: John Doe     │  │ • WHT recorded: 5 Dec 2025       │ │
│ │ Status: ✓ Active   │  │ • Tax estimated: 3 Dec 2025      │ │
│ │ [View Profile]     │  │ [View All]                       │ │
│ │                    │  │                                   │ │
│ └────────────────────┘  └───────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## PART A: HEADER BUTTONS

### A.1 View Tax Summary Button

**Component:** `ViewTaxSummaryButton`  
**Type:** Primary Button  
**Location:** Page header, left  
**Label:** "View Tax Summary"

#### Button Specification

```typescript
interface ViewTaxSummaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
```

#### Flow: User Clicks [View Tax Summary]

```
1. User clicks [View Tax Summary]
   ↓
2. Navigate to /personal/individual-tax/summary
   OR open side panel: Tax Summary Detail
   ↓
3. Tax Summary page displays:
   ├─ ANNUAL SUMMARY (Current Year)
   │  ├─ Tax Year: 2025
   │  ├─ Total Gross Income: ₦24,500,000
   │  ├─ Total Deductions: ₦4,350,000
   │  ├─ Taxable Income: ₦20,150,000
   │  ├─ Total Tax Liability: ₦4,123,000
   │  ├─ Tax Paid (WHT): ₦2,500,000
   │  ├─ Tax Due/Refund: ₦1,623,000 (Due)
   │  └─ Filing Status: ⚠️ Not Yet Filed
   │
   ├─ INCOME BREAKDOWN
   │  ├─ Employment Income
   │  │  ├─ Salary: ₦18,000,000
   │  │  ├─ Allowances: ₦2,100,000
   │  │  ├─ Bonuses: ₦500,000
   │  │  └─ Total: ₦20,600,000
   │  │
   │  ├─ Self-Employment Income
   │  │  ├─ Net Profit: ₦5,200,000
   │  │  └─ Source: Consulting
   │  │
   │  ├─ Investment Income
   │  │  ├─ Dividend: ₦800,000
   │  │  ├─ Interest: ₦500,000
   │  │  └─ Rental Income: ₦0
   │  │
   │  └─ [View Detailed Breakdown]
   │
   ├─ RELIEF & DEDUCTION CALCULATION
   │  ├─ CRA1: ₦200,000 (Fixed minimum relief)
   │  ├─ CRA2 (20% of Gross): ₦4,920,000
   │  │  ├─ Calculation: 20% × (₦24,500,000 - ₦130,000 pension)
   │  │  └─ = ₦4,874,000 (using actual formula)
   │  ├─ Applied CRA: ₦4,350,000 (20% of gross)
   │  ├─ Pension Contributions: ₦130,000 (deducted from gross)
   │  └─ [View Relief Calculation]
   │
   ├─ TAX CALCULATION DETAILS
   │  ├─ Progressive Tax Bands Applied:
   │  │  ├─ ₦0 - ₦300,000 @ 7%:     ₦21,000
   │  │  ├─ ₦300,001 - ₦600,000 @ 11%: ₦33,000
   │  │  ├─ ₦600,001 - ₦1,100,000 @ 15%: ₦75,000
   │  │  ├─ ₦1,100,001 - ₦1,600,000 @ 19%: ₦95,000
   │  │  ├─ ₦1,600,001 - ₦2,100,000 @ 21%: ₦105,000
   │  │  └─ ₦2,100,001+ @ 24%: ₦3,794,000
   │  │
   │  ├─ Total Tax Before Relief: ₦4,123,000
   │  ├─ Less: WHT Paid: ₦2,500,000
   │  └─ Balance Due: ₦1,623,000
   │
   ├─ WHT (WITHHOLDING TAX) SUMMARY
   │  ├─ From Salary: ₦2,100,000
   │  ├─ From Dividends: ₦160,000
   │  ├─ From Interest: ₦100,000
   │  ├─ From Rental: ₦0
   │  ├─ From Contracts: ₦140,000
   │  └─ Total WHT: ₦2,500,000
   │
   ├─ FILING HISTORY
   │  ├─ Last Return Filed: March 30, 2025
   │  ├─ Return Type: Direct Assessment
   │  ├─ DIN (Last Year): DIN-2024-0001
   │  ├─ Status: ✓ Accepted by FIRS
   │  ├─ Tax Paid: ₦3,850,000
   │  └─ [View Last Return]
   │
   ├─ COMPARATIVE ANALYSIS
   │  ├─ Current Year vs Last Year:
   │  │  ├─ Income Change: +8.5% (₦24.5M vs ₦22.6M)
   │  │  ├─ Tax Liability Change: +6.2%
   │  │  ├─ Effective Tax Rate: 16.9% (down from 17.0%)
   │  │  └─ [View Year-over-Year]
   │  │
   │  └─ [Export Comparison Report]
   │
   ├─ ACTIONS
   │  ├─ [File Return Now]
   │  ├─ [Pay Tax Due]
   │  ├─ [Export Summary]
   │  ├─ [Email to Accountant]
   │  ├─ [Scenario Planning]
   │  └─ [Back to Dashboard]
   │
   └─ COMPLIANCE STATUS
      ├─ TIN: ✓ Valid
      ├─ Filing Deadline: 31 Mar 2026 (92 days remaining)
      ├─ Tax Status: ⚠️ Due (₦1,623,000)
      └─ Recommended Action: File return & pay by deadline
```

#### Integration Points

- **Data sources:** GET /api/personal/income, GET /api/personal/deductions, GET /api/personal/wht
- **Calculations:** Tax liability, relief allowances, progressive bands
- **Related:** Filing hub, payment processing, accountant sharing

#### Success Criteria

✅ Summary displays complete tax picture  
✅ All income sources show  
✅ Relief calculation accurate  
✅ Progressive tax bands applied correctly  
✅ WHT summary correct  
✅ Can file directly  
✅ Can pay directly  
✅ Can export/share  

---

### A.2 File Return Button

**Component:** `FileReturnButton`  
**Type:** Primary Button  
**Location:** Page header, center-left  
**Label:** "File Return"

#### Button Specification

```typescript
interface FileReturnButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
```

#### Flow: User Clicks [File Return]

```
1. User clicks [File Return]
   ↓
2. File Return Wizard opens (similar to Filing Hub but for individual)
   
   STEP 1: RETURN TYPE & PERIOD SELECTION
   ├─ Return Type:
   │  ○ PAYE Return (for employed individuals)
   │  ├─ Filed by: Employer on your behalf
   │  └─ You receive: Tax certificate
   │
   │  ○ Direct Assessment (for self-employed)
   │  ├─ Filed by: You (individual) personally
   │  └─ Deadline: 31 March (following fiscal year)
   │
   │  ○ Combined Return (employed + self-employed)
   │  ├─ Filed by: You personally
   │  └─ Includes: Salary + Business Income
   │
   ├─ Tax Year: [2025 ▼] (current year)
   ├─ Filing Status: ○ Original ○ Amended (if filing again)
   │
   └─ [Next] [Cancel]
   ↓
3. User selects return type (e.g., "Direct Assessment" for 2025)
   └─ [Next]
   ↓
   
   STEP 2: INCOME DECLARATION
   ├─ EMPLOYMENT INCOME (if applicable)
   │  ├─ Employer: [______________________]
   │  ├─ Monthly Salary: [₦ ______________]
   │  ├─ Allowances: [₦ ______________]
   │  │  ├─ Housing Allowance
   │  │  ├─ Transport Allowance
   │  │  ├─ Leave Allowance
   │  │  └─ [Add More]
   │  ├─ Bonuses/Incentives: [₦ ______________]
   │  ├─ Total Employment Income: [₦24,500,000] (auto-calculated)
   │  └─ [Add Another Employer] [Edit]
   │
   ├─ SELF-EMPLOYMENT INCOME
   │  ├─ Business Name: [Consulting Services__]
   │  ├─ Business Type: [Professional Services ▼]
   │  ├─ Income Sources:
   │  │  ├─ Service Income: [₦5,200,000]
   │  │  ├─ Project Fees: [₦0]
   │  │  └─ Other: [₦0]
   │  ├─ Gross Income: [₦5,200,000]
   │  ├─ [Attach Accounts/Statement]
   │  └─ [Add Another Business]
   │
   ├─ INVESTMENT INCOME
   │  ├─ Dividend Income: [₦800,000]
   │  │  ├─ Company: [ABC Plc ▼]
   │  │  ├─ Amount: [₦800,000]
   │  │  ├─ WHT Paid: [₦160,000]
   │  │  └─ [Add Dividend]
   │  │
   │  ├─ Interest Income: [₦500,000]
   │  │  ├─ Bank: [GTB ▼]
   │  │  ├─ Amount: [₦500,000]
   │  │  ├─ WHT Paid: [₦100,000]
   │  │  └─ [Add Interest]
   │  │
   │  └─ Rental Income: [₦0]
   │     ├─ Property Address: [Optional]
   │     ├─ Amount: [₦0]
   │     └─ [Add Rental]
   │
   ├─ TOTAL INCOME SUMMARY
   │  ├─ Employment: ₦24,500,000
   │  ├─ Self-Employment: ₦5,200,000
   │  ├─ Investment: ₦1,300,000
   │  └─ GROSS TOTAL: ₦31,000,000
   │
   ├─ DATA VERIFICATION
   │  ├─ Income from employment verified with employer: [Yes/No]
   │  ├─ Dividend certificates attached: [Yes/No]
   │  ├─ All sources included: [Yes/No]
   │  └─ [Sync From Bank Feeds] (if available)
   │
   └─ [Previous] [Next] [Cancel]
   ↓
4. User verifies income and clicks [Next]
   ↓
   
   STEP 3: RELIEFS & DEDUCTIONS
   ├─ CONSOLIDATED RELIEF ALLOWANCE (CRA)
   │  ├─ CRA1 Calculation:
   │  │  ├─ Option A: Fixed ₦200,000
   │  │  ├─ Option B: 1% of Gross Income = ₦310,000
   │  │  ├─ Applied: ₦310,000 (higher of two) ✓
   │  │  └─ [View Calculation]
   │  │
   │  ├─ CRA2 Calculation:
   │  │  ├─ Formula: 20% × (Gross Income - Pension)
   │  │  ├─ = 20% × (₦31,000,000 - ₦130,000)
   │  │  ├─ = ₦6,174,000
   │  │  └─ [View Calculation]
   │  │
   │  ├─ Total CRA: ₦6,174,000
   │  └─ [Optimize CRA] (show impact of pension changes)
   │
   ├─ PENSION CONTRIBUTIONS
   │  ├─ RSA (Retirement Savings Account): [₦130,000] (auto from payroll)
   │  ├─ Voluntary Pension: [₦0]
   │  ├─ Total Pension: [₦130,000]
   │  ├─ Note: Deducted before tax calculation
   │  └─ [Verify Pension Records]
   │
   ├─ STANDARD DEDUCTIONS
   │  ├─ Personal Exemption: ₦200,000 (already applied)
   │  └─ Note: Included in CRA calculation
   │
   ├─ OPTIONAL DEDUCTIONS (if applicable)
   │  ├─ ☑ Life Insurance Premiums: [₦___________]
   │  ├─ ☑ Professional Subscriptions: [₦___________]
   │  ├─ ☑ Business Expenses (Self-Employed): [₦___________]
   │  └─ [Add Other Approved Deductions]
   │
   ├─ CONSOLIDATED SUMMARY
   │  ├─ Gross Income: ₦31,000,000
   │  ├─ Less: CRA: -₦6,174,000
   │  ├─ Less: Optional Deductions: -₦0
   │  ├─ Taxable Income: ₦24,826,000
   │  └─ (Recalculated as user changes values)
   │
   └─ [Previous] [Next] [Cancel]
   ↓
5. User reviews reliefs and clicks [Next]
   ↓
   
   STEP 4: TAX CALCULATION & WHT
   ├─ TAXABLE INCOME RECAP
   │  ├─ Gross Income: ₦31,000,000
   │  ├─ Less: CRA: -₦6,174,000
   │  ├─ Taxable Income: ₦24,826,000
   │  └─ Tax Rate Structure: Progressive (7%-24%)
   │
   ├─ PROGRESSIVE TAX CALCULATION
   │  ├─ ₦0 - ₦300,000 @ 7%: ₦21,000
   │  ├─ ₦300,001 - ₦600,000 @ 11%: ₦33,000
   │  ├─ ₦600,001 - ₦1,100,000 @ 15%: ₦75,000
   │  ├─ ₦1,100,001 - ₦1,600,000 @ 19%: ₦95,000
   │  ├─ ₦1,600,001 - ₦2,100,000 @ 21%: ₦105,000
   │  ├─ ₦2,100,001 - ₦3,100,000 @ 24%: ₦240,000
   │  └─ ₦3,100,001+ @ 24%: ₦4,971,600
   │
   ├─ TOTAL TAX LIABILITY: ₦5,540,600
   │
   ├─ WITHHOLDING TAX (WHT) SUMMARY
   │  ├─ WHT from Salary: ₦2,100,000
   │  │  ├─ Employer: ABC Corp Ltd
   │  │  ├─ Months: Jan-Dec 2025
   │  │  └─ Certificate: ✓ Attached
   │  │
   │  ├─ WHT from Investment:
   │  │  ├─ Dividends: ₦160,000
   │  │  ├─ Interest: ₦100,000
   │  │  └─ Subtotal: ₦260,000
   │  │
   │  ├─ WHT from Contracts: ₦140,000
   │  │
   │  └─ TOTAL WHT PAID: ₦2,500,000
   │
   ├─ TAX COMPUTATION
   │  ├─ Total Tax Liability: ₦5,540,600
   │  ├─ Less: WHT Paid: -₦2,500,000
   │  ├─ Less: Tax Paid Directly: -₦400,000 (if any)
   │  ├─ ═════════════════════════════════════
   │  ├─ BALANCE DUE (to FIRS): ₦2,640,600
   │  │
   │  └─ OR
   │  ├─ REFUND DUE (if WHT > liability): ₦0
   │
   ├─ EFFECTIVE TAX RATE
   │  ├─ Effective Rate: 17.87% (5,540,600 ÷ 31,000,000)
   │  └─ National Average: ~16.5%
   │
   ├─ PAYMENT ARRANGEMENT
   │  ├─ Amount Due: ₦2,640,600
   │  ├─ Payment Deadline: 31 March 2026
   │  ├─ Suggested Payment Date: 28 March 2026
   │  └─ Can pay via: [Paystack] [Bank Transfer] [Direct FIRS]
   │
   └─ [Previous] [Next] [Cancel]
   ↓
6. User reviews calculations and clicks [Next]
   ↓
   
   STEP 5: FINAL REVIEW & SUBMISSION
   ├─ DECLARATION & ACCURACY CHECK
   │  ├─ ☑ I declare that information provided is true and correct
   │  ├─ ☑ I have attached all supporting documents
   │  ├─ ☑ I have no outstanding FIRS disputes or penalties
   │  ├─ ☑ I authorize TaxGee to submit to FIRS
   │  └─ Authorized By: [Name: John Doe] [Signature: _____]
   │
   ├─ RETURN SUMMARY AT A GLANCE
   │  ├─ Return Type: Direct Assessment
   │  ├─ Tax Year: 2025
   │  ├─ Gross Income: ₦31,000,000
   │  ├─ Taxable Income: ₦24,826,000
   │  ├─ Total Tax: ₦5,540,600
   │  ├─ WHT Paid: ₦2,500,000
   │  ├─ Balance Due: ₦2,640,600
   │  ├─ Effective Rate: 17.87%
   │  └─ Filing Deadline: 31 Mar 2026 (92 days)
   │
   ├─ SUPPORTING DOCUMENTS ATTACHED
   │  ├─ ✓ Salary Certificate / Payslips
   │  ├─ ✓ Income Tax Return Form (Form A)
   │  ├─ ✓ WHT Certificates
   │  ├─ ✓ Business Accounts (if self-employed)
   │  ├─ ✓ Bank Statements (supporting)
   │  └─ [Add/Remove Documents]
   │
   ├─ SUBMISSION METHOD
   │  ├─ Method: FIRS TaxPro Max API (Automatic)
   │  │  ├─ Direct submission to FIRS
   │  │  ├─ Receive DIN immediately
   │  │  └─ Get filing receipt
   │  │
   │  └─ Alternative: Manual (Print & Submit)
   │     ├─ Print Return Form
   │     ├─ Attach documents
   │     ├─ Submit to FIRS office
   │     └─ Get DIN receipt
   │
   ├─ PAYMENT OPTIONS (Due within 30 days of filing)
   │  ├─ [Pay Now via Paystack] - Process immediately
   │  │  ├─ ₦2,640,600 charge applied
   │  │  └─ Receipt generated
   │  │
   │  ├─ [Pay Later] - Get DIN, pay by 31 Mar
   │  │  ├─ DIN issued without payment
   │  │  ├─ Can pay anytime before deadline
   │  │  └─ Receipt issued on payment
   │  │
   │  └─ [Schedule Payment Plan] - Pay in installments (if available)
   │     ├─ Available for amounts > ₦1M
   │     └─ Contact FIRS for approval
   │
   └─ [Previous] [File Now] [Save as Draft] [Cancel]
   ↓
7. User decides to:
   
   A) [File Now]:
      ├─ Dialog: "Submit Return to FIRS?"
      ├─ Message: "Once submitted, cannot be edited. Download copy?"
      ├─ [Cancel] [Download & File] [Just File]
      │
      ├─ POST /api/personal/income-tax/file
         {
           returnType: "direct_assessment",
           taxYear: 2025,
           income: {...},
           reliefs: {...},
           wht: {...},
           attachments: [...]
         }
      │
      ├─ Backend:
      │  ├─ Validate all data against FIRS rules
      │  ├─ Verify TIN and taxpayer status
      │  ├─ Generate Form A (Income Tax Return)
      │  ├─ Integrate FIRS TaxPro Max API
      │  ├─ Submit return to FIRS
      │  ├─ Receive DIN (Unique document ID)
      │  ├─ Generate filing receipt
      │  └─ Create tax clearance request
      │
      ├─ Response: {
        returnId,
        din: "DIN-2025-0001",
        status: "filed",
        filedDate,
        receiptUrl,
        amountDue: 2640600
      }
      │
      ├─ File Success Page:
      │  ├─ ✓ Return Filed Successfully!
      │  ├─ DIN: DIN-2025-0001
      │  ├─ Status: Submitted to FIRS
      │  ├─ Amount Due: ₦2,640,600
      │  ├─ Payment Deadline: 31 March 2026
      │  │
      │  ├─ Actions:
      │  │  ├─ [Pay Tax Now]
      │  │  ├─ [Download Receipt]
      │  │  ├─ [Download Return Copy]
      │  │  ├─ [Email to Accountant]
      │  │  └─ [Back to Dashboard]
      │  │
      │  └─ Notification:
      │     ├─ Email sent with DIN and receipt
      │     └─ SMS reminder set for payment deadline
   
   B) [Save as Draft]:
      ├─ POST /api/personal/income-tax/returns
         {draft: true, ...data}
      ├─ Return saved with status "draft"
      ├─ Can be edited and filed later
      ├─ Toast: "✓ Return saved as draft"
      └─ Return to dashboard
```

#### Integration Points

- **API endpoints:**
  - POST /api/personal/income-tax/file (submit)
  - POST /api/personal/income-tax/returns (save draft)
  - GET /api/personal/income (fetch income data)
  - GET /api/personal/reliefs (fetch deductions)
  - GET /api/personal/wht (fetch withholding data)
  - GET /api/personal/tax-rate-tables (progressive bands)
- **FIRS integration:** TaxPro Max API for return submission
- **Payment:** Paystack for tax payment
- **Data sources:** Employer payroll, bank statements, investment records

#### Success Criteria

✅ All return types supported (PAYE, Direct Assessment, Combined)  
✅ Income from all sources captures correctly  
✅ Relief calculation accurate per PITA rules  
✅ Progressive tax bands applied correctly  
✅ WHT crediting works  
✅ Form generation correct  
✅ FIRS submission successful  
✅ DIN generated  
✅ Payment processes  
✅ Draft saving works  
✅ Email confirmations sent  

---

### A.3 Pay Tax Button

**Component:** `PayTaxButton`  
**Type:** Primary Action Button  
**Location:** Page header, center  
**Label:** "Pay Tax"

#### Button Specification

```typescript
interface PayTaxButtonProps {
  amount: number;
  disabled?: boolean;
  onClick: () => void;
}
```

#### Flow: User Clicks [Pay Tax]

```
1. User clicks [Pay Tax]
   ├─ Check if amount due exists
   ├─ If balance due = 0: Show "No balance due" message
   └─ If balance due > 0: Open payment flow
   ↓
2. Payment Modal Opens: "Pay Tax to FIRS"
   ├─ Amount Due: ₦2,640,600
   ├─ Due Date: 31 March 2026
   ├─ Days Remaining: 92
   ├─ Return DIN: DIN-2025-0001
   │
   └─ Payment Methods:
      ├─ ○ Paystack (Instant)
      │  ├─ Fee: ₦5,281 (0.2% + ₦100)
      │  ├─ You Pay: ₦2,645,881
      │  └─ Processing: Immediate
      │
      ├─ ○ Bank Transfer (FIRS Account)
      │  ├─ Fee: None
      │  ├─ Account: [GTB: 0121234567 - FRS]
      │  ├─ You Pay: ₦2,640,600
      │  └─ Processing: 1-3 days
      │
      └─ ○ Direct FIRS Payment (at office)
         ├─ Fee: None
         ├─ Location: Nearest FIRS office
         ├─ You Pay: ₦2,640,600
         └─ Processing: Get receipt same day
   ↓
3A. USER SELECTS: Paystack
   ├─ [Choose Paystack]
   ├─ Redirect to Paystack payment gateway
   │  ├─ Email: user@example.com
   │  ├─ Amount: ₦2,645,881
   │  ├─ Description: "Tax Payment DIN-2025-0001"
   │  └─ Reference: TAX-2025-12345
   │
   ├─ User completes payment on Paystack
   ├─ Paystack returns to app with status
   │
   ├─ Backend processes:
   │  ├─ POST /api/personal/tax-payment
   │  │  {
   │  │    returnId: "...",
   │  │    amount: 2640600,
   │  │    method: "paystack",
   │  │    transactionRef: "..."
   │  │  }
   │  │
   │  ├─ Validate payment
   │  ├─ Update return status to "paid"
   │  ├─ Generate payment receipt
   │  ├─ Submit payment receipt to FIRS
   │  └─ Issue tax clearance certificate
   │
   ├─ Success Page:
   │  ├─ ✓ Payment Successful!
   │  ├─ Amount Paid: ₦2,640,600
   │  ├─ Transaction ID: TXN-12345
   │  ├─ Date: 30 Dec 2025 3:45 PM
   │  │
   │  ├─ Actions:
   │  │  ├─ [Download Receipt]
   │  │  ├─ [Download Tax Clearance]
   │  │  ├─ [Email Receipt]
   │  │  └─ [Back to Dashboard]
   │  │
   │  └─ Notifications:
   │     ├─ Email confirmation sent
   │     ├─ SMS confirmation sent
   │     └─ Tax status updated on dashboard
   ↓
3B. USER SELECTS: Bank Transfer
   ├─ [Choose Bank Transfer]
   ├─ Show Bank Details:
   │  ├─ Bank: Guaranty Trust Bank
   │  ├─ Account Name: Federal Inland Revenue Service
   │  ├─ Account Number: 0121234567
   │  ├─ Amount: ₦2,640,600
   │  └─ Narration: "Tax Payment DIN-2025-0001"
   │
   ├─ Copy to Clipboard: [Copy Details]
   │
   ├─ Instructions:
   │  ├─ "Go to your bank's app or online banking"
   │  ├─ "Transfer this exact amount to the account above"
   │  ├─ "Use the DIN as reference"
   │  ├─ "Payment should show within 1-3 days"
   │  └─ "Upload payment proof here"
   │
   ├─ [Upload Payment Proof] (Screenshot or receipt)
   │  ├─ File upload: [image.jpg]
   │  ├─ Transaction Date: [30 Dec 2025]
   │  ├─ [Verify & Submit]
   │  │
   │  ├─ Backend:
   │  │  ├─ Store proof image
   │  │  ├─ Mark as "Pending verification"
   │  │  ├─ Notify admin to verify
   │  │  └─ Once verified, update to "paid"
   │  │
   │  └─ Toast: "✓ Payment proof submitted. Will be verified within 24 hours"
   │
   └─ Return to dashboard (pending status shown)
   ↓
3C. USER SELECTS: Direct FIRS Office
   ├─ [Choose FIRS Office Payment]
   ├─ Instructions:
   │  ├─ "Print your DIN and return copy"
   │  ├─ "Visit nearest FIRS office with:"
   │  │  ├─ - DIN and return
   │  │  ├─ - Proof of identity
   │  │  ├─ - Bank details or cash
   │  │  └─ - Completed Form C (Payment)
   │  │
   │  ├─ Office Locations: [Find Nearest Office]
   │  │  ├─ Port Harcourt Main Office
   │  │  │  ├─ Address: ...
   │  │  │  ├─ Hours: Mon-Fri 9AM-4PM
   │  │  │  └─ Contact: +234...
   │  │  │
   │  │  └─ [Map View]
   │  │
   │  └─ After Payment:
   │     ├─ Get receipt from FIRS
   │     ├─ [Upload Receipt Here]
   │     ├─ System verifies and updates status
   │     └─ Tax clearance issued
   │
   └─ [Download & Print] [Back]
```

#### Integration Points

- **API endpoints:**
  - POST /api/personal/tax-payment (process payment)
  - GET /api/personal/tax-balance (check amount due)
  - POST /api/personal/tax-payment/verify (verify bank transfer)
- **Payment gateway:** Paystack integration
- **FIRS:** Payment notification and receipt issuance
- **Notifications:** Email/SMS on payment success

#### Success Criteria

✅ Multiple payment methods available  
✅ Paystack integration works  
✅ Bank details clearly shown  
✅ Payment processes correctly  
✅ Receipt generated  
✅ Tax status updates  
✅ Notifications sent  
✅ Tax clearance issued  

---

### A.4 Tax Estimate Button

**Component:** `TaxEstimateButton`  
**Type:** Secondary Button  
**Location:** Page header, center-right  
**Icon:** 📈 (chart)  
**Label:** "Estimate"

#### Button Specification

```typescript
interface TaxEstimateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
```

#### Flow: User Clicks [📈 Estimate]

```
1. User clicks [Estimate]
   ↓
2. Tax Estimation Tool Opens
   ├─ Purpose: "See what you'll owe based on projections"
   ├─ Current Status: Estimated tax for 2025: ₦5,540,600
   │
   └─ Two Modes:
      ├─ Mode A: Update Income (Scenario Planning)
      └─ Mode B: Plan Future Year Tax
   ↓
3A. MODE A: SCENARIO PLANNING (What-If Analysis)
   ├─ "Change your projected income and see tax impact"
   │
   ├─ PROJECTION INPUTS
   │  ├─ Current Estimate (2025):
   │  │  ├─ Employment Income: ₦24,500,000 [Change]
   │  │  ├─ Self-Employment: ₦5,200,000 [Change]
   │  │  ├─ Investment Income: ₦1,300,000 [Change]
   │  │  └─ Total: ₦31,000,000
   │  │
   │  ├─ SCENARIO 1: Expected (Conservative)
   │  │  ├─ Employment: ₦24,500,000 (unchanged)
   │  │  ├─ Self-Employment: ₦4,500,000 (-₦700K due to slower quarter)
   │  │  ├─ Investment: ₦1,200,000 (-₦100K)
   │  │  └─ Total: ₦30,200,000
   │  │     ├─ Tax Liability: ₦5,369,000
   │  │     ├─ WHT Paid: -₦2,500,000
   │  │     ├─ BALANCE DUE: ₦2,869,000
   │  │     └─ Impact: -₦271,600 vs Current
   │  │
   │  ├─ SCENARIO 2: Optimistic (High Growth)
   │  │  ├─ Employment: ₦26,000,000 (expected promotion)
   │  │  ├─ Self-Employment: ₦7,500,000 (2 new contracts)
   │  │  ├─ Investment: ₦2,000,000 (full-year dividend)
   │  │  └─ Total: ₦35,500,000
   │  │     ├─ Tax Liability: ₦6,532,000
   │  │     ├─ WHT Paid: -₦2,500,000
   │  │     ├─ BALANCE DUE: ₦4,032,000
   │  │     └─ Impact: +₦1,392,000 vs Current
   │  │
   │  └─ [Add Custom Scenario]
   │
   ├─ RELIEF OPTIMIZATION
   │  ├─ Current CRA: ₦6,174,000
   │  │
   │  ├─ Optimization Suggestions:
   │  │  ├─ "Increase pension to ₦500,000/year"
   │  │  │  ├─ New CRA: ₦6,500,000
   │  │  │  ├─ Tax Savings: ₦150,000
   │  │  │  └─ [Apply to Estimate]
   │  │  │
   │  │  ├─ "Add approved life insurance (₦200K/year)"
   │  │  │  ├─ New CRA: ₦6,374,000
   │  │  │  ├─ Tax Savings: ₦48,000
   │  │  │  └─ [Apply to Estimate]
   │  │  │
   │  │  └─ "Maximize professional deductions"
   │  │     ├─ Save ₦75,000/year
   │  │     └─ [Apply to Estimate]
   │
   ├─ COMPARISON CHART
   │  ├─ Bar Chart: Current vs Scenarios
   │  ├─ X-axis: Scenario (Current, Conservative, Optimistic)
   │  ├─ Y-axis: Tax Liability
   │  └─ Shows: Tax liability for each scenario
   │
   ├─ TAX PLANNING INSIGHTS
   │  ├─ "Your effective tax rate is 17.87%"
   │  ├─ "National average: 16.5%"
   │  ├─ "You're paying ₦1.37% above average"
   │  ├─ "Reasons:"
   │  │  ├─ • Higher income than average (+15%)
   │  │  ├─ • Lower deductions used vs max available (-5%)
   │  │  └─ "Optimization could save: ₦300,000/year"
   │  │
   │  └─ [Save as Tax Plan] [Email to Accountant]
   │
   └─ [Export Report] [Back]
   ↓
3B. MODE B: FUTURE YEAR TAX PLAN (2026)
   ├─ "Plan ahead for next tax year"
   │
   ├─ BASE FROM CURRENT YEAR
   │  ├─ 2025 Actual: ₦31,000,000
   │  ├─ Growth Rate: [+5% ▼] (default growth estimate)
   │  └─ 2026 Projected: ₦32,550,000
   │
   ├─ ADJUSTMENTS FOR 2026
   │  ├─ Promotion/Raise: [₦2,000,000] (new job at higher salary)
   │  ├─ Business Growth: [₦1,500,000] (expanding consulting)
   │  ├─ New Investment Income: [₦500,000] (opening savings account)
   │  ├─ Expected Bonuses: [₦1,200,000] (year-end bonuses)
   │  └─ Other Income: [₦0]
   │
   ├─ 2026 REVISED TOTAL: ₦38,750,000
   │
   ├─ 2026 TAX ESTIMATE
   │  ├─ Gross Income: ₦38,750,000
   │  ├─ CRA (20%): ₦7,750,000
   │  ├─ Taxable Income: ₦31,000,000
   │  ├─ Total Tax: ₦6,820,000
   │  ├─ Expected WHT: -₦3,200,000
   │  └─ BALANCE DUE: ₦3,620,000
   │
   ├─ COMPARISON
   │  ├─ 2025 Tax: ₦5,540,600
   │  ├─ 2026 Tax (Est.): ₦6,820,000
   │  ├─ Increase: ₦1,279,400 (+23%)
   │  └─ Reason: Income growth & higher tax brackets
   │
   ├─ QUARTERLY PAYMENT PLAN (for 2026)
   │  ├─ Advance Tax (Jan): ₦1,705,000
   │  ├─ Q2 Tax (Apr): ₦1,705,000
   │  ├─ Q3 Tax (Jul): ₦1,705,000
   │  └─ Q4 Payment (Final): ₦1,705,000
   │
   ├─ ACTION ITEMS FOR 2026
   │  ├─ ☐ Register for Advance Tax Payment
   │  ├─ ☐ Plan quarterly payments
   │  ├─ ☐ Maximize CRA deductions
   │  ├─ ☐ Update tax withholding with employer
   │  └─ [Create 2026 Tax Action Plan]
   │
   └─ [Export Plan] [Email to Accountant] [Back]
```

#### Integration Points

- **Data source:** GET /api/personal/income-estimates, GET /api/personal/tax-rate-tables
- **Calculations:** Tax liability with different income scenarios
- **Related:** Tax planning, accountant consultation
- **Export:** PDF/Excel tax estimate reports

#### Success Criteria

✅ Scenario modeling works  
✅ Tax calculations accurate for each scenario  
✅ Relief optimization suggestions appear  
✅ Comparison charts display  
✅ Can export estimates  
✅ Can email to accountant  
✅ Future year projections work  

---

### A.5 Settings Button

**Component:** `SettingsButton`  
**Type:** Tertiary Icon Button  
**Location:** Page header, far right  
**Icon:** ⚙️ (gear)  
**Label:** "Settings" (on hover)

#### Button Specification

```typescript
interface SettingsButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
```

#### Flow: User Clicks [Settings]

```
1. User clicks [⚙️]
   ↓
2. Navigate to /personal/individual-tax/settings
   ↓
3. Settings page displays:
   ├─ PERSONAL INFORMATION
   │  ├─ Tax Identification Number (TIN): [TIN-XXXXX] (read-only)
   │  ├─ Full Name: [John Doe_______________]
   │  ├─ Date of Birth: [15 Jan 1985 ▼]
   │  ├─ Email: [john@example.com_______]
   │  ├─ Phone: [+234 801 234 5678_______]
   │  ├─ Marital Status: [Single ▼]
   │  ├─ Number of Dependents: [0 ▼]
   │  └─ Residential Address: [Port Harcourt, Rivers State__]
   │
   ├─ EMPLOYMENT DETAILS
   │  ├─ Primary Employer: [ABC Corp Ltd__________]
   │  ├─ Employer TIN: [Lookup: ____________]
   │  ├─ Job Title: [Senior Manager__________]
   │  ├─ Employment Status: [Full-Time ▼]
   │  ├─ Monthly Salary: [₦2,000,000] (auto-populated)
   │  ├─ Allowances: [₦250,000/month] (edit)
   │  ├─ PAYE Registered: [Yes/No toggle]
   │  └─ [Add Secondary Employment] [Remove]
   │
   ├─ BUSINESS INFORMATION (if self-employed)
   │  ├─ Business Name: [Consulting Services__]
   │  ├─ Business TIN: [Auto-lookup or Manual]
   │  ├─ Business Type: [Professional Services ▼]
   │  ├─ Business Address: [Lagos, Nigeria_____]
   │  ├─ Business Registration: [✓ CAC Registered]
   │  ├─ Estimated Annual Income: [₦5,200,000]
   │  └─ [Add Another Business] [Edit] [Remove]
   │
   ├─ TAX RELIEFS & DEDUCTIONS CONFIGURATION
   │  ├─ CRA Preference:
   │  │  ○ Auto-calculate (system decides)
   │  │  ○ Manual override: [CRA: ₦________]
   │  │  └─ Help: "CRA is the higher of ₦200K or 1% of income"
   │  │
   │  ├─ Pension Settings:
   │  │  ├─ RSA Provider: [Sigma Pensions ▼]
   │  │  ├─ Pin Number: [PIN-123456 (optional)]
   │  │  ├─ Monthly Contribution: [₦10,800]
   │  │  └─ [Verify with Provider]
   │  │
   │  ├─ Optional Deductions (if applicable):
   │  │  ├─ ☑ Life Insurance: [₦___________/year]
   │  │  ├─ ☑ Professional Subscriptions: [₦___________]
   │  │  ├─ ☑ Mortgage Interest (if eligible): [₦___________]
   │  │  └─ ☑ Education Loan Interest: [₦___________]
   │  │
   │  └─ [Optimize Deductions]
   │
   ├─ WITHHOLDING TAX (WHT) CONFIGURATION
   │  ├─ Auto-track WHT: [On/Off toggle]
   │  ├─ Expected WHT Rate on Salary: [11% ▼]
   │  ├─ Expected WHT Rate on Dividends: [10% ▼]
   │  ├─ Expected WHT Rate on Interest: [10% ▼]
   │  ├─ Expected WHT Rate on Rentals: [10% ▼]
   │  └─ [Verify Rates]
   │
   ├─ FILING PREFERENCES
   │  ├─ Default Return Type: [Direct Assessment ▼]
   │  │  └─ "Change based on income source"
   │  ├─ Tax Year: [Calendar Year ▼] (Jan-Dec)
   │  ├─ Filing Method: [FIRS TaxPro Max ▼] (Recommended)
   │  │  └─ Alternative: Manual filing
   │  ├─ Auto-file reminder: [On/Off]
   │  ├─ Days before deadline: [14 days ▼]
   │  └─ [Test Connection to FIRS]
   │
   ├─ PAYMENT SETTINGS
   │  ├─ Default Payment Method: [Paystack ▼]
   │  ├─ Payment Account: [GTB: ****2345 ▼]
   │  ├─ Save card for auto-payment: [Off toggle]
   │  ├─ Email Payment Receipts: [On toggle]
   │  └─ Set Payment Reminders: [On/Off]
   │
   ├─ BANK & ACCOUNT CONFIGURATION
   │  ├─ Primary Bank Account:
   │  │  ├─ Bank: [Guaranty Trust Bank]
   │  │  ├─ Account #: [0123456789]
   │  │  ├─ Account Type: [Salary Account]
   │  │  └─ [Edit] [Set as Primary]
   │  │
   │  ├─ Secondary Account (if applicable):
   │  │  ├─ Bank: [First Bank]
   │  │  ├─ Account #: [0987654321]
   │  │  └─ [Edit] [Remove]
   │  │
   │  └─ [Add Bank Account] [Sync Bank Feeds]
   │
   ├─ INCOME SOURCE CONFIGURATION
   │  ├─ Track Income From:
   │  │  ├─ ☑ Employment (Salary)
   │  │  ├─ ☑ Self-Employment (Business)
   │  │  ├─ ☑ Dividends (Investments)
   │  │  ├─ ☑ Interest (Savings/Bonds)
   │  │  ├─ ☑ Rental Income
   │  │  └─ ☑ Other (Specify)
   │  │
   │  └─ [Configure Data Sources] (Connect payroll, brokerage, etc.)
   │
   ├─ NOTIFICATION SETTINGS
   │  ├─ Email Notifications:
   │  │  ├─ ☑ Tax deadline reminders
   │  │  ├─ ☑ Income updates
   │  │  ├─ ☑ Payment confirmations
   │  │  ├─ ☑ Tax estimate changes
   │  │  └─ ☑ FIRS updates
   │  │
   │  ├─ SMS Notifications:
   │  │  ├─ ☑ Filing deadline (7 days before)
   │  │  ├─ ☑ Payment deadline
   │  │  └─ ☑ Tax clearance issued
   │  │
   │  └─ Frequency: [Weekly ▼] / [Real-Time ▼]
   │
   ├─ ACCOUNTANT ACCESS
   │  ├─ Grant Accountant Access: [On/Off toggle]
   │  ├─ Accountant Email: [accountant@firm.com__]
   │  ├─ Permission Level: [View & Edit ▼]
   │  │  └─ Options: View Only / View & Edit / Manage
   │  ├─ Expiry Date: [No Expiry ▼]
   │  └─ [Manage Access] [Revoke]
   │
   ├─ DATA & PRIVACY
   │  ├─ Download Your Data: [XLSX] [PDF] [JSON]
   │  ├─ Data Sync Status:
   │  │  ├─ Employment Income: Last synced 2h ago ✓
   │  │  ├─ Bank Records: Last synced 1h ago ✓
   │  │  ├─ WHT Certificates: Last synced 5h ago ✓
   │  │  └─ [Sync Now]
   │  │
   │  ├─ Delete Personal Data: [Request Deletion]
   │  │  └─ (Requires 90-day wait per GDPR)
   │  │
   │  └─ Privacy Policy: [View]
   │
   └─ [Save Changes] [Cancel] [Restore Defaults]
   ↓
4. User makes changes and clicks [Save Changes]
   ↓
5. PATCH /api/personal/settings
   {
     personalInfo: {...},
     employment: {...},
     taxReliefs: {...},
     filing: {...},
     ...
   }
   ↓
6. Backend validates and updates
   ↓
7. Toast: "✓ Settings saved"
   └─ Changes affect future calculations
```

#### Integration Points

- **Data stored:** User preferences, employment info, bank details
- **Related:** Tax calculations, filing preferences, accountant access
- **Sync:** Connection to FIRS TaxPro Max, bank feeds

#### Success Criteria

✅ Settings page loads  
✅ Can edit all fields  
✅ Validation works  
✅ Changes save correctly  
✅ Affects future calculations  
✅ Accountant access can be granted/revoked  

---

## PART A: OVERVIEW CARDS

### A.6 Total Income Card

**Component:** `TotalIncomeCard`  
**Type:** Overview Card  
**Location:** Overview section, top-left  

#### Card Content

```
┌───────────────────────────┐
│ Total Income              │
│ ₦24,500,000              │
│ YTD (2025)               │
│                          │
│ [View Breakdown] [Sync]  │
└───────────────────────────┘
```

**Click to Open:**
- View detailed income breakdown by source
- Sync income from employer/bank records
- Manual entry for missing income

---

### A.7 Tax Liability Card

**Component:** `TaxLiabilityCard`  
**Type:** Overview Card  
**Location:** Overview section, top-right  

#### Card Content

```
┌───────────────────────────┐
│ Tax Liability             │
│ ₦4,123,000               │
│ Est. for Year (2025)     │
│                          │
│ Eff. Rate: 16.9%         │
│ [Details] [Pay]          │
└───────────────────────────┘
```

**Click to Open:**
- View tax calculation details
- See progressive tax breakdown
- Make payment directly

---

### A.8 Tax Paid/WHT Card

**Component:** `TaxPaidCard`  
**Type:** Overview Card  
**Location:** Overview section, bottom-left  

#### Card Content

```
┌───────────────────────────┐
│ Tax Paid / WHT           │
│ ₦2,500,000               │
│ From Salary & Investment │
│                          │
│ [View WHT Details] [+Add]│
└───────────────────────────┘
```

**Click to Open:**
- View WHT breakdown by source
- Add manual WHT (if not captured)
- Upload WHT certificates

---

### A.9 Tax Balance Due Card

**Component:** `TaxBalanceDueCard`  
**Type:** Alert Card (Highlight)  
**Location:** Overview section, bottom-right  

#### Card Content

```
┌───────────────────────────┐
│ Tax Balance Due           │
│ ₦1,623,000               │
│ Due by 31 Mar 2026       │
│                          │
│ [Pay Now] [Payment Plan] │
└───────────────────────────┘
```

**Click [Pay Now]:**
- Opens payment dialog immediately
- Accepts multiple payment methods
- Generates receipt and updates status

---

## PART A: INCOME SECTION

### A.10 Income Breakdown

**Component:** `IncomeBreakdownSection`  
**Type:** Section with expandable items  
**Location:** Below overview cards  

#### Section Content

```
┌──────────────────────────────────────────┐
│ INCOME SUMMARY                           │
│                                          │
│ Employment Income:      ₦18,000,000     │
│ Self-Employment Income: ₦5,200,000      │
│ Investment Income:      ₦1,300,000      │
│                                          │
│ [View Detail Breakdown] [Add Income]    │
└──────────────────────────────────────────┘
```

**Expandable Details:**
- Click to show detailed breakdown by source
- Can add/edit income items
- Can attach supporting documents

---

## PART A: DEDUCTIONS & RELIEF SECTION

### A.11 Deductions & Relief Card

**Component:** `DeductionsReliefSection`  
**Type:** Section with calculation detail  
**Location:** Below income section  

#### Section Content

```
┌──────────────────────────────────────────┐
│ DEDUCTIONS & RELIEF                      │
│                                          │
│ Consolidated Relief (CRA): ₦4,350,000   │
│ Pension Contributions:     ₦2,160,000   │
│ Personal Exemptions:       ₦200,000     │
│                                          │
│ [View Calculation] [Optimize]            │
└──────────────────────────────────────────┘
```

**[View Calculation]:**
- Shows CRA formula step-by-step
- Shows pension contributions detail
- Shows how each relief reduces taxable income

**[Optimize]:**
- Suggests ways to increase deductions
- Shows tax savings potential
- Recommends pension increases, insurance, etc.

---

## PART A: TAX LIABILITY SECTION

### A.12 Tax Calculation Breakdown

**Component:** `TaxCalculationSection`  
**Type:** Section with detailed calculation  
**Location:** Below deductions  

#### Section Content

```
┌──────────────────────────────────────────────┐
│ TAX CALCULATION BREAKDOWN                    │
│                                              │
│ Gross Income:                ₦24,500,000   │
│ Less: CRA & Relief:         -₦4,350,000    │
│ ────────────────────────────────────────    │
│ Taxable Income:              ₦20,150,000   │
│                                              │
│ Tax @ Progressive Rates:     ₦4,123,000    │
│ Less: WHT Already Paid:     -₦2,500,000    │
│ ════════════════════════════════════════    │
│ BALANCE DUE (by 31 Mar):     ₦1,623,000    │
│                                              │
│ Effective Tax Rate: 16.9%                   │
│                                              │
│ [View Band Detail] [View WHT Credits]       │
└──────────────────────────────────────────────┘
```

**[View Band Detail]:**
- Shows each progressive tax band
- Shows amount taxed at each rate
- Total tax calculation

**[View WHT Credits]:**
- Shows WHT by source
- Shows WHT credited against total tax
- Shows refund (if WHT > tax) or balance due

---

## PART A: FILING & COMPLIANCE SECTION

### A.13 Filing Status Card

**Component:** `FilingStatusSection`  
**Type:** Alert/Status section  
**Location:** Below tax calculation  

#### Section Content

```
┌──────────────────────────────────────────┐
│ FILING & COMPLIANCE                      │
│                                          │
│ Status: ⚠️ Due Soon                     │
│ Filing Deadline: 31 March 2026          │
│ Days Remaining: 92                       │
│ Return Type: Direct Assessment          │
│ TIN: ✓ Valid                           │
│                                          │
│ [Start Filing] [View Instructions]      │
│ [Get Help] [Schedule with Accountant]   │
└──────────────────────────────────────────┘
```

**Status Indicators:**
- ⚠️ Due Soon (< 30 days remaining)
- 🔵 On Track (30-90 days remaining)
- ✓ Filed (return submitted)
- ⏹️ Paid (tax paid, compliance complete)

---

## PART A: SIDE PANELS & QUICK ACTIONS

### A.14 TIN & Profile Panel

**Component:** `TINProfilePanel`  
**Type:** Side card  
**Location:** Right sidebar, top  

#### Panel Content

```
┌────────────────────────────┐
│ TIN & Profile              │
├────────────────────────────┤
│ TIN: TIN-XXXXX            │
│ Name: John Doe            │
│ Email: john@example.com   │
│ Status: ✓ Active         │
│                           │
│ [View Full Profile]       │
│ [Edit Profile]            │
└────────────────────────────┘
```

**[View Full Profile]:**
- Shows complete personal information
- Shows FIRS status and registration
- Shows filing history

**[Edit Profile]:**
- Allows updating personal information
- Allows updating contact details
- Syncs changes to FIRS account

---

### A.15 Recent Actions Panel

**Component:** `RecentActionsPanel`  
**Type:** Side card  
**Location:** Right sidebar, middle  

#### Panel Content

```
┌────────────────────────────┐
│ Recent Actions             │
├────────────────────────────┤
│ • Income synced: 2h ago   │
│ • WHT recorded: 5 Dec    │
│ • Tax estimated: 3 Dec   │
│ • Salary cert. uploaded   │
│ • Settings updated        │
│                           │
│ [View All]                │
└────────────────────────────┘
```

**[View All]:**
- Full activity log with timestamps
- Can export activity report
- Can undo certain actions (if enabled)

---

### A.16 Quick Actions Panel

**Component:** `QuickActionsPanel`  
**Type:** Side card  
**Location:** Right sidebar, bottom  

#### Panel Content

```
┌────────────────────────────┐
│ Quick Actions              │
├────────────────────────────┤
│ [Sync Income]              │
│ [Add WHT Certificate]      │
│ [Estimate Tax]             │
│ [Contact Accountant]       │
│ [View Tax Calendar]        │
└────────────────────────────┘
```

**Each button:**
- Direct shortcut to common tasks
- Opens relevant dialog or page
- Reduces clicks for frequent actions

---

---

# PART B: INTEGRATION

---

## PART B: DATA FLOW

### Complete Data Flow: Income Sources → Individual Tax Dashboard → Filing

```
START: Throughout the Tax Year (Jan-Dec)
│
├─ EMPLOYMENT INCOME
│  ├─ Salary paid monthly
│  ├─ Auto-deducted for PAYE tax
│  ├─ WHT deducted: 11% of salary
│  ├─ Slip/Receipt shared
│  └─ Synced to dashboard monthly
│
├─ SELF-EMPLOYMENT INCOME
│  ├─ Business/Contract income
│  ├─ No auto-deduction (Direct Assessment)
│  ├─ WHT may be deducted by payer (5%)
│  ├─ Need to track manually or via bank
│  └─ Synced to dashboard
│
├─ INVESTMENT INCOME
│  ├─ Dividends from shares: 10% WHT
│  ├─ Interest from bank: 10% WHT
│  ├─ Rental income: Tracked manually
│  ├─ Certificates received
│  └─ Uploaded to dashboard
│
├─ WITHHOLDING TAX (WHT)
│  ├─ Deducted from each income source
│  ├─ Certificates issued
│  ├─ Uploaded to dashboard
│  └─ Credited against final tax liability
│
├─ YEAR-END CLOSE (31 December)
│  ├─ Individual calculates total income
│  ├─ System pulls all income sources:
│  │  ├─ Employment: ₦24,500,000
│  │  ├─ Self-Employment: ₦5,200,000
│  │  ├─ Investment: ₦1,300,000
│  │  └─ TOTAL GROSS: ₦31,000,000
│  │
│  ├─ System applies reliefs:
│  │  ├─ CRA calculation: ₦6,174,000
│  │  ├─ Pension deduction: ₦130,000
│  │  └─ Net Relief: ₦6,174,000
│  │
│  ├─ Taxable income calculated: ₦24,826,000
│  │
│  └─ Progressive tax applied:
│     ├─ Calculate tax in bands
│     ├─ Total tax liability: ₦5,540,600
│     └─ Less WHT already paid: ₦2,500,000
│
├─ TAX LIABILITY DETERMINED
│  ├─ Balance Due: ₦3,040,600
│  ├─ OR Refund (if WHT > tax)
│  └─ Shown on dashboard
│
├─ FILING PERIOD (Jan - Mar 31)
│  ├─ Deadline for filing return: 31 March
│  ├─ Individual clicks [File Return]
│  ├─ Completes return form (Form A)
│  │  ├─ Declares all income
│  │  ├─ Declares all reliefs
│  │  ├─ Confirms WHT paid
│  │  └─ Declares net tax liability
│  │
│  ├─ System generates return
│  ├─ Integrated with FIRS TaxPro Max
│  ├─ Return submitted to FIRS
│  ├─ DIN (Unique Document ID) received
│  └─ Filing receipt generated
│
├─ PAYMENT (Within 30 days of filing)
│  ├─ Amount due: ₦3,040,600
│  ├─ Payment methods:
│  │  ├─ Paystack (instant)
│  │  ├─ Bank transfer (1-3 days)
│  │  └─ FIRS office (cash/check)
│  │
│  ├─ Payment processed
│  ├─ Receipt generated
│  └─ Dashboard updated with "Paid"
│
├─ TAX CLEARANCE CERTIFICATE
│  ├─ Issued by FIRS after payment
│  ├─ Downloaded from dashboard
│  ├─ Used for: Loans, visas, contracts
│  └─ Valid for 1 year
│
└─ END: Compliance Complete
```

---

## PART B: PAGE INTERCONNECTIONS

### Individual Tax Dashboard ↔ Other Modules

```
INDIVIDUAL TAX DASHBOARD
    │
    ├─→ Filing Hub (Compliance)
    │   ├─ Personal return filed here
    │   ├─ Get DIN and receipt
    │   └─ Consolidated with other returns
    │
    ├─→ Payroll / Employment Income
    │   ├─ Salary & allowances sync
    │   ├─ PAYE tax deductions
    │   └─ WHT on salary
    │
    ├─→ Bank Accounts (Personal)
    │   ├─ Investment income tracking
    │   ├─ Dividend & interest income
    │   └─ Bank feed sync for expenses
    │
    ├─→ Vendor Bills (if self-employed)
    │   ├─ Business expenses tracking
    │   ├─ Deductible expenses
    │   └─ Business profit calculation
    │
    ├─→ Tax Calendar
    │   ├─ Filing deadlines (31 Mar)
    │   ├─ Payment deadlines
    │   └─ Email reminders
    │
    └─→ Accountant Portal
        ├─ Share tax info with accountant
        ├─ Get tax advice
        └─ File jointly if needed
```

---

## PART B: STATE MANAGEMENT

### Redux Store Structure

```
store/
├─ personal-tax/
│  ├─ slice.ts (reducers)
│  ├─ selectors.ts (memoized)
│  └─ thunks.ts (async actions)
│     ├─ fetchIncomeData()
│     ├─ fetchTaxCalculation()
│     ├─ fileReturn()
│     ├─ payTax()
│     ├─ generateEstimate()
│     └─ downloadTaxClearance()
│
└─ shared/
   ├─ tax-calculations/
   │  ├─ progressive-bands.ts
   │  ├─ relief-calculator.ts
   │  └─ wht-tracker.ts
   └─ notifications/
      └─ filing-reminders.ts
```

### Individual Tax State

```typescript
interface PersonalTaxState {
  // UI State
  currentTab: 'overview' | 'income' | 'calculations' | 'filing';
  
  // Income Data
  income: {
    employment: number;
    selfEmployment: number;
    investment: number;
    totalGross: number;
  };
  
  // WHT Data
  wht: {
    fromSalary: number;
    fromDividends: number;
    fromInterest: number;
    fromContracts: number;
    totalWHT: number;
  };
  
  // Relief Data
  reliefs: {
    cra: number;
    pension: number;
    optionalDeductions: number;
    totalReliefs: number;
  };
  
  // Tax Calculation
  taxCalculation: {
    taxableIncome: number;
    totalTaxLiability: number;
    effectiveRate: number;
    balanceDue: number;
  };
  
  // Filing Data
  filing: {
    returnDraft: Return | null;
    DIN: string | null;
    status: 'draft' | 'filed' | 'paid';
    filingDate: Date | null;
  };
  
  // Loading & Error
  loading: boolean;
  error: string | null;
}
```

---

## PART B: API ENDPOINTS

### Personal Tax Endpoints

```
GET /api/personal/income
  Purpose: Fetch all income sources
  Query: ?year=2025
  Response: {
    employment: {salary, allowances, bonuses},
    selfEmployment: {income, source},
    investment: {dividends, interest, rental},
    totalGross: number
  }

GET /api/personal/reliefs
  Purpose: Fetch relief allowances
  Response: {
    cra1: number,
    cra2: number,
    pension: number,
    optionalDeductions: [],
    totalReliefs: number
  }

GET /api/personal/wht
  Purpose: Fetch WHT summary
  Query: ?year=2025
  Response: {
    fromSalary: number,
    certificates: [{source, amount, date}],
    totalWHT: number
  }

GET /api/personal/tax-calculation
  Purpose: Get tax liability calculation
  Query: ?year=2025
  Response: {
    taxableIncome: number,
    bands: [{range, rate, tax}],
    totalTax: number,
    lessWHT: number,
    balanceDue: number
  }

POST /api/personal/income-tax/file
  Purpose: File personal income tax return
  Request: {
    income: {...},
    reliefs: {...},
    wht: {...},
    returnType: "direct_assessment"|"paye"
  }
  Response: {
    returnId,
    din: string,
    status: "filed"
  }

POST /api/personal/tax-payment
  Purpose: Process tax payment
  Request: {
    amount: number,
    method: "paystack"|"bank_transfer"|"firs_office",
    returnId: string
  }
  Response: {
    transactionId,
    receiptUrl,
    status: "paid"
  }

GET /api/personal/tax-estimate
  Purpose: Get tax estimate for scenario
  Query: ?income=31000000&scenario=conservative
  Response: {
    taxableIncome: number,
    taxLiability: number,
    effectiveRate: number,
    scenarios: [{name, amount, tax}]
  }

GET /api/personal/tax-clearance
  Purpose: Download tax clearance certificate
  Query: ?year=2025
  Response: PDF file
```

---

## PART B: ERROR HANDLING

### Common Error Scenarios

```
INCOME ENTRY ERRORS:

1. Missing Income Source
   ├─ Error: "Employment income not found"
   ├─ Action: Sync from payroll system
   ├─ Resolution: GET /api/personal/income/sync
   └─ Toast: "✓ Income synced from payroll"

2. WHT Certificate Missing
   ├─ Error: "WHT certificate required for ₦800K dividend"
   ├─ Action: Upload certificate
   └─ Resolution: POST /api/personal/wht/upload

3. Inconsistent Income Data
   ├─ Error: "Income doesn't match payslip"
   ├─ Action: Review and correct
   └─ Resolution: Manual edit with confirmation

TAX FILING ERRORS:

1. FIRS Connection Failed
   ├─ Error: "Cannot connect to FIRS TaxPro Max"
   ├─ Action: Save as draft and retry
   ├─ Resolution: [Retry] button
   └─ Toast: "Saved locally. Try filing when FIRS available"

2. Invalid TIN
   ├─ Error: "TIN not recognized by FIRS"
   ├─ Action: Verify TIN
   ├─ Verification: GET /api/firs/verify-tin
   └─ Resolution: Register new TIN or update

3. Missing Documents
   ├─ Error: "Salary certificate required"
   ├─ Action: Upload required documents
   └─ Resolution: Upload, then retry filing

4. Tax Liability Calculation Error
   ├─ Error: "Tax calculation invalid"
   ├─ Action: Review income and reliefs
   ├─ Validation: All fields checked
   └─ Resolution: Correct data, recalculate

PAYMENT ERRORS:

1. Paystack Declined
   ├─ Error: "Payment declined: Insufficient funds"
   ├─ Action: Choose alternate payment method
   └─ Resolution: Bank transfer or FIRS office payment

2. Bank Transfer Not Verified
   ├─ Error: "Payment not yet verified"
   ├─ Action: Provide proof (screenshot)
   ├─ Verification: Admin checks manually
   └─ Resolution: Status updates within 24 hours

3. Partial Payment Made
   ├─ Error: "₦1.5M paid, ₦1.5M still due"
   ├─ Action: Make additional payment
   └─ Resolution: POST /api/personal/tax-payment again
```

---

## PART B: IMPLEMENTATION CHECKLIST

```
HEADER BUTTONS
☐ [View Tax Summary] works
☐ [File Return] wizard complete (5 steps)
☐ All return types supported
☐ [Pay Tax] processes multiple methods
☐ [Estimate] scenarios work
☐ [Settings] saves changes

OVERVIEW CARDS
☐ Total Income card shows
☐ Tax Liability card shows
☐ Tax Paid/WHT card shows
☐ Tax Balance Due card shows
☐ Cards auto-update when data changes

INCOME SECTION
☐ Income breakdown displays
☐ All income sources captured
☐ Can add/edit income
☐ Can sync from payroll
☐ Data validates correctly

DEDUCTIONS SECTION
☐ CRA calculation correct
☐ Pension deductions shown
☐ Optional deductions apply
☐ Optimize suggestions appear
☐ Relief calculations accurate

TAX LIABILITY SECTION
☐ Progressive tax bands apply correctly
☐ Tax calculation matches PITA rules
☐ WHT credited correctly
☐ Balance due calculated
☐ Effective rate shown

FILING & COMPLIANCE
☐ Status indicators display
☐ Filing deadline shown
☐ Days remaining calculated
☐ Return type auto-detected
☐ TIN validation works

SIDE PANELS
☐ TIN & Profile panel shows
☐ Recent Actions panel shows
☐ Quick Actions panel works
☐ All panels interactive

FILE RETURN WIZARD
☐ Step 1: Return type selection
☐ Step 2: Income declaration (all sources)
☐ Step 3: Reliefs & deductions
☐ Step 4: Tax calculation
☐ Step 5: Final review & submission
☐ Can save as draft
☐ Can file to FIRS
☐ DIN generation works

PAY TAX FLOW
☐ Multiple payment methods
☐ Paystack integration works
☐ Bank transfer details shown
☐ FIRS office details shown
☐ Receipt generated
☐ Email sent
☐ Status updates

TAX ESTIMATE TOOL
☐ Scenario planning works
☐ What-if analysis accurate
☐ Relief optimization shows
☐ Comparison charts display
☐ Export available
☐ Future year planning works

INTEGRATION & DATA
☐ Income syncs from payroll
☐ WHT certificates upload
☐ Bank feeds integrate
☐ Tax calculations accurate
☐ FIRS TaxPro Max integration
☐ Paystack integration
☐ Email notifications

STATE MANAGEMENT
☐ Redux store structured
☐ Actions dispatch correctly
☐ Selectors memoized
☐ No memory leaks

PERFORMANCE
☐ Page loads < 2 seconds
☐ Calculations instant
☐ Filing submission < 30 seconds
☐ Payment processing < 10 seconds
☐ No lag on interactions

ERROR HANDLING
☐ Network errors handled
☐ API errors show messages
☐ Validation works
☐ Retry buttons available

SECURITY
☐ TIN protected (masked display)
☐ Payment data secure (PCI compliant)
☐ Data encrypted in transit
☐ Authentication verified
```

---

## SUMMARY

This **Individual Tax Dashboard** specification provides complete guidance for implementing a personal tax management system that:

✅ **Tracks Income** - Employment, self-employment, investment sources  
✅ **Calculates Tax** - Progressive tax bands, relief allowances, WHT crediting (PITA-compliant)  
✅ **Files Returns** - Direct Assessment and PAYE returns to FIRS via TaxPro Max API  
✅ **Processes Payments** - Multiple payment methods with receipts and tax clearance  
✅ **Estimates Tax** - Scenario planning and optimization suggestions  
✅ **Manages Compliance** - Filing deadlines, reminders, filing history  

### Key Features

- **Progressive Tax Calculation:** Correctly applies 7%-24% tax bands per PITA
- **Relief Optimization:** Shows CRA (Consolidated Relief Allowance) opportunities
- **WHT Management:** Tracks and credits withholding tax from all sources
- **FIRS Integration:** Submits returns via TaxPro Max API, receives DINeeds additional development resources - assign to both backend (FIRS API, tax calculations, payment gateway) and frontend (forms, visualization, reporting).

---

**Document Version:** 1.0  
**Status:** Production Ready  
**Date:** December 30, 2025  
**Product:** TaxGee Pro  
**Compliance:** Nigeria Personal Income Tax Act (PITA), FIRS TaxPro Max API
